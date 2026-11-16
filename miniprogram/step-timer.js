// 从做法文字里挑出这一步真正要等的时长，给详情页生成计时按钮。
const chineseDigits = { 零: 0, 〇: 0, 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 }

function parseNumber(text) {
  if (/^\d+(?:\.\d+)?$/.test(text)) return Number(text)
  if (text === '半') return 0.5
  if (text === '十') return 10
  if (/^十[零〇一二三四五六七八九]$/.test(text)) return 10 + chineseDigits[text[1]]
  if (/^[二两三四五六七八九]十$/.test(text)) return chineseDigits[text[0]] * 10
  if (/^[二两三四五六七八九]十[零〇一二三四五六七八九]$/.test(text)) {
    return chineseDigits[text[0]] * 10 + chineseDigits[text[2]]
  }
  if (text.length === 1 && chineseDigits[text] !== undefined) return chineseDigits[text]
  return NaN
}

function unitSeconds(unit) {
  if (unit === '小时') return 3600
  if (unit === '分钟' || unit === '分') return 60
  return 1
}

function findDurations(text) {
  const pattern = /(\d+(?:\.\d+)?|[零〇一二两三四五六七八九十百]+|半)\s*(小时|分钟|秒钟|分|秒)/g
  const found = []
  let match
  while ((match = pattern.exec(text))) {
    const value = parseNumber(match[1])
    if (!Number.isFinite(value) || value <= 0) continue
    found.push({
      start: match.index,
      end: pattern.lastIndex,
      label: match[0].trim(),
      seconds: value * unitSeconds(match[2]),
      unit: match[2]
    })
  }
  return found
}

// 同一句里的「1 小时 30 分钟」按合计算；其余情况取最长的一段，避免把备料时间当计时。
function pickDuration(text) {
  const found = findDurations(text)
  if (!found.length) return null
  let best = null
  for (let index = 0; index < found.length; index++) {
    const current = { ...found[index] }
    const previous = found[index - 1]
    if (previous && previous.unit === '小时' && (current.unit === '分钟' || current.unit === '分')) {
      const gap = text.slice(previous.end, current.start)
      if (/^[\s又零的和]*$/.test(gap)) {
        current.seconds += previous.seconds
        current.label = previous.label + ' ' + current.label
      }
    }
    if (current.seconds >= 3 && current.seconds <= 6 * 3600 && (!best || current.seconds > best.seconds)) best = current
  }
  return best
}

function stepTimer(step) {
  const source = [step && step.body, step && step.title].filter(Boolean).join(' ')
  if (!source) return null
  const picked = pickDuration(source)
  if (!picked) return null
  return { seconds: Math.round(picked.seconds), timerText: picked.label }
}

function formatClock(seconds) {
  const total = Math.max(0, Math.ceil(seconds))
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const rest = total % 60
  const pad = value => String(value).padStart(2, '0')
  return hours ? `${hours}:${pad(minutes)}:${pad(rest)}` : `${pad(minutes)}:${pad(rest)}`
}

module.exports = { parseNumber, stepTimer, formatClock }
