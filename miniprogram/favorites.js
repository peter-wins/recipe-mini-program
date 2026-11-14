const key = 'favorite-recipe-ids'

function readFavorites() {
  const stored = wx.getStorageSync(key)
  return Array.isArray(stored) ? [...new Set(stored.filter(id => typeof id === 'string').map(resolveRecipeId))] : []
}

function toggleFavorite(id) {
  const saved = readFavorites()
  const alreadySaved = saved.includes(id)
  wx.setStorageSync(key, alreadySaved ? saved.filter(item => item !== id) : [id, ...saved])
  return !alreadySaved
}

module.exports = { readFavorites, toggleFavorite }
const { resolveRecipeId } = require('./catalog')

