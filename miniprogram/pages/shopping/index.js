const { listShopping, removeShoppingItem } = require('../../shopping')

Page({
  data: { items: [] },

  onShow() {
    try {
      this.setData({ items: listShopping() })
    } catch {
      wx.showToast({ title: '暂时无法读取清单', icon: 'none' })
    }
  },

  markBought(event) {
    this.updateItem(event.currentTarget.dataset.key, true)
  },

  removeItem(event) {
    this.updateItem(event.currentTarget.dataset.key, false)
  },

  updateItem(key, bought) {
    try {
      removeShoppingItem(key, bought)
      this.setData({ items: listShopping() })
      if (bought) wx.showToast({ title: '已补进冰箱', icon: 'success' })
    } catch {
      wx.showToast({ title: '更新失败，请重试', icon: 'none' })
    }
  }
})
