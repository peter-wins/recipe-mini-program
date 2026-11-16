// 口味偏好：推荐页的设置会持久化，首页、冰箱匹配和随机吃共用。
const key = 'recipe-taste-preferences-v1'
const defaults = { mode: 'stock', maxMinutes: 30, people: 2, taste: 'any', notes: '' }
const modes = new Set(['stock', 'needs', 'light', 'pick'])
const tastes = new Set(['mild', 'spicy', 'any'])
const minutes = new Set([0, 15, 30])
let memory = null

function storageApi() {
  if (typeof wx === 'undefined' || !wx || typeof wx.getStorageSync !== 'function') return null
  return wx
}

function normalize(value) {
  const source = value && typeof value === 'object' ? value : {}
  const people = Number(source.people)
  return {
    mode: modes.has(source.mode) ? source.mode : defaults.mode,
    maxMinutes: minutes.has(Number(source.maxMinutes)) ? Number(source.maxMinutes) : defaults.maxMinutes,
    people: Number.isInteger(people) && people >= 1 && people <= 12 ? people : defaults.people,
    taste: tastes.has(source.taste) ? source.taste : defaults.taste,
    notes: typeof source.notes === 'string' ? source.notes.slice(0, 200) : defaults.notes
  }
}

function readPreferences() {
  const api = storageApi()
  let stored = memory
  if (api) {
    try {
      stored = api.getStorageSync(key) || memory
    } catch {
      stored = memory
    }
  }
  return normalize(stored)
}

function write(value) {
  const next = normalize(value)
  memory = next
  const api = storageApi()
  if (api && typeof api.setStorageSync === 'function') {
    try {
      api.setStorageSync(key, next)
    } catch {
      // Local storage can be unavailable; keep the in-memory copy for this session.
    }
  }
  return next
}

function savePreferences(patch) {
  return write({ ...readPreferences(), ...(patch || {}) })
}

function resetPreferences() {
  memory = { ...defaults }
  const api = storageApi()
  if (api && typeof api.setStorageSync === 'function') {
    try {
      api.setStorageSync(key, memory)
    } catch {
      // Ignore storage failures; in-memory defaults still apply.
    }
  }
  return { ...memory }
}

function preferenceSummary(preferences = readPreferences()) {
  const taste = { mild: '偏清淡', spicy: '偏香辣', any: '口味不限' }[preferences.taste] || '口味不限'
  const time = preferences.maxMinutes ? `${preferences.maxMinutes} 分钟内` : '不限时间'
  const notes = preferences.notes.trim()
  return [taste, time, notes ? `忌口：${notes}` : ''].filter(Boolean).join(' · ')
}

module.exports = { defaults, readPreferences, savePreferences, resetPreferences, preferenceSummary }
