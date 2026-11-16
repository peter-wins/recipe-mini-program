const { ingredients, recipes: sourceRecipes, legacyRecipeIds } = require('./data')
const { recipeImage } = require('./recipe-image')
const { stepTimer } = require('./step-timer')
const { getDietTags, tagsFor, matchesTag } = require('./diet-tags')
const equivalentNames = new Map([
  ['青葱', 'scallion'], ['葱段', 'scallion'],
  ['大葱葱白', 'vibe-e5a4a7e891b1'],
  ['老姜', 'ginger'], ['姜丝', 'ginger'],
  ['蒜蓉', 'garlic'], ['蒜片', 'garlic'],
  ['西蓝花', 'broccoli'], ['猪五花肉', 'porkBelly'],
  ['米', 'vibe-e5a4a7e7b1b3'],
  ['味极鲜', 'soy'], ['味极鲜(生抽)', 'soy'], ['生抽酱油', 'soy'], ['老抽酱油', 'darkSoy'],
  ['植物油', 'oil'], ['精盐', 'salt'], ['耗油', 'oysterSauce'],
  ['白胡椒', 'whitePepper'], ['芝麻香油', 'sesame'], ['大料', 'starAnise'],
  ['蛋清', 'vibe-e9b8a1e89b8be6b885']
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

// 基础调味料保留原用量，统一归到辅料。
const stapleIds = new Set([
  'oil', 'salt', 'soy', 'darkSoy', 'vinegar', 'sugar', 'rockSugar',
  'starch', 'wine', 'oysterSauce', 'sesame', 'whitePepper', 'starAnise'
])
const seasoningNames = new Set([
  '葱', '葱白', '大葱', '大蒜', '姜', '香菜', '干辣椒', '小米辣', '小米椒',
  '辣椒油', '辣椒粉', '红辣椒粉', '干辣椒面',
  '花椒', '青花椒', '花椒粉', '花椒粒', '黑胡椒', '黑胡椒粉', '香叶', '桂皮',
  '豆瓣酱', '郫县豆瓣酱', '五香粉', '十三香', '孜然粉', '冰块'
])
const seasoningIds = new Set([
  ...stapleIds,
  ...Object.entries(ingredients).filter(([, [name]]) => seasoningNames.has(name)).map(([id]) => id)
])
const eggParts = Object.keys(ingredients).filter(id => ['鸡蛋清', '鸡蛋黄'].includes(ingredients[id][0]))

const sections = [['required', '必需食材'], ['optional', '可选食材'], ['pantry', '辅料']]
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
      const pantry = ingredientId === 'water' || (key === 'required' && stapleIds.has(ingredientId))
      groups[pantry ? 'pantry' : key].push([ingredientId, quantity, name])
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
    'tomato', 'cucumber', 'cabbage', 'bokchoy', 'broccoli', 'carrot', 'pepper', 'vibe-e99d92e6a492', 'onion',
    'spinach', 'corn', 'beanSprout', 'zucchini', 'pumpkin', 'peas', 'eggplant', 'greenBean',
    'celery', 'lettuce', 'babyCabbage', 'loofah', 'celeryStalk'
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
    'rice', 'vibe-e5a4a7e7b1b3', 'noodles', 'vibe-e88d9ee9baa6e99da2', 'nori', 'vermicelli', 'riceNoodle', 'flour', 'steamedBun',
    'dumplingWrapper', 'riceCake', 'brownRiceCooked', 'rolledOats', 'wholeWheatFlour', 'konjacNoodles'
  ]],
  ['厨房常备', [
    'scallion', 'vibe-e5a4a7e891b1', 'garlic', 'ginger', 'chili', 'cilantro',
    'oil', 'salt', 'soy', 'darkSoy', 'vinegar', 'sugar', 'rockSugar',
    'starch', 'wine', 'oysterSauce', 'sesame', 'whitePepper', 'starAnise'
  ]]
]
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
  const available = new Set(selection.flatMap(value => {
    const id = ingredientByAlias.get(String(value).trim())
    return id ? ingredientIds(id) : []
  }))
  if (available.has('egg')) {
    for (const part of eggParts) available.add(part)
  }
  return available
}

function formatWait(minutes) {
  if (minutes < 60) return minutes + ' 分钟'
  if (minutes >= 1440) return (Math.round(minutes / 144) / 10) + ' 天'
  return (Math.round(minutes / 6) / 10) + ' 小时'
}

// 原始数据显示「预计总时长（含等待）」；拆分过的显示动手时间；短菜保持原说法。
function durationLabel(recipe) {
  if (recipe.waitMinutes) return '动手时间'
  return recipe.minutes > 60 ? '预计总时长' : '烹饪时长'
}

function durationText(recipe) {
  if (recipe.waitMinutes) return recipe.minutes + ' 分钟动手'
  if (recipe.minutes > 60) return '约 ' + recipe.minutes + ' 分钟（含等待）'
  return recipe.minutes + ' 分钟'
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
    tags: tagsFor(recipe),
    image: recipeImage(recipe.coverPath),
    durationLabel: durationLabel(recipe),
    durationNote: !recipe.waitMinutes && recipe.minutes > 60 ? '含等待' : '',
    timeText: durationText(recipe),
    ...(recipe.waitMinutes ? { waitText: formatWait(recipe.waitMinutes) } : {}),
    groups,
    missingItems: groups.find(group => group.key === 'required').items.filter(item => item.missing),
    steps: recipe.steps.map(([title, body], index) => {
      const number = index + 1
      const image = recipe.stepImages === false ? '' : recipeImage('steps/' + recipe.id + '/step_' + number + '.jpg')
      const timer = stepTimer({ title, body })
      return { number, title, body, image, ...(timer || {}) }
    })
  }
}

function matchRecipes(selection, { category, maxMinutes, readyOnly, lightOnly, tag, search = '', rankByStock = true, avoidIds = [] } = {}) {
  const query = search.trim().toLowerCase()
  const available = availableIngredients(selection)
  const avoided = new Set(avoidIds.flatMap(id => ingredientIds(id)))
  const matches = recipes.filter(recipe =>
    (!avoided.size || !recipe.required.some(([id]) => avoided.has(canonicalIngredientId(id)))) &&
    (!lightOnly || recipe.light) && (!tag || matchesTag(recipe, tag)) &&
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
      timeText: durationText(recipe),
      difficulty: recipe.difficulty, required,
      tags: tagsFor(recipe),
      image: recipeImage(recipe.coverPath),
      ...(recipe.nutrition ? { calories: recipe.calories, nutrition: recipe.nutrition, servings: recipe.servings } : {}),
      hasMatchingMainIngredient: required.some(id => available.has(id) && !seasoningIds.has(id)),
      missingCount: missing.length,
      missingText: missing.map(id => ingredientById[id].name).join('、')
    }
  }).filter(recipe => !readyOnly || (recipe.required.length && recipe.missingCount === 0))
  return rankByStock ? matches.sort((left, right) => left.missingCount - right.missingCount) : matches
}

function groupFridgeMatches(matches) {
  const categories = ['水产', '荤菜', '素菜', '汤', '主食', '早餐', '其他']
  const candidates = matches.filter(recipe =>
    categories.includes(recipe.category) &&
    recipe.missingCount <= 1 && recipe.hasMatchingMainIngredient
  ).sort((left, right) => left.minutes - right.minutes)
  return {
    ready: candidates.filter(recipe => recipe.missingCount === 0),
    almost: candidates.filter(recipe => recipe.missingCount === 1)
  }
}

// 把“不要香菜、葱”这类日常说法转成食材 id，供全局推荐过滤。
function avoidIdsFromNotes(notes) {
  const clauses = String(notes || '').split(/[、,，。；;\n]+/)
  const ids = new Set()
  for (const clause of clauses) {
    const match = /^(?:不要(?:加|放)?|不吃|去掉|忌口[:：]?)\s*(.+)$/.exec(clause.trim())
    if (!match) continue
    for (const term of match[1].split(/[和与及]|、/)) {
      const name = term.trim()
      let id = ingredientByAlias.get(name)
      if (!id) {
        const lower = name.toLowerCase()
        for (const [alias, value] of ingredientByAlias) {
          if (alias.toLowerCase() === lower) { id = value; break }
        }
      }
      if (id) for (const resolved of ingredientIds(id)) ids.add(resolved)
    }
  }
  return [...ids]
}

module.exports = {
  getIngredientOptions, getIngredientGroups, searchIngredientOptions, getRecipeCategories, getRecipe, matchRecipes,
  groupFridgeMatches, stapleIds, resolveRecipeId, ingredientIds, availableIngredients, avoidIdsFromNotes,
  getDietTags, tagsFor, matchesTag
}
