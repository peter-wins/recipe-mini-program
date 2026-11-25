const { applyTheme } = require('../../theme')
const { failure, success } = require('../../feedback')
const { readActivity, clearBrowsingHistory } = require('../../activity')
const { getRecipe } = require('../../catalog')
const { readFavorites } = require('../../favorites')

const titles = { history: '浏览历史', cooked: '烹饪记录', favorites: '我的收藏' }

Page({
  data: { type: 'history', recipes: [], hasHistory: false, pageTitle: '浏览历史' },

  onLoad(options) {
    const type = options.type === 'cooked' || options.type === 'favorites' ? options.type : 'history'
    this.setData({ type, pageTitle: titles[type] })
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
      failure({
        title: '没法读取记录',
        content: '手机存储这次没读到，重试一次通常就好。',
        onRetry: () => this.refreshRecipeRecords()
      })
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
          success('已清空')
        } catch {
          failure({
            title: '没清空成功',
            content: '记录还在，再试一次。',
            onRetry: () => this.clearHistory()
          })
        }
      }
    })
  }
})
