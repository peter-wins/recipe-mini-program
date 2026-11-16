const { resolveRecipeId } = require('./catalog')
const { readKitchen } = require('./inventory')
const { readRecipeRecords, saveRecipeRecord } = require('./kitchen-sync')

function readFavorites() {
  return readRecipeRecords().favorites
}

function toggleFavorite(id) {
  const recipeId = resolveRecipeId(id)
  const present = !readFavorites().includes(recipeId)
  saveRecipeRecord('favorites', recipeId, present, readKitchen)
  return present
}

module.exports = { readFavorites, toggleFavorite }
