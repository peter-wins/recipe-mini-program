const { festivalOf } = require('./festival')

const mealQuotes = {
  breakfast: ['早餐想吃什么？来份简单的', '早上先吃顿热乎的'],
  lunch: ['午饭吃点什么？看看今天这道菜', '忙到中午，也给自己留点吃饭的时间'],
  dinner: ['晚饭想吃什么？今晚做这道菜吧', '忙完一天，坐下来好好吃顿晚饭'],
  night: ['深夜想吃点什么？来个简单的', '深夜里，想吃的东西要趁热']
}
const emptyFridgeQuotes = {
  breakfast: '先看看早餐灵感，顺手记下冰箱里有什么',
  lunch: '午饭先看看灵感，也可以补几样冰箱食材',
  dinner: '晚饭先挑道想吃的，有空再记下冰箱食材'
}
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

function mealPeriodForHour(hour) {
  if (hour < 5 || hour >= 23) return 'night'
  if (hour < 10) return 'breakfast'
  if (hour < 16) return 'lunch'
  return 'dinner'
}

function daySeed(date) {
  return date.getFullYear() * 372 + (date.getMonth() + 1) * 31 + date.getDate()
}

function greetingInfo(date = new Date(), fridgeCount = 0) {
  const festival = festivalOf(date)
  const hour = date.getHours()
  const period = mealPeriodForHour(hour)
  const pool = mealQuotes[period]
  const quoteText = (festival && festival.quote) ||
    (!fridgeCount && emptyFridgeQuotes[period]) ||
    pool[daySeed(date) % pool.length]
  return {
    ...greetingForHour(hour),
    period,
    dateText: `${date.getMonth() + 1}月${date.getDate()}日 星期${WEEKDAYS[date.getDay()]}`,
    festivalName: festival ? festival.name : '',
    quoteText
  }
}

module.exports = { greetingInfo }
