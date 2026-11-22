const { applyTheme } = require('../../theme')
const { getIngredient } = require('../../guide-data')

Page({
  data: { item: null },

  onLoad({ id } = {}) {
    this.detailId = id
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
    // 云端可能在后台切换了版本，回到前台时按当前数据重绘。
    this.refreshGuideData()
  },

  // 云端整版替换后由 cloud-guide 调用，按当前 id 重新取详情。
  refreshGuideData() {
    if (!this.detailId) return
    const item = getIngredient(this.detailId)
    if (item) this.setData({ item })
  },

  openRecipe(e) {
    wx.navigateTo({ url: '/pages/recipe/index?id=' + e.currentTarget.dataset.id })
  }
})
