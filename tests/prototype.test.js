const assert = require('node:assert/strict')
const test = require('node:test')
const { ingredients, recipes, legacyRecipeIds } = require('../miniprogram/data')
const { getIngredientOptions, getIngredientGroups, searchIngredientOptions, getRecipe, matchRecipes } = require('../miniprogram/catalog')
const { getMealPlans } = require('../miniprogram/meal-plans')
const tomatoEggs = legacyRecipeIds['tomato-eggs']
const { getCoverUrl } = require('../miniprogram/recipe-image')
const { localRecipeDay, dailyRecipe, previewRecipes, festivalRecipe, featuredReason } = require('../miniprogram/daily-recipe')

test('今日推荐按本地日期轮换，食材有限时偶尔推荐只差一样的菜', () => {
  const day = localRecipeDay(new Date(2026, 10, 15, 1))
  assert.equal(localRecipeDay(new Date(2026, 10, 15, 23)), day)
  assert.equal(localRecipeDay(new Date(2026, 10, 16, 0)), day + 1)

  const ready = [
    { id: 'egg-1', category: '早餐', required: ['egg'] },
    { id: 'egg-2', category: '早餐', required: ['egg'] },
    { id: 'tomato-egg', category: '素菜', required: ['egg', 'tomato'] }
  ]
  const almost = [{ id: 'soup', category: '汤', required: ['egg', 'tofu'] }]
  assert.deepEqual([0, 1, 2, 3].map(date => dailyRecipe(ready, almost, date).id),
    ['tomato-egg', 'tomato-egg', 'soup', 'tomato-egg'])
  const enough = [...ready, { id: 'salad', category: '素菜', required: ['tomato', 'cucumber'] }]
  assert.deepEqual(new Set([day, day + 1].map(date => dailyRecipe(enough, almost, date).id)), new Set(['tomato-egg', 'salad']))
  assert.notEqual(dailyRecipe(ready.slice(0, 2), [], day).id, dailyRecipe(ready.slice(0, 2), [], day + 1).id)
  assert.equal(dailyRecipe([], almost, day), almost[0])
  assert.equal(dailyRecipe([], [], day), null)
})

test('首页搭配优先不同食材，食材齐全时为汤留位置', () => {
  const featured = { id: 'pork', category: '荤菜', required: ['pork', 'garlic'] }
  const egg = { id: 'egg', category: '早餐', required: ['egg'] }
  const greens = { id: 'greens', category: '素菜', required: ['broccoli', 'garlic'] }
  const morePork = { id: 'pork-2', category: '荤菜', required: ['pork', 'garlic'] }
  const soup = { id: 'soup', name: '西红柿豆腐汤羹', category: '其他', required: ['tomato', 'tofu'] }
  assert.deepEqual(previewRecipes([featured, egg, morePork, greens, soup], 2, featured, true).map(recipe => recipe.id), ['greens', 'soup'])
  assert.deepEqual(previewRecipes([soup], 4, featured, true), [soup])
})

test('只有开发环境使用本机图源，支持全角文件名', () => {
  const path = 'ai-generated/菜谱.jpg'
  assert.equal(getCoverUrl(path, 'develop'), 'http://192.168.1.81:8088/ai-generated/%E8%8F%9C%E8%B0%B1.jpg')
  for (const env of ['trial', 'release', undefined]) assert.equal(getCoverUrl(path, env), '')
  assert.equal(getCoverUrl('ai-generated/../other.jpg', 'develop'), '')
  assert.equal(getCoverUrl('steps/test-recipe/step_2.jpg', 'develop'), 'http://192.168.1.81:8088/steps/test-recipe/step_2.jpg')
  assert.equal(getCoverUrl('steps/../step_2.jpg', 'develop'), '')
  assert.equal(getCoverUrl('steps/test-recipe/step_2.jpg', 'release'), '')
})

test('364 道菜均来自数据集，食材、做法和封面路径完整', () => {
  assert.equal(recipes.length, 364)
  assert.equal(new Set(recipes.map(recipe => recipe.id)).size, 364)
  for (const recipe of recipes) {
    assert.ok(recipe.minutes > 0 && recipe.servings > 0)
    assert.ok(Number.isInteger(recipe.calories) && recipe.calories > 0)
    assert.ok(recipe.tips.every(tip => typeof tip === 'string' && tip.trim()))
    assert.ok(recipe.coverPath.startsWith('ai-generated/') && recipe.sourcePath.startsWith('dishes/'))
    assert.equal(recipe.image, undefined)
    for (const group of getRecipe(recipe.id).groups) {
      for (const item of group.items) assert.ok(ingredients[item.id] && item.name && item.quantity)
    }
    assert.ok(recipe.steps.every(([title, body]) => title && body))
  }
  assert.equal(getRecipe('tomato-eggs').calories, 252)
  assert.ok(getRecipe('aquatic_ga-li-chao-xie').tips.some(tip => tip.includes('封煎蟹黄')))
  assert.equal(getRecipe('braised-ribs'), null)
})

test('冰箱常用分类精简，搜索保留长尾食材并能识别同义词和旧库存', () => {
  assert.equal(getIngredientGroups().some(group => group.name === '其他食材'), false)
  assert.deepEqual(searchIngredientOptions(''), [])
  assert.equal(searchIngredientOptions('青蟹')[0].name, '青蟹')
  assert.equal(searchIngredientOptions('老姜')[0].id, 'ginger')
  assert.equal(searchIngredientOptions('味极鲜(生抽)')[0].id, 'soy')
  assert.equal(searchIngredientOptions('大葱')[0].name, '大葱')
  const oldGinger = getIngredientOptions().find(item => item.name === '老姜').id
  const recipe = recipes.find(item => item.required.some(([id]) => id === oldGinger))
  assert.ok(recipe)
  assert.equal(getRecipe(recipe.id, ['ginger']).missingItems.some(item => item.id === 'ginger'), false)
  const originalWx = global.wx
  try {
    global.wx = { getStorageSync: () => ({ inventory: [oldGinger, 'ginger'] }) }
    assert.deepEqual(require('../miniprogram/inventory').readInventory(), ['ginger'])
  } finally {
    global.wx = originalWx
  }
})

test('别名匹配、缺料排序和组合筛选仍然可用', () => {
  const selection = ['西红柿', '蛋']
  const matches = matchRecipes(selection)
  assert.ok(matches.every((item, index) => !index || matches[index - 1].missingCount <= item.missingCount))
  const filtered = matchRecipes(selection, { readyOnly: true, category: '素菜', maxMinutes: 15, search: '番茄' })
  assert.deepEqual(filtered.map(item => item.id), [tomatoEggs])
  assert.equal(getRecipe(tomatoEggs, selection).missingItems.length, 0)
})

test('拆开组合食材检查库存，普通用水保留原用量但不列为缺料', () => {
  const soup = 'soup_xi-hong-shi-ji-dan-tang'
  const stock = ['tomato', 'egg', 'scallion', 'ginger']
  assert.deepEqual(getRecipe(soup, stock).missingItems.map(item => item.name), ['大蒜'])
  assert.equal(matchRecipes(stock).find(item => item.id === soup).missingText, '大蒜')
  assert.equal(getRecipe(soup, [...stock, 'garlic']).missingItems.length, 0)
  const eggDrop = getRecipe('other_ji-dan-hua', ['egg'])
  assert.equal(eggDrop.missingItems.length, 0)
  assert.equal(eggDrop.groups.find(group => group.key === 'pantry').items.find(item => item.name === '沸水').quantity, '100-150ml')
  assert.equal(searchIngredientOptions('沸水').length, 0)
  assert.ok(searchIngredientOptions('苏打水').length)
})

test('六套轻食使用上游菜谱并检查整餐食材', () => {
  assert.equal(getMealPlans([]).length, 6)
  const stock = ['egg', 'broccoli', 'garlic']
  const [almost] = getMealPlans(stock)
  assert.equal(almost.id, 'egg-broccoli')
  assert.equal(almost.missingText, '熟米饭')
  assert.equal(getMealPlans([...stock, 'rice'], { readyOnly: true, maxMinutes: 20 }).length, 0)
  assert.equal(getMealPlans([...stock, 'rice'], { readyOnly: true, maxMinutes: 30 })[0].id, almost.id)
})

test('菜谱页分页，采购保留原用量，旧收藏映射到新菜谱', () => {
  const storage = new Map([['fridge-ingredient-ids-v1', ['potato', 'potato', 'unknown']]])
  let clipboard
  let navigationTitle
  let failWrites = false
  global.wx = {
    getStorageSync: key => storage.get(key),
    setStorageSync: (key, value) => {
      if (failWrites) throw new Error('storage unavailable')
      storage.set(key, value)
    },
    setClipboardData: ({ data }) => { clipboard = data },
    showToast: () => {},
    setNavigationBarTitle: ({ title }) => { navigationTitle = title },
    pageScrollTo: ({ scrollTop, selector }) => {
      if (selector) assert.equal(selector, '#method')
      else assert.equal(scrollTop, 0)
    }
  }
  let registered
  global.Page = page => { registered = page }
  require('../miniprogram/pages/home/index')
  const createPage = page => ({
    ...page,
    data: structuredClone(page.data),
    setData(update, done) {
      Object.assign(this.data, update)
      if (done) done()
    }
  })
  const home = createPage(registered)
  require('../miniprogram/pages/recipe/index')
  const detail = createPage(registered)
  require('../miniprogram/pages/shopping/index')
  const shopping = createPage(registered)
  require('../miniprogram/pages/records/index')
  const records = createPage(registered)
  storage.set('favorite-recipe-ids', ['tomato-eggs', 'braised-ribs'])
  home.onShow()
  assert.deepEqual(home.data.selected, ['potato'])
  const previewStock = ['egg', 'tomato']
  home.updateSelection(previewStock)
  const featured = home.data.featured.id
  assert.equal(home.data.homeGroups.some(group => group.recipes.some(recipe => recipe.id === featured)), false)
  home.updateSelection(previewStock)
  assert.equal(home.data.featured.id, featured)
  home.updateSelection(['egg', 'tomato', 'potato', 'tofu', 'garlic', 'scallion', 'ginger', 'pork', 'carrot', 'soy', 'rice', 'noodles', 'cucumber', 'broccoli'])
  assert.deepEqual(home.data.homeGroups.map(group => [group.id, group.recipes.length, group.hasMore]), [
    ['ready', 4, true], ['almost', 3, true]
  ])
  const openGroup = id => home.openMatchGroup({ currentTarget: { dataset: { id } } })
  openGroup('ready')
  assert.equal(navigationTitle, '食材齐全')
  assert.equal(home.data.matchList.total, home.data.fridgeSummary.ready)
  assert.ok(home.data.matchList.recipes.every(recipe => recipe.missingCount === 0))
  openGroup('almost')
  assert.equal(navigationTitle, '只差一样')
  assert.equal(home.data.matchList.recipes.length, 24)
  home.loadMoreMatches()
  assert.equal(home.data.matchList.recipes.length, home.data.fridgeSummary.almost)
  assert.ok(home.data.matchList.recipes.every(recipe => recipe.missingCount === 1))
  home.switchView({ currentTarget: { dataset: { view: 'match' } } })
  assert.equal(home.data.matchList, null)
  home.onShow()
  home.openFridge()
  assert.equal(navigationTitle, '冰箱食材')
  assert.equal(home.data.visibleIngredients[0].name, '番茄')
  home.selectIngredientGroup({ currentTarget: { dataset: { index: 1 } } })
  assert.equal(home.data.visibleIngredients.find(item => item.id === 'potato').checked, true)
  home.searchIngredients({ detail: { value: '青蟹' } })
  assert.equal(home.data.visibleIngredients[0].name, '青蟹')
  home.clearIngredientSearch()
  assert.equal(home.data.visibleIngredients[0].id, 'potato')
  home.switchView({ currentTarget: { dataset: { view: 'library' } } })
  assert.equal(navigationTitle, '你想吃什么？')
  assert.equal(home.data.results.length, 364)
  assert.equal(home.data.libraryCards.length, 24)
  home.loadMoreRecipes()
  assert.equal(home.data.libraryCards.length, 48)
  home.searchLibrary({ detail: { value: '不存在的菜谱' } })
  assert.equal(home.data.libraryCards.length, 0)

  detail.onLoad({ id: 'tomato-eggs' })
  detail.onShow()
  assert.equal(detail.data.saved, true)
  assert.equal(detail.data.recipe.id, tomatoEggs)
  assert.deepEqual(detail.data.purchaseItems.map(item => item.quantity), ['1个(约180g)', '1.5个'])
  detail.togglePurchaseItem({ currentTarget: { dataset: { id: 'egg' } } })
  detail.copyMissing()
  assert.equal(clipboard, '西红柿炒鸡蛋（1 人份）缺料清单\n西红柿 1个(约180g)')
  detail.savePurchaseItems()
  assert.equal(detail.data.hasSavedPurchase, true)
  detail.savePurchaseItems()
  shopping.onShow()
  assert.equal(shopping.data.items.length, 1)
  assert.equal(shopping.data.items[0].quantity, '1个(约180g)')
  const { readKitchen, saveKitchen } = require('../miniprogram/inventory')
  const kitchen = readKitchen()
  const unrelated = { recipeId: 'another-dish', id: 'potato', quantity: '2个' }
  saveKitchen({ ...kitchen, shopping: [...kitchen.shopping, unrelated] })
  const tomato = { currentTarget: { dataset: { id: 'tomato' } } }
  detail.togglePurchaseItem(tomato)
  assert.equal(detail.data.purchaseItems.length, 0)
  assert.equal(readKitchen().shopping.length, 2)
  detail.savePurchaseItems()
  assert.equal(detail.data.hasSavedPurchase, false)
  assert.deepEqual(readKitchen().shopping, [unrelated])
  saveKitchen({ ...readKitchen(), shopping: [] })
  detail.togglePurchaseItem(tomato)
  detail.savePurchaseItems()
  shopping.onShow()
  const event = { currentTarget: { dataset: { key: shopping.data.items[0].key } } }
  failWrites = true
  shopping.markBought(event)
  shopping.onShow()
  assert.equal(shopping.data.items.length, 1)
  failWrites = false
  shopping.markBought(event)
  assert.deepEqual(shopping.data.items, [])
  home.onShow()
  assert.deepEqual(home.data.selected, ['potato', 'tomato'])
  detail.startCooking()
  for (const step of detail.data.recipe.steps) detail.nextStep()
  records.onLoad({ type: 'cooked' })
  records.onShow()
  assert.deepEqual(records.data.recipes.map(item => item.id), [tomatoEggs])
  records.onLoad({ type: 'favorites' })
  records.onShow()
  assert.deepEqual(records.data.recipes.map(item => item.id), [tomatoEggs])
  detail.toggleSaved()
  records.onShow()
  assert.deepEqual(records.data.recipes, [])
})

test('节日日期准确，节日当天优先推荐应节菜而不是随机菜', () => {
  const { festivalOf } = require('../miniprogram/festival')
  // 冬至 2026-12-22（前一天不是冬至）
  assert.equal(festivalOf(new Date(2026, 11, 21)), null)
  const dongZhi = festivalOf(new Date(2026, 11, 22))
  assert.equal(dongZhi.name, '冬至')
  assert.equal(festivalOf(new Date(2027, 1, 6)).name, '春节')
  assert.equal(festivalOf(new Date(2027, 1, 5)).name, '除夕')
  assert.equal(festivalOf(new Date(2027, 1, 20)).name, '元宵节')
  assert.equal(festivalOf(new Date(2027, 0, 15)).name, '腊八节')
  assert.equal(festivalOf(new Date(2026, 8, 25)).name, '中秋节')
  assert.equal(festivalOf(new Date(2026, 5, 19)).name, '端午节')
  assert.equal(festivalOf(new Date(2027, 0, 1)).name, '元旦')

  // 库里没有饺子时，冬至兜底推荐羊肉，绝不推浆水面
  const ready = [
    { id: 'jiangshui', name: '浆水面', category: '主食', required: ['noodles'] },
    { id: 'yang-soup', name: '羊肉汤', category: '汤', required: ['lamb'] }
  ]
  const all = [...ready, { id: 'yang-ribs', name: '萝卜炖羊排', category: '荤菜', required: ['radish'] }]
  const pick = festivalRecipe(dongZhi, ready, [], all)
  assert.equal(pick.recipe.id, 'yang-soup')
  assert.equal(pick.reason, '冬至进补，来碗热乎的正合适')

  // 冰箱里有羊肉汤时优先用冰箱里的；元宵推汤圆
  const yuanXiao = festivalOf(new Date(2027, 1, 20))
  const tangyuan = { id: 'tangyuan', name: '速冻汤圆', category: '甜品', required: ['riceBall'] }
  assert.equal(festivalRecipe(yuanXiao, [], [], [tangyuan]).recipe.id, 'tangyuan')
  assert.equal(festivalRecipe(yuanXiao, [], [], [tangyuan]).reason, '元宵节来碗汤圆，圆圆满满')

  // 没有应节菜的节日（端午）不影响常规推荐
  assert.equal(festivalRecipe(festivalOf(new Date(2026, 5, 19)), ready, [], all), null)
})

test('推荐理由优先说食材，只差一样时点出缺什么', () => {
  assert.equal(featuredReason({ required: ['cabbage', 'pork', 'scallion', 'soy'], missingCount: 0, missingText: '' }, 3), '冰箱里的大白菜、猪里脊都能用上')
  assert.equal(featuredReason({ required: ['tomato'], missingCount: 0, missingText: '' }, 3), '冰箱里的番茄正好能用上')
  assert.equal(featuredReason({ required: ['cabbage'], missingCount: 1, missingText: '豆腐' }, 3), '冰箱里的大白菜都在，就差豆腐了')
  assert.ok(['简单快手，今晚正好', '冰箱里翻一翻，这碗正合适'].includes(featuredReason({ required: ['soy'], missingCount: 0, missingText: '' }, 1)))
})

test('首页问候区按时段问候、按日期轮换每日一句', () => {
  const { greetingInfo } = require('../miniprogram/home-greeting')
  const dongZhiNight = greetingInfo(new Date(2026, 11, 22, 18, 30))
  assert.equal(dongZhiNight.text, '晚上好')
  assert.equal(dongZhiNight.festivalName, '冬至')
  assert.equal(dongZhiNight.quoteEmoji, '🥟')
  assert.equal(dongZhiNight.quoteText, '冬至不端饺子碗，冻掉耳朵没人管')
  assert.equal(dongZhiNight.dateText, '12月22日 星期二')

  const normal = greetingInfo(new Date(2026, 10, 15, 9), 3)
  assert.equal(normal.text, '上午好')
  assert.equal(normal.festivalName, '')
  assert.ok(normal.quoteText)

  // 同一天刷新不变，第二天换一句；空冰箱和深夜用专属文案
  const noon = new Date(2026, 10, 16, 12)
  assert.equal(greetingInfo(noon, 3).quoteText, greetingInfo(new Date(2026, 10, 16, 13), 3).quoteText)
  assert.notEqual(greetingInfo(noon, 3).quoteText, greetingInfo(new Date(2026, 10, 17, 12), 3).quoteText)
  assert.ok(greetingInfo(noon, 0).quoteText.includes('冰箱'))
  assert.ok(greetingInfo(new Date(2026, 10, 16, 23), 3).quoteText.includes('深夜'))
})

test('旧库存数量不再参与推荐，已排好的采购量在升级后保留', () => {
  const kitchen = {
    inventory: ['tomato'],
    quantities: { tomato: 2 },
    shopping: [
      { recipeId: 'tomato-eggs', id: 'tomato', unit: '个', amount: 3, useStock: true },
      { recipeId: 'tomato-noodles', id: 'tomato', unit: '个', amount: 2, useStock: true }
    ]
  }
  let stored = kitchen
  global.wx = {
    getStorageSync: () => stored,
    setStorageSync: (key, value) => { stored = value }
  }
  const { readKitchen, saveInventory } = require('../miniprogram/inventory')
  const { listShopping } = require('../miniprogram/shopping')
  assert.deepEqual(readKitchen().inventory, ['tomato'])
  assert.equal(readKitchen().quantities, undefined)
  assert.equal(listShopping()[0].amount, 3)
  saveInventory(['tomato', 'egg'])
  assert.equal(stored.quantities, undefined)
  assert.equal(listShopping()[0].amount, 3)
  assert.equal(getRecipe('tomato-eggs', readKitchen().inventory).missingItems.length, 0)
})
