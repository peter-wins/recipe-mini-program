const { applyTheme } = require('../../theme')
const { getRecipe } = require('../../catalog')
const { getMealPlans, getAdjustedMealPlan } = require('../../meal-plans')
const { getMealShoppingPreview, saveMealShopping } = require('../../shopping')
const { dateKey, parseDate, changeMonth, calendarMonth, mealSlots, readCalendar, saveCalendarMeal,
  sameCalendarMeal, snapshotMealPlan, appendCalendarRecipe, resolveCalendarMeal } = require('../../meal-calendar')

Page({
  data: {
    selectedDate: '', viewDate: '', today: '', monthLabel: '', dayLabel: '', visibleDays: [], meals: [],
    weekdays: ['一', '二', '三', '四', '五', '六', '日'],
    intent: null, purchasePreview: null
  },

  onLoad({ planId, recipeId = '', date, slot } = {}) {
    this.planId = planId
    this.requestedSlot = slot
    try {
      this.recipeId = decodeURIComponent(recipeId)
    } catch {
      this.recipeId = ''
    }
    this.setData({ selectedDate: parseDate(date) ? date : dateKey(new Date()) })
  },

  onShow() {
    applyTheme(this)
    this.refreshPlanningData()
  },

  refreshCatalogData() {
    this.refreshPlanningData()
  },

  refreshPlanningData() {
    try {
      this.plans = getMealPlans([], { goal: 'all' })
      this.plansById = new Map(this.plans.map(plan => [plan.id, plan]))
      const plan = this.planId && (getAdjustedMealPlan(this.planId) || this.plansById.get(this.planId))
      if (this.planId && !plan) wx.showToast({ title: '这套搭配暂时不可用', icon: 'none' })
      const recipe = this.recipeId && getRecipe(this.recipeId)
      if (recipe) {
        this.recipeId = ''
        this.setData({ intent: {
          entry: { type: 'recipe', id: recipe.id },
          title: recipe.name,
          hint: '选日期和餐次，已有菜谱可追加或替换'
        } })
      } else if (plan) {
        const meal = mealSlots.find(item => item.id === this.requestedSlot)
        const hint = meal ? '点「' + meal.label + '」安排，也可以另选餐次' : '选择日期和餐次'
        this.setData({ intent: { entry: snapshotMealPlan(plan), title: plan.title, hint } })
      }
    } catch {
      wx.showToast({ title: '暂时无法读取搭配', icon: 'none' })
    } finally {
      this.planId = ''
    }
    this.refreshCalendar()
  },

  refreshCalendar(selectedDate = this.data.selectedDate, update = {}) {
    try {
      const schedule = readCalendar()
      const today = dateKey(new Date())
      const day = schedule[selectedDate] || {}
      const meals = mealSlots.map(slot => {
        const entry = day[slot.id] || null
        const meal = resolveCalendarMeal(entry, this.plansById)
        const dishes = meal ? meal.dishes : []
        return { ...slot, entry, title: meal ? meal.title : '菜谱暂不可用', dishes }
      })
      const {
        viewDate = selectedDate === this.data.selectedDate ? this.data.viewDate || selectedDate : selectedDate,
        ...patch
      } = update
      const { cells, monthLabel, dayLabel } = calendarMonth(viewDate, schedule, today, selectedDate)
      this.setData({
        ...patch,
        selectedDate, viewDate, today, meals, monthLabel, dayLabel, visibleDays: cells
      })
    } catch {
      wx.showToast({ title: '暂时无法读取日历', icon: 'none' })
    }
  },

  selectDay(event) {
    const date = event.currentTarget.dataset.date
    if (this.data.visibleDays.some(day => day.day && day.key === date)) {
      this.refreshCalendar(date, { viewDate: date })
    }
  },

  stepCalendar(event) {
    const step = Number(event.currentTarget.dataset.step)
    const { selectedDate, viewDate } = this.data
    if (!viewDate || (step !== -1 && step !== 1)) return
    this.refreshCalendar(selectedDate, { viewDate: changeMonth(viewDate, step) })
  },

  tapMeal(event) {
    const slot = event.currentTarget.dataset.slot
    const meal = this.data.meals.find(item => item.id === slot)
    if (!meal) return
    const { intent } = this.data
    if (intent && intent.entry.type === 'recipe') this.appendRecipe(meal, intent)
    else if (intent) this.arrangeMeal(slot, intent.entry)
    else if (!meal.entry) this.openChooser(event)
  },

  appendRecipe(meal, intent) {
    const legacyPlan = meal.entry && meal.entry.type === 'plan' && !meal.entry.dishes
      ? resolveCalendarMeal(meal.entry, this.plansById) : null
    const entry = appendCalendarRecipe(meal.entry, { id: intent.entry.id, name: intent.title }, legacyPlan)
    if (!entry) {
      wx.showToast({ title: '原安排暂不可读取，可选择替换', icon: 'none' })
      return
    }
    if (entry === meal.entry) {
      wx.showToast({ title: '这餐已经有这道菜', icon: 'none' })
      return
    }
    this.commitMeal(this.data.selectedDate, meal.id, entry, meal.entry)
  },

  replaceWithRecipe(event) {
    const { intent } = this.data
    if (intent && intent.entry.type === 'recipe') this.arrangeMeal(event.currentTarget.dataset.slot, intent.entry)
  },

  openMealMenu(event) {
    const { selectedDate } = this.data
    const { slot } = event.currentTarget.dataset
    if (!this.data.meals.some(meal => meal.id === slot && meal.entry)) return
    wx.showActionSheet({
      itemList: ['更换菜谱', '移除安排'],
      success: ({ tapIndex }) => {
        if (selectedDate !== this.data.selectedDate) return
        if (tapIndex === 0) this.openChooser(event)
        if (tapIndex === 1) this.removeMeal(event)
      }
    })
  },

  openChooser(event) {
    const { slot } = event.currentTarget.dataset
    if (!this.data.meals.some(meal => meal.id === slot)) return
    wx.navigateTo({
      url: '/pages/calendar-picker/index?date=' + this.data.selectedDate + '&slot=' + slot,
      fail: () => wx.showToast({ title: '暂时无法打开选菜页', icon: 'none' })
    })
  },

  cancelIntent() {
    this.recipeId = ''
    this.setData({ intent: null })
  },

  openPurchasePreview() {
    try {
      const schedule = readCalendar()
      const today = new Date()
      const recipeIds = [0, 1, 2].flatMap(offset => {
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset)
        const day = schedule[dateKey(date)] || {}
        return mealSlots.flatMap(slot => {
          const meal = resolveCalendarMeal(day[slot.id], this.plansById)
          return meal ? meal.dishes.map(dish => dish.id) : []
        })
      })
      const preview = getMealShoppingPreview(recipeIds, { countRepeated: true })
      this.setData({ purchasePreview: { ...preview, recipeIds } })
    } catch {
      wx.showToast({ title: '暂时无法读取待采购食材', icon: 'none' })
    }
  },

  closePurchasePreview() {
    this.setData({ purchasePreview: null })
  },

  confirmPurchasePreview() {
    const preview = this.data.purchasePreview
    if (!preview || !preview.items.length) return
    try {
      const saved = saveMealShopping(preview.recipeIds, preview.sourceKeys, { countRepeated: true })
      this.closePurchasePreview()
      wx.showToast({ title: saved ? '已加入采购清单' : '暂无需要新增的食材', icon: saved ? 'success' : 'none' })
    } catch {
      wx.showToast({ title: '保存失败，请重试', icon: 'none' })
    }
  },

  arrangeMeal(slot, entry) {
    const { selectedDate } = this.data
    const current = this.data.meals.find(meal => meal.id === slot)
    if (!current) return
    const save = () => this.commitMeal(selectedDate, slot, entry, current.entry)
    if (current.entry && !sameCalendarMeal(current.entry, entry)) {
      wx.showModal({
        title: '替换' + current.label + '？',
        content: '当前安排为「' + current.title + '」。',
        confirmText: '替换',
        success: ({ confirm }) => { if (confirm) save() }
      })
    } else {
      save()
    }
  },

  removeMeal(event) {
    const { selectedDate } = this.data
    const meal = this.data.meals.find(item => item.id === event.currentTarget.dataset.slot)
    if (!meal || !meal.entry) return
    wx.showModal({
      title: '移除' + meal.label + '计划？',
      content: meal.title,
      confirmText: '移除',
      success: ({ confirm }) => { if (confirm) this.commitMeal(selectedDate, meal.id, null, meal.entry) }
    })
  },

  commitMeal(date, slot, entry, expected) {
    try {
      if (!saveCalendarMeal(date, slot, entry, expected)) {
        this.refreshCalendar()
        wx.showToast({ title: '计划已变动，请重试', icon: 'none' })
        return
      }
      this.refreshCalendar(date, { intent: null })
      wx.showToast({ title: entry ? ('已安排' + mealSlots.find(meal => meal.id === slot).label) : '已移除', icon: 'success' })
    } catch {
      wx.showToast({ title: '计划未保存，请重试', icon: 'none' })
    }
  }
})
