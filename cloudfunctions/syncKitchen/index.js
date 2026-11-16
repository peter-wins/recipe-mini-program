const crypto = require('node:crypto')
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const kitchens = db.collection('user_kitchens')
const miniProgramAppId = 'wx93924f2e0ea07371'
const scope = 'personal'
const recipeLists = ['favorites', 'cooked']

function isKey(value) {
  return typeof value === 'string' && value.length > 0 && value.length <= 200
}

function isShoppingItem(item) {
  return item && isKey(item.id) && isKey(item.recipeId) &&
    (item.quantity === undefined || typeof item.quantity === 'string' && item.quantity.length <= 300) &&
    (item.unit === undefined || typeof item.unit === 'string' && item.unit.length <= 100) &&
    (item.amount === undefined || Number.isFinite(item.amount))
}

function shoppingItem({ recipeId, id, quantity, unit, amount }) {
  const item = { recipeId, id }
  if (quantity !== undefined) item.quantity = quantity
  if (unit !== undefined) item.unit = unit
  if (amount !== undefined) item.amount = amount
  return item
}

function validRecipeRecord(change) {
  return change === undefined || change && recipeLists.includes(change.list) && isKey(change.id) &&
    typeof change.present === 'boolean' && (change.list === 'favorites' || change.present)
}

function validInput({ clientId, seed, recordSeed, operations }) {
  return typeof clientId === 'string' && /^[a-z0-9-]{8,64}$/.test(clientId) &&
    (seed === null || seed && Array.isArray(seed.inventory) && seed.inventory.every(isKey) &&
      Array.isArray(seed.shopping) && seed.shopping.every(isShoppingItem)) &&
    (recordSeed == null || recipeLists.every(list => Array.isArray(recordSeed[list]) && recordSeed[list].every(isKey))) &&
    Array.isArray(operations) && operations.length <= 32 && operations.every((operation, index) =>
      operation && Number.isSafeInteger(operation.sequence) && operation.sequence > 0 &&
      validRecipeRecord(operation.recipeRecord) &&
      (index === 0 || operation.sequence === operations[index - 1].sequence + 1) &&
      Array.isArray(operation.added) && operation.added.every(isKey) &&
      Array.isArray(operation.removed) && operation.removed.every(isKey) &&
      Array.isArray(operation.shopping) && operation.shopping.every(change =>
        change && isKey(change.id) && isKey(change.recipeId) && Array.isArray(change.items) &&
        change.items.every(item => isShoppingItem(item) && item.recipeId === change.recipeId && item.id === change.id)))
}

function applyOperations(kitchen, operations) {
  const inventory = new Set(kitchen.inventory)
  const shopping = new Map()
  for (const item of kitchen.shopping) {
    const key = JSON.stringify([item.recipeId, item.id])
    if (!shopping.has(key)) shopping.set(key, [])
    shopping.get(key).push(item)
  }

  for (const operation of operations) {
    for (const id of operation.removed) inventory.delete(id)
    for (const id of operation.added) inventory.add(id)
    for (const { recipeId, id, items } of operation.shopping) {
      const key = JSON.stringify([recipeId, id])
      if (items.length) shopping.set(key, items.map(shoppingItem))
      else shopping.delete(key)
    }
  }
  return { inventory: Array.from(inventory), shopping: Array.from(shopping.values()).flat() }
}

function mergeRecipeRecords(existing, seed, operations) {
  const records = { ...existing }
  for (const list of recipeLists) {
    // An existing empty list records a deletion and must never be seeded again.
    if (!records[list] && seed && seed[list].length) records[list] = [...new Set(seed[list])]
  }
  for (const { recipeRecord } of operations) {
    if (!recipeRecord) continue
    const { list, id, present } = recipeRecord
    const ids = (records[list] || []).filter(item => item !== id)
    records[list] = present ? [id, ...ids] : ids
  }
  return records
}

function syncResult(applied, kitchen, records) {
  return { ok: true, applied, kitchen, records: { favorites: records.favorites || [], cooked: records.cooked || [] } }
}

async function findKitchen(id) {
  const { data } = await kitchens.where({ _id: id }).limit(1).get()
  return data[0]
}

exports.main = async event => {
  const { APPID, OPENID } = cloud.getWXContext()
  if (!OPENID || APPID !== miniProgramAppId) return { ok: false, error: 'unauthorized' }
  if (!event || JSON.stringify(event).length > 500000 || !validInput(event)) return { ok: false, error: 'invalid_input' }

  // Derive the document from the verified caller, never from request data.
  const id = crypto.createHash('sha256').update(APPID + ':' + OPENID).digest('hex').slice(0, 32)
  const { clientId, operations, seed, recordSeed } = event
  const base = seed ? { inventory: seed.inventory, shopping: seed.shopping.map(shoppingItem) } : { inventory: [], shopping: [] }

  for (let attempt = 0; attempt < 5; attempt++) {
    const record = await findKitchen(id)
    const applied = record ? record.applied[clientId] || 0 : 0
    const pending = operations.filter(operation => operation.sequence > applied)
    const previousRecords = record && record.records || {}
    const records = mergeRecipeRecords(previousRecords, recordSeed, pending)
    if (record && !pending.length && Object.keys(records).length === Object.keys(previousRecords).length) {
      return syncResult(applied, record.kitchen, records)
    }
    if (!record && !pending.length && !base.inventory.length && !base.shopping.length && !Object.keys(records).length) {
      return syncResult(applied, base, records)
    }

    const kitchen = applyOperations(record ? record.kitchen : base, pending)
    const sequence = pending.length ? pending[pending.length - 1].sequence : applied
    const acknowledgements = { ...(record && record.applied), [clientId]: sequence }
    if (!record) {
      try {
        await kitchens.add({ data: { _id: id, _openid: OPENID, scope, version: 1, applied: acknowledgements, kitchen, records } })
        return syncResult(sequence, kitchen, records)
      } catch (error) {
        // A second device may have created the same document after our read.
        if (!await findKitchen(id)) throw error
        continue
      }
    }

    // Updating a single matching revision atomically keeps a purchase and its inventory update together.
    const { stats } = await kitchens.where({ _id: id, version: record.version }).update({ data: {
      version: db.command.inc(1),
      applied: db.command.set(acknowledgements),
      kitchen: db.command.set(kitchen),
      records: db.command.set(records)
    } })
    if (stats.updated === 1) return syncResult(sequence, kitchen, records)
  }

  return { ok: false, error: 'sync_conflict' }
}
