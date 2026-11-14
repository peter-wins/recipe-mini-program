// 节日 / 节气速查：只收录「跟吃有关」的日子，覆盖 2026–2035。
// 农历节日与冬至、立春、立秋的公历日期逐年核对过（2026-2033 来自万年历，
// 2034-2035 冬至来自日历网节气表），不做推算，避免差一天。

const feastDishes = ['红烧鱼', '清蒸鲈鱼', '清蒸鳜鱼', '葱油桂鱼', '酱牛肉', '带把肘子', '虎皮肘子', '黄焖鸡', '豉汁排骨', '糖醋排骨', '红烧鸡翅']

const DEFINITIONS = {
  yuanDan: { name: '元旦', emoji: '🎉', quote: '新的一年，从好好吃饭开始', fixed: '1-1' },
  guoQing: { name: '国庆节', emoji: '🎊', quote: '放假的日子，更要吃得隆重一点', fixed: '10-1' },
  chuXi: {
    name: '除夕', emoji: '🏮', quote: '忙了一年，就为这一桌团圆',
    dates: ['2026-02-16', '2027-02-05', '2028-01-25', '2029-02-12', '2030-02-02', '2031-01-22', '2032-01-30', '2033-01-30'],
    tiers: [{ dishes: feastDishes, reason: '年夜饭桌上，少不了这道硬菜' }]
  },
  chunJie: {
    name: '春节', emoji: '🧧', quote: '新年第一顿，要吃得圆圆满满',
    dates: ['2026-02-17', '2027-02-06', '2028-01-26', '2029-02-13', '2030-02-03', '2031-01-23', '2032-02-11', '2033-01-31'],
    tiers: [{ dishes: feastDishes, reason: '开年第一道硬菜，就它了' }]
  },
  yuanXiao: {
    name: '元宵节', emoji: '🍡', quote: '一碗汤圆，甜到心里',
    dates: ['2026-03-03', '2027-02-20', '2028-02-09', '2029-02-27', '2030-02-17', '2031-02-06', '2032-02-25', '2033-02-14'],
    tiers: [{ dishes: ['速冻汤圆', '醪糟小汤圆'], reason: '元宵节来碗汤圆，圆圆满满' }]
  },
  laBa: {
    name: '腊八节', emoji: '🥣', quote: '过了腊八就是年',
    dates: ['2026-01-26', '2027-01-15', '2028-01-04', '2029-01-22', '2030-01-11', '2031-01-01', '2032-01-20', '2033-01-08', '2034-01-27'],
    tiers: [
      { dishes: ['腊八粥'], reason: '腊八到，先来一碗腊八粥' },
      { dishes: ['银耳莲子粥', '桂圆红枣粥', '小米粥', '皮蛋瘦肉粥', '米粥'], reason: '腊八到，先来一碗热粥' }
    ]
  },
  dongZhi: {
    name: '冬至', emoji: '🥟', quote: '冬至不端饺子碗，冻掉耳朵没人管',
    dates: ['2026-12-22', '2027-12-22', '2028-12-21', '2029-12-21', '2030-12-22', '2031-12-22', '2032-12-21', '2033-12-21', '2034-12-22', '2035-12-22'],
    tiers: [
      { dishes: ['饺子'], reason: '冬至吃饺子正合适' },
      { dishes: ['羊肉汤', '萝卜炖羊排', '枝竹羊腩煲', '羊排焖面', '空气炸锅羊排', '煎烤羊排的做法'], reason: '冬至进补，来碗热乎的正合适' }
    ]
  },
  duanWu: {
    name: '端午节', emoji: '🍃', quote: '今日宜粽香，愿君安康',
    dates: ['2026-06-19', '2027-06-09', '2028-05-28', '2029-06-16', '2030-06-05', '2031-06-24', '2032-06-12', '2033-06-01']
  },
  zhongQiu: {
    name: '中秋节', emoji: '🌕', quote: '但愿人长久，千里共婵娟',
    dates: ['2026-09-25', '2027-09-15', '2028-10-03', '2029-09-22', '2030-09-12', '2031-10-01', '2032-09-19', '2033-09-08'],
    tiers: [{ dishes: feastDishes, reason: '中秋家宴，这道正合适' }]
  },
  liChun: {
    name: '立春', emoji: '🌱', quote: '一年之计在于春，先吃好这一顿',
    dates: ['2026-02-04', '2027-02-04', '2028-02-04', '2029-02-03', '2030-02-04', '2031-02-04', '2032-02-04', '2033-02-03'],
    tiers: [{ dishes: ['萝卜炖羊排', '羊肉汤'], reason: '立春咬春，来点应季的正合适' }]
  },
  liQiu: {
    name: '立秋', emoji: '🍖', quote: '贴秋膘，是秋天最正当的理由',
    dates: ['2026-08-07', '2027-08-07', '2028-08-07', '2029-08-07', '2030-08-07', '2031-08-08', '2032-08-07', '2033-08-07'],
    tiers: [{ dishes: feastDishes, reason: '立秋贴秋膘，吃点好的' }]
  }
}

const festivalByDate = new Map()
const festivalByFixed = new Map()
for (const definition of Object.values(DEFINITIONS)) {
  for (const date of definition.dates || []) festivalByDate.set(date, definition)
  if (definition.fixed) festivalByFixed.set(definition.fixed, definition)
}

function festivalOf(date = new Date()) {
  const month = date.getMonth() + 1
  const key = `${date.getFullYear()}-${String(month).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  return festivalByDate.get(key) || festivalByFixed.get(`${month}-${date.getDate()}`) || null
}

module.exports = { festivalOf, DEFINITIONS }
