const fatLossTag = '减脂'

const libraryCategoryById = {
  'breakfast_cha-ye-dan': '蛋类',
  'breakfast_han-guo-ma-yao-ji-dan': '蛋类',
  'breakfast_mei-shi-chao-dan': '蛋类',
  'breakfast_tai-yang-dan': '蛋类',
  'breakfast_tang-xin-dan': '蛋类',
  'breakfast_wan-mei-shui-zhu-dan': '蛋类',
  'breakfast_wei-bo-lu-dan-gao': '甜品',
  'breakfast_wei-bo-lu-he-bao-dan': '蛋类',
  'breakfast_wei-bo-lu-zheng-dan': '蛋类',
  'breakfast_yi-shi-xiang-chang-bei-fei-dan': '荤菜',
  'breakfast_zheng-shui-dan': '蛋类',
  'meat_dish_fan-qie-hong-jiang': '酱料',
  'other_chao-hua-dan': '蛋类',
  'other_ji-dan-geng': '蛋类',
  'other_nai-lao-pei-gen-tong-xin-fen': '主食',
  'other_su-dong-tang-yuan': '甜品',
  'other_wei-bo-lu-ji-dan-geng': '蛋类',
  'other_wen-quan-dan': '蛋类',
  'other_zheng-xiang-ji-dan-geng': '蛋类',
  'semi-finished_niu-you-huo-guo-di-liao': '酱料',
  'soup_la-ba-zhou': '主食',
  'soup_mi-zhou': '主食',
  'soup_pi-dan-shou-rou-zhou': '主食',
  'soup_xiao-mi-zhou': '主食',
  'vegetable_dish_jin-qian-dan': '蛋类',
  'vegetable_dish_lei-jiao-pi-dan': '蛋类',
  'vegetable_dish_you-cu-bao-dan': '蛋类'
}

const libraryCategoryLabels = {
  水产: '海鲜',
  早餐: '主食',
  半成品加工: '主食',
  汤: '汤羹',
  饮料: '饮品'
}

const equipmentTags = [
  ['空气炸锅', /空气炸锅/],
  ['微波炉', /微波/],
  ['电饭煲', /电饭[煲锅]/],
  ['烤箱', /烤箱/]
]

const preferredTags = [fatLossTag, '早餐', '快手', '半成品', ...equipmentTags.map(([tag]) => tag)]

function recipeTaxonomy(recipe) {
  const { id, name, category } = recipe
  const libraryCategory = libraryCategoryById[id] || libraryCategoryLabels[category] || category
  const tags = new Set(Array.isArray(recipe.tags) ? recipe.tags : [])
  if (recipe.light) tags.add(fatLossTag)
  if ((category === '早餐' && !name.includes('蛋糕')) || (libraryCategory === '主食' && name.endsWith('粥'))) {
    tags.add('早餐')
  }
  if (recipe.minutes <= 15 && !recipe.waitMinutes) tags.add('快手')
  if (category === '半成品加工' || /半成品|速冻/.test(name)) tags.add('半成品')
  const stepsText = Array.isArray(recipe.steps)
    ? recipe.steps.map(step => (step[0] || '') + ' ' + (step[1] || '')).join(' ')
    : ''
  for (const [tag, pattern] of equipmentTags) {
    if (pattern.test(name) || pattern.test(stepsText)) tags.add(tag)
  }
  return { libraryCategory, tags: [...tags] }
}

function orderRecipeTags(tags) {
  const unique = new Set(tags)
  return [
    ...preferredTags.filter(tag => unique.delete(tag)),
    ...unique
  ]
}

module.exports = { recipeTaxonomy, orderRecipeTags, fatLossTag }
