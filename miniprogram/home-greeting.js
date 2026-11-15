// 首页问候区：时段问候 + 日期 + 节日徽章 + 每日一句。
// 每日一句按日期轮换，保证同一天内刷新不变。

const { festivalOf } = require('./festival')

const DEFAULT_QUOTES = [
  '在外卖与做饭之间，我选择了做饭',
  '认真吃饭的人，运气不会太差',
  '今天也要好好吃饭呀',
  '厨房的烟火气，是最踏实的幸福',
  '再忙，也要给自己做一顿热乎的',
  '不知道吃什么的时候，就做最想吃的那个',
  '好好吃饭，是对生活最起码的尊重'
]
const EMPTY_FRIDGE_QUOTES = [
  '冰箱空空如也，正好给自己一个采买的理由',
  '打开冰箱看了眼，还是先去补点货吧'
]
const NIGHT_QUOTES = [
  '深夜的厨房，适合煮一碗简单的面',
  '深夜里，想吃的东西要趁热'
]
const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

function greetingForHour(hour) {
  if (hour < 5) return { text: '夜深了', emoji: '🌙' }
  if (hour < 9) return { text: '早上好', emoji: '🌅' }
  if (hour < 12) return { text: '上午好', emoji: '🌤️' }
  if (hour < 14) return { text: '中午好', emoji: '☀️' }
  if (hour < 18) return { text: '下午好', emoji: '🍵' }
  if (hour < 23) return { text: '晚上好', emoji: '🌆' }
  return { text: '夜深了', emoji: '🌙' }
}

function daySeed(date) {
  return date.getFullYear() * 372 + (date.getMonth() + 1) * 31 + date.getDate()
}

function greetingInfo(date = new Date(), fridgeCount = 0) {
  const festival = festivalOf(date)
  const hour = date.getHours()
  let quoteText = festival ? festival.quote : null
  if (!quoteText) {
    const night = hour >= 23 || hour < 5
    const pool = night ? NIGHT_QUOTES : (!fridgeCount ? EMPTY_FRIDGE_QUOTES : DEFAULT_QUOTES)
    quoteText = pool[daySeed(date) % pool.length]
  }
  return {
    ...greetingForHour(hour),
    dateText: `${date.getMonth() + 1}月${date.getDate()}日 星期${WEEKDAYS[date.getDay()]}`,
    festivalName: festival ? festival.name : '',
    quoteText
  }
}

module.exports = { greetingInfo }
