const { applyTheme } = require('../../theme')
const { getIngredient } = require('../../guide-data')
const { syncGuide } = require('../../cloud-guide')

Page({
  data: { item: null, status: 'loading' },   // loading | ready | notFound

  onLoad({ id } = {}) {
    this.unloaded = false
    try {
      this.detailId = typeof id === 'string' ? decodeURIComponent(id) : id
    } catch {
      this.detailId = id
    }
    const item = getIngredient(this.detailId)
    if (item) {
      this.applyItem(item)
      return
    }
    // 随包没有这份食材，先去云端找；期间保持 loading，不留空白页。
    // 返回 promise，方便测试和调用方等待同步结果。
    return this.loadMissingGuide()
  },

  // 分享进来的食材可能只存在于云端新版、随包尚无，强制同步一次再查。
  async loadMissingGuide() {
    if (this.loadingGuide) return
    this.loadingGuide = true
    // 云端同步可能好几百毫秒，先给局部加载态，别让用户对着空白页。
    this.setData({ status: 'loading' })
    await syncGuide({ force: true })
    this.loadingGuide = false
    if (this.unloaded || this.data.item) return
    const item = getIngredient(this.detailId)
    if (item) {
      this.applyItem(item)
      return
    }
    this.setData({ status: 'notFound' })
  },

  // 从失败态重试，比让用户退出去再进来省事。
  retryLoad() {
    this.setData({ status: 'ready' })
    this.loadMissingGuide()
  },

  goGuideList() {
    wx.redirectTo({ url: '/pages/guide/index' })
  },

  applyItem(item) {
    // 标题带「怎么挑怎么存」这类搜索词，比只有食材名更容易被搜到。
    wx.setNavigationBarTitle({ title: `${item.name}怎么挑怎么存` })
    this.setData({ item, status: 'ready' })
  },

  onUnload() {
    this.unloaded = true
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

  onShareAppMessage() {
    const item = this.data.item
    return {
      title: item ? `这份「${item.name}」的食材指南，分享给你` : '家常食材指南，认识食材做对菜',
      path: item
        ? '/pages/guide-detail/index?id=' + encodeURIComponent(item.id)
        : '/pages/guide/index'
    }
  },

  openRecipe(e) {
    wx.navigateTo({ url: '/pages/recipe/index?id=' + e.currentTarget.dataset.id })
  }
})
