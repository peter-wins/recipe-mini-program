const assert = require('node:assert/strict')
const test = require('node:test')

const { posterWidth, buildLayout, buildText, draw, shortText } = require('../miniprogram/shopping-poster')

test('清单图布局：宽度固定，高度随条目数增长不被截断', () => {
  const empty = buildLayout([])
  const three = buildLayout([
    { name: '菠菜', quantity: '200 克' },
    { name: '鸡蛋', quantity: '2 个' },
    { name: '牛奶', quantity: '2 盒' }
  ], new Date(2026, 10, 22))
  const ten = buildLayout(Array.from({ length: 10 }, (_, i) => ({ name: '食材' + i, quantity: '1 份' })))

  assert.equal(three.width, posterWidth)
  assert.ok(three.height > empty.height, '有条目时比空清单高')
  assert.ok(ten.height > three.height, '条目越多画布越高，长清单不截断')
  assert.equal(three.rows.length, 3)
  assert.equal(three.title, '采购清单')
  assert.match(three.subtitle, /11 月 22 日/)
  assert.match(three.footer, /共 3 项/)
  assert.match(three.note, /用量.*实际用途为准/)
  assert.equal(three.note, require('../miniprogram/shopping-poster').usageNote)
})

test('清单图只写菜名与用量，不含操作按钮文案', () => {
  const layout = buildLayout([
    { name: '菠菜', quantity: '200 克' },
    { name: '鸡蛋', quantity: '2 个' }
  ])
  const text = [layout.title, layout.subtitle, layout.footer,
    ...layout.rows.flatMap(row => [row.name, row.quantity])].join(' ')
  for (const word of ['已买', '移除', '多选', '复制缺料', '手动添加']) {
    assert.ok(!text.includes(word), `图上不应出现「${word}」`)
  }
  assert.equal(layout.rows[0].name, '菠菜')
  assert.equal(layout.rows[0].quantity, '200 克')
})

test('文本清单：标题、日期、逐项名称用量与项数，适合粘贴转发', () => {
  const text = buildText([
    { name: '菠菜', quantity: '200 克' },
    { name: '鸡蛋', quantity: '2 个' },
    { name: '牛奶', quantity: '' }
  ], new Date(2026, 10, 22))
  const lines = text.split('\n')

  assert.match(lines[0], /^采购清单（11 月 22 日）$/)
  assert.equal(lines[1], '菠菜 200 克')
  assert.equal(lines[2], '鸡蛋 2 个')
  assert.equal(lines[3], '牛奶', '无用量时只留名称，不留多余空格')
  assert.match(lines[4], /^共 3 项$/)
  for (const word of ['已买', '移除', '多选', '复制缺料', '手动添加']) {
    assert.ok(!text.includes(word), `文字清单不应出现「${word}」`)
  }
})

test('超长名称省略，避免文字溢出画布', () => {
  assert.equal(shortText('很短', 14), '很短')
  assert.equal(shortText('一二三四五六七八九十一二三四五六', 14), '一二三四五六七八九十一二三四…')
  const layout = buildLayout([{ name: '一二三四五六七八九十一二三四五六', quantity: '' }])
  assert.ok(layout.rows[0].name.endsWith('…'))
})

test('绘制指令写入每一行且不重复叠加', () => {
  const calls = []
  const ctx = {
    fillRect: (...args) => calls.push(['fillRect', ...args]),
    fillText: (text, x, y) => calls.push(['fillText', text, x, y]),
    beginPath: () => calls.push(['beginPath']),
    moveTo: (...args) => calls.push(['moveTo', ...args]),
    lineTo: (...args) => calls.push(['lineTo', ...args]),
    stroke: () => calls.push(['stroke']),
    setLineDash: () => {},
    scale: () => {}
  }
  const layout = buildLayout([
    { name: '菠菜', quantity: '200 克' },
    { name: '鸡蛋', quantity: '2 个' }
  ], new Date(2026, 10, 22))
  draw(ctx, layout)

  const texts = calls.filter(call => call[0] === 'fillText').map(call => call[1])
  assert.equal(texts.filter(text => text === '菠菜').length, 1)
  assert.equal(texts.filter(text => text === '鸡蛋').length, 1)
  assert.ok(texts.includes('200 克') && texts.includes('2 个'))
  assert.ok(texts.includes('采购清单'))
  assert.ok(texts.some(text => /用量.*实际用途为准/.test(text)), '图上应画出用量提示')
  assert.equal(calls.filter(call => call[0] === 'fillRect').length, 1)
})

test('导出清单图：取 canvas、按像素比绘制并保存相册', async () => {
  const previousPage = global.Page
  const previousWx = global.wx
  let definition
  const calls = []
  const ctx = { fillRect: () => {}, fillText: () => {}, beginPath: () => {}, moveTo: () => {}, lineTo: () => {}, stroke: () => {}, setLineDash: () => {}, scale: (x, y) => calls.push(['scale', x, y]) }
  const canvas = { getContext: () => ctx }
  try {
    global.Page = value => { definition = value }
    delete require.cache[require.resolve('../miniprogram/pages/shopping/index.js')]
    require('../miniprogram/pages/shopping/index.js')
  } finally {
    global.Page = previousPage
  }
  try {
    global.wx = {
      showLoading: () => calls.push(['loading']),
      hideLoading: () => calls.push(['hideLoading']),
      showToast: options => calls.push(['toast', options.title]),
      showModal: () => calls.push(['modal']),
      getSystemInfoSync: () => ({ pixelRatio: 2 }),
      createSelectorQuery: () => {
        calls.push(['query'])
        return {
          in: () => ({
            select: selector => {
              assert.equal(selector, '#shopping-poster')
              return {
                fields: () => ({
                  exec: callback => callback([{ node: canvas }])
                })
              }
            }
          })
        }
      },
      canvasToTempFilePath: options => {
        calls.push(['toTemp', canvas.width, canvas.height])
        options.success({ tempFilePath: '/tmp/poster.png' })
      },
      saveImageToPhotosAlbum: options => {
        calls.push(['save', options.filePath])
        options.success()
      }
    }
    const items = [
      { name: '菠菜', quantity: '200 克' },
      { name: '鸡蛋', quantity: '2 个' },
      { name: '牛奶', quantity: '2 盒' }
    ]
    const page = {
      ...definition,
      data: { items, updating: false },
      setData(update) { Object.assign(this.data, update) }
    }
    page.exportPoster()
    assert.ok(calls.some(call => call[0] === 'query'), '应查询 canvas 节点')
    assert.deepEqual(calls.find(call => call[0] === 'scale'), ['scale', 2, 2], '按设备像素比放大')
    assert.deepEqual(calls.find(call => call[0] === 'toTemp'), ['toTemp', 1500, 1212], '画布按布局尺寸放大')
    assert.deepEqual(calls.find(call => call[0] === 'save'), ['save', '/tmp/poster.png'])
    assert.deepEqual(calls.find(call => call[0] === 'toast'), ['toast', '已存到相册'])
    assert.equal(page.data.posterHeight, 606, '画布高度随清单条目数增长')
  } finally {
    global.wx = previousWx
  }
})

test('复制文字清单：调用剪贴板写入逐项内容并提示成功', () => {
  const previousPage = global.Page
  const previousWx = global.wx
  let definition
  try {
    global.Page = value => { definition = value }
    delete require.cache[require.resolve('../miniprogram/pages/shopping/index.js')]
    require('../miniprogram/pages/shopping/index.js')
  } finally {
    global.Page = previousPage
  }

  let clipboard
  const toasts = []
  try {
    global.wx = {
      setClipboardData: options => { clipboard = options.data; options.success() },
      showToast: options => toasts.push(options.title)
    }
    const items = [
      { name: '菠菜', quantity: '200 克' },
      { name: '鸡蛋', quantity: '2 个' }
    ]
    const page = {
      ...definition,
      data: { items, updating: false },
      setData(update) { Object.assign(this.data, update) }
    }
    page.copyTextList()
    assert.match(clipboard, /^采购清单（/)
    assert.ok(clipboard.includes('菠菜 200 克'))
    assert.ok(clipboard.includes('鸡蛋 2 个'))
    assert.ok(clipboard.includes('共 2 项'))
    assert.ok(toasts.includes('已复制，去粘贴吧'))
  } finally {
    global.wx = previousWx
  }
})

test('复制失败时给出提示，不误报成功', () => {
  const previousPage = global.Page
  const previousWx = global.wx
  let definition
  try {
    global.Page = value => { definition = value }
    delete require.cache[require.resolve('../miniprogram/pages/shopping/index.js')]
    require('../miniprogram/pages/shopping/index.js')
  } finally {
    global.Page = previousPage
  }

  const toasts = []
  try {
    global.wx = {
      setClipboardData: options => options.fail(),
      showToast: options => toasts.push(options.title)
    }
    const page = {
      ...definition,
      data: { items: [{ name: '菠菜', quantity: '200 克' }], updating: false },
      setData(update) { Object.assign(this.data, update) }
    }
    page.copyTextList()
    assert.ok(toasts.includes('复制失败，请重试'))
    assert.ok(!toasts.includes('已复制，去粘贴吧'), '失败不应提示成功')
  } finally {
    global.wx = previousWx
  }
})

test('相册权限被拒时给出去设置的弹窗，不误报成功', () => {
  const previousPage = global.Page
  const previousWx = global.wx
  let definition
  try {
    global.Page = value => { definition = value }
    delete require.cache[require.resolve('../miniprogram/pages/shopping/index.js')]
    require('../miniprogram/pages/shopping/index.js')
  } finally {
    global.Page = previousPage
  }

  let modal
  const toasts = []
  const ctx = { fillRect: () => {}, fillText: () => {}, beginPath: () => {}, moveTo: () => {}, lineTo: () => {}, stroke: () => {}, setLineDash: () => {}, scale: () => {} }
  try {
    global.wx = {
      showLoading: () => {},
      hideLoading: () => {},
      showToast: options => toasts.push(options.title),
      showModal: options => { modal = options },
      getSystemInfoSync: () => ({ pixelRatio: 1 }),
      createSelectorQuery: () => ({ in: () => ({ select: () => ({ fields: () => ({ exec: cb => cb([{ node: { getContext: () => ctx } }]) }) }) }) }),
      canvasToTempFilePath: options => options.success({ tempFilePath: '/tmp/poster.png' }),
      saveImageToPhotosAlbum: options => options.fail({ errMsg: 'saveImageToPhotosAlbum:fail auth deny' })
    }
    const page = {
      ...definition,
      data: { items: [{ name: '菠菜', quantity: '200 克' }], updating: false },
      setData(update) { Object.assign(this.data, update) }
    }
    page.exportPoster()
    assert.equal(modal.title, '需要相册权限')
    assert.equal(modal.confirmText, '去设置')
    assert.ok(!toasts.includes('已存到相册'), '权限被拒不应提示成功')
  } finally {
    global.wx = previousWx
  }
})
