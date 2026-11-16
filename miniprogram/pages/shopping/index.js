const { applyTheme } = require('../../theme')
const { listShopping, removeShoppingItem } = require('../../shopping')

Page({
  data: { items: [], updatingKey: '' },

  onShow() {
    applyTheme(this)
    this.refreshKitchenData()
  },

  refreshKitchenData() {
    try {
      this.refreshItems()
    } catch {
      wx.showToast({ title: '暂时无法读取清单', icon: 'none' })
    }
  },

  refreshItems() {
    const expansion = new Map(this.data.items.map(item => [item.key, item.expanded]))
    const items = listShopping().map(item => ({
      ...item, expanded: expansion.has(item.key) ? expansion.get(item.key) : item.separateQuantities
    }))
    this.setData({ items })
  },

  toggleDetails(event) {
    const { key } = event.currentTarget.dataset
    this.setData({ items: this.data.items.map(item => item.key === key ? { ...item, expanded: !item.expanded } : item) })
  },

  markBought(event) {
    this.updateItem(event.currentTarget.dataset.key, true)
  },

  removeItem(event) {
    this.updateItem(event.currentTarget.dataset.key, false)
  },

  updateItem(key, bought) {
    if (this.data.updatingKey) return
    this.setData({ updatingKey: key })
    try {
      const updated = removeShoppingItem(key, bought)
      this.refreshItems()
      if (updated) wx.showToast({ title: bought ? '已补进冰箱' : '已从清单移除', icon: 'success' })
    } catch {
      wx.showToast({ title: '更新失败，请重试', icon: 'none' })
    } finally {
      this.setData({ updatingKey: '' })
    }
  }
})
