const { cloudImageEnv } = require('./recipe-image')
const { syncInventory } = require('./inventory')
const { prepareCalendarSnapshots } = require('./meal-calendar')
const { syncPlanning } = require('./planning-sync')
const { loadCachedCatalog, syncCatalog } = require('./cloud-catalog')

function syncUserData() {
  syncInventory()
  syncPlanning()
}

App({
  onLaunch() {
    if (wx.cloud) wx.cloud.init({ env: cloudImageEnv })
    loadCachedCatalog()
    try {
      prepareCalendarSnapshots()
    } catch (error) {
      console.warn('现有日历安排暂未迁移', error.errCode || error.code || error.message)
    }
    if (typeof wx.onNetworkStatusChange === 'function') {
      wx.onNetworkStatusChange(({ isConnected }) => {
        if (isConnected) {
          syncUserData()
          syncCatalog()
        }
      })
    }
  },

  onShow() {
    syncUserData()
    syncCatalog()
  }
})
