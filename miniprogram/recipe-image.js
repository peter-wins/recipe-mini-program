const developmentImageBase = 'http://192.168.1.81:8088'
const productionImageBase = ''

function isDevelopmentCoverUrl(url) {
  return url.indexOf(developmentImageBase + '/') === 0
}

function getCoverUrl(coverPath, envVersion) {
  const validPath = /^(?:ai-generated\/[^/\\]+|steps\/(?!\.{1,2}\/)[^/\\]+\/step_[1-9]\d*)\.jpg$/
  if (!validPath.test(coverPath)) return ''
  const base = envVersion === 'develop' ? developmentImageBase : productionImageBase
  return base ? base.replace(/\/$/, '') + '/' + coverPath.split('/').map(encodeURIComponent).join('/') : ''
}

function recipeImage(coverPath) {
  if (typeof wx === 'undefined' || typeof wx.getAccountInfoSync !== 'function') return ''
  const { miniProgram } = wx.getAccountInfoSync()
  return getCoverUrl(coverPath, miniProgram && miniProgram.envVersion)
}

module.exports = { getCoverUrl, recipeImage, isDevelopmentCoverUrl }
