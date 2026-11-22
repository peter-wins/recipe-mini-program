const { applyTheme } = require('../../theme')
const { readActivity, clearBrowsingHistory } = require('../../activity')
const { getRecipe } = require('../../catalog')
const { readFavorites } = require('../../favorites')

const titles = { history: '浏览历史', cooked: '烹饪记录', favorites: '我的收藏' }

Page({
  data: { type: 'history', recipes: [], hasHistory: false },

  onLoad(options) {
    const type = options.type === 'cooked' || options.type === 'favorites' ? options.type : 'history'
    this.setData({ type })
    wx.setNavigationBarTitle({ title: titles[type] })
  },

  onShow() {
    applyTheme(this)
    this.refreshRecipeRecords()
  },

  refreshCatalogData() {
    this.refreshRecipeRecords()
  },

  refreshRecipeRecords() {
    try {
      const { type } = this.data
      const ids = type === 'favorites' ? readFavorites() : readActivity()[type]
      const recipes = ids.map(id => getRecipe(id)).filter(Boolean)
      this.setData({ recipes, hasHistory: type === 'history' && ids.length > 0 })
    } catch {
      wx.showToast({ title: '暂时无法读取使用记录', icon: 'none' })
    }
  },

  clearHistory() {
    if (this.data.type !== 'history' || !this.data.hasHistory) return
    wx.showModal({
      title: '清空浏览历史？',
      confirmText: '清空',
      success: ({ confirm }) => {
        if (!confirm) return
        try {
          clearBrowsingHistory()
          this.refreshRecipeRecords()
          wx.showToast({ title: '已清空', icon: 'success' })
        } catch {
          wx.showToast({ title: '清空失败，请重试', icon: 'none' })
        }
      }
    })
  }
})
