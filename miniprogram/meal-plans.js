const { getRecipe, getIngredientOptions } = require('./catalog')

const plans = [
  { id: 'fish-rice', title: '蒸鱼青菜饭', recipes: ['other_qing-zheng-lu-yu', 'vegetable_dish_chao-qing-cai'], rice: true },
  { id: 'egg-broccoli', title: '蒸蛋西兰花饭', recipes: ['breakfast_zheng-shui-dan', 'vegetable_dish_suan-rong-xi-lan-hua'], rice: true },
  { id: 'tofu-pumpkin', title: '凉拌豆腐配蒸南瓜', recipes: ['vegetable_dish_liang-ban-dou-fu', 'vegetable_dish_qing-zheng-nan-gua'] },
  { id: 'pork-rice', title: '香干肉丝配饭', recipes: ['meat_dish_xiang-gan-rou-si'], rice: true },
  { id: 'shrimp-rice', title: '白灼虾配黄瓜饭', recipes: ['other_bai-zhuo-xia', 'vegetable_dish_liang-ban-huang-gua'], rice: true },
  { id: 'tomato-egg-rice', title: '番茄蛋花汤配青菜饭', recipes: ['soup_xi-hong-shi-ji-dan-tang', 'vegetable_dish_chao-qing-cai'], rice: true }
]
const rice = { id: 'rice', name: '熟米饭' }
const names = new Map(getIngredientOptions().map(item => [item.id, item.name]))

function getMealPlans(selection, { maxMinutes, readyOnly } = {}) {
  const available = new Set(selection)
  return plans.map(plan => {
    const dishes = plan.recipes.map(id => getRecipe(id))
    const required = dishes.flatMap(dish => dish.required.map(([id]) => id))
    if (plan.rice) required.push(rice.id)
    const missing = [...new Set(required)].filter(id => !available.has(id))
    return {
      id: plan.id,
      title: plan.title,
      dishes,
      rice: Boolean(plan.rice),
      minutes: dishes.reduce((total, dish) => total + dish.minutes, 0),
      missingCount: missing.length,
      missingText: missing.map(id => names.get(id)).join('、')
    }
  }).filter(plan => (!maxMinutes || plan.minutes <= maxMinutes) && (!readyOnly || !plan.missingCount))
    .sort((left, right) => left.missingCount - right.missingCount || left.minutes - right.minutes)
}

module.exports = { getMealPlans }
