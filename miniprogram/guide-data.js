// 家常食材指南数据：每种食材一张介绍卡，关联现有菜谱库。
// 试点阶段先做菠菜，后续按书逐页补录。
const { getCatalogSource } = require('./catalog')
const { recipeImage } = require('./recipe-image')

const groups = ['叶菜', '根茎', '瓜果', '菌菇', '蛋豆', '肉水产']

// 食材条目：id 对应 catalog 的食材 id；recipes 为书里菜名，现阶段用 ingredientId 自动关联库内菜谱。
const ingredients = [
  {
    id: 'spinach',
    name: '菠菜',
    group: '叶菜',
    image: '/assets/guide-spinach.svg',
    tint: '#DFEDD9',
    season: '叶菜 · 四季常见',
    therapy: '味甘、性凉，具有补血止血、利五脏、通肠胃、活血脉、助消化、止渴润肠等功效。',
    audience: '一般人群均可食用。菠菜烹熟后软滑易消化，特别适合老、幼、病弱者以及高血压患者食用。',
    storage: [
      '宜选叶片深绿色、茎较短、根部不着水、茎叶不老、无抽薹开花、不带黄烂叶的。',
      '将菠菜用纸包好，放进有孔的塑料袋冷藏。',
      '还可将菠菜焯水后冷冻，随用随取。'
    ],
    tips: [
      '菠菜含草酸，易与钙质结合影响吸收，不宜与含钙丰富的豆类、豆制品等食物同时食用。',
      '烹调菠菜时，应先将菠菜用开水烫一下再烹制。'
    ]
  }
]

// 占位条目：只有基础信息与关联菜谱，食材介绍待书页照片补录。
const placeholders = [
  ['cabbage', '大白菜', '叶菜', '#FBECDB', '#D85A30'],
  ['celery', '芹菜', '叶菜', '#E4EDE0', '#639922'],
  ['carrot', '胡萝卜', '根茎', '#F4E9DE', '#BA7517'],
  ['radish', '白萝卜', '根茎', '#F1E6D9', '#8B837B'],
  ['tomato', '番茄', '瓜果', '#FCEBEB', '#E24B4A'],
  ['cucumber', '黄瓜', '瓜果', '#EAF3DE', '#639922'],
  ['eggplant', '茄子', '瓜果', '#EEEDFE', '#7F77DD'],
  ['potato', '土豆', '根茎', '#FAEEDA', '#BA7517'],
  ['egg', '鸡蛋', '蛋豆', '#FAEEDA', '#EF9F27'],
  ['tofu', '豆腐', '蛋豆', '#F1EFE8', '#888780']
]
for (const [id, name, group, tint, accent] of placeholders) {
  ingredients.push({
    id, name, group,
    image: '/assets/guide-spinach.svg',
    tint, accent,
    season: '',
    therapy: '',
    audience: '',
    storage: [],
    tips: [],
    pending: true
  })
}

function recipeImageUrl(recipe) {
  return recipe ? recipeImage(recipe.coverPath) : ''
}

function listIngredients() {
  return ingredients.map(item => {
    const related = getCatalogSource().recipes.filter(recipe =>
      recipe.required.some(([id]) => id === item.id)
    )
    return {
      id: item.id,
      name: item.name,
      group: item.group,
      image: item.image,
      tint: item.tint,
      season: item.season,
      recipeCount: related.length
    }
  })
}

function getIngredient(id) {
  const item = ingredients.find(entry => entry.id === id)
  if (!item) return null
  const related = getCatalogSource().recipes.filter(recipe =>
    recipe.required.some(([id]) => id === item.id)
  )
  return {
    id: item.id,
    name: item.name,
    group: item.group,
    image: item.image,
    tint: item.tint,
    season: item.season,
    therapy: item.therapy,
    audience: item.audience,
    storage: item.storage.slice(),
    tips: item.tips.slice(),
    pending: Boolean(item.pending),
    recipes: related.map(recipe => ({
      id: recipe.id,
      name: recipe.name,
      minutes: recipe.minutes,
      image: recipeImageUrl(recipe)
    }))
  }
}

module.exports = { groups, ingredients, listIngredients, getIngredient }
