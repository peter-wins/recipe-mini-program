const key = 'recipe-activity-v1'

function readActivity() {
  const stored = wx.getStorageSync(key) || {}
  return {
    history: Array.isArray(stored.history) ? [...new Set(stored.history.map(resolveRecipeId))] : [],
    cooked: Array.isArray(stored.cooked) ? [...new Set(stored.cooked.map(resolveRecipeId))] : []
  }
}

function recordRecipe(list, id) {
  const activity = readActivity()
  activity[list] = [id, ...activity[list].filter(item => item !== id)]
  wx.setStorageSync(key, activity)
}

module.exports = { readActivity, recordRecipe }
const { resolveRecipeId } = require('./catalog')

