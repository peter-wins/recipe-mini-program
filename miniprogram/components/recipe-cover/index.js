const { isDevelopmentCoverUrl } = require('../../recipe-image')

const maxCachedCloudImages = 120
const cloudImagePaths = new Map()
const pendingCloudImages = new Map()

async function downloadCloudImage(fileID) {
  try {
    const { tempFilePath } = await wx.cloud.downloadFile({ fileID })
    if (tempFilePath) {
      cloudImagePaths.set(fileID, tempFilePath)
      if (cloudImagePaths.size > maxCachedCloudImages) {
        cloudImagePaths.delete(cloudImagePaths.keys().next().value)
      }
    }
    return tempFilePath || ''
  } finally {
    pendingCloudImages.delete(fileID)
  }
}

function getCloudImage(fileID) {
  const path = cloudImagePaths.get(fileID)
  if (path) {
    // Keep recently used paths when the cache reaches its limit.
    cloudImagePaths.delete(fileID)
    cloudImagePaths.set(fileID, path)
    return path
  }

  if (!pendingCloudImages.has(fileID)) {
    // Register the shared request before starting the download.
    pendingCloudImages.set(fileID, Promise.resolve().then(() => downloadCloudImage(fileID)))
  }
  return pendingCloudImages.get(fileID)
}

Component({
  properties: {
    src: {
      type: String,
      value: '',
      observer(src) {
        this.cancelDownload()
        this.retriedCloudImage = false
        const cloudSource = src.indexOf('cloud://') === 0
        this.setData({ cloudSource, downloadedSrc: '', failed: false, loaded: false })
        if (cloudSource && this.coverReady) this.requestCloudImage(src)
      }
    },
    label: { type: String, value: '' },
    mode: { type: String, value: 'aspectFill' },
    textFallback: { type: Boolean, value: false },
    reserveSquare: { type: Boolean, value: false },
    lazy: { type: Boolean, value: false }
  },
  data: { cloudSource: false, downloadedSrc: '', failed: false, loaded: false },
  lifetimes: {
    ready() {
      this.coverReady = true
      if (this.data.cloudSource) this.requestCloudImage(this.data.src)
    },
    detached() {
      this.coverReady = false
      this.cancelDownload()
    }
  },
  methods: {
    cancelDownload() {
      this.cloudRequest = null
      if (this.visibilityObserver) {
        this.visibilityObserver.disconnect()
        this.visibilityObserver = null
      }
      if (!this.coverDownload) return
      const task = this.coverDownload
      this.coverDownload = null
      task.abort()
    },
    requestCloudImage(fileID) {
      if (!this.data.lazy || typeof this.createIntersectionObserver !== 'function') {
        this.loadCloudImage(fileID)
        return
      }

      const observer = this.createIntersectionObserver()
      this.visibilityObserver = observer
      observer.relativeToViewport({ top: 120, bottom: 200 }).observe('.cover-frame', ({ intersectionRatio }) => {
        if (intersectionRatio <= 0 || this.visibilityObserver !== observer) return
        observer.disconnect()
        this.visibilityObserver = null
        this.loadCloudImage(fileID)
      })
    },
    async loadCloudImage(fileID) {
      const request = {}
      this.cloudRequest = request
      try {
        const path = await getCloudImage(fileID)
        if (this.cloudRequest === request) {
          this.setData({ downloadedSrc: path, failed: !path })
        }
      } catch (error) {
        if (this.cloudRequest === request) {
          console.warn('云存储图片下载失败', error)
          this.setData({ failed: true })
        }
      }
    },
    imageLoaded(event) {
      const { src, downloadedSrc, failed } = this.data
      if (!failed && !this.coverDownload && event.currentTarget.dataset.url === (downloadedSrc || src)) {
        this.setData({ loaded: true })
      }
    },
    imageFailed(event) {
      const url = event.currentTarget.dataset.url
      const { src, downloadedSrc, failed } = this.data
      if (failed || url !== (downloadedSrc || src) || this.coverDownload) return
      if (this.data.cloudSource && downloadedSrc) {
        if (cloudImagePaths.get(src) === downloadedSrc) cloudImagePaths.delete(src)
        if (!this.retriedCloudImage) {
          this.retriedCloudImage = true
          this.setData({ downloadedSrc: '', loaded: false })
          this.loadCloudImage(src)
          return
        }
      }
      if (downloadedSrc || !isDevelopmentCoverUrl(url) || typeof wx.downloadFile !== 'function') {
        this.setData({ failed: true, loaded: false })
        return
      }
      const complete = (downloadedSrc, error) => {
        if (this.coverDownload !== task) return
        this.coverDownload = null
        if (error) console.warn('菜谱图片下载失败', url, error)
        this.setData({ downloadedSrc, failed: !downloadedSrc })
      }
      this.setData({ loaded: false })
      const task = wx.downloadFile({
        url,
        timeout: 5000,
        success: ({ statusCode, tempFilePath }) => {
          if (statusCode === 200 && tempFilePath) complete(tempFilePath)
          else complete('', 'HTTP ' + statusCode)
        },
        fail: ({ errMsg }) => complete('', errMsg)
      })
      this.coverDownload = task
    }
  }
})
