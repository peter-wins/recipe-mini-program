const { getIngredientOptions, getIngredientGroups, searchIngredientOptions, matchRecipes, groupFridgeMatches } = require('../../catalog')
const { readInventory, saveInventory, summarizeInventory } = require('../../inventory')
const { applyTheme } = require('../../theme')
const { previewRecipes } = require('../../daily-recipe')
const { listShopping } = require('../../shopping')

const options = getIngredientOptions()
const fridgeGroups = getIngredientGroups()
const ingredientPageSize = 24

function ingredientView(selected, search, groupIndex, limit) {
  const searching = Boolean(search.trim())
  const items = searching ? searchIngredientOptions(search) : fridgeGroups[groupIndex].items
  return {
    searching,
    visibleIngredients: items.slice(0, limit).map(({ id, name }) => ({ id, name, checked: selected.includes(id) })),
    hasMoreIngredients: items.length > limit
  }
}

Page({
  data: {
    selected: [],
    selectedItems: [],
    search: '',
    fridgeGroupNames: fridgeGroups.map(group => group.name),
    fridgeGroupIndex: 0,
    ingredientLimit: ingredientPageSize,
    showAllSelected: false,
    fridgeSummary: summarizeInventory([]),
    hasMatches: false,
    recipePreview: [],
    shoppingCount: 0,
    ingredientPickerOpen: false,
    ...ingredientView([], '', 0, ingredientPageSize)
  },

  onShow() {
    applyTheme(this)
    this.refreshKitchenData()
  },

  refreshKitchenData() {
    try {
      const selected = readInventory()
      if (selected.join(',') !== this.data.selected.join(',')) this.updateSelection(selected)
      const shoppingCount = listShopping().length
      if (this.data.shoppingCount !== shoppingCount) this.setData({ shoppingCount })
    } catch {
      wx.showToast({ title: '暂时无法读取冰箱', icon: 'none' })
    }
  },

  openIngredientPicker() {
    this.setData({ ingredientPickerOpen: true }, () => {
      wx.pageScrollTo({ selector: '#ingredient-picker', duration: 200 })
    })
  },

  closeIngredientPicker() {
    this.setData({ ingredientPickerOpen: false })
  },

  searchIngredients(event) {
    this.applyIngredientView({ search: event.detail.value, ingredientLimit: ingredientPageSize })
  },

  clearIngredientSearch() {
    this.applyIngredientView({ search: '', ingredientLimit: ingredientPageSize })
  },

  selectIngredientGroup(event) {
    this.applyIngredientView({ fridgeGroupIndex: Number(event.currentTarget.dataset.index), ingredientLimit: ingredientPageSize })
  },

  loadMoreIngredients() {
    this.applyIngredientView({ ingredientLimit: this.data.ingredientLimit + ingredientPageSize })
  },

  applyIngredientView(patch) {
    const { selected, search, fridgeGroupIndex, ingredientLimit } = { ...this.data, ...patch }
    this.setData({ ...patch, ...ingredientView(selected, search, fridgeGroupIndex, ingredientLimit) })
  },

  toggleSelectedIngredients() {
    this.setData({ showAllSelected: !this.data.showAllSelected })
  },

  clearInventory() {
    wx.showModal({
      title: '清空冰箱食材？',
      confirmText: '清空',
      success: ({ confirm }) => {
        if (confirm) this.saveSelection([])
      }
    })
  },

  toggleIngredient(event) {
    const { id } = event.currentTarget.dataset
    const { selected } = this.data
    this.saveSelection(selected.includes(id) ? selected.filter(item => item !== id) : [...selected, id])
  },

  saveSelection(selected) {
    try {
      saveInventory(selected)
      this.updateSelection(selected)
    } catch {
      wx.showToast({ title: '食材未保存，请重试', icon: 'none' })
    }
  },

  updateSelection(selected) {
    const { ready, almost } = groupFridgeMatches(selected.length ? matchRecipes(selected) : [])
    const available = previewRecipes(ready, 2, null, true)
    const recipePreview = available.concat(previewRecipes(almost, 2 - available.length, null, false))
    this.applyIngredientView({
      selected,
      selectedItems: options.filter(item => selected.includes(item.id)).map(({ id, name }) => ({ id, name })),
      showAllSelected: selected.length > 8 && this.data.showAllSelected,
      fridgeSummary: summarizeInventory(selected),
      recipePreview,
      hasMatches: recipePreview.length > 0
    })
  }
})
