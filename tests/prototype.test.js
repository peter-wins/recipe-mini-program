const assert = require('node:assert/strict')
const test = require('node:test')
const { ingredients, recipes, legacyRecipeIds } = require('../miniprogram/data')
const { getIngredientOptions, getIngredientGroups, searchIngredientOptions, getRecipe, matchRecipes, groupFridgeMatches, avoidIdsFromNotes, getDietTags, tagsFor } = require('../miniprogram/catalog')
const { recommendRecipes } = require('../miniprogram/recipe-recommendations')
const { getMealPlans, rotateLightInspiration } = require('../miniprogram/meal-plans')
const tomatoEggs = legacyRecipeIds['tomato-eggs']
const { getCoverUrl } = require('../miniprogram/recipe-image')
const { localRecipeDay, dailyRecipe, previewRecipes, festivalRecipe } = require('../miniprogram/daily-recipe')
const { stepTimer, formatClock } = require('../miniprogram/step-timer')

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
  const breakfast = { id: 'breakfast', category: '早餐', minutes: 10, required: ['egg'] }
  const lunch = { id: 'lunch', category: '主食', minutes: 20, required: ['rice'] }
  const dinner = { id: 'dinner', category: '荤菜', minutes: 40, required: ['pork'] }
  const options = [breakfast, lunch, dinner]
  assert.equal(dailyRecipe(options, [], day, 'breakfast'), breakfast)
  assert.equal(dailyRecipe(options, [], day, 'lunch'), lunch)
  assert.equal(dailyRecipe(options, [], day, 'dinner'), dinner)
  assert.equal(dailyRecipe([dinner], [], day, 'breakfast'), dinner)
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

test('封面和步骤图沿用云存储路径并保留中文文件名', () => {
  const root = 'cloud://recipe-dev-d9gsv38lz1ade2114.7265-recipe-dev-d9gsv38lz1ade2114-1404757921/recipe-covers/'
  for (const env of ['develop', 'trial', 'release']) {
    assert.equal(getCoverUrl('ai-generated/菜谱.jpg', env), root + 'ai-generated/菜谱.jpg')
    assert.equal(getCoverUrl('steps/test-recipe/step_2.jpg', env), root + 'steps/test-recipe/step_2.jpg')
  }
  assert.equal(getCoverUrl('ai-generated/../other.jpg', 'develop'), '')
  assert.equal(getCoverUrl('steps/../step_2.jpg', 'release'), '')
  assert.equal(getCoverUrl('ai-generated/菜谱.jpg'), '')
})

test('共用图组件复用云图、合并下载并忽略已经切走的请求', async () => {
  const originalComponent = global.Component
  const originalWx = global.wx
  let component
  let request
  let completeCloudDownload
  const cloudRequests = []
  const settleDownload = () => new Promise(resolve => setImmediate(resolve))
  let aborted = false
  try {
    global.Component = definition => { component = definition }
    global.wx = {
      cloud: {
        downloadFile({ fileID }) {
          assert.ok(fileID.startsWith('cloud://'))
          cloudRequests.push(fileID)
          return new Promise(resolve => { completeCloudDownload = resolve })
        }
      },
      downloadFile(options) {
        request = options
        return { abort() { aborted = true } }
      }
    }
    require('../miniprogram/components/recipe-cover/index')
    const src = 'http://192.168.1.81:8088/ai-generated/example.jpg'
    const cover = {
      ...component.methods,
      data: { ...component.data, src },
      setData(update) { Object.assign(this.data, update) }
    }
    const event = url => ({ currentTarget: { dataset: { url } } })
    assert.equal(cover.data.loaded, false)
    cover.imageFailed(event(src))
    assert.equal(request.url, src)
    cover.imageLoaded(event(src))
    assert.equal(cover.data.loaded, false)
    request.success({ statusCode: 200, tempFilePath: '/tmp/example.jpg' })
    cover.imageLoaded(event('/tmp/example.jpg'))
    assert.equal(cover.data.loaded, true)
    cover.imageFailed(event('/tmp/example.jpg'))
    assert.equal(cover.data.loaded, false)
    assert.equal(cover.data.failed, true)

    cover.data.src = src
    component.properties.src.observer.call(cover, cover.data.src)
    cover.imageFailed(event(src))
    const previous = request
    const newSrc = 'https://example.com/next.jpg'
    cover.data.src = newSrc
    component.properties.src.observer.call(cover, cover.data.src)
    assert.equal(aborted, true)
    previous.success({ statusCode: 200, tempFilePath: '/tmp/stale.jpg' })
    cover.imageLoaded(event(src))
    assert.equal(cover.data.downloadedSrc, '')
    assert.equal(cover.data.loaded, false)
    cover.imageLoaded(event(newSrc))
    assert.equal(cover.data.loaded, true)

    const cloudSrc = getCoverUrl('ai-generated/aquatic_hong-shao-yu-tou.jpg', 'develop')
    let onVisibilityChange
    const observer = {
      relativeToViewport() { return this },
      observe(selector, callback) { onVisibilityChange = callback },
      disconnect() {}
    }
    cover.createIntersectionObserver = () => observer
    cover.data.lazy = true
    cover.data.src = cloudSrc
    component.properties.src.observer.call(cover, cloudSrc)
    assert.equal(cover.data.cloudSource, true)
    component.lifetimes.ready.call(cover)
    onVisibilityChange({ intersectionRatio: 0 })
    assert.equal(completeCloudDownload, undefined)
    onVisibilityChange({ intersectionRatio: 1 })
    const anotherCover = {
      ...component.methods,
      data: { ...component.data, src: cloudSrc, cloudSource: true },
      setData: cover.setData
    }
    component.lifetimes.ready.call(anotherCover)
    await settleDownload()
    assert.deepEqual(cloudRequests, [cloudSrc])
    completeCloudDownload({ tempFilePath: '/tmp/cloud.jpg' })
    await settleDownload()
    assert.equal(cover.data.downloadedSrc, '/tmp/cloud.jpg')
    assert.equal(anotherCover.data.downloadedSrc, '/tmp/cloud.jpg')
    cover.imageLoaded(event('/tmp/cloud.jpg'))
    assert.equal(cover.data.loaded, true)

    component.properties.src.observer.call(cover, cloudSrc)
    onVisibilityChange({ intersectionRatio: 1 })
    await settleDownload()
    assert.deepEqual(cloudRequests, [cloudSrc])
    assert.equal(cover.data.downloadedSrc, '/tmp/cloud.jpg')

    cover.imageFailed(event('/tmp/cloud.jpg'))
    anotherCover.imageFailed(event('/tmp/cloud.jpg'))
    await settleDownload()
    assert.deepEqual(cloudRequests, [cloudSrc, cloudSrc])
    completeCloudDownload({ tempFilePath: '/tmp/cloud-retry.jpg' })
    await settleDownload()
    assert.equal(cover.data.downloadedSrc, '/tmp/cloud-retry.jpg')
    assert.equal(anotherCover.data.downloadedSrc, '/tmp/cloud-retry.jpg')
    anotherCover.imageFailed(event('/tmp/cloud-retry.jpg'))
    assert.equal(anotherCover.data.failed, true)

    const stepSrc = getCoverUrl('steps/aquatic_hong-shao-yu-tou/step_1.jpg', 'develop')
    cover.data.src = stepSrc
    component.properties.src.observer.call(cover, stepSrc)
    onVisibilityChange({ intersectionRatio: 1 })
    await settleDownload()
    assert.equal(cloudRequests.at(-1), stepSrc)
    cover.data.src = newSrc
    component.properties.src.observer.call(cover, newSrc)
    completeCloudDownload({ tempFilePath: '/tmp/stale-cloud.jpg' })
    await settleDownload()
    assert.equal(cover.data.cloudSource, false)
    assert.equal(cover.data.downloadedSrc, '')
  } finally {
    global.Component = originalComponent
    global.wx = originalWx
  }
})

test('菜谱 ID 唯一，原有菜谱和新轻食的食材及做法完整', () => {
  assert.equal(recipes.filter(recipe => !recipe.light).length, 364)
  assert.equal(recipes.filter(recipe => recipe.light).length, 26)
  assert.equal(new Set(recipes.map(recipe => recipe.id)).size, recipes.length)
  for (const recipe of recipes) {
    assert.ok(recipe.minutes > 0 && recipe.servings > 0)
    assert.ok(Number.isInteger(recipe.calories) && recipe.calories > 0)
    assert.ok(recipe.tips.every(tip => typeof tip === 'string' && tip.trim()))
    if (recipe.light) {
      assert.ok(recipe.sourcePath.startsWith('https://github.com/Jiayu-zheng1/EveryDay_Food/'))
      assert.ok(recipe.nutrition.servingGrams > 0)
      for (const value of Object.values(recipe.nutrition)) assert.ok(Number.isFinite(value) && value >= 0)
    } else {
      assert.ok(recipe.coverPath.startsWith('ai-generated/') && recipe.sourcePath.startsWith('dishes/'))
    }
    assert.equal(recipe.image, undefined)
    for (const group of getRecipe(recipe.id).groups) {
      for (const item of group.items) assert.ok(ingredients[item.id] && item.name && item.quantity)
    }
    assert.ok(recipe.steps.every(([title, body]) => (title || recipe.light) && body))
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
  // 糖拌西红柿归类修正后也进入素菜池，两道 15 分钟内、只用番茄的菜都成立
  assert.deepEqual(filtered.map(item => item.id).sort(), [tomatoEggs, 'other_tang-ban-xi-hong-shi'].sort())
  assert.equal(getRecipe(tomatoEggs, selection).missingItems.length, 0)
})

test('只差一样至少要有一种主料，缺大蒜仍如实提示', () => {
  const cucumberDish = 'vegetable_dish_liang-ban-huang-gua'
  const pepperDish = 'other_hu-pi-qing-jiao'
  const pepper = getIngredientOptions().find(item => item.name === '青椒').id
  const onlyGarlic = matchRecipes(['garlic'])
  assert.equal(onlyGarlic.find(item => item.id === cucumberDish).missingText, '黄瓜')
  assert.equal(onlyGarlic.find(item => item.id === pepperDish).missingText, '青椒')
  assert.ok(groupFridgeMatches(onlyGarlic).almost.every(item => ![cucumberDish, pepperDish].includes(item.id)))

  for (const [main, id] of [['cucumber', cucumberDish], [pepper, pepperDish]]) {
    assert.equal(groupFridgeMatches(matchRecipes([main])).almost.find(item => item.id === id).missingText, '大蒜')
    assert.ok(groupFridgeMatches(matchRecipes([main, 'garlic'])).ready.some(item => item.id === id))
  }
})

test('常用食材别名、辅料和蛋清在库存判断与采购中使用同一规则', () => {
  assert.equal(searchIngredientOptions('西蓝花')[0].id, 'broccoli')
  assert.equal(searchIngredientOptions('蒜片')[0].id, 'garlic')
  assert.equal(searchIngredientOptions('猪五花肉')[0].id, 'porkBelly')
  const rawRice = searchIngredientOptions('米')[0].id
  assert.equal(searchIngredientOptions('大米')[0].id, rawRice)
  assert.notEqual(rawRice, searchIngredientOptions('熟米饭')[0].id)

  const broccoliDish = getRecipe(recipes.find(item => item.name === '蚝油三鲜菇').id, ['broccoli'])
  assert.ok(broccoliDish.groups[0].items.some(item => item.id === 'broccoli' && !item.missing))
  const stirFry = getRecipe(recipes.find(item => item.name === '宫保鸡丁').id)
  assert.ok(stirFry.groups.find(group => group.key === 'pantry').items.some(item => item.id === 'soy'))
  const onlySeasonings = ['大蒜', '花椒', '香叶', '黑胡椒']
  assert.deepEqual(groupFridgeMatches(matchRecipes(onlySeasonings)), { ready: [], almost: [] })

  const white = searchIngredientOptions('蛋清')[0].id
  const raw = recipes.find(item => item.required.some(([id, , name]) => id === white || name === '蛋清'))
  const { getPurchaseItems } = require('../miniprogram/shopping')
  const recipe = getRecipe(raw.id, ['egg'])
  assert.ok(recipe.groups[0].items.some(item => item.id === white && !item.missing))
  assert.ok(getPurchaseItems(recipe, ['egg']).every(item => item.id !== white))
  assert.ok(getPurchaseItems(getRecipe(tomatoEggs), [white]).some(item => item.id === 'egg'))
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

test('轻食列表按耗时和真实库存筛选，缺料可沿用采购流程', () => {
  const id = 'light_chicken-brown-rice'
  const recipe = getRecipe(id)
  const stock = recipe.required.map(([ingredientId]) => ingredientId)
  assert.ok(stock.includes(searchIngredientOptions('熟糙米饭')[0].id))
  const almost = matchRecipes(stock.slice(0, 1), { lightOnly: true, maxMinutes: 30 })
    .find(item => item.id === id)
  assert.equal(almost.missingCount, 3)
  assert.equal(almost.nutrition.protein, recipe.nutrition.protein)
  const { getPurchaseItems } = require('../miniprogram/shopping')
  assert.ok(getPurchaseItems(getRecipe(id, stock.slice(0, 1)), stock.slice(0, 1))
    .some(item => item.name === '糙米饭' && item.quantity === '150克（熟）'))

  const originalComponent = global.Component
  const originalWx = global.wx
  try {
    global.wx = { getAccountInfoSync: () => ({ miniProgram: { envVersion: 'develop' } }) }
    assert.ok(getRecipe(id).steps.every(step => step.body && !step.image))
    let component
    global.Component = options => { component = options }
    require('../miniprogram/pages/meals/index')
    const page = {
      ...component.methods,
      data: { ...component.data, inventory: stock, inventoryReady: true },
      setData(update) { Object.assign(this.data, update) }
    }
    component.lifetimes.attached.call(page)
    assert.equal(page.data.recipes.length, 26)
    assert.equal(page.data.planPreviewLimit, 2)
    assert.equal(page.data.plans.length, 6)
    assert.equal(page.data.showAllPlans, false)
    page.togglePlans()
    assert.equal(page.data.showAllPlans, true)
    page.togglePlans()
    assert.equal(page.data.showAllPlans, false)
    page.toggleQuickOnly()
    assert.ok(page.data.recipes.length < 26)
    assert.ok(page.data.recipes.every(item => item.minutes <= 30))
    assert.ok(page.data.plans.every(plan => plan.minutes <= 30))
    page.toggleReadyOnly()
    assert.ok(page.data.recipes.some(item => item.id === id))
    assert.ok(page.data.recipes.every(item => item.missingCount === 0))
    assert.ok(page.data.plans.every(plan => plan.missingCount === 0))
    page.data.inventory = []
    component.observers['inventory, inventoryReady'].call(page, [], true)
    assert.equal(page.data.readyOnly, false)
    assert.ok(page.data.recipes.length)
  } finally {
    global.Component = originalComponent
    global.wx = originalWx
  }
})

test('首页轻食 5 到 60 分钟有效，过期后换菜并优先用上冰箱食材', () => {
  const now = 1000000
  const minute = 60000
  const ids = ['light_grilled-chicken-salad', 'light_chicken-brown-rice']
  const stock = [...new Set(ids.flatMap(id => getRecipe(id).required.map(([ingredient]) => ingredient)))]

  const first = rotateLightInspiration(stock, null, now, () => 0)
  assert.equal(first.recipe.id, ids[0])
  assert.equal(first.recipe.missingCount, 0)
  assert.equal(first.rotation.expiresAt, now + 5 * minute)
  const held = rotateLightInspiration(stock, first.rotation, now + 4 * minute, () => 0.9999)
  assert.equal(held.recipe.id, first.recipe.id)
  assert.equal(held.rotation, first.rotation)
  const next = rotateLightInspiration(stock, first.rotation, first.rotation.expiresAt, () => 0)
  assert.notEqual(next.recipe.id, first.recipe.id)
  assert.equal(next.recipe.missingCount, 0)
  assert.equal(rotateLightInspiration([], null, now, () => 0.9999).rotation.expiresAt, now + 60 * minute)
})

test('轻食搭配按各道菜检查缺料，配米饭只作为搭配建议', () => {
  assert.equal(getMealPlans([]).length, 6)
  const stock = ['egg', 'broccoli', 'garlic']
  const [ready] = getMealPlans(stock, { readyOnly: true, maxMinutes: 30 })
  assert.equal(ready.id, 'egg-broccoli')
  assert.equal(ready.serveWithRice, true)
  assert.equal(ready.missingText, '')
  assert.equal(getMealPlans(stock, { readyOnly: true, maxMinutes: 20 }).length, 0)
  const almost = getMealPlans(['egg', 'broccoli']).find(plan => plan.id === ready.id)
  assert.equal(almost.missingText, '大蒜')

  const lunch = matchRecipes(['chicken', 'pepper', 'onion'], { lightOnly: true })
    .find(recipe => recipe.id === 'light_chicken-brown-rice')
  assert.equal(lunch.missingText, '糙米饭')
})

test('智能推荐遵守限时和食材条件，并提示未识别的需求', () => {
  const selected = ['egg', 'tomato']
  const prefs = { mode: 'stock', maxMinutes: 15, people: 2, taste: 'mild', notes: '想吃鸡蛋，不要香菜，适合孩子吃' }
  const result = recommendRecipes(selected, prefs)
  assert.deepEqual(result.ignored, ['适合孩子吃'])
  assert.equal(result.recipes.length, 4)
  assert.equal(result.recipes[0].id, tomatoEggs)
  assert.ok(result.recipes.every(recipe => recipe.minutes <= 15 && !recipe.missingCount))
  for (const recipe of result.recipes) {
    const items = getRecipe(recipe.id).groups.flatMap(group => group.items)
    assert.ok(items.some(item => item.id === 'egg'))
    assert.ok(items.every(item => !item.name.includes('香菜')))
  }
  assert.deepEqual(recommendRecipes(selected, { ...prefs, notes: '想吃鸡蛋，不要鸡蛋' }).recipes, [])
  const pick = { ...prefs, mode: 'pick' }
  const first = recommendRecipes(selected, pick, () => 0).recipes.map(recipe => recipe.id)
  const last = recommendRecipes(selected, pick, () => 0.99).recipes.map(recipe => recipe.id)
  assert.equal(new Set(first).size, 4)
  assert.notDeepEqual(first, last)
})

test('菜谱页分页，采购保留原用量，旧收藏映射到新菜谱', () => {
  const storage = new Map([['fridge-ingredient-ids-v1', ['potato', 'potato', 'unknown']]])
  let clipboard
  let navigationTitle
  let navigationUrl
  let navigationBackCount = 0
  let pageStack = [{ route: 'pages/home/index' }, { route: 'pages/fridge-matches/index' }]
  let pendingModal
  let failWrites = false
  global.wx = {
    getStorageSync: key => storage.get(key),
    setStorageSync: (key, value) => {
      if (failWrites) throw new Error('storage unavailable')
      storage.set(key, value)
    },
    setClipboardData: ({ data }) => { clipboard = data },
    showToast: () => {},
    showModal: options => { pendingModal = options },
    navigateTo: ({ url }) => { navigationUrl = url },
    navigateBack: () => { navigationBackCount++ },
    setNavigationBarTitle: ({ title }) => { navigationTitle = title },
    pageScrollTo: ({ scrollTop, selector }) => {
      if (selector) assert.ok(['#method', '#recommend-results', '#ingredient-picker'].includes(selector))
      else assert.equal(scrollTop, 0)
    }
  }
  let registered
  global.getCurrentPages = () => pageStack
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
  require('../miniprogram/pages/recommend/index')
  const recommend = createPage(registered)
  home.openRecommendations()
  assert.equal(navigationUrl, '/pages/recommend/index')
  recommend.onShow()
  assert.deepEqual(recommend.data.inventoryPreview.map(item => item.id), ['potato'])
  recommend.openFridge()
  assert.equal(navigationUrl, '/pages/fridge/index')
  recommend.setPreference({ currentTarget: { dataset: { key: 'maxMinutes', value: '15' } } })
  recommend.changePeople({ currentTarget: { dataset: { change: 1 } } })
  recommend.runRecommendations()
  assert.ok(recommend.data.recommendations.length)
  assert.ok(recommend.data.recommendations.every(item => item.minutes <= 15))
  storage.set('fridge-ingredient-ids-v1', ['egg', 'broccoli'])
  recommend.onShow()
  assert.deepEqual(recommend.data.inventoryPreview.map(item => item.id), ['egg', 'broccoli'])
  assert.equal(recommend.data.people, 3)
  assert.equal(recommend.data.hasRun, false)
  recommend.restorePreferences()
  assert.equal(recommend.data.people, 2)
  assert.equal(recommend.data.maxMinutes, 30)
  storage.set('fridge-ingredient-ids-v1', ['potato', 'potato', 'unknown'])
  require('../miniprogram/pages/fridge/index')
  const fridge = createPage(registered)
  require('../miniprogram/pages/fridge-matches/index')
  const fridgeMatches = createPage(registered)
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
  const evening = new Date(2026, 10, 16, 18)
  home.updateSelection(previewStock, evening)
  const featured = home.data.featured.id
  assert.equal(home.data.homeMatches.some(recipe => recipe.id === featured), false)
  home.updateSelection(previewStock, evening)
  assert.equal(home.data.featured.id, featured)
  home.updateHomeMeal([], new Date(2026, 10, 16, 9, 59))
  assert.equal(home.data.quickRecipe.category, '早餐')
  assert.match(home.data.greeting.quoteText, /早餐/)
  const breakfast = home.data.quickRecipe.id
  home.updateHomeMeal([], new Date(2026, 10, 16, 10))
  assert.notEqual(home.data.quickRecipe.id, breakfast)
  assert.match(home.data.greeting.quoteText, /午饭/)
  home.updateHomeMeal([], new Date(2026, 10, 16, 16))
  assert.match(home.data.greeting.quoteText, /晚饭/)
  home.updateSelection(['potato'])
  home.openFridgeMatches()
  assert.equal(navigationUrl, '/pages/fridge-matches/index')
  assert.equal(home.data.view, 'match')
  fridgeMatches.onShow()
  assert.equal(fridgeMatches.data.groupId, 'almost')
  assert.deepEqual(fridgeMatches.data.inventoryPreview.map(item => item.name), ['土豆'])
  fridgeMatches.openFridge()
  assert.equal(navigationUrl, '/pages/fridge/index')
  pageStack = [{ route: 'pages/fridge/index' }, { route: 'pages/fridge-matches/index' }]
  fridgeMatches.openFridge()
  assert.equal(navigationBackCount, 1)
  const changeGroup = (page, id) => page.changeGroup({ currentTarget: { dataset: { id } } })
  changeGroup(fridgeMatches, 'ready')
  assert.equal(fridgeMatches.data.total, 0)
  home.showView('match')
  home.updateSelection(['broccoli', 'cucumber', 'potato'])
  assert.equal(home.data.homeMatches.length, 2)
  assert.ok(home.data.homeMatches.some(recipe => recipe.missingCount === 1 && recipe.missingText))
  const fullStock = ['egg', 'tomato', 'potato', 'tofu', 'garlic', 'scallion', 'ginger', 'pork', 'carrot', 'soy', 'rice', 'noodles', 'cucumber', 'broccoli', 'chicken', 'pepper', 'shrimp', 'flour', 'cabbage', 'onion']
  home.updateSelection(fullStock)
  assert.deepEqual(home.data.homeMatches.map(recipe => recipe.missingCount), [0, 0])
  assert.equal(home.data.suggestedRecipes.length, 2)
  assert.ok(home.data.suggestedRecipes.every(recipe => recipe.minutes <= 20))
  const shown = [home.data.featured, ...home.data.homeMatches, ...home.data.suggestedRecipes]
  assert.equal(new Set(shown.map(recipe => recipe.id)).size, shown.length)
  const matches = matchRecipes(home.data.selected)
  const groups = groupFridgeMatches(matches)
  for (const suggestion of home.data.suggestedRecipes) {
    assert.equal(suggestion.missingCount, matches.find(recipe => recipe.id === suggestion.id).missingCount)
  }
  const { readInventory, saveInventory } = require('../miniprogram/inventory')
  saveInventory(fullStock)
  fridgeMatches.onShow()
  assert.equal(fridgeMatches.data.groupId, 'ready')
  assert.equal(fridgeMatches.data.inventoryPreview.length, 3)
  assert.equal(fridgeMatches.data.extraIngredients, fullStock.length - 3)
  assert.equal(fridgeMatches.data.total, groups.ready.length)
  assert.ok(fridgeMatches.data.recipes.every(recipe => recipe.missingCount === 0))
  changeGroup(fridgeMatches, 'almost')
  assert.equal(fridgeMatches.data.recipes.length, 24)
  fridgeMatches.loadMore()
  assert.equal(fridgeMatches.data.recipes.length, groups.almost.length)
  assert.ok(fridgeMatches.data.recipes.every(recipe => recipe.missingCount === 1))
  const loadedMatches = fridgeMatches.data.recipes
  fridgeMatches.onShow()
  assert.equal(fridgeMatches.data.recipes, loadedMatches)
  saveInventory(['potato'])
  fridgeMatches.onShow()
  assert.equal(fridgeMatches.data.total, 1)
  assert.deepEqual(fridgeMatches.data.inventoryPreview.map(item => item.id), ['potato'])
  assert.equal(fridgeMatches.data.extraIngredients, 0)
  assert.equal(fridgeMatches.data.groupId, 'almost')
  home.onShow()
  home.openFridge()
  assert.equal(navigationUrl, '/pages/fridge/index')
  assert.equal(home.data.view, 'match')
  fridge.onShow()
  assert.equal(fridge.data.visibleIngredients[0].name, '番茄')
  assert.deepEqual(fridge.data.recipePreview.map(item => item.name), ['拔丝土豆'])
  assert.equal(fridge.data.ingredientPickerOpen, false)
  fridge.openIngredientPicker()
  assert.equal(fridge.data.ingredientPickerOpen, true)
  fridge.closeIngredientPicker()
  assert.equal(fridge.data.ingredientPickerOpen, false)
  fridge.selectIngredientGroup({ currentTarget: { dataset: { index: 1 } } })
  assert.equal(fridge.data.visibleIngredients.find(item => item.id === 'potato').checked, true)
  fridge.searchIngredients({ detail: { value: '青蟹' } })
  assert.equal(fridge.data.visibleIngredients[0].name, '青蟹')
  fridge.clearIngredientSearch()
  assert.equal(fridge.data.visibleIngredients[0].id, 'potato')
  const toggleEgg = () => fridge.toggleIngredient({ currentTarget: { dataset: { id: 'egg' } } })
  failWrites = true
  toggleEgg()
  assert.deepEqual(fridge.data.selected, ['potato'])
  failWrites = false
  toggleEgg()
  assert.deepEqual(readInventory(), ['potato', 'egg'])
  home.onShow()
  assert.deepEqual(home.data.selected, ['potato', 'egg'])
  assert.equal(home.data.fridgeSummary.count, 2)
  fridge.clearInventory()
  pendingModal.success({ confirm: false })
  assert.deepEqual(readInventory(), ['potato', 'egg'])
  fridge.clearInventory()
  pendingModal.success({ confirm: true })
  assert.deepEqual(readInventory(), [])
  assert.equal(fridge.data.hasMatches, false)
  saveInventory(['potato'])
  home.onShow()
  home.switchView({ currentTarget: { dataset: { view: 'library' } } })
  assert.equal(navigationTitle, '菜谱库')
  const previousLightId = home.data.lightInspiration.id
  home.lightRotation = { ...home.lightRotation, expiresAt: 0 }
  home.showView('match')
  assert.notEqual(home.data.lightInspiration.id, previousLightId)
  home.onShow()
  assert.equal(home.data.lightInspiration.id, home.lightRotation.id)
  home.showView('library')
  assert.equal(home.data.results.length, recipes.length)
  assert.equal(home.data.libraryCards.length, 24)
  home.loadMoreRecipes()
  assert.equal(home.data.libraryCards.length, 48)
  home.changeCategory({ detail: { value: '1' } })
  home.searchLibrary({ detail: { value: '不存在的菜谱' } })
  assert.equal(home.data.libraryCards.length, 0)
  home.switchView({ currentTarget: { dataset: { view: 'library' } } })
  assert.equal(home.data.librarySearch, '不存在的菜谱')
  home.switchView({ currentTarget: { dataset: { view: 'meals' } } })
  home.switchView({ currentTarget: { dataset: { view: 'library' } } })
  assert.deepEqual([home.data.librarySearch, home.data.categoryIndex, home.data.librarySearchFocused], ['', 0, false])
  assert.equal(home.data.results.length, recipes.length)
  assert.equal(home.data.libraryCards.length, 24)
  home.showView('match')
  home.openAllRecipes()
  assert.equal(home.data.results.length, recipes.length)
  assert.equal(home.data.librarySearchFocused, false)
  home.changeCategory({ detail: { value: '1' } })
  assert.ok(home.data.results.length && home.data.results.every(recipe => recipe.category === '荤菜'))
  home.loadMoreRecipes()
  const libraryCards = home.data.libraryCards
  home.openFridgeMatches()
  assert.equal(navigationUrl, '/pages/fridge-matches/index')
  assert.equal(home.data.view, 'library')
  home.onShow()
  assert.equal(home.data.categoryIndex, 1)
  assert.equal(home.data.libraryCards, libraryCards)
  home.updateSelection([])
  home.openFridgeMatches()
  assert.equal(navigationUrl, '/pages/fridge/index')
  assert.equal(home.data.view, 'library')
  fridge.onShow()
  toggleEgg()
  home.onShow()
  assert.deepEqual(home.data.selected, ['potato', 'egg'])
  assert.equal(home.data.libraryCards.length, libraryCards.length)
  toggleEgg()
  home.onShow()
  home.showView('library')
  home.changeCategory({ detail: { value: '0' } })
  assert.equal(home.data.results.length, recipes.length)
  home.changeCategory({ detail: { value: '1' } })
  home.showView('match')
  home.openRecipeSearch()
  assert.equal(home.data.view, 'library')
  assert.equal(home.data.librarySearchFocused, true)
  assert.equal(home.data.results.length, recipes.length)
  assert.deepEqual([home.data.librarySearch, home.data.categoryIndex], ['', 0])
  home.searchLibrary({ detail: { value: '咖喱炒蟹' } })
  assert.equal(home.data.results[0].id, 'aquatic_ga-li-chao-xie')
  assert.ok(home.data.results[0].missingCount > 0)
  home.blurLibrarySearch()
  assert.equal(home.data.librarySearchFocused, false)

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
  assert.equal(shopping.data.items[0].expanded, false)
  shopping.toggleDetails({ currentTarget: { dataset: { key: shopping.data.items[0].key } } })
  assert.equal(shopping.data.items[0].expanded, true)
  shopping.onShow()
  assert.equal(shopping.data.items[0].expanded, true)
  fridge.onShow()
  assert.equal(fridge.data.shoppingCount, 1)
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
  records.onLoad({ type: 'history' })
  records.onShow()
  assert.equal(records.data.hasHistory, true)
  records.clearHistory()
  pendingModal.success({ confirm: false })
  assert.equal(records.data.hasHistory, true)
  records.clearHistory()
  pendingModal.success({ confirm: true })
  assert.equal(records.data.hasHistory, false)
  assert.deepEqual(records.data.recipes, [])
  home.onShow()
  assert.deepEqual(home.data.history, [])
  assert.deepEqual(home.data.cooked.map(item => item.id), [tomatoEggs])
  assert.deepEqual(home.data.favorites.map(item => item.id), [tomatoEggs])

  detail.toggleSaved()
  records.onLoad({ type: 'favorites' })
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
  assert.equal(pick.id, 'yang-soup')

  // 冰箱里有羊肉汤时优先用冰箱里的；元宵推汤圆
  const yuanXiao = festivalOf(new Date(2027, 1, 20))
  const tangyuan = { id: 'tangyuan', name: '速冻汤圆', category: '甜品', required: ['riceBall'] }
  assert.equal(festivalRecipe(yuanXiao, [], [], [tangyuan]).id, 'tangyuan')

  // 没有应节菜的节日（端午）不影响常规推荐
  assert.equal(festivalRecipe(festivalOf(new Date(2026, 5, 19)), ready, [], all), null)
})

test('首页问候区按时段问候、按日期轮换每日一句', () => {
  const { greetingInfo } = require('../miniprogram/home-greeting')
  const dongZhiNight = greetingInfo(new Date(2026, 11, 22, 18, 30))
  assert.equal(dongZhiNight.text, '晚上好')
  assert.equal(dongZhiNight.festivalName, '冬至')
  assert.equal(dongZhiNight.emoji, '🌆')
  assert.equal(dongZhiNight.quoteText, '冬至不端饺子碗，冻掉耳朵没人管')
  assert.equal(dongZhiNight.dateText, '12月22日 星期二')

  const normal = greetingInfo(new Date(2026, 10, 15, 9), 3)
  assert.equal(normal.text, '上午好')
  assert.equal(normal.emoji, '🌤️')
  assert.equal(normal.festivalName, '')
  assert.ok(normal.quoteText)

  // 同一天刷新不变，第二天换一句；空冰箱和深夜用专属文案
  const noon = new Date(2026, 10, 16, 12)
  assert.equal(greetingInfo(noon).emoji, '☀️')
  assert.equal(greetingInfo(new Date(2026, 10, 16, 7)).emoji, '🌅')
  assert.equal(greetingInfo(new Date(2026, 10, 16, 23)).emoji, '🌙')
  assert.equal(greetingInfo(noon, 3).quoteText, greetingInfo(new Date(2026, 10, 16, 13), 3).quoteText)
  assert.notEqual(greetingInfo(noon, 3).quoteText, greetingInfo(new Date(2026, 10, 17, 12), 3).quoteText)
  assert.ok(greetingInfo(noon, 0).quoteText.includes('冰箱'))
  assert.ok(greetingInfo(new Date(2026, 10, 16, 23), 3).quoteText.includes('深夜'))
})

test('采购按同一食材合并，兼容计量求和，原用量和菜名可以展开查看', () => {
  const originalWx = global.wx
  let stored = {
    inventory: [],
    shopping: [
      { recipeId: 'tomato-eggs', id: 'egg', quantity: '2个' },
      { recipeId: 'egg-fried-rice', id: 'egg', quantity: '1 个' },
      { recipeId: 'tomato-eggs', id: 'garlic', quantity: '适量' },
      { recipeId: 'egg-fried-rice', id: 'vibe-e8929ce78987', quantity: '2瓣' },
      { recipeId: 'egg-fried-rice', id: 'porkBelly', quantity: '0.5 kg' },
      { recipeId: 'tomato-eggs', id: 'porkBelly', quantity: '200 克' }
    ]
  }
  try {
    global.wx = {
      getStorageSync: () => stored,
      setStorageSync(key, value) { stored = value }
    }
    const { listShopping, removeShoppingItem } = require('../miniprogram/shopping')
    const items = listShopping()
    assert.equal(items.length, 3)
    const eggs = items.find(item => item.key === 'egg')
    assert.equal(eggs.quantity, '3 个')
    assert.deepEqual(eggs.details.map(({ title, quantity }) => [title, quantity]), [
      [getRecipe('tomato-eggs').name, '2个'],
      [getRecipe('egg-fried-rice').name, '1 个']
    ])
    const garlic = items.find(item => item.key === 'garlic')
    assert.equal(garlic.separateQuantities, true)
    assert.deepEqual(garlic.details.map(item => item.quantity), ['适量', '2瓣'])
    assert.equal(items.find(item => item.key === 'porkBelly').quantity, '700 克')
    assert.equal(removeShoppingItem(garlic.key, true), true)
    const { readKitchen } = require('../miniprogram/inventory')
    assert.deepEqual(readKitchen().inventory, ['garlic'])
    assert.equal(readKitchen().shopping.length, 4)
    assert.equal(removeShoppingItem(garlic.key, true), false)
  } finally {
    global.wx = originalWx
  }
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

test('菜谱分类不再堆积在「其他」，长耗时菜拆出等待时间', () => {
  assert.equal(recipes.filter(recipe => recipe.category === '其他').length, 0)
  const slow = recipes.filter(recipe => recipe.waitMinutes)
  assert.equal(slow.length, 28)
  const jiuNiang = recipes.find(recipe => recipe.name === '酒酿醪糟')
  assert.equal(jiuNiang.minutes, 30)
  assert.equal(jiuNiang.totalMinutes, 2880)
  assert.equal(jiuNiang.waitMinutes, 2850)
  assert.ok(recipes.every(recipe => recipe.minutes > 0 && recipe.minutes <= 180))
  assert.ok(slow.every(recipe => recipe.totalMinutes === recipe.minutes + recipe.waitMinutes))
  const detail = getRecipe(jiuNiang.id)
  assert.equal(detail.waitText, '2 天')
  assert.equal(matchRecipes([]).find(recipe => recipe.id === jiuNiang.id).minutes, 30)
})

test('首页随机吃入口跳转到随机页，不再提示开发中', () => {
  let navigationUrl
  const originalWx = global.wx
  global.wx = {
    navigateTo: ({ url }) => { navigationUrl = url },
    showToast: () => { throw new Error('不应再提示功能开发中') }
  }
  let registered
  const originalPage = global.Page
  global.Page = page => { registered = page }
  delete require.cache[require.resolve('../miniprogram/pages/home/index')]
  require('../miniprogram/pages/home/index')
  try {
    registered.openSurprise()
    assert.equal(navigationUrl, '/pages/surprise/index')
  } finally {
    global.wx = originalWx
    global.Page = originalPage
  }
})

test('随机吃优先从冰箱能做的菜里抽，换一道避开当前菜', () => {
  const originalWx = global.wx
  const originalPage = global.Page
  const storage = new Map([
    ['recipe-kitchen-v1', { inventory: ['tomato', 'egg'], shopping: [] }]
  ])
  global.wx = {
    getStorageSync: key => storage.get(key),
    setStorageSync: (key, value) => { storage.set(key, value) },
    setNavigationBarColor: () => {},
    setBackgroundColor: () => {},
    showToast: () => {}
  }
  let registered
  global.Page = page => { registered = page }
  delete require.cache[require.resolve('../miniprogram/pages/surprise/index')]
  require('../miniprogram/pages/surprise/index')
  try {
    const page = { ...registered, data: JSON.parse(JSON.stringify(registered.data)) }
    page.setData = function (update) { Object.assign(this.data, update) }
    page.onLoad()
    assert.ok(page.data.recipe)
    assert.equal(page.data.poolLabel, '冰箱食材齐全')
    assert.match(page.data.reason, /冰箱里的/)
    assert.equal(page.data.recipe.missingCount, undefined)
    const first = page.data.recipe.id
    page.pick()
    assert.ok(page.data.recipe.id !== first || page.inventoryKey === '')
  } finally {
    global.wx = originalWx
    global.Page = originalPage
  }
})

test('口味偏好写入本地存储，重新加载后仍生效', () => {
  const originalWx = global.wx
  const storage = new Map()
  global.wx = {
    getStorageSync: key => (storage.has(key) ? structuredClone(storage.get(key)) : ''),
    setStorageSync: (key, value) => storage.set(key, structuredClone(value))
  }
  const path = require.resolve('../miniprogram/preferences')
  delete require.cache[path]
  try {
    const preferences = require('../miniprogram/preferences')
    preferences.savePreferences({ taste: 'spicy', mode: 'light', people: 3, notes: '不要香菜', maxMinutes: 15 })
    delete require.cache[path]
    const reloaded = require('../miniprogram/preferences')
    assert.deepEqual(reloaded.readPreferences(), {
      mode: 'light', maxMinutes: 15, people: 3, taste: 'spicy', notes: '不要香菜'
    })
    assert.match(reloaded.preferenceSummary(), /偏香辣/)
    assert.match(reloaded.preferenceSummary(), /不要香菜/)
    reloaded.resetPreferences()
    assert.equal(reloaded.readPreferences().taste, 'any')
    assert.equal(reloaded.readPreferences().notes, '')
  } finally {
    delete require.cache[path]
    global.wx = originalWx
  }
})

test('忌口解析为食材 id 后从菜谱库和随机吃里过滤', () => {
  const originalWx = global.wx
  const originalPage = global.Page
  const avoid = avoidIdsFromNotes('不要香菜、不吃葱')
  assert.ok(avoid.includes('cilantro'))
  assert.ok(avoid.includes('scallion'))
  const eggDish = matchRecipes([]).find(recipe => recipe.required.includes('egg'))
  assert.ok(eggDish)
  assert.ok(!matchRecipes([], { avoidIds: ['egg'] }).some(recipe => recipe.id === eggDish.id))

  const storage = new Map([
    ['recipe-kitchen-v1', { inventory: ['tomato', 'egg'], shopping: [] }],
    ['recipe-taste-preferences-v1', { mode: 'stock', maxMinutes: 30, people: 2, taste: 'any', notes: '不要鸡蛋' }]
  ])
  global.wx = {
    getStorageSync: key => (storage.has(key) ? structuredClone(storage.get(key)) : ''),
    setStorageSync: (key, value) => storage.set(key, structuredClone(value)),
    setNavigationBarColor: () => {},
    setBackgroundColor: () => {},
    showToast: () => {}
  }
  let registered
  global.Page = page => { registered = page }
  delete require.cache[require.resolve('../miniprogram/pages/surprise/index')]
  require('../miniprogram/pages/surprise/index')
  try {
    const page = { ...registered, data: JSON.parse(JSON.stringify(registered.data)) }
    page.setData = function (update) { Object.assign(this.data, update) }
    page.onLoad()
    assert.ok(page.data.recipe)
    assert.ok(!page.data.recipe.required.includes('egg'))
    assert.ok(!page.data.recipe.name.includes('鸡蛋'))
  } finally {
    global.wx = originalWx
    global.Page = originalPage
  }
})

test('步骤计时从做法文字里取等待时间，支持秒、分钟、小时和组合', () => {
  assert.deepEqual(stepTimer({ body: '盖盖慢焖15分钟' }), { seconds: 900, timerText: '15分钟' })
  assert.equal(stepTimer({ body: '煎 20 秒，翻面再煎 10 秒' }).seconds, 20)
  assert.equal(stepTimer({ body: '上锅蒸 10-12 分钟' }).seconds, 720)
  assert.equal(stepTimer({ body: '蒸 3.5 分钟' }).seconds, 210)
  assert.equal(stepTimer({ body: '小火焖 1 小时 30 分钟' }).seconds, 5400)
  assert.equal(stepTimer({ body: '腌制半小时' }).seconds, 1800)
  assert.equal(stepTimer({ body: '加入盐调味' }), null)
  assert.equal(formatClock(65), '01:05')
  assert.equal(formatClock(3600), '1:00:00')
  const timed = matchRecipes([]).find(recipe => getRecipe(recipe.id).steps.some(step => step.seconds))
  assert.ok(timed)
  assert.ok(getRecipe(timed.id).steps.some(step => step.timerText))
})

test('详情页计时条可暂停、继续并在到点时提醒', () => {
  const originalWx = global.wx
  const originalPage = global.Page
  const originalSetInterval = global.setInterval
  const originalClearInterval = global.clearInterval
  const originalNow = Date.now
  const storage = new Map()
  const toasts = []
  let tick = null
  const base = originalNow()
  global.wx = {
    getStorageSync: key => (storage.has(key) ? structuredClone(storage.get(key)) : ''),
    setStorageSync: (key, value) => storage.set(key, structuredClone(value)),
    showToast: options => toasts.push(options.title),
    vibrateShort: () => {},
    pageScrollTo: () => {}
  }
  global.setInterval = callback => { tick = callback; return 1 }
  global.clearInterval = () => { tick = null }
  let now = base
  Date.now = () => now
  let registered
  global.Page = page => { registered = page }
  delete require.cache[require.resolve('../miniprogram/pages/recipe/index')]
  require('../miniprogram/pages/recipe/index')
  try {
    const page = { ...registered, data: JSON.parse(JSON.stringify(registered.data)) }
    page.setData = function (update) { Object.assign(this.data, update) }
    const recipe = matchRecipes([]).map(item => getRecipe(item.id)).find(item => item.steps.some(step => step.seconds))
    page.onLoad({ id: recipe.id })
    const step = page.data.recipe.steps.find(item => item.seconds)
    page.startStepTimer({ currentTarget: { dataset: { step: step.number, seconds: step.seconds, label: step.timerText } } })
    assert.equal(page.data.timerStep, step.number)
    assert.equal(page.data.timerRunning, true)
    assert.equal(page.data.remainingText, formatClock(step.seconds))

    now = base + (step.seconds - 1) * 1000
    tick()
    assert.equal(page.data.remainingText, '00:01')
    page.toggleTimer()
    assert.equal(page.data.timerRunning, false)
    assert.equal(tick, null)

    now += 5000
    page.toggleTimer()
    assert.equal(page.data.timerRunning, true)
    now += (step.seconds - 1) * 1000
    tick()
    assert.equal(page.data.timerDone, true)
    assert.equal(page.data.timerRunning, false)
    assert.ok(toasts.some(title => title.includes('时间到')))
    page.stopTimer()
    assert.equal(page.data.timerStep, 0)
    page.onUnload()
  } finally {
    Date.now = originalNow
    global.setInterval = originalSetInterval
    global.clearInterval = originalClearInterval
    global.wx = originalWx
    global.Page = originalPage
  }
})

test('口味偏好是独立设置页，问问 AI 的调整不会改成常用偏好', () => {
  const originalWx = global.wx
  const originalPage = global.Page
  const originalSetTimeout = global.setTimeout
  const storage = new Map([
    ['recipe-taste-preferences-v1', { mode: 'stock', maxMinutes: 15, people: 2, taste: 'mild', notes: '' }]
  ])
  global.wx = {
    getStorageSync: key => (storage.has(key) ? structuredClone(storage.get(key)) : ''),
    setStorageSync: (key, value) => storage.set(key, structuredClone(value)),
    setNavigationBarColor: () => {},
    setBackgroundColor: () => {},
    showToast: () => {},
    navigateBack: () => {},
    pageScrollTo: () => {},
    getWindowInfo: () => ({ windowWidth: 375, statusBarHeight: 20 }),
    getMenuButtonBoundingClientRect: () => ({ height: 32, top: 24, left: 280 })
  }
  global.setTimeout = callback => { callback(); return 1 }
  let registered
  global.Page = page => { registered = page }
  const prefPath = require.resolve('../miniprogram/pages/preferences/index')
  const recommendPath = require.resolve('../miniprogram/pages/recommend/index')
  delete require.cache[prefPath]
  delete require.cache[recommendPath]
  try {
    require('../miniprogram/pages/preferences/index')
    const page = { ...registered, data: JSON.parse(JSON.stringify(registered.data)) }
    page.setData = function (update) { Object.assign(this.data, update) }
    page.onShow()
    assert.equal(page.data.taste, 'mild')
    page.setPreference({ currentTarget: { dataset: { key: 'taste', value: 'spicy' } } })
    page.updateNotes({ detail: { value: '不要香菜' } })
    assert.equal(storage.get('recipe-taste-preferences-v1').taste, 'mild')
    page.save()
    assert.equal(storage.get('recipe-taste-preferences-v1').taste, 'spicy')
    assert.equal(storage.get('recipe-taste-preferences-v1').notes, '不要香菜')

    require('../miniprogram/pages/recommend/index')
    const recommend = { ...registered, data: JSON.parse(JSON.stringify(registered.data)) }
    recommend.setData = function (update) { Object.assign(this.data, update) }
    recommend.onLoad()
    assert.equal(recommend.data.taste, 'spicy')
    recommend.setPreference({ currentTarget: { dataset: { key: 'taste', value: 'mild' } } })
    assert.equal(storage.get('recipe-taste-preferences-v1').taste, 'spicy')
    recommend.restorePreferences()
    assert.equal(recommend.data.taste, 'spicy')

    page.restoreDefaults()
    assert.equal(storage.get('recipe-taste-preferences-v1').taste, 'any')
    assert.equal(storage.get('recipe-taste-preferences-v1').notes, '')
  } finally {
    delete require.cache[prefPath]
    delete require.cache[recommendPath]
    global.setTimeout = originalSetTimeout
    global.wx = originalWx
    global.Page = originalPage
  }
})

test('计时按钮不在步骤内容里，只在烹饪底栏', () => {
  const fs = require('node:fs')
  const wxml = fs.readFileSync(require.resolve('../miniprogram/pages/recipe/index.wxml'), 'utf8')
  const start = wxml.indexOf('<template name="recipeStep">')
  const end = wxml.indexOf('<template name="stepText">')
  assert.ok(start >= 0 && end > start)
  const block = wxml.slice(start, end)
  assert.ok(block.includes('</recipe-cover>'))
  assert.ok(!wxml.includes('step-timer-button'))
})

test('虚高时长改成动手时间，未拆的长菜标明含等待', () => {
  const find = name => matchRecipes([]).find(recipe => recipe.name === name)
  const fishHead = find('红烧鱼头')
  assert.equal(fishHead.minutes, 40)
  assert.equal(fishHead.timeText, '40 分钟')
  assert.equal(getRecipe(fishHead.id).durationLabel, '烹饪时长')

  const curry = find('巴基斯坦牛肉咖喱')
  assert.equal(curry.minutes, 45)
  assert.equal(getRecipe(curry.id).totalMinutes, 150)
  assert.equal(getRecipe(curry.id).waitMinutes, 105)
  assert.equal(getRecipe(curry.id).waitText, '1.8 小时')
  assert.equal(curry.timeText, '45 分钟动手')

  const rabbit = find('冷吃兔')
  assert.equal(rabbit.minutes, 90)
  assert.equal(rabbit.timeText, '约 90 分钟（含等待）')
  assert.equal(getRecipe(rabbit.id).durationLabel, '预计总时长')
  assert.equal(getRecipe(rabbit.id).durationNote, '含等待')
})

test('烹饪模式计时按钮在下一步旁边', () => {
  const fs = require('node:fs')
  const wxml = fs.readFileSync(require.resolve('../miniprogram/pages/recipe/index.wxml'), 'utf8')
  const nav = wxml.slice(wxml.indexOf('<block wx:else>', wxml.indexOf('class="bottom-nav')), wxml.indexOf('</view>\n</view>\n\n<template name="recipeStep"'))
  assert.ok(nav.includes('class="detail-timer"'))
  assert.ok(nav.includes('bindtap="startStepTimer"'))
  assert.ok(nav.includes('recipe.steps[cookingIndex].seconds'))
  assert.ok(nav.indexOf('class="detail-timer"') < nav.indexOf("'下一步'"))
  assert.ok(!wxml.includes('cooking:'))
})

test('收藏后爱心切换为实心图标', () => {
  const fs = require('node:fs')
  const wxml = fs.readFileSync(require.resolve('../miniprogram/pages/recipe/index.wxml'), 'utf8')
  const wxss = fs.readFileSync(require.resolve('../miniprogram/pages/recipe/index.wxss'), 'utf8')
  assert.ok(wxml.includes("saved ? '/assets/icon-favorites-filled.svg' : '/assets/icon-favorites.svg'"))
  assert.ok(fs.existsSync(require.resolve('../miniprogram/assets/icon-favorites-filled.svg')))
  assert.ok(!wxss.includes('detail-saved image'))
})

test('减脂餐是通用人群标签，26 道轻食精确命中', () => {
  const { recipes } = require('../miniprogram/data')
  assert.deepEqual(getDietTags(), ['减脂餐'])
  assert.equal(recipes.filter(recipe => tagsFor(recipe).includes('减脂餐')).length, 26)
  assert.equal(recipes.filter(recipe => !tagsFor(recipe).includes('减脂餐') && recipe.nutrition).length, 0)

  const fatLoss = matchRecipes([], { tag: '减脂餐' })
  assert.equal(fatLoss.length, 26)
  assert.ok(fatLoss.every(recipe => recipe.tags.includes('减脂餐')))
  assert.ok(fatLoss.every(recipe => recipe.nutrition && recipe.calories))
  assert.equal(matchRecipes([], { tag: '减脂餐' }).length, matchRecipes([], { lightOnly: true }).length)
  assert.ok(!matchRecipes([], { tag: '不存在的标签' }).every(recipe => false))

  const first = getRecipe(fatLoss[0].id)
  assert.deepEqual(first.tags, ['减脂餐'])
  assert.deepEqual(getRecipe('tomato-eggs').tags, [])
})

test('菜谱库有减脂餐筛选胶囊并接入匹配', () => {
  const fs = require('node:fs')
  const wxml = fs.readFileSync(require.resolve('../miniprogram/pages/home/index.wxml'), 'utf8')
  const js = fs.readFileSync(require.resolve('../miniprogram/pages/home/index.js'), 'utf8')
  assert.ok(wxml.includes('diet-tag-row'))
  assert.ok(wxml.includes('bindtap="changeDietTag"'))
  assert.ok(wxml.includes('{{item}}'))
  assert.ok(js.includes("const dietTags = ['全部', ...getDietTags()]"))
  assert.ok(js.includes('tag: inLibrary && dietTagIndex ? dietTags[dietTagIndex] : null'))
  assert.ok(js.includes('dietTagIndex: 0'))
})
