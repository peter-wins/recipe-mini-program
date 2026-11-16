const { readPreferences, savePreferences, resetPreferences } = require('../../preferences')
const { applyTheme } = require('../../theme')

const tastes = [
  { value: 'any', label: '不限' },
  { value: 'mild', label: '清淡' },
  { value: 'spicy', label: '香辣' }
]
const times = [
  { value: 0, label: '不限' },
  { value: 15, label: '15 分钟内' },
  { value: 30, label: '30 分钟内' }
]

Page({
  data: {
    tastes, times,
    taste: 'any', maxMinutes: 30, people: 2, notes: ''
  },

  onShow() {
    applyTheme(this)
    const saved = readPreferences()
    this.setData({ taste: saved.taste, maxMinutes: saved.maxMinutes, people: saved.people, notes: saved.notes })
  },

  setPreference(event) {
    const { key, value: rawValue } = event.currentTarget.dataset
    const value = key === 'maxMinutes' ? Number(rawValue) : rawValue
    const options = key === 'taste' ? tastes : times
    if (!options.some(item => item.value === value)) return
    this.setData({ [key]: value })
  },

  changePeople(event) {
    const change = Number(event.currentTarget.dataset.change)
    const people = Math.min(12, Math.max(1, this.data.people + change))
    if (people !== this.data.people) this.setData({ people })
  },

  updateNotes(event) {
    this.setData({ notes: event.detail.value })
  },

  save() {
    const { taste, maxMinutes, people, notes } = this.data
    savePreferences({ taste, maxMinutes, people, notes })
    wx.showToast({ title: '已保存', icon: 'success' })
    setTimeout(() => wx.navigateBack(), 600)
  },

  restoreDefaults() {
    const saved = resetPreferences()
    this.setData({ taste: saved.taste, maxMinutes: saved.maxMinutes, people: saved.people, notes: saved.notes })
    wx.showToast({ title: '已恢复默认', icon: 'none' })
  }
})
