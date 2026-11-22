const { readPlanning, savePlanningChange } = require('./planning-sync')
const { getRecipe, getIngredientName, matchRecipes, availableIngredients, resolveRecipeId } = require('./catalog')

const legacyPlans = [
  { id: 'fish-rice', title: '蒸鱼青菜饭', recipes: ['other_qing-zheng-lu-yu', 'vegetable_dish_chao-qing-cai'], serveWithRice: true },
  { id: 'egg-broccoli', title: '蒸蛋西兰花饭', recipes: ['breakfast_zheng-shui-dan', 'vegetable_dish_suan-rong-xi-lan-hua'], serveWithRice: true },
  { id: 'tofu-pumpkin', title: '凉拌豆腐配蒸南瓜', recipes: ['vegetable_dish_liang-ban-dou-fu', 'vegetable_dish_qing-zheng-nan-gua'] },
  { id: 'pork-rice', title: '香干肉丝配饭', recipes: ['meat_dish_xiang-gan-rou-si'], serveWithRice: true },
  { id: 'shrimp-rice', title: '白灼虾配黄瓜饭', recipes: ['other_bai-zhuo-xia', 'vegetable_dish_liang-ban-huang-gua'], serveWithRice: true },
  { id: 'tomato-egg-rice', title: '番茄蛋花汤配青菜饭', recipes: ['soup_xi-hong-shi-ji-dan-tang', 'vegetable_dish_chao-qing-cai'], serveWithRice: true }
]
const familyPlans = [
  {
    id: 'family-pork-and-egg',
    title: '肉末滑蛋家常餐',
    serveWithRice: true,
    recipes: ['meat_dish_suan-tai-chao-rou-mo', 'other_chao-hua-dan', 'vegetable_dish_pi-dan-dou-fu', 'soup_jin-zhen-gu-tang']
  },
  {
    id: 'family-steamed-fish',
    title: '清蒸鲈鱼家常餐',
    serveWithRice: true,
    recipes: ['other_qing-zheng-lu-yu', 'vegetable_dish_chao-qing-cai', 'vegetable_dish_xi-hong-shi-chao-ji-dan', 'soup_huang-gua-pi-dan-tang']
  },
  {
    id: 'family-tofu-and-pork',
    title: '香干肉丝家常餐',
    serveWithRice: true,
    recipes: ['meat_dish_xiang-gan-rou-si', 'vegetable_dish_liang-ban-huang-gua', 'vegetable_dish_qing-zheng-nan-gua', 'soup_zi-cai-dan-hua-tang']
  }
]

const lightPairings = [
  {
    id: 'light-rice-and-greens',
    title: '鸡胸糙米饭配蒜蓉娃娃菜',
    recipes: ['light_chicken-brown-rice', 'light_garlic-steamed-baby-cabbage'],
    servings: 1,
    showNutrition: true
  },
  {
    id: 'light-noodles-and-soup',
    title: '鸡丝荞麦面配番茄金针菇汤',
    recipes: ['light_cold-chicken-buckwheat-noodles', 'light_tomato-enoki-soup'],
    servings: 1,
    showNutrition: true
  }
]
const lightMealRecipeIds = [
  'light_chicken-brown-rice',
  'light_cold-chicken-buckwheat-noodles',
  'light_tomato-shrimp-buckwheat-noodles'
]
const soloMealRecipeIds = [
  'other_xi-hong-shi-ji-dan-gua-mian',
  'staple_zhao-shao-ji-tui-fan',
  'other_dou-jiao-men-mian'
]

function summarizePlan(plan, available) {
  const dishes = plan.recipes.map(id => getRecipe(id))
  if (dishes.some(dish => !dish)) return null
  if (plan.servings === 1 && dishes.some(dish => dish.servings !== 1)) return null
  const required = dishes.flatMap(dish => dish.required.map(([id]) => id))
  const missing = [...new Set(required)].filter(id => !available.has(id))
  const nutrition = plan.showNutrition && dishes.every(dish =>
    Number.isFinite(dish.calories) && Number.isFinite(dish.nutrition && dish.nutrition.protein))
    ? {
        calories: dishes.reduce((total, dish) => total + dish.calories, 0),
        protein: Math.round(dishes.reduce((total, dish) => total + dish.nutrition.protein, 0) * 10) / 10
      }
    : null

  return {
    id: plan.id,
    title: plan.title || (dishes.length === 1 ? dishes[0].name : dishes[0].name + '搭配'),
    dishes: dishes.map(({ id, name, image }) => ({ id, name, image })),
    serveWithRice: Boolean(plan.serveWithRice),
    servings: plan.servings,
    minutes: dishes.reduce((total, dish) => total + dish.minutes + (dish.waitMinutes || 0), 0),
    missingCount: missing.length,
    missingText: missing.map(id => getIngredientName(id)).join('、'),
    ...(nutrition ? { nutrition } : {})
  }
}

const lightPlans = lightPairings.concat(lightMealRecipeIds.map(id => ({ id, recipes: [id], servings: 1, showNutrition: true })))
const soloPlans = soloMealRecipeIds.map(id => ({ id, recipes: [id], servings: 1 }))
const plansByGoal = { family: familyPlans, light: lightPlans, solo: soloPlans }
const currentPlans = familyPlans.concat(lightPlans, soloPlans)
const sessionAdjustments = new Map()
const familyDishCategories = new Set(['荤菜', '素菜', '海鲜', '蛋类'])

function adjustedPlan(plan) {
  const recipes = sessionAdjustments.get(plan.id)
  return recipes ? { ...plan, recipes, title: '' } : plan
}

function readCustomMeals() {
  if (typeof wx === 'undefined' || typeof wx.getStorageSync !== 'function') return []
  return Object.values(readPlanning().meals).reverse().map(meal => {
    if (meal.hasCustomTitle || !meal.title || !Array.isArray(meal.recipes)) return meal
    const firstDish = getRecipe(meal.recipes[0])
    const generatedTitle = firstDish && (meal.title === firstDish.name ||
      (meal.title.startsWith(firstDish.name) && /^等[0-9]+道菜$/.test(meal.title.slice(firstDish.name.length))))
    return generatedTitle ? { ...meal, title: '' } : meal
  })
}

function getCustomMeal(id) {
  return readCustomMeals().find(meal => meal.id === id && !meal.archived) || null
}

function saveCustomMeal(title, recipeIds, mealId) {
  const dishes = recipeIds.map(id => getRecipe(id)).filter(Boolean)
  const recipes = [...new Set(dishes.map(dish => dish.id))]
  if (!recipes.length) return null
  const saved = readCustomMeals()
  const index = mealId ? saved.findIndex(meal => meal.id === mealId && !meal.archived) : -1
  if (mealId && index === -1) return null
  const customTitle = title.trim()
  const plan = {
    id: mealId || ('custom-' + Date.now() + '-' + Math.random().toString(36).slice(2) + '-' + saved.length),
    title: customTitle,
    hasCustomTitle: Boolean(customTitle),
    recipes
  }
  savePlanningChange({ meal: plan, expected: mealId ? readPlanning().meals[mealId] : null })
  return plan
}

function archiveCustomMeal(id) {
  const saved = readCustomMeals()
  const index = saved.findIndex(meal => meal.id === id && !meal.archived)
  if (index === -1) return false
  savePlanningChange({ meal: { ...saved[index], archived: true }, expected: readPlanning().meals[id] })
  return true
}

function getMealPlans(selection, { maxMinutes, readyOnly, goal = 'family', useAdjustments = false } = {}) {
  const available = availableIngredients(selection)
  const customMeals = goal === 'all' || goal === 'custom' ? readCustomMeals().filter(meal => !meal.archived) : []
  const plans = goal === 'all' ? currentPlans.concat(customMeals)
    : goal === 'custom' ? customMeals : plansByGoal[goal] || []
  return plans.map(plan => {
    const original = summarizePlan(plan, available)
    if (!original) return null
    // Rank the preset before applying a swap, so editing a dish doesn't move its card.
    const displayed = useAdjustments && sessionAdjustments.has(plan.id)
      ? summarizePlan(adjustedPlan(plan), available) || original : original
    return { original, displayed }
  }).filter(entry => entry && (!maxMinutes || entry.displayed.minutes <= maxMinutes) &&
    (!readyOnly || !entry.displayed.missingCount))
    .sort(({ original: left }, { original: right }) => {
      if (goal === 'light') {
        const readiness = Number(left.missingCount > 0) - Number(right.missingCount > 0)
        const dishCount = right.dishes.length - left.dishes.length
        if (readiness || dishCount) return readiness || dishCount
      }
      return left.missingCount - right.missingCount || left.minutes - right.minutes
    }).map(entry => entry.displayed)
}

function getAdjustedMealPlan(id) {
  if (!sessionAdjustments.has(id)) return null
  const plan = currentPlans.find(item => item.id === id)
  return plan ? summarizePlan(adjustedPlan(plan), availableIngredients([])) : null
}

function getMealDishReplacement(id, dishId) {
  const goal = Object.keys(plansByGoal).find(key => plansByGoal[key].some(plan => plan.id === id))
  const original = goal && plansByGoal[goal].find(plan => plan.id === id)
  const plan = original ? adjustedPlan(original) : getCustomMeal(id)
  const dish = getRecipe(dishId)
  if (!plan || !dish) return null
  const recipeIds = plan.recipes.map(resolveRecipeId)
  if (!recipeIds.includes(dish.id)) return null

  const candidates = matchRecipes([], {
    lightOnly: goal === 'light', servings: plan.servings, rankByStock: false,
    category: goal === 'solo' ? dish.libraryCategory : null
  }).filter(recipe => !recipeIds.includes(recipe.id) && (goal !== 'family' ||
    (dish.libraryCategory === '汤羹' ? recipe.libraryCategory === '汤羹' : familyDishCategories.has(recipe.libraryCategory))))
  return { dish, plan, original, recipeIds, candidateIds: candidates.map(recipe => recipe.id) }
}

function replaceMealDish(id, dishId, replacementId, expectedIds) {
  const change = getMealDishReplacement(id, dishId)
  if (!change || !Array.isArray(expectedIds) || !change.candidateIds.includes(replacementId) ||
      change.recipeIds.length !== expectedIds.length || change.recipeIds.some((recipeId, index) => recipeId !== expectedIds[index])) return false

  const recipes = change.recipeIds.map(recipeId => recipeId === change.dish.id ? replacementId : recipeId)
  if (!change.original) return Boolean(saveCustomMeal(change.plan.title, recipes, id))
  if (recipes.every((recipeId, index) => recipeId === change.original.recipes[index])) sessionAdjustments.delete(id)
  else sessionAdjustments.set(id, recipes)
  return true
}

function getArchivedMealPlan(id) {
  if (typeof id !== 'string' || !id) return null
  const plan = id.startsWith('custom-')
    ? readCustomMeals().find(meal => meal.id === id && meal.archived)
    : legacyPlans.find(item => item.id === id)
  return plan ? summarizePlan(plan, availableIngredients([])) : null
}

const minute = 60 * 1000

function rotateLightInspiration(selection, previous, now = Date.now(), random = Math.random) {
  const recipes = matchRecipes(selection, { lightOnly: true, rankByStock: false })
  const current = previous && recipes.find(recipe => recipe.id === previous.id)
  if (current && previous.expiresAt > now && previous.expiresAt <= now + 60 * minute) {
    return { recipe: current, rotation: previous }
  }

  const alternatives = recipes.length > 1 ? recipes.filter(recipe => !current || recipe.id !== current.id) : recipes
  const ready = alternatives.filter(recipe => !recipe.missingCount)
  const almost = alternatives.filter(recipe => recipe.hasMatchingMainIngredient && recipe.missingCount === 1)
  const pool = ready.length ? ready : almost.length ? almost : alternatives
  if (!pool.length) return { recipe: null, rotation: null }

  const recipe = pool[Math.floor(random() * pool.length)]
  const interval = 5 + Math.floor(random() * 56)
  return { recipe, rotation: { id: recipe.id, expiresAt: now + interval * minute } }
}

module.exports = {
  getMealPlans, getArchivedMealPlan, getCustomMeal, saveCustomMeal, archiveCustomMeal, rotateLightInspiration,
  getAdjustedMealPlan, getMealDishReplacement, replaceMealDish
}
