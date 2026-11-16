// 人群餐标签：同一批菜的不同吃法，不占用单一分类字段。
// 新增人群餐（宝宝餐、月子餐等）只需在 TAG_RULES 里加一条规则，
// 筛选 UI 与推荐链路会自动带上新标签，无需改动页面代码。

const TAG_RULES = [
  {
    name: '减脂餐',
    // 现有 26 道轻食都来自每日食光的减脂分类，带 light 标记与每份营养数据。
    match(recipe) {
      return Boolean(recipe.light)
    }
  }
]

function getDietTags() {
  return TAG_RULES.map(rule => rule.name)
}

function tagsFor(recipe) {
  return TAG_RULES.filter(rule => rule.match(recipe)).map(rule => rule.name)
}

function matchesTag(recipe, tag) {
  if (!tag) return true
  const rule = TAG_RULES.find(item => item.name === tag)
  return rule ? rule.match(recipe) : true
}

module.exports = { getDietTags, tagsFor, matchesTag }
