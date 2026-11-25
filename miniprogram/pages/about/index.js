const { applyTheme } = require('../../theme')
const { versionInfo } = require('../../app-version')

Page({
  data: {
    appName: '吃饭搭子',
    slogan: '认真吃饭，认真生活。',
    ...versionInfo(),
    // 数据来源署名：MIT / Unlicense 都要求随分发保留出处，这里对用户可见。
    sources: [
      {
        name: 'HowToCook',
        detail: '家常菜谱数据（Unlicense）',
        url: 'https://github.com/Anduin2017/HowToCook'
      },
      {
        name: 'Vibe Cook',
        detail: '菜谱整理与开放数据集',
        url: 'https://github.com/zkeq/vibe-cook-backend'
      },
      {
        name: '每日食光 EveryDay_Food',
        detail: '52 道轻食菜谱与家常搭配（MIT）',
        url: 'https://github.com/Jiayu-zheng1/EveryDay_Food'
      }
    ]
  },

  onShow() {
    applyTheme(this)
  },

  copySource(e) {
    const { url } = e.currentTarget.dataset
    if (!url) return
    wx.setClipboardData({ data: url })
  },

  onShareAppMessage() {
    return {
      title: '吃饭搭子 · 冰箱里有什么就做什么',
      path: '/pages/home/index'
    }
  }
})
