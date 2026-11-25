// 搜索历史（设计指南 3.1「减少输入」）：同一批菜名用户会反复搜，给个回填入口。
// 只存关键词，不存结果，按最近使用排序，去重，限制条数。

const storageKey = 'search-history-v1'
const limitPerScope = 8

function readAll() {
  try {
    const raw = wx.getStorageSync(storageKey)
    if (!raw || typeof raw !== 'object') return {}
    return raw
  } catch {
    return {}
  }
}

function readHistory(scope) {
  const all = readAll()
  const list = all[scope]
  return Array.isArray(list) ? list.filter(item => typeof item === 'string' && item) : []
}

function saveHistory(scope, keyword) {
  const word = typeof keyword === 'string' ? keyword.trim() : ''
  // 太短的不记，没意义还占位置。
  if (word.length < 2) return readHistory(scope)
  const list = readHistory(scope).filter(item => item !== word)
  list.unshift(word)
  const next = list.slice(0, limitPerScope)
  try {
    const all = readAll()
    all[scope] = next
    wx.setStorageSync(storageKey, all)
  } catch {
    // 存储满了也不影响搜索本身
  }
  return next
}

function clearHistory(scope) {
  try {
    const all = readAll()
    delete all[scope]
    wx.setStorageSync(storageKey, all)
  } catch {
    // 忽略
  }
  return []
}

module.exports = { readHistory, saveHistory, clearHistory, limitPerScope }
