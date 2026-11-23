// 版本信息集中在这里维护：发版时更新 APP_VERSION 与 RELEASE_NOTES 即可。
// 真机上优先读取微信后台配置的版本号，开发/异常环境回退到本地常量。
const APP_VERSION = '1.2.4'
const RELEASE_NOTES = [
  '「我的」页全新改版，新增主题外观与关于页',
  '冰箱页新增灵感轮播，手边食材置顶更顺手',
  '全局图标与按钮统一，界面更协调'
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
