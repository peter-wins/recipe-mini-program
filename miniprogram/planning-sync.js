const { cloudImageEnv } = require('./recipe-image')

const storageKey = 'recipe-planning-sync-v1'
const customMealsKey = 'recipe-custom-meals-v1'
const calendarKey = 'recipe-meal-calendar-v1'
const batchSize = 32
let inFlight

function readState() {
  const state = wx.getStorageSync(storageKey)
  return state && state.clientId ? state : null
}

function readLegacyPlanning() {
  const meals = wx.getStorageSync(customMealsKey)
  const calendar = wx.getStorageSync(calendarKey)
  return {
    meals: Object.fromEntries((Array.isArray(meals) ? meals : []).slice().reverse()
      .filter(meal => meal && typeof meal.id === 'string').map(meal => [meal.id, meal])),
    calendar: calendar && typeof calendar === 'object' && !Array.isArray(calendar) ? calendar : {}
  }
}

function applyChange(planning, change) {
  if (change.meal) {
    if (change.importOnly && Object.prototype.hasOwnProperty.call(planning.meals, change.meal.id)) return planning
    return { ...planning, meals: { ...planning.meals, [change.meal.id]: change.meal } }
  }

  const day = planning.calendar[change.date] || {}
  if (change.importOnly && Object.prototype.hasOwnProperty.call(day, change.slot)) return planning
  return { ...planning, calendar: { ...planning.calendar, [change.date]: { ...day, [change.slot]: change.entry } } }
}

function makeState() {
  const planning = readLegacyPlanning()
  const meals = Object.values(planning.meals).map(meal => ({ meal, importOnly: true }))
  const calendar = Object.entries(planning.calendar).flatMap(([date, day]) =>
    Object.entries(day || {}).filter(([, entry]) => entry).map(([slot, entry]) => ({ date, slot, entry, importOnly: true })))
  const pending = meals.concat(calendar).map((change, index) => ({ ...change, sequence: index + 1 }))
  const clientId = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
  return { clientId, sequence: pending.length, planning, pending }
}

function readPlanning() {
  const state = readState()
  return state ? state.planning : readLegacyPlanning()
}

function migrateLegacyCalendar(transform) {
  // Freeze references from the previous local format before they enter the upload queue.
  if (readState()) return
  const { calendar } = readLegacyPlanning()
  const migrated = transform(calendar)
  if (migrated !== calendar) wx.setStorageSync(calendarKey, migrated)
}

function savePlanningChange(change) {
  const state = readState() || makeState()
  const sequence = state.sequence + 1
  const planning = applyChange(state.planning, change)
  const pending = state.pending.concat({ ...change, sequence })
  wx.setStorageSync(storageKey, { ...state, sequence, planning, pending })
  syncPlanning()
}

function refreshVisiblePlanning() {
  if (typeof getCurrentPages !== 'function') return
  const pages = getCurrentPages()
  const current = pages[pages.length - 1]
  if (current && typeof current.refreshPlanningData === 'function') current.refreshPlanningData()
}

async function flushPlanning() {
  for (;;) {
    let state = readState()
    if (!state) {
      state = makeState()
      wx.setStorageSync(storageKey, state)
    }
    const operations = state.pending.slice(0, batchSize)
    const { result } = await wx.cloud.callFunction({
      name: 'syncKitchen',
      config: { env: cloudImageEnv },
      data: { planningVersion: 1, planningRequest: { clientId: state.clientId, operations } }
    })

    if (!result || !result.ok || result.planningVersion !== 1 || !result.planning ||
        !result.planning.meals || !result.planning.calendar || !Number.isSafeInteger(result.applied) ||
        (operations.length && result.applied < operations[operations.length - 1].sequence)) {
      throw new Error(result && result.error || 'invalid_response')
    }

    const current = readState()
    if (!current || current.clientId !== state.clientId) return
    const pending = current.pending.filter(operation => operation.sequence > result.applied)
    const planning = pending.reduce(applyChange, result.planning)
    const changed = JSON.stringify(planning) !== JSON.stringify(current.planning)
    if (changed || pending.length !== current.pending.length) wx.setStorageSync(storageKey, { ...current, planning, pending })
    if (changed) refreshVisiblePlanning()
    if (result.conflicts && typeof wx.showToast === 'function') {
      wx.showToast({ title: '其他设备已更新，已同步最新安排', icon: 'none' })
    }
    if (!pending.length) return
  }
}

function syncPlanning() {
  if (!wx.cloud || typeof wx.cloud.callFunction !== 'function') return
  if (!inFlight) {
    inFlight = Promise.resolve().then(flushPlanning)
      .catch(error => console.warn('用餐计划云同步暂未完成', error.errCode || error.code || error.message))
      .finally(() => { inFlight = null })
  }
  return inFlight
}

module.exports = { readPlanning, migrateLegacyCalendar, savePlanningChange, syncPlanning }
