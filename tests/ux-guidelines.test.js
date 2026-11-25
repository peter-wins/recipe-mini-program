const test = require('node:test')
const assert = require('node:assert')
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..', 'miniprogram')
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8')

test('搜索历史：去重、最近优先、限条数、太短不记', () => {
  const storage = new Map()
  const previousWx = global.wx
  global.wx = {
    getStorageSync: key => (storage.has(key) ? structuredClone(storage.get(key)) : ''),
    setStorageSync: (key, value) => storage.set(key, structuredClone(value))
  }
  try {
    delete require.cache[require.resolve('../miniprogram/search-history')]
    const { readHistory, saveHistory, clearHistory, limitPerScope } = require('../miniprogram/search-history')

    assert.deepEqual(readHistory('recipe'), [], '初始为空')

    saveHistory('recipe', '土豆')
    saveHistory('recipe', '红烧肉')
    assert.deepEqual(readHistory('recipe'), ['红烧肉', '土豆'], '最近的在前')

    saveHistory('recipe', '土豆')
    assert.deepEqual(readHistory('recipe'), ['土豆', '红烧肉'], '重复词提到最前，不新增一条')

    saveHistory('recipe', '土')
    assert.deepEqual(readHistory('recipe'), ['土豆', '红烧肉'], '单字不记')

    saveHistory('recipe', '   ')
    assert.deepEqual(readHistory('recipe'), ['土豆', '红烧肉'], '空白不记')

    for (let i = 0; i < 12; i++) saveHistory('recipe', '菜' + i)
    assert.equal(readHistory('recipe').length, limitPerScope, '超出上限要截断')

    // 不同 scope 互不干扰
    saveHistory('ingredient', '菠菜')
    assert.deepEqual(readHistory('ingredient'), ['菠菜'])
    assert.ok(!readHistory('recipe').includes('菠菜'))

    assert.deepEqual(clearHistory('recipe'), [])
    assert.deepEqual(readHistory('recipe'), [], '清空生效')
    assert.deepEqual(readHistory('ingredient'), ['菠菜'], '清空不影响其它 scope')
  } finally {
    global.wx = previousWx
  }
})

test('异常反馈：失败用模态对话框带重试，不用一闪而过的 toast', () => {
  const previousWx = global.wx
  const toasts = []
  const modals = []
  global.wx = {
    showToast: options => toasts.push(options),
    showModal: options => modals.push(options)
  }
  try {
    delete require.cache[require.resolve('../miniprogram/feedback')]
    const { failure, toast, success } = require('../miniprogram/feedback')

    let retried = 0
    failure({ title: '没读出来', content: '再试试', onRetry: () => { retried++ } })
    assert.equal(modals.length, 1)
    assert.equal(modals[0].showCancel, true, '有重试时给两个选择')
    assert.equal(modals[0].confirmText, '重试')
    assert.equal(toasts.length, 0, '失败不应走 toast')
    modals[0].success({ confirm: true })
    assert.equal(retried, 1, '点重试要真的回调')

    // 没有重试回调时只留一个按钮，不给假选择
    failure({ title: '复制没成功' })
    assert.equal(modals[1].showCancel, false)
    assert.equal(modals[1].confirmText, '知道了')

    // 轻量提示仍走 toast
    toast('已保存')
    success('完成')
    assert.equal(toasts.length, 2)
  } finally {
    global.wx = previousWx
  }
})

test('云端同步有局部加载反馈，不出现无提示的空白', () => {
  const cloud = read('cloud-catalog.js')
  assert.ok(cloud.includes('subscribe'), '同步模块需暴露状态订阅')
  assert.ok(/notify\(\{ status: 'loading' \}\)/.test(cloud), '同步开始要发 loading')
  assert.ok(cloud.includes("status: 'idle'"), '同步结束要回到 idle')

  const wxml = read('pages/home/index.wxml')
  assert.ok(wxml.includes("syncState === 'loading'"), '首页要渲染加载条')
  assert.ok(wxml.includes('正在更新菜谱'), '加载条要有文字说明')

  // 食材详情页不能整页空白
  const detailJs = read('pages/guide-detail/index.js')
  const detailWxml = read('pages/guide-detail/index.wxml')
  assert.ok(detailJs.includes("status: 'loading'"), '详情页要有加载态')
  assert.ok(detailJs.includes("status: 'notFound'"), '详情页要有未找到态')
  assert.ok(detailWxml.includes("status === 'loading'"), '加载态要渲染')
  assert.ok(detailWxml.includes('retryLoad'), '未找到时给重试入口')
})

test('首页与食材页的搜索框都接了历史', () => {
  for (const page of ['pages/home/index', 'pages/guide/index']) {
    const js = read(page + '.js')
    const wxml = read(page + '.wxml')
    assert.ok(js.includes('search-history'), `${page} 应引入搜索历史模块`)
    assert.ok(js.includes('useSearchHistory'), `${page} 应支持点历史词直接搜`)
    assert.ok(wxml.includes('useSearchHistory'), `${page} 搜索历史需可点击`)
    assert.ok(wxml.includes('bindconfirm'), `${page} 键盘搜索键要能记录历史`)
  }
})

test('二级页面不重复造返回按钮（原生导航栏已提供）', () => {
  // 设计指南 2.1：原生导航栏自带返回，页内再放一个是冗余
  const aboutWxml = read('pages/about/index.wxml')
  const privacyWxml = read('pages/privacy/index.wxml')
  for (const [name, wxml] of [['关于页', aboutWxml], ['隐私页', privacyWxml]]) {
    const hasCustomBack = /bindtap="goBack"/.test(wxml)
    assert.ok(!hasCustomBack, `${name} 不应重复放返回按钮`)
  }
})

test('食材详情页：初始即 loading，不存在时进 notFound，不会留一帧空白', () => {
  const storage = new Map()
  const previousWx = global.wx
  const previousPage = global.Page
  const titles = []
  const modals = []
  global.wx = {
    getStorageSync: key => (storage.has(key) ? structuredClone(storage.get(key)) : ''),
    setStorageSync: (key, value) => storage.set(key, structuredClone(value)),
    showToast: () => {},
    showModal: options => modals.push(options),
    setNavigationBarTitle: options => titles.push(options.title)
  }
  let registered
  global.Page = page => { registered = page }
  try {
    delete require.cache[require.resolve('../miniprogram/pages/guide-detail/index')]
    require('../miniprogram/pages/guide-detail/index')
    assert.equal(registered.data.status, 'loading', '初始状态必须是 loading，不能是 ready')

    // 正常食材：直接 ready
    const ok = { ...registered, data: JSON.parse(JSON.stringify(registered.data)) }
    ok.setData = function (update) { Object.assign(this.data, update) }
    ok.onLoad({ id: 'spinach' })
    assert.equal(ok.data.status, 'ready')
    assert.ok(ok.data.item, '应取到随包食材')
    assert.ok(titles.some(t => t.includes('菠菜')), '标题应带食材名与搜索词')

    // 不存在的食材：进入 notFound，且不弹一闪而过的 toast
    const bad = { ...registered, data: JSON.parse(JSON.stringify(registered.data)) }
    bad.setData = function (update) { Object.assign(this.data, update) }
    bad.unloaded = false
    bad.onLoad({ id: '__not_exist__' })
    return new Promise(resolve => setTimeout(resolve, 60)).then(() => {
      assert.equal(bad.data.status, 'notFound', '找不到应进入 notFound 供页面渲染失败态')
    })
  } finally {
    global.wx = previousWx
    global.Page = previousPage
  }
})
