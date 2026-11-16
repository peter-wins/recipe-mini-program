Page({
  data: { redirectFailed: false },

  onLoad() {
    wx.redirectTo({
      url: '/pages/home/index',
      fail: () => this.setData({ redirectFailed: true })
    })
  }
})
