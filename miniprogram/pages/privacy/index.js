const { applyTheme } = require('../../theme')

Page({
  data: {
    appName: '吃饭搭子',
    updatedLabel: '2026-11-24',
    // 逐项对应代码里真实发生的数据处理，新增/删减能力时必须同步改这里。
    collected: [
      {
        title: '微信用户标识',
        body: '云函数通过微信云开发接口读取你的 openid（每个小程序内唯一的匿名编号），用于把同一台设备的数据归到你名下。我们拿不到你的微信号、手机号或昵称。'
      },
      {
        title: '冰箱食材',
        body: '你在「冰箱」页登记或移除的食材清单。'
      },
      {
        title: '收藏与做菜记录',
        body: '你收藏的菜谱、标记为做过的菜。'
      },
      {
        title: '日历安排',
        body: '你在「日历」里排的每一餐。'
      }
    ],
    purposes: [
      '换设备或重装后，凭同一个微信身份恢复你的冰箱、收藏和安排。',
      '在多台设备间保持数据一致，避免在一台上改了另一台看不到。'
    ],
    notCollected: [
      '不读取通讯录、位置、相册、摄像头、麦克风。',
      '不收集手机号、身份证、真实姓名。',
      '不做用户画像，不用于广告投放，不与任何第三方共享。'
    ],
    storageNote: '数据保存在微信云开发的数据库里，由微信提供存储与传输加密。你可以在「冰箱」页随时清空食材、在「记录」页取消收藏，删除后云端对应记录同步清除。',
    contactNote: '如需查询、更正或删除你的全部数据，在「我的 → 意见反馈」里告诉我，我会处理。'
  },

  onShow() {
    applyTheme(this)
  },

  goBack() {
    if (getCurrentPages().length > 1) wx.navigateBack()
    else wx.reLaunch({ url: '/pages/home/index' })
  },

  onShareAppMessage() {
    return {
      title: '吃饭搭子 · 隐私说明',
      path: '/pages/privacy/index'
    }
  }
})
