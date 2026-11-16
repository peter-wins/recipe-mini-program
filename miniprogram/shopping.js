const { getIngredientOptions, getRecipe, resolveRecipeId, ingredientIds, availableIngredients } = require('./catalog')
const { readKitchen, saveKitchen } = require('./inventory')

const names = new Map(getIngredientOptions().map(item => [item.id, item.name]))
const countUnits = new Set(['个', '根', '瓣', '片', '颗', '条', '块', '勺', '大勺', '小勺', '把', '棵', '只', '枚', '包', '袋', '盒', '瓶', '罐', '碗', '杯', '朵', '张', '节', '头'])
const metricUnits = new Map([
  ['g', ['克', 1]], ['克', ['克', 1]], ['kg', ['克', 1000]], ['千克', ['克', 1000]], ['公斤', ['克', 1000]],
  ['ml', ['毫升', 1]], ['毫升', ['毫升', 1]], ['l', ['毫升', 1000]], ['升', ['毫升', 1000]]
])

function shoppingIngredientId(id) {
  const ids = ingredientIds(id)
  return ids.length === 1 ? ids[0] : id
}

function exactQuantity(item) {
  const match = /^(\d+(?:\.\d+)?)\s*([^\s]+)$/.exec(item.quantity ? item.quantity.trim() : item.amount + ' ' + item.unit)
  if (!match) return null
  const number = Number(match[1])
  if (!Number.isFinite(number)) return null
  const unit = match[2].toLowerCase()
  if (countUnits.has(unit)) return { amount: number, unit }
  const metric = metricUnits.get(unit)
  return metric ? { amount: number * metric[1], unit: metric[0] } : null
}

function listShopping() {
  const grouped = new Map()
  for (const item of readKitchen().shopping) {
    const key = shoppingIngredientId(item.id)
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key).push(item)
  }

  const titles = new Map()
  return [...grouped].map(([key, entries]) => {
    const details = entries.map((item, index) => {
      if (!titles.has(item.recipeId)) {
        const recipe = getRecipe(item.recipeId)
        titles.set(item.recipeId, recipe ? recipe.name : '旧菜谱')
      }
      return { key: index, title: titles.get(item.recipeId), quantity: item.quantity || item.amount + ' ' + item.unit }
    })
    const amounts = entries.map(exactQuantity)
    const first = amounts[0]
    const total = first && amounts.every(item => item && item.unit === first.unit)
      ? { amount: Number(amounts.reduce((sum, item) => sum + item.amount, 0).toFixed(6)), unit: first.unit }
      : null
    const separateQuantities = details.length > 1 && !total
    const quantity = total && details.length > 1 ? total.amount + ' ' + total.unit
      : separateQuantities ? '分项用量' : details[0].quantity
    return { key, name: names.get(key), ...total, quantity, details, separateQuantities }
  })
}

function getPurchaseItems(recipe, inventory, overrides = {}) {
  const available = availableIngredients(inventory)
  const required = recipe.groups.find(group => group.key === 'required')
  return required.items.filter(item => typeof overrides[item.id] === 'boolean'
    ? overrides[item.id]
    : !available.has(item.id))
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
  const shopping = kitchen.shopping.filter(item => shoppingIngredientId(item.id) !== key)
  if (shopping.length === kitchen.shopping.length) return false

  saveKitchen({
    inventory: bought ? [...new Set([...kitchen.inventory, ...ingredientIds(key)])] : kitchen.inventory,
    shopping
  })
  return true
}

module.exports = { listShopping, getPurchaseItems, hasRecipeShopping, saveRecipeShopping, removeShoppingItem }
