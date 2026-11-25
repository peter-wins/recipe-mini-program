const { applyTheme } = require('../../theme')
const { getRecipe, availableIngredients } = require('../../catalog')
const { readFavorites, toggleFavorite } = require('../../favorites')
const { readKitchen } = require('../../inventory')
const { getPurchaseItems, hasRecipeShopping, saveRecipeShopping } = require('../../shopping')
const { recordRecipe } = require('../../activity')
const { formatClock } = require('../../step-timer')
const { syncCatalog } = require('../../cloud-catalog')

Page({
  data: {
    recipe: null,
    recipeStatus: '',
    saved: false,
    cookingIndex: -1,
    showStepText: false,
    inventoryReady: false,
    purchaseItems: [],
    purchaseNeeded: {},
    hasSavedPurchase: false,
    savingPurchase: false,
    timerStep: 0,
    timerLabel: '',
    remainingText: '',
    timerRunning: false,
    timerDone: false
  },

  onLoad({ id } = {}) {
    this.clearTimer()
    this.unloaded = false
    try {
      this.recipeId = typeof id === 'string' ? decodeURIComponent(id) : ''
    } catch {
      this.recipeId = ''
    }
    const recipe = getRecipe(this.recipeId)
    const canFetch = !recipe && /^[A-Za-z0-9_（）-]{1,200}$/.test(this.recipeId)
    this.selection = null
    this.purchaseOverrides = {}
    this.setData({
      recipe,
      recipeStatus: recipe ? '' : (canFetch ? 'loading' : 'notFound'),
      cookingIndex: -1,
      showStepText: false,
      inventoryReady: false,
      purchaseItems: [],
      purchaseNeeded: {},
      hasSavedPurchase: false,
      timerStep: 0,
      timerLabel: '',
      remainingText: '',
      timerRunning: false,
      timerDone: false
    })
    if (recipe) {
      this.applyRecipeTitle(recipe)
      this.recordHistory(recipe.id)
    } else if (canFetch) return this.loadMissingRecipe()
  },

  // 每道菜的标题单独成句，供搜一搜按菜名收录。
  applyRecipeTitle(recipe) {
    if (!recipe || !recipe.name || typeof wx.setNavigationBarTitle !== 'function') return
    const title = recipe.minutes ? `${recipe.name}做法 · ${recipe.minutes}分钟` : `${recipe.name}做法`
    wx.setNavigationBarTitle({ title })
  },

  async loadMissingRecipe() {
    if (this.loadingRecipe || this.data.recipe) return
    this.loadingRecipe = true
    this.setData({ recipeStatus: 'loading' })
    const checked = await syncCatalog({ force: true })
    this.loadingRecipe = false
    if (this.unloaded || this.data.recipe) return
    this.refreshCatalogData()
    if (!this.data.recipe) this.setData({ recipeStatus: checked ? 'notFound' : 'error' })
  },

  recordHistory(id) {
    try {
      recordRecipe('history', id)
    } catch {
      wx.showToast({ title: '未能记录浏览历史', icon: 'none' })
    }
  },

  onShareAppMessage() {
    const recipe = this.data.recipe
    const share = {
      title: recipe ? this.buildShareTitle(recipe) : '今晚吃什么？打开冰箱看看，吃什么就有了谱',
      path: recipe ? '/pages/recipe/index?id=' + encodeURIComponent(recipe.id) : '/pages/home/index'
    }
    const image = recipe && recipe.image
    if (image && /^https?:\/\//.test(image)) share.imageUrl = image
    return share
  },

  // 朋友圈分享（需在后台开启「分享到朋友圈」），标题带菜名便于站外搜索。
  onShareTimeline() {
    const recipe = this.data.recipe
    if (!recipe) return { title: '今晚吃什么？打开冰箱看看，吃什么就有了谱' }
    return {
      title: this.buildShareTitle(recipe),
      query: 'id=' + encodeURIComponent(recipe.id)
    }
  },

  // 分享卡片标题放钩子：菜名 + 耗时 + 用料，比「分享给你」更容易被点开。
  buildShareTitle(recipe) {
    const parts = [`${recipe.name}，${recipe.minutes ? recipe.minutes + '分钟搞定' : '在家就能做'}`]
    const count = (recipe.required || []).length
    if (count) parts.push(`用料${count}样`)
    return parts.join('，')
  },

  refreshRecipeRecords() {
    const { recipe } = this.data
    if (!recipe) return
    try {
      this.setData({ saved: readFavorites().includes(recipe.id) })
    } catch {
      wx.showToast({ title: '暂时无法读取收藏', icon: 'none' })
    }
  },

  onShow() {
    applyTheme(this)
    if (this.data.recipe) {
      this.refreshKitchenData()
      this.refreshRecipeRecords()
    } else this.refreshCatalogData()
  },

  refreshCatalogData() {
    if (this.data.cookingIndex >= 0 && this.data.recipe) return
    if (!this.data.recipe) {
      const recipe = getRecipe(this.recipeId)
      if (!recipe) return
      this.setData({ recipe, recipeStatus: '' })
      this.applyRecipeTitle(recipe)
      this.recordHistory(recipe.id)
    }
    this.refreshKitchenData()
    this.refreshRecipeRecords()
  },

  onUnload() {
    this.unloaded = true
    this.clearTimer()
  },

  clearTimer() {
    if (this.timerTick) clearInterval(this.timerTick)
    this.timerTick = null
    this.timerEndAt = null
    this.pausedRemaining = null
  },

  startStepTimer(event) {
    const { step, seconds, label } = event.currentTarget.dataset
    const total = Number(seconds)
    if (!Number.isFinite(total) || total < 1) return
    this.clearTimer()
    this.timerEndAt = Date.now() + total * 1000
    this.setData({
      timerStep: Number(step),
      timerLabel: label || '',
      remainingText: formatClock(total),
      timerRunning: true,
      timerDone: false
    })
    this.timerTick = setInterval(() => this.refreshTimer(), 1000)
  },

  refreshTimer() {
    if (!this.timerEndAt) return
    const remaining = Math.max(0, Math.ceil((this.timerEndAt - Date.now()) / 1000))
    if (!remaining) {
      this.clearTimer()
      this.setData({ timerRunning: false, timerDone: true, remainingText: '00:00' })
      wx.showToast({ title: `第 ${this.data.timerStep} 步时间到`, icon: 'none', duration: 3000 })
      if (typeof wx.vibrateShort === 'function') wx.vibrateShort({ type: 'heavy', fail: () => {} })
      return
    }
    const text = formatClock(remaining)
    if (text !== this.data.remainingText) this.setData({ remainingText: text })
  },

  toggleTimer() {
    if (this.data.timerDone) return
    if (this.data.timerRunning ? !this.timerEndAt : !this.pausedRemaining) return
    if (this.data.timerRunning) {
      const remaining = Math.max(0, Math.ceil((this.timerEndAt - Date.now()) / 1000))
      this.clearTimer()
      this.pausedRemaining = remaining
      this.setData({ timerRunning: false, remainingText: formatClock(remaining) })
      return
    }
    const remaining = this.pausedRemaining || 0
    if (!remaining) return
    this.timerEndAt = Date.now() + remaining * 1000
    this.setData({ timerRunning: true })
    this.timerTick = setInterval(() => this.refreshTimer(), 1000)
  },

  stopTimer() {
    this.clearTimer()
    this.setData({ timerStep: 0, timerLabel: '', remainingText: '', timerRunning: false, timerDone: false })
  },

  refreshKitchenData() {
    if (!this.data.recipe) return
    try {
      const { inventory: selection, shopping } = readKitchen()
      if (this.selection) {
        const previous = availableIngredients(this.selection)
        const current = availableIngredients(selection)
        for (const id of Object.keys(this.purchaseOverrides)) {
          if (previous.has(id) !== current.has(id)) delete this.purchaseOverrides[id]
        }
      }
      this.selection = selection
      this.refreshPurchaseItems({ hasSavedPurchase: hasRecipeShopping(this.data.recipe.id, shopping) })
    } catch {
      wx.showToast({ title: '暂时无法读取冰箱', icon: 'none' })
    }
  },

  refreshPurchaseItems(update = {}) {
    const updatedRecipe = getRecipe(this.data.recipe.id, this.selection)
    const recipe = this.data.cookingIndex >= 0
      ? { ...updatedRecipe, steps: this.data.recipe.steps }
      : updatedRecipe
    const purchaseItems = this.selection ? getPurchaseItems(recipe, this.selection, this.purchaseOverrides) : []
    this.setData({
      recipe,
      inventoryReady: Boolean(this.selection),
      purchaseItems,
      purchaseNeeded: Object.fromEntries(purchaseItems.map(item => [item.id, true])),
      ...update
    })
  },

  togglePurchaseItem(event) {
    if (!this.selection || !this.data.recipe) return
    const { id } = event.currentTarget.dataset
    const required = this.data.recipe.groups.find(group => group.key === 'required')
    if (!required.items.some(item => item.id === id)) return

    const needed = !this.data.purchaseNeeded[id]
    if (needed === !availableIngredients(this.selection).has(id)) delete this.purchaseOverrides[id]
    else this.purchaseOverrides[id] = needed
    this.refreshPurchaseItems()
  },

  toggleSaved() {
    if (!this.data.recipe) return
    try {
      this.setData({ saved: toggleFavorite(this.data.recipe.id) })
    } catch {
      wx.showToast({ title: '收藏操作失败，请重试', icon: 'none' })
    }
  },

  scheduleRecipe() {
    const { recipe } = this.data
    if (!recipe) return
    wx.navigateTo({
      url: '/pages/meal-calendar/index?recipeId=' + encodeURIComponent(recipe.id),
      fail: () => wx.showToast({ title: '暂时无法打开日历，请重试', icon: 'none' })
    })
  },

  startCooking() {
    this.showCookingStep(this.data.cookingIndex < 0 ? 0 : this.data.cookingIndex)
  },

  toggleStepText() {
    this.setData({ showStepText: !this.data.showStepText })
  },

  previousStep() {
    this.showCookingStep(this.data.cookingIndex - 1)
  },

  nextStep() {
    const { recipe, cookingIndex } = this.data
    if (!recipe || cookingIndex < 0) return
    if (cookingIndex === recipe.steps.length - 1) {
      try {
        recordRecipe('cooked', recipe.id)
      } catch {
        wx.showToast({ title: '未能记录这次烹饪', icon: 'none' })
      }
      this.endCooking()
      return
    }
    this.showCookingStep(cookingIndex + 1)
  },

  endCooking() {
    this.setData({ cookingIndex: -1 }, () => wx.pageScrollTo({ selector: '#method', duration: 200 }))
  },

  showCookingStep(index) {
    if (!this.data.recipe || index < 0 || index >= this.data.recipe.steps.length) return
    this.setData({ cookingIndex: index }, () => wx.pageScrollTo({ selector: '#method', duration: 200 }))
  },

  savePurchaseItems() {
    const { recipe, inventoryReady, purchaseItems, hasSavedPurchase } = this.data
    if (this.data.savingPurchase || !recipe || !inventoryReady || (!purchaseItems.length && !hasSavedPurchase)) return

    this.setData({ savingPurchase: true })
    try {
      const saved = saveRecipeShopping(recipe, this.purchaseOverrides)
      this.refreshKitchenData()
      wx.showToast({
        title: saved ? (hasSavedPurchase ? '已更新采购清单' : '已加入采购清单') : '这次无需补货',
        icon: saved ? 'success' : 'none'
      })
    } catch {
      wx.showToast({ title: '保存失败，请重试', icon: 'none' })
    } finally {
      this.setData({ savingPurchase: false })
    }
  }
})
