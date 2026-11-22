const { getCatalogSource, getIngredientName, getRecipe, matchRecipes, groupFridgeMatches } = require('../../catalog')
const { readInventory, summarizeInventory } = require('../../inventory')
const { applyTheme } = require('../../theme')

const mainCategories = new Set(['水产', '荤菜', '素菜', '汤', '主食', '早餐'])

function pickReason(recipe) {
  if (recipe.missingCount === 0) {
    const used = recipe.required.map(getIngredientName).filter(Boolean).slice(0, 3)
    return used.length ? `冰箱里的${used.join('、')}都能用上` : '冰箱里的食材刚好够'
  }
  if (recipe.missingCount === 1) return `只差${recipe.missingText}，补一样就能做`
  return '今天换个口味，试试这道'
}

Page({
  data: {
    recipe: null,
    reason: '',
    poolLabel: '',
    inventoryCount: 0
  },

  onLoad() {
    applyTheme(this)
    this.buildPools()
    this.pick()
  },

  onShow() {
    applyTheme(this)
    const key = readInventory().slice().sort().join(',')
    if (key !== this.inventoryKey || this.catalogSource !== getCatalogSource()) {
      this.buildPools()
      this.pick()
    }
  },

  refreshCatalogData() {
    const current = this.data.recipe
    this.buildPools()
    if (current) this.setData({ recipe: getRecipe(current.id) })
    else this.pick()
  },

  buildPools() {
    const selected = readInventory()
    this.inventoryKey = selected.slice().sort().join(',')
    this.catalogSource = getCatalogSource()
    const { ready, almost } = groupFridgeMatches(selected.length ? matchRecipes(selected) : [])
    const readyPool = ready
    const almostPool = almost
    const all = matchRecipes([]).filter(recipe =>
      recipe.required.length && mainCategories.has(recipe.category))
    this.pools = [
      { list: readyPool, label: '冰箱食材齐全' },
      { list: almostPool, label: '只差一样' },
      { list: all, label: '换个口味' }
    ]
    this.setData({ inventoryCount: summarizeInventory(selected).count })
  },

  pick() {
    const pool = (this.pools || []).find(item => item.list.length)
    if (!pool) {
      this.setData({ recipe: null, reason: '', poolLabel: '' })
      return
    }
    const current = this.data.recipe && this.data.recipe.id
    const others = pool.list.filter(recipe => recipe.id !== current)
    const candidates = others.length ? others : pool.list
    const picked = candidates[Math.floor(Math.random() * candidates.length)]
    this.setData({
      recipe: getRecipe(picked.id),
      reason: pickReason(picked),
      poolLabel: pool.label
    })
  },

  openFridge() {
    wx.navigateTo({
      url: '/pages/fridge/index',
      fail: () => wx.showToast({ title: '暂时无法打开冰箱', icon: 'none' })
    })
  },

  onShareAppMessage() {
    const recipe = this.data.recipe
    return {
      title: recipe ? `今晚吃什么？我抽到了${recipe.name}` : '今晚吃什么？让吃饭搭子帮你抽一道',
      path: '/pages/surprise/index'
    }
  }
})
