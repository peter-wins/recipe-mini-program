const { themes, saveTheme, applyTheme } = require('../../theme')

Page({
  data: {
    themeOptions: themes,
    themeId: ''
  },

  onShow() {
    applyTheme(this)
  },

  changeTheme(event) {
    const { id } = event.currentTarget.dataset
    if (id === this.data.themeId) return
    try {
      const theme = saveTheme(id)
      if (!theme) return
      applyTheme(this, theme)
      wx.showToast({ title: '已切换主题', icon: 'none' })
    } catch {
      wx.showToast({ title: '主题未保存，请重试', icon: 'none' })
    }
  }
})
