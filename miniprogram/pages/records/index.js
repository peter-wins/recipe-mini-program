const { readActivity } = require('../../activity')
const { getRecipe } = require('../../catalog')
const { readFavorites } = require('../../favorites')

const titles = { history: '浏览历史', cooked: '做过的菜', favorites: '我的收藏' }

Page({
  data: { type: 'history', recipes: [] },

  onLoad(options) {
    const type = options.type === 'cooked' || options.type === 'favorites' ? options.type : 'history'
    this.setData({ type })
    wx.setNavigationBarTitle({ title: titles[type] })
  },

  onShow() {
    try {
      const { type } = this.data
      const ids = type === 'favorites' ? readFavorites() : readActivity()[type]
      const recipes = ids.map(id => getRecipe(id)).filter(Boolean)
      this.setData({ recipes })
    } catch {
      wx.showToast({ title: '暂时无法读取使用记录', icon: 'none' })
    }
  }
})
