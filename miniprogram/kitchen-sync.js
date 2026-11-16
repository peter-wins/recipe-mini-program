const { cloudImageEnv } = require('./recipe-image')
const { resolveRecipeId } = require('./catalog')

const activityStorageKey = 'recipe-activity-v1'
const favoritesStorageKey = 'favorite-recipe-ids'

const storageKey = 'recipe-kitchen-sync-v1'
const batchSize = 32
let inFlight

function readState() {
  const state = wx.getStorageSync(storageKey)
  return state && state.clientId ? state : null
}

function makeState(kitchen) {
  const clientId = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
  return { clientId, sequence: 0, seed: kitchen, kitchen, pending: [] }
}

function normalizeRecipeIds(ids) {
  return Array.isArray(ids) ? [...new Set(ids.filter(id => typeof id === 'string' && id).map(resolveRecipeId))] : []
}

function readLegacyRecipeRecords() {
  const activity = wx.getStorageSync(activityStorageKey) || {}
  return {
    favorites: normalizeRecipeIds(wx.getStorageSync(favoritesStorageKey)),
    cooked: normalizeRecipeIds(activity.cooked)
  }
}

function withRecipeRecords(state) {
  if (state.records) return state
  const records = readLegacyRecipeRecords()
  return { ...state, records, recordSeed: records }
}

function readRecipeRecords() {
  const state = readState()
  const records = state && state.records
  if (!records) return readLegacyRecipeRecords()
  return { favorites: normalizeRecipeIds(records.favorites), cooked: normalizeRecipeIds(records.cooked) }
}

function saveRecipeRecord(list, id, present, readKitchen) {
  const state = withRecipeRecords(readState() || makeState(readKitchen()))
  const ids = normalizeRecipeIds(state.records[list]).filter(item => item !== id)
  const records = { ...state.records, [list]: present ? [id, ...ids] : ids }
  const sequence = state.sequence + 1
  const operation = { sequence, added: [], removed: [], shopping: [], recipeRecord: { list, id, present } }
  wx.setStorageSync(storageKey, { ...state, sequence, records, pending: state.pending.concat(operation) })
  syncKitchen()
}

function readSyncedKitchen() {
  const state = readState()
  return state && state.kitchen
}

function groupShopping(items) {
  const groups = new Map()
  for (const item of items) {
    const key = JSON.stringify([item.recipeId, item.id])
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(item)
  }
  return groups
}

function saveSyncedKitchen(before, kitchen) {
  const added = kitchen.inventory.filter(id => !before.inventory.includes(id))
  const removed = before.inventory.filter(id => !kitchen.inventory.includes(id))
  const previous = groupShopping(before.shopping)
  const next = groupShopping(kitchen.shopping)
  const shopping = []
  for (const key of new Set([...previous.keys(), ...next.keys()])) {
    const items = next.get(key) || []
    if (JSON.stringify(previous.get(key) || []) !== JSON.stringify(items)) {
      const [recipeId, id] = JSON.parse(key)
      shopping.push({ recipeId, id, items })
    }
  }

  if (!added.length && !removed.length && !shopping.length) return
  const state = readState() || makeState(before)
  const sequence = state.sequence + 1
  const pending = state.pending.concat({ sequence, added, removed, shopping })
  wx.setStorageSync(storageKey, { ...state, sequence, kitchen, pending })
  syncKitchen()
}

function refreshVisibleData(kitchenChanged, recordsChanged) {
  if (typeof getCurrentPages !== 'function') return
  const pages = getCurrentPages()
  const page = pages[pages.length - 1]
  if (!page) return
  if (kitchenChanged && typeof page.refreshKitchenData === 'function') page.refreshKitchenData()
  if (recordsChanged && typeof page.refreshRecipeRecords === 'function') page.refreshRecipeRecords()
}

async function flushKitchen() {
  for (;;) {
    const state = readState()
    if (!state) return
    const operations = state.pending.slice(0, batchSize)
    const { result } = await wx.cloud.callFunction({
      name: 'syncKitchen',
      config: { env: cloudImageEnv },
      data: { clientId: state.clientId, seed: state.seed, recordSeed: state.recordSeed, operations }
    })
    if (!result || !result.ok || !result.kitchen ||
        !Array.isArray(result.kitchen.inventory) || !Array.isArray(result.kitchen.shopping) ||
        !result.records || !Array.isArray(result.records.favorites) || !Array.isArray(result.records.cooked) ||
        !Number.isSafeInteger(result.applied) || (operations.length && result.applied < operations[operations.length - 1].sequence)) {
      throw new Error(result && result.error || 'invalid_response')
    }

    // Preserve edits saved while the request was in flight.
    const current = readState()
    if (!current || current.clientId !== state.clientId) return
    const pending = current.pending.filter(operation => operation.sequence > result.applied)
    const kitchen = pending.length ? current.kitchen : result.kitchen
    const records = pending.length ? current.records : result.records
    const kitchenChanged = JSON.stringify(kitchen) !== JSON.stringify(current.kitchen)
    const recordsChanged = JSON.stringify(records) !== JSON.stringify(current.records)
    if (kitchenChanged || recordsChanged || current.seed || current.recordSeed || pending.length !== current.pending.length) {
      wx.setStorageSync(storageKey, { ...current, seed: null, recordSeed: null, kitchen, records, pending })
    }
    if (kitchenChanged || recordsChanged) refreshVisibleData(kitchenChanged, recordsChanged)
    if (!pending.length) return
  }
}

function syncKitchen(legacyKitchen) {
  if (!wx.cloud || typeof wx.cloud.callFunction !== 'function') return
  if (!inFlight) {
    inFlight = Promise.resolve().then(() => {
      const stored = readState()
      const state = stored || (legacyKitchen && makeState(legacyKitchen()))
      if (!state) return
      const ready = withRecipeRecords(state)
      if (ready !== stored) wx.setStorageSync(storageKey, ready)
      return flushKitchen()
    }).catch(error => {
      // Pending changes stay on the device until the next foreground or network event.
      console.warn('厨房云同步暂未完成', error.errCode || error.code || error.message)
    }).finally(() => { inFlight = null })
  }
  return inFlight
}

module.exports = {
  readSyncedKitchen, saveSyncedKitchen, syncKitchen, activityStorageKey,
  normalizeRecipeIds, readRecipeRecords, saveRecipeRecord
}
