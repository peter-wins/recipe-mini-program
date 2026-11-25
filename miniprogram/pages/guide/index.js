const { applyTheme } = require('../../theme')
const { listIngredients, getGuideGroups } = require('../../guide-data')
const { readHistory, saveHistory, clearHistory } = require('../../search-history')
const { subscribe } = require('../../cloud-guide')

Page({
  data: {
    groups: [],
    groupIndex: 0,
    search: '',
    searching: false,
    focused: false,
    searchHistory: [],
    visibleIngredients: [],
    syncState: 'idle'   // idle | loading | offline
  },

  onLoad() {
    // 云端整版替换期间给局部反馈，避免列表毫无征兆地整体换掉。
    this.unsubscribeSync = subscribe(({ status }) => {
      if (this.data.syncState !== status) this.setData({ syncState: status })
    })
    this.refreshGuideData()
  },

  onUnload() {
    if (typeof this.unsubscribeSync === 'function') this.unsubscribeSync()
  },

  onShow() {
    applyTheme(this)
    // 云端可能在后台切换了版本，回到前台时按当前数据重绘。
    this.refreshGuideData()
  },

  // 按当前分组与搜索条件重绘列表，云端整版替换后由 cloud-guide 调用。
  refreshGuideData() {
    const groups = getGuideGroups()
    const all = listIngredients()
    const query = this.data.search.trim()
    let groupIndex = this.data.groupIndex
    if (groupIndex >= groups.length) groupIndex = 0
    const visibleIngredients = query
      ? all.filter(item => item.name.includes(query))
      : all.filter(item => item.group === groups[groupIndex])
    this.setData({ groups, groupIndex, searching: Boolean(query), visibleIngredients })
  },

  selectGroup(e) {
    const groupIndex = Number(e.currentTarget.dataset.index)
    const groups = getGuideGroups()
    this.setData({
      groupIndex,
      visibleIngredients: listIngredients().filter(item => item.group === groups[groupIndex])
    })
  },

  searchIngredients(e) {
    const search = e.detail.value
    const query = search.trim()
    const all = listIngredients()
    const groups = getGuideGroups()
    const visibleIngredients = query
      ? all.filter(item => item.name.includes(query))
      : all.filter(item => item.group === groups[this.data.groupIndex])
    this.setData({ search, searching: Boolean(query), visibleIngredients })
  },

  focusSearch() {
    this.setData({ focused: true, searchHistory: readHistory('ingredient') })
  },

  blurSearch() {
    this.setData({ focused: false })
  },

  confirmSearch(e) {
    const word = e && e.detail ? e.detail.value : this.data.search
    this.setData({ searchHistory: saveHistory('ingredient', word), focused: false })
  },

  useSearchHistory(e) {
    const { word } = e.currentTarget.dataset
    if (!word) return
    saveHistory('ingredient', word)
    const all = listIngredients()
    this.setData({
      search: word,
      searching: true,
      focused: false,
      searchHistory: readHistory('ingredient'),
      visibleIngredients: all.filter(item => item.name.includes(word))
    })
  },

  clearSearchHistory() {
    this.setData({ searchHistory: clearHistory('ingredient') })
  },

  clearSearch() {
    const groups = getGuideGroups()
    this.setData({
      search: '',
      searching: false,
      visibleIngredients: listIngredients().filter(item => item.group === groups[this.data.groupIndex])
    })
  },

  openDetail(e) {
    wx.navigateTo({ url: '/pages/guide-detail/index?id=' + e.currentTarget.dataset.id })
  }
})
