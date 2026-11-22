const { applyTheme } = require('../../theme')
const { getMealPlans, getArchivedMealPlan } = require('../../meal-plans')
const { parseDate, mealSlots, readCalendar, saveCalendarMeal, sameCalendarMeal, getCalendarDishes } = require('../../meal-calendar')

Page({
  data: {
    dateLabel: '', label: '', currentTitle: '', replacing: false, errorMessage: '',
    selected: [], saving: false
  },

  onLoad({ date, slot } = {}) {
    const day = parseDate(date)
    const meal = mealSlots.find(item => item.id === slot)
    if (!day || !meal) {
      this.setData({ errorMessage: '请从做饭日历选择日期和餐次' })
      return
    }

    this.date = date
    this.slot = slot
    try {
      const current = this.readCurrentMeal()
      const dateLabel = day.getFullYear() + '年' + (day.getMonth() + 1) + '月' + day.getDate() + '日'
      this.setData({ ...current, dateLabel, label: meal.label, selected: this.savedSelection() })
      if (current.replacing) wx.setNavigationBarTitle({ title: '更换菜谱' })
    } catch {
      this.setData({ errorMessage: '暂时无法读取用餐安排，请返回重试' })
    }
  },

  onShow() {
    applyTheme(this)
    if (!this.refreshOnReturn) return
    this.refreshOnReturn = false
    try {
      const previous = this.expectedEntry
      const current = this.readCurrentMeal()
      this.setData(current)
      if (!sameCalendarMeal(previous, this.expectedEntry)) this.setData({ selected: this.savedSelection() })
      wx.setNavigationBarTitle({ title: current.replacing ? '更换菜谱' : '添加菜谱' })
    } catch {
      wx.showToast({ title: '暂时无法刷新用餐安排', icon: 'none' })
    }
  },

  refreshCatalogData() {
    const picker = this.selectComponent('#recipe-picker')
    if (picker) picker.refreshCatalogData()
  },

  openMealPairings() {
    wx.navigateTo({
      url: '/pages/home/index?view=meals&date=' + this.date + '&slot=' + this.slot,
      success: () => { this.refreshOnReturn = true },
      fail: () => wx.showToast({ title: '暂时无法打开搭配页', icon: 'none' })
    })
  },

  readCurrentMeal() {
    const day = readCalendar()[this.date] || {}
    const entry = day[this.slot] || null
    this.expectedEntry = entry
    if (!entry) return { replacing: false, currentTitle: '' }

    if (entry.type === 'plan') {
      if (entry.title) return { replacing: true, currentTitle: entry.title }
      const plan = getMealPlans([], { goal: 'all' }).find(item => item.id === entry.id) || getArchivedMealPlan(entry.id)
      return { replacing: true, currentTitle: plan ? plan.title : '搭配暂不可用' }
    }
    const dishes = getCalendarDishes(entry)
    return { replacing: true, currentTitle: dishes.length ? dishes.map(dish => dish.name).join('、') : '菜谱暂不可用' }
  },

  savedSelection() {
    if (this.expectedEntry && this.expectedEntry.type === 'plan') return []
    return getCalendarDishes(this.expectedEntry).map(dish => ({ id: dish.id, title: dish.name }))
  },

  onPickerConfirm(event) {
    const { ids } = event.detail
    if (!ids.length || this.data.saving) return
    this.setData({ saving: true })
    try {
      const entry = ids.length === 1 ? { type: 'recipe', id: ids[0] } : { type: 'recipes', ids }
      if (!saveCalendarMeal(this.date, this.slot, entry, this.expectedEntry)) {
        const current = this.readCurrentMeal()
        this.setData({ ...current, saving: false, selected: this.savedSelection() })
        wx.setNavigationBarTitle({ title: current.replacing ? '更换菜谱' : '添加菜谱' })
        wx.showToast({ title: '安排已变动，请重新选择', icon: 'none' })
        return
      }
      wx.showToast({ title: '已安排' + this.data.label, icon: 'success' })
      wx.navigateBack({
        fail: () => wx.redirectTo({ url: '/pages/meal-calendar/index' })
      })
    } catch {
      this.setData({ saving: false })
      wx.showToast({ title: '保存失败，请重试', icon: 'none' })
    }
  }
})
