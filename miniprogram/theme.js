const themes = [
  { id: 'apricot', name: '暖杏', background: '#fff8f0', accent: '#ff8a3d' },
  { id: 'green', name: '青绿', background: '#f2f7ee', accent: '#a6c89b' },
  { id: 'blue', name: '雾蓝', background: '#f0f5fb', accent: '#9abbdf' }
]
const storageKey = 'recipe-theme-v1'

function readTheme() {
  let id
  try {
    id = wx.getStorageSync(storageKey)
  } catch {
    return themes[0]
  }
  return themes.find(theme => theme.id === id) || themes[0]
}

function saveTheme(id) {
  const theme = themes.find(option => option.id === id)
  if (!theme) return null
  wx.setStorageSync(storageKey, id)
  return theme
}

function applyTheme(page, theme = readTheme()) {
  if (page.data.themeId === theme.id) return
  page.setData({ themeId: theme.id })
  if (typeof wx.setNavigationBarColor === 'function') {
    wx.setNavigationBarColor({ frontColor: '#000000', backgroundColor: theme.background })
  }
  if (typeof wx.setBackgroundColor === 'function') {
    wx.setBackgroundColor({
      backgroundColor: theme.background,
      backgroundColorTop: theme.background,
      backgroundColorBottom: theme.background
    })
  }
}

module.exports = { themes, readTheme, saveTheme, applyTheme }
