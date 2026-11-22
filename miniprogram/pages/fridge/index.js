const { getCatalogSource, getIngredientOptions, getIngredientGroups, searchIngredientOptions } = require('../../catalog')
const { readInventory, saveInventory } = require('../../inventory')
const { applyTheme } = require('../../theme')

const fridgeGroups = getIngredientGroups()
const ingredientPageSize = 24
const MY_FRIDGE_GROUP = '手边有的'

function ingredientView(selected, search, groupIndex, limit) {
  const searching = Boolean(search.trim())
  // 分组 0 固定为「手边有的」，内容跟随已登记食材；其余分组顺延一位对应 catalog 分组
  const items = searching
    ? searchIngredientOptions(search)
    : groupIndex === 0
      ? getIngredientOptions().filter(item => selected.includes(item.id))
      : fridgeGroups[groupIndex - 1].items
  return {
    searching,
    visibleIngredients: items.slice(0, limit).map(({ id, name }) => ({ id, name, checked: selected.includes(id) })),
    hasMoreIngredients: items.length > limit
  }
}

Page({
  data: {
    selected: [],
    search: '',
    fridgeGroupNames: [MY_FRIDGE_GROUP, ...fridgeGroups.map(group => group.name)],
    fridgeGroupIndex: 0,
    ingredientLimit: ingredientPageSize,
    banners: [{
      eyebrow: '今日灵感',
      title: '用现有食材做道好菜',
      sub: '3 道菜谱等你发现',
      image: '/assets/banner-cook.svg'
    }],
    ...ingredientView([], '', 0, ingredientPageSize)
  },

  onShow() {
    applyTheme(this)
    this.refreshKitchenData()
  },

  refreshKitchenData() {
    try {
      const selected = readInventory()
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
    this.applyIngredientView({ selected })
  }
})
