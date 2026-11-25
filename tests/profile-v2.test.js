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
  for (const label of ['冰箱食材', '采购清单', '做饭日历', '食材指南', '主题外观', '意见反馈', '关于']) {
    assert.ok(wxml.includes(label), `缺少入口 ${label}`)
  }
  assert.ok(wxml.includes('/pages/meal-calendar/index'))
  assert.ok(wxml.includes('/pages/guide/index'))
  assert.ok(/url="\/pages\/guide\/index"[\s\S]*?icons\.path\('guideSpinach'\)/.test(wxml), '食材指南入口用独立菠菜图标，不与菜谱库重复')
  assert.ok(wxml.includes('open-type="contact"'))

  // 入口两行结构与副标题文案
  for (const desc of ['随手记下家里的食材', '买菜不遗漏', '安排每天吃什么', '认识食材，做对菜']) {
    assert.ok(wxml.includes(desc), `缺少副标题 ${desc}`)
  }
  assert.ok((wxml.match(/class="profile-row-copy"/g) || []).length === 7)
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

test('冰箱页采购图标背景在三个主题下都与页面底色有明显差异', () => {
  const app = read('app.wxss')
  const fridgeWxss = read('pages/fridge/index.wxss')
  // 图标背景必须用主题选中色，而不是与页面底色几乎同色的 soft
  assert.match(fridgeWxss, /\.fridge-cart \{[^}]*background: var\(--theme-selected/, '采购图标背景应走 --theme-selected')

  const rgb = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16))
  const dist = (a, b) => Math.sqrt(a.reduce((sum, v, i) => sum + (v - b[i]) ** 2, 0))

  for (const name of ['theme-page', 'theme-green', 'theme-blue']) {
    const block = app.match(new RegExp(`^\\.${name} \\{([^}]*)\\}`, 'm'))[1]
    const pageBg = rgb(block.match(/--theme-page-bg:\s*(#[0-9a-f]{6})/i)[1])
    const selected = rgb(block.match(/--theme-selected:\s*(#[0-9a-f]{6})/i)[1])
    assert.ok(dist(pageBg, selected) > 15, `${name} 下图标背景与页面底色太接近（色差 ${dist(pageBg, selected).toFixed(1)}）`)
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
  assert.ok(homeWxss.includes('.profile-avatar image { width: 46rpx; height: 46rpx; }'))
  assert.ok(!homeWxss.includes('--theme-nav-icon'), '旧变量名应清除')

  const aboutWxss = read('pages/about/index.wxss')
  assert.ok(aboutWxss.includes('.about-logo image { width: 62rpx; height: 62rpx; }'))
  // 主操作按钮（采购页手动添加）可用主题色
  const shoppingWxss = read('pages/shopping/index.wxss')
  assert.match(shoppingWxss, /\.shopping-add image[^\{]*\{[^}]*filter: var\(--theme-accent-icon\)/)
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
  assert.ok(wxml.includes('class="shopping-subtitle">{{usageNote}}'), '副标题复用用量提示文案')
  assert.ok(!wxml.includes('shopping-usage-note'), '页面底部旧提示行已移除')
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
  // 搭配页日历入口是图标+文字胶囊
  const mealsWxml = read('pages/meals/index.wxml')
  assert.ok(/meal-calendar-link[\s\S]*?<image class="meal-calendar-icon"[\s\S]*?<text>做饭日历<\/text>[\s\S]*?<\/navigator>/.test(mealsWxml), '搭配页日历入口应带「做饭日历」文字')
  const mealsWxss = read('pages/meals/index.wxss')
  assert.ok(/\.meal-calendar-link \{[\s\S]*?border-radius: 20rpx;[\s\S]*?font-size: (24rpx|var\(--fs-sm, 24rpx\));/.test(mealsWxss), '日历入口应为胶囊样式')
})

test('首页三个「查看更多」入口字号与颜色统一', () => {
  const wxss = read('pages/home/index.wxss')
  const dinner = wxss.match(/\.home-dinner-link \{[^}]*\}/)
  const fridge = wxss.match(/\.home-fridge-link \{[^}]*\}/)
  assert.ok(dinner && fridge, '缺少入口样式')
  for (const rule of [dinner[0], fridge[0]]) {
    assert.ok(/font-size: (24rpx|var\(--fs-sm, 24rpx\))/.test(rule), '三处入口字号应统一为 24rpx')
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

test('搭配页的页头按钮使用主题描边和较粗文字', () => {
  const sources = [
    ['做饭日历', read('pages/meals/index.wxss'), 'meal-calendar-link'],
  ]
  for (const [name, wxss, cls] of sources) {
    const block = wxss.match(new RegExp('\\.' + cls + ' \\{[\\s\\S]*?\\}'))
    assert.ok(block, `缺少 .${cls}`)
    assert.ok(block[0].includes('border: 1rpx solid var(--theme-selected-border'), `${name} 描边未加深到规范次要按钮标准`)
    assert.ok(block[0].includes('font-weight: 600'), `${name} 文字未加粗`)
    assert.ok(block[0].includes('color: var(--theme-accent-text'), `${name} 未显式设置主题色文字`)
  }
})

test('首页、菜谱库与搭配页保留顶部对齐的页头元素', () => {
  // 首页：标题在副标题之上，炒锅装饰已移除，标题行仍顶部对齐
  const homeWxml = read('pages/home/index.wxml')
  const homeWxss = read('pages/home/index.wxss')
  assert.ok(homeWxml.indexOf('home-title') < homeWxml.indexOf('greeting-quote'), '首页标题应在副标题上方')
  assert.ok(!homeWxml.includes('home-wok'), '首页炒锅装饰应已移除')
  assert.ok(!/wok-(pan|tilt|toss|steam)/.test(homeWxss), '炒锅相关样式与动画应清除')
  assert.ok(/\.home-title-row \{[^}]*align-items: flex-start/.test(homeWxss), '首页标题行应顶部对齐')
  // 「问问 AI」入口已移除，菜谱库页头不再有右侧按钮
  assert.ok(!homeWxml.includes('library-ai'), '问问AI按钮应已移除')
  // 搭配页基准本身也是顶部对齐
  assert.ok(/\.meal-calendar-link \{[\s\S]*?align-self: flex-start/.test(read('pages/meals/index.wxss')))
})

test('包内图片音频资源总量不超过 200K（微信代码质量硬指标）', () => {
  const fs = require('fs')
  const path = require('path')
  const dir = path.join(__dirname, '..', 'miniprogram')
  let total = 0
  const walk = d => {
    for (const name of fs.readdirSync(d)) {
      const full = path.join(d, name)
      if (fs.statSync(full).isDirectory()) walk(full)
      else if (/\.(png|jpe?g|gif|webp|svg|mp3|wav|m4a|aac)$/i.test(name)) total += fs.statSync(full).size
    }
  }
  walk(dir)
  assert.ok(total <= 200 * 1024, `包内图片音频共 ${(total / 1024).toFixed(0)}K，超过 200K；大图应改走云存储 pageImage`)
})

test('全小程序无深度合成/AI 相关字样，符合个人主体类目', () => {
  const fs = require('fs')
  const path = require('path')
  const dir = path.join(__dirname, '..', 'miniprogram')
  const banned = /问问\s*AI|AI\s*智能|人工智能|深度合成|AI问答|AI\s*问答|AI绘画|AI换脸|deepseek|大模型/i
  const hits = []
  const walk = d => {
    for (const name of fs.readdirSync(d)) {
      const full = path.join(d, name)
      if (fs.statSync(full).isDirectory()) walk(full)
      else if (/\.(js|wxml|wxss|json)$/.test(name)) {
        const text = fs.readFileSync(full, 'utf8')
        if (banned.test(text)) hits.push(path.relative(dir, full))
      }
    }
  }
  walk(dir)
  assert.deepEqual(hits, [], '以下文件仍含 AI/深度合成字样：' + hits.join(', '))
})

test('日历入口页头按钮尺寸规范，且 AI 相关功能已移除', () => {
  const mealsWxss = read('pages/meals/index.wxss')
  const calBlock = mealsWxss.match(/\.meal-calendar-link \{[\s\S]*?\}/)
  assert.ok(calBlock[0].includes('line-height: 62rpx'))
  assert.ok(calBlock[0].includes('border-radius: 20rpx'))
  assert.ok(calBlock[0].includes('padding: 0 18rpx'))
  // 个人主体小程序未开放深度合成类目，AI 入口与页面必须彻底移除
  const homeWxml = read('pages/home/index.wxml')
  const homeJs = read('pages/home/index.js')
  const homeWxss = read('pages/home/index.wxss')
  const app = JSON.parse(read('app.json'))
  assert.ok(!/问问\s*AI|library-ai|showAiDevelopment/.test(homeWxml + homeJs + homeWxss), '首页不应残留问问AI入口')
  assert.ok(!app.pages.includes('pages/recommend/index'), 'recommend 页应从注册中移除')
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

test('四个页头距顶部统一：容器 20rpx + 页头 12rpx = 实际 32rpx', () => {
  const appWxss = read('app.wxss')
  const homeWxss = read('pages/home/index.wxss')
  const mealsWxss = read('pages/meals/index.wxss')
  const shoppingWxss = read('pages/shopping/index.wxss')

  // 容器层：.screen 默认 padding-top 20rpx，首页 match 的 home-screen 特例须与之对齐
  const screenRule = appWxss.match(/\.screen \{[\s\S]*?\}/)[0]
  assert.ok(/padding: 20rpx/.test(screenRule), '.screen 默认顶部间距应为 20rpx')
  const homeScreenRule = homeWxss.match(/\.screen\.home-screen \{[^}]*\}/)[0]
  assert.ok(/padding-top: 20rpx/.test(homeScreenRule), '首页容器应与其它页顶部对齐（20rpx）')

  // 页头层：四页自身顶部间距统一为 12rpx
  const greetingRule = homeWxss.match(/\.home-greeting \{[^}]*\}/)[0]
  const libraryRule = homeWxss.match(/\.library-header \{[^}]*\}/)[0]
  const mealRule = mealsWxss.match(/\.meal-page \{[^}]*\}/)[0]
  const shoppingRule = shoppingWxss.match(/\.shopping-head \{[^}]*\}/)[0]
  assert.ok(/margin: 12rpx/.test(greetingRule), '首页页头顶部间距应为 12rpx')
  assert.ok(/margin: 12rpx/.test(libraryRule), '菜谱库页头顶部间距应为 12rpx')
  assert.ok(/padding-top: 12rpx/.test(mealRule), '搭配页页头顶部间距应为 12rpx')
  assert.ok(/padding: 12rpx /.test(shoppingRule), '采购页页头顶部间距应为 12rpx')
})

test('冰箱页改版：轮播置顶、已有食材置顶分组、采购图标独立于搜索栏', () => {
  const wxml = read('pages/fridge/index.wxml')
  const wxss = read('pages/fridge/index.wxss')

  // 1. 顶部轮播：swiper + indicator + banner 资源，且位于搜索栏之前
  assert.ok(/<swiper[\s\S]*?indicator-dots[\s\S]*?fridge-banner/.test(wxml) || wxml.includes('<swiper class="fridge-banner"'), '顶部应有轮播图')
  assert.ok(wxml.indexOf('fridge-banner') < wxml.indexOf('fridge-search-row'), '轮播应在搜索栏之上')
  // 轮播插画走云存储 CDN，不再打包进代码包
  assert.ok(!exists('assets/banner-cook.png'), '轮播插画不应再打包进代码包')
  const fridgeJs = read('pages/fridge/index.js')
  assert.ok(fridgeJs.includes("pageImage('banner-cook.png')"), '轮播引用云端锅图')
  assert.ok(fridgeJs.includes("require('../../recipe-image')"), '冰箱页应引入云图地址工具')
  assert.ok(!wxml.includes('fridge-banner-eyebrow') && !read('pages/fridge/index.js').includes('今日灵感'), 'banner 已移除「今日灵感」眉题')
  assert.ok(wxss.includes('.fridge-banner {'), '缺少轮播样式')

  // 2. 「已有食材」放在横滑分类首位
  assert.ok(!wxml.includes('fridge-card'), '不应再保留旧的顶部食材卡')
  assert.match(wxml, /class="fridge-groups" scroll-x/)
  const js = read('pages/fridge/index.js')
  assert.ok(js.includes("const MY_FRIDGE_GROUP = '已有食材'"), '应定义已有食材分组')
  assert.ok(js.includes('fridgeGroupNames: [MY_FRIDGE_GROUP, ...'), '已有食材应置顶第一组')
  assert.ok(js.includes('groupIndex === 0'), '分组0应走已有食材逻辑')

  // 3. 采购图标在搜索栏外，与搜索框是兄弟节点，不被包裹
  assert.ok(/<view class="fridge-search-row">[\s\S]*?<view class="recipe-search fridge-search">[\s\S]*?<\/view>\s*<navigator class="fridge-cart"/.test(wxml), '采购图标应在搜索栏外')
  assert.ok(wxml.includes("icons.path('cart')"), '采购图标应走映射')
  assert.ok(!wxml.includes('fridge-icon'), '旧图标类应移除')
  assert.ok(wxss.includes('.fridge-cart {'), '缺少独立采购图标样式')
  // 采购图标背景用对比更强的选中色，保证三个主题下都能与页面底色区分
  assert.match(wxss, /\.fridge-cart \{[^}]*background: var\(--theme-selected, #fbecdc\)/, '采购图标背景应为主题选中色')

  // 4. 已有食材标题下显示总数与移除提示，清空直达二次确认
  assert.match(wxml, /共 {{selected.length}} 种食材/)
  assert.ok(wxml.includes('点击食材可移除'))
  assert.ok(wxml.includes('bindtap="clearInventory"'), '清空按钮应直接打开确认弹窗')
  assert.ok(js.includes("confirmColor: '#c04040'"), '清空确认使用危险色')
})

test('冰箱页「已有食材」分组内容跟随已登记食材，其它分组顺延', () => {
  const originalPage = global.Page
  let opts
  try {
    global.Page = value => { opts = value }
    delete require.cache[require.resolve('../miniprogram/pages/fridge/index.js')]
    require('../miniprogram/pages/fridge/index.js')
  } finally {
    global.Page = originalPage
  }
  const page = { data: opts.data, setData(patch) { Object.assign(this.data, patch) } }
  for (const key of Object.keys(opts)) {
    if (typeof opts[key] === 'function' && key !== 'setData') page[key] = opts[key].bind(page)
  }
  assert.equal(page.data.fridgeGroupNames[0], '已有食材')
  assert.equal(page.data.fridgeGroupNames.length, 7)
  assert.equal(page.data.fridgeGroupNames[1], '蔬菜')
  assert.equal(page.data.fridgeGroupIndex, 0)
  assert.deepEqual(page.data.visibleIngredients, [])

  const egg = getIngredientOptionsForTest().find(item => item.id === 'egg')
  const tomato = getIngredientOptionsForTest().find(item => item.id === 'tomato')
  page.updateSelection([egg.id, tomato.id])
  assert.deepEqual(page.data.visibleIngredients.map(item => item.name).sort(), [egg.name, tomato.name].sort())
  assert.ok(page.data.visibleIngredients.every(item => item.checked), '已有食材分组里都是已选状态')

  const stockedIds = getIngredientOptionsForTest().slice(0, 19).map(item => item.id)
  page.updateSelection(stockedIds.slice(0, 18))
  assert.equal(page.data.visibleIngredients.length, 18)
  assert.equal(page.data.hasMoreIngredients, false)
  page.updateSelection(stockedIds)
  assert.equal(page.data.visibleIngredients.length, 18)
  assert.equal(page.data.hasMoreIngredients, true)
  page.loadMoreIngredients()
  assert.equal(page.data.visibleIngredients.length, 19)
  assert.equal(page.data.hasMoreIngredients, false)

  // 切到蔬菜分组（索引1）不应把手边食材当成普通分组内容
  page.selectIngredientGroup({ currentTarget: { dataset: { index: 1 } } })
  assert.ok(page.data.visibleIngredients.some(item => item.id !== egg.id), '蔬菜分组应展示目录内容')

  // 搜索走全量搜索，不受分组索引影响
  page.searchIngredients({ detail: { value: '牛腩' } })
  assert.ok(page.data.searching)
  assert.ok(page.data.visibleIngredients.length > 0)
})

function getIngredientOptionsForTest() {
  return require('../miniprogram/catalog').getIngredientOptions()
}

test('食材指南：分组、菠菜介绍原文与菜谱关联', () => {
  const guide = require('../miniprogram/guide-data')
  assert.deepEqual(guide.groups, ['叶菜', '根茎', '瓜果', '菌菇', '蛋豆', '肉水产'])

  const list = guide.listIngredients()
  assert.ok(list.some(item => item.id === 'spinach' && item.group === '叶菜'))
  assert.ok(list.some(item => item.id === 'cabbage'))
  assert.ok(list.every(item => typeof item.recipeCount === 'number'))

  const spinach = guide.getIngredient('spinach')
  assert.ok(spinach.therapy.includes('补血止血'))
  assert.ok(spinach.audience.includes('高血压'))
  assert.equal(spinach.storage.length, 3)
  assert.equal(spinach.tips.length, 2)
  // 选购与保存、烹饪技巧按书页原文录入（含关键信息与错字修正）
  assert.ok(spinach.storage[0].includes('根部呈鲜艳的深粉红色'))
  assert.ok(spinach.storage[0].includes('不带黄、烂叶者'))
  assert.ok(spinach.storage[1].includes('可保存5天左右'))
  assert.ok(spinach.storage[2].includes('再置冰箱内冷冻'))
  assert.ok(!spinach.storage.join('').includes('冰籍') && !spinach.tips.join('').includes('菠莱'), '错字应已修正')
  assert.ok(spinach.tips[0].includes('草酸钙') && spinach.tips[0].includes('海带、紫菜'))
  assert.ok(spinach.tips[1].includes('以除去大部分草酸'))
  assert.ok(spinach.recipes.length > 0, '菠菜应关联到现有菜谱')
  assert.ok(spinach.recipes.every(r => r.id && r.name))

  assert.equal(guide.getIngredient('not-exist'), null)
  // 内容仍为空的条目必须标记待补录，避免空介绍被当成完整内容展示（全填满时自动通过）
  for (const item of guide.ingredients) {
    const empty = !item.therapy && !(item.storage && item.storage.length) && !(item.tips && item.tips.length)
    if (empty) assert.ok(item.pending, `${item.id} 空内容条目应标记待补录`)
  }
})

test('食材指南两个页面结构完整且走主题', () => {
  const listWxml = read('pages/guide/index.wxml')
  const detailWxml = read('pages/guide-detail/index.wxml')
  const detailJs = read('pages/guide-detail/index.js')
  const app = JSON.parse(read('app.json'))

  assert.ok(listWxml.includes('theme-page theme-{{themeId}}'))
  assert.ok(listWxml.includes('guide-groups') && listWxml.includes('guide-list'))
  assert.ok(listWxml.includes('searchIngredients') && listWxml.includes('openDetail'))

  assert.ok(detailWxml.includes('theme-page theme-{{themeId}}'))
  for (const field of ['detail-tag-therapy', 'detail-tag-audience', '挑选与保存', '下厨小贴士', '用{{item.name}}做菜']) {
    assert.ok(detailWxml.includes(field), `详情页缺少 ${field}`)
  }
  assert.ok(detailWxml.includes('bindtap="openRecipe"'))
  assert.ok(detailJs.includes('/pages/recipe/index?id='))

  assert.ok(app.pages.includes('pages/guide/index'))
  assert.ok(app.pages.includes('pages/guide-detail/index'))
  assert.ok(exists('assets/guide-spinach.svg')) // 其它占位食材仍共用
  assert.ok(!exists('assets/guide-spinach.png'), '菠菜大图不打包进小程序，走云端')

  // 菠菜插画：透明底 PNG、2:1 横版；本地源图放项目根目录 guide-covers/，展示走云端
  const guideData = require('../miniprogram/guide-data')
  const { cloudStorageBase } = require('../miniprogram/recipe-image')
  assert.equal(guideData.getIngredient('spinach').image, cloudStorageBase + 'guide-covers/spinach.png', '菠菜图应从云端加载')
  const listConfig = JSON.parse(read('pages/guide/index.json'))
  const detailConfig = JSON.parse(read('pages/guide-detail/index.json'))
  for (const config of [listConfig, detailConfig]) {
    assert.equal(config.usingComponents['recipe-cover'], '/components/recipe-cover/index', '食材页应复用菜谱封面组件加载云图')
  }
  assert.ok((listWxml.match(/<recipe-cover/g) || []).length >= 1, '列表页应用封面组件渲染食材图')
  assert.ok((detailWxml.match(/<recipe-cover/g) || []).length >= 2, '详情页食材图与关联菜谱图都应走封面组件')
  assert.equal(guideData.getIngredient('cabbage').image, cloudStorageBase + 'guide-covers/cabbage.png', '已配图的占位食材从云端加载')
  assert.equal(guideData.getIngredient('egg').image, cloudStorageBase + 'guide-covers/egg.png', '鸡蛋已配真图，从云端加载')
  assert.equal(guideData.bundled.filter(item => !item.image).length, 0, '全部 18 条已配齐，无占位食材')
})

// 源图放在 guide-covers/，该目录被 .gitignore 排除，只存在于有资产的开发机。
// 独立成项并显式 skip：缺图时输出 skipped，而不是伪装成 pass。
test('菠菜源图尺寸与透明通道', (t) => {
  const fs = require('fs')
  const spinachPath = 'guide-covers/spinach.png'
  if (!fs.existsSync(spinachPath)) {
    t.skip('缺 guide-covers/spinach.png，跳过尺寸校验')
    return
  }
  const png = fs.readFileSync(spinachPath)
  assert.equal(png.readUInt32BE(16), 1200, '宽度应为 1200')
  assert.equal(png.readUInt32BE(20), 600, '高度应为 600')
  assert.equal(png[25], 6, '应为 RGBA 透明 PNG（颜色类型 6）')
})

test('食材插画按 id 复用：只返回云端真图，未知食材返回空', () => {
  const { guideCover } = require('../miniprogram/guide-data')
  assert.match(guideCover('spinach'), /^cloud:\/\/.*guide-covers\/spinach\.png$/, '菠菜有云端真图')
  assert.match(guideCover('cabbage'), /^cloud:\/\//, '已配图的占位食材返回云端图')
  assert.match(guideCover('egg'), /^cloud:\/\/.*guide-covers\/egg\.png$/, '鸡蛋已配真图，从云端加载')
  assert.equal(guideCover('unknown-id'), '', '未知食材返回空')
  assert.equal(guideCover(''), '', '空 id 返回空')
})

test('冰箱页与采购清单页在有图食材名称左侧显示缩略图，不改变行高', () => {
  const fridgeWxml = read('pages/fridge/index.wxml')
  const fridgeWxss = read('pages/fridge/index.wxss')
  const fridgeJs = read('pages/fridge/index.js')
  const fridgeJson = JSON.parse(read('pages/fridge/index.json'))
  const shoppingWxml = read('pages/shopping/index.wxml')
  const shoppingWxss = read('pages/shopping/index.wxss')
  const shoppingJs = read('pages/shopping/index.js')
  const shoppingJson = JSON.parse(read('pages/shopping/index.json'))

  // 两页都注册封面组件，并从指南数据按 id 挂 coverUrl
  assert.equal(fridgeJson.usingComponents['recipe-cover'], '/components/recipe-cover/index')
  assert.equal(shoppingJson.usingComponents['recipe-cover'], '/components/recipe-cover/index')
  assert.ok(fridgeJs.includes('coverUrl: guideCover(id)'), '冰箱页按 id 取图')
  assert.ok(shoppingJs.includes('coverUrl: guideCover(item.key)'), '采购页按食材 id 取图')

  // 缩略图仅在有图时渲染，且放在名称之前（左侧）
  assert.match(fridgeWxml, /<recipe-cover wx:if="\{\{item\.coverUrl\}\}"[^>]*class="fridge-option-cover"[^>]*mode="aspectFill"[\s\S]*?fridge-option-name/, '冰箱页缩略图在有图时显示于名称左侧，且裁切填满格子')
  assert.match(shoppingWxml, /<recipe-cover wx:if="\{\{item\.coverUrl\}\}"[^>]*class="shopping-item-cover"[^>]*mode="aspectFill"[\s\S]*?shopping-item-name/, '采购页缩略图在有图时显示于名称左侧，且裁切填满格子')

  // 缩略图固定 64rpx 正方，不参与撑高：父容器最小高度仍是 88rpx
  assert.ok(/\.fridge-option-cover \{[^}]*flex: 0 0 64rpx[^}]*height: 64rpx/.test(fridgeWxss), '冰箱缩略图固定尺寸且不可伸缩')
  assert.ok(/\.shopping-item-cover \{[^}]*flex: 0 0 64rpx[^}]*height: 64rpx/.test(shoppingWxss), '采购缩略图固定尺寸且不可伸缩')
  assert.ok(/\.fridge-option \{[^}]*min-height: 88rpx/.test(fridgeWxss), '冰箱行高不变')
  assert.ok(/\.shopping-row-main \{[^}]*min-height: 88rpx/.test(shoppingWxss), '采购行高不变')
})

test('采购清单「加入清单」按钮局部降到 76rpx，不动全局最小点击区', () => {
  const shoppingWxss = read('pages/shopping/index.wxss')
  const appWxss = read('app.wxss')

  // 局部覆盖：只针对手动添加弹层里的 primary，降到与「取消」齐平
  assert.ok(shoppingWxss.includes('.shopping-entry-actions .primary'), '应有针对加入清单按钮的局部覆盖')
  assert.ok(/\.shopping-entry-actions \.primary \{[^}]*min-height: 76rpx/.test(shoppingWxss), '局部应降到 76rpx')
  assert.ok(/\.shopping-entry-actions \.primary \{[^}]*line-height: 76rpx/.test(shoppingWxss), '行高同步 76rpx')

  // 全局最小点击区规范保持不变（0,2,0 的局部选择器可覆盖全局 button 的 0,0,1）
  assert.ok(/button \{[^}]*min-height: 88rpx/.test(appWxss), '全局 button 最小点击区应保持 88rpx')
})

test('食材指南云同步接入启动流程，两个页面可刷新', () => {
  const app = read('app.js')
  const listJs = read('pages/guide/index.js')
  const detailJs = read('pages/guide-detail/index.js')

  assert.ok(app.includes("require('./cloud-guide')"), 'app 应引入云指南模块')
  assert.ok(app.includes('loadCachedGuide()'), '启动应加载本地指南缓存')
  assert.ok(app.includes('syncGuide()'), '应在同步流程调用 syncGuide')
  assert.ok(/function syncCloudContent\(\)[\s\S]*syncCatalog\(\)[\s\S]*syncGuide\(\)/.test(app), '云内容同步应同时含菜谱与指南')

  for (const [name, source] of [['列表页', listJs], ['详情页', detailJs]]) {
    assert.ok(source.includes('refreshGuideData'), `${name}应实现 refreshGuideData`)
    assert.ok(/onShow\(\)[\s\S]*refreshGuideData\(\)/.test(source), `${name}回到前台应刷新`)
  }
  assert.ok(listJs.includes('getGuideGroups'), '列表分组应跟随云端数据')
})

test('菜谱页可打开采购清单，清单末尾提供图文两种导出', () => {
  const recipeWxml = read('pages/recipe/index.wxml')
  const recipeJs = read('pages/recipe/index.js')
  const shoppingWxml = read('pages/shopping/index.wxml')
  const shoppingJs = read('pages/shopping/index.js')

  assert.ok(!recipeWxml.includes('复制缺料'), '菜谱详情页不再有复制缺料按钮')
  assert.ok(!recipeJs.includes('copyMissing'), '复制缺料方法已移除')
  assert.ok(recipeWxml.includes('看清单'), '看清单仍保留')

  assert.ok(/bindtap="exportPoster"[\s\S]*?icons\.path\('image'\)[\s\S]*?保存图片/.test(shoppingWxml), '保存图片按钮带图片图标')
  assert.ok(shoppingWxml.includes('id="shopping-poster"'), '应有离屏 canvas 节点')
  assert.ok(shoppingJs.includes('canvasToTempFilePath') && shoppingJs.includes('saveImageToPhotosAlbum'), '应导出图片并保存相册')
  assert.ok(/auth|deny/.test(shoppingJs), '应识别相册权限被拒')

  const shoppingWxss = read('pages/shopping/index.wxss')
  assert.match(shoppingWxss, /\.shopping-export \{[^}]*display: flex/, '图文导出应并排')
  assert.match(shoppingWxml, /<view wx:if="{{!selecting}}" class="shopping-export">/)

  assert.ok(/\.shopping-item-copy \{[^}]*display: flex/.test(shoppingWxss), '食材名与用量容器应横排')
  assert.ok(/\.shopping-item-name \{[^}]*display: inline/.test(shoppingWxss), '食材名不应独占一行')
  assert.match(shoppingWxml, /class="shopping-select" bindtap="toggleSelection"/)
  assert.match(shoppingWxml, /class="shopping-item-toggle" bindtap="toggleDetails"/)
  assert.match(shoppingWxml, /class="shopping-details">[\s\S]*?bindtap="removeItem"/)
  assert.ok(shoppingWxml.includes("icons.path('copy')"), '复制按钮图标走统一映射')
  assert.ok(exists('assets/icon-copy.svg'), '复制图标文件存在')
  assert.ok(read('icons.wxs').includes('copy: \'icon-copy.svg\''), '映射注册了复制图标')
  assert.ok(exists('assets/icon-image.svg'), '图片图标文件存在')
  assert.ok(read('icons.wxs').includes('image: \'icon-image.svg\''), '映射注册了图片图标')
  assert.ok(exists('assets/icon-spinach.svg'), '菠菜图标文件存在')
  assert.ok(read('icons.wxs').includes('guideSpinach: \'icon-spinach.svg\''), '映射注册了食材指南菠菜图标')
  assert.ok(shoppingWxml.includes('bindtap="copyTextList"'), '复制按钮绑定复制方法')
  assert.ok(shoppingJs.includes('setClipboardData'), '复制方法写入剪贴板')
  assert.match(shoppingWxml, /url="\/pages\/home\/index\?view=library"/)
  assert.ok(shoppingWxml.includes('{{usageNote}}'), '清单页应显示用量提示')
  assert.ok(shoppingJs.includes('usageNote'), '页面从绘图模块复用同一句提示文案')
  assert.ok(/button \{[^}]*min-height: 88rpx/.test(read('app.wxss')), '全局最小点击区规范保持不变')
})

test('食材指南发布校验：版本号、数量与已有 ID 保护', () => {
  const { bundled } = require('../miniprogram/guide-data')
  const { validRelease, validateGuide, parseRelease } = require('../miniprogram/guide-release')
  const groups = ['叶菜', '根茎', '瓜果', '菌菇', '蛋豆', '肉水产']
  const source = { groups, ingredients: bundled }

  assert.ok(validRelease({ schemaVersion: 1, version: 'c'.repeat(32), ingredientCount: bundled.length }))
  assert.ok(!validRelease({ schemaVersion: 2, version: 'c'.repeat(32), ingredientCount: bundled.length }))
  assert.ok(!validRelease({ schemaVersion: 1, version: 'bad', ingredientCount: bundled.length }))
  assert.ok(!validRelease({ schemaVersion: 1, version: 'c'.repeat(32), ingredientCount: bundled.length - 1 }))

  assert.doesNotThrow(() => validateGuide(source))
  assert.throws(() => validateGuide({ groups, ingredients: bundled.slice(1) }), /缺少已有食材 ID/)
  assert.throws(() => validateGuide({ groups: [], ingredients: bundled }), /分组格式/)
  assert.throws(() => parseRelease(JSON.stringify({ schemaVersion: 2, version: 'c'.repeat(32), ingredientCount: bundled.length, ...source })), /发布版本/)
})

test('关于页有隐私说明与数据来源两个入口，名称与品牌定稿一致', () => {
  const wxml = read('pages/about/index.wxml')
  const js = read('pages/about/index.js')
  const wxss = read('pages/about/index.wxss')
  // 隐私说明入口
  assert.ok(wxml.includes('url="/pages/privacy/index"'), '关于页需有隐私说明入口')
  assert.ok(wxml.includes('隐私说明'))
  // 数据来源署名
  assert.ok(wxml.includes('数据来源'), '关于页需有数据来源区')
  assert.ok(js.includes('HowToCook'), '需署名 HowToCook')
  assert.ok(js.includes('EveryDay_Food'), '需署名每日食光')
  assert.ok(js.includes('MIT'), '需标注 MIT')
  // 名称统一为品牌简称
  assert.ok(js.includes("appName: '吃饭搭子'"), '关于页名称应为「吃饭搭子」')
  // 卡片跟随主题，不再写死白色
  assert.ok(!/background:\s*#fff\s*;/.test(wxss), '卡片底色应走主题变量')
  // 返回交给原生导航栏（设计指南 2.1），页内不重复造；分享要有
  assert.ok(js.includes('onShareAppMessage'), '关于页应可分享')
})

test('隐私说明页已注册，且如实覆盖云端收集的数据项', () => {
  const app = JSON.parse(read('app.json'))
  assert.ok(app.pages.includes('pages/privacy/index'), '隐私说明页需注册')
  const js = read('pages/privacy/index.js')
  // 逐项对应云函数 syncKitchen 真实收集的字段
  for (const key of ['openid', '冰箱', '收藏', '日历']) {
    assert.ok(js.includes(key), `隐私说明需覆盖：${key}`)
  }
  // 不收集的项也要写明
  for (const key of ['位置', '相册', '手机号']) {
    assert.ok(js.includes(key), `需说明不收集：${key}`)
  }
  const wxml = read('pages/privacy/index.wxml')
  assert.ok(wxml.includes('隐私说明'), '页面需有标题')
})
