const assert = require('node:assert/strict')
const test = require('node:test')
const fs = require('node:fs')
const vm = require('node:vm')
const { readKitchen, saveKitchen, saveInventory, syncInventory } = require('../miniprogram/inventory')
const { listShopping, removeShoppingItem, saveManualShopping, buyShoppingItems, undoShoppingPurchase } = require('../miniprogram/shopping')
const { appid } = require('../project.config.json')

function cloudFixture() {
  let identity = {}
  const records = new Map()
  const kitchens = {
    where({ _id, version }) {
      return {
        limit() { return this },
        async get() {
          const row = records.get(_id)
          return { data: row ? [structuredClone(row)] : [] }
        },
        async update({ data }) {
          const row = records.get(_id)
          if (row.version !== version) return { stats: { updated: 0 } }
          records.set(_id, structuredClone({ ...row, ...data, version: row.version + data.version }))
          return { stats: { updated: 1 } }
        }
      }
    },
    async add({ data }) {
      if (records.has(data._id)) throw new Error('duplicate')
      records.set(data._id, structuredClone(data))
    }
  }
  const sdk = {
    init() {},
    getWXContext: () => identity,
    database() {
      return {
        collection: () => kitchens,
        command: { inc: value => value, set: value => value }
      }
    }
  }
  const source = fs.readFileSync(require.resolve('../cloudfunctions/syncKitchen/index'), 'utf8')
  const exports = {}
  vm.runInThisContext('(function(require, exports) {' + source + '\n})')(
    name => name === 'wx-server-sdk' ? sdk : require(name), exports
  )
  return {
    records,
    async call(openId, data, appId = appid) {
      identity = openId ? { OPENID: openId, APPID: appId } : {}
      return exports.main(data)
    }
  }
}

const empty = { inventory: [], shopping: [] }
const item = { recipeId: 'tomato-eggs', id: 'egg', quantity: '2个' }
const operation = (sequence, added = [], removed = [], shopping = []) => ({ sequence, added, removed, shopping })

test('云同步并发写入不会覆盖其他设备，重试不会恢复旧的食材或采购项', async () => {
  const cloud = cloudFixture()
  const first = { clientId: 'device-a', seed: { inventory: ['tomato'], shopping: [item] }, operations: [] }
  const second = { clientId: 'device-b', seed: null, operations: [operation(1, ['garlic'])] }
  await Promise.all([cloud.call('user-a', first), cloud.call('user-a', second)])
  assert.equal(cloud.records.size, 1)

  // Regardless of which device created the document, the old seed can never return after a deletion.
  const oldAdd = { ...first, operations: [operation(1, ['tomato'], [], [{ recipeId: item.recipeId, id: item.id, items: [item] }])] }
  await cloud.call('user-a', oldAdd)
  const removeAndBuy = { ...second, operations: [operation(2, ['egg'], ['tomato'], [{ recipeId: item.recipeId, id: item.id, items: [] }])] }
  const [removed, otherEdit] = await Promise.all([
    cloud.call('user-a', removeAndBuy),
    cloud.call('user-a', { ...first, seed: null, operations: [operation(2, ['broccoli'])] })
  ])
  assert.equal(removed.ok && otherEdit.ok, true)

  const replay = await cloud.call('user-a', oldAdd)
  assert.deepEqual(replay.kitchen.inventory.sort(), ['broccoli', 'egg', 'garlic'])
  assert.deepEqual(replay.kitchen.shopping, [])
  assert.deepEqual((await cloud.call('user-a', removeAndBuy)).kitchen.shopping, [])
  assert.deepEqual((await cloud.call('user-b', { ...first, seed: null, _openid: 'user-a' })).kitchen, empty)
  assert.equal((await cloud.call(null, first)).error, 'unauthorized')
  assert.equal((await cloud.call('user-a', first, 'some-other-app')).error, 'unauthorized')
})

test('手动采购可离线添加和修改，恢复网络后与菜谱采购一起同步', async t => {
  const cloud = cloudFixture()
  const recipeItem = { recipeId: 'tomato-eggs', id: 'tomato', quantity: '2 个' }
  const deviceA = new Map([['recipe-kitchen-v1', { inventory: [], shopping: [recipeItem] }]])
  const deviceB = new Map()
  let storage = deviceA
  let online = false
  t.mock.method(console, 'warn', () => {})
  global.wx = {
    getStorageSync: key => structuredClone(storage.get(key)),
    setStorageSync: (key, value) => storage.set(key, structuredClone(value)),
    cloud: {
      async callFunction({ data }) {
        if (!online) throw new Error('offline')
        return { result: await cloud.call('manual-list-user', data) }
      }
    }
  }
  t.after(() => { delete global.wx })

  assert.equal(saveManualShopping('  ', ''), false)
  assert.equal(saveManualShopping('西红柿', ''), true)
  assert.equal(listShopping()[0].quantity, recipeItem.quantity)
  assert.equal(saveManualShopping('番茄', '3 个'), true)
  assert.equal(saveManualShopping('Kitchen  paper', '1 包'), true)
  assert.equal(saveManualShopping(' kitchen paper ', '2 包'), true)
  assert.equal(saveManualShopping('  散装燕麦脆饼  ', ''), true)
  await syncInventory()

  online = true
  await syncInventory()
  storage = deviceB
  await syncInventory()
  const items = listShopping()
  const tomato = items.find(item => item.key === 'tomato')
  const paper = items.find(item => item.name === 'Kitchen paper')
  const unmeasured = items.find(item => item.name === '散装燕麦脆饼')
  assert.equal(items.length, 3)
  assert.equal(tomato.quantity, '5 个')
  assert.equal(tomato.canRestock, true)
  assert.deepEqual(tomato.details.map(({ title, quantity }) => [title, quantity]), [
    ['西红柿炒鸡蛋', '2 个'], ['手动添加', '3 个']
  ])
  assert.equal(paper.quantity, '2 包')
  assert.equal(paper.canRestock, false)
  assert.equal(unmeasured.quantity, '用量待定')
  assert.equal(removeShoppingItem(paper.key, true), true)
  assert.deepEqual(readKitchen().inventory, [])
  assert.equal(removeShoppingItem(tomato.key, true), true)
  await syncInventory()
  storage = deviceA
  await syncInventory()
  assert.deepEqual(readKitchen().inventory, ['tomato'])
  assert.deepEqual(listShopping().map(item => item.name), ['散装燕麦脆饼'])
})

test('批量已买与撤销只更新本次采购，保留已有库存和其他清单改动', async t => {
  const cloud = cloudFixture()
  const tomato = { recipeId: 'tomato-eggs', id: 'tomato', quantity: '2 个' }
  const egg = { recipeId: 'tomato-eggs', id: 'egg', quantity: '1 个' }
  const first = new Map([['recipe-kitchen-v1', { inventory: ['egg'], shopping: [tomato, tomato, egg] }]])
  const second = new Map()
  let storage = first
  global.wx = {
    getStorageSync: key => structuredClone(storage.get(key)),
    setStorageSync: (key, value) => storage.set(key, structuredClone(value)),
    cloud: { async callFunction({ data }) { return { result: await cloud.call('batch-list-user', data) } } }
  }
  t.after(() => { delete global.wx })

  saveManualShopping('厨房纸', '1 卷')
  await syncInventory()
  const keys = listShopping().map(item => item.key)
  const purchase = buyShoppingItems(keys.concat(keys[0]))
  assert.equal(purchase.count, 3)
  assert.deepEqual(purchase.addedInventory, ['tomato'])
  assert.deepEqual(readKitchen(), { inventory: ['egg', 'tomato'], shopping: [] })
  await syncInventory()

  storage = second
  await syncInventory()
  assert.deepEqual(readKitchen(), { inventory: ['egg', 'tomato'], shopping: [] })
  saveManualShopping('牛奶', '2 盒')
  saveManualShopping('厨房纸', '3 卷')
  saveInventory(['egg', 'tomato', 'broccoli'])
  await syncInventory()

  storage = first
  await syncInventory()
  assert.equal(undoShoppingPurchase(purchase), 2)
  await syncInventory()
  storage = second
  await syncInventory()
  assert.deepEqual(readKitchen().inventory, ['egg', 'broccoli'])
  assert.equal(readKitchen().shopping.filter(item => item.id === 'tomato').length, 2)
  assert.equal(listShopping().find(item => item.name === '厨房纸').quantity, '3 卷')
  assert.equal(listShopping().find(item => item.name === '牛奶').quantity, '2 盒')
})

test('旧数据首次迁移，离线入库在恢复连接后同步，等待期间的后续修改仍保留', async t => {
  const cloud = cloudFixture()
  const legacy = { inventory: ['tomato'], shopping: [item] }
  const deviceA = new Map([['recipe-kitchen-v1', legacy]])
  const deviceB = new Map()
  let storage = deviceA
  let connected = true
  let loseReply = false
  let finish
  let refreshed = 0

  t.mock.method(console, 'warn', () => {})
  global.getCurrentPages = () => [{ refreshKitchenData() { refreshed++ } }]
  global.wx = {
    getStorageSync: key => structuredClone(storage.get(key)),
    setStorageSync: (key, value) => storage.set(key, structuredClone(value)),
    cloud: {
      async callFunction({ name, data, config }) {
        assert.equal(name, 'syncKitchen')
        assert.ok(config.env)
        if (!connected) throw new Error('offline')
        const result = await cloud.call('same-user', data)
        if (loseReply) {
          loseReply = false
          throw new Error('lost response')
        }
        if (finish) await finish.promise
        return { result }
      }
    }
  }
  t.after(() => {
    delete global.wx
    delete global.getCurrentPages
  })

  await syncInventory()
  assert.deepEqual(readKitchen(), legacy)
  assert.equal(cloud.records.size, 1)
  storage = deviceB
  await syncInventory()
  assert.deepEqual(readKitchen(), legacy)

  connected = false
  assert.equal(removeShoppingItem('egg', true), true)
  await syncInventory()
  assert.deepEqual(readKitchen(), { inventory: ['tomato', 'egg'], shopping: [] })
  assert.equal([...cloud.records.values()][0].kitchen.shopping.length, 1)

  connected = true
  loseReply = true
  await syncInventory()
  assert.deepEqual([...cloud.records.values()][0].kitchen, { inventory: ['tomato', 'egg'], shopping: [] })
  finish = Promise.withResolvers()
  const running = syncInventory()
  await new Promise(resolve => setImmediate(resolve))
  saveInventory(['egg'])
  saveKitchen({ inventory: ['egg'], shopping: [{ ...item, id: 'garlic', quantity: '1瓣' }] })
  finish.resolve()
  finish = null
  await running

  storage = deviceA
  await syncInventory()
  assert.deepEqual(readKitchen(), { inventory: ['egg'], shopping: [{ ...item, id: 'garlic', quantity: '1瓣' }] })
  assert.deepEqual(storage.get('recipe-kitchen-v1'), legacy)
  assert.equal(refreshed, 2)
})

test('已有冰箱云记录可迁移收藏和做过的菜，离线取消收藏不会被旧设备恢复', async t => {
  const { readFavorites, toggleFavorite } = require('../miniprogram/favorites')
  const { readActivity, recordRecipe } = require('../miniprogram/activity')
  const { resolveRecipeId } = require('../miniprogram/catalog')
  const favorite = resolveRecipeId('tomato-eggs')
  const cooked = resolveRecipeId('egg-fried-rice')
  const cloud = cloudFixture()
  await cloud.call('same-user', { clientId: 'old-client', seed: { ...empty, inventory: ['tomato'] }, operations: [] })
  delete [...cloud.records.values()][0].records

  const legacy = new Map([
    ['favorite-recipe-ids', ['tomato-eggs', favorite]],
    ['recipe-activity-v1', { history: ['tomato-eggs'], cooked: ['egg-fried-rice'] }]
  ])
  const firstDevice = new Map(legacy)
  const secondDevice = new Map()
  let storage = firstDevice
  let online = true
  let refreshes = 0
  t.mock.method(console, 'warn', () => {})
  global.getCurrentPages = () => [{ refreshRecipeRecords() { refreshes++ } }]
  global.wx = {
    getStorageSync: key => structuredClone(storage.get(key)),
    setStorageSync: (key, value) => storage.set(key, structuredClone(value)),
    cloud: {
      async callFunction({ data }) {
        if (!online) throw new Error('offline')
        if (data.recordSeed) assert.deepEqual(Object.keys(data.recordSeed).sort(), ['cooked', 'favorites'])
        return { result: await cloud.call('same-user', data) }
      }
    }
  }
  t.after(() => {
    delete global.wx
    delete global.getCurrentPages
  })

  await syncInventory()
  assert.deepEqual(readFavorites(), [favorite])
  assert.deepEqual(readActivity(), { history: [favorite], cooked: [cooked] })
  storage = secondDevice
  await syncInventory()
  assert.deepEqual(readFavorites(), [favorite])
  assert.deepEqual(readActivity(), { history: [], cooked: [cooked] })
  assert.equal(refreshes, 1)

  online = false
  assert.equal(toggleFavorite(favorite), false)
  recordRecipe('cooked', favorite)
  recordRecipe('history', cooked)
  await syncInventory()
  assert.deepEqual(readFavorites(), [])
  assert.deepEqual(readActivity(), { history: [cooked], cooked: [favorite, cooked] })

  online = true
  await syncInventory()
  await cloud.call('same-user', { clientId: 'old-client', seed: null, operations: [operation(1, ['garlic'])] })
  storage = new Map(legacy)
  await syncInventory()
  assert.deepEqual(readFavorites(), [])
  assert.deepEqual(readActivity().cooked, [favorite, cooked])
  assert.deepEqual(readKitchen().inventory, ['tomato', 'garlic'])
})

test('搭配和日历可迁移、离线同步和换设备恢复，晚到的旧设备不覆盖已有安排', async t => {
  const { readCalendar, saveCalendarMeal, prepareCalendarSnapshots } = require('../miniprogram/meal-calendar')
  const { saveCustomMeal, getCustomMeal, archiveCustomMeal } = require('../miniprogram/meal-plans')
  const { syncPlanning } = require('../miniprogram/planning-sync')
  const cloud = cloudFixture()
  const egg = 'breakfast_zheng-shui-dan'
  const other = 'vegetable_dish_suan-rong-xi-lan-hua'
  const day = '2026-11-17'
  const later = '2026-11-18'
  const original = { id: 'custom-legacy-2', title: '旧搭配', hasCustomTitle: true, recipes: [egg] }
  const legacyCalendar = () => ({ [day]: { dinner: { type: 'plan', id: original.id } } })
  const legacyDevice = () => new Map([
    ['recipe-custom-meals-v1', [structuredClone(original)]],
    ['recipe-meal-calendar-v1', legacyCalendar()]
  ])
  const deviceA = legacyDevice()
  const deviceB = new Map()
  const deviceC = legacyDevice()
  let storage = deviceA
  let online = false
  let useOldFunction = false
  const notices = []
  t.mock.method(console, 'warn', () => {})
  global.wx = {
    getStorageSync: key => structuredClone(storage.get(key)),
    setStorageSync: (key, value) => storage.set(key, structuredClone(value)),
    showToast: options => notices.push(options.title),
    cloud: {
      async callFunction({ name, data }) {
        assert.equal(name, 'syncKitchen')
        if (!online) throw Error('offline')
        if (useOldFunction) return { result: { ok: false, error: 'invalid_input' } }
        return { result: await cloud.call('planning-user', data) }
      }
    }
  }
  t.after(() => { delete global.wx })

  prepareCalendarSnapshots()
  const frozen = readCalendar()[day].dinner
  assert.equal(frozen.title, '旧搭配')
  assert.deepEqual(frozen.dishes.map(dish => dish.id), [egg])
  saveCustomMeal('离线改名', [other], original.id)
  await syncPlanning()
  assert.equal(cloud.records.size, 0)
  online = true
  useOldFunction = true
  await syncPlanning()
  assert.ok(storage.get('recipe-planning-sync-v1').pending.length)
  useOldFunction = false
  await syncPlanning()
  assert.equal(storage.get('recipe-planning-sync-v1').pending.length, 0)

  storage = deviceB
  await syncPlanning()
  assert.equal(getCustomMeal(original.id).title, '离线改名')
  assert.deepEqual(readCalendar()[day].dinner, frozen)
  const backgroundMeal = { type: 'recipes', ids: [egg, other] }
  assert.equal(saveCalendarMeal(day, 'dinner', null, frozen), true)
  assert.equal(saveCalendarMeal(later, 'lunch', backgroundMeal, null), true)
  assert.equal(archiveCustomMeal(original.id), true)
  await syncPlanning()

  storage = deviceA
  online = false
  assert.equal(saveCalendarMeal(day, 'dinner', { type: 'recipe', id: other }, frozen), true)
  assert.equal(saveCalendarMeal(later, 'breakfast', { type: 'recipe', id: egg }, null), true)
  await syncPlanning()
  online = true
  await syncPlanning()
  assert.ok(notices.some(notice => notice.includes('其他设备')))
  assert.equal(readCalendar()[day], undefined)
  assert.deepEqual(readCalendar()[later], { breakfast: { type: 'recipe', id: egg }, lunch: backgroundMeal })
  assert.equal(getCustomMeal(original.id), null)

  storage = deviceC
  prepareCalendarSnapshots()
  await syncPlanning()
  assert.equal(readCalendar()[day], undefined)
  assert.equal(getCustomMeal(original.id), null)
  assert.deepEqual(readCalendar()[later], { breakfast: { type: 'recipe', id: egg }, lunch: backgroundMeal })

  const request = { planningVersion: 1, planningRequest: { clientId: 'device-test', operations: [] } }
  assert.deepEqual((await cloud.call('different-user', request)).planning, { meals: {}, calendar: {} })
  assert.equal((await cloud.call('planning-user', request, 'different-app')).error, 'unauthorized')
  const old = await cloud.call('planning-user', { clientId: 'device-old', seed: null, operations: [operation(1, ['egg'])] })
  assert.deepEqual(old.kitchen.inventory, ['egg'])
  assert.equal(cloud.records.size, 2)
})
