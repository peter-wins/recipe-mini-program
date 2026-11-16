const { applyTheme } = require('../../theme')
const { getRecipe, availableIngredients } = require('../../catalog')
const { readFavorites, toggleFavorite } = require('../../favorites')
const { readKitchen } = require('../../inventory')
const { getPurchaseItems, hasRecipeShopping, saveRecipeShopping } = require('../../shopping')
const { recordRecipe } = require('../../activity')

Page({
  data: {
    recipe: null,
    saved: false,
    cookingIndex: -1,
    showStepText: false,
    inventoryReady: false,
    purchaseItems: [],
    purchaseNeeded: {},
    hasSavedPurchase: false,
    savingPurchase: false
  },

  onLoad(options) {
    const recipe = getRecipe(options.id)
    this.selection = null
    this.purchaseOverrides = {}
    this.setData({
      recipe,
      cookingIndex: -1,
      showStepText: false,
      inventoryReady: false,
      purchaseItems: [],
      purchaseNeeded: {},
      hasSavedPurchase: false
    })
    if (!recipe) return

    try {
      recordRecipe('history', recipe.id)
    } catch {
      wx.showToast({ title: '未能记录浏览历史', icon: 'none' })
    }
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
    this.refreshKitchenData()
    this.refreshRecipeRecords()
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
    const recipe = getRecipe(this.data.recipe.id, this.selection)
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
  },

  copyMissing() {
    const recipe = this.data.recipe
    if (!recipe || !this.data.purchaseItems.length) return

    const items = this.data.purchaseItems.map(item => `${item.name} ${item.quantity}`)
    wx.setClipboardData({
      data: [`${recipe.name}（${recipe.servings} 人份）缺料清单`, ...items].join('\n'),
      fail: () => wx.showToast({ title: '复制失败，请重试', icon: 'none' })
    })
  }
})
