const { applyTheme } = require('../../theme')
const { listShopping, removeShoppingItem, saveManualShopping, manualNameLimit, manualQuantityLimit,
  buyShoppingItems, undoShoppingPurchase } = require('../../shopping')
const { buildLayout, buildText, draw, usageNote } = require('../../shopping-poster')

const undoWindow = 10000

Page({
  data: {
    items: [], updating: false, manualOpen: false, focusQuantity: false, manualNameLimit, manualQuantityLimit,
    selecting: false, selectedCount: 0, undoCount: 0, posterWidth: 750, posterHeight: 412, usageNote
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
  },

  copyTextList() {
    const items = this.data.items
    if (!items.length || this.data.updating) return
    wx.setClipboardData({
      data: buildText(items),
      success: () => wx.showToast({ title: '已复制，去粘贴吧', icon: 'success' }),
      fail: () => wx.showToast({ title: '复制失败，请重试', icon: 'none' })
    })
  },

  exportPoster() {
    const items = this.data.items
    if (!items.length || this.data.updating) return
    wx.showLoading({ title: '生成中' })
    const layout = buildLayout(items)
    this.setData({ posterWidth: layout.width, posterHeight: layout.height })

    const finish = () => wx.hideLoading()
    const fail = message => { finish(); wx.showToast({ title: message, icon: 'none' }) }

    const saveImage = filePath => {
      wx.saveImageToPhotosAlbum({
        filePath,
        success: () => { finish(); wx.showToast({ title: '已存到相册', icon: 'success' }) },
        fail: error => {
          finish()
          const denied = /auth|deny|denied/i.test((error && error.errMsg) || '')
          if (denied) {
            wx.showModal({
              title: '需要相册权限',
              content: '请允许保存到相册，才能把清单图发给家人',
              confirmText: '去设置',
              success: result => {
                if (result.confirm && typeof wx.openSetting === 'function') wx.openSetting()
              }
            })
          } else {
            wx.showToast({ title: '保存失败，请重试', icon: 'none' })
          }
        }
      })
    }

    try {
      wx.createSelectorQuery().in(this).select('#shopping-poster').fields({ node: true, size: true }).exec(result => {
        const canvas = result && result[0] && result[0].node
        if (!canvas || typeof canvas.getContext !== 'function') {
          fail('生成失败，请重试')
          return
        }
        try {
          const ctx = canvas.getContext('2d')
          const ratio = (wx.getSystemInfoSync && wx.getSystemInfoSync().pixelRatio) || 1
          canvas.width = Math.floor(layout.width * ratio)
          canvas.height = Math.floor(layout.height * ratio)
          ctx.scale(ratio, ratio)
          draw(ctx, layout)
          wx.canvasToTempFilePath({
            canvas,
            success: res => saveImage(res.tempFilePath),
            fail: () => fail('生成图片失败，请重试')
          }, this)
        } catch {
          fail('生成失败，请重试')
        }
      })
    } catch {
      fail('生成失败，请重试')
    }
  }
})
