const { isDevelopmentCoverUrl } = require('../../recipe-image')

Component({
  properties: {
    src: {
      type: String,
      value: '',
      observer() {
        this.cancelDownload()
        this.setData({ downloadedSrc: '', failed: false })
      }
    },
    label: { type: String, value: '' },
    mode: { type: String, value: 'aspectFill' },
    textFallback: { type: Boolean, value: false },
    lazy: { type: Boolean, value: false }
  },
  data: { downloadedSrc: '', failed: false },
  lifetimes: {
    detached() {
      this.cancelDownload()
    }
  },
  methods: {
    cancelDownload() {
      if (!this.coverDownload) return
      const task = this.coverDownload
      this.coverDownload = null
      task.abort()
    },
    imageFailed(event) {
      const url = event.currentTarget.dataset.url
      const { src, downloadedSrc, failed } = this.data
      if (failed || url !== (downloadedSrc || src) || this.coverDownload) return
      if (downloadedSrc || !isDevelopmentCoverUrl(url) || typeof wx.downloadFile !== 'function') {
        this.setData({ failed: true })
        return
      }
      const complete = (downloadedSrc, error) => {
        if (this.coverDownload !== task) return
        this.coverDownload = null
        if (error) console.warn('菜谱图片下载失败', url, error)
        this.setData({ downloadedSrc, failed: !downloadedSrc })
      }
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
