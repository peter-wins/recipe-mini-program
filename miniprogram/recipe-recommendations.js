const { getCatalogSource, ingredientIds, matchRecipes } = require('./catalog')

const mainCategories = new Set(['水产', '荤菜', '素菜', '汤', '主食', '早餐', '其他'])
const spicyName = /麻辣|香辣|酸辣|剁椒|泡椒|辣子|辣炒|水煮鱼|水煮肉/
const spicyIngredient = /辣椒|小米辣|小米椒|辣椒油|辣酱|辣豆瓣|红油|朝天椒|干辣/
const lighterMethod = /清蒸|白灼|凉拌|清炒|清炖|水煮蛋|蒸水蛋|蒸南瓜/
const heavierMethod = /油炸|干炸|酥炸|干锅|糖醋|拔丝|红烧肉/

let currentSource
let recipeProfiles

function getRecipeProfiles() {
  const source = getCatalogSource()
  if (currentSource === source) return recipeProfiles
  const { ingredients, recipes } = source
  recipeProfiles = new Map(recipes.map(recipe => {
    const ingredientNames = recipe.required.concat(recipe.optional, recipe.pantry).flatMap(([id, , name]) => [
      name, ...ingredients[id], ...ingredientIds(id).flatMap(canonical => ingredients[canonical] || [])
    ])
    return [recipe.id, {
      terms: [recipe.name, recipe.category, ...ingredientNames].join(' ').toLowerCase(),
      servings: recipe.servings,
      spicy: spicyName.test(recipe.name) || ingredientNames.some(name => spicyIngredient.test(name)),
      light: Number(lighterMethod.test(recipe.name)) * 2 + Number(['素菜', '汤', '水产'].includes(recipe.category)) -
        Number(heavierMethod.test(recipe.name)) * 2
    }]
  }))
  currentSource = source
  return recipeProfiles
}

function parseNotes(notes, recipeProfiles) {
  const include = []
  const exclude = []
  const ignored = []
  const clauses = notes.split(/[、,，。；;\n]+/).map(text => text.trim()).filter(Boolean)
  const profiles = [...recipeProfiles.values()]
  for (const clause of clauses) {
    const negative = /^(?:不要(?:加|放)?|不吃|去掉|忌口[:：]?)/.exec(clause)
    const positive = /^(?:想吃|想做|想用|用上)/.exec(clause)
    const prefix = negative || positive
    const term = (prefix ? clause.slice(prefix[0].length) : clause).trim().toLowerCase()
    const known = term && profiles.some(recipe => recipe.terms.includes(term))
    if (!known) ignored.push(clause)
    else if (negative) exclude.push(term)
    else include.push(term)
  }
  return { include, exclude, ignored }
}

function recommendRecipes(selected, { mode, maxMinutes, people, taste, notes }, random = Math.random) {
  const recipeProfiles = getRecipeProfiles()
  const { include, exclude, ignored } = parseNotes(notes, recipeProfiles)
  const matches = matchRecipes(selected, { maxMinutes, rankByStock: false }).filter(recipe => {
    const profile = recipeProfiles.get(recipe.id)
    if (!recipe.required.length || (!include.length && !mainCategories.has(recipe.category))) return false
    if ((taste === 'mild' && profile.spicy) || (taste === 'spicy' && !profile.spicy)) return false
    if (!include.every(term => profile.terms.includes(term))) return false
    return !exclude.some(term => profile.terms.includes(term))
  }).map(recipe => {
    const profile = recipeProfiles.get(recipe.id)
    const have = recipe.required.length - recipe.missingCount
    const portionFit = Math.abs(profile.servings - people)
    const stockFit = selected.length ? have - recipe.missingCount * 1.5 : 0
    const score = mode === 'stock' && selected.length ? stockFit * 5 - portionFit :
      mode === 'light' ? profile.light * 5 + stockFit - portionFit :
        -portionFit * 4 + stockFit + (taste === 'mild' ? profile.light : 0)
    return { ...recipe, servings: profile.servings, score }
  }).sort((left, right) => {
    if (mode === 'stock' && selected.length) {
      const missingDifference = left.missingCount - right.missingCount
      if (missingDifference) return missingDifference
    }
    return right.score - left.score || left.minutes - right.minutes
  })

  if (mode !== 'pick') return { recipes: matches.slice(0, 4), ignored }
  const shortlist = matches.slice(0, 16)
  const picks = []
  while (shortlist.length && picks.length < 4) {
    const index = Math.floor(random() * shortlist.length)
    picks.push(shortlist.splice(index, 1)[0])
  }
  return { recipes: picks, ignored }
}

function matchesTaste(recipe, taste) {
  if (!taste || taste === 'any') return true
  const profile = getRecipeProfiles().get(recipe.id)
  if (!profile) return true
  return taste === 'mild' ? !profile.spicy : profile.spicy
}

// 偏好 spicy/mild 时优先只留这类菜；若一类都没有就维持原池，避免推荐为空。
function preferTaste(recipes, taste) {
  if (!taste || taste === 'any') return recipes
  const preferred = recipes.filter(recipe => matchesTaste(recipe, taste))
  return preferred.length ? preferred : recipes
}

module.exports = { recommendRecipes, matchesTaste, preferTaste }
