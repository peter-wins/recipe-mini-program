// 版本信息集中在这里维护：发版时更新 APP_VERSION 与 RELEASE_NOTES 即可。
// 真机上优先读取微信后台配置的版本号，开发/异常环境回退到本地常量。
const APP_VERSION = '1.1.0'
const RELEASE_NOTES = [
  '新增 52 道减脂轻食与做饭日历',
  '采购清单支持一键生成、手动添加，首页显示待买数量',
  '菜谱可转发好友，新增意见反馈'
]

function readVersion() {
  try {
    if (typeof wx !== 'undefined' && typeof wx.getAccountInfoSync === 'function') {
      const info = wx.getAccountInfoSync() || {}
      const version = info.miniProgram && info.miniProgram.version
      if (typeof version === 'string' && /^\d+\.\d+\.\d+$/.test(version.trim())) return version.trim()
    }
  } catch (e) {
    // 读取失败时回退到本地版本号，不影响页面展示
  }
  return APP_VERSION
}

function versionInfo() {
  return { versionLabel: 'v' + readVersion(), releaseNotes: RELEASE_NOTES.slice() }
}

module.exports = { APP_VERSION, RELEASE_NOTES, readVersion, versionInfo }
