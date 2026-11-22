const { replaceCatalog } = require('./catalog')
const { validRelease, parseRelease } = require('./catalog-release')
const { cloudImageEnv, cloudStorageBase } = require('./recipe-image')

const cacheName = '/recipe-catalog-v1.json'
const checkInterval = 5 * 60 * 1000
let activeVersion
let inFlight
let checkedAt

function loadCachedCatalog() {
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
    replaceCatalog(cached)
    activeVersion = cached.version
  } catch (error) {
    console.warn('本地菜谱缓存不可用', error.message)
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
      fail: error => console.warn('菜谱缓存暂未更新', error.errMsg)
    }),
    fail: error => console.warn('菜谱缓存暂未保存', error.errMsg)
  })
}

async function checkRelease() {
  const { data: release } = await wx.cloud.database({ env: cloudImageEnv }).collection('recipe_catalog').doc('published').get()
  if (!validRelease(release)) throw new Error('云端菜谱清单格式不正确')
  if (release.version === activeVersion) return

  const fileID = cloudStorageBase + 'recipe-catalog/v1/' + release.version + '.json'
  const { tempFilePath } = await wx.cloud.downloadFile({ fileID })
  const fs = wx.getFileSystemManager()
  const text = await new Promise((resolve, reject) => {
    fs.readFile({ filePath: tempFilePath, encoding: 'utf8', success: result => resolve(result.data), fail: reject })
  })
  const source = parseRelease(text, release)
  replaceCatalog(source)
  activeVersion = source.version
  cacheRelease(fs, text)

  const pages = typeof getCurrentPages === 'function' ? getCurrentPages() : []
  const page = pages[pages.length - 1]
  if (page && typeof page.refreshCatalogData === 'function') page.refreshCatalogData()
}

function syncCatalog({ force = false } = {}) {
  if (!wx.cloud || typeof wx.cloud.database !== 'function' || typeof wx.cloud.downloadFile !== 'function' ||
      typeof wx.getFileSystemManager !== 'function') return
  if (inFlight) return inFlight
  if (!force && checkedAt !== undefined && Date.now() - checkedAt < checkInterval) return
  inFlight = checkRelease().then(() => {
    checkedAt = Date.now()
    return true
  }).catch(error => {
    console.warn('云端菜谱暂未更新', error.errMsg || error.message)
    return false
  }).finally(() => { inFlight = null })
  return inFlight
}

module.exports = { loadCachedCatalog, syncCatalog }
