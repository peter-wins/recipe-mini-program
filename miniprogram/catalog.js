const bundled = require('./data')
const { legacyRecipeIds } = bundled
const { recipeImage } = require('./recipe-image')
const { stepTimer } = require('./step-timer')
const { recipeTaxonomy, orderRecipeTags, fatLossTag } = require('./recipe-taxonomy')
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
const sections = [['required', '必需食材'], ['optional', '可选食材'], ['pantry', '辅料']]
const hiddenIds = new Set(['water'])

function createCatalog(source) {
  const { ingredients, recipes: sourceRecipes } = source
  const entries = Object.entries(ingredients)
  const ingredientIdAliases = new Map(entries
    .filter(([, [name]]) => equivalentNames.has(name))
    .map(([id, [name]]) => [id, equivalentNames.get(name)]))
  const scallionGingerGarlic = entries.find(([, [name]]) => name === '葱、姜、蒜')
  const compositeIngredients = new Map(scallionGingerGarlic ? [[scallionGingerGarlic[0], ['scallion', 'ginger', 'garlic']]] : [])
  const seasoningIds = new Set([...stapleIds, ...entries.filter(([, [name]]) => seasoningNames.has(name)).map(([id]) => id)])
  const eggParts = entries.filter(([, [name]]) => ['鸡蛋清', '鸡蛋黄'].includes(name)).map(([id]) => id)
  const ingredientOptions = entries.map(([id, [name, ...aliases]]) => ({ id, name, aliases }))
  const ingredientById = new Map(ingredientOptions.map(item => [item.id, item]))
  for (const item of ingredientOptions) {
    const canonical = ingredientById.get(ingredientIdAliases.get(item.id))
    if (canonical && canonical !== item) canonical.aliases.push(item.name, ...item.aliases)
  }
  const ingredientByAlias = new Map(ingredientOptions.flatMap(item =>
    [item.id, item.name, ...item.aliases].map(alias => [alias, ingredientIdAliases.get(item.id) || item.id])))
  const searchableIngredients = ingredientOptions.filter(item =>
    !hiddenIds.has(item.id) && !ingredientIdAliases.has(item.id) && !compositeIngredients.has(item.id))
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
        const ingredientId = ingredientIdAliases.get(id) || id
        const pantry = ingredientId === 'water' || (key === 'required' && stapleIds.has(ingredientId))
        groups[pantry ? 'pantry' : key].push([ingredientId, quantity, name])
      }
    }
    return { ...recipe, ...groups, ...recipeTaxonomy(recipe) }
  })
  const recipeById = new Map(recipes.map(recipe => [recipe.id, recipe]))
  return { source, recipes, recipeById, ingredientOptions, ingredientById, ingredientByAlias,
    searchableIngredients, ingredientIdAliases, compositeIngredients, seasoningIds, eggParts }
}

let catalog = createCatalog(bundled)

function replaceCatalog(source) {
  catalog = createCatalog(source)
}

function getCatalogSource() {
  return catalog.source
}

function canonicalIngredientId(id) {
  return catalog.ingredientIdAliases.get(id) || id
}

function ingredientIds(id) {
  return catalog.compositeIngredients.get(id) || [canonicalIngredientId(id)]
}

function getRecipeTags() {
  return orderRecipeTags(catalog.recipes.flatMap(recipe => recipe.tags))
}

function resolveRecipeId(id) {
  return Object.prototype.hasOwnProperty.call(legacyRecipeIds, id) ? legacyRecipeIds[id] : id
}

const ingredientGroups = [
  ['蔬菜', [
    'tomato', 'cucumber', 'cabbage', 'bokchoy', 'broccoli', 'carrot', 'pepper', 'vibe-e99d92e6a492', 'onion',
    'spinach', 'corn', 'beanSprout', 'zucchini', 'pumpkin', 'peas', 'eggplant', 'greenBean',
    'celery', 'lettuce', 'babyCabbage', 'loofah', 'celeryStalk',
    'vibe-e5b08fe7b1b3e8bea3', 'vibe-e5b08fe7b1b3e6a492', 'vibe-e99d92e8bea3e6a492', 'vibe-e69fa0e6aaac'
  ]],
  ['菌菇和根茎', [
    'potato', 'mushroom', 'enoki', 'lotusRoot', 'radish', 'winterMelon', 'yam'
  ]],
  ['蛋奶和豆制品', ['egg', 'tofu', 'driedTofu', 'milk']],
  ['肉和水产', [
    'chicken', 'thigh', 'pork', 'ribs', 'mince', 'beef', 'shrimp', 'cod',
    'porkBelly', 'beefBrisket', 'seaBass'
  ]],
  ['米面和主食', [
    'rice', 'vibe-e5a4a7e7b1b3', 'noodles', 'vibe-e88d9ee9baa6e99da2', 'nori', 'vermicelli', 'riceNoodle', 'flour', 'steamedBun',
    'riceCake', 'brownRiceCooked', 'rolledOats', 'wholeWheatFlour', 'konjacNoodles'
  ]],
  ['厨房常备', [
    'scallion', 'vibe-e5a4a7e891b1', 'garlic', 'ginger', 'chili', 'cilantro',
    'oil', 'salt', 'soy', 'darkSoy', 'vinegar', 'sugar', 'rockSugar',
    'starch', 'wine', 'oysterSauce', 'sesame', 'whitePepper', 'starAnise',
    'vibe-e799bde88a9de9babb', 'vibe-e88a9de9babb'
  ]]
]
function getIngredientOptions() {
  return catalog.ingredientOptions.filter(item => !hiddenIds.has(item.id))
}

function getIngredientName(id) {
  const item = catalog.ingredientById.get(id)
  return item && !hiddenIds.has(id) ? item.name : ''
}

function findIngredientId(name) {
  return catalog.ingredientByAlias.get(name.trim())
}

function getRecipeCategories() {
  return [...new Set(catalog.recipes.map(recipe => recipe.libraryCategory))]
}

function getIngredientGroups() {
  return ingredientGroups.map(([name, ids]) => ({ name, items: ids.map(id => catalog.ingredientById.get(id)).filter(Boolean) }))
}

function searchIngredientOptions(search) {
  const query = search.trim().toLowerCase()
  if (!query) return []
  const exact = []
  const partial = []
  for (const item of catalog.searchableIngredients) {
    const names = [item.name, ...item.aliases].map(name => name.toLowerCase())
    if (names.includes(query)) exact.push(item)
    else if (names.some(name => name.includes(query))) partial.push(item)
  }
  return exact.concat(partial)
}

function availableIngredients(selection) {
  const available = new Set(selection.flatMap(value => {
    const id = catalog.ingredientByAlias.get(String(value).trim())
    return id ? ingredientIds(id) : []
  }))
  if (available.has('egg')) {
    for (const part of catalog.eggParts) available.add(part)
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
  const recipe = catalog.recipeById.get(resolveRecipeId(id))
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

const searchSeparators = /[\s,，、;；]+/g

function searchRank(recipe, terms, phrase) {
  const title = recipe.name.toLowerCase().replace(searchSeparators, '')
  if (title === phrase) return 0
  if (title.includes(phrase)) return 1
  const remaining = terms.filter(term => !title.includes(term))
  if (!remaining.length) return 2

  let rank = 3
  for (const term of remaining) {
    const ingredientId = catalog.ingredientByAlias.get(term)
    if (ingredientId && recipe.required.some(([id]) => id === ingredientId)) rank += 1
    else if (ingredientId && recipe.optional.some(([id]) => id === ingredientId)) rank += 2
    else {
      if (ingredientId && terms.length > 1) return -1
      const partial = recipe.required.concat(recipe.optional).some(([id]) => {
        const { name, aliases } = catalog.ingredientById.get(id)
        return [name, ...aliases].some(value => value.toLowerCase().includes(term))
      })
      if (!partial) return -1
      rank += 3
    }
  }
  return rank
}

function matchRecipes(selection, { category, tag, maxMinutes, readyOnly, lightOnly, servings, search = '', rankByStock = true, avoidIds = [] } = {}) {
  const tokens = search.toLowerCase().split(searchSeparators).filter(Boolean)
  const terms = [...new Set(tokens)]
  const phrase = tokens.join('')
  const ranks = new Map()
  const available = availableIngredients(selection)
  const avoided = new Set(avoidIds.flatMap(id => ingredientIds(id)))
  const matches = catalog.recipes.filter(recipe =>
    (!avoided.size || !recipe.required.some(([id]) => avoided.has(canonicalIngredientId(id)))) &&
    (!lightOnly || recipe.light) && (!category || recipe.libraryCategory === category) &&
    (!tag || recipe.tags.includes(tag)) && (!maxMinutes || recipe.minutes <= maxMinutes) &&
    (!servings || recipe.servings === servings)
  ).filter(recipe => {
    if (!terms.length) return true
    const rank = searchRank(recipe, terms, phrase)
    if (rank < 0) return false
    ranks.set(recipe.id, rank)
    return true
  }).map(recipe => {
    const required = [...new Set(recipe.required.map(([id]) => id))]
    const missing = required.filter(id => !available.has(id))
    return {
      id: recipe.id, name: recipe.name, category: recipe.category, libraryCategory: recipe.libraryCategory,
      minutes: recipe.minutes,
      timeText: durationText(recipe),
      difficulty: recipe.difficulty, required,
      image: recipeImage(recipe.coverPath),
      ...(recipe.nutrition ? { calories: recipe.calories, nutrition: recipe.nutrition, servings: recipe.servings } : {}),
      hasMatchingMainIngredient: required.some(id => available.has(id) && !catalog.seasoningIds.has(id)),
      missingCount: missing.length,
      missingText: missing.map(id => catalog.ingredientById.get(id).name).join('、')
    }
  }).filter(recipe => !readyOnly || (recipe.required.length && recipe.missingCount === 0))
  if (!terms.length && !rankByStock) return matches
  return matches.sort((left, right) => (terms.length ? ranks.get(left.id) - ranks.get(right.id) : 0) ||
    (rankByStock ? left.missingCount - right.missingCount : 0))
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
      let id = catalog.ingredientByAlias.get(name)
      if (!id) {
        const lower = name.toLowerCase()
        for (const [alias, value] of catalog.ingredientByAlias) {
          if (alias.toLowerCase() === lower) { id = value; break }
        }
      }
      if (id) for (const resolved of ingredientIds(id)) ids.add(resolved)
    }
  }
  return [...ids]
}

module.exports = {
  replaceCatalog, getCatalogSource, getIngredientName, findIngredientId, getIngredientOptions, getIngredientGroups, searchIngredientOptions, getRecipeCategories, getRecipe, matchRecipes,
  getRecipeTags, fatLossTag, groupFridgeMatches, stapleIds, resolveRecipeId, ingredientIds, availableIngredients, avoidIdsFromNotes
}
