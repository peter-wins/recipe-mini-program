// 家常食材指南数据。bundled 为随包兜底数据；云端发布后可整版替换 current。
// 关联菜谱仍从 catalog 按食材 id 反查，图片分本地资源与云存储两种来源。
const { getCatalogSource } = require('./catalog')
const { recipeImage, cloudStorageBase } = require('./recipe-image')

const groups = ['叶菜', '根茎', '瓜果', '菌菇', '蛋豆', '肉水产']

// 食材条目：id 对应 catalog 的食材 id；image 以 /assets/ 开头为包内图，
// 否则视为云存储 guide-covers/ 下的相对文件名。
const bundled = [
  {
    id: 'spinach',
    name: '菠菜',
    group: '叶菜',
    image: 'spinach.png',
    tint: '#DFEDD9',
    season: '叶菜 · 四季常见',
    therapy: '味甘、性凉，具有补血止血、利五脏、通肠胃、活血脉、助消化、止渴润肠等功效。',
    audience: '一般人群均可食用。菠菜烹熟后软滑易消化，特别适合老、幼、病弱者以及高血压患者食用。',
    storage: [
      '菠菜宜选叶片深绿色，茎较短，根部呈鲜艳的深粉红色，切口新鲜，不着水，茎叶不老，无抽薹开花，不带黄、烂叶者。',
      '将菠菜用纸包好，放进有小孔的塑料袋内，置于冰箱里，可保存5天左右。',
      '还可将菠菜焯烫熟，根据每次的食用量，分装入保鲜袋内，再置冰箱内冷冻。'
    ],
    tips: [
      '菠菜中含有草酸，易与钙质结合形成草酸钙，会影响人体对钙的吸收。因此，菠菜不宜与含钙丰富豆类、豆制品及木耳、虾米、海带、紫菜等食物同时食用。',
      '烹调菠菜时，应先将菠菜用开水烫一下，以除去大部分草酸，然后用于烹制。'
    ]
  },
  {
    id: 'cabbage',
    name: '大白菜',
    group: '叶菜',
    image: 'cabbage.png',
    tint: '#FBECDB',
    season: '叶菜 · 秋冬常见',
    therapy: '白菜微寒、味甘、性平，有解热除烦、通利肠胃、养胃生津、除烦解渴、利尿通便、清热解毒等作用。',
    audience: '一般人均可食用，尤其适合肺热咳嗽、便秘、肾病患者食用。',
    storage: [
      '青口白菜宜选青绿色、植株高大而粗壮、叶肉厚、组织紧密、韧性大、没有损伤的。',
      '存放白菜、小白菜、菠菜等青菜忌用水洗，以免造成茎叶细胞死亡溃烂，营养成分大量流失。',
      '刚买来的白菜水分太大，容易腐烂，应该先撕去残破黄叶，放在向阳的地方晒3~5天，使菜中的部分水分蒸发以便于贮存。'
    ],
    tips: [
      '切白菜：对半切开，去掉菜心，再对剖成半，最后分切成小段。'
    ]
  },
  {
    id: 'celery',
    name: '芹菜',
    group: '叶菜',
    image: 'celery.png',
    tint: '#E4EDE0',
    season: '叶菜 · 四季常见',
    therapy: '味甘、性凉，具有平肝清热、除烦消肿、健胃利血、清肠利便、润肺止咳、降低血压、健脑镇静等功效。',
    audience: '一般人群均可食用，特别适合高血压、动脉硬化、高血糖、缺铁性贫血患者食用。',
    storage: [
      '优质芹菜新鲜、松脆、清洁，长短适中，肉厚、质密并且菜心结构完好，分枝脆嫩易折。如果芹菜小的嫩枝和新叶出现黑色或棕色，则可能是遭受过病虫害，不宜购买。',
      '将芹菜择净叶，用水洗净后切大段，放入保鲜盒或食品保鲜袋中，盖严盒盖或扎紧袋口，放入冰箱冷藏，随吃随取。'
    ],
    tips: [
      '预处理：芹菜洗净，择下叶子；再撕去芹菜梗表面的粗丝，即可用于烹调。'
    ]
  },
  {
    id: 'carrot',
    name: '胡萝卜',
    group: '根茎',
    image: 'carrot.png',
    tint: '#F4E9DE',
    season: '根茎 · 秋冬更佳',
    therapy: '胡萝卜含有胡萝卜素，可补肝明目，治疗夜盲症。胡萝卜还含有降糖物质，并有一定降压、降血脂的作用。',
    audience: '一般人群均可食用。特别适宜有眼疾者、吸烟者、糖尿病患者和婴幼儿食用。',
    storage: [
      '胡萝卜素在茎叶相连的顶部含量较多，外层皮质的含量比中央髓质部位多，因此宜挑肉厚、心小、身短的；以表皮光滑、形状整齐、肉厚、不糠、无裂口、无病虫伤害者为好。',
      '优质胡萝卜讲究“三红一细”：表皮、肉质和芯柱均呈橘红色，且芯柱要细；个头太大的不要选。',
      '买回后切掉顶叶（避免消耗水分），用保鲜膜包好冷藏，可放1～2周；也可埋入阴凉处的沙土中延长保鲜。'
    ],
    tips: [
      '胡萝卜含有能破坏维生素C的酶，不宜放入富含维生素C的果汁中，否则会破坏其他蔬果中的维生素C，造成双重损失。',
      '烹制胡萝卜时要多加油，而且时间要短，这样才能减少营养成分的流失；胡萝卜素是脂溶性的，与油脂同食更易吸收。',
      '整根烹饪比切开更有助防癌；烹制时最好不要放醋，以免破坏维生素A原。',
      '不要过量食用，大量摄入胡萝卜素会使皮肤暂时变成橙黄色，停止食用即可自行消退。',
      '配膳参考：胡萝卜＋绿豆芽，清热祛湿；胡萝卜＋猪肝，养肝明目补血；胡萝卜＋菠菜、莴苣，活血通络、强心健脾。'
    ]
  },
  {
    id: 'potato',
    name: '土豆',
    group: '根茎',
    image: 'potato.png',
    tint: '#FAEEDA',
    season: '根茎 · 四季常见',
    therapy: '土豆富含淀粉，也含蛋白质、胶质和钾盐，可健胃、益气、补钾，对胃痛、溃疡病、便秘和低钾有益；并有解毒消炎、活血消肿、益气强身、帮助消化的作用。',
    audience: '一般人群均可食用，尤其适合胃痛、溃疡病、便秘及需要补钾的人群。发芽或表皮变绿的土豆有毒，任何人都不可食用。',
    storage: [
      '尽量选圆形、表皮完整无破皮的，比较好削；表皮一定要干爽、不要有水，否则保存时间短、口感也不好。',
      '土豆宜放在阴凉、干燥、避光处保存，可存放约1周；不要与苹果、香蕉同放，以免加速发芽或变味。'
    ],
    tips: [
      '土豆外皮变绿或长出嫩芽时会产生龙葵素，有毒，务必整颗丢弃，不要只挖掉芽眼继续吃。',
      '切好的土豆容易氧化变褐，可先泡在清水里，下锅前再沥干。',
      '土豆淀粉含量高，宜蒸、煮、炖、烤，少用油炸；作为主食的一部分食用更合适。'
    ]
  },
  {
    id: 'radish',
    name: '白萝卜',
    group: '根茎',
    image: 'radish.png',
    tint: '#F1E6D9',
    season: '根茎 · 秋冬常见',
    therapy: '萝卜中所含的B族维生素和钾、镁等矿物质可促进肠胃蠕动，有助于体内废物的排出。吃萝卜可降血脂、软化血管、稳定血压。',
    audience: '一般人群均可食用，最适宜高脂血症、动脉硬化者食用。',
    storage: [
      '萝卜应挑选水分足、光滑细皮、无泥、无刀伤、无开裂、无八脚（两个以上的根部）、无灰心、无菊花心、无根须、个大均匀、不断头的；表面要细嫩光滑，以手指弹其中部，声音沉重的结实且不空心，声音浑浊的多半空心。',
      '贮存萝卜、胡萝卜时一定得切头去根：切头可防止萝卜发芽、吸取内部的水分，去根可防止长须根、消耗养分。'
    ],
    tips: [
      '治伤风感冒：白萝卜、葱白加水煮开，趁热喝下即可。',
      '治细菌性痢疾：取90～120克干萝卜缨加水煎浓，当茶饮服。',
      '治饮食不消：将500克萝卜取汁一次炖服；也可取萝卜30克做汤饮用。'
    ]
  },
  {
    id: 'tomato',
    name: '番茄',
    group: '瓜果',
    image: 'tomato.png',
    tint: '#FCEBEB',
    season: '瓜果 · 夏秋常见',
    therapy: '性甘、酸，微寒，具有生津止渴、健胃消食、清热解毒、凉血平肝和增进食欲的功效。',
    audience: '一般人群均可食用，尤其适宜食欲不振、习惯性牙龈出血、贫血、头晕、心悸、高血压患者食用。',
    storage: [],
    tips: [
      '去皮窍门：把番茄放入盆中淋浇开水，倒掉开水后再用冷水淋浇，即可轻而易举地撕去外皮，比用手剥省时又不浪费。',
      '餐前不宜吃番茄，容易使胃酸增高，产生烧心、腹痛等不适；应餐后吃，此时胃酸已与食物混合、胃内酸度降低，可避免上述症状。',
      '做汤时如果盐放多了，可往汤里放几片番茄煮2～3分钟后捞出，既能减轻咸味，又不会减淡汤的鲜味。'
    ]
  },
  {
    id: 'eggplant',
    name: '茄子',
    group: '瓜果',
    image: 'eggplant.png',
    tint: '#EEEDFE',
    season: '瓜果 · 夏秋常见',
    therapy: '味甘、性凉，具有清热止血、消肿止痛的功效，用于辅助治疗皮肤溃疡、口舌生疮、痔疮下血、便血、衄血等。',
    audience: '一般人群均可食用，对治疗痱子、疮疖有非常好的效果。',
    storage: [],
    tips: [
      '茄子含维生素P（芦丁），能增强血管弹性、降低毛细血管通透性、防止破裂，常吃可保护心脏和血管；还富含龙葵碱，是食疗抗癌佳品，并能增强体内抗氧化物质活性，有助抗衰延年。',
      '巧烹茄子不变黑：烹调时加几滴柠檬汁，肉质可变白；炒茄子时加少许醋，炒出来不发黑。',
      '配膳参考：茄子＋黄豆，通气养血、保护血管；茄子＋苦瓜，清心明目、活血；茄子＋猪肉，养血补脑、增加营养。'
    ]
  }
]

// 占位条目：只有基础信息与关联菜谱，食材介绍待书页照片补录。
const placeholders = [
  ['cucumber', '黄瓜', '瓜果', '#EAF3DE', '#639922'],
  ['egg', '鸡蛋', '蛋豆', '#FAEEDA', '#EF9F27'],
  ['tofu', '豆腐', '蛋豆', '#F1EFE8', '#888780']
]

for (const [id, name, group, tint, accent] of placeholders) {
  bundled.push({
    id, name, group,
    image: '/assets/guide-spinach.svg',
    tint, accent,
    season: '',
    therapy: '',
    audience: '',
    storage: [],
    tips: [],
    pending: true
  })
}

let current = { groups: groups.slice(), ingredients: bundled }

function replaceGuide(source) {
  current = {
    groups: Array.isArray(source.groups) ? source.groups.slice() : groups.slice(),
    ingredients: source.ingredients.map(item => ({
      ...item,
      storage: (item.storage || []).slice(),
      tips: (item.tips || []).slice()
    }))
  }
}

// 图片来源：包内 /assets/ 与完整云地址原样返回；相对文件名拼到 guide-covers/。
function guideImage(image) {
  if (!image) return ''
  if (image.indexOf('/assets/') === 0 || image.indexOf('cloud://') === 0 || image.indexOf('http') === 0) return image
  return cloudStorageBase + 'guide-covers/' + image
}

function recipeImageUrl(recipe) {
  return recipe ? recipeImage(recipe.coverPath) : ''
}

function listIngredients() {
  return current.ingredients.map(item => {
    const related = getCatalogSource().recipes.filter(recipe =>
      recipe.required.some(([id]) => id === item.id)
    )
    return {
      id: item.id,
      name: item.name,
      group: item.group,
      image: guideImage(item.image),
      tint: item.tint,
      season: item.season,
      recipeCount: related.length
    }
  })
}

function getIngredient(id) {
  const item = current.ingredients.find(entry => entry.id === id)
  if (!item) return null
  const related = getCatalogSource().recipes.filter(recipe =>
    recipe.required.some(([id]) => id === item.id)
  )
  return {
    id: item.id,
    name: item.name,
    group: item.group,
    image: guideImage(item.image),
    tint: item.tint,
    season: item.season,
    therapy: item.therapy,
    audience: item.audience,
    storage: item.storage.slice(),
    tips: item.tips.slice(),
    pending: Boolean(item.pending),
    recipes: related.map(recipe => ({
      id: recipe.id,
      name: recipe.name,
      minutes: recipe.minutes,
      image: recipeImageUrl(recipe)
    }))
  }
}

// 按食材 id 取可展示的插画：只有云端真图（cloud://）才算，包内占位 SVG 返回空。
// 供冰箱页、采购清单页复用，避免把占位图当成真实食材图显示。
function guideCover(id) {
  if (!id) return ''
  const item = getIngredient(id)
  if (!item || !item.image || item.image.indexOf('cloud://') !== 0) return ''
  return item.image
}

module.exports = {
  groups, bundled, replaceGuide, guideImage, guideCover, listIngredients, getIngredient,
  getGuideGroups: () => current.groups.slice(),
  // ingredients 保留为当前数据的只读别名，兼容旧引用。
  get ingredients() { return current.ingredients }
}
