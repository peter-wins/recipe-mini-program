const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..', 'miniprogram')
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8')
const exists = rel => fs.existsSync(path.join(root, rel))

test('我的页按我的厨房与偏好与设置分组，五个改动点到位', () => {
  const wxml = read('pages/home/index.wxml')
  const wxss = read('pages/home/index.wxss')

  // 1. 顶部卡压缩、副标题改文案、线性头像
  assert.ok(wxml.includes('把每一餐，都过成喜欢的样子。'))
  assert.ok(!wxml.includes('会做饭的人'))
  assert.ok(wxml.includes('/assets/icon-chef-line.svg'))
  assert.ok(exists('assets/icon-chef-line.svg'))
  assert.ok(wxss.includes('.profile-head'))

  // 2. 三个统计收进白卡、竖线分隔
  assert.ok((wxml.match(/class="profile-stat"/g) || []).length === 3)
  assert.ok(wxss.includes('.profile-stat + .profile-stat { border-left:'))

  // 3. 功能入口分两组
  assert.ok(wxml.includes('>我的厨房</view>'))
  assert.ok(wxml.includes('>偏好与设置</view>'))
  for (const label of ['冰箱食材', '采购清单', '做饭日历', '主题外观', '意见反馈', '关于']) {
    assert.ok(wxml.includes(label), `缺少入口 ${label}`)
  }
  assert.ok(wxml.includes('/pages/meal-calendar/index'))
  assert.ok(wxml.includes('open-type="contact"'))

  // 入口两行结构与副标题文案
  for (const desc of ['随手记下家里的食材', '买菜不遗漏', '安排每天吃什么']) {
    assert.ok(wxml.includes(desc), `缺少副标题 ${desc}`)
  }
  assert.ok((wxml.match(/class="profile-row-copy"/g) || []).length === 6)
  assert.ok(wxss.includes('.profile-row-desc'))
  assert.ok(wxml.includes('吃饭得有谱 · 让每一餐都有好心情'))

  // 统计第三项改名烹饪记录
  assert.ok(wxml.includes('烹饪记录'))
  assert.ok(!wxml.includes('>做过的菜</'))
  const recordsJs = read('pages/records/index.js')
  assert.ok(recordsJs.includes("cooked: '烹饪记录'"))

  // 4. 主题平铺移除，改为二级页入口
  assert.ok(!wxml.includes('theme-options'))
  assert.ok(!wxml.includes('id="profile-themes"'))
  assert.ok(wxml.includes('/pages/appearance/index'))
  assert.ok(wxml.includes('{{themeName}}'))

  // 5. 版本大卡移除，改为关于入口
  assert.ok(!wxml.includes('profile-version'))
  assert.ok(!wxml.includes('releaseNotes'))
  assert.ok(wxml.includes('/pages/about/index'))
  assert.ok(wxml.includes('{{versionLabel}}'))
  assert.ok(!wxss.includes('.profile-version'))
})

test('关于页与主题外观页已建好并注册', () => {
  const app = JSON.parse(read('app.json'))
  for (const page of ['pages/about/index', 'pages/appearance/index']) {
    assert.ok(app.pages.includes(page), `未注册 ${page}`)
    for (const ext of ['js', 'json', 'wxml', 'wxss']) {
      assert.ok(exists(`${page}.${ext}`), `缺少 ${page}.${ext}`)
    }
  }
  const about = read('pages/about/index.js')
  assert.ok(about.includes('versionInfo'))
  assert.ok(about.includes('applyTheme'))
  const aboutWxml = read('pages/about/index.wxml')
  assert.ok(aboutWxml.includes('{{versionLabel}}'))
  assert.ok(aboutWxml.includes('{{releaseNotes}}'))

  const appearance = read('pages/appearance/index.js')
  assert.ok(appearance.includes('saveTheme'))
  assert.ok(appearance.includes('applyTheme(this, theme)'))
  const appearanceWxml = read('pages/appearance/index.wxml')
  assert.ok(appearanceWxml.includes('wx:for="{{themeOptions}}"'))
  assert.ok(appearanceWxml.includes('changeTheme'))
})

test('主题切换后同步主题名，供我的页入口展示', () => {
  const originalWx = global.wx
  const calls = []
  global.wx = {
    getStorageSync: () => 'green',
    setStorageSync: () => {},
    setNavigationBarColor: () => {},
    setBackgroundColor: () => {}
  }
  const { applyTheme, readTheme, themes } = require('../miniprogram/theme')
  try {
    assert.equal(readTheme().name, '青绿')
    const page = { data: {}, setData(data) { calls.push(data); Object.assign(this.data, data) } }
    applyTheme(page)
    assert.deepEqual(calls[0], { themeId: 'green', themeName: '青绿' })
    const again = calls.length
    applyTheme(page)
    assert.equal(calls.length, again, '同主题不重复 setData')
    applyTheme(page, themes[2])
    assert.equal(page.data.themeName, '雾蓝')
  } finally {
    global.wx = originalWx
  }
})

test('新入口图标文件齐备', () => {
  for (const icon of ['icon-chef-line.svg', 'icon-calendar-line.svg', 'icon-theme.svg', 'icon-info.svg']) {
    assert.ok(exists(`assets/${icon}`), `缺少 ${icon}`)
  }
})
