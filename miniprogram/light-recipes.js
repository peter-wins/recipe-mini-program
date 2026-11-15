/*
Adapted from EveryDay_Food (https://github.com/Jiayu-zheng1/EveryDay_Food).

MIT License

Copyright (c) 2026 Jiayu Zheng

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const lightIngredients = {
  "brownRiceCooked": [
    "糙米饭",
    "熟糙米饭"
  ],
  "wholeWheatFlour": [
    "全麦面粉"
  ],
  "loofah": [
    "丝瓜"
  ],
  "konjac": [
    "魔芋",
    "魔芋块"
  ],
  "konjacNoodles": [
    "魔芋面",
    "魔芋丝"
  ],
  "celeryStalk": [
    "西芹"
  ],
  "rolledOats": [
    "燕麦片",
    "即食燕麦片"
  ]
}

const lightRecipes = [
  {
    id: "light_grilled-chicken-salad",
    name: "香煎鸡胸肉沙拉",
    category: "荤菜",
    light: true,
    minutes: 30,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_grilled-chicken-salad.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/meals.ts",
    calories: 320,
    nutrition: {"protein":47,"carbs":8,"fat":11,"servingGrams":400},
    required: [
      ["chicken","150克","鸡胸肉"],
      ["lettuce","100克","生菜"],
      ["vibe-e5b08fe795aae88c84","8颗","小番茄"],
      ["cucumber","半根","黄瓜"]
    ],
    optional: [],
    pantry: [
      ["vibe-e6a984e6a684e6b2b9","5克","橄榄油"],
      ["vibe-e69fa0e6aaace6b181","1勺","柠檬汁"],
      ["vibe-e9bb91e883a1e6a492e7b289","适量","黑胡椒粉"],
      ["salt","适量","盐"]
    ],
    steps: [
      ["","鸡胸肉横切成两片，用盐、黑胡椒和少许柠檬汁腌制 15 分钟。"],
      ["","平底锅小火加热，刷薄薄一层橄榄油，放入鸡胸肉，每面煎 4–5 分钟至金黄熟透。"],
      ["","煎好的鸡胸肉静置 2 分钟再切条，锁住肉汁。"],
      ["","生菜、小番茄、黄瓜洗净切好，铺入碗中。"],
      ["","摆上鸡胸肉，淋上剩余橄榄油和柠檬汁，撒黑胡椒拌匀即可。"]
    ],
    tips: []
  },

  {
    id: "light_steamed-sea-bass",
    name: "蒸鲈鱼配西兰花",
    category: "水产",
    light: true,
    minutes: 30,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_steamed-sea-bass.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/meals.ts",
    calories: 280,
    nutrition: {"protein":40,"carbs":10,"fat":7,"servingGrams":350},
    required: [
      ["seaBass","1条（取肉约200克）","鲈鱼"],
      ["broccoli","150克","西兰花"]
    ],
    optional: [],
    pantry: [
      ["ginger","1块","姜"],
      ["scallion","2根","小葱"],
      ["vibe-e892b8e9b1bce8b189e6b2b9","1勺","蒸鱼豉油"],
      ["wine","1勺","料酒"],
      ["salt","少许","盐"],
      ["oil","少许","油"]
    ],
    steps: [
      ["","鲈鱼处理干净，两面打花刀，用料酒和姜片腌制 10 分钟去腥。"],
      ["","西兰花掰小朵，盐水浸泡后焯水 1 分钟捞出。"],
      ["","鱼身铺姜丝，水开后上锅大火蒸 8 分钟，关火再虚蒸 2 分钟。"],
      ["","倒掉盘中蒸出的汁水，铺上葱丝，淋蒸鱼豉油，淋少许热油提香。"],
      ["","鱼和西兰花一起装盘，搭配食用。"]
    ],
    tips: []
  },

  {
    id: "light_shrimp-konjac-noodles",
    name: "虾仁蔬菜魔芋面",
    category: "主食",
    light: true,
    minutes: 20,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_shrimp-konjac-noodles.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/meals.ts",
    calories: 168,
    nutrition: {"protein":25,"carbs":8,"fat":4,"servingGrams":400},
    required: [
      ["shrimp","120克","虾仁"],
      ["konjacNoodles","200克","魔芋面"],
      ["mushroom","3朵","香菇"],
      ["bokchoy","100克","小青菜"]
    ],
    optional: [],
    pantry: [
      ["garlic","2瓣","蒜"],
      ["soy","1勺","生抽"],
      ["vibe-e6a984e6a684e6b2b9","3克","橄榄油"],
      ["wine","少许","料酒"],
      ["salt","少许","盐"]
    ],
    steps: [
      ["","魔芋面用清水冲洗两遍，沸水煮 2 分钟捞出沥干。"],
      ["","虾仁用料酒和少许盐腌制 5 分钟；香菇切片，蒜切末。"],
      ["","锅中放橄榄油，爆香蒜末，下虾仁翻炒至变色盛出。"],
      ["","下香菇和小青菜炒软，倒入魔芋面和虾仁，加生抽翻炒均匀即可。"]
    ],
    tips: []
  },

  {
    id: "light_chicken-brown-rice",
    name: "鸡胸彩椒糙米饭",
    category: "主食",
    light: true,
    minutes: 25,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_chicken-brown-rice.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/meals.ts",
    calories: 420,
    nutrition: {"protein":32,"carbs":55,"fat":9,"servingGrams":350},
    required: [
      ["chicken","100克","鸡胸肉"],
      ["brownRiceCooked","150克（熟）","糙米饭"],
      ["pepper","红黄各半个","彩椒"],
      ["onion","1/4个","洋葱"]
    ],
    optional: [],
    pantry: [
      ["soy","1勺","生抽"],
      ["oysterSauce","1勺","蚝油"],
      ["vibe-e6a984e6a684e6b2b9","5克","橄榄油"],
      ["water","少许","水"]
    ],
    steps: [
      ["","鸡胸肉切丁，用生抽、蚝油腌 10 分钟；彩椒和洋葱切丁。"],
      ["","锅热放橄榄油，下鸡丁大火快炒至变色后盛出。"],
      ["","余油炒香洋葱，加入彩椒丁翻炒 1 分钟。"],
      ["","倒回鸡丁，加少许水焖至鸡丁完全熟透，收汁后盖在糙米饭上。"]
    ],
    tips: [
      "按已有熟糙米饭估算时间，现煮米饭需另外预留时间。"
    ]
  },

  {
    id: "light_cold-chicken-buckwheat-noodles",
    name: "凉拌鸡丝荞麦面",
    category: "主食",
    light: true,
    minutes: 25,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_cold-chicken-buckwheat-noodles.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/meals.ts",
    calories: 424,
    nutrition: {"protein":34,"carbs":52,"fat":9,"servingGrams":390},
    required: [
      ["vibe-e88d9ee9baa6e99da2","70克（干）","荞麦面"],
      ["chicken","80克","鸡胸肉"],
      ["cucumber","半根（约60克）","黄瓜"],
      ["carrot","30克","胡萝卜"]
    ],
    optional: [
      ["cilantro","适量","香菜"]
    ],
    pantry: [
      ["garlic","适量","蒜"],
      ["soy","1勺","生抽"],
      ["vinegar","1勺","醋"],
      ["vibe-e8bea3e6a492e6b2b9","2克","辣椒油"],
      ["sesame","少许","香油"],
      ["ginger","少许","姜"],
      ["wine","少许","料酒"]
    ],
    steps: [
      ["","荞麦面沸水煮 5–6 分钟，捞出过凉水沥干，拌少许香油防粘。"],
      ["","鸡胸肉冷水下锅，加姜片料酒煮 12 分钟，捞出放凉后撕成细丝。"],
      ["","黄瓜、胡萝卜切细丝，蒜切末、香菜切段。"],
      ["","将生抽、香醋、辣椒油、蒜末调成料汁。"],
      ["","面条装碗，铺上鸡丝和蔬菜丝，淋料汁拌匀即可。"]
    ],
    tips: []
  },

  {
    id: "light_winter-melon-shrimp-soup",
    name: "冬瓜虾仁汤",
    category: "汤",
    light: true,
    minutes: 20,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_winter-melon-shrimp-soup.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/meals.ts",
    calories: 217,
    nutrition: {"protein":28,"carbs":8,"fat":8,"servingGrams":480},
    required: [
      ["winterMelon","300克","冬瓜"],
      ["shrimp","100克","虾仁"],
      ["egg","1个","鸡蛋"]
    ],
    optional: [],
    pantry: [
      ["ginger","2片","姜"],
      ["sesame","2克","香油"],
      ["whitePepper","适量","白胡椒粉"],
      ["salt","适量","盐"],
      ["wine","少许","料酒"],
      ["scallion","少许","小葱"],
      ["water","约2碗","水"]
    ],
    steps: [
      ["","冬瓜去皮去瓤切成薄片；虾仁挑去虾线，用料酒和盐抓匀。"],
      ["","锅中烧开两碗水，放姜片和冬瓜片煮 5 分钟至透明。"],
      ["","下虾仁煮 2 分钟至变色，淋入打散的蛋液形成蛋花。"],
      ["","加盐和白胡椒调味，滴香油、撒葱花出锅。"]
    ],
    tips: []
  },

  {
    id: "light_zucchini-egg-pancake",
    name: "西葫芦鸡蛋饼",
    category: "早餐",
    light: true,
    minutes: 20,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_zucchini-egg-pancake.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/meals.ts",
    calories: 334,
    nutrition: {"protein":21,"carbs":31,"fat":14,"servingGrams":380},
    required: [
      ["zucchini","1根（约300克）","西葫芦"],
      ["egg","2个","鸡蛋"],
      ["wholeWheatFlour","30克","全麦面粉"]
    ],
    optional: [],
    pantry: [
      ["scallion","2根","小葱"],
      ["vibe-e6a984e6a684e6b2b9","2克","橄榄油"],
      ["salt","适量","盐"],
      ["vibe-e9bb91e883a1e6a492e7b289","适量","黑胡椒粉"]
    ],
    steps: [
      ["","西葫芦擦细丝，加少许盐腌 5 分钟，挤干水分。"],
      ["","打入鸡蛋，加入全麦面粉、葱花、黑胡椒搅成浓稠面糊。"],
      ["","平底锅刷薄油，倒入面糊摊平成圆饼，小火煎 3 分钟。"],
      ["","翻面再煎 2–3 分钟至两面金黄，切块装盘。"]
    ],
    tips: []
  },

  {
    id: "light_celery-shrimp-stirfry",
    name: "西芹炒虾仁",
    category: "水产",
    light: true,
    minutes: 20,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_celery-shrimp-stirfry.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/meals.ts",
    calories: 218,
    nutrition: {"protein":32,"carbs":9,"fat":6,"servingGrams":400},
    required: [
      ["shrimp","150克","虾仁"],
      ["celeryStalk","200克","西芹"],
      ["vibe-e69ca8e880b3","50克（泡发后）","木耳"]
    ],
    optional: [],
    pantry: [
      ["garlic","2瓣","蒜"],
      ["vibe-e6a984e6a684e6b2b9","4克","橄榄油"],
      ["salt","适量","盐"],
      ["oysterSauce","半勺","蚝油"],
      ["wine","少许","料酒"]
    ],
    steps: [
      ["","虾仁开背去虾线，用料酒和盐抓匀腌 5 分钟。"],
      ["","西芹去老筋斜切段，木耳撕小朵，分别焯水 30 秒捞出。"],
      ["","热锅放橄榄油爆香蒜片，下虾仁大火翻炒至变色。"],
      ["","倒入西芹和木耳，加盐和半勺蚝油快炒 1 分钟出锅。"]
    ],
    tips: []
  },

  {
    id: "light_garlic-steamed-baby-cabbage",
    name: "蒜蓉蒸娃娃菜",
    category: "素菜",
    light: true,
    minutes: 15,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_garlic-steamed-baby-cabbage.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/category-expansion.ts",
    calories: 96,
    nutrition: {"protein":5,"carbs":10,"fat":4,"servingGrams":320},
    required: [
      ["babyCabbage","2棵（约300克）","娃娃菜"],
      ["garlic","4瓣","蒜"]
    ],
    optional: [
      ["vibe-e5b08fe7b1b3e8bea3","1个","小米辣"]
    ],
    pantry: [
      ["vibe-e892b8e9b1bce8b189e6b2b9","1勺","蒸鱼豉油"],
      ["vibe-e6a984e6a684e6b2b9","3克","橄榄油"],
      ["scallion","1根","小葱"]
    ],
    steps: [
      ["","娃娃菜对半切开洗净，蒜切末，小米辣切圈。"],
      ["","娃娃菜码盘，铺上蒜末，水开后大火蒸 8 分钟。"],
      ["","倒掉盘中多余汁水，淋蒸鱼豉油，撒小米辣和葱花。"],
      ["","橄榄油烧至微热，浇在蒜末上激香即可。"]
    ],
    tips: []
  },

  {
    id: "light_sour-spicy-wood-ear",
    name: "酸辣木耳",
    category: "素菜",
    light: true,
    minutes: 135,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_sour-spicy-wood-ear.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/category-expansion.ts",
    calories: 145,
    nutrition: {"protein":6,"carbs":19,"fat":5,"servingGrams":320},
    required: [
      ["vibe-e69ca8e880b3","20克（干）","木耳"],
      ["cucumber","1根（约100克）","黄瓜"]
    ],
    optional: [
      ["cilantro","适量","香菜"]
    ],
    pantry: [
      ["garlic","3瓣","蒜"],
      ["vinegar","2勺","醋"],
      ["soy","1勺","生抽"],
      ["vibe-e8bea3e6a492e6b2b9","2克","辣椒油"],
      ["salt","少许","盐"]
    ],
    steps: [
      ["","干木耳冷水泡发 2 小时，去蒂撕小朵。"],
      ["","沸水加少许盐，下木耳焯水 2 分钟，捞出过凉沥干。"],
      ["","黄瓜拍碎切段，蒜切末，与生抽、香醋、辣椒油调成料汁。"],
      ["","木耳与黄瓜拌匀，淋料汁撒香菜即可。"]
    ],
    tips: [
      "总耗时包含约 2 小时泡发，已经泡好的木耳可直接从焯水开始。"
    ]
  },

  {
    id: "light_steamed-tofu",
    name: "清蒸豆腐",
    category: "荤菜",
    light: true,
    minutes: 20,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_steamed-tofu.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/category-expansion.ts",
    calories: 246,
    nutrition: {"protein":24,"carbs":6,"fat":14,"servingGrams":350},
    required: [
      ["tofu","300克","嫩豆腐"],
      ["mushroom","2朵","香菇"],
      ["mince","30克","猪肉末"]
    ],
    optional: [],
    pantry: [
      ["garlic","2瓣","蒜"],
      ["vibe-e892b8e9b1bce8b189e6b2b9","1勺","蒸鱼豉油"],
      ["sesame","2克","香油"],
      ["scallion","1根","小葱"],
      ["soy","少许","生抽"]
    ],
    steps: [
      ["","嫩豆腐切厚片码盘，香菇切丁，肉末用少许生抽腌 5 分钟。"],
      ["","肉末和香菇丁铺在豆腐上，水开后上锅大火蒸 8 分钟。"],
      ["","倒掉盘中汁水，淋蒸鱼豉油，铺蒜末和葱花。"],
      ["","香油烧至微热浇在蒜末上激香即可。"]
    ],
    tips: []
  },

  {
    id: "light_konjac-stirfry",
    name: "魔芋炒时蔬",
    category: "素菜",
    light: true,
    minutes: 20,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_konjac-stirfry.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/category-expansion.ts",
    calories: 153,
    nutrition: {"protein":8,"carbs":19,"fat":5,"servingGrams":420},
    required: [
      ["konjac","200克","魔芋"],
      ["broccoli","100克","西兰花"],
      ["carrot","50克","胡萝卜"],
      ["vibe-e69ca8e880b3","50克（泡发后）","木耳"]
    ],
    optional: [],
    pantry: [
      ["garlic","2瓣","蒜"],
      ["soy","1勺","生抽"],
      ["vibe-e6a984e6a684e6b2b9","4克","橄榄油"],
      ["salt","适量","盐"]
    ],
    steps: [
      ["","魔芋切片，沸水煮 2 分钟去碱味捞出；西兰花、胡萝卜、木耳焯水 1 分钟。"],
      ["","热锅放橄榄油爆香蒜片。"],
      ["","下魔芋中火翻炒 1 分钟，倒入焯好的时蔬大火快炒 2 分钟。"],
      ["","加生抽和盐调味，炒匀出锅。"]
    ],
    tips: []
  },

  {
    id: "light_steamed-chicken-breast",
    name: "清蒸鸡胸肉",
    category: "荤菜",
    light: true,
    minutes: 35,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_steamed-chicken-breast.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/category-extra-fatloss.ts",
    calories: 246,
    nutrition: {"protein":45,"carbs":3,"fat":6,"servingGrams":250},
    required: [
      ["chicken","200克","鸡胸肉"]
    ],
    optional: [],
    pantry: [
      ["ginger","3片","姜"],
      ["scallion","2根","小葱"],
      ["wine","1勺","料酒"],
      ["vibe-e892b8e9b1bce8b189e6b2b9","1勺","蒸鱼豉油"],
      ["whitePepper","少许","白胡椒粉"],
      ["sesame","2克","香油"],
      ["salt","少许","盐"]
    ],
    steps: [
      ["","鸡胸肉洗净，用刀背轻拍松，两面抹少许盐和白胡椒粉腌 15 分钟。"],
      ["","姜切丝铺在盘底，放上鸡胸肉，淋料酒。"],
      ["","蒸锅水烧开，放入鸡胸肉大火蒸 12 分钟，关火再虚蒸 3 分钟。"],
      ["","取出切厚片装盘，铺葱丝，淋蒸鱼豉油和香油即可。"]
    ],
    tips: []
  },

  {
    id: "light_steamed-cod-fatloss",
    name: "清蒸鳕鱼",
    category: "水产",
    light: true,
    minutes: 25,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_steamed-cod-fatloss.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/category-extra-fatloss.ts",
    calories: 193,
    nutrition: {"protein":35,"carbs":2,"fat":5,"servingGrams":280},
    required: [
      ["cod","280克","鳕鱼"]
    ],
    optional: [],
    pantry: [
      ["ginger","1块","姜"],
      ["scallion","2根","小葱"],
      ["wine","1勺","料酒"],
      ["vibe-e892b8e9b1bce8b189e6b2b9","1勺","蒸鱼豉油"],
      ["whitePepper","适量","白胡椒粉"],
      ["oil","少许","油"]
    ],
    steps: [
      ["","鳕鱼块解冻洗净，用料酒、白胡椒粉和姜片腌 10 分钟去腥。"],
      ["","盘底铺姜片，放上鳕鱼，水开后大火蒸 8 分钟。"],
      ["","倒掉蒸出的汁水，撒上葱丝，淋蒸鱼豉油。"],
      ["","烧少许热油浇在葱丝上激出香味即可。"]
    ],
    tips: []
  },

  {
    id: "light_shrimp-steamed-tofu",
    name: "虾仁蒸豆腐",
    category: "水产",
    light: true,
    minutes: 20,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_shrimp-steamed-tofu.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/category-extra-fatloss.ts",
    calories: 262,
    nutrition: {"protein":35,"carbs":8,"fat":10,"servingGrams":320},
    required: [
      ["tofu","200克","嫩豆腐"],
      ["shrimp","100克","虾仁"]
    ],
    optional: [],
    pantry: [
      ["ginger","3片","姜"],
      ["scallion","1根","小葱"],
      ["wine","1勺","料酒"],
      ["vibe-e892b8e9b1bce8b189e6b2b9","1勺","蒸鱼豉油"],
      ["sesame","2克","香油"]
    ],
    steps: [
      ["","豆腐切厚片码入盘中，虾仁用料酒和姜丝腌 5 分钟。"],
      ["","虾仁铺在豆腐上，水开后上锅大火蒸 8 分钟。"],
      ["","倒掉盘中多余汁水，淋蒸鱼豉油，撒葱花。"],
      ["","香油烧热浇在虾仁上激香即可。"]
    ],
    tips: []
  },

  {
    id: "light_cold-lotus-root",
    name: "凉拌藕片",
    category: "素菜",
    light: true,
    minutes: 15,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_cold-lotus-root.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/category-extra-fatloss.ts",
    calories: 198,
    nutrition: {"protein":5,"carbs":40,"fat":2,"servingGrams":280},
    required: [
      ["lotusRoot","250克","莲藕"]
    ],
    optional: [
      ["cilantro","适量","香菜"]
    ],
    pantry: [
      ["garlic","3瓣","蒜"],
      ["vinegar","2勺","醋"],
      ["soy","1勺","生抽"],
      ["sugar","2克","白糖"],
      ["sesame","3克","香油"],
      ["vibe-e5b08fe7b1b3e8bea3","1个","小米辣"]
    ],
    steps: [
      ["","莲藕去皮切薄片，立即泡入清水中防氧化。"],
      ["","水烧开，下藕片焯烫 2 分钟，捞出过冰水沥干。"],
      ["","蒜末、小米辣加香醋、生抽、白糖、香油调成料汁。"],
      ["","藕片装碗，淋料汁拌匀，撒香菜即可。"]
    ],
    tips: []
  },

  {
    id: "light_cold-tofu-skin-salad",
    name: "凉拌千张丝",
    category: "素菜",
    light: true,
    minutes: 15,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_cold-tofu-skin-salad.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/category-extra-fatloss.ts",
    calories: 267,
    nutrition: {"protein":28,"carbs":14,"fat":11,"servingGrams":310},
    required: [
      ["vibe-e58d83e5bca0","110克","千张"],
      ["cucumber","1根（约100克）","黄瓜"],
      ["carrot","40克","胡萝卜"]
    ],
    optional: [],
    pantry: [
      ["garlic","2瓣","蒜"],
      ["vinegar","1勺","醋"],
      ["soy","1勺","生抽"],
      ["sesame","3克","香油"],
      ["vibe-e799bde88a9de9babb","少许","白芝麻"]
    ],
    steps: [
      ["","千张切细丝，沸水焯烫 1 分钟捞出过凉沥干。"],
      ["","黄瓜、胡萝卜切细丝，蒜切末。"],
      ["","香醋、生抽、香油、蒜末调成料汁。"],
      ["","千张丝与蔬菜丝拌匀，淋料汁撒白芝麻即可。"]
    ],
    tips: []
  },

  {
    id: "light_loofah-shrimp-soup",
    name: "丝瓜虾皮汤",
    category: "汤",
    light: true,
    minutes: 20,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_loofah-shrimp-soup.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/category-extra-fatloss.ts",
    calories: 150,
    nutrition: {"protein":13,"carbs":11,"fat":6,"servingGrams":400},
    required: [
      ["loofah","1根（约250克）","丝瓜"],
      ["vibe-e899bee79aae","10克","虾皮"],
      ["egg","1个","鸡蛋"]
    ],
    optional: [],
    pantry: [
      ["ginger","2片","姜"],
      ["scallion","1根","小葱"],
      ["salt","适量","盐"],
      ["sesame","2克","香油"],
      ["water","约2碗","水"]
    ],
    steps: [
      ["","丝瓜去皮切滚刀块，虾皮冲洗一下沥干。"],
      ["","锅中烧开两碗水，放姜片和虾皮煮 2 分钟出鲜味。"],
      ["","下丝瓜块，中火煮 5 分钟至变软。"],
      ["","鸡蛋打散淋入锅中，煮至蛋花浮起，加盐调味，滴香油撒葱花出锅。"]
    ],
    tips: []
  },

  {
    id: "light_tomato-enoki-soup",
    name: "番茄金针菇汤",
    category: "汤",
    light: true,
    minutes: 20,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_tomato-enoki-soup.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/category-extra-fatloss.ts",
    calories: 194,
    nutrition: {"protein":15,"carbs":20,"fat":6,"servingGrams":500},
    required: [
      ["tomato","2个（约250克）","番茄"],
      ["enoki","150克","金针菇"],
      ["tofu","100克","嫩豆腐"]
    ],
    optional: [],
    pantry: [
      ["garlic","2瓣","蒜"],
      ["scallion","1根","小葱"],
      ["salt","适量","盐"],
      ["whitePepper","适量","白胡椒粉"],
      ["vibe-e6a984e6a684e6b2b9","3克","橄榄油"],
      ["water","约3碗","水"]
    ],
    steps: [
      ["","番茄切块，金针菇去根撕开，豆腐切小块。"],
      ["","锅热放橄榄油，下蒜末和番茄块，中火炒 2 分钟至出沙。"],
      ["","加三碗水烧开，放入金针菇和豆腐，煮 5 分钟。"],
      ["","加盐和白胡椒调味，撒葱花出锅。"]
    ],
    tips: []
  },

  {
    id: "light_shiitake-tofu-soup",
    name: "香菇豆腐汤",
    category: "汤",
    light: true,
    minutes: 20,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_shiitake-tofu-soup.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/category-extra-fatloss.ts",
    calories: 171,
    nutrition: {"protein":15,"carbs":12,"fat":7,"servingGrams":450},
    required: [
      ["mushroom","100克","鲜香菇"],
      ["tofu","150克","嫩豆腐"],
      ["bokchoy","50克","小青菜"]
    ],
    optional: [],
    pantry: [
      ["ginger","2片","姜"],
      ["scallion","1根","小葱"],
      ["salt","适量","盐"],
      ["whitePepper","适量","白胡椒粉"],
      ["sesame","2克","香油"],
      ["water","约3碗","水"]
    ],
    steps: [
      ["","香菇去蒂切片，豆腐切块，小青菜洗净。"],
      ["","锅中烧开三碗水，放姜片和香菇，煮 5 分钟出香。"],
      ["","下豆腐块，中火煮 3 分钟，再放小青菜烫 1 分钟。"],
      ["","加盐和白胡椒调味，滴香油撒葱花出锅。"]
    ],
    tips: []
  },

  {
    id: "light_tomato-shrimp-buckwheat-noodles",
    name: "番茄虾仁荞麦面",
    category: "主食",
    light: true,
    minutes: 25,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_tomato-shrimp-buckwheat-noodles.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/category-extra-fatloss.ts",
    calories: 413,
    nutrition: {"protein":28,"carbs":64,"fat":5,"servingGrams":400},
    required: [
      ["vibe-e88d9ee9baa6e99da2","80克（干）","荞麦面"],
      ["shrimp","80克","虾仁"],
      ["tomato","1个（约150克）","番茄"],
      ["bokchoy","50克","小青菜"]
    ],
    optional: [],
    pantry: [
      ["garlic","2瓣","蒜"],
      ["soy","1勺","生抽"],
      ["vibe-e6a984e6a684e6b2b9","3克","橄榄油"],
      ["wine","少许","料酒"],
      ["water","约半碗","水"]
    ],
    steps: [
      ["","荞麦面沸水煮 6 分钟至无硬芯，捞出过凉沥干。"],
      ["","虾仁用料酒腌 5 分钟；番茄切丁，蒜切末。"],
      ["","锅热放橄榄油，爆香蒜末，下虾仁炒至变色盛出。"],
      ["","下番茄丁炒出沙，加半碗水煮 2 分钟成汤底。"],
      ["","倒入荞麦面和虾仁，加生抽翻匀，放青菜烫熟即可。"]
    ],
    tips: []
  },

  {
    id: "light_oatmeal-egg-porridge",
    name: "燕麦鸡蛋粥",
    category: "早餐",
    light: true,
    minutes: 15,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_oatmeal-egg-porridge.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/category-extra-fatloss.ts",
    calories: 374,
    nutrition: {"protein":21,"carbs":41,"fat":14,"servingGrams":380},
    required: [
      ["rolledOats","60克","燕麦片"],
      ["egg","2个","鸡蛋"]
    ],
    optional: [
      ["vibe-e69eb8e69d9e","5克","枸杞"]
    ],
    pantry: [
      ["water","350毫升","水"],
      ["scallion","1根","小葱"],
      ["salt","少许","盐"]
    ],
    steps: [
      ["","燕麦片加清水，中火煮开转小火煮 8 分钟，期间搅拌防粘底。"],
      ["","鸡蛋打散，缓缓淋入锅中，边淋边搅成蛋花。"],
      ["","小火再煮 2 分钟，加盐调味，撒枸杞和葱花。"],
      ["","关火焖 1 分钟让燕麦充分吸水，口感更绵稠。"]
    ],
    tips: []
  },

  {
    id: "light_pepper-chicken-dice",
    name: "彩椒炒鸡丁",
    category: "荤菜",
    light: true,
    minutes: 25,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_pepper-chicken-dice.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/category-extra-fatloss.ts",
    calories: 277,
    nutrition: {"protein":35,"carbs":14,"fat":9,"servingGrams":330},
    required: [
      ["chicken","150克","鸡胸肉"],
      ["pepper","红黄各半个（约150克）","彩椒"],
      ["onion","1/4个","洋葱"]
    ],
    optional: [],
    pantry: [
      ["garlic","2瓣","蒜"],
      ["soy","1勺","生抽"],
      ["oysterSauce","半勺","蚝油"],
      ["vibe-e6a984e6a684e6b2b9","5克","橄榄油"],
      ["starch","少许","淀粉"]
    ],
    steps: [
      ["","鸡胸肉切丁，用生抽、蚝油和少许淀粉抓匀腌 10 分钟。"],
      ["","彩椒、洋葱切丁，蒜切末。"],
      ["","锅烧热放橄榄油，下蒜末和鸡丁，大火滑炒 2 分钟至变色盛出。"],
      ["","余油下洋葱和彩椒丁，中火翻炒 2 分钟。"],
      ["","倒回鸡丁，加生抽翻匀，炒至鸡丁熟透后收汁出锅。"]
    ],
    tips: []
  },

  {
    id: "light_broccoli-shrimp-stir-fry",
    name: "西兰花炒虾仁",
    category: "水产",
    light: true,
    minutes: 15,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_broccoli-shrimp-stir-fry.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/category-extra-fatloss.ts",
    calories: 252,
    nutrition: {"protein":35,"carbs":10,"fat":8,"servingGrams":360},
    required: [
      ["broccoli","200克","西兰花"],
      ["shrimp","150克","虾仁"]
    ],
    optional: [],
    pantry: [
      ["garlic","3瓣","蒜"],
      ["wine","1勺","料酒"],
      ["soy","1勺","生抽"],
      ["vibe-e6a984e6a684e6b2b9","5克","橄榄油"],
      ["salt","少许","盐"]
    ],
    steps: [
      ["","西兰花掰小朵，盐水浸泡后焯水 1 分钟捞出；虾仁用料酒腌 5 分钟。"],
      ["","锅热放橄榄油，下蒜末爆香。"],
      ["","下虾仁中火翻炒 1 分钟至变色。"],
      ["","加入西兰花，大火翻炒 2 分钟，加生抽和少许盐调味即可。"]
    ],
    tips: []
  },

  {
    id: "light_mushroom-greens-stir-fry",
    name: "香菇炒青菜",
    category: "素菜",
    light: true,
    minutes: 15,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_mushroom-greens-stir-fry.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/category-extra-fatloss.ts",
    calories: 155,
    nutrition: {"protein":7,"carbs":16,"fat":7,"servingGrams":420},
    required: [
      ["mushroom","100克","鲜香菇"],
      ["bokchoy","300克","上海青"]
    ],
    optional: [],
    pantry: [
      ["garlic","3瓣","蒜"],
      ["oysterSauce","1勺","蚝油"],
      ["vibe-e6a984e6a684e6b2b9","5克","橄榄油"],
      ["salt","少许","盐"]
    ],
    steps: [
      ["","香菇去蒂切片，上海青对半剖开洗净，蒜切末。"],
      ["","水烧开，上海青焯水 30 秒捞出沥干。"],
      ["","锅热放橄榄油，爆香蒜末，下香菇片中火煸炒 2 分钟至出汁。"],
      ["","倒入上海青，加蚝油和少许盐，大火翻炒 1 分钟即可。"]
    ],
    tips: []
  },

  {
    id: "light_boiled-beef-sprout-salad",
    name: "白灼牛里脊拌豆芽",
    category: "荤菜",
    light: true,
    minutes: 20,
    servings: 1,
    difficulty: "简单",
    coverPath: "ai-generated/light_boiled-beef-sprout-salad.jpg",
    stepImages: false,
    sourcePath: "https://github.com/Jiayu-zheng1/EveryDay_Food/blob/main/src/data/category-extra-fatloss.ts",
    calories: 276,
    nutrition: {"protein":43,"carbs":8,"fat":8,"servingGrams":350},
    required: [
      ["vibe-e7899be9878ce8848a","180克","牛里脊"],
      ["beanSprout","150克","绿豆芽"]
    ],
    optional: [
      ["cilantro","1棵","香菜"]
    ],
    pantry: [
      ["garlic","2瓣","蒜"],
      ["wine","1勺","料酒"],
      ["soy","1.5勺","生抽"],
      ["vinegar","1勺","醋"],
      ["vibe-e8bea3e6a492e6b2b9","3克","辣椒油"],
      ["salt","少许","盐"]
    ],
    steps: [
      ["","牛里脊顺纹理切薄片，加料酒和少许盐抓匀腌制。"],
      ["","绿豆芽入沸水焯至熟透，捞出过凉水沥干铺在盘底。"],
      ["","锅中重新烧开水，下牛肉片快速滑散汆烫至熟透立刻捞出，盖在豆芽上。"],
      ["","蒜切末、香菜切碎，与生抽、香醋、辣椒油调汁浇在牛肉上拌匀。"]
    ],
    tips: []
  }
]

module.exports = { lightIngredients, lightRecipes }
