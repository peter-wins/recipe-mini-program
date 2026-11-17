const { getIngredientOptions, getRecipe, resolveRecipeId, ingredientIds, availableIngredients } = require('./catalog')
const { readKitchen, saveKitchen } = require('./inventory')

const names = new Map(getIngredientOptions().map(item => [item.id, item.name]))
const packageUnits = new Set(['包', '袋', '盒', '瓶', '罐', '桶'])
const countUnits = new Set(['个', '根', '瓣', '片', '颗', '条', '块', '勺', '大勺', '小勺', '把', '棵', '只', '枚', '碗', '杯', '朵', '张', '节', '头', ...packageUnits])
const packagedSeasonings = new Set([
  '番茄酱', '豆瓣酱', '郫县豆瓣酱', '黄豆酱', '甜面酱', '海鲜酱', '沙拉酱',
  '食用油', '香油', '米醋', '白醋', '料酒', '生抽', '老抽', '蚝油', '酱油'
])
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

function groupShoppingItems(items) {
  const grouped = new Map()
  for (const item of items) {
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
    const name = names.get(key)
    const hasPackageQuantity = amounts.some(item => item && packageUnits.has(item.unit))
    let quantity = details[0].quantity
    if (packagedSeasonings.has(name) && !hasPackageQuantity) quantity = '1 份'
    else if (details.length > 1) quantity = total ? total.amount + ' ' + total.unit : '若干'
    return { key, name, ...total, quantity, details }
  })
}

function listShopping() {
  return groupShoppingItems(readKitchen().shopping)
}

function shoppingSourceKey({ recipeId, id }) {
  return JSON.stringify([resolveRecipeId(recipeId), shoppingIngredientId(id)])
}

function pendingMealShopping(recipeIds, kitchen, countRepeated) {
  const existing = new Map()
  for (const item of kitchen.shopping) {
    const key = shoppingSourceKey(item)
    existing.set(key, (existing.get(key) || 0) + 1)
  }
  const ids = recipeIds.map(resolveRecipeId)
  const recipes = new Map()
  return (countRepeated ? ids : [...new Set(ids)]).flatMap(recipeId => {
    if (!recipes.has(recipeId)) recipes.set(recipeId, getRecipe(recipeId, kitchen.inventory))
    const recipe = recipes.get(recipeId)
    if (!recipe) return []
    return recipe.missingItems.map(({ id, quantity }) => ({ recipeId, id, quantity })).filter(item => {
      const key = shoppingSourceKey(item)
      const covered = existing.get(key) || 0
      if (covered) existing.set(key, covered - 1)
      return !covered
    })
  })
}

function getMealShoppingPreview(recipeIds, { countRepeated = false } = {}) {
  const entries = pendingMealShopping(recipeIds, readKitchen(), countRepeated)
  return { items: groupShoppingItems(entries), sourceKeys: [...new Set(entries.map(shoppingSourceKey))] }
}

function saveMealShopping(recipeIds, sourceKeys, { countRepeated = false } = {}) {
  const kitchen = readKitchen()
  const approved = new Set(sourceKeys)
  const entries = pendingMealShopping(recipeIds, kitchen, countRepeated).filter(item => approved.has(shoppingSourceKey(item)))
  if (!entries.length) return false
  saveKitchen({ ...kitchen, shopping: kitchen.shopping.concat(entries) })
  return true
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

module.exports = {
  listShopping, getPurchaseItems, hasRecipeShopping, saveRecipeShopping, removeShoppingItem,
  getMealShoppingPreview, saveMealShopping
}
