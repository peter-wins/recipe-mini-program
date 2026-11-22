const { getCatalogSource, getRecipeCategories, matchRecipes } = require('../../catalog')

const pageSize = 24
const sceneTags = ['全部', '减脂', '早餐', '快手', '半成品']
const methodTags = ['烹饪方式', '空气炸锅', '微波炉', '电饭煲', '烤箱']

Component({
  properties: {
    initial: {
      type: Array,
      value: [],
      observer(items) {
        this.setSelection(items)
      }
    },
    confirmText: { type: String, value: '确定' },
    busy: { type: Boolean, value: false },
    single: { type: Boolean, value: false },
    allowedIds: {
      type: Array,
      value: [],
      observer() {
        if (this.catalogSource) this.updateChoices()
      }
    }
  },
  data: {
    categories: ['全部分类', ...getRecipeCategories()],
    sceneTags,
    methodTags,
    categoryIndex: 0,
    tagIndex: 0,
    methodIndex: 0,
    search: '',
    resultCount: 0,
    choices: [],
    hasMore: false,
    selected: [],
    checked: {}
  },
  lifetimes: {
    ready() {
      this.refreshCatalogData()
    }
  },
  pageLifetimes: {
    show() {
      if (this.catalogSource) this.refreshCatalogData()
    }
  },
  methods: {
    refreshCatalogData() {
      const source = getCatalogSource()
      if (source === this.catalogSource) return
      const categories = ['全部分类', ...getRecipeCategories()]
      const categoryIndex = Math.max(0, categories.indexOf(this.data.categories[this.data.categoryIndex]))
      this.updateChoices({ categories, categoryIndex })
      this.catalogSource = source
    },
    setSelection(items) {
      const selected = Array.isArray(items) ? items : []
      this.setData({ selected, checked: Object.fromEntries(selected.map(item => [item.id, true])) })
    },
    changeCategory(event) {
      this.updateChoices({ categoryIndex: Number(event.detail.value) })
    },
    selectSceneTag(event) {
      this.updateChoices({ tagIndex: Number(event.currentTarget.dataset.index), methodIndex: 0 })
    },
    changeCookMethod(event) {
      this.updateChoices({ methodIndex: Number(event.detail.value), tagIndex: 0 })
    },
    clearFilters() {
      this.updateChoices({ categoryIndex: 0, tagIndex: 0, methodIndex: 0 })
    },
    searchChoices(event) {
      this.updateChoices({ search: event.detail.value })
    },
    clearSearch() {
      this.updateChoices({ search: '' })
    },
    updateChoices(patch = {}) {
      const { categoryIndex, tagIndex, methodIndex, search, categories } = { ...this.data, ...patch }
      const activeTag = tagIndex ? sceneTags[tagIndex] : (methodIndex ? methodTags[methodIndex] : null)
      const recipes = matchRecipes([], {
        search,
        category: categoryIndex ? categories[categoryIndex] : null,
        tag: activeTag,
        rankByStock: false
      })
      const allowed = this.data.single ? new Set(this.data.allowedIds) : null
      this.results = recipes.filter(recipe => !allowed || allowed.has(recipe.id)).map(recipe => ({
        id: recipe.id,
        title: recipe.name,
        image: recipe.image,
        note: [recipe.libraryCategory, recipe.timeText].filter(Boolean).join(' · ')
      }))
      this.setData({
        ...patch,
        resultCount: this.results.length,
        choices: this.results.slice(0, pageSize),
        hasMore: this.results.length > pageSize
      })
    },
    loadMore() {
      if (!this.data.hasMore) return
      const choices = this.results.slice(0, this.data.choices.length + pageSize)
      this.setData({ choices, hasMore: this.results.length > choices.length })
    },
    selectChoice(event) {
      if (this.data.busy) return
      const { id } = event.currentTarget.dataset
      const { selected, checked, choices } = this.data
      if (checked[id]) {
        this.setSelection(selected.filter(item => item.id !== id))
        return
      }
      const choice = choices.find(item => item.id === id)
      if (choice) {
        const picked = { id: choice.id, title: choice.title }
        this.setSelection(this.data.single ? [picked] : [...selected, picked])
      }
    },
    confirm() {
      const { selected, busy } = this.data
      if (!selected.length || busy) return
      this.triggerEvent('confirm', {
        ids: selected.map(item => item.id),
        selected: selected.map(item => ({ ...item }))
      })
    }
  }
})
