const { matchRecipes, groupFridgeMatches, avoidIdsFromNotes } = require('../../catalog')
const { preferTaste } = require('../../recipe-recommendations')
const { readPreferences } = require('../../preferences')
const { readInventory, previewInventory } = require('../../inventory')
const { applyTheme } = require('../../theme')

const pageSize = 24
const tabs = [
  { id: 'ready', title: '食材齐全' },
  { id: 'almost', title: '只差一样' }
]

Page({
  data: { tabs, groupId: '', recipes: [], total: 0, inventoryPreview: [], extraIngredients: 0 },

  onShow() {
    applyTheme(this)
    this.refreshKitchenData()
  },

  refreshKitchenData() {
    try {
      const selected = readInventory()
      const key = selected.slice().sort().join(',')
      const preferences = readPreferences()
      const preferenceKey = JSON.stringify(preferences)
      if (key === this.inventoryKey && preferenceKey === this.preferenceKey) return
      const avoidIds = avoidIdsFromNotes(preferences.notes)
      const matches = groupFridgeMatches(selected.length ? matchRecipes(selected, { avoidIds }) : [])
      this.groups = {
        ready: preferTaste(matches.ready, preferences.taste),
        almost: preferTaste(matches.almost, preferences.taste)
      }
      const groupId = this.data.groupId || (this.groups.ready.length || !this.groups.almost.length ? 'ready' : 'almost')
      this.inventoryKey = key
      this.preferenceKey = preferenceKey
      this.showGroup(groupId, Math.max(pageSize, this.data.recipes.length), previewInventory(selected))
    } catch {
      wx.showToast({ title: '暂时无法读取冰箱', icon: 'none' })
    }
  },

  openFridge() {
    const pages = getCurrentPages()
    const previous = pages[pages.length - 2]
    if (previous && previous.route === 'pages/fridge/index') {
      wx.navigateBack()
      return
    }
    wx.navigateTo({
      url: '/pages/fridge/index',
      fail: () => wx.showToast({ title: '暂时无法打开冰箱，请重试', icon: 'none' })
    })
  },

  changeGroup(event) {
    const { id } = event.currentTarget.dataset
    if (id !== this.data.groupId && tabs.some(tab => tab.id === id) && this.groups) this.showGroup(id, pageSize)
  },

  loadMore() {
    const { groupId, recipes, total } = this.data
    if (recipes.length < total) this.showGroup(groupId, recipes.length + pageSize)
  },

  showGroup(groupId, limit, update = {}) {
    const recipes = this.groups[groupId]
    this.setData({ ...update, groupId, recipes: recipes.slice(0, limit), total: recipes.length })
  }
})
