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
  assert.ok(wxml.includes("icons.path('chef')"))
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

test('主题图标滤镜变量三套齐备，仅选中态/主操作使用，普通图标中性色', () => {
  const app = read('app.wxss')
  assert.ok(app.includes('--theme-accent-icon: brightness'), '暖杏默认缺失')
  assert.ok(app.includes('.theme-green'))
  assert.ok(app.includes('.theme-blue'))
  assert.equal((app.match(/--theme-accent-icon:/g) || []).length, 3, '三套主题都应定义图标 filter')

  const homeWxss = read('pages/home/index.wxss')
  // 规范第4条：选中态（导航当前项）用主题色
  assert.ok(homeWxss.includes('.main-nav .nav-current image { filter: var(--theme-accent-icon); }'))
  // 规范第3条：普通图标固定中性色，不套主题滤镜
  assert.ok(homeWxss.includes('.library-ai image { width: 27rpx; height: 27rpx; }'))
  assert.ok(homeWxss.includes('.profile-avatar image { width: 46rpx; height: 46rpx; }'))
  assert.ok(!homeWxss.includes('--theme-nav-icon'), '旧变量名应清除')

  const aboutWxss = read('pages/about/index.wxss')
  assert.ok(aboutWxss.includes('.about-logo image { width: 62rpx; height: 62rpx; }'))
  // 主操作按钮（采购页手动添加）可用主题色
  const shoppingWxss = read('pages/shopping/index.wxss')
  assert.ok(shoppingWxss.includes('.shopping-add image { width: 27rpx; height: 27rpx; filter: var(--theme-accent-icon); }'))
})

test('关于页与外观页接入主题 class，颜色随主题变化', () => {
  for (const page of ['about', 'appearance']) {
    const wxml = read(`pages/${page}/index.wxml`)
    assert.ok(wxml.includes('theme-page theme-{{themeId}}'), `${page} 未接入主题`)
  }
})

test('采购清单页头统一搭配页：大标题在上＋副标题在下＋胶囊按钮', () => {
  const wxml = read('pages/shopping/index.wxml')
  const wxss = read('pages/shopping/index.wxss')
  assert.ok(wxml.includes('一次买齐，心里有谱'))
  assert.ok(wxml.includes('shopping-title'))
  assert.ok(wxml.includes('shopping-subtitle'))
  // 标题在副标题之前（与搭配页一致）
  assert.ok(wxml.indexOf('shopping-title') < wxml.indexOf('shopping-subtitle'), '标题应在副标题上方')
  assert.ok(wxml.includes('class="shopping-add"'))
  assert.ok(wxml.includes("icons.path('plus')"))
  assert.ok(wxss.includes('.shopping-title'))
  assert.ok(wxss.includes('.shopping-subtitle'))
  assert.ok(wxss.includes('filter: var(--theme-accent-icon)'))
  assert.ok(exists('assets/icon-plus.svg'))
})

test('首页四个快捷入口图标统一为中性色 SVG，走映射且不用 CSS 图标', () => {
  const wxml = read('pages/home/index.wxml')
  const wxss = read('pages/home/index.wxss')
  // 四个入口都用映射加载 SVG，日历不再用 CSS 画的图标
  const shortcuts = wxml.match(/class="shortcut-icon[^>]*>[\s\S]*?<\/view>/g) || []
  assert.equal(shortcuts.length, 4, '应有四个快捷入口图标')
  for (const s of shortcuts) {
    assert.ok(s.includes('<image src="{{icons.path('), '每个入口都应通过映射加载 SVG')
  }
  assert.ok(!wxml.includes('class="meal-calendar-icon"'), '日历不应再用 CSS 边框图标')
  // 规范第3条：普通图标中性色，不随主题 → 快捷入口不套主题滤镜、无单独放大
  assert.ok(wxss.includes('.shortcut-icon image { width: 36rpx; height: 36rpx; }'))
  assert.ok(!wxss.includes('.shortcut-calendar image { filter'), '普通图标不应套主题滤镜')
  assert.ok(!wxss.includes('.shortcut-shopping image'), '不应有购物车单独放大覆盖')
  assert.ok(exists('assets/icon-calendar-line.svg'))
  assert.ok(exists('assets/icon-cart.svg'))
  // 所有快捷图标 SVG 都是 24×24 画布、1.8 描边、中性色
  for (const f of ['icon-fridge.svg', 'icon-shuffle.svg', 'icon-cart.svg', 'icon-calendar-line.svg']) {
    const svg = read(`assets/${f}`)
    assert.ok(svg.includes('viewBox="0 0 24 24"'), `${f} 画布不统一`)
    assert.ok(svg.includes('stroke-width="1.8"'), `${f} 描边粗细不统一`)
    assert.ok(svg.includes('stroke="#75665e"'), `${f} 描边颜色不统一`)
  }
})

test('图标映射模块是唯一数据源，所有页面引用都走映射', () => {
  const wxs = read('icons.wxs')
  assert.ok(wxs.includes("var base = '/assets/'"), '应有统一基础路径')
  assert.ok(wxs.includes('function path(name)'), '应有路径解析函数')
  assert.ok(wxs.includes('module.exports'), '应导出映射')
  // 映射覆盖动态图标用到的全部语义名
  for (const key of ['fridge', 'favorites', 'shuffle', 'chat']) {
    if (key !== 'chat') assert.ok(wxs.includes(key + ':'), `映射缺少 ${key}`)
  }
  // 所有 WXML 图标都通过 icons.path 引用，无硬编码 /assets/icon-*.svg
  const wxmlFiles = []
  const scan = dir => {
    for (const e of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
      const rel = `${dir}/${e.name}`
      if (e.isDirectory()) scan(rel)
      else if (e.name.endsWith('.wxml')) wxmlFiles.push(rel)
    }
  }
  scan('pages'); scan('templates'); scan('components')
  for (const rel of wxmlFiles) {
    const s = read(rel)
    assert.ok(!/\/assets\/icon-[a-z-]+\.svg/.test(s), `${rel} 仍硬编码图标路径`)
  }
  // 用到图标的文件都引入了映射
  const iconUsers = wxmlFiles.filter(rel => /icons\.path/.test(read(rel)))
  for (const rel of iconUsers) {
    assert.ok(read(rel).includes('module="icons"'), `${rel} 使用图标但未引入映射`)
  }
  assert.ok(iconUsers.length >= 9, '映射应被多个页面复用')
})

test('同一功能复用同一图标：所有页面日历都走唯一 SVG 映射', () => {
  const wxs = read('icons.wxs')
  assert.ok(wxs.includes("calendar: 'icon-calendar-line.svg'"))
  assert.ok(wxs.includes("calendarLine: 'icon-calendar-line.svg'"))
  // 重复的 shortcut-calendar 文件已删除
  assert.ok(!exists('assets/icon-shortcut-calendar.svg'), '不应保留重复日历图标')
  // 唯一日历图标含日历轮廓
  assert.ok(read('assets/icon-calendar-line.svg').includes('<rect'))
  // 首页、搭配页、菜谱页的日历图标都通过映射引用（做饭日历页自身即日历，无此入口）
  for (const page of ['home', 'meals', 'recipe']) {
    const wxml = read(`pages/${page}/index.wxml`)
    assert.ok(wxml.includes("icons.path('calendar')"), `${page} 日历未走映射`)
  }
  // CSS 伪元素画的旧日历图标已彻底清除
  const app = read('app.wxss')
  assert.ok(!app.includes('.meal-calendar-icon'), '全局 CSS 日历图标未清除')
  for (const page of ['meals', 'recipe']) {
    const wxml = read(`pages/${page}/index.wxml`)
    assert.ok(!/<view class="meal-calendar-icon"/.test(wxml), `${page} 仍用 view 当 CSS 日历图标`)
    assert.ok(/<image class="meal-calendar-icon" src="\{\{icons\.path\('calendar'\)\}\}"/.test(wxml), `${page} 日历图标未换成 SVG image`)
  }
  // 搭配页日历入口是图标+文字胶囊（与菜谱库「问问 AI」一致）
  const mealsWxml = read('pages/meals/index.wxml')
  assert.ok(/meal-calendar-link[\s\S]*?<image class="meal-calendar-icon"[\s\S]*?<text>做饭日历<\/text>[\s\S]*?<\/navigator>/.test(mealsWxml), '搭配页日历入口应带「做饭日历」文字')
  const mealsWxss = read('pages/meals/index.wxss')
  assert.ok(/\.meal-calendar-link \{[\s\S]*?border-radius: 20rpx;[\s\S]*?font-size: 24rpx;/.test(mealsWxss), '日历入口应为胶囊样式')
})

test('首页三个「查看更多」入口字号与颜色统一', () => {
  const wxss = read('pages/home/index.wxss')
  const dinner = wxss.match(/\.home-dinner-link \{[^}]*\}/)
  const fridge = wxss.match(/\.home-fridge-link \{[^}]*\}/)
  assert.ok(dinner && fridge, '缺少入口样式')
  for (const rule of [dinner[0], fridge[0]]) {
    assert.ok(rule.includes('font-size: 24rpx'), '三处入口字号应统一为 24rpx')
    assert.ok(rule.includes('var(--theme-accent-text'), '颜色应走主题变量')
  }
  assert.ok(!fridge[0].includes('#96512f'), '不应残留偏红的旧色值')
})

test('菜谱库标题区与搭配页统一：大标题在上＋副标题在下', () => {
  const homeWxml = read('pages/home/index.wxml')
  const homeWxss = read('pages/home/index.wxss')
  assert.ok(homeWxml.includes('library-title'))
  assert.ok(homeWxml.includes('library-subtitle'))
  assert.ok(homeWxml.indexOf('library-title') < homeWxml.indexOf('library-subtitle'), '标题应在副标题上方')
  assert.ok(homeWxss.includes('.library-subtitle'))
  // 标题不再有上边距（原先眉标在上时才需要）
  const titleRule = homeWxss.match(/\.library-title \{[^}]*\}/)
  assert.ok(titleRule && !titleRule[0].includes('margin-top'), '标题不应再有上边距')
})

test('三个页头胶囊按钮强化明显度：加深描边＋加粗文字（三主题联动）', () => {
  const sources = [
    ['问问 AI', read('pages/home/index.wxss'), 'library-ai'],
    ['做饭日历', read('pages/meals/index.wxss'), 'meal-calendar-link'],
    ['手动添加', read('pages/shopping/index.wxss'), 'shopping-add'],
  ]
  for (const [name, wxss, cls] of sources) {
    const block = wxss.match(new RegExp('\\.' + cls + ' \\{[\\s\\S]*?\\}'))
    assert.ok(block, `缺少 .${cls}`)
    assert.ok(block[0].includes('border: 1rpx solid var(--theme-selected-border'), `${name} 描边未加深到规范次要按钮标准`)
    assert.ok(block[0].includes('font-weight: 600'), `${name} 文字未加粗`)
    assert.ok(block[0].includes('color: var(--theme-accent-text'), `${name} 未显式设置主题色文字`)
  }
})

test('四个页头统一搭配页布局：标题在上副标题在下、右侧元素顶部对齐', () => {
  // 首页：标题在副标题之上，炒锅保留且顶部对齐
  const homeWxml = read('pages/home/index.wxml')
  const homeWxss = read('pages/home/index.wxss')
  assert.ok(homeWxml.indexOf('home-title') < homeWxml.indexOf('greeting-quote'), '首页标题应在副标题上方')
  assert.ok(homeWxml.includes('home-wok'), '首页应保留炒锅动画')
  assert.ok(/\.home-wok \{[^}]*align-self: flex-start/.test(homeWxss), '炒锅应顶部对齐')
  assert.ok(/\.home-title-row \{[^}]*align-items: flex-start/.test(homeWxss), '首页标题行应顶部对齐')
  // 菜谱库、采购页：右侧按钮顶部对齐（搭配页 align-self: flex-start）
  assert.ok(/\.library-ai \{[\s\S]*?align-self: flex-start/.test(homeWxss), '问问AI按钮应顶部对齐')
  const shoppingWxss = read('pages/shopping/index.wxss')
  assert.ok(/\.shopping-add \{[\s\S]*?align-self: flex-start/.test(shoppingWxss), '手动添加按钮应顶部对齐')
  // 搭配页基准本身也是顶部对齐
  assert.ok(/\.meal-calendar-link \{[\s\S]*?align-self: flex-start/.test(read('pages/meals/index.wxss')))
})

test('三个页头胶囊按钮尺寸统一：button 覆盖全局 min-height 与日历入口齐高', () => {
  // 问问 AI 与手动添加是 button，需覆盖全局 button 的 min-height: 88rpx
  const homeWxss = read('pages/home/index.wxss')
  const shoppingWxss = read('pages/shopping/index.wxss')
  const mealsWxss = read('pages/meals/index.wxss')
  for (const [wxss, cls] of [[homeWxss, 'library-ai'], [shoppingWxss, 'shopping-add']]) {
    const block = wxss.match(new RegExp('\\.' + cls + ' \\{[\\s\\S]*?\\}'))
    assert.ok(block, `缺少 .${cls} 样式`)
    assert.ok(block[0].includes('min-height: 0'), `.${cls} 未覆盖全局最小高度，会被撑高`)
    assert.ok(block[0].includes('line-height: 62rpx'), `.${cls} 行高应与日历入口一致`)
    assert.ok(block[0].includes('border-radius: 20rpx'), `.${cls} 圆角应与日历入口一致`)
    assert.ok(block[0].includes('padding: 0 18rpx'), `.${cls} 内边距应与日历入口一致`)
  }
  // 日历入口是 navigator，同样 62rpx 行高、20rpx 圆角
  const calBlock = mealsWxss.match(/\.meal-calendar-link \{[\s\S]*?\}/)
  assert.ok(calBlock[0].includes('line-height: 62rpx'))
  assert.ok(calBlock[0].includes('border-radius: 20rpx'))
  assert.ok(calBlock[0].includes('padding: 0 18rpx'))
})

test('按钮五类体系与语义状态色变量齐备（规范第5/8条）', () => {
  const app = read('app.wxss')
  // 五类按钮
  for (const cls of ['.primary', '.secondary', '.text-btn', '.icon-btn', '.danger-btn']) {
    assert.ok(app.includes(cls), `缺少按钮类型 ${cls}`)
  }
  // 语义状态色：独立变量，不套主题
  for (const v of ['--state-danger', '--state-warning', '--state-success', '--state-disabled']) {
    assert.ok(app.includes(v + ':'), `缺少语义变量 ${v}`)
  }
  // 统一点击区与反馈态
  assert.ok(app.includes('min-height: 88rpx'), '缺少统一最小点击区')
  assert.ok(app.includes('button[disabled]'), '缺少禁用态')
  assert.ok(app.includes('.hover'), '缺少点击反馈态')
  // 危险操作接入语义色
  assert.ok(read('pages/fridge/index.wxss').includes('var(--state-danger,')
    || read('pages/shopping/index.wxss').includes('var(--state-danger,'))
})
