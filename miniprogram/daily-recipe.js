const dinnerDishes = new Set(['水产', '荤菜', '素菜'])
const aromatics = new Set(['scallion', 'vibe-e5a4a7e891b1', 'ginger', 'garlic', 'cilantro', 'chili'])

function mealCategory(recipe) {
  if (recipe.category === '其他' && /汤羹?$/.test(recipe.name || '')) return '汤'
  return recipe.category
}

function dinnerChoices(recipes) {
  const dishes = recipes.filter(recipe => dinnerDishes.has(mealCategory(recipe)))
  if (dishes.length) return dishes
  const rest = recipes.filter(recipe => ['汤', '主食'].includes(mealCategory(recipe)))
  return rest.length ? rest : recipes
}

function localRecipeDay(date = new Date()) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000
}

function rotateCategories(recipes, index) {
  if (!recipes.length) return null
  const categories = new Map()
  for (const recipe of recipes) {
    if (!categories.has(recipe.category)) categories.set(recipe.category, [])
    categories.get(recipe.category).push(recipe)
  }
  const groups = [...categories.values()]
  let slot = ((index % recipes.length) + recipes.length) % recipes.length
  for (let round = 0; ; round++) {
    for (const group of groups) {
      if (round >= group.length) continue
      if (slot === 0) return group[round]
      slot--
    }
  }
}

function dailyRecipe(ready, almost, day) {
  if (!ready.length) return rotateCategories(dinnerChoices(almost), day)
  const readyChoices = dinnerChoices(ready)
  const includeAlmost = almost.length && readyChoices.filter(recipe => recipe.required.length > 1).length < 2
  if (!includeAlmost) return rotateCategories(readyChoices, day)

  // Keep two days for ready recipes and use the third to add variety.
  const cycle = Math.floor(day / 3)
  if (day - cycle * 3 === 2) return rotateCategories(dinnerChoices(almost), cycle)
  return rotateCategories(readyChoices, day - cycle)
}

function festivalRecipe(festival, ready, almost, all) {
  // 节日优先级：先看首选关键词（如冬至的饺子），库里没有再退到应节兜底；
  // 池子按「冰箱齐全 → 只差一样 → 全菜谱库」找，保证节日一定有应节推荐。
  for (const tier of festival.tiers || []) {
    for (const pool of [ready, almost, all]) {
      for (const dish of tier.dishes) {
        const hit = pool.find(recipe => recipe.name.includes(dish))
        if (hit) return hit
      }
    }
  }
  return null
}

function previewRecipes(recipes, limit, featured, includeSoup) {
  const picked = []
  const categories = new Set()
  const usedIngredients = new Set()
  const candidates = recipes.filter(recipe => !featured || recipe.id !== featured.id).map(recipe => ({
    recipe,
    category: mealCategory(recipe),
    keyIngredients: recipe.required.filter(id => !aromatics.has(id))
  }))
  if (featured) {
    categories.add(mealCategory(featured))
    for (const id of featured.required) if (!aromatics.has(id)) usedIngredients.add(id)
  }
  const reserveSoup = includeSoup && !categories.has('汤') && candidates.some(item => item.category === '汤')

  while (picked.length < limit && candidates.length) {
    const onlySoup = reserveSoup && (picked.length === limit - 1 || candidates.every(item => item.category === '汤'))
    let bestIndex = -1
    let bestScore = -Infinity
    for (const [index, item] of candidates.entries()) {
      if (reserveSoup && (item.category === '汤') !== onlySoup) continue
      const overlap = item.keyIngredients.filter(id => usedIngredients.has(id)).length
      const mealScore = dinnerDishes.has(item.category) ? 4 : (['汤', '主食'].includes(item.category) ? 3 : 0)
      const score = mealScore + (categories.has(item.category) ? 0 : 2) - overlap * 3
      if (score > bestScore) {
        bestIndex = index
        bestScore = score
      }
    }
    const [item] = candidates.splice(bestIndex, 1)
    picked.push(item.recipe)
    categories.add(item.category)
    for (const id of item.keyIngredients) usedIngredients.add(id)
  }
  return picked
}

module.exports = { localRecipeDay, dailyRecipe, previewRecipes, festivalRecipe }

