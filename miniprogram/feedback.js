// 统一的反馈与异常处理（微信设计指南 2.2 结果反馈 / 2.3 异常可控）
//
// 分两类，别混用：
// - 成功、轻量状态 → 图标/文字 toast，1.5 秒自动消失，不打断。
// - 失败、需要用户知晓 → 模态对话框，附「重试」，给用户一条退路。
// 错误绝不用 toast，用户来不及看清就没了，也不知道下一步做什么。

function toast(title) {
  if (typeof wx.showToast !== 'function') return
  wx.showToast({ title, icon: 'none', duration: 1500 })
}

function success(title) {
  if (typeof wx.showToast !== 'function') return
  wx.showToast({ title, icon: 'success', duration: 1500 })
}

// 带重试的失败提示。onRetry 为空时退化成「知道了」。
function failure({ title = '出了点问题', content, retryText = '重试', onRetry } = {}) {
  if (typeof wx.showModal !== 'function') {
    toast(content || title)
    return
  }
  const options = {
    title,
    content: content || '你可以稍后再试一次。',
    showCancel: typeof onRetry === 'function',
    confirmText: typeof onRetry === 'function' ? retryText : '知道了',
    cancelText: '稍后',
    success: ({ confirm }) => {
      if (confirm && typeof onRetry === 'function') onRetry()
    }
  }
  // 没有重试回调时只留一个按钮，别给用户假选择。
  if (typeof onRetry !== 'function') options.showCancel = false
  wx.showModal(options)
}

module.exports = { toast, success, failure }
