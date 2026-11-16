const { cloudImageEnv } = require('./recipe-image')
const { syncInventory } = require('./inventory')

App({
  onLaunch() {
    if (wx.cloud) wx.cloud.init({ env: cloudImageEnv })
    if (typeof wx.onNetworkStatusChange === 'function') {
      wx.onNetworkStatusChange(({ isConnected }) => {
        if (isConnected) syncInventory()
      })
    }
  },

  onShow() {
    syncInventory()
  }
})
