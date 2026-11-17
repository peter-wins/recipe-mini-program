const { applyTheme } = require('../../theme')
const { getRecipe } = require('../../catalog')
const { getCustomMeal, saveCustomMeal } = require('../../meal-plans')

Page({
  data: { mealId: '', title: '', selected: [], saving: false },

  onLoad({ id } = {}) {
    if (id) {
      this.setData({ mealId: id })
      try {
        const meal = getCustomMeal(id)
        if (!meal) throw new Error('Meal unavailable')
        const selected = meal.recipes.map(recipeId => getRecipe(recipeId)).filter(Boolean)
          .map(({ id: recipeId, name }) => ({ id: recipeId, title: name }))
        this.setData({ title: meal.title, selected })
        wx.setNavigationBarTitle({ title: '编辑搭配' })
      } catch {
        wx.showToast({ title: '暂时无法读取这套搭配', icon: 'none' })
        return
      }
    }
  },

  onShow() {
    applyTheme(this)
  },

  updateTitle(event) {
    this.setData({ title: event.detail.value })
  },

  onPickerConfirm(event) {
    const { ids } = event.detail
    if (!ids.length || this.data.saving) return
    this.setData({ saving: true })
    try {
      const meal = saveCustomMeal(this.data.title, ids, this.data.mealId)
      if (!meal) throw new Error('No available recipes')
    } catch {
      this.setData({ saving: false })
      wx.showToast({ title: '搭配未保存，请重试', icon: 'none' })
      return
    }

    const channel = this.getOpenerEventChannel && this.getOpenerEventChannel()
    if (channel) channel.emit('mealSaved')
    wx.showToast({ title: '搭配已保存', icon: 'success' })
    wx.navigateBack({
      fail: () => wx.reLaunch({ url: '/pages/home/index' })
    })
  }
})
