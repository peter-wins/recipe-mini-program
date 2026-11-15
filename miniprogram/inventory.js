const { getIngredientOptions, ingredientIds, stapleIds } = require('./catalog')

const legacyKey = 'fridge-ingredient-ids-v1'
const key = 'recipe-kitchen-v1'
const ingredientNames = new Map(getIngredientOptions().map(item => [item.id, item.name]))
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

function readKitchen() {
  const stored = wx.getStorageSync(key)
  const ids = stored ? stored.inventory : wx.getStorageSync(legacyKey)
  return {
    inventory: Array.isArray(ids) ? [...new Set(ids.flatMap(ingredientIds).filter(id => ingredientNames.has(id)))] : [],
    shopping: restoreShopping(stored)
  }
}

function saveKitchen(kitchen) {
  wx.setStorageSync(key, kitchen)
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

function previewInventory(ids) {
  const ordered = ids.slice().sort((left, right) => Number(stapleIds.has(left)) - Number(stapleIds.has(right)))
  const inventoryPreview = ordered.slice(0, ingredientPreviewLimit).map(id => ({
    id, name: ingredientNames.get(id), icon: ingredientIcons.get(id) || ''
  }))
  return { inventoryPreview, extraIngredients: ordered.length - inventoryPreview.length }
}

module.exports = { readKitchen, saveKitchen, readInventory, saveInventory, summarizeInventory, previewInventory }
