const { readKitchen } = require('./inventory')
const { activityStorageKey, normalizeRecipeIds, readRecipeRecords, saveRecipeRecord } = require('./kitchen-sync')

function readActivity() {
  const stored = wx.getStorageSync(activityStorageKey) || {}
  return { history: normalizeRecipeIds(stored.history), cooked: readRecipeRecords().cooked }
}

function recordRecipe(list, id) {
  const recipeId = resolveRecipeId(id)
  if (list === 'cooked') {
    saveRecipeRecord('cooked', recipeId, true, readKitchen)
    return
  }
  const stored = wx.getStorageSync(activityStorageKey) || {}
  const history = [recipeId, ...normalizeRecipeIds(stored.history).filter(item => item !== recipeId)]
  wx.setStorageSync(activityStorageKey, { ...stored, history })
}

function clearBrowsingHistory() {
  const stored = wx.getStorageSync(activityStorageKey) || {}
  wx.setStorageSync(activityStorageKey, { ...stored, history: [] })
}

module.exports = { readActivity, recordRecipe, clearBrowsingHistory }
const { resolveRecipeId } = require('./catalog')

