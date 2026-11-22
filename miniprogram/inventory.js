const { getIngredientName, ingredientIds, stapleIds } = require('./catalog')
const { readSyncedKitchen, saveSyncedKitchen, syncKitchen } = require('./kitchen-sync')

const legacyKey = 'fridge-ingredient-ids-v1'
const key = 'recipe-kitchen-v1'
const ingredientPreviewLimit = 3
const ingredientIcons = new Map([
  ['egg', '🥚'], ['tomato', '🍅'], ['broccoli', '🥦'], ['enoki', '🍄'],
  ['potato', '🥔'], ['carrot', '🥕'], ['shrimp', '🦐'], ['cucumber', '🥒']
])

function restoreShopping(stored) {
  if (!Array.isArray(stored && stored.shopping)) return []

  const stock = { ...stored.quantities }
  const shopping = []
  for (const entry of stored.shopping) {
    if (!entry.useStock) {
      shopping.push(entry)
      continue
    }
    const { id, unit, recipeId, amount } = entry
    const available = Number.isFinite(stock[id]) ? Math.max(0, stock[id]) : 0
    const needed = Math.round(Math.max(0, amount - available) * 10) / 10
    stock[id] = Math.max(0, available - amount)
    if (needed) shopping.push({ id, unit, recipeId, amount: needed })
  }
  return shopping
}

function readLegacyKitchen() {
  const stored = wx.getStorageSync(key)
  const ids = stored ? stored.inventory : wx.getStorageSync(legacyKey)
  return {
    inventory: Array.isArray(ids) ? [...new Set(ids.flatMap(ingredientIds).filter(id => getIngredientName(id)))] : [],
    shopping: restoreShopping(stored)
  }
}

function readKitchen() {
  const synced = readSyncedKitchen()
  if (!synced) return readLegacyKitchen()
  return {
    inventory: [...new Set(synced.inventory.flatMap(ingredientIds).filter(id => getIngredientName(id)))],
    shopping: synced.shopping
  }
}

function saveKitchen(kitchen) {
  saveSyncedKitchen(readKitchen(), kitchen)
}

function syncInventory() {
  return syncKitchen(readLegacyKitchen)
}

function readInventory() {
  return readKitchen().inventory
}

function saveInventory(ids) {
  saveKitchen({ ...readKitchen(), inventory: ids })
}

function summarizeInventory(ids) {
  const staples = ids.filter(id => stapleIds.has(id)).length
  return { count: ids.length - staples, staples }
}

function previewInventory(ids, limit = ingredientPreviewLimit) {
  const ordered = ids.slice().sort((left, right) => Number(stapleIds.has(left)) - Number(stapleIds.has(right)))
  const inventoryPreview = ordered.slice(0, limit).map(id => ({
    id, name: getIngredientName(id), icon: ingredientIcons.get(id) || ''
  }))
  return { inventoryPreview, extraIngredients: ordered.length - inventoryPreview.length }
}

module.exports = { readKitchen, saveKitchen, syncInventory, readInventory, saveInventory, summarizeInventory, previewInventory }
