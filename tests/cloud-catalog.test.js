const assert = require('node:assert/strict')
const test = require('node:test')

test('云端菜谱整版切换，旧 ID 可用，断网使用缓存，错误版本保留当前菜谱', async t => {
  const { ingredients, recipes } = require('../miniprogram/data')
  const { getRecipe, matchRecipes, replaceCatalog, searchIngredientOptions } = require('../miniprogram/catalog')
  const { recommendRecipes } = require('../miniprogram/recipe-recommendations')
  const { cloudImageEnv, cloudStorageBase } = require('../miniprogram/recipe-image')
  const { loadCachedCatalog, syncCatalog } = require('../miniprogram/cloud-catalog')
  const oldTitle = getRecipe('tomato-eggs').name
  const newRecipe = {
    ...recipes[0],
    id: 'cloud-test-recipe',
    name: '云端芥蓝试验菜',
    category: '素菜',
    minutes: 12,
    required: [['cloud-kale', '1 把', '测试芥蓝']],
    optional: [],
    pantry: []
  }
  const source = {
    ingredients: { ...ingredients, 'cloud-kale': ['测试芥蓝'] },
    recipes: recipes.map(recipe => recipe.id === getRecipe('tomato-eggs').id ? { ...recipe, name: '新版番茄炒蛋' } : recipe)
      .concat(newRecipe)
  }
  let manifest = { schemaVersion: 1, recipeCount: source.recipes.length, version: 'a'.repeat(32) }
  const published = JSON.stringify({ ...manifest, ...source })
  let downloadText = published
  let online = true
  let checks = 0
  let downloads = 0
  let refreshes = 0
  let now = 1000
  const files = new Map()
  const previousWx = global.wx
  const previousGetPages = global.getCurrentPages
  const previousPage = global.Page
  const originalNow = Date.now
  const originalWarn = console.warn
  const warnings = []
  t.after(() => {
    global.wx = previousWx
    global.getCurrentPages = previousGetPages
    global.Page = previousPage
    Date.now = originalNow
    console.warn = originalWarn
  })
  Date.now = () => now
  console.warn = message => warnings.push(message)
  global.getCurrentPages = () => [{ refreshCatalogData() { refreshes++ } }]
  global.wx = {
    env: { USER_DATA_PATH: '/local' },
    cloud: {
      database({ env }) {
        assert.equal(env, cloudImageEnv)
        return { collection: collection => ({ doc: id => ({
          async get() {
            assert.equal(collection, 'recipe_catalog')
            assert.equal(id, 'published')
            checks++
            if (!online) throw new Error('offline')
            return { data: manifest }
          }
        }) }) }
      },
      async downloadFile({ fileID }) {
        assert.equal(fileID, cloudStorageBase + 'recipe-catalog/v1/' + manifest.version + '.json')
        downloads++
        files.set('/download', downloadText)
        return { tempFilePath: '/download' }
      }
    },
    getFileSystemManager() {
      return {
        accessSync(path) { if (!files.has(path)) throw new Error('ENOENT') },
        readFileSync: path => files.get(path),
        readFile({ filePath, success }) { success({ data: files.get(filePath) }) },
        writeFile({ filePath, data, success }) { files.set(filePath, data); success() },
        rename({ oldPath, newPath, success }) { files.set(newPath, files.get(oldPath)); files.delete(oldPath); if (success) success() }
      }
    }
  }

  loadCachedCatalog()
  assert.equal(getRecipe('tomato-eggs').name, oldTitle)
  const preferences = { mode: 'needs', maxMinutes: 30, people: 2, taste: 'any', notes: '想吃测试芥蓝' }
  assert.deepEqual(recommendRecipes([], preferences).ignored, ['想吃测试芥蓝'])
  const syncing = syncCatalog()
  assert.equal(syncCatalog(), syncing)
  await syncing
  assert.equal(getRecipe('tomato-eggs').name, '新版番茄炒蛋')
  assert.equal(matchRecipes(['cloud-kale'], { search: '测试芥蓝', readyOnly: true })[0].id, newRecipe.id)
  assert.equal(recommendRecipes(['cloud-kale'], preferences).recipes[0].id, newRecipe.id)
  assert.equal(searchIngredientOptions('测试芥蓝')[0].id, 'cloud-kale')
  assert.equal(refreshes, 1)
  assert.equal(files.get('/local/recipe-catalog-v1.json'), published)
  assert.equal(syncCatalog(), undefined)
  assert.equal(checks, 1)

  now += 6 * 60 * 1000
  await syncCatalog()
  assert.equal(checks, 2)
  assert.equal(downloads, 1)

  now += 6 * 60 * 1000
  manifest = { ...manifest, version: 'b'.repeat(32) }
  downloadText = JSON.stringify({ ...manifest, ...source, recipes: source.recipes.slice(1) })
  await syncCatalog()
  assert.equal(getRecipe('tomato-eggs').name, '新版番茄炒蛋')
  assert.equal(refreshes, 1)
  assert.equal(files.get('/local/recipe-catalog-v1.json'), published)

  online = false
  replaceCatalog({ ingredients, recipes })
  assert.equal(getRecipe(newRecipe.id), null)
  delete require.cache[require.resolve('../miniprogram/cloud-catalog')]
  const restarted = require('../miniprogram/cloud-catalog')
  restarted.loadCachedCatalog()
  await restarted.syncCatalog()
  assert.equal(getRecipe(newRecipe.id).name, newRecipe.name)
  assert.equal(warnings.length, 2)

  // A share can arrive immediately after a successful check for an older catalog.
  manifest = { schemaVersion: 1, recipeCount: recipes.length, version: 'c'.repeat(32) }
  downloadText = JSON.stringify({ ...manifest, ingredients, recipes })
  online = true
  assert.equal(await restarted.syncCatalog(), true)
  assert.equal(getRecipe(newRecipe.id), null)
  assert.equal(restarted.syncCatalog(), undefined)

  const pageStorage = new Map()
  global.wx.getStorageSync = key => pageStorage.get(key)
  global.wx.setStorageSync = (key, value) => pageStorage.set(key, value)
  let definition
  global.Page = page => { definition = page }
  require('../miniprogram/pages/recipe/index')
  const makeDetail = () => ({
    ...definition, data: { ...definition.data },
    setData(update) { Object.assign(this.data, update) }
  })
  const detail = makeDetail()
  global.getCurrentPages = () => [detail]
  online = false
  const opening = detail.onLoad({ id: newRecipe.id })
  assert.equal(detail.data.recipeStatus, 'loading')
  await opening
  assert.equal(detail.data.recipeStatus, 'error')

  online = true
  manifest = { schemaVersion: 1, recipeCount: source.recipes.length, version: 'a'.repeat(32) }
  downloadText = published
  const retrying = detail.loadMissingRecipe()
  assert.equal(detail.data.recipeStatus, 'loading')
  await retrying
  assert.equal(detail.data.recipeStatus, '')
  assert.equal(detail.data.recipe.id, newRecipe.id)
  assert.deepEqual(pageStorage.get('recipe-activity-v1').history, [newRecipe.id])

  const missing = makeDetail()
  global.getCurrentPages = () => [missing]
  await missing.onLoad({ id: 'missing-recipe' })
  assert.equal(missing.data.recipeStatus, 'notFound')
})

test('云端菜谱换版只刷栈顶页，其余页面靠 onShow 兜底（有意设计，不要改成全刷）', async t => {
  // 为什么只刷栈顶：栈内其余页面的 onShow 都会调自己的 refreshCatalogData，
  // 全刷等于在 onShow 之前多做一次，没有收益；而 meal-calendar 的 refreshPlanningData
  // 在正常分支上有 wx.showToast（pages/meal-calendar/index.js:40），
  // 后台页面被刷时会误弹提示，records / shopping 的 failure 更是 showModal。
  // 所以这里锁定「只刷栈顶」，不是遗漏。
  const { ingredients, recipes } = require('../miniprogram/data')
  const { cloudImageEnv, cloudStorageBase } = require('../miniprogram/recipe-image')
  const { syncCatalog } = require('../miniprogram/cloud-catalog')

  const source = { ingredients, recipes }
  const manifest = { schemaVersion: 1, recipeCount: recipes.length, version: 'd'.repeat(32) }
  const published = JSON.stringify({ ...manifest, ...source })
  const files = new Map()
  const previousWx = global.wx
  const previousGetPages = global.getCurrentPages
  const originalNow = Date.now
  const originalWarn = console.warn
  t.after(() => {
    global.wx = previousWx
    global.getCurrentPages = previousGetPages
    Date.now = originalNow
    console.warn = originalWarn
  })
  // 模块级 activeVersion 在同进程内跨测试保留，这里推到检查间隔之后再跑，
  // 否则版本号若与上一条测试相同会命中「版本未变」提前返回。
  Date.now = () => 1e12
  console.warn = () => {}
  // 两层页面栈：首页 → 采购清单（栈顶）。只该刷新栈顶的采购清单，首页交给 onShow。
  const refreshed = []
  global.getCurrentPages = () => [
    { refreshCatalogData() { refreshed.push('home') } },
    { refreshCatalogData() { refreshed.push('shopping') } }
  ]
  global.wx = {
    env: { USER_DATA_PATH: '/local' },
    cloud: {
      database({ env }) {
        assert.equal(env, cloudImageEnv)
        return { collection: () => ({ doc: () => ({ async get() { return { data: manifest } } }) }) }
      },
      async downloadFile({ fileID }) {
        assert.equal(fileID, cloudStorageBase + 'recipe-catalog/v1/' + manifest.version + '.json')
        files.set('/download', published)
        return { tempFilePath: '/download' }
      }
    },
    getFileSystemManager() {
      return {
        accessSync(path) { if (!files.has(path)) throw new Error('ENOENT') },
        readFileSync: path => files.get(path),
        readFile({ filePath, success }) { success({ data: files.get(filePath) }) },
        writeFile({ filePath, data, success }) { files.set(filePath, data); success() },
        rename({ oldPath, newPath, success }) { files.set(newPath, files.get(oldPath)); files.delete(oldPath); if (success) success() }
      }
    }
  }

  await syncCatalog({ force: true })
  assert.deepEqual(refreshed, ['shopping'], '只刷新栈顶页，栈内其他页面交给 onShow 兜底')

  // 栈顶页面没有 refreshCatalogData 时不能抛错（组件页 / 弹层页也会进栈）。
  refreshed.length = 0
  global.getCurrentPages = () => [{ noCatalogRefresh() {} }]
  await syncCatalog({ force: true })
  assert.deepEqual(refreshed, [], '栈顶没有刷新方法时静默跳过，不抛错')
})
