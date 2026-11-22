const { getCatalogSource, getIngredientOptions, getIngredientGroups, searchIngredientOptions } = require('../../catalog')
const { readKitchen, saveInventory } = require('../../inventory')
const { countShoppingItems } = require('../../shopping')
const { applyTheme } = require('../../theme')

const fridgeGroups = getIngredientGroups()
const ingredientPageSize = 24
const inventoryPageSize = 18
const MY_FRIDGE_GROUP = '已有食材'

function ingredientView(selected, search, groupIndex, limit) {
  const searching = Boolean(search.trim())
  const showingInventory = !searching && groupIndex === 0
  const items = searching
    ? searchIngredientOptions(search)
    : showingInventory
      ? getIngredientOptions().filter(item => selected.includes(item.id))
      : fridgeGroups[groupIndex - 1].items
  return {
    searching,
    showingInventory,
    ingredientListAnchor: searching ? 'fridge-search-results' : `fridge-group-${groupIndex}`,
    visibleIngredients: items.slice(0, limit).map(({ id, name }) => ({ id, name, checked: selected.includes(id) })),
    hasMoreIngredients: items.length > limit
  }
}

Page({
  data: {
    selected: [],
    shoppingCount: 0,
    search: '',
    fridgeGroupNames: [MY_FRIDGE_GROUP, ...fridgeGroups.map(group => group.name)],
    fridgeGroupIndex: 0,
    ingredientLimit: inventoryPageSize,
    banners: [{
      title: '用现有食材做道好菜',
      image: '/assets/banner-cook.png'
    }],
    ...ingredientView([], '', 0, inventoryPageSize)
  },

  onShow() {
    applyTheme(this)
    this.refreshKitchenData()
  },

  refreshKitchenData() {
    try {
      const { inventory: selected, shopping } = readKitchen()
      const shoppingCount = countShoppingItems(shopping)
      if (shoppingCount !== this.data.shoppingCount) this.setData({ shoppingCount })
      const source = getCatalogSource()
      if (source !== this.catalogSource || selected.join(',') !== this.data.selected.join(',')) this.updateSelection(selected)
      this.catalogSource = source
    } catch {
      wx.showToast({ title: '暂时无法读取冰箱', icon: 'none' })
    }
  },

  refreshCatalogData() {
    this.refreshKitchenData()
  },

  searchIngredients(event) {
    const search = event.detail.value
    this.applyIngredientView({ search, ingredientLimit: search.trim() || this.data.fridgeGroupIndex !== 0 ? ingredientPageSize : inventoryPageSize })
  },

  clearIngredientSearch() {
    const ingredientLimit = this.data.fridgeGroupIndex === 0 ? inventoryPageSize : ingredientPageSize
    this.applyIngredientView({ search: '', ingredientLimit })
  },

  selectIngredientGroup(event) {
    const fridgeGroupIndex = Number(event.currentTarget.dataset.index)
    this.applyIngredientView({ fridgeGroupIndex, ingredientLimit: fridgeGroupIndex === 0 ? inventoryPageSize : ingredientPageSize })
  },

  loadMoreIngredients() {
    const { showingInventory, selected, ingredientLimit } = this.data
    this.applyIngredientView({ ingredientLimit: showingInventory ? selected.length : ingredientLimit + ingredientPageSize })
  },

  applyIngredientView(patch) {
    const { selected, search, fridgeGroupIndex, ingredientLimit } = { ...this.data, ...patch }
    this.setData({ ...patch, ...ingredientView(selected, search, fridgeGroupIndex, ingredientLimit) })
  },

  openFridgeMatches() {
    const pages = getCurrentPages()
    const previous = pages[pages.length - 2]
    if (previous && previous.route === 'pages/fridge-matches/index') {
      wx.navigateBack()
      return
    }
    wx.navigateTo({
      url: '/pages/fridge-matches/index',
      fail: () => wx.showToast({ title: '暂时无法打开菜谱，请重试', icon: 'none' })
    })
  },

  clearInventory() {
    const count = this.data.selected.length
    if (!count) return
    wx.showModal({
      title: '清空已有食材？',
      content: `确定清空全部 ${count} 种食材吗？收藏和采购清单会保留。`,
      confirmText: '清空',
      confirmColor: '#c04040',
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
    this.applyIngredientView({ selected })
  }
})
