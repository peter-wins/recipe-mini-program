const { applyTheme } = require('../../theme')
const { versionInfo } = require('../../app-version')

Page({
  data: {
    appName: '吃饭得有谱',
    slogan: '认真吃饭，认真生活。',
    ...versionInfo()
  },

  onShow() {
    applyTheme(this)
  }
})
