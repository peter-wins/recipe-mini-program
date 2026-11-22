const { applyTheme } = require('../../theme')
const { getRecipe } = require('../../catalog')
const { getCustomMeal, saveCustomMeal, getMealDishReplacement, replaceMealDish } = require('../../meal-plans')

Page({
  data: { mealId: '', title: '', selected: [], saving: false, replacement: false, dishName: '', allowedIds: [] },

  onLoad({ id, planId, replace } = {}) {
    if (planId && replace) {
      let change
      try {
        change = getMealDishReplacement(decodeURIComponent(planId), decodeURIComponent(replace))
      } catch (error) {
        console.warn('暂时无法读取可替换的菜谱', error.message)
      }
      if (change) this.dishChange = { planId, dishId: change.dish.id, expectedIds: change.recipeIds }
      this.setData({ replacement: true, dishName: change ? change.dish.name : '', allowedIds: change ? change.candidateIds : [] })
      wx.setNavigationBarTitle({ title: '换一道菜' })
      return
    }
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

  refreshCatalogData() {
    const { dishChange } = this
    if (dishChange) {
      const change = getMealDishReplacement(dishChange.planId, dishChange.dishId)
      this.setData({ allowedIds: change ? change.candidateIds : [] })
    }
    const picker = this.selectComponent('#recipe-picker')
    if (picker) picker.refreshCatalogData()
  },

  updateTitle(event) {
    this.setData({ title: event.detail.value })
  },

  onPickerConfirm(event) {
    const { ids } = event.detail
    if (!ids.length || this.data.saving) return
    if (this.data.replacement && (!this.dishChange || ids.length !== 1)) return
    this.setData({ saving: true })
    try {
      if (this.dishChange) {
        const { planId, dishId, expectedIds } = this.dishChange
        if (!replaceMealDish(planId, dishId, ids[0], expectedIds)) {
          this.setData({ saving: false })
          wx.showToast({ title: '搭配或菜谱已变动，请返回重试', icon: 'none' })
          return
        }
      } else if (!saveCustomMeal(this.data.title, ids, this.data.mealId)) throw new Error('No available recipes')
    } catch {
      this.setData({ saving: false })
      wx.showToast({ title: '搭配未保存，请重试', icon: 'none' })
      return
    }

    const channel = this.getOpenerEventChannel && this.getOpenerEventChannel()
    if (channel) channel.emit(this.dishChange ? 'mealDishChanged' : 'mealSaved')
    wx.showToast({ title: this.dishChange ? '已换好' : '搭配已保存', icon: 'success' })
    wx.navigateBack({
      fail: () => wx.reLaunch({ url: '/pages/home/index' })
    })
  }
})
