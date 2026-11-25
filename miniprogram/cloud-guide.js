// 食材指南云同步：对齐 cloud-catalog.js。
// 云数据库 guide_catalog/published 指向当前版本；云存储 guide-catalog/v1/<version>.json 存正文。
// 设备保留上次成功版本缓存，断网时用随包数据。
const { replaceGuide } = require('./guide-data')
const { validRelease, parseRelease } = require('./guide-release')
const { cloudImageEnv, cloudStorageBase } = require('./recipe-image')

const cacheName = '/guide-catalog-v1.json'
const checkInterval = 5 * 60 * 1000
let activeVersion
let inFlight
let checkedAt

function loadCachedGuide() {
  if (typeof wx.getFileSystemManager !== 'function' || !wx.env || !wx.env.USER_DATA_PATH) return
  const fs = wx.getFileSystemManager()
  const path = wx.env.USER_DATA_PATH + cacheName
  try {
    fs.accessSync(path)
  } catch {
    return
  }
  try {
    const cached = parseRelease(fs.readFileSync(path, 'utf8'))
    replaceGuide(cached)
    activeVersion = cached.version
  } catch (error) {
    console.warn('本地食材指南缓存不可用', error.message)
  }
}

function cacheRelease(fs, text) {
  if (!wx.env || !wx.env.USER_DATA_PATH) return
  const filePath = wx.env.USER_DATA_PATH + cacheName
  const pendingPath = filePath + '.tmp'
  fs.writeFile({
    filePath: pendingPath, data: text, encoding: 'utf8',
    success: () => fs.rename({
      oldPath: pendingPath, newPath: filePath,
      fail: error => console.warn('食材指南缓存暂未更新', error.errMsg)
    }),
    fail: error => console.warn('食材指南缓存暂未保存', error.errMsg)
  })
}

async function checkRelease() {
  const { data: release } = await wx.cloud.database({ env: cloudImageEnv }).collection('guide_catalog').doc('published').get()
  if (!validRelease(release)) throw new Error('云端食材指南清单格式不正确')
  if (release.version === activeVersion) return

  const fileID = cloudStorageBase + 'guide-catalog/v1/' + release.version + '.json'
  const { tempFilePath } = await wx.cloud.downloadFile({ fileID })
  const fs = wx.getFileSystemManager()
  const text = await new Promise((resolve, reject) => {
    fs.readFile({ filePath: tempFilePath, encoding: 'utf8', success: result => resolve(result.data), fail: reject })
  })
  const source = parseRelease(text, release)
  replaceGuide(source)
  activeVersion = source.version
  cacheRelease(fs, text)

  const pages = typeof getCurrentPages === 'function' ? getCurrentPages() : []
  for (const page of pages) {
    if (page && typeof page.refreshGuideData === 'function') page.refreshGuideData()
  }
}

// 页面订阅同步状态，用来显示局部加载条（设计指南 2.2）。
const listeners = new Set()

function subscribe(fn) {
  if (typeof fn !== 'function') return () => {}
  listeners.add(fn)
  return () => listeners.delete(fn)
}

function notify(state) {
  listeners.forEach(fn => {
    try { fn(state) } catch (error) { console.warn('同步状态回调失败', error.message) }
  })
}

function syncGuide({ force = false } = {}) {
  if (!wx.cloud || typeof wx.cloud.database !== 'function' || typeof wx.cloud.downloadFile !== 'function' ||
      typeof wx.getFileSystemManager !== 'function') return
  if (inFlight) return inFlight
  if (!force && checkedAt !== undefined && Date.now() - checkedAt < checkInterval) return
  notify({ status: 'loading' })
  inFlight = checkRelease().then(() => {
    checkedAt = Date.now()
    notify({ status: 'idle' })
    return true
  }).catch(error => {
    console.warn('云端食材指南暂未更新', error.errMsg || error.message)
    // 首次没有随包数据可兜底时才算失败；有缓存则静默降级。
    notify({ status: activeVersion ? 'idle' : 'offline' })
    return false
  }).finally(() => { inFlight = null })
  return inFlight
}

module.exports = { loadCachedGuide, syncGuide, subscribe }
