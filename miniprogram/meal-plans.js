const { getRecipe, getIngredientOptions, matchRecipes, availableIngredients } = require('./catalog')

const plans = [
  { id: 'fish-rice', title: '蒸鱼青菜饭', recipes: ['other_qing-zheng-lu-yu', 'vegetable_dish_chao-qing-cai'], serveWithRice: true },
  { id: 'egg-broccoli', title: '蒸蛋西兰花饭', recipes: ['breakfast_zheng-shui-dan', 'vegetable_dish_suan-rong-xi-lan-hua'], serveWithRice: true },
  { id: 'tofu-pumpkin', title: '凉拌豆腐配蒸南瓜', recipes: ['vegetable_dish_liang-ban-dou-fu', 'vegetable_dish_qing-zheng-nan-gua'] },
  { id: 'pork-rice', title: '香干肉丝配饭', recipes: ['meat_dish_xiang-gan-rou-si'], serveWithRice: true },
  { id: 'shrimp-rice', title: '白灼虾配黄瓜饭', recipes: ['other_bai-zhuo-xia', 'vegetable_dish_liang-ban-huang-gua'], serveWithRice: true },
  { id: 'tomato-egg-rice', title: '番茄蛋花汤配青菜饭', recipes: ['soup_xi-hong-shi-ji-dan-tang', 'vegetable_dish_chao-qing-cai'], serveWithRice: true }
]
const names = new Map(getIngredientOptions().map(item => [item.id, item.name]))

function getMealPlans(selection, { maxMinutes, readyOnly } = {}) {
  const available = availableIngredients(selection)
  return plans.map(plan => {
    const dishes = plan.recipes.map(id => getRecipe(id))
    const required = dishes.flatMap(dish => dish.required.map(([id]) => id))
    const missing = [...new Set(required)].filter(id => !available.has(id))
    return {
      id: plan.id,
      title: plan.title,
      dishes: dishes.map(({ id, name, image }) => ({ id, name, image })),
      serveWithRice: Boolean(plan.serveWithRice),
      minutes: dishes.reduce((total, dish) => total + dish.minutes, 0),
      missingCount: missing.length,
      missingText: missing.map(id => names.get(id)).join('、')
    }
  }).filter(plan => (!maxMinutes || plan.minutes <= maxMinutes) && (!readyOnly || !plan.missingCount))
    .sort((left, right) => left.missingCount - right.missingCount || left.minutes - right.minutes)
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

module.exports = { getMealPlans, rotateLightInspiration }
