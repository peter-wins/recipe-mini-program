const { applyTheme } = require('../../theme')
const { getIngredient } = require('../../guide-data')

Page({
  data: { item: null },

  onLoad({ id } = {}) {
    const item = getIngredient(id)
    if (!item) {
      wx.showToast({ title: '食材不存在', icon: 'none' })
      return
    }
    wx.setNavigationBarTitle({ title: item.name })
    this.setData({ item })
  },

  onShow() {
    applyTheme(this)
  },

  openRecipe(e) {
    wx.navigateTo({ url: '/pages/recipe/index?id=' + e.currentTarget.dataset.id })
  }
})
