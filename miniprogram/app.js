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

App({
  onLaunch() {
    if (wx.cloud) wx.cloud.init({ env: cloudImageEnv })
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
