// 采购清单导出图片：布局与绘制逻辑。
// 纯逻辑、ctx 可注入，页面只负责取 canvas 节点与保存相册。
const posterWidth = 750
const sidePadding = 56
const headerHeight = 190
const rowHeight = 76
const footerHeight = 110
const bottomPadding = 36
const usageNote = '用量根据菜谱计算，购买请以实际用途为准'

function dateLabel(date) {
  const value = date instanceof Date ? date : new Date()
  return `${value.getMonth() + 1} 月 ${value.getDate()} 日`
}

function shortText(text, limit) {
  const value = text === undefined || text === null ? '' : String(text)
  return value.length > limit ? value.slice(0, limit) + '…' : value
}

function buildLayout(items, date) {
  const rows = (items || []).map(item => ({
    name: shortText(item.name, 14),
    quantity: shortText(item.quantity || '', 12)
  }))
  return {
    width: posterWidth,
    height: headerHeight + rows.length * rowHeight + footerHeight + bottomPadding,
    title: '采购清单',
    subtitle: `${dateLabel(date)} · 一次买齐，心里有谱`,
    rows,
    note: usageNote
  }
}

// 文本清单：与图片同源的标题/日期/项数，适合粘贴到微信、备忘录
function buildText(items, date) {
  const rows = (items || []).map(item => {
    const name = item.name === undefined || item.name === null ? '' : String(item.name)
    const quantity = item.quantity === undefined || item.quantity === null ? '' : String(item.quantity)
    return quantity ? `${name} ${quantity}` : name
  })
  return [
    `采购清单（${dateLabel(date)}）`,
    ...rows,
    `共 ${rows.length} 项`
  ].join('\n')
}

function draw(ctx, layout) {
  const { width, height, title, subtitle, rows, note } = layout
  ctx.fillStyle = '#FFFDF9'
  ctx.fillRect(0, 0, width, height)

  ctx.textAlign = 'center'
  ctx.fillStyle = '#5D4037'
  ctx.font = 'bold 40px sans-serif'
  ctx.fillText(title, width / 2, 78)
  ctx.fillStyle = '#75665E'
  ctx.font = '20px sans-serif'
  ctx.fillText(subtitle, width / 2, 120)
  ctx.strokeStyle = '#D9C7B5'
  ctx.setLineDash([6, 6])
  ctx.beginPath()
  ctx.moveTo(sidePadding, 148)
  ctx.lineTo(width - sidePadding, 148)
  ctx.stroke()
  ctx.setLineDash([])

  rows.forEach((row, index) => {
    const top = headerHeight + index * rowHeight
    ctx.textAlign = 'left'
    ctx.fillStyle = '#5D4037'
    ctx.font = '26px sans-serif'
    ctx.fillText(row.name, sidePadding, top + 34)
    ctx.textAlign = 'right'
    ctx.fillStyle = '#75665E'
    ctx.font = '22px sans-serif'
    ctx.fillText(row.quantity, width - sidePadding, top + 34)
    ctx.strokeStyle = '#F0E4D8'
    ctx.beginPath()
    ctx.moveTo(sidePadding, top + rowHeight)
    ctx.lineTo(width - sidePadding, top + rowHeight)
    ctx.stroke()
  })

  const footerTop = headerHeight + rows.length * rowHeight + 48
  if (note) {
    ctx.textAlign = 'center'
    ctx.fillStyle = '#75665E'
    ctx.font = '19px sans-serif'
    ctx.fillText(note, width / 2, footerTop + 44)
  }
  ctx.textAlign = 'left'
  void height
}

module.exports = { posterWidth, usageNote, dateLabel, shortText, buildLayout, buildText, draw }
