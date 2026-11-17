const { getRecipe } = require('./catalog')
const { getMealPlans, getArchivedMealPlan } = require('./meal-plans')
const { readPlanning, migrateLegacyCalendar, savePlanningChange } = require('./planning-sync')

const mealSlots = [
  { id: 'breakfast', label: '早餐' },
  { id: 'lunch', label: '午餐' },
  { id: 'dinner', label: '晚餐' }
]

function dateKey(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return date.getFullYear() + '-' + month + '-' + day
}

function parseDate(key) {
  if (typeof key !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(key)) return null
  const [year, month, day] = key.split('-').map(Number)
  if (year < 1000) return null
  const date = new Date(year, month - 1, day)
  return dateKey(date) === key ? date : null
}

function changeMonth(key, offset) {
  const date = parseDate(key)
  if (!date) return key
  const month = new Date(date.getFullYear(), date.getMonth() + offset, 1)
  const last = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  month.setDate(Math.min(date.getDate(), last))
  const target = dateKey(month)
  return parseDate(target) ? target : key
}

function calendarMonth(viewKey, schedules, today = dateKey(new Date()), selectedKey = viewKey) {
  const viewed = parseDate(viewKey)
  const year = viewed.getFullYear()
  const month = viewed.getMonth()
  const first = new Date(year, month, 1)
  const padding = (first.getDay() + 6) % 7
  const days = new Date(year, month + 1, 0).getDate()
  const cells = Array.from({ length: Math.ceil((padding + days) / 7) * 7 }, (_, index) => {
    const day = index - padding + 1
    if (day < 1 || day > days) return { key: 'blank-' + index }
    const key = dateKey(new Date(year, month, day))
    const dots = mealSlots.filter(slot => schedules[key] && schedules[key][slot.id])
    return {
      key, day, dots, today: key === today, selected: key === selectedKey,
      label: (month + 1) + '月' + day + '日' + (key === today ? '，今天' : '') + (dots.length ? '，已安排' + dots.length + '餐' : '')
    }
  })
  const selected = parseDate(selectedKey)
  const weekday = '日一二三四五六'[selected.getDay()]
  return {
    monthLabel: year + '年' + (month + 1) + '月',
    dayLabel: (selected.getMonth() + 1) + '月' + selected.getDate() + '日 · 周' + weekday,
    cells
  }
}

function readCalendar() {
  const { calendar } = readPlanning()
  const visible = {}
  for (const [date, day] of Object.entries(calendar)) {
    const entries = mealSlots.filter(slot => day && day[slot.id]).map(slot => [slot.id, day[slot.id]])
    if (entries.length) visible[date] = Object.fromEntries(entries)
  }
  return visible
}

function snapshotMealPlan(plan) {
  return {
    type: 'plan', id: plan.id, title: plan.title,
    dishes: plan.dishes.map(({ id, name }) => ({ id, name }))
  }
}

function prepareCalendarSnapshots() {
  migrateLegacyCalendar(calendar => {
    const pending = Object.values(calendar).some(day =>
      Object.values(day || {}).some(entry => entry && entry.type === 'plan' && !entry.dishes))
    if (!pending) return calendar

    const plans = new Map(getMealPlans([], { goal: 'all' }).map(plan => [plan.id, plan]))
    return Object.fromEntries(Object.entries(calendar).map(([date, day]) => [
      date, Object.fromEntries(Object.entries(day || {}).map(([slot, entry]) => {
        if (!entry || entry.type !== 'plan' || entry.dishes) return [slot, entry]
        const plan = plans.get(entry.id) || getArchivedMealPlan(entry.id)
        return [slot, plan ? snapshotMealPlan(plan) : entry]
      }))
    ]))
  })
}

function sameCalendarMeal(left, right) {
  if (!left || !right) return !left && !right
  if (left.type !== right.type) return false
  if (left.type === 'plan') {
    return left.id === right.id && left.title === right.title && JSON.stringify(left.dishes) === JSON.stringify(right.dishes)
  }
  if (left.type !== 'recipes') return left.id === right.id
  return Array.isArray(left.ids) && Array.isArray(right.ids) &&
    left.ids.length === right.ids.length && left.ids.every((id, index) => id === right.ids[index])
}

function getCalendarDishes(entry) {
  if (!entry) return []
  if (entry.type === 'plan') {
    return (entry.dishes || []).map(dish => {
      const recipe = getRecipe(dish.id)
      return { ...dish, id: recipe ? recipe.id : dish.id, image: recipe ? recipe.image : '', timeText: recipe ? recipe.timeText : '', unavailable: !recipe }
    })
  }
  const ids = entry.type === 'recipes' && Array.isArray(entry.ids) ? entry.ids : [entry.id]
  return [...new Set(ids)].map(id => getRecipe(id)).filter(Boolean)
    .map(({ id, name, image, timeText }) => ({ id, name, image, timeText }))
}

function saveCalendarMeal(date, slot, entry, expected) {
  if (!parseDate(date) || !mealSlots.some(item => item.id === slot)) return false
  const schedule = readCalendar()
  if (!sameCalendarMeal(schedule[date] && schedule[date][slot], expected)) return false

  savePlanningChange({ date, slot, entry, expected: expected || null })
  return true
}

module.exports = {
  dateKey, parseDate, changeMonth, calendarMonth, mealSlots, readCalendar, saveCalendarMeal, sameCalendarMeal, getCalendarDishes,
  snapshotMealPlan, prepareCalendarSnapshots
}
