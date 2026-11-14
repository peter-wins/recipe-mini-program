const { getIngredientOptions, getIngredientGroups, searchIngredientOptions, getRecipeCategories, getRecipe, matchRecipes, stapleIds } = require('../../catalog')
const { readFavorites } = require('../../favorites')
const { readInventory, saveInventory } = require('../../inventory')
const { readActivity } = require('../../activity')
const { localRecipeDay, dailyRecipe, previewRecipes, festivalRecipe, featuredReason } = require('../../daily-recipe')
const { festivalOf } = require('../../festival')
const { greetingInfo } = require('../../home-greeting')

const categories = ['全部分类', ...getRecipeCategories()]
const minutes = [0, 10, 15, 20, 30, 60]
const timeOptions = ['不限耗时', ...minutes.slice(1).map(limit => `${limit} 分钟内`)]
const defaultFilters = { categoryIndex: 0, minutesIndex: 0, readyOnly: false }
const initialRecipes = matchRecipes([])
const libraryPageSize = 24
const matchGroups = [
  { id: 'ready', title: '食材齐全', showMissing: false, previewSize: 4 },
  { id: 'almost', title: '只差一样', showMissing: true, previewSize: 3 }
]
const options = getIngredientOptions()
const fridgeGroups = getIngredientGroups()
const ingredientPageSize = 24
const viewTitles = {
  match: '美味厨房', matches: '按冰箱食材找菜', library: '你想吃什么？', fridge: '冰箱食材',
  meals: '轻食搭配', profile: '我的'
}

function ingredientView(selected, search, groupIndex, limit) {
  const searching = Boolean(search.trim())
  const items = searching ? searchIngredientOptions(search) : fridgeGroups[groupIndex].items
  return {
    searching,
    visibleIngredients: items.slice(0, limit).map(({ id, name }) => ({ id, name, checked: selected.includes(id) })),
    hasMoreIngredients: items.length > limit
  }
}

Page({
  data: {
    view: 'match',
    selected: [],
    greeting: greetingInfo(new Date(), 0),
    inventoryReady: false,
    selectedItems: [],
    search: '',
    fridgeGroupNames: fridgeGroups.map(group => group.name),
    fridgeGroupIndex: 0,
    ingredientLimit: ingredientPageSize,
    showAllSelected: false,
    fridgeSummary: { count: 0, staples: 0, ready: 0, almost: 0 },
    librarySearch: '',
    libraryFilterText: '',
    ...ingredientView([], '', 0, ingredientPageSize),
    results: initialRecipes,
    libraryCards: initialRecipes.slice(0, libraryPageSize),
    quickRecipes: ['tomato-eggs', 'steamed-egg'].map(id => getRecipe(id)),
    featured: null,
    homeGroups: [],
    matchList: null,
    categoryOptions: categories.map((name, index) => ({
      name: index ? name : '全部',
      index
    })),
    timeOptions,
    ...defaultFilters,
    favorites: [],
    history: [],
    cooked: []
  },

  onShow() {
    const selectedForGreeting = this.data.selected.length ? this.data.selected : (() => {
      try { return readInventory() } catch { return [] }
    })()
    this.setData({ greeting: greetingInfo(new Date(), selectedForGreeting.length) })
    try {
      const selected = readInventory()
      this.setData({ inventoryReady: true })
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
  },

  switchView(event) {
    this.showView(event.currentTarget.dataset.view)
  },

  showView(view, update = {}) {
    if (!viewTitles[view] || (view === this.data.view && !Object.keys(update).length)) return
    if (view === 'match' && this.recipeDay !== localRecipeDay()) this.updateSelection(this.data.selected)
    this.updateResults({ view, matchList: null, ...update }, () => {
      wx.setNavigationBarTitle({ title: view === 'matches' && this.data.matchList ? this.data.matchList.title : viewTitles[view] })
      wx.pageScrollTo({ scrollTop: 0, duration: 0 })
    })
  },

  openMatchGroup(event) {
    const { id } = event.currentTarget.dataset
    const matchList = this.getMatchList(id, libraryPageSize)
    if (matchList) this.showView('matches', { matchList })
  },

  getMatchList(id, limit) {
    const group = this.fullMatchGroups && this.fullMatchGroups.find(item => item.id === id)
    return group ? { ...group, total: group.recipes.length, recipes: group.recipes.slice(0, limit) } : null
  },

  loadMoreMatches() {
    const { matchList } = this.data
    if (matchList) this.setData({ matchList: this.getMatchList(matchList.id, matchList.recipes.length + libraryPageSize) })
  },

  searchIngredients(event) {
    this.applyIngredientView({ search: event.detail.value, ingredientLimit: ingredientPageSize })
  },

  clearIngredientSearch() {
    this.applyIngredientView({ search: '', ingredientLimit: ingredientPageSize })
  },

  selectIngredientGroup(event) {
    this.applyIngredientView({ fridgeGroupIndex: Number(event.currentTarget.dataset.index), ingredientLimit: ingredientPageSize })
  },

  loadMoreIngredients() {
    this.applyIngredientView({ ingredientLimit: this.data.ingredientLimit + ingredientPageSize })
  },

  applyIngredientView(patch) {
    const { selected, search, fridgeGroupIndex, ingredientLimit } = { ...this.data, ...patch }
    this.setData({ ...patch, ...ingredientView(selected, search, fridgeGroupIndex, ingredientLimit) })
  },

  toggleSelectedIngredients() {
    this.setData({ showAllSelected: !this.data.showAllSelected })
  },

  clearInventory() {
    wx.showModal({
      title: '清空冰箱食材？',
      confirmText: '清空',
      success: ({ confirm }) => {
        if (!confirm) return
        try {
          saveInventory([])
          this.updateSelection([])
        } catch {
          wx.showToast({ title: '食材未保存，请重试', icon: 'none' })
        }
      }
    })
  },

  toggleIngredient(event) {
    const { id } = event.currentTarget.dataset
    const { selected } = this.data
    const updated = selected.includes(id) ? selected.filter(item => item !== id) : [...selected, id]
    try {
      saveInventory(updated)
      this.updateSelection(updated)
    } catch {
      wx.showToast({ title: '食材未保存，请重试', icon: 'none' })
    }
  },

  openFridge() {
    this.showView('fridge')
  },

  searchLibrary(event) {
    this.updateResults({ librarySearch: event.detail.value })
  },

  clearLibrarySearch() {
    this.updateResults({ librarySearch: '' })
  },

  changeCategory(event) {
    this.updateResults({ categoryIndex: Number(event.currentTarget.dataset.index) })
  },

  changeTime(event) {
    this.updateResults({ minutesIndex: Number(event.detail.value) })
  },

  toggleReadyOnly() {
    this.updateResults({ readyOnly: !this.data.readyOnly })
  },

  resetFilters() {
    this.updateResults(defaultFilters)
  },

  loadMoreRecipes() {
    const { results, libraryCards } = this.data
    this.setData({ libraryCards: results.slice(0, libraryCards.length + libraryPageSize) })
  },

  updateSelection(selected) {
    const day = localRecipeDay()
    const matches = selected.length ? matchRecipes(selected) : []
    const candidates = matches.filter(recipe =>
      ['水产', '荤菜', '素菜', '汤', '主食', '早餐', '其他'].includes(recipe.category) &&
      recipe.missingCount <= 1 && recipe.required.length > recipe.missingCount
    ).sort((left, right) => left.missingCount - right.missingCount || left.minutes - right.minutes)
    const ready = candidates.filter(recipe => recipe.missingCount === 0)
    const almost = candidates.filter(recipe => recipe.missingCount === 1)
    const festival = festivalOf()
    const festivalPick = festival && festivalRecipe(festival, ready, almost, matchRecipes([]))
    let featured = festivalPick
      ? { ...festivalPick.recipe, reason: festivalPick.reason }
      : dailyRecipe(ready, almost, day)
    if (featured && !featured.reason) featured = { ...featured, reason: featuredReason(featured, day) }
    const featuredId = featured && featured.id
    const recipesByGroup = { ready, almost }
    this.fullMatchGroups = matchGroups.map(group => ({
      ...group,
      recipes: recipesByGroup[group.id]
    }))
    const homeGroups = this.fullMatchGroups.map(group => {
      const alternatives = group.recipes.filter(recipe => recipe.id !== featuredId)
      return {
        ...group,
        recipes: previewRecipes(group.recipes, group.previewSize, featured, group.id === 'ready'),
        hasMore: alternatives.length > group.previewSize
      }
    }).filter(group => group.recipes.length)
    const { view, matchList } = this.data
    this.recipeDay = day
    this.updateResults({
      selected,
      featured,
      homeGroups,
      matchList: view === 'matches' && matchList ? this.getMatchList(matchList.id, Math.max(matchList.recipes.length, libraryPageSize)) : null,
      selectedItems: options.filter(item => selected.includes(item.id)).map(({ id, name }) => ({ id, name })),
      showAllSelected: selected.length > 8 && this.data.showAllSelected,
      fridgeSummary: {
        count: selected.filter(id => !stapleIds.has(id)).length,
        staples: selected.filter(id => stapleIds.has(id)).length,
        ready: ready.length,
        almost: almost.length
      },
      ...ingredientView(selected, this.data.search, this.data.fridgeGroupIndex, this.data.ingredientLimit)
    })
  },

  updateResults(update, afterUpdate) {
    const { view, selected, categoryIndex, minutesIndex, librarySearch, readyOnly } = { ...this.data, ...update }
    const inLibrary = view === 'library'
    const results = matchRecipes(selected, {
      category: inLibrary && categoryIndex ? categories[categoryIndex] : null,
      maxMinutes: inLibrary ? minutes[minutesIndex] : 0,
      readyOnly: inLibrary && readyOnly,
      search: inLibrary ? librarySearch : '',
      rankByStock: !inLibrary
    })
    this.setData({
      ...update,
      results,
      libraryCards: inLibrary ? results.slice(0, libraryPageSize) : [],
      libraryFilterText: [
        categoryIndex ? categories[categoryIndex] : '',
        minutesIndex ? timeOptions[minutesIndex] : '',
        readyOnly ? '食材齐全' : ''
      ].filter(Boolean).join(' · ')
    }, afterUpdate)
  }
})
