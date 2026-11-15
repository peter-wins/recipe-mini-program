const { themes, saveTheme, applyTheme } = require('../../theme')
const { getRecipeCategories, getRecipe, matchRecipes, groupFridgeMatches } = require('../../catalog')
const { readFavorites } = require('../../favorites')
const { readInventory, summarizeInventory } = require('../../inventory')
const { readActivity } = require('../../activity')
const { localRecipeDay, dailyRecipe, previewRecipes, festivalRecipe } = require('../../daily-recipe')
const { festivalOf } = require('../../festival')
const { greetingInfo } = require('../../home-greeting')
const { rotateLightInspiration } = require('../../meal-plans')

const primaryCategories = ['荤菜', '素菜', '主食', '汤', '水产', '早餐']
const recipeCategories = getRecipeCategories()
const categories = [
  '全部分类',
  ...primaryCategories.filter(name => recipeCategories.includes(name)),
  ...recipeCategories.filter(name => !primaryCategories.includes(name))
]
const initialRecipes = matchRecipes([])
const libraryPageSize = 24
const homeMatchLimit = 2
const quickRecipe = getRecipe('tomato-eggs')
const lightRotationKey = 'recipe-light-inspiration-v1'
const mealCategories = new Set(['素菜', '荤菜', '水产', '汤', '主食'])
const quickDishIds = new Set(initialRecipes.filter(recipe =>
  recipe.required.length && recipe.minutes <= 20 && mealCategories.has(recipe.category)
).map(recipe => recipe.id))
const viewTitles = {
  match: '美味厨房', library: '菜谱库',
  meals: '轻食', profile: '我的'
}

Page({
  data: {
    view: 'match',
    themeOptions: themes,
    selected: [],
    greeting: greetingInfo(new Date(), 0),
    inventoryReady: false,
    fridgeSummary: summarizeInventory([]),
    librarySearch: '',
    librarySearchFocused: false,
    results: initialRecipes,
    libraryCards: initialRecipes.slice(0, libraryPageSize),
    quickRecipe,
    lightInspiration: null,
    suggestedRecipes: [],
    featured: null,
    homeMatches: [],
    categories,
    categoryIndex: 0,
    favorites: [],
    history: [],
    cooked: []
  },

  onShow() {
    applyTheme(this)
    try {
      const selected = readInventory()
      this.setData({ inventoryReady: true, greeting: greetingInfo(new Date(), selected.length) })
      if (selected.join(',') !== this.data.selected.join(',') || this.recipeDay !== localRecipeDay()) {
        this.updateSelection(selected)
      }
    } catch {
      this.setData({ inventoryReady: false })
      wx.showToast({ title: '暂时无法读取冰箱', icon: 'none' })
    }
    try {
      this.setData({ favorites: readFavorites().map(id => getRecipe(id)).filter(Boolean) })
    } catch {
      wx.showToast({ title: '暂时无法读取收藏', icon: 'none' })
    }
    try {
      const { history, cooked } = readActivity()
      this.setData({
        history: history.map(id => getRecipe(id)).filter(Boolean),
        cooked: cooked.map(id => getRecipe(id)).filter(Boolean)
      })
    } catch {
      wx.showToast({ title: '暂时无法读取使用记录', icon: 'none' })
    }
    this.refreshHomeSuggestions()
    if (this.data.view === 'match') this.refreshLightInspiration()
  },

  refreshLightInspiration() {
    if (this.lightRotation === undefined) {
      try {
        this.lightRotation = wx.getStorageSync(lightRotationKey) || null
      } catch {
        this.lightRotation = null
      }
    }

    const previous = this.lightRotation
    const { recipe, rotation } = rotateLightInspiration(this.data.selected, previous)
    this.lightRotation = rotation
    const current = this.data.lightInspiration
    if ((recipe && recipe.id) !== (current && current.id)) this.setData({ lightInspiration: recipe })
    if (rotation === previous) return
    try {
      wx.setStorageSync(lightRotationKey, rotation)
    } catch {
      // This session can still rotate using its in-memory state.
    }
  },

  refreshHomeSuggestions() {
    const { featured, homeMatches, favorites, cooked } = this.data
    const shown = new Set([(featured || quickRecipe).id, ...homeMatches.map(recipe => recipe.id)])
    const preferred = new Set([...favorites, ...cooked].map(recipe => recipe.category))
    const candidates = this.inventoryMatches || initialRecipes
    const suggestedRecipes = candidates.filter(recipe => quickDishIds.has(recipe.id) && !shown.has(recipe.id)).sort((left, right) =>
      Number(preferred.has(right.category)) - Number(preferred.has(left.category))
    ).slice(0, 2)
    this.setData({ suggestedRecipes })
  },

  changeTheme(event) {
    const { id } = event.currentTarget.dataset
    if (id === this.data.themeId) return
    try {
      const theme = saveTheme(id)
      if (theme) applyTheme(this, theme)
    } catch {
      wx.showToast({ title: '主题未保存，请重试', icon: 'none' })
    }
  },

  openProfileThemes() {
    wx.pageScrollTo({ selector: '#profile-themes', duration: 240 })
  },

  switchView(event) {
    this.showView(event.currentTarget.dataset.view)
  },

  showView(view, update = {}) {
    if (!viewTitles[view] || (view === this.data.view && !Object.keys(update).length)) return
    if (view === 'match' && this.recipeDay !== localRecipeDay()) this.updateSelection(this.data.selected)
    this.updateResults({ view, librarySearchFocused: false, ...update }, () => {
      if (view === 'match') this.refreshLightInspiration()
      wx.setNavigationBarTitle({ title: viewTitles[view] })
      wx.pageScrollTo({ scrollTop: 0, duration: 0 })
    })
  },

  openFridgeMatches() {
    if (!this.data.selected.length) {
      this.openFridge()
      return
    }
    wx.navigateTo({
      url: '/pages/fridge-matches/index',
      fail: () => wx.showToast({ title: '暂时无法打开，请重试', icon: 'none' })
    })
  },

  openFridge() {
    wx.navigateTo({
      url: '/pages/fridge/index',
      fail: () => wx.showToast({ title: '暂时无法打开冰箱，请重试', icon: 'none' })
    })
  },

  openRecommendations() {
    wx.navigateTo({
      url: '/pages/recommend/index',
      fail: () => wx.showToast({ title: '暂时无法打开推荐页，请重试', icon: 'none' })
    })
  },

  showShortcutUnavailable() {
    wx.showToast({ title: '功能在开发中', icon: 'none' })
  },

  openRecipeSearch() {
    this.showView('library', { categoryIndex: 0, librarySearch: '', librarySearchFocused: true })
  },

  openAllRecipes() {
    this.showView('library', { categoryIndex: 0, librarySearch: '' })
  },

  blurLibrarySearch() {
    this.setData({ librarySearchFocused: false })
  },

  searchLibrary(event) {
    this.updateResults({ librarySearch: event.detail.value })
  },

  clearLibrarySearch() {
    this.updateResults({ librarySearch: '' })
  },

  changeCategory(event) {
    this.updateResults({ categoryIndex: Number(event.detail.value) })
  },

  loadMoreRecipes() {
    const { results, libraryCards } = this.data
    this.setData({ libraryCards: results.slice(0, libraryCards.length + libraryPageSize) })
  },

  updateSelection(selected) {
    const day = localRecipeDay()
    this.inventoryMatches = selected.length ? matchRecipes(selected) : null
    const { ready, almost } = groupFridgeMatches(this.inventoryMatches || [])
    const festival = festivalOf()
    const festivalPick = festival && festivalRecipe(festival, ready, almost, matchRecipes([]))
    const featured = festivalPick || dailyRecipe(ready, almost, day)
    const hero = featured || quickRecipe
    const readyPreview = previewRecipes(ready, homeMatchLimit, hero, true)
    const homeMatches = readyPreview.concat(previewRecipes(almost, homeMatchLimit - readyPreview.length, hero, false))
    const visibleLibraryCards = Math.max(libraryPageSize, this.data.libraryCards.length)
    this.recipeDay = day
    this.updateResults({
      selected,
      featured,
      homeMatches,
      fridgeSummary: summarizeInventory(selected)
    }, () => this.refreshHomeSuggestions(), visibleLibraryCards)
  },

  updateResults(update, afterUpdate, limit = libraryPageSize) {
    const { view, selected, categoryIndex, librarySearch } = { ...this.data, ...update }
    const inLibrary = view === 'library'
    const results = matchRecipes(selected, {
      category: inLibrary && categoryIndex ? categories[categoryIndex] : null,
      search: inLibrary ? librarySearch : '',
      rankByStock: !inLibrary
    })
    this.setData({
      ...update,
      results,
      libraryCards: inLibrary ? results.slice(0, limit) : []
    }, afterUpdate)
  }
})
