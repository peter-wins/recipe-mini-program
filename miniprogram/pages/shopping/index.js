const { applyTheme } = require('../../theme')
const { listShopping, removeShoppingItem, saveManualShopping, manualNameLimit, manualQuantityLimit,
  buyShoppingItems, undoShoppingPurchase } = require('../../shopping')

const undoWindow = 10000

Page({
  data: {
    items: [], updating: false, manualOpen: false, focusQuantity: false, manualNameLimit, manualQuantityLimit,
    selecting: false, selectedCount: 0, undoCount: 0
  },

  onShow() {
    applyTheme(this)
    if (this.purchase && this.purchase.expiresAt <= Date.now()) this.clearUndo()
    this.refreshKitchenData()
  },

  onUnload() {
    clearTimeout(this.undoTimer)
  },

  refreshCatalogData() {
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
    const previous = new Map(this.data.items.map(item => [item.key, item]))
    const items = listShopping().map(item => {
      const current = previous.get(item.key)
      return { ...item, expanded: Boolean(current && current.expanded), selected: Boolean(this.data.selecting && current && current.selected) }
    })
    this.setItems(items, this.data.selecting && items.length > 0)
  },

  setItems(items, selecting = this.data.selecting) {
    this.setData({ items, selecting, selectedCount: items.filter(item => item.selected).length })
  },

  toggleBatchMode() {
    const selecting = !this.data.selecting
    this.setItems(this.data.items.map(item => ({ ...item, selected: false })), selecting)
  },

  toggleSelection(event) {
    const { key } = event.currentTarget.dataset
    this.setItems(this.data.items.map(item => item.key === key ? { ...item, selected: !item.selected } : item))
  },

  toggleAll() {
    const selected = this.data.selectedCount !== this.data.items.length
    this.setItems(this.data.items.map(item => ({ ...item, selected })))
  },

  openManualEntry() {
    this.setData({ manualOpen: true, focusQuantity: false })
  },

  focusManualQuantity() {
    this.setData({ focusQuantity: true })
  },

  closeManualEntry() {
    this.setData({ manualOpen: false })
  },

  addManualItem(event) {
    if (!this.data.manualOpen) return
    const { name = '', quantity = '' } = event.detail.value
    if (!name.trim()) {
      wx.showToast({ title: '请输入要买的东西', icon: 'none' })
      return
    }
    try {
      if (!saveManualShopping(name, quantity)) {
        wx.showToast({ title: '名称或用量太长了', icon: 'none' })
        return
      }
      this.refreshItems()
      this.closeManualEntry()
      wx.showToast({ title: '已保存到采购清单', icon: 'success' })
    } catch {
      wx.showToast({ title: '添加失败，请重试', icon: 'none' })
    }
  },

  toggleDetails(event) {
    const { key } = event.currentTarget.dataset
    this.setData({ items: this.data.items.map(item => item.key === key ? { ...item, expanded: !item.expanded } : item) })
  },

  markBought(event) {
    this.buyItems([event.currentTarget.dataset.key])
  },

  markSelectedBought() {
    this.buyItems(this.data.items.filter(item => item.selected).map(item => item.key))
  },

  buyItems(keys) {
    if (this.data.updating || !keys.length) return
    this.setData({ updating: true })
    try {
      const purchase = buyShoppingItems(keys)
      if (purchase) {
        clearTimeout(this.undoTimer)
        this.purchase = { ...purchase, expiresAt: Date.now() + undoWindow }
        this.setData({ selecting: false, undoCount: purchase.count })
        this.undoTimer = setTimeout(() => this.clearUndo(), undoWindow)
      }
      this.refreshItems()
    } catch {
      wx.showToast({ title: '更新失败，请重试', icon: 'none' })
    } finally {
      this.setData({ updating: false })
    }
  },

  clearUndo() {
    clearTimeout(this.undoTimer)
    this.purchase = null
    if (this.data.undoCount) this.setData({ undoCount: 0 })
  },

  undoBought() {
    if (this.data.updating || !this.purchase) return
    if (this.purchase.expiresAt <= Date.now()) {
      this.clearUndo()
      return
    }
    try {
      const restored = undoShoppingPurchase(this.purchase)
      this.clearUndo()
      this.refreshItems()
      wx.showToast({ title: restored ? '已放回采购清单' : '清单已是最新', icon: 'none' })
    } catch {
      wx.showToast({ title: '撤销失败，请重试', icon: 'none' })
    }
  },

  removeItem(event) {
    if (this.data.updating) return
    this.setData({ updating: true })
    try {
      const updated = removeShoppingItem(event.currentTarget.dataset.key)
      this.refreshItems()
      if (updated) wx.showToast({ title: '已从清单移除', icon: 'success' })
    } catch {
      wx.showToast({ title: '更新失败，请重试', icon: 'none' })
    } finally {
      this.setData({ updating: false })
    }
  }
})
