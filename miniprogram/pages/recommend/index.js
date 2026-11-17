const { readInventory, previewInventory } = require('../../inventory')
const { recommendRecipes } = require('../../recipe-recommendations')
const { applyTheme } = require('../../theme')

const modes = [
  { value: 'stock', label: '按食材', icon: 'fridge', hint: '优先推荐食材齐全、需要少补买的菜。' },
  { value: 'needs', label: '按需求', icon: 'chat', hint: '在下方写想吃或想避开的食材，例如「想吃豆腐，不要香菜」。' },
  { value: 'light', label: '健康吃', icon: 'favorites', hint: '优先推荐清蒸、白灼、凉拌等做法。' },
  { value: 'pick', label: '帮我选', icon: 'shuffle', hint: '从符合偏好的菜谱中随机挑选，再点一次可以换一批。' }
]
const timeOptions = [
  { value: 15, label: '15 分钟内' }, { value: 30, label: '30 分钟内' }, { value: 0, label: '不限' }
]
const tasteOptions = [
  { value: 'mild', label: '清淡' }, { value: 'spicy', label: '香辣' }, { value: 'any', label: '不限' }
]
const preferenceOptions = { mode: modes, maxMinutes: timeOptions, taste: tasteOptions }
const defaults = { mode: 'stock', maxMinutes: 30, people: 2, taste: 'mild', notes: '', modeHint: modes[0].hint }
const clearResults = { hasRun: false, recommendations: [], ignoredNotes: '' }

Page({
  data: {
    ...defaults, ...clearResults, modes, timeOptions, tasteOptions,
    selected: [], inventoryPreview: [], extraIngredients: 0, inventoryReady: false,
    nav: { status: 0, height: 44, inset: 96 }
  },

  onLoad() {
    this.updateNavLayout()
  },

  onResize() {
    this.updateNavLayout()
  },

  updateNavLayout() {
    const windowInfo = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()
    const status = windowInfo.statusBarHeight || 0
    const menu = wx.getMenuButtonBoundingClientRect()
    const hasMenu = menu && menu.height > 0 && menu.left > 0
    const height = hasMenu ? menu.height + 2 * Math.max(0, menu.top - status) : 44
    const inset = hasMenu ? windowInfo.windowWidth - menu.left + 8 : 96
    this.setData({ nav: { status, height, inset } })
  },

  goBack() {
    wx.navigateBack({
      fail: () => wx.reLaunch({ url: '/pages/home/index' })
    })
  },

  onShow() {
    applyTheme(this)
    this.refreshKitchenData()
  },

  refreshKitchenData() {
    try {
      const selected = readInventory()
      const key = selected.slice().sort().join(',')
      if (key === this.inventoryKey && this.data.inventoryReady) return
      const update = key === this.inventoryKey ? {} : clearResults
      this.inventoryKey = key
      this.setData({ ...update, ...previewInventory(selected), selected, inventoryReady: true })
    } catch {
      this.setData({ ...clearResults, selected: [], inventoryPreview: [], extraIngredients: 0, inventoryReady: false })
      wx.showToast({ title: '暂时无法读取冰箱', icon: 'none' })
    }
  },

  openFridge() {
    wx.navigateTo({
      url: '/pages/fridge/index',
      fail: () => wx.showToast({ title: '暂时无法打开冰箱，请重试', icon: 'none' })
    })
  },

  setPreference(event) {
    const { key, value: rawValue } = event.currentTarget.dataset
    const value = key === 'maxMinutes' ? Number(rawValue) : rawValue
    const option = preferenceOptions[key].find(item => item.value === value)
    if (!option || this.data[key] === value) return
    const update = key === 'mode' ? { modeHint: option.hint } : {}
    this.setData({ ...clearResults, ...update, [key]: value })
  },

  changePeople(event) {
    const change = Number(event.currentTarget.dataset.change)
    const people = Math.min(12, Math.max(1, this.data.people + change))
    if (people !== this.data.people) this.setData({ ...clearResults, people })
  },

  updateNotes(event) {
    this.setData({ ...clearResults, notes: event.detail.value })
  },

  restorePreferences() {
    this.setData({ ...clearResults, ...defaults, modeHint: modes[0].hint })
  },

  runRecommendations() {
    const { selected, mode, maxMinutes, people, taste, notes } = this.data
    const result = recommendRecipes(selected, { mode, maxMinutes, people, taste, notes })
    this.setData({
      hasRun: true, recommendations: result.recipes, ignoredNotes: result.ignored.join('、')
    }, () => wx.pageScrollTo({ selector: '#recommend-results', duration: 250 }))
  }
})
