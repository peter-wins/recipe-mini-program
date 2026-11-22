const { applyTheme } = require('../../theme')
const { groups, listIngredients } = require('../../guide-data')

Page({
  data: {
    groups,
    groupIndex: 0,
    search: '',
    searching: false,
    visibleIngredients: []
  },

  onLoad() {
    this.setData({ visibleIngredients: listIngredients().filter(item => item.group === groups[0]) })
  },

  onShow() {
    applyTheme(this)
  },

  selectGroup(e) {
    const groupIndex = Number(e.currentTarget.dataset.index)
    this.setData({
      groupIndex,
      visibleIngredients: listIngredients().filter(item => item.group === groups[groupIndex])
    })
  },

  searchIngredients(e) {
    const search = e.detail.value
    const query = search.trim()
    const all = listIngredients()
    const visibleIngredients = query
      ? all.filter(item => item.name.includes(query))
      : all.filter(item => item.group === groups[this.data.groupIndex])
    this.setData({ search, searching: Boolean(query), visibleIngredients })
  },

  clearSearch() {
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
