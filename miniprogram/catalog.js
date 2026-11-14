const { ingredients, recipes: sourceRecipes, legacyRecipeIds } = require('./data')
const { recipeImage } = require('./recipe-image')
const equivalentNames = new Map([
  ['青葱', 'scallion'],
  ['老姜', 'ginger'], ['味极鲜', 'soy'], ['味极鲜(生抽)', 'soy'], ['植物油', 'oil']
])
for (const name of [
  '沸水', '100°C 沸水', '30°C 温水', '30℃ 温水', '冰水', '温水或高汤',
  '70度纯净水', '60度纯净水', '清水（蒸饭用）', '清水（发酵用）',
  '凉白开水', '凉水', '水（温水）', '温水(30-40 ℃)'
]) equivalentNames.set(name, 'water')
const ingredientIdAliases = new Map(Object.entries(ingredients)
  .filter(([, [name]]) => equivalentNames.has(name))
  .map(([id, [name]]) => [id, equivalentNames.get(name)]))

function canonicalIngredientId(id) {
  return ingredientIdAliases.get(id) || id
}

const scallionGingerGarlic = Object.keys(ingredients).find(id => ingredients[id][0] === '葱、姜、蒜')
const compositeIngredients = new Map([[scallionGingerGarlic, ['scallion', 'ginger', 'garlic']]])

function ingredientIds(id) {
  return compositeIngredients.get(id) || [canonicalIngredientId(id)]
}

const sections = [['required', '必需食材'], ['optional', '可选食材'], ['pantry', '基础调味料及用水']]
const recipes = sourceRecipes.map(recipe => {
  const groups = { required: [], optional: [], pantry: [] }
  for (const [key] of sections) {
    for (const [id, quantity, name] of recipe[key]) {
      const components = compositeIngredients.get(id)
      if (components) {
        for (const component of components) {
          groups[key].push([component, '葱姜蒜' + quantity, ingredients[component][0]])
        }
        continue
      }
      const ingredientId = canonicalIngredientId(id)
      groups[ingredientId === 'water' ? 'pantry' : key].push([ingredientId, quantity, name])
    }
  }
  return { ...recipe, ...groups }
})
const recipeById = new Map(recipes.map(recipe => [recipe.id, recipe]))

function resolveRecipeId(id) {
  return Object.prototype.hasOwnProperty.call(legacyRecipeIds, id) ? legacyRecipeIds[id] : id
}

const ingredientOptions = Object.entries(ingredients).map(([id, [name, ...aliases]]) => ({ id, name, aliases }))
const ingredientById = Object.fromEntries(ingredientOptions.map(item => [item.id, item]))
for (const item of ingredientOptions) {
  const id = canonicalIngredientId(item.id)
  if (id !== item.id) ingredientById[id].aliases.push(item.name, ...item.aliases)
}
const ingredientByAlias = new Map(ingredientOptions.flatMap(item =>
  [item.id, item.name, ...item.aliases].map(alias => [alias, canonicalIngredientId(item.id)])
))
const ingredientGroups = [
  ['蔬菜', [
    'tomato', 'cucumber', 'cabbage', 'bokchoy', 'broccoli', 'carrot', 'pepper', 'onion',
    'spinach', 'corn', 'beanSprout', 'zucchini', 'pumpkin', 'peas', 'eggplant', 'greenBean',
    'celery', 'lettuce', 'babyCabbage'
  ]],
  ['菌菇和根茎', [
    'potato', 'mushroom', 'enoki', 'lotusRoot', 'radish', 'winterMelon', 'yam', 'sweetPotato'
  ]],
  ['蛋奶和豆制品', ['egg', 'tofu', 'driedTofu', 'driedTofuStick', 'milk']],
  ['肉和水产', [
    'chicken', 'thigh', 'pork', 'ribs', 'mince', 'beef', 'shrimp', 'cod',
    'porkBelly', 'chickenWings', 'beefBrisket', 'seaBass', 'hairtail', 'squid'
  ]],
  ['米面和主食', [
    'rice', 'noodles', 'nori', 'vermicelli', 'riceNoodle', 'flour', 'steamedBun',
    'dumplingWrapper', 'riceCake'
  ]],
  ['厨房常备', [
    'scallion', 'vibe-e5a4a7e891b1', 'garlic', 'ginger', 'chili', 'cilantro',
    'oil', 'salt', 'soy', 'darkSoy', 'vinegar', 'sugar', 'rockSugar',
    'starch', 'wine', 'oysterSauce', 'sesame', 'whitePepper', 'starAnise'
  ]]
]
// 常备调味不算“食材”，只用来记录家里有哪几样，不影响推荐
const stapleIds = new Set([
  'oil', 'salt', 'soy', 'darkSoy', 'vinegar', 'sugar', 'rockSugar',
  'starch', 'wine', 'oysterSauce', 'sesame', 'whitePepper', 'starAnise'
])
// 水不进清单：没人会记录“我家有水”
const hiddenIds = new Set(['water'])
const searchableIngredients = ingredientOptions.filter(item =>
  !hiddenIds.has(item.id) && !ingredientIdAliases.has(item.id) && !compositeIngredients.has(item.id))

function getIngredientOptions() {
  return ingredientOptions.filter(item => !hiddenIds.has(item.id))
}

function getRecipeCategories() {
  return [...new Set(recipes.map(recipe => recipe.category))]
}

function getIngredientGroups() {
  return ingredientGroups.map(([name, ids]) => ({ name, items: ids.map(id => ingredientById[id]).filter(Boolean) }))
}

function searchIngredientOptions(search) {
  const query = search.trim().toLowerCase()
  if (!query) return []
  const exact = []
  const partial = []
  for (const item of searchableIngredients) {
    const names = [item.name, ...item.aliases].map(name => name.toLowerCase())
    if (names.includes(query)) exact.push(item)
    else if (names.some(name => name.includes(query))) partial.push(item)
  }
  return exact.concat(partial)
}

function availableIngredients(selection) {
  return new Set(selection.flatMap(value => ingredientIds(ingredientByAlias.get(String(value).trim()))))
}

function getRecipe(id, selection) {
  const recipe = recipeById.get(resolveRecipeId(id))
  if (!recipe) return null

  const available = selection && availableIngredients(selection)
  const groups = sections.map(([key, label]) => ({
    key,
    label,
    items: recipe[key].map(([ingredientId, quantity, name], index) => ({
      id: ingredientId,
      rowKey: key + ':' + index,
      name,
      quantity,
      missing: Boolean(available && key === 'required' && !available.has(ingredientId))
    }))
  }))

  return {
    ...recipe,
    image: recipeImage(recipe.coverPath),
    groups,
    missingItems: groups.find(group => group.key === 'required').items.filter(item => item.missing),
    steps: recipe.steps.map(([title, body], index) => {
      const number = index + 1
      return { number, title, body, image: recipeImage('steps/' + recipe.id + '/step_' + number + '.jpg') }
    })
  }
}

function matchRecipes(selection, { category, maxMinutes, readyOnly, search = '', rankByStock = true } = {}) {
  const query = search.trim().toLowerCase()
  const available = availableIngredients(selection)
  const matches = recipes.filter(recipe =>
    (!category || recipe.category === category) && (!maxMinutes || recipe.minutes <= maxMinutes) &&
    (!query || recipe.name.includes(query) || recipe.required.concat(recipe.optional).some(([id]) => {
      const item = ingredientById[id]
      return [item.name, ...item.aliases].some(name => name.toLowerCase().includes(query))
    }))
  ).map(recipe => {
    const required = [...new Set(recipe.required.map(([id]) => id))]
    const missing = required.filter(id => !available.has(id))
    return {
      id: recipe.id, name: recipe.name, category: recipe.category, minutes: recipe.minutes,
      difficulty: recipe.difficulty, required,
      image: recipeImage(recipe.coverPath),
      missingCount: missing.length,
      missingText: missing.map(id => ingredientById[id].name).join('、')
    }
  }).filter(recipe => !readyOnly || (recipe.required.length && recipe.missingCount === 0))
  return rankByStock ? matches.sort((left, right) => left.missingCount - right.missingCount) : matches
}

module.exports = {
  getIngredientOptions, getIngredientGroups, searchIngredientOptions, getRecipeCategories, getRecipe, matchRecipes,
  stapleIds, resolveRecipeId, ingredientIds
}
