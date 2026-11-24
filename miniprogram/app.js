const { cloudImageEnv } = require('./recipe-image')
const { syncInventory } = require('./inventory')
const { prepareCalendarSnapshots } = require('./meal-calendar')
const { syncPlanning } = require('./planning-sync')
const { loadCachedCatalog, syncCatalog } = require('./cloud-catalog')
const { loadCachedGuide, syncGuide } = require('./cloud-guide')

function syncUserData() {
  syncInventory()
  syncPlanning()
}

function syncCloudContent() {
  syncCatalog()
  syncGuide()
}

// 装了旧版的用户不会自己发现新版本，这里主动提示一次重启。
function watchUpdate() {
  if (typeof wx.getUpdateManager !== 'function') return
  const manager = wx.getUpdateManager()
  manager.onUpdateReady(() => {
    wx.showModal({
      title: '有新版本',
      content: '更新已经准备好了，重启后就是最新版。',
      confirmText: '立即重启',
      cancelText: '稍后',
      success: ({ confirm }) => {
        if (confirm) manager.applyUpdate()
      }
    })
  })
  manager.onUpdateFailed(() => {
    console.warn('新版本下载失败，稍后重试')
  })
}

App({
  onLaunch() {
    if (wx.cloud) wx.cloud.init({ env: cloudImageEnv })
    watchUpdate()
    loadCachedCatalog()
    loadCachedGuide()
    try {
      prepareCalendarSnapshots()
    } catch (error) {
      console.warn('现有日历安排暂未迁移', error.errCode || error.code || error.message)
    }
    if (typeof wx.onNetworkStatusChange === 'function') {
      wx.onNetworkStatusChange(({ isConnected }) => {
        if (isConnected) {
          syncUserData()
          syncCloudContent()
        }
      })
    }
  },

  onShow() {
    syncUserData()
    syncCloudContent()
  }
})
