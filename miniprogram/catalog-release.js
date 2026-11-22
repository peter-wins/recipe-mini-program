const bundled = require('./data')

const schemaVersion = 1
const idPattern = /^[A-Za-z0-9_（）-]+$/
const has = (object, key) => Object.prototype.hasOwnProperty.call(object, key)
const validText = value => typeof value === 'string'

function validRelease(release) {
  return !!release && release.schemaVersion === schemaVersion &&
    typeof release.version === 'string' && /^[a-f0-9]{32}$/.test(release.version) &&
    Number.isSafeInteger(release.recipeCount) && release.recipeCount >= bundled.recipes.length
}

function validateCatalog(source) {
  const { ingredients, recipes } = source || {}
  if (!ingredients || typeof ingredients !== 'object' || Array.isArray(ingredients) ||
      !Array.isArray(recipes)) throw new Error('菜谱数据格式不正确')

  for (const [id, names] of Object.entries(ingredients)) {
    if (!idPattern.test(id) || !Array.isArray(names) || !names[0] || !names.every(validText)) {
      throw new Error('无效食材记录：' + id)
    }
  }
  if (Object.keys(bundled.ingredients).some(id => !has(ingredients, id))) throw new Error('缺少已有食材 ID')

  const ids = new Set()
  for (const recipe of recipes) {
    if (!recipe || typeof recipe.id !== 'string' || !idPattern.test(recipe.id) || ids.has(recipe.id) ||
        ![recipe.name, recipe.category, recipe.difficulty, recipe.coverPath].every(validText) ||
        !recipe.name.trim() || !recipe.category.trim() ||
        !(Number.isFinite(recipe.minutes) && recipe.minutes > 0) ||
        !(Number.isFinite(recipe.servings) && recipe.servings > 0) ||
        !Array.isArray(recipe.tips) || !recipe.tips.every(validText) ||
        !Array.isArray(recipe.steps) || !recipe.steps.length ||
        !recipe.steps.every(step => Array.isArray(step) && step.length === 2 && step.every(validText))) {
      throw new Error('无效菜谱记录：' + (recipe && recipe.id))
    }
    for (const group of ['required', 'optional', 'pantry']) {
      if (!Array.isArray(recipe[group]) || !recipe[group].every(row =>
        Array.isArray(row) && row.length === 3 && row.every(validText) && has(ingredients, row[0]))) {
        throw new Error('菜谱食材不完整：' + recipe.id + '/' + group)
      }
    }
    ids.add(recipe.id)
  }
  if (bundled.recipes.some(recipe => !ids.has(recipe.id))) throw new Error('缺少已有菜谱 ID')
}

function parseRelease(text, expected) {
  const release = JSON.parse(text)
  if (!validRelease(release) || !Array.isArray(release.recipes) || release.recipes.length !== release.recipeCount ||
      (expected && (release.version !== expected.version || release.recipeCount !== expected.recipeCount))) {
    throw new Error('菜谱发布版本与清单不符')
  }
  validateCatalog(release)
  return { version: release.version, recipes: release.recipes, ingredients: release.ingredients }
}

module.exports = { schemaVersion, validRelease, validateCatalog, parseRelease }
