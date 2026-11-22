const { getMealPlans, archiveCustomMeal } = require('../../meal-plans')
const { getMealShoppingPreview, saveMealShopping } = require('../../shopping')

Component({
  properties: {
    inventory: { type: Array, value: [] },
    inventoryReady: { type: Boolean, value: false },
    calendarDate: { type: String, value: '' },
    calendarSlot: { type: String, value: '' }
  },

  data: {
    goal: 'family', plans: [],
    planPreviewLimit: 2, showAllPlans: false, purchasePicker: null, swapPlanId: ''
  },

  observers: {
    inventory() {
      this.updateMeals({})
    }
  },

  lifetimes: {
    attached() {
      this.updateMeals({})
    }
  },

  methods: {
    refreshPlanningData() {
      this.updateMeals({})
    },

    selectGoal(event) {
      const { goal } = event.currentTarget.dataset
      if (goal !== this.data.goal) this.updateMeals({ goal, showAllPlans: false, swapPlanId: '' })
    },

    togglePlans() {
      this.setData({ showAllPlans: !this.data.showAllPlans, swapPlanId: '' })
    },

    updateMeals(update) {
      const { inventory, goal } = { ...this.data, ...update }
      try {
        this.setData({ ...update, plans: getMealPlans(inventory, { goal, useAdjustments: true }) })
      } catch {
        wx.showToast({ title: '暂时无法读取搭配', icon: 'none' })
      }
    },

    toggleDishSwap(event) {
      const { id } = event.currentTarget.dataset
      const plan = this.data.plans.find(item => item.id === id)
      if (!plan) return
      if (plan.dishes.length === 1) this.openDishReplacement(id, plan.dishes[0].id)
      else this.setData({ swapPlanId: this.data.swapPlanId === id ? '' : id })
    },

    selectDishToSwap(event) {
      const { dishId } = event.currentTarget.dataset
      if (this.data.swapPlanId) this.openDishReplacement(this.data.swapPlanId, dishId)
    },

    openDishReplacement(planId, dishId) {
      const url = '/pages/compose-meal/index?planId=' + encodeURIComponent(planId) + '&replace=' + encodeURIComponent(dishId)
      wx.navigateTo({
        url,
        events: { mealDishChanged: () => this.updateMeals({ swapPlanId: '' }) },
        fail: () => wx.showToast({ title: '暂时无法打开换菜页', icon: 'none' })
      })
    },

    openMealMenu(event) {
      const tap = event.currentTarget
      if (this.data.goal !== 'custom') return
      wx.showActionSheet({
        itemList: ['编辑搭配', '移除搭配'],
        success: ({ tapIndex }) => {
          if (this.data.goal !== 'custom') return
          if (tapIndex === 0) this.openMealComposer(tap)
          if (tapIndex === 1) this.removeCustomMeal(tap)
        }
      })
    },

    openMealComposer(event) {
      const id = event && event.currentTarget.dataset.id
      const url = '/pages/compose-meal/index' + (id ? '?id=' + encodeURIComponent(id) : '')
      wx.navigateTo({
        url,
        events: { mealSaved: () => this.updateMeals({ goal: 'custom', showAllPlans: false }) },
        fail: () => wx.showToast({ title: '暂时无法打开自己搭配', icon: 'none' })
      })
    },

    removeCustomMeal(event) {
      const { id } = event.currentTarget.dataset
      if (this.data.goal !== 'custom' || !this.data.plans.some(plan => plan.id === id)) return
      wx.showModal({
        title: '移除这套搭配？',
        content: '日历里已安排的餐会保留。',
        confirmText: '移除',
        success: ({ confirm }) => {
          if (!confirm) return
          try {
            archiveCustomMeal(id)
            this.updateMeals({})
          } catch {
            wx.showToast({ title: '搭配未移除，请重试', icon: 'none' })
          }
        }
      })
    },

    openMealShopping(event) {
      const plan = this.data.plans.find(item => item.id === event.currentTarget.dataset.id)
      if (!this.data.inventoryReady || !plan || !plan.missingCount) return

      try {
        const recipeIds = plan.dishes.map(dish => dish.id)
        const { items, sourceKeys } = getMealShoppingPreview(recipeIds)
        if (!items.length) {
          wx.showToast({ title: '暂无需要新增的食材', icon: 'none' })
          return
        }
        const listHeight = items.length * 72
        this.setData({ purchasePicker: { title: plan.title, recipeIds, items, sourceKeys, listHeight } })
      } catch {
        wx.showToast({ title: '暂时无法读取缺料', icon: 'none' })
      }
    },

    closeMealShopping() {
      this.setData({ purchasePicker: null })
    },

    confirmMealShopping() {
      const picker = this.data.purchasePicker
      if (!picker) return
      try {
        const saved = saveMealShopping(picker.recipeIds, picker.sourceKeys)
        this.closeMealShopping()
        wx.showToast({ title: saved ? '已加入采购清单' : '暂无需要新增的食材', icon: saved ? 'success' : 'none' })
      } catch {
        wx.showToast({ title: '保存失败，请重试', icon: 'none' })
      }
    }
  }
})
