const test = require('node:test')
const assert = require('node:assert/strict')
const { dateKey, changeMonth, calendarMonth, readCalendar, saveCalendarMeal } = require('../miniprogram/meal-calendar')

test('月历按周一开始，切月跨年，月末选中有效日期', () => {
  assert.equal(changeMonth('2026-12-31', 1), '2027-01-31')
  assert.equal(changeMonth('2028-01-31', 1), '2028-02-29')
  assert.equal(changeMonth('2027-01-31', 1), '2027-02-28')
  const december = calendarMonth('2026-12-31', {}, '2026-12-31')
  assert.equal(december.cells[0].day, undefined)
  assert.equal(december.cells[1].key, '2026-12-01')
  assert.equal(december.cells.find(cell => cell.selected).today, true)
  assert.equal(december.cells.length % 7, 0)
})

test('日历显示单道菜和整套餐的图片，独立选菜页可确认添加和更换，采购只汇总未来三天', t => {
  let definitions
  let modal
  let actionSheet
  let navigation
  let navigationEvents
  const storage = new Map([['recipe-week-dinners-v1', { '2024-02-29': 'egg-broccoli' }]])
  global.wx = {
    getStorageSync: key => storage.get(key),
    setStorageSync: (key, value) => { storage.set(key, structuredClone(value)) },
    getAccountInfoSync: () => ({ miniProgram: { envVersion: 'develop' } }),
    showToast() {},
    setNavigationBarTitle() {},
    pageScrollTo() {},
    navigateTo({ url, events, success }) {
      navigation = url
      navigationEvents = events
      if (success) success()
    },
    navigateBack() {},
    showModal: options => { modal = options },
    showActionSheet: options => { actionSheet = options }
  }
  let componentDefinition
  global.Component = value => { componentDefinition = value; definitions = value }
  global.Page = value => { definitions = value }
  t.after(() => {
    delete global.wx
    delete global.Component
    delete global.Page
  })

  require('../miniprogram/components/recipe-picker/index')
  const pickerDefinition = componentDefinition
  const makePicker = page => {
    const picker = {
      ...pickerDefinition.methods,
      data: { ...pickerDefinition.data, ...Object.fromEntries(Object.entries(pickerDefinition.properties).map(([key, prop]) => [key, prop.value])) },
      setData(update) { Object.assign(this.data, update) },
      triggerEvent(name, detail) { if (name === 'confirm') page.onPickerConfirm({ detail }) }
    }
    picker.setSelection(picker.data.initial)
    picker.updateChoices()
    return picker
  }

  require('../miniprogram/pages/meals/index')
  const component = {
    ...definitions.methods,
    data: { ...definitions.data, inventory: [], inventoryReady: true },
    setData(update) { Object.assign(this.data, update) }
  }
  definitions.lifetimes.attached.call(component)

  const tap = dataset => ({ currentTarget: { dataset } })
  component.openMealComposer()
  assert.equal(navigation, '/pages/compose-meal/index')
  require('../miniprogram/pages/compose-meal/index')
  const composer = {
    ...definitions,
    data: { ...definitions.data },
    setData(update) { Object.assign(this.data, update) },
    getOpenerEventChannel: () => ({ emit: event => navigationEvents[event]() })
  }
  composer.onLoad()
  const composerPicker = makePicker(composer)
  composerPicker.searchChoices({ detail: { value: '蒸水蛋' } })
  const egg = composerPicker.data.choices.find(recipe => recipe.title === '蒸水蛋')
  composerPicker.selectChoice(tap({ id: egg.id }))
  composerPicker.searchChoices({ detail: { value: '金针菇汤' } })
  const soup = composerPicker.data.choices.find(recipe => recipe.title === '金针菇汤')
  composerPicker.selectChoice(tap({ id: soup.id }))
  composer.updateTitle({ detail: { value: '蒸蛋配汤' } })
  composerPicker.confirm()
  assert.equal(component.data.goal, 'custom')
  const [custom] = component.data.plans
  assert.equal(custom.title, '蒸蛋配汤')
  assert.deepEqual(custom.dishes.map(dish => dish.id), [egg.id, soup.id])

  require('../miniprogram/pages/meal-calendar/index')
  const page = {
    ...definitions,
    data: { ...definitions.data },
    setData(update) { Object.assign(this.data, update) }
  }
  page.onLoad({ planId: custom.id })
  page.onShow()
  const today = dateKey(new Date())
  assert.equal(page.data.selectedDate, today)
  assert.equal(page.data.intent.title, custom.title)
  assert.deepEqual(readCalendar(), {})

  const currentMonth = page.data.monthLabel
  assert.ok(page.data.visibleDays.length >= 28)
  page.stepCalendar(tap({ step: -1 }))
  assert.notEqual(page.data.monthLabel, currentMonth)
  assert.equal(page.data.selectedDate, today)
  assert.equal(page.data.visibleDays.some(cell => cell.selected), false)
  page.stepCalendar(tap({ step: 1 }))
  assert.equal(page.data.monthLabel, currentMonth)
  assert.equal(page.data.visibleDays.find(cell => cell.selected).key, today)

  page.refreshCalendar('2028-01-31')
  page.stepCalendar(tap({ step: 1 }))
  assert.equal(page.data.monthLabel, '2028年2月')
  assert.equal(page.data.selectedDate, '2028-01-31')
  assert.match(page.data.dayLabel, /^1月31日 · /)
  page.stepCalendar(tap({ step: -1 }))
  assert.equal(page.data.visibleDays.find(cell => cell.selected).key, '2028-01-31')
  page.stepCalendar(tap({ step: 1 }))
  page.selectDay(tap({ date: '2028-02-29' }))
  assert.equal(page.data.selectedDate, '2028-02-29')
  assert.match(page.data.dayLabel, /^2月29日 · /)

  const day = '2028-02-29'
  page.refreshCalendar(day)
  page.tapMeal(tap({ slot: 'dinner' }))
  const dinner = () => page.data.meals.find(meal => meal.id === 'dinner')
  assert.equal(dinner().title, custom.title)
  assert.ok(egg.image)
  assert.equal(dinner().dishes[0].image, egg.image)
  assert.ok(dinner().dishes.every(dish => dish.image))

  require('../miniprogram/pages/calendar-picker/index')
  const pickerPageDefinition = definitions
  const openPicker = slot => {
    const route = new URL(navigation, 'https://miniprogram.invalid')
    assert.equal(route.pathname, '/pages/calendar-picker/index')
    assert.equal(route.searchParams.get('date'), day)
    assert.equal(route.searchParams.get('slot'), slot)
    const picker = {
      ...pickerPageDefinition,
      data: { ...pickerPageDefinition.data },
      setData(update) { Object.assign(this.data, update) }
    }
    picker.onLoad(Object.fromEntries(route.searchParams))
    const initialSelection = picker.data.selected
    const inner = makePicker(picker)
    Object.assign(inner.data, {
      label: picker.data.label, dateLabel: picker.data.dateLabel,
      currentTitle: picker.data.currentTitle, replacing: picker.data.replacing,
      errorMessage: picker.data.errorMessage, saving: picker.data.saving
    })
    picker.data = inner.data
    picker.setData = update => {
      Object.assign(inner.data, update)
      if (Object.prototype.hasOwnProperty.call(update, 'selected')) inner.setSelection(update.selected)
    }
    picker.searchChoices = inner.searchChoices.bind(inner)
    picker.changeCategory = inner.changeCategory.bind(inner)
    picker.selectSceneTag = inner.selectSceneTag.bind(inner)
    picker.changeCookMethod = inner.changeCookMethod.bind(inner)
    picker.clearFilters = inner.clearFilters.bind(inner)
    picker.selectChoice = inner.selectChoice.bind(inner)
    picker.confirmChoice = inner.confirm.bind(inner)
    inner.setSelection(initialSelection)
    inner.updateChoices()
    return picker
  }

  page.tapMeal(tap({ slot: 'breakfast' }))
  const breakfastPicker = openPicker('breakfast')
  assert.equal(breakfastPicker.data.label, '早餐')
  assert.ok(breakfastPicker.data.choices.some(choice => choice.image))
  breakfastPicker.searchChoices({ detail: { value: '蒸水蛋' } })
  const { getRecipe } = require('../miniprogram/catalog')
  const category = breakfastPicker.data.categories.indexOf('蛋类')
  const scene = breakfastPicker.data.sceneTags.indexOf('早餐')
  breakfastPicker.changeCategory({ detail: { value: String(category) } })
  breakfastPicker.selectSceneTag({ currentTarget: { dataset: { index: scene } } })
  assert.equal(breakfastPicker.data.search, '蒸水蛋')
  assert.equal(breakfastPicker.data.choices[0].id, egg.id)
  assert.ok(breakfastPicker.data.choices.every(choice => {
    const recipe = getRecipe(choice.id)
    return recipe.libraryCategory === '蛋类' && recipe.tags.includes('早餐')
  }))
  breakfastPicker.selectChoice(tap({ id: egg.id }))
  breakfastPicker.clearFilters()
  breakfastPicker.changeCookMethod({ detail: { value: String(breakfastPicker.data.methodTags.indexOf('微波炉')) } })
  assert.equal(breakfastPicker.data.tagIndex, 0)
  assert.equal(breakfastPicker.data.methodIndex, breakfastPicker.data.methodTags.indexOf('微波炉'))
  breakfastPicker.selectSceneTag({ currentTarget: { dataset: { index: scene } } })
  assert.equal(breakfastPicker.data.methodIndex, 0)
  breakfastPicker.clearFilters()
  breakfastPicker.searchChoices({ detail: { value: '金针菇汤' } })
  breakfastPicker.selectChoice(tap({ id: soup.id }))
  assert.deepEqual(breakfastPicker.data.selected.map(choice => choice.id), [egg.id, soup.id])
  assert.equal(readCalendar()[day].breakfast, undefined)
  breakfastPicker.confirmChoice()
  page.onShow()
  const breakfast = page.data.meals.find(meal => meal.id === 'breakfast')
  assert.deepEqual(breakfast.dishes.map(dish => dish.id), [egg.id, soup.id])
  assert.equal(breakfast.dishes[0].image, egg.image)
  assert.deepEqual(readCalendar()[day].breakfast, { type: 'recipes', ids: [egg.id, soup.id] })
  page.openMealMenu(tap({ slot: 'breakfast' }))
  actionSheet.success({ tapIndex: 0 })
  const breakfastEditor = openPicker('breakfast')
  assert.deepEqual(breakfastEditor.data.selected.map(choice => choice.id), [egg.id, soup.id])
  breakfastEditor.searchChoices({ detail: { value: '蒸水蛋' } })
  breakfastEditor.selectChoice(tap({ id: soup.id }))
  assert.deepEqual(breakfastEditor.data.selected.map(choice => choice.id), [egg.id])
  breakfastEditor.confirmChoice()
  assert.deepEqual(readCalendar()[day].breakfast, { type: 'recipe', id: egg.id })
  page.onShow()

  page.tapMeal(tap({ slot: 'lunch' }))
  const lunchPicker = openPicker('lunch')
  lunchPicker.openMealPairings()
  const pairingsRoute = new URL(navigation, 'https://miniprogram.invalid')
  assert.equal(pairingsRoute.pathname, '/pages/home/index')
  require('../miniprogram/pages/home/index')
  const home = {
    ...definitions,
    data: { ...definitions.data },
    setData(update, callback) { Object.assign(this.data, update); if (callback) callback() }
  }
  home.onLoad(Object.fromEntries(pairingsRoute.searchParams))
  assert.equal(home.data.view, 'meals')
  assert.equal(home.data.calendarDate, day)
  assert.equal(home.data.calendarSlot, 'lunch')
  const planCalendar = { ...page, data: { ...page.data, intent: null } }
  planCalendar.onLoad({ planId: 'light_chicken-brown-rice', date: home.data.calendarDate, slot: home.data.calendarSlot })
  planCalendar.onShow()
  assert.equal(planCalendar.data.selectedDate, day)
  assert.match(planCalendar.data.intent.hint, /午餐/)
  planCalendar.tapMeal(tap({ slot: 'lunch' }))
  lunchPicker.onShow()
  assert.equal(lunchPicker.data.replacing, true)
  page.onShow()
  assert.deepEqual(Object.keys(readCalendar()[day]).sort(), ['breakfast', 'dinner', 'lunch'])
  assert.equal(page.data.visibleDays.find(cell => cell.key === day).dots.length, 3)

  page.openMealMenu(tap({ slot: 'dinner' }))
  actionSheet.success({ tapIndex: 0 })
  const dinnerPicker = openPicker('dinner')
  assert.equal(dinnerPicker.data.replacing, true)
  assert.equal(dinnerPicker.data.currentTitle, custom.title)
  dinnerPicker.searchChoices({ detail: { value: '蒸水蛋' } })
  dinnerPicker.selectChoice(tap({ id: egg.id }))
  assert.equal(readCalendar()[day].dinner.id, custom.id)

  // A stale picker cannot overwrite a newer arrangement.
  const newDinner = { type: 'recipe', id: soup.id }
  assert.equal(saveCalendarMeal(day, 'dinner', newDinner, readCalendar()[day].dinner), true)
  dinnerPicker.confirmChoice()
  assert.deepEqual(readCalendar()[day].dinner, newDinner)
  assert.deepEqual(dinnerPicker.data.selected.map(choice => choice.id), [soup.id])
  assert.equal(dinnerPicker.data.currentTitle, soup.title)
  dinnerPicker.selectChoice(tap({ id: soup.id }))
  dinnerPicker.selectChoice(tap({ id: egg.id }))
  dinnerPicker.confirmChoice()
  page.onShow()
  assert.equal(dinner().title, egg.title)
  page.planId = custom.id
  page.onShow()
  page.tapMeal(tap({ slot: 'dinner' }))
  modal.success({ confirm: true })
  assert.equal(dinner().title, custom.title)

  component.openMealComposer(tap({ id: custom.id }))
  assert.equal(navigation, '/pages/compose-meal/index?id=' + custom.id)
  const editor = { ...composer, data: { ...composer.data, saving: false } }
  editor.onLoad({ id: custom.id })
  assert.equal(editor.data.title, '蒸蛋配汤')
  const editorPicker = makePicker(editor)
  editorPicker.setSelection(editor.data.selected)
  editorPicker.selectChoice(tap({ id: soup.id }))
  editor.updateTitle({ detail: { value: '晚餐蒸蛋' } })
  editorPicker.confirm()
  page.onShow()
  assert.equal(dinner().title, custom.title)
  assert.deepEqual(dinner().dishes.map(dish => dish.id), [egg.id, soup.id])

  component.removeCustomMeal(tap({ id: custom.id }))
  modal.success({ confirm: true })
  page.onShow()
  assert.equal(dinner().title, custom.title)
  assert.ok(page.plans.every(meal => meal.id !== custom.id))

  page.openMealMenu(tap({ slot: 'dinner' }))
  actionSheet.success({ tapIndex: 1 })
  modal.success({ confirm: true })
  assert.equal(readCalendar()[day].dinner, undefined)
  assert.deepEqual(Object.keys(readCalendar()[day]).sort(), ['breakfast', 'lunch'])

  const now = new Date()
  const upcomingDate = offset => dateKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset))
  const family = page.plans.find(plan => plan.dishes.length === 4)
  assert.ok(family)
  const manualMeal = { type: 'recipes', ids: [egg.id, soup.id] }
  saveCalendarMeal(upcomingDate(1), 'lunch', manualMeal, null)
  const changedManualMeal = { type: 'recipes', ids: [egg.id, family.dishes[0].id] }
  assert.equal(saveCalendarMeal(upcomingDate(1), 'lunch', changedManualMeal, manualMeal), true)
  assert.equal(saveCalendarMeal(upcomingDate(1), 'lunch', null, manualMeal), false)
  saveCalendarMeal(upcomingDate(2), 'dinner', { type: 'plan', id: family.id }, null)
  saveCalendarMeal(upcomingDate(3), 'breakfast', { type: 'recipe', id: egg.id }, null)
  page.openPurchasePreview()
  assert.deepEqual(page.data.purchasePreview.recipeIds, [...changedManualMeal.ids, ...family.dishes.map(dish => dish.id)])
  assert.ok(page.data.purchasePreview.items.length > 0)
  page.confirmPurchasePreview()
  assert.equal(page.data.purchasePreview, null)
  page.openPurchasePreview()
  assert.deepEqual(page.data.purchasePreview.items, [])
})

test('搭配采购合并预览，只添加已确认且尚未入库或列入清单的食材', t => {
  const { readKitchen, saveInventory } = require('../miniprogram/inventory')
  const { getMealShoppingPreview, saveMealShopping, listShopping } = require('../miniprogram/shopping')
  const stirFry = 'vegetable_dish_xi-hong-shi-chao-ji-dan'
  const steamedEgg = 'breakfast_zheng-shui-dan'
  const soup = 'soup_xi-hong-shi-ji-dan-tang'
  const existing = { recipeId: stirFry, id: 'tomato', quantity: '3个' }
  const storage = new Map([['recipe-kitchen-v1', { inventory: ['scallion', 'ginger', 'garlic'], shopping: [existing] }]])
  global.wx = {
    getStorageSync: key => storage.get(key),
    setStorageSync: (key, value) => storage.set(key, structuredClone(value))
  }
  t.after(() => { delete global.wx })

  const recipes = [stirFry, steamedEgg, soup, soup]
  const preview = getMealShoppingPreview(recipes)
  assert.deepEqual(preview.items.map(item => item.key).sort(), ['egg', 'tomato'])
  assert.equal(preview.items.find(item => item.key === 'egg').details.length, 3)
  assert.equal(preview.items.find(item => item.key === 'tomato').details.length, 1)
  assert.deepEqual(readKitchen().shopping, [existing])

  saveInventory(['scallion', 'garlic', 'tomato'])
  assert.equal(saveMealShopping(recipes, preview.sourceKeys), true)
  assert.deepEqual(readKitchen().shopping.filter(item => item.id === 'tomato'), [existing])
  assert.deepEqual(listShopping().map(item => item.key).sort(), ['egg', 'tomato'])
  assert.equal(listShopping().find(item => item.key === 'egg').details.length, 3)
  assert.equal(saveMealShopping(recipes, preview.sourceKeys), false)
  assert.deepEqual(getMealShoppingPreview(recipes).items.map(item => item.key), ['ginger'])
})

test('同一道菜安排两次会补足两份用量，已加入的一份只补差额且重复确认不会再加', t => {
  const { getMealShoppingPreview, saveMealShopping, listShopping } = require('../miniprogram/shopping')
  const id = 'breakfast_zheng-shui-dan'
  const storage = new Map()
  global.wx = {
    getStorageSync: key => storage.get(key),
    setStorageSync: (key, value) => storage.set(key, structuredClone(value))
  }
  t.after(() => { delete global.wx })

  const repeats = { countRepeated: true }
  const both = getMealShoppingPreview([id, id], repeats)
  assert.equal(both.items.find(item => item.key === 'egg').quantity, '4 只')
  const one = getMealShoppingPreview([id])
  assert.equal(saveMealShopping([id], one.sourceKeys), true)
  const remainder = getMealShoppingPreview([id, id], repeats)
  assert.equal(remainder.items.find(item => item.key === 'egg').quantity, '2只')
  assert.equal(saveMealShopping([id, id], remainder.sourceKeys, repeats), true)
  assert.equal(listShopping().find(item => item.key === 'egg').quantity, '4 只')
  assert.deepEqual(getMealShoppingPreview([id, id], repeats).items, [])
  assert.equal(saveMealShopping([id, id], remainder.sourceKeys, repeats), false)
})
