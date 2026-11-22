const assert = require('node:assert/strict')
const test = require('node:test')

function captureDetailPage() {
  const previousPage = global.Page
  let definition
  try {
    global.Page = value => { definition = value }
    delete require.cache[require.resolve('../miniprogram/pages/guide-detail/index.js')]
    require('../miniprogram/pages/guide-detail/index.js')
  } finally {
    global.Page = previousPage
  }
  return definition
}

test('食材详情页可转发：标题带食材名，path 带编码后的 id', () => {
  const definition = captureDetailPage()
  const makePage = item => ({
    ...definition,
    data: { item },
    setData(update) { Object.assign(this.data, update) }
  })

  const spinach = makePage({ id: 'spinach', name: '菠菜' })
  const share = spinach.onShareAppMessage()
  assert.equal(share.path, '/pages/guide-detail/index?id=spinach')
  assert.match(share.title, /菠菜/)
  assert.ok(!share.imageUrl, '不设封面时用页面截图（顶部为食材大图）')

  const special = makePage({ id: 'a b', name: '试验菜' })
  assert.equal(special.onShareAppMessage().path, '/pages/guide-detail/index?id=a%20b')

  const empty = makePage(null)
  const fallback = empty.onShareAppMessage()
  assert.equal(fallback.path, '/pages/guide/index')
  assert.ok(fallback.title.length > 0)
})

test('分享进来的食材若只在云端新版，onLoad 强制同步后仍可打开', async t => {
  const { bundled, replaceGuide } = require('../miniprogram/guide-data')
  const { cloudImageEnv, cloudStorageBase } = require('../miniprogram/recipe-image')
  const definition = captureDetailPage()

  const cloudOnly = {
    id: 'cloud-shared', name: '云端分享菜', group: '叶菜', image: 'shared.png',
    tint: '#EEEEEE', season: '', therapy: '云端食疗', audience: '云端人群',
    storage: ['云端保存'], tips: ['云端技巧']
  }
  const source = {
    groups: ['叶菜', '根茎', '瓜果', '菌菇', '蛋豆', '肉水产'],
    ingredients: bundled.concat(cloudOnly)
  }
  const manifest = { schemaVersion: 1, version: 'd'.repeat(32), ingredientCount: source.ingredients.length }
  const releaseText = JSON.stringify({ ...manifest, ...source })
  const files = new Map()
  const warnings = []
  const previousWx = global.wx
  const previousGetPages = global.getCurrentPages
  const originalWarn = console.warn
  t.after(() => {
    global.wx = previousWx
    global.getCurrentPages = previousGetPages
    console.warn = originalWarn
    replaceGuide({ groups: source.groups, ingredients: bundled })
    delete require.cache[require.resolve('../miniprogram/cloud-guide')]
  })

  console.warn = message => warnings.push(message)
  global.getCurrentPages = () => []
  global.wx = {
    env: { USER_DATA_PATH: '/local' },
    cloud: {
      database({ env }) {
        assert.equal(env, cloudImageEnv)
        return { collection: () => ({ doc: () => ({
          async get() { return { data: manifest } }
        }) }) }
      },
      async downloadFile({ fileID }) {
        assert.equal(fileID, cloudStorageBase + 'guide-catalog/v1/' + manifest.version + '.json')
        files.set('/download', releaseText)
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
    },
    setNavigationBarTitle() {},
    showToast() { throw new Error('不应提示不存在') }
  }

  replaceGuide({ groups: source.groups, ingredients: bundled })
  const page = {
    ...definition,
    data: { ...definition.data },
    setData(update) { Object.assign(this.data, update) }
  }
  const pending = page.onLoad({ id: 'cloud-shared' })
  assert.equal(page.data.item, null, '同步前该食材本地不存在')
  await pending
  assert.equal(page.data.item.name, '云端分享菜', '同步后应加载出云端食材')
  assert.equal(page.onShareAppMessage().path, '/pages/guide-detail/index?id=cloud-shared')
})
