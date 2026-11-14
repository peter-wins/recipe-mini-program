// 首页问候区：时段问候 + 日期 + 节日徽章 + 每日一句。
// 每日一句按日期轮换，保证同一天内刷新不变。

const { festivalOf } = require('./festival')

const DEFAULT_QUOTES = [
  { emoji: '🍳', text: '在外卖与做饭之间，我选择了做饭' },
  { emoji: '🥢', text: '认真吃饭的人，运气不会太差' },
  { emoji: '🍚', text: '今天也要好好吃饭呀' },
  { emoji: '🏠', text: '厨房的烟火气，是最踏实的幸福' },
  { emoji: '🍲', text: '再忙，也要给自己做一顿热乎的' },
  { emoji: '🥘', text: '不知道吃什么的时候，就做最想吃的那个' },
  { emoji: '🥬', text: '好好吃饭，是对生活最起码的尊重' }
]
const EMPTY_FRIDGE_QUOTES = [
  { emoji: '🧊', text: '冰箱空空如也，正好给自己一个采买的理由' },
  { emoji: '🛒', text: '打开冰箱看了眼，还是先去补点货吧' }
]
const NIGHT_QUOTES = [
  { emoji: '🌙', text: '深夜的厨房，适合煮一碗简单的面' },
  { emoji: '🍜', text: '深夜里，想吃的东西要趁热' }
]
const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

function greetingText(hour) {
  if (hour < 5) return '夜深了'
  if (hour < 9) return '早上好'
  if (hour < 12) return '上午好'
  if (hour < 14) return '中午好'
  if (hour < 18) return '下午好'
  if (hour < 23) return '晚上好'
  return '夜深了'
}

function daySeed(date) {
  return date.getFullYear() * 372 + (date.getMonth() + 1) * 31 + date.getDate()
}

function greetingInfo(date = new Date(), fridgeCount = 0) {
  const festival = festivalOf(date)
  const hour = date.getHours()
  let quote = festival ? { emoji: festival.emoji, text: festival.quote } : null
  if (!quote) {
    const night = hour >= 23 || hour < 5
    const pool = night ? NIGHT_QUOTES : (!fridgeCount ? EMPTY_FRIDGE_QUOTES : DEFAULT_QUOTES)
    quote = pool[daySeed(date) % pool.length]
  }
  return {
    text: greetingText(hour),
    dateText: `${date.getMonth() + 1}月${date.getDate()}日 星期${WEEKDAYS[date.getDay()]}`,
    festivalName: festival ? festival.name : '',
    quoteEmoji: quote.emoji,
    quoteText: quote.text
  }
}

module.exports = { greetingInfo }
