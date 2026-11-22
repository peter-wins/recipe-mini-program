const developmentImageBase = 'http://192.168.1.81:8088'
const cloudImageEnv = 'recipe-dev-d9gsv38lz1ade2114'
const cloudStorageBase = 'cloud://' + cloudImageEnv + '.7265-recipe-dev-d9gsv38lz1ade2114-1404757921/'
const cloudImageBase = cloudStorageBase + 'recipe-covers/'
const useLocalImagesInDevelopment = false

function isDevelopmentCoverUrl(url) {
  return url.indexOf(developmentImageBase + '/') === 0
}

function getCoverUrl(coverPath, envVersion) {
  const validPath = /^(?:ai-generated\/[^/\\]+|steps\/(?!\.{1,2}\/)[^/\\]+\/step_[1-9]\d*)\.jpg$/
  if (!validPath.test(coverPath)) return ''
  if (envVersion === 'develop' && useLocalImagesInDevelopment) {
    return developmentImageBase + '/' + coverPath.split('/').map(encodeURIComponent).join('/')
  }
  return ['develop', 'trial', 'release'].includes(envVersion) ? cloudImageBase + coverPath : ''
}

function recipeImage(coverPath) {
  if (typeof wx === 'undefined' || typeof wx.getAccountInfoSync !== 'function') return ''
  const { miniProgram } = wx.getAccountInfoSync()
  return getCoverUrl(coverPath, miniProgram && miniProgram.envVersion)
}

module.exports = { cloudImageEnv, cloudStorageBase, getCoverUrl, recipeImage, isDevelopmentCoverUrl }
