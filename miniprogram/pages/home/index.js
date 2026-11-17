const { themes, saveTheme, applyTheme } = require('../../theme')
const { getRecipeCategories, getRecipeTags, fatLossTag, getRecipe, matchRecipes, groupFridgeMatches } = require('../../catalog')
const { readFavorites } = require('../../favorites')
const { readInventory, summarizeInventory } = require('../../inventory')
const { readActivity } = require('../../activity')
const { localRecipeDay, dailyRecipe, previewRecipes, festivalRecipe } = require('../../daily-recipe')
const { festivalOf } = require('../../festival')
const { greetingInfo } = require('../../home-greeting')
const { rotateLightInspiration } = require('../../meal-plans')
const { parseDate, mealSlots } = require('../../meal-calendar')

const primaryCategories = ['荤菜', '素菜', '海鲜', '蛋类', '主食', '汤羹', '甜品', '饮品', '酱料']
const recipeCategories = getRecipeCategories()
const categories = [
  '全部分类',
  ...primaryCategories.filter(name => recipeCategories.includes(name)),
  ...recipeCategories.filter(name => !primaryCategories.includes(name))
]
const sceneTags = ['全部', '减脂', '早餐', '快手', '半成品']
const methodTags = ['烹饪方式', '空气炸锅', '微波炉', '电饭煲', '烤箱']
const initialRecipes = matchRecipes([])
const libraryPageSize = 24
const defaultLibraryFilters = { librarySearch: '', librarySearchFocused: false, categoryIndex: 0, tagIndex: 0, methodIndex: 0 }
const homeMatchLimit = 2
const defaultRecipe = getRecipe('tomato-eggs')
const lightRotationKey = 'recipe-light-inspiration-v1'
const mealCategories = new Set(['素菜', '荤菜', '水产', '汤', '主食'])
const quickDishIds = new Set(initialRecipes.filter(recipe =>
  recipe.required.length && recipe.minutes <= 20 && mealCategories.has(recipe.category)
).map(recipe => recipe.id))
const quickMealRecipes = initialRecipes.filter(recipe =>
  quickDishIds.has(recipe.id) || (recipe.category === '早餐' && recipe.minutes <= 20)
)
const viewTitles = {
  match: '吃饭搭子', library: '菜谱库',
  meals: '搭配', profile: '我的'
}

Page({
  data: {
    view: 'match',
    themeOptions: themes,
    selected: [],
    greeting: greetingInfo(new Date(), 0),
    inventoryReady: false, calendarDate: '', calendarSlot: '',
    fridgeSummary: summarizeInventory([]),
    ...defaultLibraryFilters,
    results: initialRecipes,
    libraryCards: initialRecipes.slice(0, libraryPageSize),
    quickRecipe: defaultRecipe,
    lightInspiration: null,
    suggestedRecipes: [],
    featured: null,
    homeMatches: [],
    categories,
    sceneTags,
    methodTags,
    favorites: [],
    history: [],
    cooked: []
  },

  onLoad({ view, date, slot } = {}) {
    if (view !== 'meals') return
    const calendarDate = parseDate(date) ? date : ''
    const calendarSlot = mealSlots.some(meal => meal.id === slot) ? slot : ''
    this.showView('meals', { calendarDate, calendarSlot })
  },

  onShareAppMessage() {
    const { featured, quickRecipe } = this.data
    const recipe = featured || quickRecipe
    return {
      title: recipe ? `今天吃什么？试试${recipe.name}` : '今天吃什么？打开冰箱看看，吃什么就有了谱',
      path: '/pages/home/index'
    }
  },

  onShow() {
    applyTheme(this)
    this.refreshKitchenData()
    this.refreshRecipeRecords()
    this.refreshPlanningData()
  },

  refreshPlanningData() {
    if (this.data.view !== 'meals' || typeof this.selectComponent !== 'function') return
    const meals = this.selectComponent('#meal-pairings')
    if (meals) meals.refreshPlanningData()
  },

  refreshRecipeRecords() {
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
  },

  refreshKitchenData() {
    if (!this.allRecipes) this.allRecipes = matchRecipes([])
    try {
      const selected = readInventory()
      this.setData({ inventoryReady: true })
      this.updateHomeMeal(selected)
    } catch {
      this.setData({ inventoryReady: false })
      wx.showToast({ title: '暂时无法读取冰箱', icon: 'none' })
    }
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
    const { featured, quickRecipe, homeMatches, favorites, cooked } = this.data
    const shown = new Set([(featured || quickRecipe).id, ...homeMatches.map(recipe => recipe.id)])
    const preferred = new Set([...favorites, ...cooked].map(recipe => recipe.category))
    const candidates = this.inventoryMatches || this.allRecipes || initialRecipes
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

  switchView(event) {
    this.showView(event.currentTarget.dataset.view)
  },

  showView(view, update = {}) {
    if (!viewTitles[view] || (view === this.data.view && !Object.keys(update).length)) return
    if (view === 'match') this.updateHomeMeal(this.data.selected)
    this.updateResults({ view, ...defaultLibraryFilters, ...update }, () => {
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

  openSurprise() {
    wx.navigateTo({
      url: '/pages/surprise/index',
      fail: () => wx.showToast({ title: '暂时无法打开，请重试', icon: 'none' })
    })
  },

  openRecipeSearch() {
    this.showView('library', { librarySearchFocused: true })
  },

  openAllRecipes() {
    this.showView('library', defaultLibraryFilters)
  },

  openFatLossRecipes() {
    const tagIndex = sceneTags.indexOf(fatLossTag)
    this.showView('library', { tagIndex: Math.max(0, tagIndex), methodIndex: 0 })
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

  selectSceneTag(event) {
    const tagIndex = Number(event.currentTarget.dataset.index)
    this.updateResults({ tagIndex, methodIndex: 0 })
  },

  changeCookMethod(event) {
    this.updateResults({ methodIndex: Number(event.detail.value), tagIndex: 0 })
  },

  loadMoreRecipes() {
    const { results, libraryCards } = this.data
    this.setData({ libraryCards: results.slice(0, libraryCards.length + libraryPageSize) })
  },

  updateHomeMeal(selected, date = new Date()) {
    const greeting = greetingInfo(date, selected.length)
    if (selected.join(',') !== this.data.selected.join(',') ||
        this.recipeDay !== localRecipeDay(date) || this.data.greeting.period !== greeting.period) {
      this.updateSelection(selected, date, greeting)
    }
  },

  updateSelection(selected, date = new Date(), greeting = greetingInfo(date, selected.length)) {
    const day = localRecipeDay(date)
    const allRecipes = this.allRecipes || initialRecipes
    this.inventoryMatches = selected.length ? matchRecipes(selected) : null
    const { ready, almost } = groupFridgeMatches(this.inventoryMatches || [])
    const readyPool = ready
    const almostPool = almost
    const festival = festivalOf(date)
    const festivalPick = festival && festivalRecipe(festival, readyPool, almostPool, allRecipes)
    const featured = festivalPick || dailyRecipe(readyPool, almostPool, day, greeting.period)
    const quickIds = new Set(allRecipes.filter(recipe =>
      recipe.required.length && recipe.minutes <= 20 && mealCategories.has(recipe.category)
    ).map(recipe => recipe.id))
    const quickCandidates = allRecipes.filter(recipe =>
      quickIds.has(recipe.id) || (recipe.category === '早餐' && recipe.minutes <= 20)
    )
    const currentQuick = this.data.quickRecipe
    const safeQuick = currentQuick && allRecipes.some(recipe => recipe.id === currentQuick.id) ? currentQuick : null
    const quickRecipe = featured ? (safeQuick || quickCandidates[0] || allRecipes[0] || defaultRecipe) :
      dailyRecipe(quickCandidates, [], day, greeting.period) || allRecipes[0] || defaultRecipe
    const hero = featured || quickRecipe
    const readyPreview = previewRecipes(readyPool, homeMatchLimit, hero, true)
    const homeMatches = readyPreview.concat(previewRecipes(almostPool, homeMatchLimit - readyPreview.length, hero, false))
    const visibleLibraryCards = Math.max(libraryPageSize, this.data.libraryCards.length)
    this.recipeDay = day
    this.updateResults({
      selected,
      greeting,
      featured,
      quickRecipe,
      homeMatches,
      fridgeSummary: summarizeInventory(selected)
    }, () => this.refreshHomeSuggestions(), visibleLibraryCards)
  },

  updateResults(update, afterUpdate, limit = libraryPageSize) {
    const { view, selected, categoryIndex, tagIndex, methodIndex, librarySearch } = { ...this.data, ...update }
    const inLibrary = view === 'library'
    const activeTag = tagIndex ? sceneTags[tagIndex] : (methodIndex ? methodTags[methodIndex] : null)
    const results = matchRecipes(selected, {
      category: inLibrary && categoryIndex ? categories[categoryIndex] : null,
      tag: inLibrary ? activeTag : null,
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
