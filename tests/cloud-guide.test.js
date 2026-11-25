const assert = require('node:assert/strict')
const test = require('node:test')
const { execFileSync } = require('node:child_process')

test('食材指南云端整版替换、断网用缓存、坏版本保留当前数据', async t => {
  const { bundled, listIngredients, getIngredient, replaceGuide } = require('../miniprogram/guide-data')
  const { cloudImageEnv, cloudStorageBase } = require('../miniprogram/recipe-image')
  const { loadCachedGuide, syncGuide } = require('../miniprogram/cloud-guide')
  const { getGuideGroups } = require('../miniprogram/guide-data')

  const cloudItem = {
    ...bundled.find(item => item.id === 'spinach'),
    therapy: '云端菠菜新介绍',
    image: 'spinach-cloud.png'
  }
  const newItem = {
    id: 'cloud-test-veg', name: '云端试验菜', group: '叶菜', image: 'cloud-test.png',
    tint: '#EEEEEE', season: '测试', therapy: '测试食疗', audience: '测试人群',
    storage: ['云端保存法'], tips: ['云端技巧']
  }
  const source = {
    groups: getGuideGroups(),
    ingredients: bundled.map(item => item.id === 'spinach' ? cloudItem : item).concat(newItem)
  }
  let manifest = { schemaVersion: 1, ingredientCount: source.ingredients.length, version: 'a'.repeat(32) }
  const published = JSON.stringify({ ...manifest, ...source })
  let downloadText = published
  let online = true
  let checks = 0
  let downloads = 0
  let refreshes = 0
  let now = 1000
  const files = new Map()
  const warnings = []
  const previousWx = global.wx
  const previousGetPages = global.getCurrentPages
  const originalNow = Date.now
  const originalWarn = console.warn
  t.after(() => {
    global.wx = previousWx
    global.getCurrentPages = previousGetPages
    Date.now = originalNow
    console.warn = originalWarn
    replaceGuide({ groups: source.groups, ingredients: bundled })
  })

  Date.now = () => now
  console.warn = message => warnings.push(message)
  global.getCurrentPages = () => [{ refreshGuideData() { refreshes++ } }, { noGuideRefresh() {} }]
  global.wx = {
    env: { USER_DATA_PATH: '/local' },
    cloud: {
      database({ env }) {
        assert.equal(env, cloudImageEnv)
        return { collection: collection => ({ doc: id => ({
          async get() {
            assert.equal(collection, 'guide_catalog')
            assert.equal(id, 'published')
            checks++
            if (!online) throw new Error('offline')
            return { data: manifest }
          }
        }) }) }
      },
      async downloadFile({ fileID }) {
        assert.equal(fileID, cloudStorageBase + 'guide-catalog/v1/' + manifest.version + '.json')
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

  loadCachedGuide()
  assert.ok(getIngredient('spinach').therapy.includes('补血止血'), '无缓存时保持随包数据')
  const syncing = syncGuide()
  assert.equal(syncGuide(), syncing)
  await syncing
  assert.ok(getIngredient('spinach').therapy.includes('云端菠菜新介绍'))
  assert.ok(getIngredient('cloud-test-veg'), '云端新食材应可用')
  assert.equal(getIngredient('spinach').image, cloudStorageBase + 'guide-covers/spinach-cloud.png')
  assert.equal(listIngredients().find(item => item.id === 'spinach').image, cloudStorageBase + 'guide-covers/spinach-cloud.png')
  assert.equal(refreshes, 1, '只刷新实现了 refreshGuideData 的页面')
  assert.equal(files.get('/local/guide-catalog-v1.json'), published)
  assert.equal(syncGuide(), undefined, '5 分钟内不重复检查')
  assert.equal(checks, 1)

  now += 6 * 60 * 1000
  await syncGuide()
  assert.equal(checks, 2)
  assert.equal(downloads, 1, '版本未变不重复下载')

  // 坏版本（数量不符 + 缺随包 ID）不能替换当前数据
  now += 6 * 60 * 1000
  manifest = { ...manifest, version: 'b'.repeat(32) }
  downloadText = JSON.stringify({ ...manifest, groups: source.groups, ingredients: [newItem] })
  await syncGuide()
  assert.ok(getIngredient('spinach').therapy.includes('云端菠菜新介绍'), '坏版本不应替换当前数据')
  assert.equal(refreshes, 1)
  assert.equal(files.get('/local/guide-catalog-v1.json'), published)

  // 断网：用缓存恢复（新进程语义：清掉内存后重新加载缓存）
  online = false
  replaceGuide({ groups: source.groups, ingredients: bundled })
  assert.ok(getIngredient('spinach').therapy.includes('补血止血'))
  delete require.cache[require.resolve('../miniprogram/cloud-guide')]
  const restarted = require('../miniprogram/cloud-guide')
  restarted.loadCachedGuide()
  await restarted.syncGuide()
  assert.ok(getIngredient('spinach').therapy.includes('云端菠菜新介绍'), '断网时用缓存恢复')
  assert.equal(warnings.length, 2)
})

test('食材指南构建脚本产出版本化发布文件', () => {
  const { mkdtempSync, readFileSync, existsSync } = require('node:fs')
  const { tmpdir } = require('node:os')
  const { join } = require('node:path')
  const out = mkdtempSync(join(tmpdir(), 'guide-release-'))
  const stdout = execFileSync('node', ['scripts/build-guide-release.js', out], { cwd: process.cwd(), encoding: 'utf8' })
  const result = JSON.parse(stdout)
  assert.ok(existsSync(result.localPath))
  assert.ok(result.cloudPath.startsWith('guide-catalog/v1/'))
  assert.match(result.manifest.version, /^[a-f0-9]{32}$/)
  const release = JSON.parse(readFileSync(result.localPath, 'utf8'))
  assert.equal(release.schemaVersion, result.manifest.schemaVersion)
  assert.equal(release.version, result.manifest.version)
  assert.equal(release.ingredients.length, result.manifest.ingredientCount)
  assert.ok(Array.isArray(release.groups) && release.groups.length)
  assert.ok(release.ingredients.some(item => item.id === 'spinach'))
})

test('食材指南同步会广播 loading/idle 状态，页面可订阅与退订', async t => {
  const { bundled, getGuideGroups, replaceGuide } = require('../miniprogram/guide-data')
  const { cloudImageEnv, cloudStorageBase } = require('../miniprogram/recipe-image')
  const { syncGuide, subscribe } = require('../miniprogram/cloud-guide')

  const source = { groups: getGuideGroups(), ingredients: bundled }
  const manifest = { schemaVersion: 1, ingredientCount: source.ingredients.length, version: 'b'.repeat(32) }
  const published = JSON.stringify({ ...manifest, ...source })
  let now = 1000
  let online = true
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
    replaceGuide({ groups: source.groups, ingredients: bundled })
  })
  Date.now = () => now
  console.warn = () => {}
  global.getCurrentPages = () => []
  global.wx = {
    env: { USER_DATA_PATH: '/local' },
    cloud: {
      database({ env }) {
        assert.equal(env, cloudImageEnv)
        return { collection: () => ({ doc: () => ({ async get() {
          if (!online) throw new Error('offline')
          return { data: manifest }
        } }) }) }
      },
      async downloadFile({ fileID }) {
        assert.equal(fileID, cloudStorageBase + 'guide-catalog/v1/' + manifest.version + '.json')
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

  // 成功路径：loading → idle
  const states = []
  const unsubscribe = subscribe(({ status }) => states.push(status))
  await syncGuide()
  assert.deepEqual(states, ['loading', 'idle'], '同步期间先广播 loading，完成后回到 idle')

  // 退订后不再收到状态
  unsubscribe()
  now += 6 * 60 * 1000
  await syncGuide()
  assert.deepEqual(states, ['loading', 'idle'], '退订后不再回调')

  // 同一进程内已成功同步过（activeVersion 有值），此时失败应静默降级为 idle。
  online = false
  const degraded = []
  const unsubscribeDegraded = subscribe(({ status }) => degraded.push(status))
  await syncGuide({ force: true })
  unsubscribeDegraded()
  assert.deepEqual(degraded, ['loading', 'idle'], '有可用版本时失败静默降级，不打扰用户')

  // 非函数入参不应抛错，且返回可调用的退订函数
  assert.doesNotThrow(() => subscribe(null)())
})
