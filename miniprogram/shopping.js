const { getIngredientOptions, resolveRecipeId, ingredientIds } = require('./catalog')
const { readKitchen, saveKitchen } = require('./inventory')

const names = new Map(getIngredientOptions().map(item => [item.id, item.name]))
const entryKey = item => item.id + ':' + (item.quantity ? 'text:' + item.quantity : item.unit)

function listShopping() {
  const grouped = new Map()
  for (const item of readKitchen().shopping) {
    const key = entryKey(item)
    if (item.quantity) {
      const previous = grouped.get(key)
      grouped.set(key, { key, name: names.get(item.id), quantity: item.quantity, count: previous ? previous.count + 1 : 1 })
      continue
    }
    const previous = grouped.get(key)
    const amount = Math.round(((previous ? previous.amount : 0) + item.amount) * 10) / 10
    grouped.set(key, { key, name: names.get(item.id), unit: item.unit, amount })
  }
  return [...grouped.values()]
}

function getPurchaseItems(recipe, inventory, overrides = {}) {
  const required = recipe.groups.find(group => group.key === 'required')
  return required.items.filter(item => typeof overrides[item.id] === 'boolean'
    ? overrides[item.id]
    : !inventory.includes(item.id))
}

function hasRecipeShopping(recipeId, shopping) {
  return shopping.some(item => resolveRecipeId(item.recipeId) === recipeId)
}

function saveRecipeShopping(recipe, overrides) {
  const kitchen = readKitchen()
  const missing = getPurchaseItems(recipe, kitchen.inventory, overrides)
  if (!missing.length && !hasRecipeShopping(recipe.id, kitchen.shopping)) return false
  const entries = missing.map(({ id, quantity }) => ({ recipeId: recipe.id, id, quantity }))
  saveKitchen({
    ...kitchen,
    shopping: kitchen.shopping.filter(item => resolveRecipeId(item.recipeId) !== recipe.id).concat(entries)
  })
  return true
}

function removeShoppingItem(key, bought) {
  const kitchen = readKitchen()
  const entry = kitchen.shopping.find(item => entryKey(item) === key)
  if (!entry) return

  saveKitchen({
    inventory: bought ? [...new Set([...kitchen.inventory, ...ingredientIds(entry.id)])] : kitchen.inventory,
    shopping: kitchen.shopping.filter(item => entryKey(item) !== key)
  })
}

module.exports = { listShopping, getPurchaseItems, hasRecipeShopping, saveRecipeShopping, removeShoppingItem }
