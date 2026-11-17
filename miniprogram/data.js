const { lightIngredients, lightRecipes } = require('./light-recipes')

const ingredients = {
  "egg": [
    "鸡蛋",
    "蛋",
    "新鲜鸡蛋"
  ],
  "tomato": [
    "番茄",
    "西红柿"
  ],
  "potato": [
    "土豆",
    "马铃薯"
  ],
  "cucumber": [
    "黄瓜",
    "青瓜"
  ],
  "tofu": [
    "豆腐",
    "嫩豆腐"
  ],
  "scallion": [
    "葱",
    "小葱",
    "香葱",
    "葱花"
  ],
  "garlic": [
    "大蒜",
    "蒜",
    "蒜瓣",
    "蒜头",
    "蒜末"
  ],
  "chili": [
    "干辣椒"
  ],
  "oil": [
    "食用油",
    "油"
  ],
  "salt": [
    "盐",
    "食盐",
    "食用盐"
  ],
  "vinegar": [
    "米醋",
    "醋"
  ],
  "soy": [
    "生抽"
  ],
  "sugar": [
    "白糖",
    "糖",
    "白砂糖"
  ],
  "water": [
    "水",
    "饮用水",
    "温热水",
    "清水",
    "冷水",
    "开水",
    "温水",
    "热水"
  ],
  "chicken": [
    "鸡胸肉",
    "鸡柳"
  ],
  "thigh": [
    "鸡腿",
    "鸡大腿"
  ],
  "pork": [
    "猪里脊",
    "里脊肉",
    "瘦肉"
  ],
  "ribs": [
    "猪排骨",
    "排骨",
    "猪小排",
    "小排"
  ],
  "mince": [
    "猪肉末",
    "猪肉馅",
    "肉糜"
  ],
  "beef": [
    "牛肉片",
    "肥牛片"
  ],
  "shrimp": [
    "虾仁",
    "去壳虾"
  ],
  "cod": [
    "鳕鱼",
    "鳕鱼块"
  ],
  "cabbage": [
    "大白菜",
    "白菜"
  ],
  "bokchoy": [
    "小青菜",
    "上海青",
    "小白菜",
    "青菜"
  ],
  "broccoli": [
    "西兰花",
    "青花菜"
  ],
  "carrot": [
    "胡萝卜",
    "红萝卜"
  ],
  "pepper": [
    "甜椒",
    "彩椒",
    "灯笼椒"
  ],
  "mushroom": [
    "鲜香菇",
    "香菇"
  ],
  "onion": [
    "洋葱",
    "圆葱"
  ],
  "spinach": [
    "菠菜"
  ],
  "corn": [
    "玉米粒",
    "甜玉米粒"
  ],
  "beanSprout": [
    "绿豆芽",
    "豆芽"
  ],
  "zucchini": [
    "西葫芦",
    "角瓜"
  ],
  "pumpkin": [
    "南瓜"
  ],
  "peas": [
    "豌豆",
    "青豆"
  ],
  "rice": [
    "熟米饭",
    "剩米饭",
    "米饭",
    "冷饭",
    "剩饭"
  ],
  "noodles": [
    "挂面",
    "干面条"
  ],
  "nori": [
    "紫菜",
    "干紫菜"
  ],
  "ginger": [
    "姜",
    "生姜",
    "姜片",
    "姜末"
  ],
  "starch": [
    "淀粉",
    "玉米淀粉",
    "生粉"
  ],
  "sesame": [
    "香油",
    "芝麻油"
  ],
  "wine": [
    "料酒",
    "黄酒",
    "绍兴酒"
  ],
  "darkSoy": [
    "老抽"
  ],
  "rockSugar": [
    "冰糖"
  ],
  "starAnise": [
    "八角"
  ],
  "whitePepper": [
    "白胡椒粉",
    "胡椒粉"
  ],
  "oysterSauce": [
    "蚝油"
  ],
  "eggplant": [
    "茄子",
    "长茄子"
  ],
  "greenBean": [
    "豆角",
    "四季豆"
  ],
  "celery": [
    "芹菜"
  ],
  "lettuce": [
    "生菜"
  ],
  "babyCabbage": [
    "娃娃菜"
  ],
  "lotusRoot": [
    "莲藕",
    "藕"
  ],
  "radish": [
    "白萝卜"
  ],
  "winterMelon": [
    "冬瓜"
  ],
  "yam": [
    "山药",
    "淮山"
  ],
  "sweetPotato": [
    "红薯",
    "地瓜"
  ],
  "enoki": [
    "金针菇"
  ],
  "driedTofu": [
    "豆干",
    "香干"
  ],
  "driedTofuStick": [
    "腐竹"
  ],
  "milk": [
    "牛奶"
  ],
  "porkBelly": [
    "五花肉"
  ],
  "chickenWings": [
    "鸡翅",
    "鸡中翅"
  ],
  "beefBrisket": [
    "牛腩"
  ],
  "seaBass": [
    "鲈鱼"
  ],
  "hairtail": [
    "带鱼"
  ],
  "squid": [
    "鱿鱼"
  ],
  "vermicelli": [
    "粉丝",
    "龙口粉丝"
  ],
  "riceNoodle": [
    "米粉",
    "米线"
  ],
  "flour": [
    "面粉",
    "中筋面粉"
  ],
  "steamedBun": [
    "馒头"
  ],
  "dumplingWrapper": [
    "饺子皮"
  ],
  "riceCake": [
    "年糕"
  ],
  "cilantro": [
    "香菜",
    "芫荽"
  ],
  "vibe-e99d92e89fb9": [
    "青蟹"
  ],
  "vibe-e59296e596b1e59d97": [
    "咖喱块"
  ],
  "vibe-e6a4b0e6b586": [
    "椰浆"
  ],
  "vibe-e9b2a4e9b1bc": [
    "鲤鱼"
  ],
  "vibe-e5a4a7e891b1": [
    "大葱"
  ],
  "vibe-e99988e9868b": [
    "陈醋"
  ],
  "vibe-e591b3e69e81e9b29c28e7949fe68abd29": [
    "味极鲜(生抽)"
  ],
  "vibe-e9b1bc": [
    "鱼"
  ],
  "vibe-e985b1e6b2b9": [
    "酱油"
  ],
  "vibe-e5b08fe7b1b3e6a492": [
    "小米椒"
  ],
  "vibe-e591b3e7b2be2fe9b8a1e7b2be": [
    "味精/鸡精"
  ],
  "vibe-e9b1bce5a4b4": [
    "鱼头"
  ],
  "vibe-e7be8ee4babae6a492": [
    "美人椒"
  ],
  "vibe-e9b8a1e7b2be": [
    "鸡精"
  ],
  "vibe-e9bb91e883a1e6a492e7b289": [
    "黑胡椒粉"
  ],
  "vibe-e89e83e89fb9": [
    "螃蟹"
  ],
  "vibe-e8b186e793a3e985b1": [
    "豆瓣酱"
  ],
  "vibe-e88f9ce6b2b9": [
    "菜油"
  ],
  "vibe-e795aae88c84e985b1": [
    "番茄酱"
  ],
  "vibe-e88081e5a79c": [
    "老姜"
  ],
  "vibe-e7949fe89a9d": [
    "生蚝"
  ],
  "vibe-e88289e89fb9": [
    "肉蟹"
  ],
  "vibe-e899be": [
    "虾"
  ],
  "vibe-e99d92e6a492": [
    "青椒"
  ],
  "vibe-e7baa2e6a492": [
    "红椒"
  ],
  "vibe-e6b5b7e9b29ce985b1": [
    "海鲜酱"
  ],
  "vibe-e9bb84e8b186e985b1": [
    "黄豆酱"
  ],
  "vibe-e7949ce99da2e985b1": [
    "甜面酱"
  ],
  "vibe-e595a4e98592": [
    "啤酒"
  ],
  "vibe-e5b7b4e6b299e9b1bc": [
    "巴沙鱼"
  ],
  "vibe-e894ace88f9cefbc88e59c9fe8b186e789872fe8b186e88abd2fe88ab1e88f9c2fe7949fe88f9cefbc89": [
    "蔬菜（土豆片/豆芽/花菜/生菜）"
  ],
  "vibe-e7baa2e6b2b9e8b186e793a3e985b1": [
    "红油豆瓣酱"
  ],
  "vibe-e8b186e8b189": [
    "豆豉"
  ],
  "vibe-e897a4e6a492e6b2b9": [
    "藤椒油"
  ],
  "vibe-e88f9ce7b1bde6b2b9": [
    "菜籽油"
  ],
  "vibe-e9bb91e9b395e9b1bcefbc88e5b8a6e79aaeefbc89": [
    "黑鳕鱼（带皮）"
  ],
  "vibe-e99d92e891b1efbc88e891b1e799bdefbc89": [
    "青葱（葱白）"
  ],
  "vibe-e99d92e891b1efbc88e891b1e7bbbfefbc89": [
    "青葱（葱绿）"
  ],
  "vibe-e88ab1e7949fe6b2b9": [
    "花生油"
  ],
  "vibe-e9b39de4b89d": [
    "鳝丝"
  ],
  "vibe-e78caae6b2b9": [
    "猪油"
  ],
  "vibe-e9a699e58fb6": [
    "香叶"
  ],
  "vibe-e6a182e79aae": [
    "桂皮"
  ],
  "vibe-e88cb4e9a699": [
    "茴香"
  ],
  "vibe-e7baa2e88cb6": [
    "红茶"
  ],
  "vibe-e7b38de7b291": [
    "糍粑"
  ],
  "vibe-e7baa2e7b396": [
    "红糖"
  ],
  "vibe-e7b3afe7b1b3": [
    "糯米"
  ],
  "vibe-e7baa2e69ea3": [
    "红枣"
  ],
  "vibe-e6a182e59c86": [
    "桂圆"
  ],
  "vibe-e99fa9e5bc8fe985b1e6b2b9efbc88e68896e7949fe68abdefbc89": [
    "韩式酱油（或生抽）"
  ],
  "vibe-e697a5e5bc8fe591b3e6b78b": [
    "日式味淋"
  ],
  "vibe-e99d92e891b1": [
    "青葱"
  ],
  "vibe-e8bea3e6a492efbc88e5b08fe7b1b3e8bea3e68896e99d92e7baa2e6a492efbc89": [
    "辣椒（小米辣或青红椒）"
  ],
  "vibe-e59090e58fb8": [
    "吐司"
  ],
  "vibe-e59fb9e6a0b9": [
    "培根"
  ],
  "vibe-e9bb84e6b2b9": [
    "黄油"
  ],
  "vibe-e89b8be9bb84e985b1": [
    "蛋黄酱"
  ],
  "vibe-e9bb91e883a1e6a492": [
    "黑胡椒"
  ],
  "vibe-e9a5bae5ad90efbc88e9809fe586bbe6b0b4e9a5baefbc89": [
    "饺子（速冻水饺）"
  ],
  "vibe-e9bb91e88a9de9babb": [
    "黑芝麻"
  ],
  "vibe-e6b0b4e6b5b8e98791e69eaae9b1bce7bd90e5a4b4": [
    "水浸金枪鱼罐头"
  ],
  "vibe-e696b9e5bda2e59090e58fb8e78987": [
    "方形吐司片"
  ],
  "vibe-e4bf84e5bc8fe985b8e9bb84e7939ce6b181": [
    "俄式酸黄瓜汁"
  ],
  "vibe-e88a9de5a3abe78987": [
    "芝士片"
  ],
  "vibe-e781abe885bfe78987": [
    "火腿片"
  ],
  "vibe-e99da2e58c85e78987": [
    "面包片"
  ],
  "vibe-e585a8e88482e7899be5a5b62fe5a5b6e6b2b9": [
    "全脂牛奶/奶油"
  ],
  "vibe-e78795e9baa6": [
    "燕麦"
  ],
  "vibe-e6a492e79b90": [
    "椒盐"
  ],
  "vibe-e699aee9809ae99da2e7b289": [
    "普通面粉"
  ],
  "vibe-e781abe885bf": [
    "火腿"
  ],
  "vibe-e696b0e9b29ce78e89e7b1b3": [
    "新鲜玉米"
  ],
  "vibe-e696b0e9b29ce59090e58fb8": [
    "新鲜吐司"
  ],
  "vibe-e69e9ce985b1": [
    "果酱"
  ],
  "vibe-313030c2b04320e6b2b8e6b0b4": [
    "100°C 沸水"
  ],
  "vibe-3330c2b04320e6b8a9e6b0b4": [
    "30°C 温水"
  ],
  "vibe-e586b0e6b0b4": [
    "冰水"
  ],
  "vibe-e6b3a1e68993e7b289": [
    "泡打粉"
  ],
  "vibe-e799bdefbc88e7baa2efbc89e7b396": [
    "白（红）糖"
  ],
  "vibe-e59296e595a1e7b2892fe5b7a7e5858be58a9b2fe9baa6e789872fe59d9ae69e9c2fe9a699e89589e7ad89": [
    "咖啡粉/巧克力/麦片/坚果/香蕉等"
  ],
  "vibe-e6b8a9e6b0b4e68896e9ab98e6b1a4": [
    "温水或高汤"
  ],
  "vibe-e7baafe5b9b2e78795e9baa6e78987": [
    "纯干燕麦片"
  ],
  "vibe-e894ace88f9ce7a28ee58fb6": [
    "蔬菜碎叶"
  ],
  "vibe-e79b902fe883a1e6a492": [
    "盐/胡椒"
  ],
  "vibe-e6848fe5bc8fe78caae88289e9a699e882a02fe8bea3e9a699e882a02fe58d88e9a490e88289": [
    "意式猪肉香肠/辣香肠/午餐肉"
  ],
  "vibe-e799bee591b3e69da5e68bbfe59da1e9878ce6848fe99da2e985b1": [
    "百味来拿坡里意面酱"
  ],
  "vibe-e6a984e6a684e6b2b9": [
    "橄榄油"
  ],
  "vibe-e5b895e9a9ace6a3aee5b9b2e985aa": [
    "帕马森干酪"
  ],
  "vibe-e696b0e9b29ce6aca7e88ab9": [
    "新鲜欧芹"
  ],
  "vibe-e5b9b2e8bea3e6a492e7a28e": [
    "干辣椒碎"
  ],
  "vibe-e99da2e58c85": [
    "面包"
  ],
  "vibe-e586b7e586bbe88ab1e58db7": [
    "冷冻花卷"
  ],
  "vibe-e892b8e9b1bce8b189e6b2b9": [
    "蒸鱼豉油"
  ],
  "vibe-e5bc80e6b48b": [
    "开洋"
  ],
  "vibe-e586b0e7b3962fe799bde7a082e7b3962fe7bbb5e799bde7b396": [
    "冰糖/白砂糖/绵白糖"
  ],
  "vibe-e891b1e5a79ce8929ce38081e88ab1e6a492e7ad89e8be85e69699": [
    "葱姜蒜、花椒等辅料"
  ],
  "vibe-e799bde88a9de9babb": [
    "白芝麻"
  ],
  "vibe-e799bde9868b2fe7b1b3e9868b": [
    "白醋/米醋"
  ],
  "vibe-e5b9b2e8bea3e6a492e99da2": [
    "干辣椒面"
  ],
  "vibe-e5ad9ce784b6e7b289": [
    "孜然粉"
  ],
  "vibe-e4ba94e9a699e7b289": [
    "五香粉"
  ],
  "vibe-e88ab1e6a492e7b289": [
    "花椒粉"
  ],
  "vibe-e58d81e4b889e9a699": [
    "十三香"
  ],
  "vibe-e9babbe8bea3e9b29c": [
    "麻辣鲜"
  ],
  "vibe-e88ab1e6a492e6b2b9": [
    "花椒油"
  ],
  "vibe-e585a8e88482e7899be5a5b6": [
    "全脂牛奶"
  ],
  "vibe-e985a5e6b2b9284768656529": [
    "酥油(Ghee)"
  ],
  "vibe-e5b08fe8b186e894bbe7b289": [
    "小豆蔻粉"
  ],
  "vibe-e885b0e69e9c": [
    "腰果"
  ],
  "vibe-e69d8fe4bb81": [
    "杏仁"
  ],
  "vibe-e891a1e89084e5b9b2": [
    "葡萄干"
  ],
  "vibe-e79498e99cb2e59296e595a1e98592": [
    "甘露咖啡酒"
  ],
  "vibe-e788b1e5b094e585b0e799bee588a9e7949ce98592": [
    "爱尔兰百利甜酒"
  ],
  "vibe-e8939de5a4a9e58e9fe591b3e4bc8fe789b9e58aa0": [
    "蓝天原味伏特加"
  ],
  "vibe-e6b3a2e69781e5a881e5a3abe5bf8c": [
    "波旁威士忌"
  ],
  "vibe-e58fafe58fa3e58fafe4b990": [
    "可口可乐"
  ],
  "vibe-e586b0e59d97": [
    "冰块"
  ],
  "vibe-e69fa0e6aaac": [
    "柠檬"
  ],
  "vibe-e99d92e69fa0": [
    "青柠"
  ],
  "vibe-e89684e88db7e58fb6": [
    "薄荷叶"
  ],
  "vibe-e7b396e6b586": [
    "糖浆"
  ],
  "vibe-e98791e889b2e69c97e5a786e98592": [
    "金色朗姆酒"
  ],
  "vibe-e68993e7a28ee79a84e586b0e59d97": [
    "打碎的冰块"
  ],
  "vibe-e586b0e99587e88b8fe68993e6b0b4": [
    "冰镇苏打水"
  ],
  "vibe-e8a28be6b3a1e7baa2e88cb6": [
    "袋泡红茶"
  ],
  "vibe-e585a8e88482e5a5b6e7b289e68896e6b7a1e5a5b6": [
    "全脂奶粉或淡奶"
  ],
  "vibe-e7a082e7b396": [
    "砂糖"
  ],
  "vibe-e58e9fe591b3e985b8e5a5b6": [
    "原味酸奶"
  ],
  "vibe-e7869fe9808fe79a84e7899be6b2b9e69e9c": [
    "熟透的牛油果"
  ],
  "vibe-e89c82e89c9c": [
    "蜂蜜"
  ],
  "vibe-e586b7e7899be5a5b6": [
    "冷牛奶"
  ],
  "vibe-e89684e88db7e58fb6e68896e59d9ae69e9ce7a28e": [
    "薄荷叶或坚果碎"
  ],
  "vibe-e985b8e6a285e699b6e59bbae4bd93e9a5aee69699": [
    "酸梅晶固体饮料"
  ],
  "vibe-e696b9e7b396": [
    "方糖"
  ],
  "vibe-e58c97e4baace4ba8ce99485e5a4b4e98592": [
    "北京二锅头酒"
  ],
  "vibe-e5a587e4ba9ae7b1bd": [
    "奇亚籽"
  ],
  "vibe-e88a92e69e9c": [
    "芒果"
  ],
  "vibe-e891a1e89084e69f9a": [
    "葡萄柚"
  ],
  "vibe-e6a4b0e5a5b6": [
    "椰奶"
  ],
  "vibe-e58887e4b89de88a92e69e9ce5b9b2": [
    "切丝芒果干"
  ],
  "vibe-e58887e4b89de69fb3e6a999e5b9b2": [
    "切丝柳橙干"
  ],
  "vibe-e7bbbfe889b2e5b08fe8b186e894bb": [
    "绿色小豆蔻"
  ],
  "vibe-e88289e6a182e6a392": [
    "肉桂棒"
  ],
  "vibe-e4b881e9a699": [
    "丁香"
  ],
  "vibe-e9bb91e883a1e6a492e7b292": [
    "黑胡椒粒"
  ],
  "vibe-e98791e98592": [
    "金酒"
  ],
  "vibe-e9be99e8888ce585b0e98592": [
    "龙舌兰酒"
  ],
  "vibe-e4bc8fe789b9e58aa0": [
    "伏特加"
  ],
  "vibe-e799bde69c97e5a786e98592": [
    "白朗姆酒"
  ],
  "vibe-e6a999e591b3e7949ce98592": [
    "橙味甜酒"
  ],
  "vibe-e69eabe7b396e6b586": [
    "枫糖浆"
  ],
  "vibe-e58fafe4b990": [
    "可乐"
  ],
  "vibe-e59c9fe8b186e5b9b2e7b289e69da1": [
    "土豆干粉条"
  ],
  "vibe-e5b8a6e8849ae38081e788aae78caae5898de88298": [
    "带脚、爪猪前肘"
  ],
  "vibe-e7baa2e8b186e88590e4b9b3": [
    "红豆腐乳"
  ],
  "vibe-e7b2bee79b90": [
    "精盐"
  ],
  "vibe-e7baa2e985b1e6b2b9": [
    "红酱油"
  ],
  "vibe-e799bde985b1e6b2b9": [
    "白酱油"
  ],
  "vibe-e8929ce78987": [
    "蒜片"
  ],
  "vibe-e7a28ee7899be88289": [
    "碎牛肉"
  ],
  "vibe-e5b9b2e7bd97e58b92e68896e799bee9878ce9a699": [
    "干罗勒或百里香"
  ],
  "vibe-e892b8e88289e7b1b3e7b289": [
    "蒸肉米粉"
  ],
  "vibe-e983abe58ebfe8b186e793a3e985b1": [
    "郫县豆瓣酱"
  ],
  "vibe-e5b8a6e79aaee4ba94e88ab1e88289": [
    "带皮五花肉"
  ],
  "vibe-e7baa2e88590e4b9b3": [
    "红腐乳"
  ],
  "vibe-e88590e4b9b3e6b181": [
    "腐乳汁"
  ],
  "vibe-e891b1e799bd": [
    "葱白"
  ],
  "vibe-e6a285e5a4b4e78caae88289": [
    "梅头猪肉"
  ],
  "vibe-e7bd90e5a4b4e88fa0e8909de78987": [
    "罐头菠萝片"
  ],
  "vibe-e88c84e6b181": [
    "茄汁"
  ],
  "vibe-e799bde9868b": [
    "白醋"
  ],
  "vibe-e8929ce89389": [
    "蒜蓉"
  ],
  "vibe-e696b0e9b29ce9b8a1e7bf85": [
    "新鲜鸡翅"
  ],
  "vibe-e891b1e6aeb5": [
    "葱段"
  ],
  "vibe-e9bb84e98592e68896e69699e98592": [
    "黄酒或料酒"
  ],
  "vibe-e5b08fe891b1e88ab1": [
    "小葱花"
  ],
  "vibe-e78caae5898de88298": [
    "猪前肘"
  ],
  "vibe-e9a39fe794a8e6a48de789a9e6b2b9": [
    "食用植物油"
  ],
  "vibe-e88289e6a182e79aae": [
    "肉桂皮"
  ],
  "vibe-e8b186e894bb": [
    "豆蔻"
  ],
  "vibe-e88ab1e6a492": [
    "花椒"
  ],
  "vibe-e5a4a7e69699": [
    "大料"
  ],
  "vibe-e78caae798a6e88289": [
    "猪瘦肉"
  ],
  "vibe-e5b08fe7b1b3e8bea3": [
    "小米辣"
  ],
  "vibe-e7949fe5a79ce78987": [
    "生姜片"
  ],
  "vibe-e591b3e7b2be": [
    "味精"
  ],
  "vibe-e9b8a1e885bfe88289efbc88e58ebbe9aaa8efbc89": [
    "鸡腿肉（去骨）"
  ],
  "vibe-e985b8e5a5b6": [
    "酸奶"
  ],
  "vibe-e6b7a1e5a5b6e6b2b928486561767920437265616d29": [
    "淡奶油(Heavy Cream)"
  ],
  "vibe-e7baa2e8bea3e6a492e7b289": [
    "红辣椒粉"
  ],
  "vibe-e5b9b2e891abe88aa6e5b7b4e58fb6284b6173757269204d6574686929": [
    "干葫芦巴叶(Kasuri Methi)"
  ],
  "vibe-e58db0e5baa6e7bbbce59088e9a699e69699e7b28928476172616d204d6173616c6129": [
    "印度综合香料粉(Garam Masala)"
  ],
  "vibe-e69fa0e6aaace6b181": [
    "柠檬汁"
  ],
  "vibe-e7899be88289": [
    "牛肉"
  ],
  "vibe-e5b096e6a492": [
    "尖椒"
  ],
  "vibe-e5b08fe88b8fe68993": [
    "小苏打"
  ],
  "vibe-e5a4a7e68e92": [
    "大排"
  ],
  "vibe-e6a492e79b90e7b289": [
    "椒盐粉"
  ],
  "vibe-e891b1e5a79ce6b0b4": [
    "葱姜水"
  ],
  "vibe-e59089e5a3abe7b289": [
    "吉士粉"
  ],
  "vibe-e9b8a1e7bf85e4b8ad": [
    "鸡翅中"
  ],
  "vibe-e58594e88289": [
    "兔肉"
  ],
  "vibe-e5b08fe891b12fe5a4a7e891b12fe6b48be891b1": [
    "小葱/大葱/洋葱"
  ],
  "vibe-e99d92e88ab1e6a492": [
    "青花椒"
  ],
  "vibe-e5b1b1e5a588": [
    "山奈"
  ],
  "vibe-e799bde894bb": [
    "白蔻"
  ],
  "vibe-e5b08fe88cb4e9a699": [
    "小茴香"
  ],
  "vibe-e7be8ae68e92": [
    "羊排"
  ],
  "vibe-e799bde88ab7": [
    "白芷"
  ],
  "vibe-e69699e98592e68896e88085e9bb84e98592": [
    "料酒或者黄酒"
  ],
  "vibe-e99d92e88f9cefbc88e6b2b9e88f9ce38081e6b2b9e9baa6e88f9ce38081e88fa0e88f9cefbc89": [
    "青菜（油菜、油麦菜、菠菜）"
  ],
  "vibe-e697a0e9aaa8e88289efbc88e78caae88289e38081e7899be88289e38081e9b8a1e88289e38081e9b1bce4b8b8e38081e781abe885bfe882a0efbc89": [
    "无骨肉（猪肉、牛肉、鸡肉、鱼丸、火腿肠）"
  ],
  "vibe-e5b9b2e8b186e88590": [
    "干豆腐"
  ],
  "vibe-e58c97e4baace9babbe8bea3e696b9e4bebfe99da2": [
    "北京麻辣方便面"
  ],
  "vibe-e9babbe8bea3e9a699e99485e8b083e69699": [
    "麻辣香锅调料"
  ],
  "vibe-e7baa2e896afe7b289e4b89d": [
    "红薯粉丝"
  ],
  "vibe-e88a9de9babbe9a699e6b2b9": [
    "芝麻香油"
  ],
  "vibe-e8a180e882a0": [
    "血肠"
  ],
  "vibe-e985b8e88f9c": [
    "酸菜"
  ],
  "vibe-e5a79ce7b289": [
    "姜粉"
  ],
  "vibe-e891b1e7bb93": [
    "葱结"
  ],
  "vibe-e8bea3e6a492e6b2b9": [
    "辣椒油"
  ],
  "vibe-e8929ce88b94": [
    "蒜苔"
  ],
  "vibe-e69ca8e880b3": [
    "木耳"
  ],
  "vibe-e891b1e5a4b4": [
    "葱头"
  ],
  "vibe-e891b1e5a79ce8929c": [
    "葱姜蒜"
  ],
  "vibe-e5b8a6e79aaee78caae4ba94e88ab1e88289efbc88e58ebbe9aaa8efbc89": [
    "带皮猪五花肉（去骨）"
  ],
  "vibe-e59586e88a9d": [
    "商芝"
  ],
  "vibe-e6918ae9b8a1e89b8be79aae": [
    "摊鸡蛋皮"
  ],
  "vibe-e9b8a1e6b1a4": [
    "鸡汤"
  ],
  "vibe-e7869fe78caae6b2b9": [
    "熟猪油"
  ],
  "vibe-e8828be68e92": [
    "肋排"
  ],
  "vibe-e998b3e6b19fe8b186e8b189": [
    "阳江豆豉"
  ],
  "vibe-e78caae9878ce8848ae88289": [
    "猪里脊肉"
  ],
  "vibe-e587a4e5b0be": [
    "凤尾"
  ],
  "vibe-e8929ce88b97": [
    "蒜苗"
  ],
  "vibe-e7baa2e6b3a1e6a492": [
    "红泡椒"
  ],
  "vibe-e7baa2e6b2b9e8b186e793a3": [
    "红油豆瓣"
  ],
  "vibe-e9b8a1e89b8be6b885": [
    "鸡蛋清"
  ],
  "vibe-e59c9fe8b186e6b780e7b289": [
    "土豆淀粉"
  ],
  "vibe-e6a48de789a9e6b2b9": [
    "植物油"
  ],
  "vibe-e7949fe68abde985b1e6b2b9": [
    "生抽酱油"
  ],
  "vibe-e6b0b4e6b780e7b289": [
    "水淀粉"
  ],
  "vibe-e4ba94e88ab1e88289e89684e78987": [
    "五花肉薄片"
  ],
  "vibe-e9b8a1e585a8e7bf85": [
    "鸡全翅"
  ],
  "vibe-e8929ce7b289": [
    "蒜粉"
  ],
  "vibe-e7949ce6a492e7b289": [
    "甜椒粉"
  ],
  "vibe-e8bea3e6a492e7b289": [
    "辣椒粉"
  ],
  "vibe-e9b8ade88289": [
    "鸭肉"
  ],
  "vibe-e88d89e69e9c": [
    "草果"
  ],
  "vibe-e69c9de5a4a9e6a492": [
    "朝天椒"
  ],
  "vibe-e4ba94e88ab1e882892fe798a6e88289": [
    "五花肉/瘦肉"
  ],
  "vibe-e5a79ce8929c": [
    "姜蒜"
  ],
  "vibe-e58ebbe79aaee78caae88289": [
    "去皮猪肉"
  ],
  "vibe-e7baa2e896afe6b780e7b289": [
    "红薯淀粉"
  ],
  "vibe-e88ab1e6a492e7a28e": [
    "花椒碎"
  ],
  "vibe-e88ab1e6a492e7b292": [
    "花椒粒"
  ],
  "vibe-e78caae88289e78987": [
    "猪肉片"
  ],
  "vibe-e9babbe6b2b9": [
    "麻油"
  ],
  "vibe-e9b8a1e885bfe88289": [
    "鸡腿肉"
  ],
  "vibe-e6aca7e88ab9": [
    "欧芹"
  ],
  "vibe-e69ca8e880b3efbc88e5b9b2efbc89": [
    "木耳（干）"
  ],
  "vibe-e89b8be6b885": [
    "蛋清"
  ],
  "vibe-e78caae4ba94e88ab1e88289e68896e78caae88289e68e92e9aaa8": [
    "猪五花肉或猪肉排骨"
  ],
  "vibe-e4b89ce58c97e985b8e88f9c": [
    "东北酸菜"
  ],
  "vibe-e7899be69fb3e68896e7899be882a9e88289": [
    "牛柳或牛肩肉"
  ],
  "vibe-e5ad9ce784b6": [
    "孜然"
  ],
  "vibe-e69882e588bae9b1bce68896e88085e6b299e58589e9b1bc": [
    "昂刺鱼或者沙光鱼"
  ],
  "vibe-e6b7a1e5a5b6e6b2b9": [
    "淡奶油"
  ],
  "vibe-e58e9fe591b3e5a5a5e588a9e5a5a5": [
    "原味奥利奥"
  ],
  "vibe-e7899be88289e69cab": [
    "牛肉末"
  ],
  "vibe-e88099e88099e69f91": [
    "耙耙柑"
  ],
  "vibe-e88c89e88e89e7bbbfe88cb6": [
    "茉莉绿茶"
  ],
  "vibe-e89497e7b396e7b396e6b586": [
    "蔗糖糖浆"
  ],
  "vibe-e89ebae4b89de6a492": [
    "螺丝椒"
  ],
  "vibe-4d6173616c6120e7b289": [
    "Masala 粉"
  ],
  "vibe-e88a9de9babb": [
    "芝麻"
  ],
  "vibe-e799bee9a699e69e9c": [
    "百香果"
  ],
  "vibe-e6a999e5ad90": [
    "橙子"
  ],
  "vibe-e88c89e88e89e7bbbfe88cb6e88cb6e58fb6": [
    "茉莉绿茶茶叶"
  ],
  "vibe-e88b8fe68993e6b094e6b3a1e6b0b4": [
    "苏打气泡水"
  ],
  "vibe-e89684e88db7e58fb6e68896e585b6e4bb96e7bbbfe58fb6": [
    "薄荷叶或其他绿叶"
  ],
  "vibe-e696b0e9b29ce88f9ce5bf83": [
    "新鲜菜心"
  ],
  "vibe-e5a79ce4b89d": [
    "姜丝"
  ],
  "vibe-e6b4bbe899be": [
    "活虾"
  ],
  "vibe-e9a699e9868b": [
    "香醋"
  ],
  "vibe-e58c85e88f9c": [
    "包菜"
  ],
  "vibe-e9b38ae9b1bc": [
    "鳊鱼"
  ],
  "vibe-e88081e8b186e88590": [
    "老豆腐"
  ],
  "vibe-e586b0e7b289e7b1bd": [
    "冰粉籽"
  ],
  "vibe-e58789e799bde5bc80": [
    "凉白开"
  ],
  "vibe-e89684e88db7e6b181": [
    "薄荷汁"
  ],
  "vibe-e98187e6b0b4e58f91e58589e586b0e59d97": [
    "遇水发光冰块"
  ],
  "vibe-e59296e595a1e6b6b2": [
    "咖啡液"
  ],
  "vibe-e88fa0e8909de6b181": [
    "菠萝汁"
  ],
  "vibe-e88b8fe68993e6b0b4": [
    "苏打水"
  ],
  "vibe-e5a5b6e6b2b9": [
    "奶油"
  ],
  "vibe-e6b5b7e79b90": [
    "海盐"
  ],
  "vibe-e69c97e5a786e98592": [
    "朗姆酒"
  ],
  "vibe-e88d89e88e93": [
    "草莓"
  ],
  "vibe-e58aa0e7b396e782bce4b9b3": [
    "加糖炼乳"
  ],
  "vibe-e9878de5a5b6e6b2b9": [
    "重奶油"
  ],
  "vibe-e9a699e88d89e7b2be": [
    "香草精"
  ],
  "vibe-e696b9e4bebfe99da2": [
    "方便面"
  ],
  "vibe-e781abe885bfe882a0": [
    "火腿肠"
  ],
  "vibe-e696b9e4bebfe99da2e8b083e69699e58c85": [
    "方便面调料包"
  ],
  "vibe-e58789e7b289": [
    "凉粉"
  ],
  "vibe-e78e89e7b1b3e6b2b9": [
    "玉米油"
  ],
  "vibe-e4b8ade7b297e8bea3e6a492e99da2": [
    "中粗辣椒面"
  ],
  "vibe-e79fbfe6b389e6b0b4": [
    "矿泉水"
  ],
  "vibe-e6848fe5a4a7e588a9e99da2": [
    "意大利面"
  ],
  "vibe-e795aae88c84e985b1202f20e9bb91e883a1e6a492e985b1": [
    "番茄酱 / 黑胡椒酱"
  ],
  "vibe-e99988e79aae": [
    "陈皮"
  ],
  "vibe-e8a5bfe6b48be58f82": [
    "西洋参"
  ],
  "vibe-e79fb3e6969b": [
    "石斛"
  ],
  "vibe-e78e89e7abb9": [
    "玉竹"
  ],
  "vibe-e9baa6e586ac": [
    "麦冬"
  ],
  "vibe-e89b8fe5ad90": [
    "蛏子"
  ],
  "vibe-e88d89e9b1bc": [
    "草鱼"
  ],
  "vibe-e5b9b2e8bea3e6a492e6aeb5": [
    "干辣椒段"
  ],
  "vibe-e781abe99485e5ba95e69699": [
    "火锅底料"
  ],
  "vibe-e58d83e5bca0": [
    "千张"
  ],
  "vibe-e7869fe88ab1e7949fe7b1b3": [
    "熟花生米"
  ],
  "vibe-e6b3a1e58f91e5a5bde79a84e6b5b7e58f82efbc88e58c97e69e81e58f82efbc89": [
    "泡发好的海参（北极参）"
  ],
  "vibe-e5a4a7e891b1e891b1e799bd": [
    "大葱葱白"
  ],
  "vibe-e6a182e9b1bc": [
    "桂鱼"
  ],
  "vibe-e7b1b3": [
    "米"
  ],
  "vibe-e4b889e69687e9b1bc": [
    "三文鱼"
  ],
  "vibe-e69c89e79b90e7899be6b2b9": [
    "有盐牛油"
  ],
  "vibe-e7b29fe7b1b3": [
    "粟米"
  ],
  "vibe-e98791e88f87": [
    "金菇"
  ],
  "vibe-e586ace88f87": [
    "冬菇"
  ],
  "vibe-e6b19fe58d97e7b1b3e68896e58c97e696b9e5a4a7e7b1b3": [
    "江南米或北方大米"
  ],
  "vibe-e6b2b9e9baa6e88f9c": [
    "油麦菜"
  ],
  "vibe-e79498e7abb9e7898ce9b2aee9b1bce7bd90e5a4b4": [
    "甘竹牌鲮鱼罐头"
  ],
  "vibe-e9b29ce99da2e69da1": [
    "鲜面条"
  ],
  "vibe-e88097e6b2b9": [
    "耗油"
  ],
  "vibe-e88d94e6b5a6e88a8be5a4b4": [
    "荔浦芋头"
  ],
  "vibe-e7baafe7899be5a5b6": [
    "纯牛奶"
  ],
  "vibe-e882a5e7899be58db7": [
    "肥牛卷"
  ],
  "vibe-e983abe58ebfe7baa2e6b2b9e8b186e793a3e985b1": [
    "郫县红油豆瓣酱"
  ],
  "vibe-e88ab1e88f9c": [
    "花菜"
  ],
  "vibe-e8bea3e6a492": [
    "辣椒"
  ],
  "vibe-e998bfe6a0b9e5bbb7e7baa2e899be": [
    "阿根廷红虾"
  ],
  "vibe-e799bde891a1e89084e98592": [
    "白葡萄酒"
  ],
  "vibe-e6898be69eaae885bfefbc88e68896e9b8a1e883b8e884afe88289efbc89": [
    "手枪腿（或鸡胸脯肉）"
  ],
  "vibe-e7869fe88ab1e7949f": [
    "熟花生"
  ],
  "vibe-e5b9b2e8bea3e6a492efbc88e68896e4ba8ce88d86e69da1efbc89": [
    "干辣椒（或二荆条）"
  ],
  "vibe-e88081e68abde985b1e6b2b9": [
    "老抽酱油"
  ],
  "vibe-e6b780e7b289efbc88e794a8e4bba5e58bbee88aa1efbc89": [
    "淀粉（用以勾芡）"
  ],
  "vibe-e88eb4e7ac8b": [
    "莴笋"
  ],
  "vibe-e6b2b9e6b3bce8bea3e5ad90": [
    "油泼辣子"
  ],
  "vibe-e58d97e4b9b3": [
    "南乳"
  ],
  "vibe-e69fb1e4beafe985b1": [
    "柱侯酱"
  ],
  "vibe-e899bee6bb91e9a685": [
    "虾滑馅"
  ],
  "vibe-e99d92e6a4922fe88ba6e7939c2fe88c84e5ad90e7ad89e5aeb9e599a8e9a39fe69d90": [
    "青椒/苦瓜/茄子等容器食材"
  ],
  "vibe-e794b0e89eba": [
    "田螺"
  ],
  "vibe-e7b4abe88b8f": [
    "紫苏"
  ],
  "vibe-e89684e88db7": [
    "薄荷"
  ],
  "vibe-e9be9fe88b93e8868fe7b289": [
    "龟苓膏粉"
  ],
  "vibe-e5869ce69d91e78e89e7b1b3e9b8a1": [
    "农村玉米鸡"
  ],
  "vibe-e88ab1e6a492206f7220e9babbe6a492": [
    "花椒 or 麻椒"
  ],
  "vibe-e7b38de7b291e8bea3e6a492": [
    "糍粑辣椒"
  ],
  "vibe-e98592e7b39f": [
    "酒糟"
  ],
  "vibe-e9a39fe794a8e6b2b92028e88f9ce7b1bde6b2b929": [
    "食用油 (菜籽油)"
  ],
  "vibe-e7baa2e79fb3e6a6b4e7b396e6b586": [
    "红石榴糖浆"
  ],
  "vibe-4e464320e6a999e6b181": [
    "NFC 橙汁"
  ],
  "vibe-e799bde69c97e5a786": [
    "白朗姆"
  ],
  "vibe-e8939de6a999e58a9be5a887e98592": [
    "蓝橙力娇酒"
  ],
  "vibe-e781abe99485e7899be88289e58db7": [
    "火锅牛肉卷"
  ],
  "vibe-e89891e88f87": [
    "蘑菇"
  ],
  "vibe-e99fa9e5bc8fe8bea3e985b1": [
    "韩式辣酱"
  ],
  "vibe-e99baae7a2a7": [
    "雪碧"
  ],
  "vibe-e89fb9e591b3e88f87": [
    "蟹味菇"
  ],
  "vibe-e799bde78e89e88f87": [
    "白玉菇"
  ],
  "vibe-e88f9ce6a492": [
    "菜椒"
  ],
  "vibe-e8a5bfe8939de88ab1": [
    "西蓝花"
  ],
  "vibe-e88db7e585b0e8b186": [
    "荷兰豆"
  ],
  "vibe-e8858ae882a0": [
    "腊肠"
  ],
  "vibe-e8929ce896b9": [
    "蒜薹"
  ],
  "vibe-e9bb91e6a492e8858ce69699": [
    "黑椒腌料"
  ],
  "vibe-e78caae8b984": [
    "猪蹄"
  ],
  "vibe-e7baa2e69f9ae69e9ce88289": [
    "红柚果肉"
  ],
  "vibe-e5b9b2e5b08fe7b1b3e6a492": [
    "干小米椒"
  ],
  "vibe-e6af9be8b186": [
    "毛豆"
  ],
  "vibe-e8af9de6a285": [
    "话梅"
  ],
  "vibe-e9b29ce899be": [
    "鲜虾"
  ],
  "vibe-e7b1b3e98592": [
    "米酒"
  ],
  "vibe-e99d92e7baa2e6a492": [
    "青红椒"
  ],
  "vibe-e586b7e586bbe99d92e8b186": [
    "冷冻青豆"
  ],
  "vibe-e586b7e586bbe78e89e7b1b3e7b292": [
    "冷冻玉米粒"
  ],
  "vibe-e6b5b7e88b94e7a28e": [
    "海苔碎"
  ],
  "vibe-e6b299e68b89e985b1": [
    "沙拉酱"
  ],
  "vibe-e9ab98e7ad8be68896e4b8ade7ad8be99da2e7b289": [
    "高筋或中筋面粉"
  ],
  "vibe-e7b396e68896e7b396e6b586": [
    "糖或糖浆"
  ],
  "vibe-e5b9b2e985b5e6af8d": [
    "干酵母"
  ],
  "vibe-3330e2848320e6b8a9e6b0b4": [
    "30℃ 温水"
  ],
  "vibe-e5a5b6e588b6e5938128e5a5b6e7b2892fe7899be5a5b62fe6b7a1e5a5b6e6b2b92fe782bce4b9b329": [
    "奶制品(奶粉/牛奶/淡奶油/炼乳)"
  ],
  "vibe-e9bb84e6b2b9e68896e78e89e7b1b3e6b2b9": [
    "黄油或玉米油"
  ],
  "vibe-e8b0b7e69c8ae7b289": [
    "谷朊粉"
  ],
  "vibe-e7949fe68abd202f20e591b3e69e81e9b29c": [
    "生抽 / 味极鲜"
  ],
  "vibe-e799bde9868b202f20e69699e98592": [
    "白醋 / 料酒"
  ],
  "vibe-3730e5baa6e7baafe58780e6b0b4": [
    "70度纯净水"
  ],
  "vibe-e6b2b8e6b0b4": [
    "沸水"
  ],
  "vibe-e7899be89b99e88289": [
    "牛蛙肉"
  ],
  "vibe-e6b3a1e5a79c": [
    "泡姜"
  ],
  "vibe-e6b3a1e6a492": [
    "泡椒"
  ],
  "vibe-e9878ee5b1b1e6a492": [
    "野山椒"
  ],
  "vibe-e99d92e7baa2e8bea3e6a492": [
    "青红辣椒"
  ],
  "vibe-e79b90e5b7b4": [
    "盐巴"
  ],
  "vibe-e5ad9ce784b6e7b292": [
    "孜然粒"
  ],
  "vibe-e783a7e783a4e69292e69699": [
    "烧烤撒料"
  ],
  "vibe-e78caae4ba94e88ab1e88289": [
    "猪五花肉"
  ],
  "vibe-e9b98ce9b991e89b8b2fe9b8a1e89b8b": [
    "鹌鹑蛋/鸡蛋"
  ],
  "vibe-e8b186e79aae": [
    "豆皮"
  ],
  "vibe-e4b89ce58c97e7b1b3": [
    "东北米"
  ],
  "vibe-e9b2a3e9b1bce6b5b7e88b94e7a28e": [
    "鲣鱼海苔碎"
  ],
  "vibe-e88d9ee9baa6e99da2": [
    "荞麦面"
  ],
  "vibe-e88081e5b9b2e5a688": [
    "老干妈"
  ],
  "vibe-e9b8a1": [
    "鸡"
  ],
  "vibe-e7be8ee4babae8bea3": [
    "美人辣"
  ],
  "vibe-e79b90e78497e9b8a1e7b289": [
    "盐焗鸡粉"
  ],
  "vibe-e7899be885b1e5ad90e88289": [
    "牛腱子肉"
  ],
  "vibe-e88cade799bd": [
    "茭白"
  ],
  "vibe-e88a9de9babbe7b292": [
    "芝麻粒"
  ],
  "vibe-e7bd97e6b08fe899be": [
    "罗氏虾"
  ],
  "vibe-e88aa5e69cab": [
    "芥末"
  ],
  "vibe-e69699e98592e38081e69c97e5a786e98592e68896e595a4e98592": [
    "料酒、朗姆酒或啤酒"
  ],
  "vibe-e99d92e88aa5e69cab": [
    "青芥末"
  ],
  "vibe-e696b0e9b29ce7bbbfe58fb6": [
    "新鲜绿叶"
  ],
  "vibe-e6b1a4e58a9be6b0b4e6b094e6b3a1e6b0b4": [
    "汤力水气泡水"
  ],
  "vibe-e5ae89e790aae7949ce98592e69bb2": [
    "安琪甜酒曲"
  ],
  "vibe-e6b885e6b0b4efbc88e892b8e9a5ade794a8efbc89": [
    "清水（蒸饭用）"
  ],
  "vibe-e6b885e6b0b4efbc88e58f91e985b5e794a8efbc89": [
    "清水（发酵用）"
  ],
  "vibe-e4b9b3e9b8bd": [
    "乳鸽"
  ],
  "vibe-e88f8ce88f87": [
    "菌菇"
  ],
  "vibe-e78e89e7b1b3": [
    "玉米"
  ],
  "vibe-e6a4b0e6a091e7898ce6a4b0e6b181": [
    "椰树牌椰汁"
  ],
  "vibe-657370726573736f20e6848fe5bc8fe6b593e7bca9": [
    "espresso 意式浓缩"
  ],
  "vibe-e6a4b0e5ad90e6b0b4": [
    "椰子水"
  ],
  "vibe-e59089e588a9e4b881": [
    "吉利丁"
  ],
  "vibe-e8939de88e93": [
    "蓝莓"
  ],
  "vibe-e59296e595a1e7b289": [
    "咖啡粉"
  ],
  "vibe-e89b8be68c9ee79aae": [
    "蛋挞皮"
  ],
  "vibe-e985b1e6b2b9efbc88e7949fe68abdefbc89": [
    "酱油（生抽）"
  ],
  "vibe-e5a5b6e6b2b9e5a5b6e985aa": [
    "奶油奶酪"
  ],
  "vibe-e9b8a1e89b8be9bb84": [
    "鸡蛋黄"
  ],
  "vibe-e4bd8ee7ad8be99da2e7b289": [
    "低筋面粉"
  ],
  "vibe-e5b7a7e5858be58a9b": [
    "巧克力"
  ],
  "vibe-e696b0e9b29ce9b8a1e7bf85e4b8ad": [
    "新鲜鸡翅中"
  ],
  "vibe-70617072696b61efbc88e7baa2e7949ce6a492e7b289efbc89": [
    "paprika（红甜椒粉）"
  ],
  "vibe-e6b48be891b1e7b289": [
    "洋葱粉"
  ],
  "vibe-e985b8e5a5b6e68896e7899be5a5b6": [
    "酸奶或牛奶"
  ],
  "vibe-e7bd97e58b92e7a28e": [
    "罗勒碎"
  ],
  "vibe-e4ba91e58d97e58d95e5b1b1e898b8e6b0b4": [
    "云南单山蘸水"
  ],
  "vibe-e9bb91e6a492e6b7b7e59088e7899be68e92e8b083e591b3e69699": [
    "黑椒混合牛排调味料"
  ],
  "vibe-e8929ce89389e985b1": [
    "蒜蓉酱"
  ],
  "vibe-e783a7e783a4e69699": [
    "烧烤料"
  ],
  "vibe-e9b8a1e88289": [
    "鸡肉"
  ],
  "vibe-e7b396efbc88e799bde6b299e7b396efbc89": [
    "糖（白沙糖）"
  ],
  "vibe-e4b8bde6bb8be9a5bce5b9b2285269747a20637261636b65727329": [
    "丽滋饼干(Ritz crackers)"
  ],
  "vibe-e88ab1e7949f": [
    "花生"
  ],
  "vibe-e6a984e6a684e88f9c": [
    "橄榄菜"
  ],
  "vibe-e89b8be68c9ee6b6b2": [
    "蛋挞液"
  ],
  "vibe-e7a28ee88a9de5a3ab": [
    "碎芝士"
  ],
  "vibe-e78caae5898de8b984": [
    "猪前蹄"
  ],
  "vibe-e799bde88ab8e8b186": [
    "白芸豆"
  ],
  "vibe-e5bd93e5bd92": [
    "当归"
  ],
  "vibe-e78caae9809ae8848ae88289": [
    "猪通脊肉"
  ],
  "vibe-e799bde7869fe88a9de9babb": [
    "白熟芝麻"
  ],
  "vibe-e78caae88289": [
    "猪肉"
  ],
  "vibe-e985b8e7ac8b": [
    "酸笋"
  ],
  "vibe-e58981e6a492": [
    "剁椒"
  ],
  "vibe-e587a4e6a2a8": [
    "凤梨"
  ],
  "vibe-e6b780e7b2892fe7949fe7b289": [
    "淀粉/生粉"
  ],
  "vibe-e9babbe6b2b9efbc88e88ab1e6a492e6b2b9efbc89": [
    "麻油（花椒油）"
  ],
  "vibe-e58789e799bde5bc80e6b0b4": [
    "凉白开水"
  ],
  "vibe-e5b9b2e69ca8e880b3": [
    "干木耳"
  ],
  "vibe-e6b9bfe69ca8e880b3": [
    "湿木耳"
  ],
  "vibe-e8909de58d9c": [
    "萝卜"
  ],
  "vibe-e8b18ce8b186e6b780e7b289": [
    "豌豆淀粉"
  ],
  "vibe-e88ab1e7949fe7a28e": [
    "花生碎"
  ],
  "vibe-e58da4e69699e58c85": [
    "卤料包"
  ],
  "vibe-e58d97e88590e4b9b3": [
    "南腐乳"
  ],
  "vibe-e7899be885b1e5ad90": [
    "牛腱子"
  ],
  "vibe-e7869fe89b8be9bb84": [
    "熟蛋黄"
  ],
  "vibe-e58685e88482e8b186e88590": [
    "内脂豆腐"
  ],
  "vibe-e592b8e9b8ade89b8b": [
    "咸鸭蛋"
  ],
  "vibe-e9a699e8bea3e985b1": [
    "香辣酱"
  ],
  "vibe-e6a285e88f9c": [
    "梅菜"
  ],
  "vibe-e8b5a4e89793e7b396e98687": [
    "赤藓糖醇"
  ],
  "vibe-e58fafe58fafe7b289": [
    "可可粉"
  ],
  "vibe-e9ad94e88a8be7b289": [
    "魔芋粉"
  ],
  "vibe-e5a194e5a194e7b289": [
    "塔塔粉"
  ],
  "vibe-e9809ae5bf83e7b289": [
    "通心粉"
  ],
  "vibe-e5a5b6e985aa": [
    "奶酪"
  ],
  "vibe-e59fb9e6a0b9e68896e585b6e4bb96e88289e7b1bb": [
    "培根或其他肉类"
  ],
  "vibe-e58789e6b0b4": [
    "凉水"
  ],
  "vibe-e69e9ce89c9c": [
    "果蜜"
  ],
  "vibe-e586b0": [
    "冰"
  ],
  "vibe-e7899be68e92": [
    "牛排"
  ],
  "vibe-e9a699e69699": [
    "香料"
  ],
  "vibe-e58fa3e89891": [
    "口蘑"
  ],
  "vibe-e5b08fe59c9fe8b186": [
    "小土豆"
  ],
  "vibe-e5b08fe795aae88c84": [
    "小番茄"
  ],
  "vibe-e9a284e588b6e7899be68e92e985b1e6b181": [
    "预制牛排酱汁"
  ],
  "vibe-e88ba6e7939c": [
    "苦瓜"
  ],
  "vibe-e899bee79aae": [
    "虾皮"
  ],
  "vibe-e799bde883a1e6a492": [
    "白胡椒"
  ],
  "vibe-e6b0b4efbc88e6b8a9e6b0b4efbc89": [
    "水（温水）"
  ],
  "vibe-e5ae89e790aae5b9b2e985b5e6af8de7b289": [
    "安琪干酵母粉"
  ],
  "vibe-e69fa0e6aaace6b181e68896e799bde9868b": [
    "柠檬汁或白醋"
  ],
  "vibe-e5a587e5bc82e69e9c": [
    "奇异果"
  ],
  "vibe-e88bb9e69e9c": [
    "苹果"
  ],
  "vibe-e88fa0e88f9ce58fb6": [
    "菠菜叶"
  ],
  "vibe-e5a4a7e799bde88f9ce5aba9e58fb6": [
    "大白菜嫩叶"
  ],
  "vibe-e88a9de9babbe985b1": [
    "芝麻酱"
  ],
  "vibe-e7869fe799bde88a9de9babb": [
    "熟白芝麻"
  ],
  "vibe-e9bb94e5bc8fe8858ae882a0": [
    "黔式腊肠"
  ],
  "vibe-e5b08fe9baa6e7b289": [
    "小麦粉"
  ],
  "vibe-e785aee7869fe79a84e8858ae88289": [
    "煮熟的腊肉"
  ],
  "vibe-e997bde6989fe88cb6e6a091e88f87": [
    "闽星茶树菇"
  ],
  "vibe-e591b3e69e81e9b29c": [
    "味极鲜"
  ],
  "vibe-e78caae88289efbc88e4ba94e88ab1e88289efbc89": [
    "猪肉（五花肉）"
  ],
  "vibe-e9b39ce9b1bc": [
    "鳜鱼"
  ],
  "vibe-e7baa2e8bea3e6a492": [
    "红辣椒"
  ],
  "vibe-e882a5e7899b": [
    "肥牛"
  ],
  "vibe-e591b3e6b78b": [
    "味淋"
  ],
  "vibe-e6b8a9e6b389e89b8b": [
    "温泉蛋"
  ],
  "vibe-e587bae6b181": [
    "出汁"
  ],
  "vibe-e6b885e98592": [
    "清酒"
  ],
  "vibe-e88289efbc88e78caa2fe9b8a12fe7899be88289efbc89": [
    "肉（猪/鸡/牛肉）"
  ],
  "vibe-e88ab1e6a4b0e88f9c": [
    "花椰菜"
  ],
  "vibe-e793b6e8a385e6a4b0e5ad90e6b181": [
    "瓶装椰子汁"
  ],
  "vibe-e59296e595a1e8b083e7b396": [
    "咖啡调糖"
  ],
  "vibe-e59d9ae69e9ce7a28e": [
    "坚果碎"
  ],
  "vibe-e79aaee89b8b": [
    "皮蛋"
  ],
  "vibe-e58d88e9a490e88289": [
    "午餐肉"
  ],
  "vibe-e799bde9b194": [
    "白鱔"
  ],
  "vibe-e7baafe798a6e88289": [
    "纯瘦肉"
  ],
  "vibe-e5b9b2e8bea3e6a492e7b289": [
    "干辣椒粉"
  ],
  "vibe-e9809fe586bbe6b1a4e59c86": [
    "速冻汤圆"
  ],
  "vibe-e6898be68a93e9a5bc": [
    "手抓饼"
  ],
  "vibe-e59fb9e6a0b9e78987": [
    "培根片"
  ],
  "vibe-e4b98ce69ea3": [
    "乌枣"
  ],
  "vibe-e4b98ce6a285": [
    "乌梅"
  ],
  "vibe-e5b1b1e6a582e78987efbc88e7949fefbc89": [
    "山楂片（生）"
  ],
  "vibe-e9bb84e586b0e7b396": [
    "黄冰糖"
  ],
  "vibe-e79498e88d89": [
    "甘草"
  ],
  "vibe-e7baa2e8b186e894bb": [
    "红豆蔻"
  ],
  "vibe-e5b9b2e6a182e88ab1": [
    "干桂花"
  ],
  "vibe-e59089e588a9e4b881e78987": [
    "吉利丁片"
  ],
  "vibe-e7a9bae5bf83e88f9c": [
    "空心菜"
  ],
  "vibe-e6b5b7e899be": [
    "海虾"
  ],
  "vibe-e5a4a7e899be": [
    "大虾"
  ],
  "vibe-e697a0e79b90e9bb84e6b2b9": [
    "无盐黄油"
  ],
  "vibe-e88cb6e7b289": [
    "茶粉"
  ],
  "vibe-e782bce4b9b3": [
    "炼乳"
  ],
  "vibe-e7baa2e891b1e5a4b4": [
    "红葱头"
  ],
  "vibe-e9a9ace696afe58da1e5bdade88a9de5a3ab": [
    "马斯卡彭芝士"
  ],
  "vibe-e6898be68c87e9a5bce5b9b2": [
    "手指饼干"
  ],
  "vibe-e694bee58789e6b593e7bca9e59296e595a1": [
    "放凉浓缩咖啡"
  ],
  "vibe-e697a0e88f8ce9b8a1e89b8b": [
    "无菌鸡蛋"
  ],
  "vibe-e5a4a7e794b0e89eba": [
    "大田螺"
  ],
  "vibe-e696b0e9b29ce89684e88db7e58fb6": [
    "新鲜薄荷叶"
  ],
  "vibe-e7b4abe88b8fe58fb6": [
    "紫苏叶"
  ],
  "vibe-e6a182e69e97e4b889e88ab1e98592": [
    "桂林三花酒"
  ],
  "vibe-e88a9de9babbe6b2b9efbc88e9a699e6b2b9efbc89": [
    "芝麻油（香油）"
  ],
  "vibe-e69886e5b883e985b1e6b2b9": [
    "昆布酱油"
  ],
  "vibe-e88eb4e7ac8be58fb6": [
    "莴笋叶"
  ],
  "vibe-e9ab98e7ad8be99da2e7b289": [
    "高筋面粉"
  ],
  "vibe-e985b5e6af8d": [
    "酵母"
  ],
  "vibe-e89b8be6b6b2": [
    "蛋液"
  ],
  "vibe-e9b8a1e788aa": [
    "鸡爪"
  ],
  "vibe-e9bb91e9868befbc88e99988e9868befbc89": [
    "黑醋（陈醋）"
  ],
  "vibe-e696992fe9bb84e98592": [
    "料/黄酒"
  ],
  "vibe-e799bde7b3962fe586b0e7b396": [
    "白糖/冰糖"
  ],
  "vibe-e9bb91e883a1e6a492e7b2892fe799bde883a1e6a492e7b289": [
    "黑胡椒粉/白胡椒粉"
  ],
  "vibe-e795aae88c84e8868f2fe795aae88c84e985b1": [
    "番茄膏/番茄酱"
  ],
  "vibe-e9a699e88ab9": [
    "香芹"
  ],
  "vibe-e5a4a7e9b8a1e885bf": [
    "大鸡腿"
  ],
  "vibe-e5b9b2e9a699e88f87": [
    "干香菇"
  ],
  "vibe-e6b8a9e6b0b42833302d343020e2848329": [
    "温水(30-40 ℃)"
  ],
  "vibe-e7bf98e598b4e9b1bc": [
    "翘嘴鱼"
  ],
  "vibe-e4ba94e88ab1e88289e69da1": [
    "五花肉条"
  ],
  "vibe-e8bea3e6a492e99da2": [
    "辣椒面"
  ],
  "vibe-e9b8ade5ad90": [
    "鸭子"
  ],
  "vibe-e7b3afe7b1b3e7b289": [
    "糯米粉"
  ],
  "vibe-e7b298e7b1b3e7b289": [
    "粘米粉"
  ],
  "vibe-e892b8e88289e7b289": [
    "蒸肉粉"
  ],
  "vibe-e7bb86e8bea3e6a492e7b289": [
    "细辣椒粉"
  ],
  "vibe-e7899be9878ce8848a": [
    "牛里脊"
  ],
  "vibe-e7949fe9b8a1e8829d": [
    "生鸡肝"
  ],
  "vibe-e783a7e783a4e69699e68896e5ad9ce784b6e7b289": [
    "烧烤料或孜然粉"
  ],
  "vibe-e5b08fe9be99e899be": [
    "小龙虾"
  ],
  "vibe-e5ad90e5bcb9e5a4b4e8bea3e6a492": [
    "子弹头辣椒"
  ],
  "vibe-e983abe58ebfe8b186e793a3": [
    "郫县豆瓣"
  ],
  "vibe-e5b9b2e7babfe6a492": [
    "干线椒"
  ],
  "vibe-e9a699e69e9c": [
    "香果"
  ],
  "vibe-e6a389e88ab1e7b396": [
    "棉花糖"
  ],
  "vibe-e585a8e88482e5a5b6e7b289": [
    "全脂奶粉"
  ],
  "vibe-e6b7b7e59088e59d9ae69e9c": [
    "混合坚果"
  ],
  "vibe-e9a5bce5b9b2": [
    "饼干"
  ],
  "vibe-e9b29ce4bb94e9b8ade88289": [
    "鲜仔鸭肉"
  ],
  "vibe-e9b29ce9b8ade8a180": [
    "鲜鸭血"
  ],
  "vibe-e8929ce4bb94": [
    "蒜仔"
  ],
  "vibe-e98592": [
    "酒"
  ],
  "vibe-e5b1b1e883a1e6a492e6b2b9": [
    "山胡椒油"
  ],
  "vibe-e5b8a6e79aaee7be8ae68e92": [
    "带皮羊排"
  ],
  "vibe-e7be8ae88289e68896e7be8ae69d82": [
    "羊肉或羊杂"
  ],
  "vibe-e58991e9aaa8e9b1bce68896e9b2a4e9b1bc": [
    "剑骨鱼或鲤鱼"
  ],
  "vibe-e6bc93e6b389e595a4e98592": [
    "漓泉啤酒"
  ],
  "vibe-e6a182e69e97e8bea3e6a492e985b1": [
    "桂林辣椒酱"
  ],
  "vibe-e586b7e586bbe58ebbe5a4b4e58ebbe79aaee59fbae59bb4e899be": [
    "冷冻去头去皮基围虾"
  ],
  "vibe-e58d88e9a490e88289e7bd90e5a4b4": [
    "午餐肉罐头"
  ],
  "vibe-e88289e6b2ab": [
    "肉沫"
  ],
  "vibe-e799bde6b48be891b1": [
    "白洋葱"
  ],
  "vibe-e6848fe5a4a7e588a9e99da2e985b1": [
    "意大利面酱"
  ],
  "vibe-e993b6e880b3": [
    "银耳"
  ],
  "vibe-e58ebbe5bf83e88eb2e5ad90": [
    "去心莲子"
  ],
  "vibe-e69eb8e69d9e": [
    "枸杞"
  ],
  "vibe-e9bb91e8998ee899be2fe6988ee899be": [
    "黑虎虾/明虾"
  ],
  "vibe-e88d89e5af87": [
    "草寇"
  ],
  "vibe-e7b4abe896afe7b289": [
    "紫薯粉"
  ],
  "vibe-e7b3afe7b1b3e7b28920612028e6898be7b289e794a829": [
    "糯米粉 a (手粉用)"
  ],
  "vibe-e7b3afe7b1b3e7b28920622028e99da2e79aaee794a829": [
    "糯米粉 b (面皮用)"
  ],
  "vibe-e88289e69cab": [
    "肉末"
  ],
  "vibe-e58d8ae68890e59381e896afe69da1": [
    "半成品薯条"
  ],
  "vibe-e99da2e58c85e7b3a0": [
    "面包糠"
  ],
  "vibe-3630e5baa6e7baafe58780e6b0b4": [
    "60度纯净水"
  ],
  "vibe-e985b5e6af8de7b289": [
    "酵母粉"
  ],
  "vibe-e7be8ae885a9": [
    "羊腩"
  ],
  "vibe-e782b8e88590e7abb9": [
    "炸腐竹"
  ],
  "vibe-e88590e4b9b3": [
    "腐乳"
  ],
  "vibe-e6b48be891b12fe7baa2e891b1e5a4b4": [
    "洋葱/红葱头"
  ],
  "vibe-e9a9ace8b9842fe59c9fe8b1862fe8909de58d9c": [
    "马蹄/土豆/萝卜"
  ],
  "vibe-e9a38ee591b3e8b083e69699": [
    "风味调料"
  ],
  "vibe-e58c97e696b9e5a4a7e7b1b3": [
    "北方大米"
  ],
  "vibe-e69fb1e58099e985b1": [
    "柱候酱"
  ],
  "vibe-e58f89e783a7e985b1": [
    "叉烧酱"
  ],
  "vibe-e88ab1e99b95e98592": [
    "花雕酒"
  ],
  "vibe-e799bde98592": [
    "白酒"
  ],
  "vibe-e78caae79aae": [
    "猪皮"
  ],
  "vibe-e799bde88ab7e38081e6a182e79aaee38081e4b881e9a699e38081e9a699e58fb6e38081e5b08fe88cb4e9a699": [
    "白芷、桂皮、丁香、香叶、小茴香"
  ],
  "vibe-e9a699e6b2b9efbc88e88a9de9babbe6b2b9efbc89": [
    "香油（芝麻油）"
  ],
  "vibe-e5b08fe89684e9a5bc": [
    "小薄饼"
  ],
  "vibe-e88a9de9babbe79b90": [
    "芝麻盐"
  ],
  "vibe-e9b1bce99cb2": [
    "鱼露"
  ],
  "vibe-e59cb0e7939ce7b289": [
    "地瓜粉"
  ],
  "vibe-e58d8ae68890e59381e6848fe5a4a7e588a9e99da2": [
    "半成品意大利面"
  ],
  "vibe-e9858de5a597e985b1e69699": [
    "配套酱料"
  ],
  "vibe-e58789e79aae": [
    "凉皮"
  ],
  "vibe-e99da2e7ad8b": [
    "面筋"
  ],
  "vibe-e7899be6b2b9": [
    "牛油"
  ],
  "vibe-e889b2e68b89e6b2b9e68896e88f9ce7b1bde6b2b9": [
    "色拉油或菜籽油"
  ],
  "vibe-e7baafe78caae6b2b9": [
    "纯猪油"
  ],
  "vibe-e6b0b8e5b79de8b186e8b189": [
    "永川豆豉"
  ],
  "vibe-e8b186e6af8de5ad90": [
    "豆母子"
  ],
  "vibe-e7baa2e88ab1e6a492": [
    "红花椒"
  ],
  "vibe-e9baa6e88abde7b289": [
    "麦芽粉"
  ],
  "vibe-3532e5baa6e799bde98592": [
    "52度白酒"
  ],
  "vibe-e9a297e7b292e9a699e69699": [
    "颗粒香料"
  ],
  "vibe-e695b4e5bda2e9a699e69699": [
    "整形香料"
  ],
  "vibe-e88289e6a182": [
    "肉桂"
  ],
  "vibe-e88d9ce68ba8": [
    "荜拨"
  ],
  "vibe-e9a699e88d89": [
    "香草"
  ],
  "vibe-e5b1b1e6a582": [
    "山楂"
  ],
  "vibe-e9a699e88c85": [
    "香茅"
  ],
  "vibe-e7a082e4bb81": [
    "砂仁"
  ],
  "vibe-e9809fe586bbe9a684e9a5a8": [
    "速冻馄饨"
  ],
  "vibe-e9809fe586bbe6b0b4e9a5ba": [
    "速冻水饺"
  ],
  "vibe-e9bb91e9868b": [
    "黑醋"
  ],
  "vibe-e9a39fe794a8e6b2b9efbc88e68ea8e88d90e78caae6b2b9efbc89": [
    "食用油（推荐猪油）"
  ],
  "vibe-e9a699e6b2b92fe9babbe6b2b9": [
    "香油/麻油"
  ],
  "vibe-e5a4a7e7b1b3": [
    "大米"
  ],
  "vibe-e7baa2e8b186": [
    "红豆"
  ],
  "vibe-e8968fe7b1b3": [
    "薏米"
  ],
  "vibe-e9bb91e7b1b3": [
    "黑米"
  ],
  "vibe-e5b08fe7b1b3": [
    "小米"
  ],
  "vibe-e88eb2e5ad90": [
    "莲子"
  ],
  "vibe-e7bbbfe8b186": [
    "绿豆"
  ],
  "vibe-e9bb84e8b186": [
    "黄豆"
  ],
  "vibe-e7baa2e885b0e8b186": [
    "红腰豆"
  ],
  "vibe-e6a097e5ad90": [
    "栗子"
  ],
  "vibe-e58ebbe5a3b3e6a0b8e6a183": [
    "去壳核桃"
  ],
  "vibe-e7899be88289e9ab98e6b1a4": [
    "牛肉高汤"
  ],
  "vibe-e795aae88c84e7bd90e5a4b4": [
    "番茄罐头"
  ],
  "vibe-e795aae88c84e8868f": [
    "番茄膏"
  ],
  "vibe-e7baa2e882a0": [
    "红肠"
  ],
  "vibe-e799bde89891e88f87": [
    "白蘑菇"
  ],
  "vibe-e9bb91e883a1e6a492e7a28e": [
    "黑胡椒碎"
  ],
  "vibe-e79aaee89b8befbc88e69dbee88ab1e89b8befbc89": [
    "皮蛋（松花蛋）"
  ],
  "vibe-e78caae5898de885bfe88289": [
    "猪前腿肉"
  ],
  "vibe-e891b1e5a79ce88ab1e6a492e6b0b4": [
    "葱姜花椒水"
  ],
  "vibe-e7869fe8b186e6b2b9": [
    "熟豆油"
  ],
  "vibe-e9bb84e88ab1": [
    "黄花"
  ],
  "vibe-e5b08fe9a699e891b1": [
    "小香葱"
  ],
  "vibe-e9b8a1e7b289": [
    "鸡粉"
  ],
  "vibe-e591b3e7b4a0": [
    "味素"
  ],
  "vibe-e891b1e38081e5a79ce38081e8929c": [
    "葱、姜、蒜"
  ],
  "vibe-e899bee4bb812fe899bee79aae": [
    "虾仁/虾皮"
  ],
  "vibe-e6b2b3e7b289": [
    "河粉"
  ],
  "vibe-e78caae882892fe7899be88289": [
    "猪肉/牛肉"
  ],
  "vibe-e99da2e7ad8be59d97": [
    "面筋块"
  ],
  "vibe-e6b2b3e7b289e78292e69699": [
    "河粉炒料"
  ],
  "vibe-e5b9b4e7b3952fe799bde7b2bf": [
    "年糕/白粿"
  ],
  "vibe-e781abe885bfe882a0e68896e9b8a1e883b8e88289": [
    "火腿肠或鸡胸肉"
  ],
  "vibe-e7869fe88289efbc88e5a682e781afe5bdb1e7899be88289e4b89d2fe58d88e9a490e882892fe8858ae882a02fe58da4e88289efbc89": [
    "熟肉（如灯影牛肉丝/午餐肉/腊肠/卤肉）"
  ],
  "vibe-e5b9b2e7baa2e88ab8e8b186": [
    "干红芸豆"
  ],
  "vibe-e99d92e8bea3e6a492": [
    "青辣椒"
  ],
  "vibe-e9a39fe794a8e6b2b9e68896e985a5e6b2b9": [
    "食用油或酥油"
  ],
  "vibe-e69c88e6a182e58fb6": [
    "月桂叶"
  ],
  "vibe-e5a79ce9bb84e7b289": [
    "姜黄粉"
  ],
  "vibe-e9a699e88f9ce7b289": [
    "香菜粉"
  ],
  "vibe-e9a699e88f9ce58fb6": [
    "香菜叶"
  ],
  "vibe-e5b7b4e696afe9a9ace89282e9a699e7b1b3e68896e699aee9809ae5a4a7e7b1b3": [
    "巴斯马蒂香米或普通大米"
  ],
  "vibe-e99fade88f9c": [
    "韭菜"
  ],
  "vibe-e99da2": [
    "面"
  ],
  "vibe-e5b08fe6b1a4e59c86": [
    "小汤圆"
  ],
  "vibe-e986aae7b39f": [
    "醪糟"
  ],
  "vibe-e585a8e9baa6e99da2e7b289284174746129": [
    "全麦面粉(Atta)"
  ],
  "vibe-e783a4e9b9b0e598b4e8b186e7b28928536174747529": [
    "烤鹰嘴豆粉(Sattu)"
  ],
  "vibe-e88aa5e69cabe6b2b9284d757374617264204f696c29": [
    "芥末油(Mustard Oil)"
  ],
  "vibe-e5ad9ce784b6e7b1bd": [
    "孜然籽"
  ],
  "vibe-e58db0e5baa6e9bb91e79b90284b616c61204e616d616b29": [
    "印度黑盐(Kala Namak)"
  ],
  "vibe-e8a28be8a385e89ebae89bb3e7b289": [
    "袋装螺蛳粉"
  ],
  "vibe-e58d8ae5b9b2e88d9ee9baa6e99da2": [
    "半干荞麦面"
  ],
  "vibe-e88ab1e7949fe985b1": [
    "花生酱"
  ],
  "vibe-e9a38ee5b9b2e5bfabe7869fe99da2": [
    "风干快熟面"
  ],
  "vibe-e7a2b1e6b0b4e99da2": [
    "碱水面"
  ],
  "vibe-e985b8e8b186e8a792": [
    "酸豆角"
  ],
  "vibe-e8929ce6b0b4": [
    "蒜水"
  ],
  "vibe-e88289e6b1a4e6b181": [
    "肉汤汁"
  ],
  "vibe-e8909de58d9ce5b9b2": [
    "萝卜干"
  ],
  "vibe-e88289e9a685": [
    "肉馅"
  ],
  "vibe-e7baa2e891b1e6b2b9": [
    "红葱油"
  ],
  "vibe-e798a6e88289e69cab": [
    "瘦肉末"
  ],
  "vibe-e882a5e88289e69cab": [
    "肥肉末"
  ],
  "vibe-e895a8e6a0b9e7b289": [
    "蕨根粉"
  ],
  "vibe-e99da2e9a39fe69d90e69699": [
    "面食材料"
  ],
  "vibe-e88289e7b1bb2fe89b8be7b1bb2fe8b186e588b6e59381": [
    "肉类/蛋类/豆制品"
  ],
  "vibe-e894ace88f9ce7b1bb": [
    "蔬菜类"
  ],
  "vibe-e592b8e88289": [
    "咸肉"
  ],
  "vibe-e586ace7ac8b": [
    "冬笋"
  ],
  "vibe-e783a7e58d96e79aae": [
    "烧卖皮"
  ],
  "vibe-e7949fe5a79ce69cab": [
    "生姜末"
  ],
  "vibe-e891b1e69cab": [
    "葱末"
  ],
  "vibe-e9ab98e6b1a4": [
    "高汤"
  ],
  "vibe-e6b593e6b1a4e5ae9d": [
    "浓汤宝"
  ],
  "vibe-e79aaee586bb": [
    "皮冻"
  ],
  "vibe-e5a48de9858de9a39fe59381e5a29ee7a8a0e58982": [
    "复配食品增稠剂"
  ],
  "vibe-e985a5e6b2b9284768656529e68896e9bb84e6b2b9": [
    "酥油(Ghee)或黄油"
  ],
  "vibe-e5b7b4e696afe9a9ace89282e995bfe7b292e9a699e7b1b3284261736d617469205269636529": [
    "巴斯马蒂长粒香米(Basmati Rice)"
  ],
  "vibe-e8978fe7baa2e88ab12853616666726f6e29": [
    "藏红花(Saffron)"
  ],
  "vibe-e6b8a9e7899be5a5b6": [
    "温牛奶"
  ],
  "vibe-e585a8e9a699e69699": [
    "全香料"
  ],
  "vibe-e99da2e59ba2": [
    "面团"
  ],
  "vibe-e5b9b2e9b9b0e598b4e8b186": [
    "干鹰嘴豆"
  ],
  "vibe-e7baa2e88cb6e58c85": [
    "红茶包"
  ],
  "vibe-e79fb3e6a6b4e7b28928416d6368757229": [
    "石榴粉(Amchur)"
  ],
  "vibe-e5a48de59088e9a699e6969928e5a79ce9bb842fe7baa2e8bea3e6a4922fe9a699e88f9c2fe5ad9ce784b6e7b28929": [
    "复合香料(姜黄/红辣椒/香菜/孜然粉)"
  ],
  "vibe-e88289e4b8812fe88289e69cab": [
    "肉丁/肉末"
  ],
  "vibe-e699aee9809ae99da2e69da1": [
    "普通面条"
  ],
  "vibe-e88f9ce7a081": [
    "菜码"
  ],
  "vibe-e9bb91e6a492e7a28e": [
    "黑椒碎"
  ],
  "vibe-e9bb91e6a492e7b289": [
    "黑椒粉"
  ],
  "vibe-e5b9b2e7baa2e6a492": [
    "干红椒"
  ],
  "vibe-e6b3a1e99da2": [
    "泡面"
  ],
  "vibe-e78caae6b2b9e6b8a3": [
    "猪油渣"
  ],
  "vibe-e88f9ce7b1bde6b2b9e68896e88ab1e7949fe6b2b9": [
    "菜籽油或花生油"
  ],
  "vibe-e799bde8b186e88590": [
    "白豆腐"
  ],
  "vibe-e99d92e88c84e5ad90": [
    "青茄子"
  ],
  "vibe-e7baa2e5b096e6a492": [
    "红尖椒"
  ],
  "vibe-e697a5e69cace8b186e88590": [
    "日本豆腐"
  ],
  "vibe-e9bb91e69ca8e880b3": [
    "黑木耳"
  ],
  "vibe-e7babfe6a492": [
    "线椒"
  ],
  "vibe-e995bfe69da1e99d92e6a492": [
    "长条青椒"
  ],
  "vibe-e58685e985afe8b186e88590": [
    "内酯豆腐"
  ],
  "vibe-e88289": [
    "肉"
  ],
  "vibe-e9a699e88f9ce7a28e": [
    "香菜碎"
  ],
  "vibe-e58fb6e88f9ce7b1bbe894ace88f9c": [
    "叶菜类蔬菜"
  ],
  "vibe-e7869fe69dbee5ad90e4bb81": [
    "熟松子仁"
  ],
  "vibe-e793a0e7939cefbc88e891abe88aa6efbc89": [
    "瓠瓜（葫芦）"
  ],
  "vibe-e9b9b0e598b4e8b186e7b28928426573616e29": [
    "鹰嘴豆粉(Besan)"
  ],
  "vibe-e58db0e5baa6e7bbbce59088e9a699e69699e7b289": [
    "印度综合香料粉"
  ]
}

const recipes = [
  {"id":"aquatic_ga-li-chao-xie","name":"咖喱炒蟹","category":"水产","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/aquatic_ga-li-chao-xie.jpg","sourcePath":"dishes/aquatic/咖喱炒蟹.md","calories":815,"tips":["做法参考澳门厨房佬教学，核心在于挂汁的技巧","封煎蟹黄是防止营养和鲜味流失的关键步骤","最后一步关火翻炒可以利用余温让蛋清和椰浆完美融合，形成顺滑的酱汁"],"required":[["vibe-e99d92e89fb9","1只(约300g)","青蟹"],["vibe-e59296e596b1e59d97","15g","咖喱块"],["vibe-e6a4b0e6b586","100ml","椰浆"],["egg","1个","鸡蛋"],["onion","200g","洋葱"],["garlic","5瓣","大蒜"]],"optional":[],"pantry":[["starch","约10g","生粉"],["oil","30ml","食用油"]],"steps":[["处理螃蟹","肉蟹掀盖后对半砍开，蟹钳用刀背轻轻拍裂，切口和蟹钳蘸一下生粉，不要太多。撒 5g 生粉到蟹盖中，盖住蟹黄，备用"],["切配辅料","洋葱和大蒜分别切成碎末备用"],["准备开水","烧一壶开水备用"],["热油","起锅烧油，倒入约 20ml 食用油，等待 10 秒让油温升高"],["封煎蟹肉","将螃蟹切口朝下，轻轻放入锅中，煎 20 秒，封住蟹黄蟹肉。然后翻面，每面煎 10 秒。煎完将螃蟹取出备用"],["封煎蟹盖","将螃蟹盖放入锅中，使用勺子舀起锅中热油泼到蟹盖中，煎封住蟹盖中的蟹黄，煎 20 秒后取出备用"],["爆香底料","不用刷锅，再倒入 10ml 食用油，大火让油温升高至轻微冒烟，将大蒜末，洋葱碎倒入，炒 10 秒钟"],["炒制咖喱","将咖喱块放入锅中炒化（10 秒），放入煎好的螃蟹，翻炒均匀"],["焖煮","倒入开水 300ml，焖煮 3 分钟"],["关火挂汁","焖煮完后，倒入椰浆和蛋清，关火，关火后不断翻炒，一直到酱汁变浓稠"],["出锅","将螃蟹整齐摆盘，淋上剩余酱汁即可"]]},
  {"id":"aquatic_hong-shao-li-yu","name":"红烧鲤鱼","category":"水产","servings":2,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/aquatic_hong-shao-li-yu.jpg","sourcePath":"dishes/aquatic/红烧鲤鱼.md","calories":1051,"tips":["五花肉煸炒出的猪油能显著提升鱼汤的香味和醇厚度","鱼类脂肪少，加入动物油脂（猪油）是汤汁奶白香醇的关键","煸炒至金黄的五花肉在炖煮后可作为美味的配菜食用"],"required":[["vibe-e9b2a4e9b1bc","1条(约1000g)","鲤鱼"],["porkBelly","100g","五花肉"],["vibe-e5a4a7e891b1","200g","大葱"],["ginger","80g","姜"],["garlic","4-5个","蒜瓣"],["chili","2个","干辣椒"],["vibe-e591b3e69e81e9b29c28e7949fe68abd29","50ml","味极鲜(生抽)"]],"optional":[],"pantry":[["sugar","50g","白糖"],["wine","50ml","料酒"],["vibe-e99988e9868b","50ml","陈醋"],["darkSoy","20ml","老抽"],["oysterSauce","5ml","蚝油"],["salt","5g","盐"],["oil","适量","食用油"]],"steps":[["食材预处理","将大葱、姜、大蒜、干辣椒分别清洗干净。"],["葱姜处理","葱白切成4cm段并劈为四瓣；姜切成3mm厚片。"],["蒜椒处理","一个大蒜拍碎切末，其余蒜切二瓣；干辣椒切四段。"],["肉鱼处理","五花肉切成4cm*4cm片；清洗鱼并在背部肉厚处拉几道斜口。"],["高温炸鱼","锅中油烧至7成热（冒烟），下鱼炸1分钟至皮硬捞出。倒出多余油，留底油。"],["煸炒配料","底油烧热，下五花肉煸出香味，放入干辣椒、葱、姜、蒜瓣翻炒1分钟。"],["调味炖煮","放入鱼，沿锅边倒入料酒、陈醋、味极鲜、老抽、蚝油、盐、白糖，加清水没过鱼面。"],["小火慢焖","中火烧开后调至小火，盖盖慢焖15分钟。"],["大火收汁","打开锅盖挑出葱姜蒜干辣椒，调大火收汁至剩余1/4，撒蒜末关火。"]]},
  {"id":"aquatic_hong-shao-yu","name":"红烧鱼","category":"水产","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/aquatic_hong-shao-yu.jpg","sourcePath":"dishes/aquatic/红烧鱼.md","calories":570,"tips":["鱼背上划花刀是为了防止鱼背肉厚处夹生，同时也更入味。","小米椒辣度极高，建议最多放2个，否则辣度可能过高。"],"required":[["vibe-e9b1bc","1条(中等大小)","鱼"],["ginger","2-3片","姜"],["garlic","3-4个","蒜瓣"],["chili","2-3个","干辣椒"]],"optional":[["oysterSauce","5g","蚝油"],["scallion","1-2根","葱"],["cilantro","适量","香菜"],["vibe-e5b08fe7b1b3e6a492","1-2个","小米椒"],["vibe-e591b3e7b2be2fe9b8a1e7b2be","5g","味精/鸡精"]],"pantry":[["oil","30-50ml","油"],["salt","10g","盐"],["wine","适量","料酒"],["vinegar","5ml","醋"],["vibe-e985b1e6b2b9","5ml","酱油"],["sugar","10g","白砂糖"]],"steps":[["准备姜蒜","将姜和蒜瓣准备好，切碎备用。"],["准备辣椒","将干辣椒切碎，与姜蒜放在一起。"],["热油煎鱼","锅中加入30-50ml油，待锅热后放入擦干水分的鱼，晃动锅子，小火慢煎。"],["翻面煎鱼","将鱼翻面，重复上述油煎过程，直到两面金黄。"],["炒香辅料","放入准备好的姜、蒜、干辣椒，翻炒出香味。"],["加入调料","依次倒入料酒、醋、白砂糖和酱油（老抽）。"],["加水焖煮","加入冷水，水量以刚好淹没鱼身为宜。调成中火，盖上锅盖。约1分钟后将鱼翻身，继续盖盖。"],["二次调味","3-4分钟后，加入盐、小米椒、蚝油（或味精、鸡精），继续盖上锅盖焖煮，期间需再次翻身。"],["收汁增香","当汤汁收至鱼脊背线鱼鳍下方时，转小火，撒入香菜和葱花，盖盖焖20秒。"],["起锅","关火起锅装盘。"]]},
  {"id":"aquatic_hong-shao-yu-tou","name":"红烧鱼头","category":"水产","servings":2,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/aquatic_hong-shao-yu-tou.jpg","sourcePath":"dishes/aquatic/红烧鱼头.md","calories":333,"tips":["由于处理生鱼和剁骨难度较高，不建议零基础新手独自操作","建议另备一把厚度在 5-7mm 的菜刀专门处理鱼骨","鱼的处理细节如不清楚，建议搜索相关视频参考学习","盛盘时将煮过的香菜垫底能增加风味和美感"],"required":[["vibe-e9b1bce5a4b4","1个","鱼头"],["vibe-e5a4a7e891b1","200g","大葱"],["ginger","80g","姜"],["garlic","3-4个","蒜瓣"],["vibe-e7be8ee4babae6a492","1/4个","美人椒"],["cilantro","4棵","香菜"],["chili","5个","干辣椒"],["vibe-e9bb91e883a1e6a492e7b289","2g","黑胡椒粉"]],"optional":[],"pantry":[["starAnise","2个","八角"],["salt","7g","盐"],["soy","15g","生抽"],["wine","15g","料酒"],["darkSoy","3g","老抽"],["vibe-e9b8a1e7b2be","3g","鸡精"],["vibe-e99988e9868b","3g","陈醋"],["oil","30ml","食用油"]],"steps":[["原材料预处理","清洗所有蔬菜；干辣椒和八角冲洗；大葱葱白切4cm段，葱叶切段后劈四瓣；姜切3mm厚片；大蒜拍碎；2棵香菜切碎，2棵留整；美人椒切圈；干辣椒切段。"],["鱼头处理与清洗","鱼头去鳞、去鳃、清理内脏，剁去鱼鳍。将下巴处与鱼身剁开，鱼身切块，鱼头剁成四到六瓣，最后洗净血水。"],["腌制鱼头","鱼块入盆，加5g盐、10g生抽、10g料酒、碎葱叶和1/3姜片，拌匀静置。"],["炒制辅料","锅入30ml油热后转小火，先炒姜片至金黄，再入葱段炒至微白，最后入蒜碎、八角、干辣椒炒5秒。"],["翻炒鱼头并加调味","倒入腌好的鱼头翻炒2-3分钟。加入500ml清水及剩余盐、鸡精、生抽、老抽、料酒、黑胡椒粉、陈醋，放入2棵整香菜。"],["焖煮与收汁","大火烧开转中火焖至汤汁减半。开盖大火收汁至剩余1/3汤汁，关火。"],["盛盘点缀","将锅底香菜垫入盆底，盛入鱼头并淋上汤汁，撒上香菜碎和美人椒圈。"]]},
  {"id":"aquatic_jiang-dun-xie","name":"酱炖蟹","category":"水产","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/aquatic_jiang-dun-xie.jpg","sourcePath":"dishes/aquatic/酱炖蟹.md","calories":468,"tips":["咸口放 50 g 豆瓣酱，甜口减少豆瓣酱的用量并加入冰糖和番茄酱","出锅后再撒上一点葱花会更香也更好看","参考资料源自平湖地方特色美味"],"required":[["vibe-e89e83e89fb9","500g(约3-4只中等河蟹)","螃蟹"],["vibe-e8b186e793a3e985b1","30-50g","豆瓣酱"],["vibe-e88f9ce6b2b9","20ml","菜油"],["vibe-e795aae88c84e985b1","15ml","番茄酱"],["vibe-e88081e5a79c","10g","老姜"],["scallion","10g","葱"]],"optional":[["rockSugar","0-15g","冰糖"],["egg","1个(约50g)","鸡蛋"],["mince","50g","猪肉末"]],"pantry":[["darkSoy","15ml","老抽"],["wine","5ml","料酒"],["water","500ml","水"]],"steps":[["处理螃蟹","把螃蟹刷洗干净，然后在砧板上对半劈开"],["炒制酱汁","锅里下菜油，放入姜末和豆瓣酱爆香，加入冰糖炒化，直到冒小气泡就盛出"],["摆盘准备","在盘子里铺上一层酱，然后把切好的螃蟹切开面朝下，整齐排放在酱上"],["添加辅料","放点葱段和姜片，建议敲个鸡蛋或在盘底铺肉末"],["上锅蒸制","上锅蒸 10-12 分钟"]]},
  {"id":"aquatic_qing-zheng-sheng-hao","name":"清蒸生蚝","category":"水产","servings":1,"minutes":20,"difficulty":"中等","coverPath":"ai-generated/aquatic_qing-zheng-sheng-hao.jpg","sourcePath":"dishes/aquatic/清蒸生蚝.md","calories":184,"tips":["掀开滚烫锅盖和处理蚝壳需要稍加小心，谨防烫伤"],"required":[["vibe-e7949fe89a9d","6个","生蚝"],["scallion","3颗","葱"],["garlic","6瓣","蒜"],["ginger","1小块","姜"]],"optional":[],"pantry":[["vibe-e985b1e6b2b9","6ml","酱油"],["water","1升","饮用水"]],"steps":[["刷洗生蚝","将生蚝用刷子刷干净（没有刷子用牙刷）。"],["初次蒸制","蒸锅中放水，将蒸屉放上之后，将 6 个生蚝平铺在蒸屉,使用 50%功率，蒸 3 分钟。"],["去壳及摆盘","用右手拿着湿抹布掀开烫锅盖，将每个生蚝的外壳掀开一半去掉，生蚝的凸面向下，平面向上，每个放 1 根姜丝,10g 蒜末放到生蚝上。"],["二次蒸制","关上烫锅盖，100%功率蒸 3.5 分钟。"],["调味","停火，用右手拿着抹布掀开烫锅盖，每个放 5ml 酱油。"],["盛盘","盛盘。"]]},
  {"id":"aquatic_rou-xie-bao","name":"肉蟹煲","category":"水产","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/aquatic_rou-xie-bao.jpg","sourcePath":"dishes/aquatic/肉蟹煲.md","calories":2111,"tips":["建议冷冻 20 分钟让螃蟹昏迷或破坏神经后再处理","死蟹绝对不能用（除非是正规品牌的冷冻蟹）","油炸时如果灶具功率小，建议预热到 200 °C 并分批炸","不与柿子、浓茶同食，痛风患者慎食","如被螃蟹夹伤或烫伤，先冷水冲 15 分钟，严重请就医"],"required":[["vibe-e88289e89fb9","500g","肉蟹"],["potato","450g","土豆"],["riceCake","200g","年糕"],["onion","100g","洋葱"],["garlic","20g","大蒜"],["ginger","15g","生姜"],["chili","5g","干辣椒"],["vibe-e99d92e6a492","30g","青椒"],["vibe-e7baa2e6a492","30g","红椒"],["vibe-e795aae88c84e985b1","10g","番茄酱"],["vibe-e595a4e98592","200ml","啤酒"]],"optional":[["vibe-e899be","200g","虾"],["vibe-e6b5b7e9b29ce985b1","15g","海鲜酱"],["vibe-e9bb84e8b186e985b1","15g","黄豆酱"],["vibe-e7949ce99da2e985b1","10g","甜面酱"]],"pantry":[["oysterSauce","20g","蚝油"],["starch","40g","淀粉"],["rockSugar","10g","冰糖"],["vibe-e9b8a1e7b2be","3g","鸡精"],["whitePepper","2g","白胡椒粉"],["wine","15ml","料酒"],["soy","20ml","生抽"],["darkSoy","5ml","老抽"],["water","800ml","清水"],["oil","30-50ml","食用油"]],"steps":[["食材预处理","土豆切块为各边均为 3 cm 的立方体，青/红椒切成边长 4 cm 的菱形片，洋葱切成 3 cm 宽的月牙瓣，年糕切成 1 cm 厚片。"],["处理并油炸螃蟹","螃蟹处理干净切成 50-80 g 的块，用厨房纸擦干，裹薄淀粉，180 °C 油温炸 1 分钟捞出。"],["炒制酱料","锅中放油，蒜姜干辣椒爆香，放入蚝油、海鲜酱、黄豆酱、甜面酱、番茄酱及冰糖，小火炒出红油。"],["焖煮食材","加入炸好的螃蟹、土豆块、啤酒和清水，烧开后转小火炖 12 分钟。"],["加入配料收汁","放入年糕和青红椒，开大火收汁到汤汁可以附着在物品表面，最后撒白胡椒粉即可出锅。"]]},
  {"id":"aquatic_shui-zhu-yu","name":"水煮鱼","category":"水产","servings":4,"minutes":120,"difficulty":"中等","coverPath":"ai-generated/aquatic_shui-zhu-yu.jpg","sourcePath":"dishes/aquatic/水煮鱼.md","calories":248,"tips":["垫底的蔬菜组合及用量可自由发挥，但需要注意各种蔬菜的熟化特点（如土豆需煮透）。","红油豆瓣酱的辣度以及盐的用量可根据个人口味灵活调整。","切鱼片时建议先剁块再翻转90度斜撇，厚薄均匀更易成熟。","腌制时手法要轻柔，防止鱼肉组织受损。","如果需要剔骨，可参考专业的鱼类分切指南。"],"required":[["vibe-e5b7b4e6b299e9b1bc","500g","巴沙鱼"],["vibe-e894ace88f9cefbc88e59c9fe8b186e789872fe8b186e88abd2fe88ab1e88f9c2fe7949fe88f9cefbc89","300g-500g","蔬菜（土豆片/豆芽/花菜/生菜）"],["vibe-e7baa2e6b2b9e8b186e793a3e985b1","40g","红油豆瓣酱"],["vibe-e897a4e6a492e6b2b9","10ml","藤椒油"],["garlic","2 瓣","大蒜"]],"optional":[["vibe-e8b186e8b189","10g","豆豉"]],"pantry":[["vibe-e88f9ce7b1bde6b2b9","25ml","菜籽油"],["whitePepper","3g","白胡椒粉"],["salt","5g","盐"],["sugar","2g","糖"]],"steps":[["准备工作","巴沙鱼若是从冷冻柜里取出，需要放室温自然解冻 5 小时再做切片处理。"],["切片","巴沙鱼撇成薄片，约 5cm 长，3cm 宽。"],["入碗","将切好片的巴沙鱼放入大不锈钢碗中。"],["加入腌料","加入 30g 豆瓣酱，3g 盐，10ml 藤椒油，3g 白胡椒粉。"],["抓匀封油","用手抓匀后加入 5ml 菜籽油收尾封住口味。"],["静置入味","常温静置至少 30 分钟入味。"],["备菜","大蒜切成蒜末。以 300g 花菜，200g 生菜为例，将花菜与生菜洗净。"],["熟化蔬菜","花菜开水锅焯水备用；将生菜洗净晾干，炒熟备用（不用放油）。"],["炒制底料","热锅冷油（菜籽油 20ml），加入 10g 豆瓣酱，10g 豆豉（可选），加入蒜末，中火慢炒。"],["汆鱼片","加入 150ml 热水，水开后加入腌制好的鱼片，轻轻翻动散开，加入 2g 盐和 2g 糖调味，再次沸腾即可。"],["盛盘","先将熟的蔬菜盛至大碗中，然后将热的鱼片盛在蔬菜上面，浇上锅中剩余热汤即可。"]]},
  {"id":"aquatic_wei-bo-cong-jiang-hei-xue-yu","name":"微波葱姜黑鳕鱼","category":"水产","servings":2,"minutes":20,"difficulty":"中等","coverPath":"ai-generated/aquatic_wei-bo-cong-jiang-hei-xue-yu.jpg","sourcePath":"dishes/aquatic/微波葱姜黑鳕鱼.md","calories":749,"tips":["如果想让香气更为浓郁，在微波前可将葱姜与料酒均匀涂抹在鱼片的两侧","不同鱼类微波时间不同，海鲈鱼(450g)约6.5分钟，罗非鱼(800g)约6分钟，大比目鱼(170g)约2.25分钟，龙脷鱼(170g)约1.5分钟","必须严格掌握油温，190℃的热油是这道菜灵魂香气的来源"],"required":[["vibe-e9bb91e9b395e9b1bcefbc88e5b8a6e79aaeefbc89","2片(450g)","黑鳕鱼（带皮）"],["vibe-e99d92e891b1efbc88e891b1e799bdefbc89","25g","青葱（葱白）"],["vibe-e99d92e891b1efbc88e891b1e7bbbfefbc89","10g","青葱（葱绿）"],["ginger","13g","姜"]],"optional":[],"pantry":[["wine","5mL","料酒"],["vibe-e985b1e6b2b9","25mL","酱油"],["sesame","2mL","芝麻油"],["vibe-e88ab1e7949fe6b2b9","50mL","花生油"]],"steps":[["装袋准备","将鱼片分别放入两个密封袋中，鱼皮向下平放在盘子上。"],["准备葱姜丝","取葱白切丝25g，姜去皮切丝10g，混合后分成两份，分别放在袋内的鱼片上。"],["加入料酒","向每个密封袋中倒入2.5mL料酒。"],["微波加热","封好袋口，放入微波炉中，使用中火（800瓦）微波3.5至5分钟，直到鱼肉变为不透明且容易散开的状态。"],["取出装盘","从袋中取出鱼片，去除袋内已变软的葱白和姜丝。"],["淋调味料","将25mL酱油与2mL芝麻油混合均匀，平均淋在两片鱼片上。"],["布置新鲜装饰","取葱绿切细丝10g，姜去皮切丝3g，混合后分成两份撒在鱼片上。"],["加热花生油","取50mL花生油，在小锅中加热至190℃。"],["热油激香","将滚烫的花生油迅速淋到葱绿和姜丝上，激发出香味，立刻上桌。"]]},
  {"id":"aquatic_xiang-you-shan-si","name":"响油鳝丝","category":"水产","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/aquatic_xiang-you-shan-si.jpg","sourcePath":"dishes/aquatic/响油鳝丝.md","calories":556,"tips":["不能将鳝鱼的血洗得太干净，否则鳝鱼很容易发黑发臭","鳝鱼可以让摊主帮忙宰杀","可以多加一些胡椒粉和白糖，有利于去腥增香","参考资料来源：YouTube 响油鳝丝家常做法"],"required":[["vibe-e9b39de4b89d","400g","鳝丝"],["garlic","40g","大蒜"],["ginger","20g","姜末"],["garlic","40g","蒜末"],["scallion","15g","葱花"],["vibe-e78caae6b2b9","20g","猪油"]],"optional":[],"pantry":[["wine","13g","料酒"],["soy","3g","生抽"],["oysterSauce","2g","蚝油"],["darkSoy","2g","老抽"],["salt","2g","食用盐"],["sugar","6-15g","白糖"],["whitePepper","3.5-8g","胡椒粉"],["starch","10g","淀粉"],["water","50g","水"],["sesame","5g","香油"]],"steps":[["处理鳝鱼","将鳝鱼切成三段后切成细丝"],["腌制去腥","加入 0.5 g 胡椒粉、3 g 料酒搅拌均匀，再加入 5 g 香油腌制"],["热油滑锅","将炒锅烧热，用少量油滑一遍锅，防止粘连"],["烧油","加入植物油，烧到 6 成热"],["爆香辅料","加入一半蒜末和全部姜末，翻炒几下"],["爆炒鳝丝","加入鳝丝，中火爆炒 30 秒"],["烹入料酒","边缘淋入 10 g 料酒，翻炒几下"],["加入生抽","加入生抽，炒匀"],["上色增味","加入蚝油、老抽，翻炒几下"],["调味","加入食用盐、白糖、3 g 胡椒粉，炒匀"],["勾芡收汁","淀粉和水混合为水淀粉，倒入锅中，收汁至浓稠"],["装盘","装盘，撒上蒜蓉、葱花"],["响油工序","另起锅烧热，加入猪油，烧至七成热，浇在鳝丝上"]]},
  {"id":"breakfast_cha-ye-dan","name":"茶叶蛋","category":"早餐","servings":8,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/breakfast_cha-ye-dan.jpg","sourcePath":"dishes/breakfast/茶叶蛋.md","calories":193,"tips":["食盐可根据个人口味选择不加","若想入味更快、切面更好看，可尝试剥壳并在蛋白侧面划3-11刀（十字方向），泡入卤汁2天以上","划刀时不要太深，接近蛋黄即可，以免蛋黄散出","香料不足时可使用现成的卤料包代替"],"required":[["egg","400g(约8颗)","鸡蛋"],["vibe-e9a699e58fb6","0.5-1g(约2片)","香叶"],["vibe-e6a182e79aae","3g(1小块)","桂皮"],["vibe-e88cb4e9a699","5g","茴香"],["vibe-e7baa2e88cb6","20g","红茶"]],"optional":[["salt","3g","食盐"]],"pantry":[["starAnise","4g(约2颗)","八角"],["rockSugar","15g","冰糖"],["soy","15g","生抽"],["darkSoy","25g","老抽"]],"steps":[["冷水煮蛋","用冷水将鸡蛋放入锅中，大火煮沸后继续煮约 8 分钟。"],["冷水浸泡","将鸡蛋捞出，迅速放入冷水中过凉。"],["敲碎蛋壳","将鸡蛋互相碰撞，使每个鸡蛋表面产生均匀的裂缝。"],["加入调料","将鸡蛋放回锅中，加入八角、香叶、桂皮、茴香、冰糖、红茶、生抽、老抽、食盐。"],["加水没过","往锅中倒入清水，直至完全没过鸡蛋。"],["中小火炖煮","大火煮开后转中小火，持续煮 15 分钟。"]]},
  {"id":"breakfast_dan-jian-ci-ba","name":"蛋煎糍粑","category":"早餐","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/breakfast_dan-jian-ci-ba.jpg","sourcePath":"dishes/breakfast/蛋煎糍粑.md","calories":379,"tips":["放糍粑进去时候注意把糍粑间隔开来，防止粘在一起","鸡蛋的量根据糍粑的量而定","糖的量根据个人喜好调整"],"required":[["vibe-e7b38de7b291","2块","糍粑"],["egg","1个","鸡蛋"],["vibe-e7baa2e7b396","10g (建议 8g-15g)","红糖"]],"optional":[],"pantry":[["oil","10-15ml","食用油"],["salt","2g","食用盐"]],"steps":[["食材预处理","把糍粑切成长方形小块，便于后面煎制，确保大小均匀受热一致。"],["准备蛋液","碗里打入一个鸡蛋并把鸡蛋搅碎，加入 2g 食用盐搅拌均匀。"],["裹蛋液","将切好的小糍粑依此放入搅碎的鸡蛋里面，涂抹完糍粑双面为止。"],["小火煎制","锅里倒入植物油 10ml，把涂抹好的糍粑小块放进去小火慢慢煎软。"],["淋入余液","将剩下的鸡蛋液慢慢倒在糍粑表面，填补缝隙。"],["翻面出锅","用筷子或者勺子为糍粑翻面，来回煎至金黄色，撒上红糖后即可开吃。"]]},
  {"id":"breakfast_gui-yuan-hong-zao-zhou","name":"桂圆红枣粥","category":"早餐","servings":1,"minutes":70,"difficulty":"简单","coverPath":"ai-generated/breakfast_gui-yuan-hong-zao-zhou.jpg","sourcePath":"dishes/breakfast/桂圆红枣粥.md","calories":617,"tips":["对粥的稀稠程度有不同喜好的朋友可以酌情增加或减少水的用量","煮出来的粥是甜的，可以通过控制加入桂圆的数量控制甜度"],"required":[["vibe-e7b3afe7b1b3","100g","糯米"],["vibe-e7baa2e69ea3","15 颗","红枣"],["vibe-e6a182e59c86","15 颗","桂圆"]],"optional":[],"pantry":[],"steps":[["浸泡桂圆","将桂圆肉扒出，用清水洗两次，放入碗中浸泡 10 分钟"],["浸泡红枣","红枣用清水洗两次，放入碗中浸泡 10 分钟"],["淘米加水","糯米放入电饭锅中，清水淘米两次后，加入 2000ml 水"],["加入配料","将桂圆和红枣加入电饭锅"],["开启烹煮","打开电饭锅煮饭模式，1 小时后粥成"]]},
  {"id":"breakfast_han-guo-ma-yao-ji-dan","name":"韩国麻药鸡蛋","category":"早餐","servings":1,"minutes":90,"difficulty":"简单","coverPath":"ai-generated/breakfast_han-guo-ma-yao-ji-dan.jpg","sourcePath":"dishes/breakfast/韩国麻药鸡蛋.md","calories":669,"tips":["酱汁的比例可以根据个人口味微调。如果喜欢更甜，可以增加糖的用量。","剩余的酱汁非常美味，可以直接用来拌饭。"],"required":[["egg","5-8个","鸡蛋"],["vibe-e99fa9e5bc8fe985b1e6b2b9efbc88e68896e7949fe68abdefbc89","4汤匙","韩式酱油（或生抽）"],["vibe-e697a5e5bc8fe591b3e6b78b","2汤匙","日式味淋"],["vibe-e99d92e891b1","15g","青葱"],["vibe-e8bea3e6a492efbc88e5b08fe7b1b3e8bea3e68896e99d92e7baa2e6a492efbc89","15g","辣椒（小米辣或青红椒）"]],"optional":[],"pantry":[["water","4汤匙","清水"],["sugar","2汤匙","白糖"],["sesame","5ml","芝麻油"]],"steps":[["煮溏心蛋","烧一锅开水，水沸腾后放入鸡蛋，煮 7 分钟。"],["调制基础酱汁","将 4 汤匙酱油、4 汤匙清水、2 汤匙味淋、2 汤匙白糖倒入小锅中。"],["加热酱汁","加热酱汁至沸腾，煮开以挥发掉味淋中的酒精味，随后关火放凉备用。"],["加入配料","将切好的辣椒圈加入放凉的酱汁中。"],["剥蛋壳","将煮好的鸡蛋捞出，放入冰水中冷却后剥去蛋壳。"],["混合腌制","将剥好的鸡蛋放入调好的酱汁中，表面淋上 5ml 芝麻油并撒上葱花。"],["冷藏入味","放入冰箱冷藏等待 1 - 2 小时，让鸡蛋充分入味。"]]},
  {"id":"breakfast_ji-dan-san-ming-zhi","name":"鸡蛋三明治","category":"早餐","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/breakfast_ji-dan-san-ming-zhi.jpg","sourcePath":"dishes/breakfast/鸡蛋三明治.md","calories":560,"tips":["也可加入芝士、酸黄瓜等食材丰富口感","吐司可以提前略微烘烤，口感会更加酥脆"],"required":[["egg","1个","鸡蛋"],["vibe-e59090e58fb8","2片","吐司"],["vibe-e59fb9e6a0b9","2片","培根"],["vibe-e9bb84e6b2b9","10g","黄油"],["vibe-e89b8be9bb84e985b1","20g","蛋黄酱"],["vibe-e9bb91e883a1e6a492","2g","黑胡椒"]],"optional":[],"pantry":[["salt","1g","盐"]],"steps":[["处理吐司","吐司切去四边，备用。"],["煮蛋捣碎","鸡蛋煮熟后剥壳，放入碗中用叉子捣碎。"],["调制鸡蛋酱","在碎鸡蛋中加入蛋黄酱、盐、黑胡椒，混合搅拌均匀。"],["煎制培根","平底锅中加入黄油融化，放入培根煎至熟透出香。"],["组装三明治","在两片吐司间均匀铺上制作好的鸡蛋酱及培根。"],["切块装盘","将组装好的四边形吐司沿对角线切成三角形装盘。"]]},
  {"id":"breakfast_jian-jiao-de-zuo-fa","name":"煎饺的做法","category":"早餐","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/breakfast_jian-jiao-de-zuo-fa.jpg","sourcePath":"dishes/breakfast/煎饺.md","calories":769,"tips":["操作时，需时刻观察锅内情况，切记不可分神玩手机。"],"required":[["vibe-e9a5bae5ad90efbc88e9809fe586bbe6b0b4e9a5baefbc89","10-15个","饺子（速冻水饺）"]],"optional":[["vibe-e9bb91e88a9de9babb","少许","黑芝麻"],["scallion","少许","葱花"]],"pantry":[["oil","10ml-15ml","食用油"],["water","适量（没过饺子1/2）","清水"]],"steps":[["准备锅具","取出平底锅（不沾平底锅最佳）"],["倒油","向锅中加入 10ml - 15 ml 食用油"],["摆放饺子","开火，放入饺子（尽量平均铺开，不宜堆叠）"],["加水","立刻加入清水，水线没过饺子平均高度的 1/2"],["盖盖大火煮","盖上锅盖（此时炉灶应该处于大火）"],["焖煮等待","等待 8 - 10 分钟"],["转中火","当锅中水分仅剩 2mm 时，转中火开始煎制"],["摇晃受热","当水分全部蒸发后，摇晃平底锅使饺子受热均匀"],["撒配料","放入黑芝麻和葱花再焖 10s"],["观察出锅","1 - 2 分钟夹出一个饺子观察底部，若出现金黄色脆皮立即取出"]]},
  {"id":"breakfast_jin-qiang-yu-jiang-san-ming-zhi","name":"金枪鱼酱三明治","category":"早餐","servings":1,"minutes":5,"difficulty":"简单","coverPath":"ai-generated/breakfast_jin-qiang-yu-jiang-san-ming-zhi.jpg","sourcePath":"dishes/breakfast/金枪鱼酱三明治.md","calories":569,"tips":["金枪鱼酱可以在前一天晚上在冰箱冷藏","金枪鱼酱建议冷藏时间不超过一周，且需要使用保鲜膜盖住","注意在按压操作之前不要将轻食机电源接通，以免引发安全问题"],"required":[["vibe-e6b0b4e6b5b8e98791e69eaae9b1bce7bd90e5a4b4","65g","水浸金枪鱼罐头"],["vibe-e696b9e5bda2e59090e58fb8e78987","2片","方形吐司片"],["vibe-e89b8be9bb84e985b1","50mL","蛋黄酱"],["vibe-e4bf84e5bc8fe985b8e9bb84e7939ce6b181","10-15mL","俄式酸黄瓜汁"]],"optional":[["vibe-e88a9de5a3abe78987","1片","芝士片"],["vibe-e781abe885bfe78987","1片","火腿片"]],"pantry":[],"steps":[["调配金枪鱼酱","将金枪鱼、蛋黄酱、俄式酸黄瓜汁倒入碗中，用勺子搅拌，保证将金枪鱼块搅碎，酱整体呈糊状，并备用"],["放置底层吐司","将 1 片吐司放在轻食机上"],["涂抹酱料","将做好的金枪鱼酱涂抹到吐司上，建议 10-15ml"],["合拢并开机","将另一片方形吐司片覆盖在上面，并按压轻食机，开机"],["加热完成","待轻食机自动停止加热，即可装盘使用"]]},
  {"id":"breakfast_kong-qi-zha-guo-mian-bao-pian","name":"空气炸锅面包片","category":"早餐","servings":1,"minutes":5,"difficulty":"简单","coverPath":"ai-generated/breakfast_kong-qi-zha-guo-mian-bao-pian.jpg","sourcePath":"dishes/breakfast/空气炸锅面包片.md","calories":254,"tips":["全麦面包片营养参考：热量 254 千卡，蛋白质 12.3 克，脂肪 3.5 克，碳水化合物 43.1 克，膳食纤维 6.0 克"],"required":[["vibe-e99da2e58c85e78987","2片","面包片"]],"optional":[],"pantry":[],"steps":[["准备面包片","取出两片面包片（建议使用粗粮面包片）"],["放入炸锅","将面包片垂直放入空气炸锅"],["高温烘烤","200°C 烘烤 5 分钟"],["取出装盘","取出即可使用"]]},
  {"id":"breakfast_mei-shi-chao-dan","name":"美式炒蛋","category":"早餐","servings":1,"minutes":20,"difficulty":"简单","coverPath":"ai-generated/breakfast_mei-shi-chao-dan.jpg","sourcePath":"dishes/breakfast/美式炒蛋.md","calories":258,"tips":["想吃的更丰富可以在最后一步加上炒好的番茄丁，洋葱丁，培根丁，切好的芝士小丁等（需使用不出水的食材）","务必使用平底锅（不粘锅），否则容易粘锅导致失败","若是一人食炒1-2个鸡蛋，建议使用口径较小的锅以便于均匀搅拌"],"required":[["egg","3个","鸡蛋"],["vibe-e585a8e88482e7899be5a5b62fe5a5b6e6b2b9","10g","全脂牛奶/奶油"],["vibe-e9bb84e6b2b9","5克","黄油"]],"optional":[],"pantry":[["salt","1克","盐"]],"steps":[["搅打静置","鸡蛋打入大碗中，加盐搅打至起泡，静置 15 分钟"],["小火预热","黄油切小块入锅，倒入蛋液，开小火不断搅拌"],["快速翻动","黄油一融化，就快速翻动蛋液，将其打碎成细密状，在蛋液大体凝固前关火"],["润色装盘","加入牛奶搅拌 15 秒，至炒蛋湿润绵密，装盘"]]},
  {"id":"breakfast_niu-nai-yan-mai","name":"牛奶燕麦","category":"早餐","servings":1,"minutes":3,"difficulty":"简单","coverPath":"ai-generated/breakfast_niu-nai-yan-mai.jpg","sourcePath":"dishes/breakfast/牛奶燕麦.md","calories":421,"tips":["由于不同微波炉火力不同，微波时间需根据实际情况微调","使用微波炉时，不建议混合物超过容器容量的50%，防止溢出","不建议使用玻璃杯在微波炉中高功率烹饪，以防炸裂","搭配水果、蔬菜或苏打饼干食用，营养更全面"],"required":[["milk","280ml","牛奶"],["vibe-e78795e9baa6","40g","燕麦"],["egg","1个","鸡蛋"]],"optional":[["vibe-e6a492e79b90","3g","椒盐"]],"pantry":[["water","200ml","水"],["oil","少量","食用油"]],"steps":[["准备牛奶","将冷的牛奶倒入早餐杯中备用。"],["烹饪燕麦","锅中加入200ml水，烧开后放入燕麦，煮约2分钟直至熟透。"],["混合燕麦与牛奶","将煮好的燕麦捞出，倒入装有牛奶的杯子中并搅拌。"],["煎鸡蛋","热锅放底油，油热后打入鸡蛋，每面煎20秒，可撒入3g椒盐调味。"],["装盘享用","将煎蛋装盘，配合牛奶燕麦一同食用。"]]},
  {"id":"breakfast_shou-zhua-bing","name":"手抓饼","category":"早餐","servings":1,"minutes":40,"difficulty":"简单","coverPath":"ai-generated/breakfast_shou-zhua-bing.jpg","sourcePath":"dishes/breakfast/手抓饼.md","calories":1050,"tips":["使用开水与冷水混合和面，有助于提升饼皮柔韧度。","面团醒发时间不宜少于 20 分钟，否则不易擀薄。","可根据个人口味增减配料，建议配料总重控制在 100 克以内。","剩余生饼皮可冷藏保存 24 小时，使用时回温擀平即可。"],"required":[["vibe-e699aee9809ae99da2e7b289","200克","普通面粉"],["egg","1个","鸡蛋"],["lettuce","30克","生菜"],["vibe-e781abe885bf","30克","火腿"]],"optional":[["vibe-e88a9de5a3abe78987","1片","芝士片"]],"pantry":[["water","100毫升","开水"],["water","50毫升","冷水"],["oil","15毫升","食用油"],["salt","3克","盐"]],"steps":[["半烫面制作","面粉放入碗中，加入开水搅拌成絮状，再加入冷水揉成光滑面团，覆盖湿布静置 20 分钟。"],["下剂擀制","面团分成每份约 100 克，搓圆，擀成薄片。"],["抹油起酥","表面均匀涂抹食用油，撒上盐，卷成蜗牛状，松弛 10 分钟。"],["二次成型","面团再次擀成薄饼，厚度均匀。"],["煎制饼皮","热锅中倒入油，小火煎至两面金黄起泡。"],["组合成品","煎好的饼依次铺入煎蛋、生菜、火腿、芝士片等配料，卷起即可。"]]},
  {"id":"breakfast_shui-zhu-yu-mi","name":"水煮玉米","category":"早餐","servings":1,"minutes":20,"difficulty":"简单","coverPath":"ai-generated/breakfast_shui-zhu-yu-mi.jpg","sourcePath":"dishes/aquatic/水煮鱼.md","calories":108,"tips":[],"required":[["vibe-e696b0e9b29ce78e89e7b1b3","1个","新鲜玉米"]],"optional":[["sugar","适量","糖"]],"pantry":[["water","适量（淹过玉米半节指头）","水"],["salt","2克","盐"]],"steps":[["处理玉米","将新鲜玉米剥去外皮，剩部分内层玉米皮入锅"],["加入调料","加入淹过玉米约半节指头的水，并加入盐和糖"],["烹煮","水煮开之后转至小火，加盖继续煮 15-20 分钟"],["沥干冷却","煮熟后沥干水分，冷却后即可食用"]]},
  {"id":"breakfast_tai-yang-dan","name":"太阳蛋","category":"早餐","servings":1,"minutes":5,"difficulty":"简单","coverPath":"ai-generated/breakfast_tai-yang-dan.jpg","sourcePath":"dishes/breakfast/太阳蛋.md","calories":113,"tips":["若熟度不符合个人口味，可以 1 分钟为单位继续微波加热","不可控火候微波炉定义：面板上无法找到小火、中火、大火等字样，仅能控制时长","可控火候微波炉定义：面板上能找到不同火候档位设置"],"required":[["egg","1个","鸡蛋"]],"optional":[],"pantry":[["salt","1g","盐"],["oil","5mL","油"]],"steps":[["准备碗底","准备一个小碗，倒入计算好的油和盐，搅拌均匀。倾斜碗使油均匀沾在碗表面。"],["打入鸡蛋","取出一个鸡蛋，打入准备好的小碗中。"],["蛋黄戳孔","在蛋黄表面戳孔。使用牙签戳 5 个孔或使用筷子戳 1 个孔。"],["微波加热","将碗放入微波炉。可控火候微波炉使用中火 3 分钟；不可控火候微波炉先打 1 分钟，若蛋清未大面积凝固，则以 30 秒为单位反复加热直至成型。"]]},
  {"id":"breakfast_tang-xin-dan","name":"溏心蛋","category":"早餐","servings":1,"minutes":15,"difficulty":"中等","coverPath":"ai-generated/breakfast_tang-xin-dan.jpg","sourcePath":"dishes/breakfast/溏心蛋.md","calories":72,"tips":["如果觉得鸡蛋不够熟的小伙伴可以依照自己的喜好添加更多的水。","警告：溏心蛋有沙门氏菌感染的风险。不建议静置 5 分钟以内。"],"required":[["egg","1颗或更多","鸡蛋"]],"optional":[],"pantry":[["water","淹过鸡蛋约2公分","冷水"]],"steps":[["放置鸡蛋","将鸡蛋放入电锅中。鸡蛋不可互相堆叠，应皆在底部，并留有空间可以晃动"],["加水准备","倒入淹过鸡蛋约 2 公分的冷水"],["加热至微沸","开盖，使用最大功率加热至水滚起（大约 85 - 95 度，稍微滚动，不需完全沸腾）"],["盖盖静置","关火，盖上盖子，让鸡蛋静置。"],["冷冲去壳","沥干水分，用冷水冲洗鸡蛋约 1 分钟，即可去壳食用。"]]},
  {"id":"breakfast_tu-si-guo-jiang-de-zuo-fa","name":"吐司果酱的做法","category":"早餐","servings":1,"minutes":2,"difficulty":"简单","coverPath":"ai-generated/breakfast_tu-si-guo-jiang-de-zuo-fa.jpg","sourcePath":"dishes/breakfast/吐司果酱.md","calories":223,"tips":["面包机一般不会超过一百块，是高性价比的早餐工具","吐司一般一包十块钱八片，保质期比较短，要注意新鲜度","两分钟快速搞定，耗时短，不会产生额外垃圾，也不需要清洗工具","非常适合程序员等忙碌人群"],"required":[["vibe-e696b0e9b29ce59090e58fb8","2片","新鲜吐司"],["vibe-e69e9ce985b1","适量(足够涂满一面吐司)","果酱"]],"optional":[],"pantry":[],"steps":[["放入吐司","将吐司放入面包机"],["设置档位","设置好档位,时间到了会自动弹出"],["等待弹出","两分钟后吐司加热完成弹出"],["涂抹果酱","先取出一片吐司,涂满果酱再盖上另一片吐司即可"],["打包食用","用餐巾纸包一下可以边走边吃也可以吃完再出门"]]},
  {"id":"breakfast_wan-mei-shui-zhu-dan","name":"完美水煮蛋","category":"早餐","servings":1,"minutes":35,"difficulty":"简单","coverPath":"ai-generated/breakfast_wan-mei-shui-zhu-dan.jpg","sourcePath":"dishes/breakfast/完美水煮蛋.md","calories":86,"tips":["关键参数：蛋黄中心温度需控制在 67±1°C 以达到绵密口感","蛋白分层温度梯度：外层 100°C→87°C，中层 87°C→55°C，内层 55°C→30°C","营养优势：该科学煮法下的多酚含量比传统煮法高 23%","制作难度较高，需全程关注定时器并精准执行转移操作"],"required":[["egg","1个(约60g)","新鲜鸡蛋"],["vibe-313030c2b04320e6b2b8e6b0b4","1500ml","100°C 沸水"],["vibe-3330c2b04320e6b8a9e6b0b4","1500ml","30°C 温水"],["vibe-e586b0e6b0b4","适量","冰水"]],"optional":[],"pantry":[],"steps":[["准备温控水浴","准备两锅水：A 锅维持 100°C 沸水，B 锅维持 30°C 温水"],["入锅计时","用漏勺将鸡蛋小心放入 A 锅，同时启动定时器"],["循环转移操作","精准每 2 分钟将鸡蛋通过漏勺转移至另一锅水中（A锅移至B锅，或B锅移至A锅）"],["重复循环","重复上述转移操作共 16 次，总计操作时长为 32 分钟"],["末次静置","最后一次转移后，将鸡蛋留在 B 锅（30°C 温水）中静置 30 秒"],["冰浴终止加热","立即将鸡蛋放入 0 摄氏度的冰水中，维持 30 秒以彻底终止余热烹饪"],["精细剥壳","剥壳时从钝端气室处开始，沿纵轴剥离蛋膜"]]},
  {"id":"breakfast_wei-bo-lu-dan-gao","name":"微波炉蛋糕","category":"早餐","servings":1,"minutes":20,"difficulty":"简单","coverPath":"ai-generated/breakfast_wei-bo-lu-dan-gao.jpg","sourcePath":"dishes/breakfast/微波炉蛋糕.md","calories":308,"tips":["在夸赞自己之前的操作可以重复多遍做出更大的蛋糕","泡打粉用来让蛋糕更蓬松，大多不含铝，几块钱一包，可以买了在家备着","若加入液体（如牛奶）请务必确保搅和成稠酸奶状，建议少量多次加入以防止水分过量而导致成品湿瘪","食材不要超过容器的 3/4，防止加热时溢出"],"required":[["egg","1个","鸡蛋"],["flour","15g","面粉"],["vibe-e6b3a1e68993e7b289","2.5g","泡打粉"],["vibe-e9bb84e6b2b9","约30g(半个鸡蛋大小)","黄油"],["vibe-e799bdefbc88e7baa2efbc89e7b396","10g","白（红）糖"]],"optional":[["vibe-e59296e595a1e7b2892fe5b7a7e5858be58a9b2fe9baa6e789872fe59d9ae69e9c2fe9a699e89589e7ad89","适量","咖啡粉/巧克力/麦片/坚果/香蕉等"]],"pantry":[["salt","1g","盐"]],"steps":[["混合食材","在容器中放入黄油微波加热15秒融化；将巧克力或香蕉搅碎；打入鸡蛋搅散；依次加入糖、盐、泡打粉、面粉及喜欢的口味食材，搅拌至无干粉的稠酸奶状，最后在顶端撒上干燥食材。"],["心理建设","夸赞一下自己，保持烹饪的好心情。"],["微波加热","将容器放入微波炉，使用高火加热1分钟，观察蛋糕蓬松成型。"],["取出享用","取出杯子并拍照分享，趁热食用。"]]},
  {"id":"breakfast_wei-bo-lu-he-bao-dan","name":"微波炉荷包蛋","category":"早餐","servings":1,"minutes":2,"difficulty":"简单","coverPath":"ai-generated/breakfast_wei-bo-lu-he-bao-dan.jpg","sourcePath":"dishes/breakfast/微波炉荷包蛋.md","calories":169,"tips":["微波炉加热前，如果想进一步避免蛋黄和蛋白溅射，可以在碗上盖个盖子避免弄脏微波炉","建议使用常温水，水温过高可能导致蛋白过早凝固"],"required":[["egg","2个","鸡蛋"]],"optional":[],"pantry":[["water","35ml","饮用水"],["sesame","3ml","芝麻油"],["salt","0.8g","盐"]],"steps":[["处理鸡蛋","将鸡蛋打入小碗中，用筷子在所有鸡蛋黄上扎 2 个洞，避免加热弄脏微波炉"],["加水","向碗内倒入常温饮用水"],["加盐","向碗内倒入食用盐"],["加芝麻油","最后加入芝麻油"],["微波加热","将放好材料的碗放入微波炉中，高火加热 80 秒"],["取出成品","到达设定时间后，使用抹布垫着手取出成品"]]},
  {"id":"breakfast_wei-bo-lu-zheng-dan","name":"微波炉蒸蛋","category":"早餐","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/breakfast_wei-bo-lu-zheng-dan.jpg","sourcePath":"dishes/breakfast/微波炉蒸蛋.md","calories":151,"tips":["水温应在 40–50℃ ，不宜过热。","蛋液与水比例控制在 1:1 至 1:1.2 之间口感最佳。","覆盖保鲜膜并扎孔能防止表面爆开或出现蜂窝。","过筛可显著提升细腻度。","若表面鼓泡或出水，说明加热过头，下次缩短时间即可。"],"required":[["egg","2 个（约 100g 蛋液）","鸡蛋"],["vibe-e6b8a9e6b0b4e68896e9ab98e6b1a4","100-120ml","温水或高汤"]],"optional":[["soy","2ml","生抽"]],"pantry":[["salt","1g","食盐"],["sesame","几滴","香油"]],"steps":[["打散与混合","将鸡蛋打散，加入温水/高汤、盐、生抽，轻轻搅匀，尽量不要起泡。"],["过滤蛋液","将蛋液过筛倒入耐热碗中，表面若有气泡可用牙签轻戳。"],["密封准备","覆盖保鲜膜并扎 8-10 个小孔，或使用微波炉专用盖（留缝隙）。"],["微波加热","放入微波炉中加热：700W 加热 1 分 30 秒，视情况再追 20-30 秒；或根据 600W/800W 功率调整时间。"],["余温静置","加热完成后取出静置 1 分钟。"],["最后调味","淋上香油，撒上葱花即可食用。"]]},
  {"id":"breakfast_yan-mai-ji-dan-bing","name":"燕麦鸡蛋饼","category":"早餐","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/breakfast_yan-mai-ji-dan-bing.jpg","sourcePath":"dishes/breakfast/燕麦鸡蛋饼.md","calories":535,"tips":["如果口味偏咸口，可以在搅拌鸡蛋液时加入盐，胡椒等调料。","煎饼时使用小火，避免燕麦部分煎糊。","牛奶总量250ml中，约50-100g用于和面，其余可直接饮用。"],"required":[["egg","2个","鸡蛋"],["vibe-e7baafe5b9b2e78795e9baa6e78987","50g","纯干燕麦片"],["milk","250ml","牛奶"],["vibe-e9bb84e6b2b9","适量","黄油"]],"optional":[["vibe-e894ace88f9ce7a28ee58fb6","50g","蔬菜碎叶"],["vibe-e79b902fe883a1e6a492","适量","盐/胡椒"]],"pantry":[],"steps":[["混合燕麦牛奶","将部分牛奶与干燕麦混合搅拌均匀至黏稠状。"],["打散鸡蛋","将鸡蛋搅拌均匀至颜色单一程度。"],["混合浆料","将鸡蛋液倒入燕麦牛奶中继续搅拌至黏稠、均匀。"],["热锅抹油","平底锅中加入一层黄油并覆盖均匀。"],["下锅摊饼","下入搅拌好的食材，并摊开至饼状。"],["小火煎制","小火加热两到三分钟。如想要加入蔬菜，可以在加热过程中加入碎菜叶。"],["翻面加热","翻面继续加热两分钟。"],["出锅装盘","出锅，搭配剩下的牛奶作为早餐。"]]},
  {"id":"breakfast_yi-shi-xiang-chang-bei-fei-dan","name":"意式香肠北非蛋","category":"早餐","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/breakfast_yi-shi-xiang-chang-bei-fei-dan.jpg","sourcePath":"dishes/breakfast/意式香肠北非蛋.md","calories":668,"tips":["肉类选择建议：意式香肠最正宗（含小茴香籽）；午餐肉怀旧咸香；辣香肠(Chorizo)则带烟熏辛辣风味。","焖蛋时务必守在锅旁频繁观察，蛋白一凝固立刻关火，防止蛋黄过熟。","如果想增加风味，可以在炒蔬菜阶段加入一点大蒜末。"],"required":[["vibe-e6848fe5bc8fe78caae88289e9a699e882a02fe8bea3e9a699e882a02fe58d88e9a490e88289","100g - 150g","意式猪肉香肠/辣香肠/午餐肉"],["vibe-e799bee591b3e69da5e68bbfe59da1e9878ce6848fe99da2e985b1","1罐(400g)","百味来拿坡里意面酱"],["egg","3 - 4 个","鸡蛋"],["pepper","半个","甜椒"],["onion","半个","洋葱"],["vibe-e99da2e58c85","适量","面包"]],"optional":[["vibe-e5b895e9a9ace6a3aee5b9b2e985aa","适量","帕马森干酪"],["vibe-e696b0e9b29ce6aca7e88ab9","少许","新鲜欧芹"],["vibe-e5b9b2e8bea3e6a492e7a28e","少许","干辣椒碎"]],"pantry":[["vibe-e6a984e6a684e6b2b9","10ml - 15ml","橄榄油"]],"steps":[["处理食材","将意式猪肉香肠去肠衣备用；洋葱切小丁；甜椒切细丝。"],["热油","在宽口平底锅中倒入 10ml - 15ml 橄榄油，中火加热。"],["煎炒肉类","放入处理好的香肠或午餐肉，翻炒至边缘金黄酥脆（如果使用生香肠，翻炒时用勺子将其捣碎变色）。"],["炒制蔬菜","将洋葱丁和甜椒丝加入锅中与肉一起翻炒，持续翻炒 4 - 5 分钟，直到蔬菜变软，洋葱呈半透明状。"],["熬制酱汁","倒入百味来拿坡里意面酱，搅拌均匀。将火调至中低火，保持微沸炖煮 2 - 3 分钟。（如果酱汁看起来太稠，可以加入 15ml 水）。"],["挖坑准备","用勺子的背面在锅内的酱汁中挖出 3 - 4 个小“坑”。"],["加入鸡蛋","依次小心地将鸡蛋打入每个坑中。"],["焖煮溏心蛋","盖上平底锅的盖子，利用蒸汽焖熟蛋白。等待 3 - 5 分钟。注意：请频繁检查状态。当蛋白变得不透明且凝固，但轻轻摇晃平底锅时蛋黄仍能晃动（溏心状态）时即可结束这一步。"],["最后调味","关火。根据个人喜好撒上磨碎的帕马森干酪、新鲜欧芹或干辣椒碎。"],["出锅享用","将平底锅直接端上桌，配以硬壳面包蘸取蛋黄与酱汁食用。"]]},
  {"id":"breakfast_zheng-hua-juan","name":"蒸花卷","category":"早餐","servings":1,"minutes":30,"difficulty":"简单","coverPath":"ai-generated/breakfast_zheng-hua-juan.jpg","sourcePath":"dishes/breakfast/蒸花卷.md","calories":400,"tips":["操作时，需要注意观察锅里的水不能少于 50ml。"],"required":[["vibe-e586b7e586bbe88ab1e58db7","5个","冷冻花卷"]],"optional":[],"pantry":[["water","400ml","水"]],"steps":[["取出食材","从花卷的包装袋中取出 5 个花卷"],["摆盘","把花卷平铺在碟子上，尽量不用重叠"],["准备蒸锅","往锅里倒入 400ml 水，把蒸架放里面，把装花卷的碟子放在蒸架上，盖上锅盖。"],["烧水","开大火加热，直至水沸腾。"],["中火蒸制","转中火加热 15 分钟"],["检查熟度","开盖用手感受花卷的表面温度，如果不够热，就继续盖上盖子加热，否则就可以关火出锅。"],["出锅放凉","碟子取出放凉至 50 度即可食用"]]},
  {"id":"breakfast_zheng-shui-dan","name":"蒸水蛋","category":"早餐","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/breakfast_zheng-shui-dan.jpg","sourcePath":"dishes/breakfast/蒸水蛋.md","calories":143,"tips":["一般出锅稍晾即可食用，保留鸡蛋原香的终极口感","也可加入蒸鱼豉油，葱花香油作为佐料","蛋水比例保持在 1:1.5 是口感最平衡的状态"],"required":[["egg","2只","新鲜鸡蛋"]],"optional":[["vibe-e892b8e9b1bce8b189e6b2b9","适量","蒸鱼豉油"],["scallion","少许","葱花"],["sesame","少许","香油"]],"pantry":[["water","260ml","温热水"],["salt","2g","盐"]],"steps":[["打散鸡蛋","鸡蛋打入碗中，打散"],["调制盐水","取其他容器，倒入 1.5 倍（半个蛋壳为 0.5 倍水）于蛋液的温水（温度 20~30），将盐倒入水中化开"],["混合与过滤","将盐水倒入鸡蛋液中，顺时针或逆时针单方向搅拌均匀，气泡之类的可以用舀出丢弃，过筛则口感更加。"],["密封入锅","使用锡纸包裹盛蛋液的碗（或用盘子盖住），置入提前带盖并加入大约 3cm 深度水的锅中"],["蒸制","中火烧至水开，转最小的火继续蒸 4 分钟"]]},
  {"id":"condiment_cong-you","name":"葱油","category":"酱料","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/condiment_cong-you.jpg","sourcePath":"dishes/condiment/葱油.md","calories":2069,"tips":["炸后的开洋葱渣也可以食用，葱油可以滤掉这些料渣，也可以保留","开洋可以极大提升葱油鲜香，并增加鲜甜风味","保存葱油建议使用干燥洁净的玻璃瓶，冷却后密封冷藏"],"required":[["scallion","80g","葱"],["onion","150g","洋葱"],["ginger","20g","姜"]],"optional":[["vibe-e5bc80e6b48b","50g","开洋"],["cilantro","适量","香菜"]],"pantry":[["oil","200g","油"],["wine","10ml","料酒"]],"steps":[["泡发开洋","开洋泡入 50 度温水中，加入 10ml 料酒去腥，泡 10 分钟后取出沥干水分"],["预处理葱和香菜","葱，香菜洗净，切成 5cm 长的段，擦干表面水份"],["预处理洋葱","洋葱切成丝，在锅里用热水煮 5 分钟，取出沥干水份"],["切姜片","姜去皮，切成片"],["熬制葱油","锅里倒入全部油，放入上述预处理好的材料，开中小火炸 20 分钟"]]},
  {"id":"condiment_jian-yi-ban-chao-tang-se-de-zuo-fa","name":"简易版炒糖色的做法","category":"酱料","servings":1,"minutes":10,"difficulty":"中等","coverPath":"ai-generated/condiment_jian-yi-ban-chao-tang-se-de-zuo-fa.jpg","sourcePath":"dishes/condiment/简易版炒糖色.md","calories":1028,"tips":["炒糖色过程火不要太大，电磁炉若火候控制不当易发苦或发甜","冰糖色泽最亮，但必须水油炒；绵白糖可不加水","最后一步加水必须是开水，避免剧烈溅油或糖液凝固"],"required":[["vibe-e586b0e7b3962fe799bde7a082e7b3962fe7bbb5e799bde7b396","50g","冰糖/白砂糖/绵白糖"]],"optional":[["vibe-e891b1e5a79ce8929ce38081e88ab1e6a492e7ad89e8be85e69699","适量","葱姜蒜、花椒等辅料"]],"pantry":[["oil","100ml","油"],["water","500ml","开水"]],"steps":[["预处理准备","在开火前，必须将 400ml 开水和所有准备好的葱姜蒜辅料放置在灶台手边，确保 1 秒内可以拿取。"],["加水起锅","开火，并向锅中倒入 100ml 开水。"],["加入油脂","向锅中倒入 100ml 油，与第一步间隔越短越好，此时可用中大火。"],["下糖并调温","放入糖（冰糖建议提前敲碎），调整火力为中火。"],["持续搅拌","一直搅拌至糖液变成棕褐色。"],["转小火观察","糖液变棕褐色后转为小火。观察糖液变稀，呈现红茶色，再变成酱红色并起密集小泡泡。"],["临界点判定","待小泡泡逐渐消失并出现大泡泡时，糖色制作完成。"],["降温中止反应","快速执行操作：直接加入 400ml 开水；或者先加入辅料/肉类翻炒 5-10 秒爆香后再加水。"]]},
  {"id":"condiment_suan-xiang-jiang-you","name":"蒜香酱油","category":"酱料","servings":1,"minutes":5,"difficulty":"简单","coverPath":"ai-generated/condiment_suan-xiang-jiang-you.jpg","sourcePath":"dishes/condiment/蒜香酱油.md","calories":177,"tips":["油温必须足够滚烫，才能激发出蒜和芝麻的深层香味"],"required":[["garlic","2 瓣","蒜头"],["vibe-e799bde88a9de9babb","5 克","白芝麻"]],"optional":[],"pantry":[["vibe-e88ab1e7949fe6b2b9","15 毫升","花生油"],["vibe-e985b1e6b2b9","30 毫升","酱油"]],"steps":[["处理大蒜","用菜刀拍碎蒜头，可稍微切成粗粒"],["调配基底","往蘸料碟中加入 30 毫升酱油和 5 克白芝麻"],["炸制蒜油","起锅加入花生油，油温滚烫后加入拍好的蒜头，炸半分钟"],["混合完成","关火，迅速把热油及蒜头倒入蘸料碟，用筷子搅拌均匀"]]},
  {"id":"condiment_tang-cu-zhi","name":"糖醋汁","category":"酱料","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/condiment_tang-cu-zhi.jpg","sourcePath":"dishes/condiment/糖醋汁.md","calories":146,"tips":[],"required":[["vibe-e799bde9868b2fe7b1b3e9868b","20ml","白醋/米醋"]],"optional":[],"pantry":[["water","50ml","清水"],["soy","40ml","生抽"],["sugar","30g","白糖"],["wine","10ml","料酒"]],"steps":[["混合调料","按照比例将各调料在小碗中搅拌均匀"],["倒入锅中","按不同菜肴的方式处理完毕后，将配制好的糖醋汁倒入锅中"],["焖煮入味","根据各菜肴的不同，烹制 5-10 分钟"],["大火收汁","大火收汁，可增加菜的浓度、香味和光泽"]]},
  {"id":"condiment_you-su","name":"油酥","category":"酱料","servings":1,"minutes":3,"difficulty":"简单","coverPath":"ai-generated/condiment_you-su.jpg","sourcePath":"dishes/condiment/油酥.md","calories":111,"tips":[],"required":[["flour","约7.7g (按1张饼计)","面粉"]],"optional":[],"pantry":[["oil","10ml (按1张饼计)","油"],["salt","0.5g (按1张饼计)","盐"]],"steps":[["混合干料","面粉盛小碗里，加入盐"],["激发出香味","加入 200 度的热油"],["搅拌成糊","用筷子将其搅拌成无固状物体的糊状。"]]},
  {"id":"condiment_zha-chuan-jiang-liao","name":"炸串酱料","category":"酱料","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/condiment_zha-chuan-jiang-liao.jpg","sourcePath":"dishes/condiment/炸串酱料.md","calories":1826,"tips":["最后一步的调味可按自己喜好添加。","不得一次性倒入所有热油，必须分次倒入并搅拌以充分激发香味并防止焦糊。","原料可按比例缩减制作少量尝试。"],"required":[["vibe-e5b9b2e8bea3e6a492e99da2","60g","干辣椒面"],["vibe-e5ad9ce784b6e7b289","20g","孜然粉"],["vibe-e4ba94e9a699e7b289","15g","五香粉"],["vibe-e88ab1e6a492e7b289","15g","花椒粉"],["vibe-e58d81e4b889e9a699","5g","十三香"],["vibe-e9babbe8bea3e9b29c","5g","麻辣鲜"],["vibe-e799bde88a9de9babb","30g","白芝麻"]],"optional":[["sesame","10ml","香油"],["soy","10ml","生抽"],["vibe-e88ab1e6a492e6b2b9","10ml","花椒油"],["oysterSauce","10ml","蚝油"]],"pantry":[["whitePepper","10g","胡椒粉"],["salt","20g","食盐"],["vibe-e9b8a1e7b2be","8g","鸡精"],["oil","适量（约200-300ml）","食用油"]],"steps":[["混合干料","将干辣椒面、孜然粉、胡椒粉、五香粉、食盐、花椒粉、鸡精、十三香、麻辣鲜和白芝麻放入耐热容器内混合，搅拌均匀。"],["烧热油脂","锅里烧热食用油，油的用量以能没过容器内所有原材料为标准。"],["泼油激发香味","分三次将热油淋入混合料中，每次倒入约 1/3，淋油的同时需快速搅拌。"],["调味收尾","最后放入香油 10ml，生抽 10ml，花椒油 10ml，蚝油 10ml，再次搅拌均匀。"]]},
  {"id":"dessert_hu-luo-bo-tian-gao","name":"胡萝卜甜糕","category":"甜品","servings":1,"minutes":45,"difficulty":"中等","coverPath":"ai-generated/dessert_hu-luo-bo-tian-gao.jpg","sourcePath":"dishes/dessert/胡萝卜甜糕.md","calories":374,"tips":["胡萝卜甜糕可以热吃也可以冷吃，两种风味各有特色。","使用红色胡萝卜比橙色胡萝卜做出来的色泽更好看。","如果想要更浓郁的口感，可以用淡奶油替代部分牛奶。","密封冷藏可保存 4-5 天。食用前可用微波炉加热 1 分钟。","这道甜品在印度几乎每个家庭都会做，是排灯节(Diwali)和婚礼上必不可少的甜品。"],"required":[["carrot","500g","胡萝卜"],["vibe-e585a8e88482e7899be5a5b6","500ml","全脂牛奶"],["vibe-e985a5e6b2b9284768656529","40g","酥油(Ghee)"],["vibe-e5b08fe8b186e894bbe7b289","3g","小豆蔻粉"],["vibe-e885b0e69e9c","15g","腰果"],["vibe-e69d8fe4bb81","15g","杏仁"],["vibe-e891a1e89084e5b9b2","15g","葡萄干"]],"optional":[],"pantry":[["sugar","80g","糖"]],"steps":[["处理胡萝卜","将胡萝卜去皮，用刨丝器刨成细丝"],["融化酥油","在厚底锅中倒入酥油 20g（一半量），中火加热融化"],["翻炒胡萝卜","放入胡萝卜丝，翻炒 3-5 分钟，直至胡萝卜丝变软且散发香味"],["加入牛奶","倒入全脂牛奶 500ml，搅拌均匀"],["煮沸牛奶","大火煮沸后转中小火，保持缓慢沸腾状态"],["慢炖浓缩","持续翻搅 25-30 分钟，直至牛奶几乎完全被胡萝卜吸收蒸发"],["加糖调味","当锅中几乎没有液体时，加入糖 80g，搅拌均匀"],["二次收汁","加糖后继续中小火翻炒 5-8 分钟，直至水分再次蒸发"],["增香","加入剩余的酥油 20g 和小豆蔻粉 3g，翻炒 2 分钟"],["准备坚果","在另一个小锅中，用少量酥油将腰果、杏仁片和葡萄干分别炸至金黄（约 1 分钟）"],["混合坚果","将炸好的坚果和葡萄干的一半拌入胡萝卜甜糕中"],["装饰盛盘","盛盘，将剩余坚果和葡萄干撒在表面作为装饰"]]},
  {"id":"drink_b52-hong-zha-ji","name":"B52轰炸机","category":"饮料","servings":1,"minutes":5,"difficulty":"中等","coverPath":"ai-generated/drink_b52-hong-zha-ji.jpg","sourcePath":"dishes/drink/B52轰炸机.md","calories":80,"tips":["喝的时候，现在酒吧常用的方法是提供一个吸管，在火还燃烧的时候插入，然后快速全部吸入。","由于吸管太细，其中氧气不足，所以火苗会灭掉，不必担心。","这时候，会感到一股热辣顺着喉咙一直烈到胃，之后就是久久的咖啡奶油回甘。非常刺激又好喝。"],"required":[["vibe-e79498e99cb2e59296e595a1e98592","10ml","甘露咖啡酒"],["vibe-e788b1e5b094e585b0e799bee588a9e7949ce98592","10ml","爱尔兰百利甜酒"],["vibe-e8939de5a4a9e58e9fe591b3e4bc8fe789b9e58aa0","10ml","蓝天原味伏特加"]],"optional":[],"pantry":[],"steps":[["底层分层","在利口酒杯的最底层倒入甘露咖啡酒到 1/3 处。(10ml)"],["中层分层","顺着吧勺缓缓倒入爱尔兰百利甜酒，也是 1/3 处 (10ml)。"],["顶层分层","最后在上层倒入蓝天原味伏特加 （10ml)"],["预热杯口","用打火机热一下杯口"],["点火演示","点燃顶层伏特加，看到淡蓝色的小火苗。"]]},
  {"id":"drink_dong-gua-cha","name":"冬瓜茶","category":"饮料","servings":1,"minutes":30,"totalMinutes":300,"waitMinutes":270,"difficulty":"简单","coverPath":"ai-generated/drink_dong-gua-cha.jpg","sourcePath":"dishes/drink/冬瓜茶.md","calories":296,"tips":["冰糖的用量可以调整，以达到个人喜好的甜度。","冷藏保存，建议 1 周内喝完。"],"required":[["winterMelon","1000g","冬瓜"]],"optional":[],"pantry":[["rockSugar","300g","冰糖"]],"steps":[["准备冬瓜","将冬瓜去皮，去籽，切成小块（每块不超过 4cm）。"],["腌制出水","冬瓜加入冰糖，搅拌均匀，盖上保鲜膜放冰箱冷藏 2 小时以上。"],["煮冬瓜","将冬瓜及出的水倒入锅中，大火煮开，然后转中小火慢慢熬制 1~2 个小时，中途多搅拌防止糊锅。"],["过滤冬瓜茶","使用过滤网将煮好的冬瓜茶液过滤，取出冬瓜块，只保留茶液。"],["冷却","将冬瓜茶液放凉后，倒入干净的容器中，放入冰箱冷藏即可。"],["享用","熬好的冬瓜茶液是浓缩汁，根据个人喜好添加水或其他饮品，冷热皆宜。"]]},
  {"id":"drink_ke-le-tong","name":"可乐桶","category":"饮料","servings":1,"minutes":5,"difficulty":"简单","coverPath":"ai-generated/drink_ke-le-tong.jpg","sourcePath":"dishes/drink/可乐桶.md","calories":450,"tips":["可乐桶因冰块和可乐的口感掩盖了威士忌的酒味，因此不善酒力的人也容易在不知不觉中过量饮酒","请在保证个人与饮酒者的安全下调配"],"required":[["vibe-e6b3a2e69781e5a881e5a3abe5bf8c","100ml","波旁威士忌"],["vibe-e58fafe58fa3e58fafe4b990","500ml","可口可乐"],["vibe-e586b0e59d97","300g","冰块"]],"optional":[["vibe-e69fa0e6aaac","1个","柠檬"]],"pantry":[],"steps":[["切取柠檬片","将柠檬对半切（刀方向垂直于柠檬的头尾连线），并从其中的一半中切取一片柠檬备用"],["榨取柠檬汁","再次将柠檬对半切，将得到的 4 角柠檬用压汁器压出柠檬汁置于容器中备用，挤压过的柠檬皮也留下备用"],["准备底杯","选择一个容量约1升的大杯子，将冰块和挤压过的柠檬皮入杯中"],["加入柠檬汁","在杯中倒入 15 毫升柠檬汁"],["注入可乐","沿杯壁缓慢倒入可口可乐至距离杯口 3/4 处"],["加入威士忌","倒入威士忌直至满杯"]]},
  {"id":"drink_mojito-mo-ji-tuo","name":"Mojito莫吉托","category":"饮料","servings":1,"minutes":10,"difficulty":"中等","coverPath":"ai-generated/drink_mojito-mo-ji-tuo.jpg","sourcePath":"dishes/drink/Mojito莫吉托.md","calories":187,"tips":["参考资料：莫吉托(Mojito)世界上最著名的经典鸡尾酒之一。","如果觉得酒味重，可以适当增加苏打水的比例。","青柠和薄荷必须新鲜，这是口感清爽的核心。"],"required":[["vibe-e99d92e69fa0","1块","青柠"],["vibe-e89684e88db7e58fb6","5株","薄荷叶"],["vibe-e7b396e6b586","20ml","糖浆"],["vibe-e98791e889b2e69c97e5a786e98592","45ml","金色朗姆酒"],["vibe-e68993e7a28ee79a84e586b0e59d97","适量","打碎的冰块"],["vibe-e586b0e99587e88b8fe68993e6b0b4","适量","冰镇苏打水"]],"optional":[["vibe-e8939de5a4a9e58e9fe591b3e4bc8fe789b9e58aa0","10ml","蓝天原味伏特加"]],"pantry":[],"steps":[["处理青柠并捣汁","将切成半块的青柠之一切成小块，放入海波杯，随后用研杵将其捣出汁"],["薄荷增香","用 3-4 珠薄荷叶沿着杯口涂抹，随后将其放入杯中"],["加入甜味剂","加入 糖浆 20ml"],["加入基酒","加入 金色朗姆酒 45ml 和 蓝天原味伏特加 10ml"],["补充酸度","将剩下的半块青柠压出汁水放入杯中"],["混合搅拌","轻轻搅拌，使砂糖/糖浆处于半融合状态"],["加入碎冰","将打碎的冰块放入杯中，直到占杯中 3/4"],["注入苏打水","加入冰镇苏打水直到刚好淹没碎冰"],["旋转搅拌","旋转搅拌半分钟"],["补冰","使用碎冰将海波杯补满"],["装饰点缀","将剩下的一株薄荷叶拍醒，插入碎冰，作装饰"]]},
  {"id":"drink_nai-cha-de-zuo-fa","name":"奶茶的做法","category":"饮料","servings":1,"minutes":30,"difficulty":"简单","coverPath":"ai-generated/drink_nai-cha-de-zuo-fa.jpg","sourcePath":"dishes/drink/奶茶.md","calories":81,"tips":["加入沸水后，尽量保持杯子内部温暖，例如使用开口较小的杯子或盖上盖子。","如果气温较低时，使用量杯量取可能导致沸水在冲入红茶前冷却，则可以不使用量杯量取而直接估计其体积。","等待时间结束后可提起或搅动茶包以使冲泡更加均匀。"],"required":[["vibe-e8a28be6b3a1e7baa2e88cb6","2包(约4g)","袋泡红茶"],["vibe-e585a8e88482e5a5b6e7b289e68896e6b7a1e5a5b6","11-12g","全脂奶粉或淡奶"],["vibe-e7a082e7b396","5-7g","砂糖"]],"optional":[],"pantry":[],"steps":[["冲泡红茶","取袋泡红茶 2 包放入杯中，加入 180-200mL 沸水。"],["静置萃取","等待 20 - 30 分钟。"],["添加配料","称取 11-12g 奶粉和 5-7g 砂糖，分别加入前一步骤得到的液体中。"],["搅拌成型","搅拌均匀即可饮用。"]]},
  {"id":"drink_niu-you-guo-la-xi","name":"牛油果拉西","category":"饮料","servings":1,"minutes":5,"difficulty":"简单","coverPath":"ai-generated/drink_niu-you-guo-la-xi.jpg","sourcePath":"dishes/drink/牛油果拉西.md","calories":392,"tips":["牛油果必须选择熟透的，这样才能保证饮品的绵密口感和颜色。","如果喜欢更冰凉的口感，可以适当减少一点牛奶，加入几块冰块一起搅拌。"],"required":[["vibe-e58e9fe591b3e985b8e5a5b6","120ml","原味酸奶"],["vibe-e7869fe9808fe79a84e7899be6b2b9e69e9c","1个","熟透的牛油果"],["vibe-e89c82e89c9c","1汤匙","蜂蜜"],["vibe-e586b7e7899be5a5b6","60ml","冷牛奶"]],"optional":[["vibe-e5b08fe8b186e894bbe7b289","1撮","小豆蔻粉"],["vibe-e89684e88db7e58fb6e68896e59d9ae69e9ce7a28e","少许(约5g)","薄荷叶或坚果碎"]],"pantry":[],"steps":[["处理牛油果","将牛油果对半切开，去核，剥去外皮，将果肉切成小块备用。"],["放入搅拌机","在搅拌机中加入 120ml 原味酸奶、切好的牛油果块、1 汤匙蜂蜜以及 60ml 冷牛奶。"],["添加香料","（可选）加入一小撮小豆蔻粉以增加独特风味。"],["启动搅拌","启动搅拌机，搅拌大约 1 分钟直至液体变得完全顺滑和浓郁。"],["装杯","将打好的饮品倒入杯中。"],["点缀装饰","（可选）在表面放上几片薄荷叶或撒上 5g 切碎的坚果作为装饰。"]]},
  {"id":"drink_suan-mei-tang-（-ban-cheng-pin-jia-gong-）","name":"酸梅汤（半成品加工）","category":"饮料","servings":1,"minutes":5,"difficulty":"简单","coverPath":"ai-generated/drink_suan-mei-tang-（-ban-cheng-pin-jia-gong-）.jpg","sourcePath":"dishes/drink/酸梅汤（半成品加工）.md","calories":603,"tips":["如果没有准备方糖或北京二锅头，可以省略操作中的第 4 步或第 5 步。","放入冰箱冷藏后再饮用效果更佳。","饮酒请勿驾车。"],"required":[["vibe-e985b8e6a285e699b6e59bbae4bd93e9a5aee69699","120g","酸梅晶固体饮料"]],"optional":[["vibe-e696b9e7b396","9g","方糖"],["vibe-e58c97e4baace4ba8ce99485e5a4b4e98592","48g","北京二锅头酒"]],"pantry":[["water","1177g","饮用水"]],"steps":[["准备基底水","取饮用水 1177 克倒入准备好的容器中。"],["初次溶解酸梅晶","放入酸梅晶固体饮料 60 克，使用汤匙顺时针搅拌 50 圈。"],["再次溶解酸梅晶","再放入剩下 60 克酸梅晶固体饮料，再次使用汤匙顺时针搅拌 50 圈。"],["调入方糖","放入 9 克的方糖，使用汤匙顺时针搅拌 100 圈。"],["风味提升","放入北京二锅头酒 48 克，用汤匙顺时针搅拌 30 圈。"]]},
  {"id":"drink_yang-zhi-gan-lu","name":"杨枝甘露","category":"饮料","servings":1,"minutes":20,"difficulty":"简单","coverPath":"ai-generated/drink_yang-zhi-gan-lu.jpg","sourcePath":"dishes/drink/杨枝甘露.md","calories":661,"tips":[],"required":[["vibe-e5a587e4ba9ae7b1bd","24g","奇亚籽"],["milk","50ml","牛奶"],["vibe-e586b0e59d97","2小块","冰块"],["vibe-e88a92e69e9c","1粒","芒果"],["vibe-e891a1e89084e69f9a","1/2粒","葡萄柚"],["vibe-e6a4b0e5a5b6","150ml","椰奶"]],"optional":[["vibe-e58887e4b89de88a92e69e9ce5b9b2","适量","切丝芒果干"],["vibe-e58887e4b89de69fb3e6a999e5b9b2","适量","切丝柳橙干"]],"pantry":[],"steps":[["泡制奇亚籽","将奇亚籽放入牛奶中浸泡 10 分钟。"],["备果肉丁","在泡籽的过程中，把半粒芒果和葡萄柚去皮并切成丁，放入杯中。"],["制作芒果椰泥","将剩下的半粒芒果切小块，放入调理机，加入冰块和椰奶打成泥状。"],["组装甜品","将芒果椰泥倒入杯中，放上点缀用的芒果干丝和柳橙干丝（如有）。"],["享用","一边享用一边写代码！！"]]},
  {"id":"drink_yin-du-nai-cha--masala-chai","name":"印度奶茶 (Masala Chai)","category":"饮料","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/drink_yin-du-nai-cha--masala-chai.jpg","sourcePath":"dishes/drink/奶茶.md","calories":135,"tips":["CTC 红茶因其颗粒细碎，是制作印度奶茶的最佳选择，祁门红茶或滇红可作为替代。","牛奶和水的比例可灵活调整：喜欢浓郁则多奶，喜欢清爽则多水。","生姜是印度奶茶的灵魂，不建议省略。","如果不习惯过甜，可以适当减少糖量。","印度街头通常使用陶土杯(Kulhad)盛茶，会赋予茶汤独特的泥土芬芳。"],"required":[["vibe-e7baa2e88cb6","8g (约 2 茶匙)","红茶"],["vibe-e585a8e88482e7899be5a5b6","120ml","全脂牛奶"],["ginger","5g (约 1cm 一块)","生姜"],["vibe-e7bbbfe889b2e5b08fe8b186e894bb","2 颗","绿色小豆蔻"],["vibe-e88289e6a182e6a392","1 小段 (约 2cm)","肉桂棒"],["vibe-e4b881e9a699","2 颗","丁香"],["vibe-e9bb91e883a1e6a492e7b292","2 颗","黑胡椒粒"]],"optional":[],"pantry":[["water","120ml","水"],["sugar","10-15g","糖"]],"steps":[["处理生姜","将生姜拍碎（不用切太碎，拍开即可释放姜汁）。"],["处理豆蔻","将小豆蔻用刀背拍开，露出里面的籽。"],["处理黑胡椒","将黑胡椒粒拍碎。"],["烧水","在小奶锅中倒入 120ml 水。"],["加入香料","放入拍碎的生姜、小豆蔻、肉桂棒、丁香、黑胡椒粒。"],["熬煮香料","大火煮沸后转小火，煮 2 分钟，让香料的味道充分释出。"],["煮茶","加入红茶 8g，继续小火煮 2 分钟，直至茶汤颜色变深。"],["加入牛奶","倒入全脂牛奶 120ml。"],["加热观察","中火加热，注意观察，当奶茶开始冒泡上升时立即转小火。"],["拉茶融合","小火煮 2-3 分钟，期间可以将锅提起倒回（反复提拉 3-4 次），使茶汤与牛奶充分融合。"],["调味","加入糖，搅拌溶解。"],["关火","完成烹煮，关闭火源。"],["过滤","用滤网过滤到茶盏中，去除茶叶和香料残渣。"],["享用","趁热饮用。"]]},
  {"id":"drink_zhang-dao-bing-cha","name":"长岛冰茶","category":"饮料","servings":1,"minutes":5,"difficulty":"简单","coverPath":"ai-generated/drink_zhang-dao-bing-cha.jpg","sourcePath":"dishes/drink/长岛冰茶.md","calories":281,"tips":["长岛冰茶不含茶，却因各种酒液混合后呈现出冰茶的色泽和口感","该酒酒精度约 15%，口感柔和但后劲较强，请适量饮用","参考国际调酒师协会 (IBA) 标准调制，确保风味正宗"],"required":[["vibe-e98791e98592","15ml","金酒"],["vibe-e9be99e8888ce585b0e98592","15ml","龙舌兰酒"],["vibe-e4bc8fe789b9e58aa0","15ml","伏特加"],["vibe-e799bde69c97e5a786e98592","15ml","白朗姆酒"],["vibe-e6a999e591b3e7949ce98592","15ml","橙味甜酒"],["vibe-e69fa0e6aaac","1个","柠檬"],["vibe-e69eabe7b396e6b586","20ml","枫糖浆"],["vibe-e58fafe4b990","75ml","可乐"],["vibe-e586b0e59d97","100克","冰块"]],"optional":[],"pantry":[],"steps":[["准备柠檬汁","柠檬对半切，利用榨汁器挤出 30ml 柠檬汁至高球杯中。"],["加入基酒","依次向杯中加入：15ml 金酒，15ml 龙舌兰酒，15ml 伏特加，15ml 白朗姆酒，15ml 橙味甜酒。"],["加入甜味剂","向杯中缓慢倒入 20ml 枫糖浆，边倒边用吧勺搅拌均匀。"],["加入可乐","向杯中加入 75ml 可乐。"],["填充冰块","向杯中加入冰块直至满杯。"],["最后搅拌","用吧勺轻轻搅拌 20 秒，使所有成分冷却并混合均匀。"],["享用","开始享用这杯清爽的经典鸡尾酒。"]]},
  {"id":"meat_dish_bai-cai-zhu-rou-dun-fen-tiao","name":"白菜猪肉炖粉条","category":"荤菜","servings":1,"minutes":45,"difficulty":"中等","coverPath":"ai-generated/meat_dish_bai-cai-zhu-rou-dun-fen-tiao.jpg","sourcePath":"dishes/meat_dish/白菜猪肉炖粉条.md","calories":1880,"tips":["土豆干粉条煮制时间长，建议放在第一步，利用浸泡时间进行其他准备工作。","最后一步尝味非常重要，如果发现味道淡或食材未熟，应继续加盖炖煮一段时间。"],"required":[["porkBelly","300g","五花肉"],["cabbage","500g","大白菜"],["vibe-e59c9fe8b186e5b9b2e7b289e69da1","50g","土豆干粉条"],["vibe-e58d81e4b889e9a699","10g","十三香"]],"optional":[],"pantry":[["vibe-e9b8a1e7b2be","5g","鸡精"],["salt","15g","食用盐"],["darkSoy","5ml","老抽"],["soy","5ml","生抽"],["oil","15ml","食用油"]],"steps":[["预处理粉条","锅内烧水，水开后放入干粉条，煮 5 分钟后同水一起倒出容器中，盖上盖子继续浸泡备用。"],["切配五花肉","五花肉切成 3mm 厚的肉片，备用。"],["切配大白菜","大白菜洗净，将嫩叶与白菜帮子分开切成 2 份菜片，备用。"],["热锅起油","热锅，锅内放入 10ml - 15ml 食用油。等待 10 秒让油温升高。"],["煸炒肉片","放入五花肉，保持翻炒至肉变色。"],["肉片上色","加入老抽，炒 1 分钟，给肉上色。"],["炒制白菜帮","加入白菜帮子，加入食用盐、生抽，炒一分钟。"],["加水炖煮","加水没过所有食材，加入鸡精、十三香，沸腾后将火调小，然后等待 20 分钟。"],["处理粉条","将浸泡好的粉条滤水，切成小段放入碗中备用。"],["加入嫩叶与粉条","加入白菜嫩叶，炒匀后将粉条放在菜上方，加盖再煮 5 分钟。"],["尝味收汁","尝味、关火，适当收汁即可上桌。"]]},
  {"id":"meat_dish_dai-ba-zhou-zi","name":"带把肘子","category":"荤菜","servings":3,"minutes":30,"totalMinutes":210,"waitMinutes":180,"difficulty":"较难","coverPath":"ai-generated/meat_dish_dai-ba-zhou-zi.jpg","sourcePath":"dishes/meat_dish/带把肘子.md","calories":1037,"tips":["肘子七成熟需要根据实际情况判断，新手可观察肉质色泽或请教有经验者。","蒸锅下半部放水，上半部放肘子，蒸制过程中需及时补充热水防止蒸干。","蘸食甜面酱和葱段是传统吃法，能有效解腻增香。"],"required":[["vibe-e5b8a6e8849ae38081e788aae78caae5898de88298","1个(约1250g)","带脚、爪猪前肘"],["vibe-e7baa2e8b186e88590e4b9b3","1块(约10g)","红豆腐乳"],["vibe-e7949ce99da2e985b1","150g","甜面酱"],["vibe-e7b2bee79b90","15g","精盐"],["vibe-e7baa2e985b1e6b2b9","35g","红酱油"],["vibe-e799bde985b1e6b2b9","25g","白酱油"],["vibe-e8929ce78987","50g","蒜片"],["ginger","10g","姜末"],["vibe-e6a182e79aae","5g","桂皮"],["scallion","200g","葱"]],"optional":[],"pantry":[["wine","25g","料酒"],["starAnise","3个","八角"]],"steps":[["刮洗摆放","将肘子刮洗干净，肘头朝外、肘把（脚爪）朝里、肘皮朝下放在案板上。"],["剖皮剔骨","用刀在正中由肘头向肘把沿着腿骨将皮剖开，剔去腿骨两边的肉，使骨头露出，然后用小斧头将两节腿骨由中间砸断，保持底部骨肉相连。"],["煮制上色","肘子放入煮锅煮至七成熟捞出（内部呈淡红色），用干净抹布擦干水，趁热用红酱油涂抹肉皮。"],["装锅定形","取蒸锅一个，锅底放入八角、桂皮。将肘把关节处掰断（不伤皮），肘皮朝下装入锅内，肘把贴边窝成圆形。"],["抹酱蒸制","撒入精盐，覆盖消毒纱布。将甜面酱(50g)、葱(75g)、红豆腐乳、红白酱油、姜、蒜在纱布上抹开，旺火蒸约三小时。"],["扣盘上桌","蒸完取出，揭去纱布，扣入盘中，拣去八角。随碟带葱段和剩余甜面酱上桌。"]]},
  {"id":"meat_dish_fan-qie-hong-jiang","name":"番茄红酱","category":"荤菜","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/meat_dish_fan-qie-hong-jiang.jpg","sourcePath":"dishes/meat_dish/番茄红酱.md","calories":1955,"tips":["考虑各个品牌的番茄酱内含盐量不同，建议在炒牛肉时少放盐，煮的时候尝一下再调味","煮酱料期间请搅动，以免粘锅。如果酱料变粘稠就可以出锅啦！","可根据个人口味，将碎牛肉替换成一半碎猪肉一半碎牛肉，牛奶替换成鸡汤或饮用水"],"required":[["vibe-e7a28ee7899be88289","500g","碎牛肉"],["garlic","2个","蒜瓣"],["carrot","半根","胡萝卜"],["celery","1根","芹菜"],["onion","半个","洋葱"],["vibe-e9bb91e883a1e6a492e7b289","5g","黑胡椒粉"],["vibe-e795aae88c84e985b1","300g","番茄酱"],["milk","300ml","牛奶"]],"optional":[["vibe-e5b9b2e7bd97e58b92e68896e799bee9878ce9a699","适量","干罗勒或百里香"]],"pantry":[["vibe-e6a984e6a684e6b2b9","20ml","橄榄油"],["sugar","2g","糖"],["salt","10g","食盐"]],"steps":[["食材预处理","将胡萝卜、芹菜、洋葱切碎，蒜瓣切片。"],["煸炒蔬菜","加入 10ml 橄榄油，热油下锅蔬菜，大火翻炒开始略微变色后盛出。"],["炒制牛肉","锅内加油 10ml，加蒜翻炒 10 秒，加入碎牛肉、糖、盐、胡椒粉和香料将牛肉炒脆（有颗粒感）。"],["混合底酱","加入炒好的蔬菜们和番茄酱继续翻炒，搅拌均匀。"],["慢火熬煮","分多次缓缓倒入牛奶，中小火煮 30 分钟，完成。"]]},
  {"id":"meat_dish_fen-zheng-rou","name":"粉蒸肉","category":"荤菜","servings":1,"minutes":90,"difficulty":"中等","coverPath":"ai-generated/meat_dish_fen-zheng-rou.jpg","sourcePath":"dishes/meat_dish/粉蒸肉.md","calories":1606,"tips":["如需自制米粉，可将大米 150g 炒至微黄色（约 8 分钟），加入干辣椒、花椒、八角炒香后打碎过筛","蒸制期间如水量低于锅底高度 1cm，应立即补充 500ml 90°C 以上的热水，以维持蒸汽充足"],"required":[["porkBelly","500g","五花肉"],["vibe-e892b8e88289e7b1b3e7b289","100g","蒸肉米粉"],["ginger","10g","姜末"],["garlic","10g","蒜末"],["potato","300g","土豆"]],"optional":[["vibe-e983abe58ebfe8b186e793a3e985b1","10g","郫县豆瓣酱"]],"pantry":[["soy","15ml","生抽"],["darkSoy","10ml","老抽"],["wine","15ml","料酒"],["sugar","5g","白砂糖"],["water","2000ml","清水"]],"steps":[["食材处理","将五花肉洗净，切成长约 5cm、宽约 3cm、厚度约 0.5cm 的肉片"],["准备辅料","将姜、蒜切成颗粒直径不大于 1mm 的细末"],["调味拌匀","取一大碗，放入切好的五花肉、15ml 生抽、10ml 老抽、15ml 料酒、10g 郫县豆瓣酱、10g 姜末、10g 蒜末、5g 白砂糖，用筷子搅拌均匀"],["静置腌制","盖上保鲜膜，室温(20°C - 25°C)静置腌制 30 分钟"],["裹米粉","腌制完成后，加入 100g 蒸肉米粉，继续翻拌 2 分钟，确保每片肉都均匀裹粉"],["准备垫底食材","土豆去皮，切片厚度控制在 0.8cm，片面积约为 5cm x 5cm，重量控制在 300g"],["容器铺底","在直径 20cm 的深碗底部铺满土豆片，尽量无重叠"],["码放食材","将拌好粉的五花肉均匀铺在土豆片上，压实"],["烧水准备","蒸锅中加入 2000ml 清水，开火加热至水面持续冒泡(100°C)"],["入锅蒸制","将装好食材的碗放入蒸锅内，盖好锅盖，保持中火蒸 60 分钟"],["熟度检查","时间结束后，用筷子插入肉块中央，若能轻松穿透并无明显阻力，则表明蒸熟"]]},
  {"id":"meat_dish_fu-ru-rou","name":"腐乳肉","category":"荤菜","servings":1,"minutes":60,"difficulty":"较难","coverPath":"ai-generated/meat_dish_fu-ru-rou.jpg","sourcePath":"dishes/meat_dish/腐乳肉.md","calories":1190,"tips":["建议用单晶冰糖，成色更透亮。","腐乳自带咸鲜味，通常不需要额外放盐。","大火收汁是关键，需全程看守并晃动锅具。","参考资料：下厨房《腐乳肉的做法》"],"required":[["vibe-e5b8a6e79aaee4ba94e88ab1e88289","400g","带皮五花肉"],["vibe-e7baa2e88590e4b9b3","30g（约 2 块）","红腐乳"],["vibe-e88590e4b9b3e6b181","15ml","腐乳汁"],["vibe-e891b1e799bd","15g","葱白"],["ginger","10g","生姜"]],"optional":[["scallion","5g","葱花"]],"pantry":[["rockSugar","25g","冰糖"],["darkSoy","5ml","老抽"],["wine","15ml","料酒"],["water","500ml","清水"],["oil","10ml","食用油"]],"steps":[["改刀切块","将带皮五花肉切成长宽约 2.5 cm 的均匀小块。"],["冷水焯水","锅内加入冷水、料酒和姜片，放入五花肉块，开火加热至沸腾后捞出，沥干水分。"],["调配酱汁","将玫瑰腐乳块和腐乳汁在碗中碾成泥，加入冰糖、老抽混合均匀调成酱汁。"],["煸炒肉块","热锅冷油，下葱白和姜片爆香，倒入五花肉块煸炒至表面金黄微焦。"],["加入酱汁","倒入调好的腐乳酱汁，翻炒均匀使肉块上色，随后加入热水没过肉块。"],["小火慢炖","盖上锅盖，转小火慢炖约 40 分钟。"],["大火收汁","打开锅盖，转大火收汁。观察到汤汁变得浓稠并冒出密集的“鱼眼泡”时，关火出锅。"]]},
  {"id":"meat_dish_gu-lu-rou","name":"咕噜肉","category":"荤菜","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/meat_dish_gu-lu-rou.jpg","sourcePath":"dishes/meat_dish/咕噜肉.md","calories":673,"tips":["想让肉更有层次可以在生粉中加鸡蛋，炸出来会更香脆","炸肉的火候是关键，复炸不可省略","菠萝建议使用罐头的，酸甜度更均衡"],"required":[["vibe-e6a285e5a4b4e78caae88289","100g","梅头猪肉"],["vibe-e99d92e6a492","25g","青椒"],["vibe-e7bd90e5a4b4e88fa0e8909de78987","75g","罐头菠萝片"],["vibe-e88c84e6b181","4 汤匙","茄汁"],["vibe-e8929ce89389","1 汤匙","蒜蓉"]],"optional":[],"pantry":[["salt","3/4 茶匙","盐"],["vibe-e799bde9868b","2 茶匙","白醋"],["soy","1/2 茶匙","生抽"],["starch","8 1/2 茶匙","生粉"],["sugar","2 汤匙","白砂糖"],["water","200 毫升","水"],["oil","500 毫升","食用油"]],"steps":[["食材预处理","将梅头猪肉（100 克）洗净，然后用厨房纸抹干水份，将猪肉切成比想要的成品小一圈的大小。"],["腌制猪肉","用盐（1/2 茶匙）腌制梅头猪肉 20 分钟。"],["切配青椒","将青椒（25 克）切碎。"],["切配菠萝","将菠萝片（75 克）切件。"],["调制酱汁","在碗中加入茄汁（4 汤匙）﹑白醋（2 茶匙）﹑蒜蓉（1 汤匙）﹑生抽（½ 茶匙）﹑生粉（2½ 茶匙）﹑白砂糖（2 汤匙）﹑盐（¼ 茶匙）和水（200 毫升），拌匀成酱汁。"],["挂粉","将梅头猪肉粒沾上生粉（6 汤匙）。"],["热油","加入油（500 毫升）中火加热。"],["初炸","将梅头猪肉粒放至锅里中火炸 5 分钟，然后盛起。"],["复炸","加入梅头猪肉粒，再大火翻炸 1 分钟。"],["熬制酱汁","加入油（1 茶匙）和酱汁，中火加热 3 分钟。"],["加入配菜","加入青椒和菠萝，大火加热 2 分钟。"],["最后拌匀","将已炸好的梅头猪肉粒与酱汁拌匀即可。"]]},
  {"id":"meat_dish_hong-shao-ji-chi","name":"红烧鸡翅","category":"荤菜","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/meat_dish_hong-shao-ji-chi.jpg","sourcePath":"dishes/meat_dish/红烧鸡翅.md","calories":1016,"tips":["如果闻着有腥味，可以增加一倍香料用量。","炒糖色是关键，火候不宜过大防止变苦。","收汁阶段必须人在锅旁，防止焦糊。"],"required":[["vibe-e696b0e9b29ce9b8a1e7bf85","500g(约8-10个)","新鲜鸡翅"],["ginger","10g(4-5片)","姜片"],["vibe-e891b1e6aeb5","15g(2-3段)","葱段"],["garlic","15g(3-4瓣)","大蒜"],["vibe-e9a699e58fb6","1片","香叶"],["vibe-e9bb84e98592e68896e69699e98592","35ml","黄酒或料酒"],["vibe-e799bde88a9de9babb","3g","白芝麻"],["vibe-e5b08fe891b1e88ab1","5g","小葱花"]],"optional":[["chili","5g(2个)","干辣椒"]],"pantry":[["starAnise","1个","八角"],["rockSugar","15g","冰糖"],["soy","15ml","生抽"],["darkSoy","5ml","老抽"],["salt","3g","盐"],["sugar","2g","白糖"],["whitePepper","1g","胡椒粉"],["oil","10-15ml","食用油"]],"steps":[["处理鸡翅","将鸡翅洗净。用刀在鸡翅厚处划三刀，背面扎一刀，便于入味。"],["可选去腥","如果鸡翅不新鲜，可在打完花刀之后用姜水泡 10-20 分钟。"],["准备辅料","将10g姜片、15g葱段备好；3-4瓣大蒜用刀拍散；准备好香叶、八角、干辣椒。"],["焯水去血沫","锅中加入清水没过鸡翅，冷水下锅，加入20ml料酒、2片姜片，大火烧开后煮2-3分钟，撇去浮沫。"],["清洗控干","捞出鸡翅，用温水清洗2遍去除血沫，控干水分备用。"],["热锅下油","另起锅，开火烧热后放入10-15ml食用油。"],["炒糖色","油温5成热入冰糖，大火熬化后转小火，炒至枣红色，立即下鸡翅翻炒1-2分钟裹色。"],["煸炒香料","加入香叶、八角、干辣椒、余下的姜片、葱段、大蒜，煸炒30秒。"],["烹入调料","沿锅边淋入15ml料酒、15ml生抽，快速翻炒10秒。"],["加温水","加入温水（约50-60℃），水量稍微没过所有鸡翅。"],["二次调味","加入老抽、盐、白糖、胡椒粉，搅拌均匀。"],["中火焖煮","盖盖，开中火烧煮7-8分钟。"],["剔除料渣","打开锅盖，将锅中的香叶、八角、姜片、葱段、大蒜捡出丢弃。"],["大火收汁","转大火，不断翻炒，将汤汁烧至粘稠状态（约1-2分钟）。"],["装盘","关火盛盘，淋上锅中剩余的粘稠汤汁。"],["点缀","最后撒上白芝麻和小葱花，完成制作。"]]},
  {"id":"meat_dish_hu-pi-zhou-zi","name":"虎皮肘子","category":"荤菜","servings":1,"minutes":150,"difficulty":"较难","coverPath":"ai-generated/meat_dish_hu-pi-zhou-zi.jpg","sourcePath":"dishes/meat_dish/虎皮肘子.md","calories":1018,"tips":["本菜制作包含油炸和高压过程，建议有烹饪基础者尝试","油炸是形成虎皮纹路的关键，不可省略","收汁时要不断观察汤汁余量，避免烧焦","参考资料：Bilibili老饭骨的视频教程 (BV1P4421c7s5)"],"required":[["vibe-e78caae5898de88298","1个","猪前肘"],["vibe-e9a39fe794a8e6a48de789a9e6b2b9","1桶","食用植物油"],["vibe-e9a699e58fb6","3片","香叶"],["vibe-e88289e6a182e79aae","2-3克","肉桂皮"],["vibe-e8b186e894bb","3个","豆蔻"],["vibe-e88ab1e6a492","8-12个","花椒"],["vibe-e5a4a7e69699","2-4个","大料"],["scallion","2棵","葱"],["ginger","6克","姜"],["garlic","6粒","蒜"]],"optional":[],"pantry":[["rockSugar","5桶","冰糖"],["salt","1-2茶匙","盐"],["darkSoy","1茶匙","老抽"],["soy","1汤匙","生抽"],["vibe-e799bde9868b","1汤匙","白醋"],["starch","1汤匙","淀粉"],["wine","2汤匙","料酒"],["water","适量","水"]],"steps":[["泡血水","猪肘解冻后放入清水中浸泡1小时，去除多余血水。"],["烧猪皮","使用火焰喷枪灼烧皮面至棕黑色以去毛除汗腺；若无喷枪，可使用热铁锅烫皮至棕色。"],["刷洗除黑","用清洁球在水中刷洗猪肘，去除表面烧焦的黑色部分。"],["焯水去腥","冷水入锅，加入葱、姜、蒜、料酒，烧开后煮5分钟，取出猪肘并保留过滤后的肉汤。"],["高温油炸","五成油温下入猪肘，小火炸制约20分钟，期间不断淋油并定时翻面，炸至皮呈浅棕色、瘦肉微焦。"],["炒糖色","炒制200ml糖色备用。"],["加压炖煮","高压锅内放入猪肘、肉汤、糖色、香料及调味料，放入葱姜蒜，加压炖煮40分钟。"],["大火收汁","取出猪肘入盘，将剩余肉汤移至铁锅大火收浓，加入水淀粉勾芡，待汤汁红棕粘稠后淋在猪肘上。"]]},
  {"id":"meat_dish_huang-gua-chao-rou","name":"黄瓜炒肉","category":"荤菜","servings":1,"minutes":25,"difficulty":"中等","coverPath":"ai-generated/meat_dish_huang-gua-chao-rou.jpg","sourcePath":"dishes/meat_dish/黄瓜炒肉.md","calories":550,"tips":[],"required":[["cucumber","100g","黄瓜"],["vibe-e78caae798a6e88289","50g","猪瘦肉"],["garlic","2瓣","蒜"],["vibe-e5b08fe7b1b3e8bea3","1根","小米辣"]],"optional":[],"pantry":[["oil","50g","食用油"],["soy","5g","生抽"],["salt","10g","盐"]],"steps":[["腌制猪肉","将猪瘦肉切片，放入碗中，倒入食用油 10 克，生抽，搅拌均匀，腌制 10 分钟。"],["处理黄瓜","将黄瓜切去 5 厘米的头尾，剩余部分斜着切成 0.5 厘米的薄片。"],["腌制黄瓜","将黄瓜倒入碗中，撒上盐 8 克，搅拌均匀，腌制 5 分钟。"],["准备蒜末","将蒜瓣去皮，压扁，切成蒜末备用。"],["切小米辣","将小米辣去丁切分成均匀 0.5 厘米的段状。"],["爆香底料","热锅，倒油 40 克，等油温到冒烟，放入蒜蓉小米辣翻炒 5 次。"],["炒制猪肉","放入腌制好的猪瘦肉，翻炒至肉熟变色。"],["合炒出锅","放入黄瓜，加入盐 2 克，大火翻炒均匀半分钟，出锅。"]]},
  {"id":"meat_dish_huang-men-ji","name":"黄焖鸡","category":"荤菜","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/meat_dish_huang-men-ji.jpg","sourcePath":"dishes/meat_dish/黄焖鸡.md","calories":766,"tips":["炒糖色环节稍有挑战，但可用老抽替代，整体难度不高"],"required":[["thigh","两只","鸡腿"],["mushroom","5 朵","香菇"],["vibe-e99d92e6a492","两个","青椒"],["vibe-e7949fe5a79ce78987","两片","生姜片"],["chili","5-6 个","干辣椒"]],"optional":[["potato","一个","土豆"]],"pantry":[["salt","10g","盐"],["wine","10ml","料酒"],["whitePepper","5g","白胡椒粉"],["sugar","5g","白糖"],["vibe-e985b1e6b2b9","5ml","酱油"],["vibe-e591b3e7b2be","适量","味精"]],"steps":[["鸡肉预处理","鸡腿洗净，剁成4cm大小的块"],["处理辅料","生姜切片、干辣椒切成小圈"],["准备蔬菜和香菇水","香菇切片，青椒切成细长的马蹄状，若为干香菇，洗净灰尘后泡一晚上并留香菇水备用"],["切土豆块","若有土豆，切为与鸡肉大小类似的滚刀块"],["炒糖色","锅里倒入底油，冷油时放入白糖，小火慢慢加热，待油温逐渐升高，白糖开始融化并变成较深的棕色"],["炒制鸡肉","迅速倒入鸡块，转大火，快速翻炒！烹入料酒，继续翻炒片刻"],["加入辛香料","将生姜片和干辣椒倒入"],["调色","放入酱油，炒匀"],["加水焖煮","倒入香菇水或清水，以能淹住鸡肉为准"],["放入配料","倒入香菇片，白胡椒粉，盐，土豆"],["中小火焖煮","翻炒均匀后，盖上锅盖焖煮，转中小火15——20分钟，有条件可以转至砂锅"],["加入青椒","待鸡肉软烂，汤汁浓稠后（汤汁不要收的太干），最后放入青椒"],["最后调味","放入味精，兜炒均匀后，关火！青椒基本断生即可，不要炒时间久了"]]},
  {"id":"meat_dish_huang-you-ji","name":"黄油鸡","category":"荤菜","servings":1,"minutes":105,"difficulty":"中等","coverPath":"ai-generated/meat_dish_huang-you-ji.jpg","sourcePath":"dishes/meat_dish/黄油鸡.md","calories":641,"tips":["干葫芦巴叶(Kasuri Methi)是独特风味的关键，强烈推荐使用。","使用 Kashmiri 红辣椒粉可以获得鲜红的颜色而不会过辣。","如果对坚果过敏，可以用等量的淡奶油替代腰果来增稠。","建议搭配印度烤饼(Naan)或巴斯马蒂米饭食用。","黄油鸡是印度料理的全球代表作，掌握好香料平衡是核心。"],"required":[["vibe-e9b8a1e885bfe88289efbc88e58ebbe9aaa8efbc89","500g","鸡腿肉（去骨）"],["vibe-e985b8e5a5b6","80ml","酸奶"],["vibe-e9bb84e6b2b9","50g","黄油"],["vibe-e6b7a1e5a5b6e6b2b928486561767920437265616d29","100ml","淡奶油(Heavy Cream)"],["tomato","5个（约500g）","番茄"],["onion","1个（约100g）","洋葱"],["vibe-e885b0e69e9c","30g","腰果"],["vibe-e7baa2e8bea3e6a492e7b289","10g","红辣椒粉"],["vibe-e58db0e5baa6e7bbbce59088e9a699e69699e7b28928476172616d204d6173616c6129","3g","印度综合香料粉(Garam Masala)"],["ginger","20g","生姜"],["garlic","8瓣（约24g）","大蒜"],["vibe-e69fa0e6aaace6b181","15ml","柠檬汁"]],"optional":[["vibe-e5b9b2e891abe88aa6e5b7b4e58fb6284b6173757269204d6574686929","3g","干葫芦巴叶(Kasuri Methi)"]],"pantry":[],"steps":[["腌制鸡肉","在大碗中混合酸奶、生姜泥、大蒜泥、红辣椒粉、姜黄粉、盐、柠檬汁，放入鸡肉块充分裹匀，盖保鲜膜冷藏腌制至少1小时。"],["煎烤鸡肉","平底锅热油，大火煎鸡肉至两面焦黄（每面约3分钟），无需全熟，盛出备用。"],["制作酱汁底料","锅中加入番茄、洋葱、腰果、姜、蒜和100ml水，煮沸后转中火煮15分钟至食材软烂。"],["搅拌与过滤","将煮好的料稍微冷却后，用搅拌机打成细腻泥状，再用滤网过滤一遍，去除渣滓。"],["炒制酱汁","炒锅中融化黄油，倒入过滤后的酱汁，加入红辣椒粉、香菜粉、孜然粉、盐翻炒3-5分钟至油花浮出。"],["炖煮融合","放入鸡肉块，加入糖和淡奶油搅拌均匀，小火炖煮10-12分钟使鸡肉熟透入味。"],["最后调味","加入印度综合香料粉、小豆蔻粉，撒入用手搓碎的干葫芦巴叶，搅拌均匀后关火盛盘。"]]},
  {"id":"meat_dish_jian-jiao-chao-niu-rou","name":"尖椒炒牛肉","category":"荤菜","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/meat_dish_jian-jiao-chao-niu-rou.jpg","sourcePath":"dishes/meat_dish/尖椒炒牛肉.md","calories":449,"tips":["腌制可以加入小苏打使牛肉变嫩，牛肉苏打比例为 500g：3g。","腌制的时候姜片可用料酒代替，料酒的用量为 3 g/人。","牛肉切片时应逆着纹路切，这样纤维被切断后口感更好。"],"required":[["vibe-e7899be88289","250g","牛肉"],["scallion","0.5根","葱"],["ginger","1个","姜"],["garlic","3瓣","蒜"],["vibe-e5b096e6a492","2个","尖椒"]],"optional":[["vibe-e5b08fe88b8fe68993","1.5g","小苏打"],["wine","3g","料酒"]],"pantry":[["vibe-e985b1e6b2b9","9ml","酱油"],["salt","3g","盐"],["sugar","1.5g","糖"]],"steps":[["配菜切制","将蒜剁成蒜泥，葱切段，姜切成姜片，尖椒切成段。"],["牛肉腌制","牛肉放入碗中，加入姜片（或料酒）、盐、酱油、糖进行腌制 30-40 分钟。"],["爆香底料","冷油下锅，待油变热至偶有气泡，加入蒜泥炒至金黄色。"],["炒制尖椒","加入尖椒段，翻炒至表皮微皱。"],["加入牛肉翻炒","加入腌制好的牛肉快速翻炒。"],["收尾出锅","在牛肉变熟之前加入葱段，继续翻炒至牛肉完全变熟，关火出锅。"]]},
  {"id":"meat_dish_jiao-yan-pai-tiao","name":"椒盐排条","category":"荤菜","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/meat_dish_jiao-yan-pai-tiao.jpg","sourcePath":"dishes/meat_dish/椒盐排条.md","calories":1290,"tips":["也可以用面包糠代替炸糊，但口感差距很大","炸糊也可以用来炸鸡腿、炸鱼等","炸制过程中注意控制油温，避免外焦里生"],"required":[["vibe-e5a4a7e68e92","4块(约360g)","大排"],["egg","1个(50g)","鸡蛋"],["vibe-e6a492e79b90e7b289","10g","椒盐粉"],["vibe-e891b1e5a79ce6b0b4","100ml","葱姜水"],["flour","80g","面粉"]],"optional":[["vibe-e59089e5a3abe7b289","2-3g","吉士粉"]],"pantry":[["salt","1g","盐"],["starch","80g","淀粉"],["water","10g","水"],["oil","10g","油"]],"steps":[["食材处理","大排洗干净，剔骨，用刀面拍松，切成厚片，再改成粗条。"],["腌制肉条","加入椒盐粉，搅匀，待到出胶质了分次加入葱姜水，放入冰箱腌制 20 分钟。"],["准备炸粉","制作炸糊。放入 80 g 面粉，20 g 淀粉（注意是 20 g 淀粉，剩下 60 g 备用），2 - 3 g 吉士粉，盐 1 g。"],["调制炸糊","打入一个鸡蛋，搅拌，再分次加入水 100 g ，再加 10 g 油，反复搅拌。直到炸糊完全调开，略粘稠即可。"],["上浆裹粉","取出剩余的 60 g 淀粉，取出排条，裹上一层淀粉，再裹上面糊。"],["初炸定型","锅中加入油，能没过食材即可，加热到大约 150 ℃ - 160 ℃ 。下入排条炸成浅金黄色后捞出。"],["复炸酥脆","待油温再次升高到 150 ℃ - 160 ℃ 时，下入排条复炸至金黄色后捞出。"],["撒粉出锅","撒上椒盐粉，搅拌均匀后出锅。"]]},
  {"id":"meat_dish_kao-ji-chi","name":"烤鸡翅","category":"荤菜","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/meat_dish_kao-ji-chi.jpg","sourcePath":"dishes/meat_dish/烤鸡翅.md","calories":187,"tips":["可以在腌制鸡翅时加入蜂蜜、酱油、姜蒜粉、五香粉等作为调味料，提升口感和香气","烤鸡翅时，建议将烤盘底部垫上一层锡纸，便于清洁烤盘","如果喜欢甜口，可以在最后 5 分钟在表面刷一层蜂蜜水"],"required":[["vibe-e9b8a1e7bf85e4b8ad","3-4个","鸡翅中"],["vibe-e9bb91e883a1e6a492e7b289","1g","黑胡椒粉"]],"optional":[],"pantry":[["salt","2g","盐"],["vibe-e985b1e6b2b9","3ml","酱油"],["wine","3ml","料酒"]],"steps":[["准备鸡翅","将鸡翅洗净擦干水分，放入大碗中备用。"],["腌制鸡翅","在碗中加入盐、黑胡椒粉、酱油、料酒，充分抓匀，腌制 30-40 分钟。"],["预热烤箱","将烤箱温度设定为 200℃ 进行预热。"],["摆盘准备","在烤盘上垫好锡纸，将腌制好的鸡翅均匀地平铺在烤盘上。"],["第一阶段烤制","将烤盘放入烤箱中层，设定烤制 15-20 分钟。"],["翻面烤制","取出烤盘，用夹子将鸡翅逐一翻面，再次放入烤箱烤 15-20 分钟，直到两面金黄熟透。"]]},
  {"id":"meat_dish_ke-le-ji-chi","name":"可乐鸡翅","category":"荤菜","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/meat_dish_ke-le-ji-chi.jpg","sourcePath":"dishes/meat_dish/可乐鸡翅.md","calories":960,"tips":["加入生姜爆香的同时能防止鸡翅粘锅。","最后收汁时勿开过大火，防止味道偏苦。","本菜品偏甜。"],"required":[["vibe-e9b8a1e7bf85e4b8ad","10 ～ 12 只","鸡翅中"],["vibe-e58fafe4b990","500ml","可乐"],["ginger","2 片","生姜"],["scallion","1 结","小葱"]],"optional":[],"pantry":[["sugar","10 克","白糖"],["soy","15 克","生抽"],["darkSoy","3 克","老抽"],["salt","2 克","盐"],["wine","20 毫升","料酒"]],"steps":[["焯水去腥","鸡翅入锅，倒入冷水淹没。放生姜 1 片和料酒 10 ～ 20 毫升。大火煮开（大约 2 分钟）后，撇去浮沫，沥出水分。"],["改刀腌制","捞出鸡翅，用刀将两边各划上两口改刀。用生抽约 10 克腌制鸡翅 10 分钟。"],["煎制鸡翅","锅重新小火起油，先将剩余姜片爆香，然后下入腌好的鸡翅。将鸡翅煎至两面金黄，用炒菜勺子翻动一下鸡翅，与姜片一起翻炒 4～5 下。"],["加入可乐","鸡翅金黄后，倒入可乐没过鸡翅，开大火将锅中可乐煮沸，撇去漂浮的黑色浮沫（包含血水）。此时加入葱结。"],["调味","加入食用盐 2 克，白糖 10 克，生抽 3 克调味，并加入 3 克老抽调底色。"],["中火慢煮","等到葱结变黄，和姜片一起捞出，转中火继续慢煮可乐鸡翅。"],["收汁出锅","等到可乐呈现挂丝状态，关小火让汁牢牢挂在鸡翅上。出锅，装盘。"]]},
  {"id":"meat_dish_la-jiao-chao-rou","name":"辣椒炒肉","category":"荤菜","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/meat_dish_la-jiao-chao-rou.jpg","sourcePath":"dishes/meat_dish/辣椒炒肉.md","calories":425,"tips":["辣椒只能选择青椒，螺丝椒为最优解，切勿选择其他品种辣椒！","掌握干煸和快炒的火候是成功的关键","猪肉切片时注意观察纹路，呈“川”字状为佳"],"required":[["vibe-e99d92e6a492","3个","青椒"],["vibe-e78caae798a6e88289","200g","猪瘦肉"],["garlic","5g","大蒜"],["ginger","5g","姜"]],"optional":[["vibe-e985b1e6b2b9","2ml","酱油"],["vibe-e8b186e8b189","3g","豆豉"]],"pantry":[["salt","3g","盐"],["soy","3ml","生抽"],["oysterSauce","3ml","蚝油"],["oil","8ml","油"]],"steps":[["处理青椒","将青椒洗净，去除青椒把以及青椒籽，再用滚刀手法切好备用。"],["准备配料","大蒜用刀拍一下，再横切成蒜瓣，生姜切碎成姜末。"],["切制猪肉","将猪瘦肉切成肉片（顺着猪肉的纹理切，即刀和肉的纹理呈水平线，出来的肉片，纹路呈“川”字）。"],["腌制猪肉","将切好的猪肉洗净，放入空碗，再加入计算好的生抽、蚝油、盐搅拌均匀，腌制 10 分钟。"],["干煸青椒","热锅，不用倒油，把切好的青椒放入锅中，大火干煸至虎皮状后，再加 2g 盐继续翻炒 1 分钟后捞起。"],["爆香底料","不用洗锅，大火热锅，加入份数 * 8ml 油，等待 30s，加入蒜瓣、姜末翻炒 15s。"],["滑炒肉片与合炒","加入腌制好的猪肉倒入锅内翻炒 2 分钟，再加入干煸过的青椒翻炒 1 分钟。"],["最后调味","根据个人口味喜好加入豆豉，最后加入酱油，继续翻炒 30s。"],["出锅","出锅，盛盘。"]]},
  {"id":"meat_dish_leng-chi-tu","name":"冷吃兔","category":"荤菜","servings":1,"minutes":90,"difficulty":"中等","coverPath":"ai-generated/meat_dish_leng-chi-tu.jpg","sourcePath":"dishes/meat_dish/冷吃兔.md","calories":590,"tips":["操作第6步中油量必须淹没兔肉，否则受热不均影响口感","操作第7步辣椒下锅后过程极快，必须严密观察防止变黑变苦","放置一夜后，兔肉会进一步吸收红油中的香气，回味更浓郁"],"required":[["vibe-e58594e88289","500g","兔肉"],["garlic","0.5头","蒜"],["ginger","0.5头体积","姜"],["vibe-e5b08fe891b12fe5a4a7e891b12fe6b48be891b1","15g","小葱/大葱/洋葱"],["chili","等同兔肉体积","干辣椒"],["vibe-e99d92e88ab1e6a492","1/3小碗","青花椒"],["vibe-e6a182e79aae","1块(大拇指长短)","桂皮"],["vibe-e9a699e58fb6","5片","香叶"],["vibe-e5b1b1e5a588","1块(黄豆大小)","山奈"],["vibe-e799bde894bb","2颗","白蔻"],["vibe-e5b08fe88cb4e9a699","15g","小茴香"],["vibe-e799bde88a9de9babb","25g","白芝麻"]],"optional":[],"pantry":[["salt","2g","盐"],["vibe-e591b3e7b2be","1g","味精"],["oysterSauce","5g","蚝油"],["wine","10g","料酒"],["starAnise","1粒","八角"],["oil","0.9-1L","食用油"]],"steps":[["处理香料与辅料","蒜、姜扒皮并剁碎备用，八角、桂皮、香叶、山奈、白蔻、小茴香洗净备用。"],["处理辣椒","干辣椒剪成 2 厘米的小段，洗净备用。"],["处理葱类","小葱/大葱/洋葱洗净，洋葱切成小块。"],["腌制兔肉","兔肉剁成 2 厘米的小块，加入盐、料酒、味精调味，腌制 15 分钟。"],["炼油增香","锅中倒油，油温 4 成热下小葱/大葱/洋葱，中小火煸炒出香味，待到小葱/大葱/洋葱微焦，将其捞出。"],["油炸兔肉","开大火升高油温，油温 8 成热时下入兔肉，炸制过程转中小火，炸至兔肉微微焦黄时捞出兔肉。"],["炒制香料","升高油温，倒入干辣椒、青花椒、八角、桂皮、香叶、山奈、白蔻、小茴香；转小火将辣椒段炸脆。"],["合炒入味","重新倒入兔肉，加入蚝油、翻炒几分钟。"],["最后调味","关火，加入蒜、姜、白芝麻，翻炒均匀。"],["静置入味","放置一夜更加入味。"]]},
  {"id":"meat_dish_luo-bo-dun-yang-pai","name":"萝卜炖羊排","category":"荤菜","servings":1,"minutes":120,"difficulty":"中等","coverPath":"ai-generated/meat_dish_luo-bo-dun-yang-pai.jpg","sourcePath":"dishes/meat_dish/萝卜炖羊排.md","calories":1259,"tips":["操作时，需要注意观察沸腾的水位线，如发现低于 2/3 的食材应加热水至没过食材。","高压锅和普通锅的炖煮时间有显著差异，请根据厨具选择时间。","白芷可以增加汤的香气并去膻，如果没有也可不放。"],"required":[["vibe-e7be8ae68e92","400g","羊排"],["radish","1根","白萝卜"],["vibe-e5a4a7e891b1","1根","大葱"],["vibe-e88ab1e6a492","10粒","花椒"],["ginger","10g","姜"],["vibe-e69699e98592e68896e88085e9bb84e98592","30ml-40ml","料酒或者黄酒"]],"optional":[["vibe-e799bde88ab7","适量","白芷"]],"pantry":[["salt","10g-20g","食用盐"],["rockSugar","2-4粒","冰糖"],["water","1300ml","水"]],"steps":[["萝卜预处理","萝卜去皮、滚刀切成 3-5cm 的大块，备用。"],["羊排准备","羊排在购买时切好，清洗干净备用。"],["羊肉焯水","羊肉冷水下锅，加入一半的料酒，一半的葱姜，煮 10 分钟去掉血腥。"],["萝卜焯水","另起一锅冷水，放入切好的白萝卜，放入一半的冰糖，等水开后煮 5 分钟去掉白萝卜的辣味。"],["入高压锅","盛出来焯好的羊排，放入高压锅中，加水没过所有食材后再增加大约 300ml 的水。"],["第一次炖煮","将剩余的葱姜料酒，花椒，冰糖，白芷（可选），盐放入锅中，盖锅等待上汽后计时，中火炖大约 15 分钟。"],["加入萝卜与调味","关火，等待高压锅放气完毕，开盖，加入之前焯好的萝卜，调味，加入 3-10g 的食盐或者水，品尝汤的咸淡。"],["第二次炖煮","再开火，中火，高压锅上汽再炖 10 分钟。"],["盛盘","关火，盛入大碗中即可食用。"]]},
  {"id":"meat_dish_ma-la-xiang-guo","name":"麻辣香锅","category":"荤菜","servings":3,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/meat_dish_ma-la-xiang-guo.jpg","sourcePath":"dishes/meat_dish/麻辣香锅.md","calories":1050,"tips":["大火通常温度在 240 摄氏度，以电磁炉为例，输入功率大约 2 千瓦。","中火通常温度在 120 摄氏度，以电磁炉为例，输入功率大约 1.4 千瓦。","青菜、无骨肉、干豆腐、北京麻辣方便面的配比为推荐配比，如果有自己喜欢的食材，可以按喜好重新分配比例。"],"required":[["vibe-e99d92e88f9cefbc88e6b2b9e88f9ce38081e6b2b9e9baa6e88f9ce38081e88fa0e88f9cefbc89","455g","青菜（油菜、油麦菜、菠菜）"],["vibe-e697a0e9aaa8e88289efbc88e78caae88289e38081e7899be88289e38081e9b8a1e88289e38081e9b1bce4b8b8e38081e781abe885bfe882a0efbc89","430g","无骨肉（猪肉、牛肉、鸡肉、鱼丸、火腿肠）"],["vibe-e5b9b2e8b186e88590","152g","干豆腐"],["vibe-e58c97e4baace9babbe8bea3e696b9e4bebfe99da2","1袋","北京麻辣方便面"],["chili","5g","干辣椒"],["vibe-e9babbe8bea3e9a699e99485e8b083e69699","110g","麻辣香锅调料"]],"optional":[],"pantry":[["oil","105g","食用油"]],"steps":[["准备沸水","烧开一锅水，水量需足够淹没后续步骤中的食材。"],["焯青菜","在开水中放入青菜，焯 5 分钟后盛出备用。"],["焯无骨肉","在开水中放入无骨肉，焯 4 分钟后盛出备用。"],["煮方便面","在开水中放入北京麻辣方便面，煮 2 分钟后盛出备用。"],["热油","倒出开水，擦干锅具，放入 105 克食用油，大火加热 30 秒。"],["炒香调料","放入麻辣香锅调料，翻炒 20 秒。"],["炒干辣椒","放入干辣椒，翻炒 10 秒。"],["翻炒青菜","放入焯过的青菜，改中火，翻炒 3 分钟。"],["翻炒肉类","放入焯过的无骨肉，翻炒 3 分钟。"],["混合面条","放入煮过的北京麻辣方便面，用筷子翻动 1 分钟。"],["出锅","关火，出锅装盘。"]]},
  {"id":"meat_dish_ma-yi-shang-shu","name":"蚂蚁上树","category":"荤菜","servings":1,"minutes":20,"difficulty":"中等","coverPath":"ai-generated/meat_dish_ma-yi-shang-shu.jpg","sourcePath":"dishes/meat_dish/蚂蚁上树.md","calories":791,"tips":["粉丝不建议煮太久，易断且口感变差；若时间过长汤汁应适当减少","郫县豆瓣酱含盐量较高，可根据口味酌情减少生抽用量","可加入 0.5g 白胡椒粉调味，风味更佳"],"required":[["vibe-e7baa2e896afe7b289e4b89d","80g","红薯粉丝"],["mince","150g","猪肉末"],["vibe-e983abe58ebfe8b186e793a3e985b1","15g","郫县豆瓣酱"],["garlic","10g","蒜末"],["ginger","5g","姜末"]],"optional":[["scallion","适量","小葱"]],"pantry":[["soy","10ml","生抽"],["darkSoy","5ml","老抽"],["oil","10ml","食用油"],["water","300ml","清水"]],"steps":[["泡发粉丝","红薯粉丝提前泡软，泡水时间为 20 分钟，备用"],["准备辅料","将蒜、姜分别剁碎，备用"],["爆香底料","锅烧热，加入 10ml 食用油，加入蒜末、姜末炒香"],["煸炒肉末","加入猪肉末翻炒至肉色发白且微微出油"],["炒红油","加入郫县豆瓣酱，炒至红油析出"],["调色味","加入生抽和老抽，翻炒均匀"],["加水煮沸","倒入 300ml 清水，煮沸"],["下粉丝","放入泡软沥干的粉丝，用筷子轻轻拨动防止粘连"],["焖煮收汁","中小火煮约 5 分钟，直至粉丝完全吸收汤汁、呈现微微收干状态"],["点缀装盘","依据口味可撒入小葱末，关火装盘"]]},
  {"id":"meat_dish_rou-bing-dun-dan","name":"肉饼炖蛋","category":"荤菜","servings":1,"minutes":20,"difficulty":"中等","coverPath":"ai-generated/meat_dish_rou-bing-dun-dan.jpg","sourcePath":"dishes/meat_dish/肉饼炖蛋.md","calories":1124,"tips":["在取出肉饼炖蛋时，注意盘子很烫，请小心操作。","可以根据个人口味在出锅后撒上少许葱花增香。"],"required":[["mince","300g","猪肉末"],["egg","2个","鸡蛋"],["vibe-e88a9de9babbe9a699e6b2b9","10-15ml","芝麻香油"]],"optional":[],"pantry":[["wine","10ml","料酒"],["soy","20ml","生抽"],["whitePepper","5g","白胡椒粉"]],"steps":[["搅拌肉馅","在碗中加入猪肉末、料酒、生抽、白胡椒粉、1个鸡蛋和芝麻香油，搅拌均匀。"],["盘中造型","将调好味的猪肉末铺在盘子里，肉末中间用勺子挖一个洞，往洞中打入另1个鸡蛋。"],["隔水蒸制","锅中加水至 1/4 高度，水烧开后，将盘子放入锅中，盖上锅盖，蒸 15 分钟。"]]},
  {"id":"meat_dish_sha-zhu-cai","name":"杀猪菜","category":"荤菜","servings":2,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/meat_dish_sha-zhu-cai.jpg","sourcePath":"dishes/meat_dish/杀猪菜.md","calories":1657,"tips":["血肠处理是难点，务必保持 80 度水温防止爆开","炒酸菜时加入香油是中和酸味的关键技巧","建议使用电压力锅以缩短烹饪时间并保证肉质软烂"],"required":[["vibe-e8a180e882a0","200g","血肠"],["vibe-e985b8e88f9c","500g","酸菜"],["ribs","400g","排骨"],["garlic","5个","蒜瓣"],["vibe-e5a79ce7b289","5g","姜粉"],["chili","5个","干辣椒"],["vibe-e9a699e58fb6","2片","香叶"],["vibe-e891b1e7bb93","1个","葱结"],["vibe-e8bea3e6a492e6b2b9","5g","辣椒油"],["vibe-e8929ce89389","5g","蒜蓉"]],"optional":[],"pantry":[["wine","10g","料酒"],["starAnise","1个","八角"],["sesame","12g","香油"],["vibe-e88f9ce7b1bde6b2b9","10g","菜籽油"],["salt","5g","盐"],["soy","10g","生抽"]],"steps":[["预处理血肠","血肠用牙签多扎一些小孔，然后放水中小火煮十分钟，不要让水烧开，保持 80 度。"],["血肠切块","将煮好的血肠捞出，稍凉后切成厚块备用。"],["排骨焯水","排骨冷水入锅，加入料酒，煮沸撇去浮沫，控干水分备用。"],["爆香底料","锅内放入菜籽油，放入蒜瓣、干辣椒、姜粉炒香。"],["翻炒排骨","放入排骨翻炒至表面金黄。"],["炒酸菜","酸菜洗净拧干水分，放入锅中，加入香油，大火翻炒二分钟。"],["加水","加入 600 毫升热水。"],["入锅调味","将锅中食材转入电压力锅，加香叶、八角、葱结、盐。"],["压力烹饪","启动浓香模式压 40 分钟。"],["焖煮血肠","放气开盖，加入血肠和枸杞，盖上锅盖焖二分钟即可。"],["准备蘸料","按照辣椒油 5g、生抽 10g、蒜蓉 5g、香油 2g 的比例调制蘸料。"]]},
  {"id":"meat_dish_shan-xi-guo-you-rou","name":"山西过油肉","category":"荤菜","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/meat_dish_shan-xi-guo-you-rou.jpg","sourcePath":"dishes/meat_dish/山西过油肉.md","calories":679,"tips":["炸肉片时，表面微焦即可，注意控制火候以免过火。","起锅前也可以打个薄薄的水淀粉勾芡，口感会更加滑润。","陈醋是这道菜的灵魂，建议使用正宗山西老陈醋。"],"required":[["pork","150g","猪里脊"],["vibe-e8929ce88b94","6根","蒜苔"],["vibe-e69ca8e880b3","20g","木耳"],["vibe-e891b1e5a4b4","100g","葱头"],["vibe-e891b1e5a79ce8929c","50g","葱姜蒜"],["egg","1个","鸡蛋"],["vibe-e88ab1e6a492e7b289","适量","花椒粉"]],"optional":[["vibe-e9b8a1e7b2be","适量","鸡精"]],"pantry":[["oil","300ml","食用油"],["soy","20ml","生抽"],["salt","10g","食盐"],["starch","10g","淀粉"],["vibe-e99988e9868b","10ml","陈醋"],["wine","适量","料酒"]],"steps":[["泡发木耳","木耳提前泡发好，如果着急可以用热水泡发。"],["肉片上浆腌制","猪里脊切片放入碗中，加 20ml 生抽、料酒、花椒粉，打入一个鸡蛋搅拌均匀，加入红薯淀粉拌匀，最后倒入食用油封浆，腌制 15 分钟。"],["蔬菜切配","蒜苔切成约 3cm 的段，葱头切成菱形块备用。"],["滑油处理","起锅烧油量稍多，油温五成热时下入腌制好的肉片，迅速打散，肉片变色捞出控油备用。"],["留底油","将锅中多余油倒出，仅留约 10ml 底油，加热至七成热。"],["爆炒配料","下入葱姜蒜爆香，先下蒜苔炒至断生，再加入木耳和葱头，淋入生抽、撒花椒粉，翻炒均匀后倒入肉片。"],["调味出锅","加入 10g 盐，起锅前沿锅边淋入 10ml 陈醋和少许鸡精，快速翻炒均匀后装盘。"]]},
  {"id":"meat_dish_shang-zhi-rou","name":"商芝肉","category":"荤菜","servings":2,"minutes":150,"difficulty":"较难","coverPath":"ai-generated/meat_dish_shang-zhi-rou.jpg","sourcePath":"dishes/meat_dish/商芝肉.md","calories":1621,"tips":["商芝属于小地方不特别有名的特产，在制作时可换成其他蕨类蔬菜。","此菜对火候要求极高，蒸制时间必须充足才能达到质地软嫩的效果。"],"required":[["vibe-e5b8a6e79aaee78caae4ba94e88ab1e88289efbc88e58ebbe9aaa8efbc89","500g","带皮猪五花肉（去骨）"],["vibe-e59586e88a9d","50g","商芝"],["scallion","10g","葱"],["ginger","2g","姜"],["vibe-e89c82e89c9c","15g","蜂蜜"],["vibe-e6918ae9b8a1e89b8be79aae","1张(约15g)","摊鸡蛋皮"],["vibe-e7b2bee79b90","1g","精盐"],["vibe-e9b8a1e6b1a4","200g","鸡汤"],["vibe-e7869fe78caae6b2b9","2000g(实耗约60g)","熟猪油"]],"optional":[],"pantry":[["starAnise","3个","八角"],["vinegar","5g","醋"],["wine","15g","料酒"],["vibe-e591b3e7b2be","1.5g","味精"],["vibe-e985b1e6b2b9","10g","酱油"],["sesame","10g","芝麻油"]],"steps":[["预处理肉块","将肉刮洗干净，入煮锅煮至六成熟（变色为白），捞出趁热用蜂蜜、醋涂抹肉皮。"],["炸制与切片","炒锅内放入熟猪油，旺火烧至八成熟（约200度），肉块皮朝下投入炸至金红色，捞入原煮肉锅中泡软。取出切成10cm长、0.6cm厚的片，皮朝下整齐装入蒸碗。"],["准备辅料","葱切段和斜片，姜切片和末，摊鸡蛋皮切成2.4cm长的等腰三角形片。"],["商芝处理与蒸制","商芝煮软去老茎切段，加酱油、盐、猪油拌匀盖在肉上。鸡汤中加酱油、盐、料酒搅匀浇入。放姜片、葱段、八角，旺火蒸30分钟，转小火蒸1.5小时。熟烂后取出，拣去料渣，滤出原汁，将肉扣入汤盘。"],["勾芡浇汁","炒锅内加鸡汤和原汁烧沸，下姜末、葱片、味精搅匀，投入鸡蛋皮，淋芝麻油，浇在肉上即成。"]]},
  {"id":"meat_dish_shi-zhi-pai-gu","name":"豉汁排骨","category":"荤菜","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/meat_dish_shi-zhi-pai-gu.jpg","sourcePath":"dishes/meat_dish/豉汁排骨.md","calories":1513,"tips":["豆豉浸泡后稍微剁碎会更入味","蒸制时间随排骨大小调整，以筷子能轻松插入软骨处为准","传统的豉汁排骨不放撒料和淋热油，可根据个人喜好选择","吃剩的汤汁可以用来拌饭或者拌面，非常鲜美"],"required":[["vibe-e8828be68e92","500g","肋排"],["vibe-e998b3e6b19fe8b186e8b189","15g","阳江豆豉"],["vibe-e8929ce89389","10g","蒜蓉"],["ginger","5g","姜末"]],"optional":[["scallion","适量","葱花"],["vibe-e799bde88a9de9babb","适量","白芝麻"]],"pantry":[["soy","15ml","生抽"],["darkSoy","3ml","老抽"],["oysterSauce","10g","蚝油"],["sugar","5g","白砂糖"],["starch","8g","生粉"],["oil","20ml","食用油"],["water","30ml","清水"]],"steps":[["泡洗排骨","将排骨用冷水浸泡 10 分钟泡去血水，换水重复 2 次，用厨房纸吸干水分。"],["泡发豆豉","将豆豉放入水中浸泡 5 分钟。"],["混合腌制","将排骨、豆豉、蒜蓉、姜末、生抽、老抽、蚝油、白砂糖、生粉、清水及 10ml 食用油混合均匀，腌制 8-30 分钟。"],["上锅蒸制","水开后将排骨放入蒸锅，大火蒸 18 分钟。"],["焖制入味","关火后焖 2 分钟。"],["烧热油","锅中倒入剩余的 10 ml 食用油，加热到 180-200 ℃。"],["泼油点缀","在排骨上均匀撒上葱花和白芝麻，将热油迅速浇在撒料上激发香味。"]]},
  {"id":"meat_dish_shui-zhu-rou-pian","name":"水煮肉片","category":"荤菜","servings":1,"minutes":35,"totalMinutes":90,"waitMinutes":55,"difficulty":"较难","coverPath":"ai-generated/meat_dish_shui-zhu-rou-pian.jpg","sourcePath":"dishes/meat_dish/水煮肉片.md","calories":361,"tips":["垫底的蔬菜根据自己口味选择（蘑菇、白菜、油麦菜等）。","刀口辣椒制作嫌麻烦也可以直接用干辣椒段和青花椒代替。","特别注意肉的腌制（搅拌的时候朝着一个方向、血水处理干净），保证肉滑嫩（鸡蛋清、淀粉搅拌均匀）。","水煮牛肉也可以按照这个做法。"],"required":[["vibe-e78caae9878ce8848ae88289","300g","猪里脊肉"],["beanSprout","100g","绿豆芽"],["vibe-e587a4e5b0be","1根","凤尾"],["celery","3根","芹菜"],["vibe-e8929ce88b97","2根","蒜苗"],["garlic","20g","大蒜"],["ginger","10g","生姜"],["vibe-e7baa2e6b2b9e8b186e793a3","10g","红油豆瓣"],["chili","20g","干辣椒"],["vibe-e99d92e88ab1e6a492","5g","青花椒"],["vibe-e9b8a1e89b8be6b885","1个","鸡蛋清"],["vibe-e59c9fe8b186e6b780e7b289","7g","土豆淀粉"],["vibe-e6a48de789a9e6b2b9","280g","植物油"],["vibe-e7949fe68abde985b1e6b2b9","5g","生抽酱油"],["scallion","2根","小葱"]],"optional":[["vibe-e7baa2e6b3a1e6a492","20g","红泡椒"],["vibe-e6b0b4e6b780e7b289","5g","水淀粉"]],"pantry":[["vibe-e88f9ce7b1bde6b2b9","200g","菜籽油"],["wine","3g","料酒"],["salt","5g","食用盐"],["whitePepper","2g","胡椒粉"],["vibe-e9b8a1e7b2be","1.5g","鸡精"],["sugar","1g","白砂糖"]],"steps":[["切片清洗","里脊肉改刀成小块，再切成 2 毫米薄片，放入碗中加入清水清洗两遍去除血水，捞出挤干水分。"],["初步腌制","肉片中加入盐 1.5g、胡椒粉 1g、生抽 5g、料酒 3g，朝着一个方向搅拌 2 分钟。"],["上浆挂糊","另取碗将鸡蛋清与 7g 土豆淀粉搅拌均匀倒入肉中搅匀，最后加入 30g 植物油轻拌。"],["配菜改刀","绿豆芽洗净，凤尾切条，芹菜切段，蒜苗拍散切段。"],["辅料准备","大蒜、生姜、红泡椒分别剁碎备用。"],["制作刀口辣椒","锅内热油留 50g 底油，小火炒香干辣椒 15g 和青花椒 3g 至变黑红色，倒出剁细。"],["炒制配菜","热锅放 100g 植物油，下花椒辣椒爆香，放入配菜和 1g 盐炒至断生，盛入碗底。"],["炒制底料","锅洗净放 150g 植物油，下姜蒜泡椒碎爆香，加入豆瓣酱 10g 小火炒出红油。"],["熬制汤汁","加入 800ml 清水大火烧开，转小火加盐 2.5g、鸡精 1.5g、糖 1g、胡椒粉 1g，下水淀粉勾芡。"],["烫制肉片","小火将肉片依次展开下锅，转中火烫熟，轻轻推动避免粘连，连汤带肉倒入菜碗。"],["铺设表面","在肉片上均匀撒上制作好的刀口辣椒、蒜蓉和葱花。"],["激香完成","锅洗净烧热 200g 菜籽油至 7 成热，一次性均匀泼在碗中辅料上。"]]},
  {"id":"meat_dish_suan-tai-chao-rou-mo","name":"蒜苔炒肉末","category":"荤菜","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/meat_dish_suan-tai-chao-rou-mo.jpg","sourcePath":"dishes/meat_dish/蒜苔炒肉末.md","calories":258,"tips":["加入食盐前可尝一下咸淡，自行决定是否增减盐量","选用五花肉薄片是因为切肉简单且不用腌制即可入味"],"required":[["vibe-e8929ce88b94","1扎(约190g)","蒜苔"],["vibe-e4ba94e88ab1e88289e89684e78987","4片(约20g)","五花肉薄片"],["garlic","2瓣","蒜瓣"]],"optional":[],"pantry":[["oil","10ml","食用油"],["soy","15ml","生抽"],["salt","2g","食盐"]],"steps":[["食材预处理-蒜苔","蒜苔切成 5cm 小段，备用"],["食材预处理-五花肉","五花肉切成 5mm * 5cm 丝状，备用"],["食材预处理-大蒜","蒜瓣拍碎切成末，备用"],["热锅凉油","热锅，锅内放入 10ml 食用油。等待 10 秒让油温升高"],["爆香蒜末","放入蒜末，中火翻炒 10 秒 将蒜末炒出香味"],["炒肉上色","放入五花肉和 5ml 生抽，中火翻炒 30 秒 将肉炒熟并上色"],["放入蒜苔","将蒜苔放入锅内并加入 10ml 生抽，翻炒 30 秒"],["焖炒至软","锅内加入 20g 水，中火翻炒 5 分钟 将蒜苔炒至稍稍变软"],["调味出锅","最后加入 2g 食盐，中火翻炒 30 秒，即可出锅装盘"]]},
  {"id":"meat_dish_tang-cu-li-ji","name":"糖醋里脊","category":"荤菜","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/meat_dish_tang-cu-li-ji.jpg","sourcePath":"dishes/meat_dish/糖醋里脊.md","calories":1573,"tips":["里脊要多炸几遍，注意火候，否则达不到外焦里嫩的效果！","建议提前备好料并一气呵成以保证口感。"],"required":[["pork","500g","里脊肉"],["egg","50g","鸡蛋"],["vibe-e795aae88c84e985b1","30ml","番茄酱"]],"optional":[],"pantry":[["vinegar","10g","醋"],["sugar","30g","白糖"],["starch","50g","淀粉"],["soy","10ml","生抽"],["wine","20g","料酒"],["oysterSauce","10g","蚝油"],["whitePepper","5g","白胡椒粉"],["salt","10g","食盐"]],"steps":[["腌肉","将猪里脊肉先切厚片，用刀背拍松，切成手指粗的条，加入料酒、生抽、蚝油、食盐、白胡椒粉和一个鸡蛋，用手抓匀，腌制20分钟以上。"],["调酱","将番茄酱、10g醋、30g白糖和150ml清水混合，搅拌至糖完全融化备用。"],["裹粉","准备一个大碗放入淀粉，将每一根腌制好的肉条都均匀裹满淀粉。"],["炸制","油温升至160摄氏度时下入里脊条，中火炸至表面微黄捞出。"],["复炸","将油温升高至200摄氏度，倒入里脊复炸约40秒，表皮酥脆后迅速捞出。"],["裹酱","另取一锅放底油，倒入调好的酱汁煮至冒大泡，放入炸好的里脊翻炒，使每根肉条均匀裹上酱汁。"],["出锅","翻炒均匀后立即关火盛出。"]]},
  {"id":"meat_dish_tian-la-kao-quan-chi","name":"甜辣烤全翅","category":"荤菜","servings":1,"minutes":180,"difficulty":"中等","coverPath":"ai-generated/meat_dish_tian-la-kao-quan-chi.jpg","sourcePath":"dishes/meat_dish/甜辣烤全翅.md","calories":775,"tips":["口感为微辣，需增加辣度请增加辣椒粉用量，但不宜超过 30g","鸡全翅包含翅尖，翅中和翅根","本品效果微焦，如不喜欢焦褐色外观可不向锡纸盘中倒入残余酱汁，并缩短每面烤制时间至 20 分钟","实际烤制效果请根据自己空气炸锅的功率判断","甜椒粉主要用于增加色泽和风味，无辣味","腌制时间在 60 分钟到 180 分钟之间为宜","操作时注意防烫，使用夹子或隔热手套拿取锡纸盘"],"required":[["vibe-e9b8a1e585a8e7bf85","4个","鸡全翅"],["vibe-e8929ce7b289","10g","蒜粉"],["vibe-e7949ce6a492e7b289","10g","甜椒粉"],["vibe-e8bea3e6a492e7b289","5g","辣椒粉"]],"optional":[],"pantry":[["soy","45ml","生抽"],["darkSoy","15ml","老抽"],["whitePepper","5g","胡椒粉"],["sugar","10g","糖"],["oysterSauce","15ml","蚝油"],["water","20ml","水"],["oil","10ml","油"]],"steps":[["处理食材","将 4 个新鲜鸡全翅取出，在翅中两根骨头之间用刀划开表皮，正反面各一刀"],["混合腌料","将 4 个鸡全翅放入碗中，加入生抽 45ml，老抽 15ml，蒜粉 10g，胡椒粉 5g，糖 10g，甜椒粉 10g，辣椒粉 5g，蚝油 15ml，水 20ml 以及油 10ml"],["涂抹酱汁","用勺子将酱汁均匀的抹在鸡全翅上，尤其是翅中的刀口处"],["低温腌制","用保鲜膜盖住碗，放入冰箱冷藏格静置 120 分钟"],["装盘备烤","取出鸡全翅放入锡纸盘，将碗中残余酱料均匀倒在鸡全翅上"],["第一阶段烤制","锡纸盘放入空气炸锅烤篮，用 200 摄氏度烤 25 分钟"],["翻面","小心取出锡纸盘，将鸡全翅翻面"],["第二阶段烤制","继续用 200 摄氏度烤 25 分钟"],["出锅","取出即可食用"]]},
  {"id":"meat_dish_xiang-cun-pi-jiu-ya","name":"乡村啤酒鸭","category":"荤菜","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/meat_dish_xiang-cun-pi-jiu-ya.jpg","sourcePath":"dishes/meat_dish/乡村啤酒鸭.md","calories":1324,"tips":["操作时，需要注意观察沸腾的水位线，如发现低于 2/3 的食材应加热水或者加啤酒。","不吃辣的可以不用放小米辣和干辣椒。","草果一定要拍散去籽，否则味道会发苦。"],"required":[["vibe-e9b8ade88289","1kg(半只)","鸭肉"],["vibe-e595a4e98592","1000ml","啤酒"],["vibe-e99d92e6a492","2条","青椒"],["vibe-e7baa2e6a492","1条","红椒"],["garlic","4颗","大蒜"],["ginger","5厘米长","生姜"],["vibe-e8929ce88b97","2根","蒜苗"],["vibe-e5a4a7e891b1","2根","大葱"],["vibe-e88d89e69e9c","2颗","草果"],["vibe-e6a182e79aae","4厘米1片","桂皮"],["vibe-e9a699e58fb6","3片","香叶"],["vibe-e88ab1e6a492","30颗","花椒"]],"optional":[["vibe-e5b08fe7b1b3e6a492","3颗","小米椒"],["chili","6条","干辣椒"]],"pantry":[["starAnise","3颗","八角"],["vibe-e88ab1e7949fe6b2b9","60ml","花生油"],["wine","20ml","料酒"],["salt","3g","盐"],["soy","10ml","生抽"],["darkSoy","5ml","老抽"]],"steps":[["鸭肉焯水","鸭肉清洗一遍放入锅中，加清水没过鸭肉，加入20ml料酒、1根大葱、2厘米拍散的生姜，开火烧滚并捞出浮沫。"],["清洗鸭肉","将捞出的鸭肉用清水冲洗干净，沥干水分备用。"],["热油爆香","锅清洗干净烧热，加入60ml花生油，待油温升至60度时，加入一把花椒爆香。"],["翻炒鸭肉与香料","下鸭肉翻炒。第2分钟时加入草果、桂皮、八角、香叶、干辣椒等所有香料；第3分钟时加入生姜、大蒜、小米辣等料头。总计翻炒4分钟。"],["加入啤酒炖煮","倒入1000ml啤酒，大火烧开后转中火炖煮。第10分钟加入盐3g、生抽10ml、老抽5ml调味上色。"],["加入辅料","炖煮至20分钟时，加入青椒段和红椒段继续炖煮。"],["收汁出锅","第29分钟加入蒜苗段和大葱段，翻炒1分钟，待汤汁浓郁后即可出锅。"]]},
  {"id":"meat_dish_xiang-gan-rou-si","name":"香干肉丝","category":"荤菜","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/meat_dish_xiang-gan-rou-si.jpg","sourcePath":"dishes/meat_dish/香干肉丝.md","calories":472,"tips":["辣椒选择青椒，螺丝椒为最优解，喜欢辣的可以加入小米椒切细碎，同青椒一起加入！","不同的锅具或者灶台会影响翻炒的时间，建议不确定是否熟了可以试吃一下。","新手建议提前称量好调料，避免炒制过程中手忙脚乱。"],"required":[["pork","100g","猪里脊"],["driedTofu","75g","香干"],["vibe-e99d92e6a492","5个","青椒"],["garlic","5g","大蒜"]],"optional":[],"pantry":[["salt","3g","盐"],["soy","5ml","生抽"],["starch","5g","淀粉"],["vibe-e9b8a1e7b2be","2g","鸡精"]],"steps":[["腌制肉丝","肉丝（没有肉丝则自己切丝）用生抽(3ml)和生粉混合均匀，静置待用。"],["准备青椒","将青椒洗净，再用滚刀手法切好备用。"],["切配辅料","大蒜横切成片，香干切成细丝。"],["调制芡汁","淀粉与10ml水混合，搅拌均匀成水淀粉。"],["滑炒肉丝","锅中倒入15ml油，冷油状态倒入肉丝慢慢划散，待肉丝变色熟透后立即捞出，底油留在锅内。"],["煸炒香干","将蒜片和香干放入留有底油的锅中，加入2ml生抽，翻炒均匀。"],["加入青椒","根据火候大小，将青椒丝放入锅中混合翻炒2-3分钟。"],["混合肉丝","将之前捞出的肉丝重新放入锅中混合。"],["勾芡出锅","倒入水淀粉勾芡，加入盐3g、鸡精2g，翻炒2-3分钟直至入味出锅。"]]},
  {"id":"meat_dish_xiao-chao-rou","name":"小炒肉","category":"荤菜","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/meat_dish_xiao-chao-rou.jpg","sourcePath":"dishes/meat_dish/小炒肉.md","calories":2873,"tips":["需注意肉片腌制的时间要充足，确保入味和嫩滑","火候把控非常重要，煸炒五花肉要焦香，炒底料要防止糊锅"],"required":[["porkBelly","500g","五花肉"],["vibe-e69c9de5a4a9e6a492","4 条","朝天椒"],["vibe-e5b08fe7b1b3e6a492","4 颗","小米椒"],["vibe-e8b186e8b189","10g (±5g)","豆豉"],["vibe-e8b186e793a3e985b1","10g (±5g)","豆瓣酱"],["scallion","0.5-1 根","葱"],["garlic","2 瓣","蒜"]],"optional":[],"pantry":[["darkSoy","10ml","老抽"],["starch","10g","淀粉"],["salt","1-2g","盐"],["oil","15ml","食用油"]],"steps":[["食材处理","将五花肉洗净，改刀切成薄片。"],["腌制肉片","把肉放入器皿内，加入淀粉、老抽、盐搅拌均匀，静置腌制半小时。"],["备葱段","将葱洗净，切成段状备用。"],["切辣椒","将小米椒、朝天椒洗净，采用斜刀切法切好。"],["热锅凉油","大火加热炒锅，倒入食用油。"],["煸炒五花肉","油热后加入五花肉煸炒。炒至肉片变色、边缘微焦后盛出来备用。"],["炒香底料","利用锅中余油，加入蒜瓣煸出香味，随后加入豆豉，翻炒均匀。"],["炒酱","向锅中加入豆瓣酱，翻炒至出红油并散发香味。"],["肉片回锅","加入之前炒好的五花肉，继续快速翻炒均匀，使肉片裹上酱汁。"],["加入配料","加入切好的小米椒、朝天椒和葱段，大火翻炒 40 秒。"],["出锅","关火，将菜品盛入盘中即可享用。"]]},
  {"id":"meat_dish_xiao-mi-la-chao-rou","name":"小米辣炒肉","category":"荤菜","servings":1,"minutes":25,"difficulty":"中等","coverPath":"ai-generated/meat_dish_xiao-mi-la-chao-rou.jpg","sourcePath":"dishes/meat_dish/小米辣炒肉.md","calories":620,"tips":["调料可以根据自己的喜好放，也可以加老抽，老抽更香！","这道菜辣味突出，不建议清淡饮食者尝试。","掌握好爆香和翻炒的火候是成功的关键。"],"required":[["vibe-e5b08fe7b1b3e6a492","20个","小米椒"],["vibe-e4ba94e88ab1e882892fe798a6e88289","200g","五花肉/瘦肉"],["vibe-e5a79ce8929c","50g","姜蒜"],["vibe-e8b186e793a3e985b1","10g","豆瓣酱"]],"optional":[],"pantry":[["vibe-e88ab1e7949fe6b2b9","20ml","花生油"],["salt","1-2g","盐"],["soy","10ml","生抽"],["oysterSauce","10ml","蚝油"],["vibe-e9b8a1e7b2be","10g","鸡精"],["sugar","5g","白糖"]],"steps":[["处理小米辣","将小米辣洗净，斜刀切大一点。"],["腌制猪肉","将肉切丝或切片，倒入生抽、蚝油、盐混合均匀，腌制 5 分钟。"],["预炒肉片","热锅倒油，先把肉下锅快速炒熟盛起备用。"],["爆香翻炒","锅内留底油，姜蒜爆香，倒入豆瓣酱翻炒出红油，倒入切好的小米辣，再倒入肉片，加入生抽、鸡精、盐、糖快速翻炒均匀即可。"]]},
  {"id":"meat_dish_xiao-su-rou","name":"小酥肉","category":"荤菜","servings":1,"minutes":90,"difficulty":"中等","coverPath":"ai-generated/meat_dish_xiao-su-rou.jpg","sourcePath":"dishes/meat_dish/小酥肉.md","calories":1939,"tips":["裹粉一定要把红薯粉揉散，不要有干的颗粒裹在里面，否则会炸！！！","如果肉太多吃不完，可以只炸一遍然后放冰箱。后面再吃的时候拿出来复炸，口感基本没影响。","初炸定型，复炸上色和增脆，两次火候控制是成功的核心。"],"required":[["vibe-e58ebbe79aaee78caae88289","500g","去皮猪肉"],["egg","2个","鸡蛋"],["flour","30g","面粉"],["vibe-e7baa2e896afe6b780e7b289","120g","红薯淀粉"],["vibe-e88081e5a79c","20g","老姜"],["scallion","15g","小葱"],["vibe-e58d81e4b889e9a699","2g","十三香"],["vibe-e88ab1e6a492e7a28e","3g","花椒碎"],["vibe-e88ab1e6a492e7b292","3g","花椒粒"],["vibe-e6a48de789a9e6b2b9","适量(油面高度3cm以上)","植物油"]],"optional":[],"pantry":[["wine","15g","料酒"],["water","80g","清水"],["salt","4g","盐"],["whitePepper","3g","胡椒粉"],["vibe-e591b3e7b2be","5g","味精"],["vibe-e9b8a1e7b2be","5g","鸡精"],["soy","8g","生抽"]],"steps":[["葱姜水制作","老姜切丝，小葱不用切。倒入料酒、清水。用手捏揉 5 分钟，使姜葱的味道充分溶解在水中。"],["猪肉处理与切条","将猪肉去皮洗净，切成长度 8~10 厘米，厚度 1.5 厘米的肉条。"],["腌制猪肉","加入盐、十三香、胡椒粉、味精、鸡精、花椒碎、花椒粒、生抽。倒入制作好的葱姜水，抓匀并充分揉制 10 分钟，直至肉吸收所有水分并且变得粘手。"],["冷藏静置","封上保鲜膜放冷藏室静置 30 分钟。"],["猪肉裹粉","将面粉、红薯粉倒入腌制好的肉中，加入鸡蛋清，充分揉制 15 分钟。"],["初炸定型","锅中倒入植物油，大火加热至 150° 后转小火。用筷子将肉条夹入油锅，炸 3~5 分钟定型。目测颜色微黄，翻动感觉略硬即可捞出沥油。"],["复炸出成品","将油温升至 180° 放入初炸好的肉条，炸至金黄色即可捞出。"]]},
  {"id":"meat_dish_yang-cong-chao-zhu-rou","name":"洋葱炒猪肉","category":"荤菜","servings":1,"minutes":15,"difficulty":"中等","coverPath":"ai-generated/meat_dish_yang-cong-chao-zhu-rou.jpg","sourcePath":"dishes/meat_dish/洋葱炒猪肉.md","calories":979,"tips":["猪肉可选猪肩肉片或是切好的肉丝，看个人喜好决定口感","建议购买标准茶匙、大匙来精准确定用料的量，保证味道稳定","洋葱是主角，如果特别喜欢吃可以多加半颗到一颗"],"required":[["onion","1颗","洋葱"],["vibe-e78caae88289e78987","250g","猪肉片"],["garlic","3瓣","蒜头"],["vibe-e9bb91e883a1e6a492","1.25g","黑胡椒"],["vibe-e9babbe6b2b9","5ml","麻油"],["vibe-e795aae88c84e985b1","15ml","番茄酱"]],"optional":[],"pantry":[["oil","15ml","食用油"],["vibe-e985b1e6b2b9","30ml","酱油"],["sugar","15g","糖"],["wine","15ml","料酒"]],"steps":[["食材预处理","洋葱切片，猪肉切片（或丝），蒜头拍碎；将黑胡椒、酱油、糖、麻油、番茄酱、料酒混合成调味汁备用。"],["热油下肉","炒锅内倒入 1 大匙食用油，等待 10 秒让油温升高，倒入猪肉片。"],["煸炒肉片","将猪肉炒至变色后，加入拍碎的蒜头炒出香味，随后将肉片和蒜头盛起备用。"],["炒制洋葱","利用原锅余油放下洋葱翻炒 3~4 分钟，直到洋葱变软透光，随后加入混合好的调味料炒匀。"],["混合翻炒","将之前盛起备用的猪肉重新倒入锅中，与洋葱均匀翻炒。"],["熟透起锅","待猪肉完全熟透后，继续翻炒 1、2 分钟，让风味充分融合即可起锅。"]]},
  {"id":"meat_dish_yi-shi-kao-ji","name":"意式烤鸡","category":"荤菜","servings":1,"minutes":50,"difficulty":"中等","coverPath":"ai-generated/meat_dish_yi-shi-kao-ji.jpg","sourcePath":"dishes/meat_dish/意式烤鸡.md","calories":315,"tips":["烤制时可以将鸡肉淋上蜂蜜或其他烤肉酱提升口感","烤箱预热至 180 度，烤制时间根据鸡肉的大小和厚度而定，需确保鸡肉熟透","鸡肉必须全熟才能吃，吃未全熟的鸡肉可能会导致食物中毒和感染细菌，如沙门氏菌和福氏杆菌等"],"required":[["vibe-e9b8a1e885bfe88289","1-2个","鸡腿肉"],["vibe-e9bb91e883a1e6a492","0.5g","黑胡椒"],["garlic","1瓣","蒜"],["vibe-e69fa0e6aaace6b181","5ml","柠檬汁"],["vibe-e6aca7e88ab9","1根","欧芹"]],"optional":[],"pantry":[["salt","2g","盐"],["vibe-e6a984e6a684e6b2b9","5ml","橄榄油"]],"steps":[["鸡肉腌制预处理","将鸡腿肉洗净擦干，均匀涂抹上盐、黑胡椒、橄榄油和剁碎的蒜末。"],["烤箱烤制","将腌制好的鸡肉放入预热至 180 度的烤箱中，烤 30-40 分钟，直至表面微焦且完全熟透。"],["佐料准备","在烤制期间，将欧芹切成碎末，并将柠檬挤出汁液备用。"],["出炉调味","从烤箱取出烤好的鸡肉，趁热淋上柠檬汁，最后撒上欧芹碎装饰。"]]},
  {"id":"meat_dish_yu-xiang-rou-si","name":"鱼香肉丝","category":"荤菜","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/meat_dish_yu-xiang-rou-si.jpg","sourcePath":"dishes/meat_dish/鱼香肉丝.md","calories":421,"tips":["新手建议严格按步骤操作，掌握翻炒火候","鱼香汁的调配是这道菜的灵魂"],"required":[["pork","200g","里脊肉"],["carrot","100g","胡萝卜"],["vibe-e99d92e6a492","100g","青椒"],["vibe-e69ca8e880b3efbc88e5b9b2efbc89","5g","木耳（干）"],["vibe-e89b8be6b885","1个","蛋清"],["ginger","20g","姜"],["scallion","20g","葱"],["garlic","2瓣","蒜"],["vibe-e8b186e793a3e985b1","15g","豆瓣酱"]],"optional":[],"pantry":[["soy","10ml","生抽"],["wine","5ml","料酒"],["starch","10g","淀粉"],["vinegar","15ml","醋"],["sugar","10g","白糖"],["salt","5g","盐"]],"steps":[["制作腌料","将生抽 5ml、料酒 5ml、淀粉 5g、水 20ml、蛋清 1 个混合均匀。"],["制作香汁","将生抽 5ml、醋 15ml、白糖 10 克、盐 1 克、淀粉 5g、水 20ml 混合均匀。"],["腌制肉丝","用制作好的腌料腌制里脊肉 15-30 分钟。注意将肉抓匀。"],["处理木耳","干木耳提前泡发 4 个小时，洗净，切成小块。"],["处理蔬菜","青椒洗净切丝；胡萝卜洗净切丝并进行焯水。"],["切配辅料","姜、蒜切沫，葱切成 5mm 的小段。"],["滑炒肉丝","锅烧热加 15ml 油，倒入腌肉快速滑散至变白，盛出备用。"],["炒香底料","锅内重新加 5ml 油，倒入全部葱、姜、蒜、豆瓣酱炒香。"],["炒制配菜","倒入胡萝卜翻炒 20s 后，放入青椒和木耳，继续翻炒 2 分钟。"],["合炒肉丝","倒入炒过的肉，快速翻炒均匀。注意不要炒超过 20 秒。"],["勾芡收汁","倒入香汁，快速翻炒均匀。注意不要炒超过 15 秒，关火盛盘。"]]},
  {"id":"meat_dish_zhu-rou-hui-suan-cai","name":"猪肉烩酸菜","category":"荤菜","servings":4,"minutes":180,"difficulty":"较难","coverPath":"ai-generated/meat_dish_zhu-rou-hui-suan-cai.jpg","sourcePath":"dishes/meat_dish/猪肉烩酸菜.md","calories":1817,"tips":["大火收汤时，注意不要糊锅，可以适当翻动来检查水位。","调味的技巧，最后加盐时，可以一点一点加入，搅拌后品尝味道，直到可以接受的口味。","本菜品有酸菜的特殊风味。"],"required":[["vibe-e78caae4ba94e88ab1e88289e68896e78caae88289e68e92e9aaa8","1500g","猪五花肉或猪肉排骨"],["vibe-e4b89ce58c97e985b8e88f9c","1000g","东北酸菜"],["vibe-e5a4a7e891b1","1根","大葱"],["ginger","100g","姜"],["garlic","4瓣","蒜"],["vibe-e7949fe68abde985b1e6b2b9","15g","生抽酱油"],["vibe-e4ba94e9a699e7b289","10g","五香粉"],["vibe-e5a4a7e69699","2颗","大料"]],"optional":[],"pantry":[["salt","10g","盐"],["wine","20ml","料酒"]],"steps":[["食材切配","大葱切段；生姜50克切段，50克切末；大蒜切末，备用。"],["处理酸菜","全部酸菜切丝，用水冲洗 2 ～ 3 遍备用。"],["肉类焯水","排骨和五花肉入锅，倒入冷水淹没。放入全部葱段，50克生姜段和料酒20毫升。大火煮开后，等待5分钟。关火，将排骨和五花肉捞出，冷水冲洗掉浮沫，备用。"],["改刀切肉","煮好的五花肉切片或者切块，备用。"],["准备炒锅","将之前的锅洗干净，并且擦干。"],["煸炒增香","锅中加入油，开中火，放入姜蒜末爆香，放入五花肉和排骨。将五花肉和排骨煎至金黄，倒入10克五香粉和15克生抽酱油，用铲子翻动 1 ～ 2 分钟。"],["翻炒酸菜","将冲洗好的酸菜丝加入锅中，翻炒 3 分钟。"],["加入汤水","倒入纯净水至刚好没过食材，加入2颗大料，转大火，直到锅中水沸腾。转中火，盖锅盖焖煮。"],["耐心慢炖","等待 1.5 ～ 2 小时，直至五花肉软烂。"],["大火收汁","掀开锅盖，开大火收汤，翻动锅中食材直至锅中剩余水分只覆盖锅底，转小火，准备调味。"],["最后调味","加入食用盐 10 克，搅拌均匀。"],["出锅","关火，出锅。"]]},
  {"id":"meat_dish_zi-ran-niu-rou","name":"孜然牛肉","category":"荤菜","servings":1,"minutes":45,"difficulty":"中等","coverPath":"ai-generated/meat_dish_zi-ran-niu-rou.jpg","sourcePath":"dishes/meat_dish/孜然牛肉.md","calories":612,"tips":["牛肉顺着纹理切片可使口感更嫩","孜然颗粒比粉末香气更浓郁","牛肉入锅前务必吸干水分防止脱浆"],"required":[["vibe-e7899be69fb3e68896e7899be882a9e88289","250g","牛柳或牛肩肉"],["vibe-e99d92e6a492","2颗(约200g)","青椒"],["vibe-e5ad9ce784b6","20g","孜然"],["vibe-e5b08fe7b1b3e6a492","3颗(约15g)","小米椒"],["vibe-e7949fe68abde985b1e6b2b9","20ml","生抽酱油"],["scallion","1根(约20g)","葱"]],"optional":[],"pantry":[["starch","10g","淀粉"],["oil","15ml","油"],["salt","3g","盐"]],"steps":[["准备香料","将小米椒切碎，和孜然粒一起放入捣药罐捣碎成颗粒。"],["处理蔬菜","青椒切头去籽，切成丝。葱切段。"],["牛肉预处理","牛肉提前解冻，过水洗净，用厨用纸吸干，顺着纹理切成片。"],["腌制牛肉","加入生抽、淀粉、油，均匀搅拌，静置30分钟。"],["爆香煸炒","热锅下油，放入葱段爆香后，放入腌好的牛肉煸炒。"],["加入调料","牛肉变色后均匀放入孜然辣椒颗粒并炒熟。"],["辅料断生","下入青椒丝，断生后放盐。"],["大火出锅","大火炒1分钟后关火，再翻炒30秒保证受热均匀即可出锅。"]]},
  {"id":"other_ang-ci-yu-dou-fu-tang","name":"昂刺鱼豆腐汤","category":"汤","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/other_ang-ci-yu-dou-fu-tang.jpg","sourcePath":"dishes/soup/昂刺鱼豆腐汤/昂刺鱼豆腐汤.md","calories":321,"tips":["注意去腥和煎鱼防粘，这是本菜成功的关键","鱼富含优质蛋白质，搭配豆腐能补充钙质，营养均衡"],"required":[["vibe-e69882e588bae9b1bce68896e88085e6b299e58589e9b1bc","1条","昂刺鱼或者沙光鱼"],["tofu","100g","豆腐"],["scallion","1根","香葱"],["ginger","1块","姜"]],"optional":[],"pantry":[["oil","15ml","食用油"],["wine","适量","料酒"],["salt","10-15g","食用盐"],["whitePepper","3-5g","胡椒粉"],["water","1L","开水"]],"steps":[["鱼材处理与腌制","鱼处理好后洗净（特别注意肚内的血丝、不洗干净会有腥味），放入大碗中，倒入料酒、10g 姜片、5g 盐，腌制 15 分钟。"],["豆腐预处理","豆腐切块，放入凉水浸泡 5 分钟，捞出备用。"],["煎鱼防粘","煎鱼前，先用生姜片擦一下锅防止粘锅，倒入油（油量为 15ml * 鱼的条数 ），烧热后放入鱼煎 2~3 分钟，期间需要晃动一下鱼，防止粘底，且需要翻一次身。"],["大火炖煮汤底","待鱼全部煎好之后，倒入开水、5ml 料酒、姜片，小火转至大火，盖上锅盖、大火煮 10 分钟（水要稍微多一些，后面会蒸发掉一些）。"],["加入豆腐与调味","见汤变白后倒入准备好的豆腐，调中火再煮 5 分钟，加入 10g 盐、3g 胡椒粉调味，最后撒上葱花出锅。"]]},
  {"id":"other_ao-li-ao-bing-qi-lin","name":"奥利奥冰淇淋","category":"甜品","servings":1,"minutes":20,"totalMinutes":270,"waitMinutes":250,"difficulty":"中等","coverPath":"ai-generated/other_ao-li-ao-bing-qi-lin.jpg","sourcePath":"dishes/dessert/奥利奥冰淇淋/奥利奥冰淇淋.md","calories":1160,"tips":["剁碎奥利奥的容器注意不要使用易碎容器","去除奥利奥夹心时切忌注意割到手"],"required":[["vibe-e6b7a1e5a5b6e6b2b9","250毫升","淡奶油"],["vibe-e58e9fe591b3e5a5a5e588a9e5a5a5","6块","原味奥利奥"]],"optional":[],"pantry":[["sugar","18克","白砂糖"]],"steps":[["处理饼干夹心","将奥利奥拧开后去除利利（夹心），备用。"],["剁碎饼干","用筷子将奥奥剁碎，需要有一半奥奥变成粉状，另一半的奥奥最大长度小于 0.5 厘米，备用。"],["混合奶油与糖","将奶油全部倒置于深容器中，并加入准备好的糖。"],["搅打奶油","开始用电动打蛋器高速挡搅打至电动打蛋器提起后下方会出现悬挂住的奶油（0.5 厘米 - 1 厘米），而不是全部像液体一样滴下。"],["加入饼干碎","搅打完成后将奥奥放入奶油中，搅拌均匀直至底部有奥奥。"],["模具成型（可选）","将混合物倒入冰淇淋模具中。"],["冷冻","放置冰箱冷冻室（-18 度） 4 小时以上可取出。"]]},
  {"id":"other_ao-men-shi-ban-mian-zhi-niu-rou-fan","name":"澳门湿版免治牛肉饭","category":"主食","servings":1,"minutes":30,"difficulty":"简单","coverPath":"ai-generated/other_ao-men-shi-ban-mian-zhi-niu-rou-fan.jpg","sourcePath":"dishes/meat_dish/澳门湿版免治牛肉饭/澳门湿版免治牛肉饭.md","calories":1011,"tips":["如果没有黄油，使用普通食用油也可以，但黄油会增加独特的奶香味。","吃的时候将半熟的蛋黄戳破，与牛肉和米饭拌匀食用，口感最佳。"],"required":[["vibe-e7899be88289e69cab","200g","牛肉末"],["onion","半个","洋葱"],["egg","1个","鸡蛋"],["vibe-e9bb84e6b2b9","10g","黄油"],["vibe-e795aae88c84e985b1","2汤匙","番茄酱"],["vibe-e9bb91e883a1e6a492","4g","黑胡椒"],["rice","1份","米饭"]],"optional":[["scallion","5g","小葱"]],"pantry":[["soy","3汤匙","生抽"],["darkSoy","0.5汤匙","老抽"],["sugar","0.5汤匙","白糖"],["wine","1汤匙","料酒"],["starch","1汤匙","淀粉"],["water","50ml","清水"]],"steps":[["腌制牛肉","将 200g 牛肉末放入碗中，加入 1 汤匙生抽、半汤匙白糖和 2g 黑胡椒，搅拌均匀。"],["处理洋葱","将半个洋葱切成小丁备用。"],["调制料汁","在碗中加入 2 汤匙生抽、2 汤匙番茄酱、1 汤匙料酒、1 汤匙淀粉、半汤匙老抽和 50ml 清水，搅拌均匀。"],["准备鸡蛋","另起一锅，制作一个水波蛋或半熟煎蛋备用。"],["煸炒洋葱","热锅放入 10g 黄油，融化后放入洋葱丁，小火煎熟至散发香味。"],["翻炒牛肉","加入腌制好的牛肉末，与洋葱一起翻炒至牛肉变色。"],["收汁勾芡","倒入调好的料汁，撒上 2g 黑胡椒，继续炒制直至汤汁变粘稠后关火。"],["组合装盘","将炒好的免治牛肉浇在热米饭上，放上提前准备好的半熟蛋。"],["最后装饰","在表面撒上 5g 切好的小葱花作装饰。"]]},
  {"id":"other_ba-ba-gan-cha","name":"耙耙柑茶","category":"饮料","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/other_ba-ba-gan-cha.jpg","sourcePath":"dishes/drink/耙耙柑茶/耙耙柑茶.md","calories":81,"tips":["耙耙柑可以用其他容易分离果肉的柑橘替代，比如丑橘","果肉和茶水比例为 1:1，如果需要配置更大的分量，可按比例提升用量"],"required":[["vibe-e88099e88099e69f91","1~2 个（200 克以上）","耙耙柑"],["vibe-e88c89e88e89e7bbbfe88cb6","2~4 克","茉莉绿茶"],["vibe-e586b0e59d97","60 克","冰块"]],"optional":[["vibe-e89497e7b396e7b396e6b586","10 克","蔗糖糖浆"]],"pantry":[],"steps":[["茉莉绿茶调配","称量 2~4 克茶叶置于容器，加入 100 毫升开水，泡 6 分钟。随后往绿茶中放入 60 克冰块并搅拌冷却。待冰块完全融化后，将茶叶过滤，得到约 160 毫升茉莉绿茶水。"],["准备果肉与混合","取出耙耙柑的肉瓣并剥去外皮取得果肉。取 130 克果肉、130 毫升茉莉绿茶水和 10 克蔗糖糖浆（可选）放入搅拌机中。"],["搅拌与装杯","封盖启动搅拌机，搅拌 20 秒后将产物倒入约 300 毫升的透明玻璃杯中。最后取少量果肉撕碎撒在液面上装饰。"]]},
  {"id":"other_ba-ji-si-tan-niu-rou-ga-li","name":"巴基斯坦牛肉咖喱","category":"荤菜","servings":5,"minutes":45,"totalMinutes":150,"waitMinutes":105,"difficulty":"较难","coverPath":"ai-generated/other_ba-ji-si-tan-niu-rou-ga-li.jpg","sourcePath":"dishes/meat_dish/巴基斯坦牛肉咖喱/巴基斯坦牛肉咖喱.md","calories":602,"tips":["这道菜非常正宗，是从巴基斯坦朋友处习得","通常配以 烙饼(roti)、馕(naan) 或 米饭 食用","如果想做 Chicken karahi 流程基本一致，但需先用油和花椒胡椒将鸡肉煎至变黄"],"required":[["vibe-e7899be88289","1kg","牛肉"],["tomato","4个","番茄"],["vibe-e89ebae4b89de6a492","2个","螺丝椒"],["vibe-e58e9fe591b3e985b8e5a5b6","1盒","原味酸奶"],["vibe-4d6173616c6120e7b289","50g","Masala 粉"],["vibe-e8929ce7b289","5g","蒜粉"],["vibe-e5a79ce7b289","5g","姜粉"]],"optional":[],"pantry":[["oil","适量（一层）","食用油"],["water","250ml","水"]],"steps":[["处理辣椒","全部螺丝椒切成段状，备用"],["制作番茄蓉","全部番茄打成番茄蓉，备用"],["处理牛肉","牛肉切成 2cm 的小块，洗净备用"],["热油","炒锅中倒入一层油"],["炒制番茄","倒入番茄蓉，持续搅拌 2-3 分钟，等待它越变越红"],["加入调味粉","加入 5g 蒜粉，5g 姜粉和 1 包 50g 的 Masala 粉，搅拌均匀"],["加入主料","加入牛肉和螺丝椒段，搅拌均匀"],["调入酸奶","加入 1 盒酸奶，搅拌均匀"],["转移慢炖","将整锅材料转移到电饭煲/电炖锅，并加入 250 ml 的水，开启炖肉/慢炖档，设定时间 2-3 个小时"],["出锅检查","等待完成，开锅检查牛肉软糯，即可食用"]]},
  {"id":"other_ba-si-tu-dou","name":"拔丝土豆","category":"素菜","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_ba-si-tu-dou.jpg","sourcePath":"dishes/vegetable_dish/拔丝土豆/拔丝土豆.md","calories":1158,"tips":["土豆煎炸不可太熟透，否则在拔丝端盘时不容易定型，影响美观","对于使用剩余的食用油，可以考虑重新收集到油壶","趁热食用，配上一小碗凉水蘸着吃，糖丝更脆"],"required":[["potato","2个","土豆"],["vibe-e88a9de9babb","5g","芝麻"]],"optional":[],"pantry":[["oil","300ml","食用油"],["starch","30g","淀粉"],["sugar","120g","白砂糖"],["water","100ml","水"]],"steps":[["食材预处理","土豆去皮，切均匀的小块。放入淀粉（不加水）搅拌，使得淀粉覆盖土豆表面"],["油炸土豆","起锅烧油，放入土豆块，缓缓翻滚煎炸 5-7 分钟 ，直至筷子可以插进土豆"],["沥油备用","取出土豆，放入大碗备用"],["熬制糖浆","锅中加入水、白砂糖，沿着一个方向慢慢搅动白砂糖，直到白砂糖颜色变成褐色"],["裹浆翻炒","重新倒入土豆，翻炒 30 S 后 出锅"],["装盘点缀","土豆盛盘，散上芝麻"]]},
  {"id":"other_bai-xiang-guo-cheng-zi-te-diao","name":"百香果橙子特调","category":"饮料","servings":1,"minutes":15,"totalMinutes":1440,"waitMinutes":1425,"difficulty":"中等","coverPath":"ai-generated/other_bai-xiang-guo-cheng-zi-te-diao.jpg","sourcePath":"dishes/drink/百香果橙子特调/百香果橙子特调.md","calories":173,"tips":["如果缺少或不喜欢茉莉绿茶，可以使用苏打气泡水代替，免去泡茶流程","腌制百香果建议提前一天准备，口感更佳","饮用前请先搅拌均匀"],"required":[["vibe-e799bee9a699e69e9c","3个","百香果"],["vibe-e6a999e5ad90","1个(约200克)","橙子"],["vibe-e88c89e88e89e7bbbfe88cb6e88cb6e58fb6","3~6克","茉莉绿茶茶叶"],["vibe-e586b0e59d97","160克以上","冰块"]],"optional":[["vibe-e89c82e89c9c","10克","蜂蜜"],["vibe-e88b8fe68993e6b094e6b3a1e6b0b4","适量","苏打气泡水"],["vibe-e89684e88db7e58fb6e68896e585b6e4bb96e7bbbfe58fb6","适量","薄荷叶或其他绿叶"]],"pantry":[["water","150毫升","开水"],["sugar","30克","白砂糖"]],"steps":[["百香果腌制","将三个百香果果肉及汁水取出置于容器，加入30克白砂糖和10克蜂蜜搅拌均匀。用保鲜膜封口，放入冰箱腌制12~24小时。"],["茉莉绿茶调配","称量3~6克茶叶，加入150毫升开水浸泡6分钟。加入90克冰块搅拌冷却，待冰块消失后过滤，得到约240毫升茶水。"],["橙子处理","橙子垂直于头尾连线对半切开。从一半中切出一片备用，其余部分用压汁器压出橙汁。"],["正式调配","杯底放入70克冰块，倒入所有橙汁。将橙片贴杯壁放置，浇入一次分量的腌制百香果。缓慢注入绿茶至满杯，最后放装饰叶。"]]},
  {"id":"other_bai-zhuo-cai-xin-de-zuo-fa","name":"白灼菜心的做法","category":"素菜","servings":2,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/other_bai-zhuo-cai-xin-de-zuo-fa.jpg","sourcePath":"dishes/vegetable_dish/白灼菜心/白灼菜心.md","calories":86,"tips":["选择菜心一定要非常新鲜","锅内烧清水白灼时一定要加入油和盐"],"required":[["vibe-e696b0e9b29ce88f9ce5bf83","250g","新鲜菜心"],["garlic","4-5瓣","大蒜"],["vibe-e5b08fe7b1b3e8bea3","1-2根","小米辣"]],"optional":[["onion","少许","洋葱"],["vibe-e5a79ce4b89d","少许","姜丝"]],"pantry":[["oil","10g","食用油"],["soy","5g","生抽"],["oysterSauce","5g","蚝油"],["salt","5g","食盐"],["sugar","3g","白糖"],["water","600ml","清水"]],"steps":[["预处理菜心","菜心洗净，去除根部比较硬或老的地方。用刀刮掉根茎外面那层比较硬的皮，使内部更可口。"],["准备配料","大蒜切成蒜末，如有洋葱可顺便切点洋葱碎。"],["调制灵魂料汁","取小碗，加入生抽 5g、蚝油 5g、糖 3g 和 100g 清水搅拌均匀。"],["准备灼烫用水","锅中倒入 500ml 清水，加入 5g 盐和 10g 食用油，大火烧开。"],["白灼菜心","先将菜心根茎放入沸水中烫 1 分钟至深绿，再将整个菜心放入烫 1 分钟，捞出码入盘中。"],["炒制料汁","另起小锅倒油，五成热后爆香蒜末、洋葱碎，倒入兑好的料汁，加入姜丝和小米辣煮开。"],["浇汁完成","料汁稍微收汁煮沸后，直接均匀浇在码好的菜心上。"]]},
  {"id":"other_bai-zhuo-xia","name":"白灼虾","category":"水产","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/other_bai-zhuo-xia.jpg","sourcePath":"dishes/aquatic/白灼虾/白灼虾.md","calories":519,"tips":["开始不能大火、防止糊底。","如果锅盖有通气口、时间要相应调节一下（考虑增加 30 秒中火）。","蘸料其实也是可选的、也可以是纯的醋，大自然馈赠的鲜虾在没有水带走冲淡鲜甜的情况下口感味道都非常棒的。"],"required":[["vibe-e6b4bbe899be","250g","活虾"],["onion","一头","洋葱"],["ginger","一块","姜"],["garlic","5-8 瓣","蒜"],["scallion","一根","葱"],["vibe-e88a9de9babb","一把","芝麻"]],"optional":[],"pantry":[["oil","10-15ml","食用油"],["wine","20 ml","料酒"],["vibe-e985b1e6b2b9","10-15ml","酱油"],["vibe-e9a699e9868b","10 ml","香醋"],["oysterSauce","10 ml","蚝油"]],"steps":[["备菜铺底","洋葱切小块，姜切片，平铺平底锅。"],["处理并入锅","活虾冲洗一下（去除虾线、剪刀减掉虾腿虾须子都是可选操作），控水，铺在平底锅的洋葱、姜片之上。"],["焖煮烹饪","锅内倒入料酒，盖上锅盖，中火 1 分钟，小火 5 分钟，关火 5 分钟。"],["制作蘸料","与焖煮并行：葱切成葱花、蒜切碎、倒入酱油、芝麻、香醋、蚝油搅拌。油烧热，淋入蘸料。"],["出锅装盘","虾出锅，用干净的盘子装好。"]]},
  {"id":"other_bao-cai-chao-ji-dan-fen-si","name":"包菜炒鸡蛋粉丝","category":"主食","servings":1,"minutes":80,"difficulty":"中等","coverPath":"ai-generated/other_bao-cai-chao-ji-dan-fen-si.jpg","sourcePath":"dishes/vegetable_dish/包菜炒鸡蛋粉丝/包菜炒鸡蛋粉丝.md","calories":570,"tips":["粉丝必须提前充分泡发，否则炒制时容易粘锅或口感过硬","包菜和胡萝卜切丝规格应尽量一致，确保受热均匀","全程建议大火快炒，避免包菜出水过多影响口感"],"required":[["vibe-e58c85e88f9c","半颗","包菜"],["egg","2个","鸡蛋"],["vermicelli","1把","粉丝"],["carrot","半根","胡萝卜"],["scallion","半根","葱"],["garlic","2片","蒜瓣"],["chili","5根","干辣椒"]],"optional":[],"pantry":[["vibe-e88f9ce7b1bde6b2b9","20ml","菜籽油"],["salt","2g","盐"],["soy","15ml","生抽"],["darkSoy","10ml","老抽"],["oysterSauce","10ml","蚝油"]],"steps":[["食材预处理","胡萝卜、包菜洗净后切成均匀的细丝备用"],["粉丝泡发与焯烫","粉丝先用冷水浸泡 1 小时，然后将粉丝放入锅中，加入开水烧至粉丝烫软捞出备用"],["准备蛋液","鸡蛋打入碗中，加入盐后搅拌 15 秒"],["切配料","葱、蒜、辣椒切成小粒备用"],["炒鸡蛋","起锅烧油，倒入鸡蛋，打散炒熟盛出"],["爆香底料","锅中再倒入油，放入葱、蒜、干辣椒翻炒 8 秒"],["炒制蔬菜","下胡萝卜、包菜丝儿翻炒 30 秒"],["加入粉丝","放入处理好的粉丝"],["调味","放调料，生抽 15 ml，老抽 10 ml，蚝油 10 ml，盐 2 克"],["合炒","放入之前炒好的鸡蛋，翻炒约 15 秒"],["出锅","出锅摆盘"]]},
  {"id":"other_bian-yu-dun-dou-fu","name":"鳊鱼炖豆腐","category":"水产","servings":2,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/other_bian-yu-dun-dou-fu.jpg","sourcePath":"dishes/aquatic/鳊鱼炖豆腐/鳊鱼炖豆腐.md","calories":524,"tips":["鱼的两面，各煎 2-4 分钟即可","煎鱼的时候全程中小火","最后出锅时，加入一些切碎的大蒜，味道会更好","煎鱼前在锅里撒点盐是防粘的小窍门"],"required":[["vibe-e9b38ae9b1bc","550克","鳊鱼"],["vibe-e88081e8b186e88590","400克","老豆腐"],["ginger","5片","姜"],["scallion","50克","葱"],["garlic","4个","蒜"]],"optional":[["darkSoy","2ml","老抽"],["vibe-e6a182e79aae","1块","桂皮"],["chili","4-6个","干辣椒"],["starAnise","1个","八角"],["vibe-e9a699e58fb6","1-3片","香叶"]],"pantry":[["rockSugar","5块","冰糖"],["wine","5ml","料酒"],["soy","4ml","生抽"],["salt","5-8克","盐"],["oil","10ml","食用油"],["water","400克","热水"]],"steps":[["腌制鳊鱼","鳊鱼改刀,放上姜片和料酒腌制 5-10 分钟"],["准备豆腐","老豆腐切块后放入水中备用"],["煎制鳊鱼","锅中加油，可以放点盐在锅里防止粘锅。把腌制的鱼用厨房纸擦干水分，放入锅中两面煎香"],["炒制佐料","等两面都煎好时，把鱼推向锅边，放入葱姜蒜、干辣椒、香叶、八角炒出香味"],["加入汤汁","加入料酒、生抽、老抽、冰糖、桂皮，倒入热水，水量和鱼平齐或者稍少"],["加入豆腐","大火烧开后，放入老豆腐，豆腐贴在锅边，加入食盐，转小火"],["慢炖收汁","小火烧 10-15 分钟，然后大火收点汁，即可出锅"]]},
  {"id":"other_bing-fen-de-zuo-fa","name":"冰粉的做法","category":"甜品","servings":1,"minutes":180,"difficulty":"简单","coverPath":"ai-generated/other_bing-fen-de-zuo-fa.jpg","sourcePath":"dishes/drink/冰粉/冰粉.md","calories":110,"tips":["操作时，需要注意观察凉白开的颜色和粘度变化","如颜色过浅或者水不黏，则说明冰粉籽量不足，或者是揉搓力度和时间没有到位"],"required":[["vibe-e586b0e7b289e7b1bd","200g","冰粉籽"],["vibe-e58789e799bde5bc80","2000g","凉白开"]],"optional":[["vibe-e89684e88db7e6b181","10ml","薄荷汁"],["vibe-e98187e6b0b4e58f91e58589e586b0e59d97","若干","遇水发光冰块"]],"pantry":[],"steps":[["准备水源","将凉白开倒入盆中"],["包裹冰粉籽","将冰粉籽全部用纱布包起来，开口处打结"],["手工揉搓","将包好的冰粉籽放入凉白开中，在凉白开中用力揉搓 6 分钟"],["静置凝固","将凉白开放置 2.5 小时，即可成型"],["调味点缀","随后将石凉粉用勺子装进准备好的一次性透明塑料杯中，加入 10ml 薄荷汁或者 10g 薄荷粉（柠檬汁、山楂汁、桑椹汁也可），再放入遇水发光冰块，用勺子慢慢搅拌均匀"]]},
  {"id":"other_bo-cai-chao-ji-dan","name":"菠菜炒鸡蛋","category":"素菜","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/other_bo-cai-chao-ji-dan.jpg","sourcePath":"dishes/vegetable_dish/菠菜炒鸡蛋/菠菜炒鸡蛋.md","calories":350,"tips":[],"required":[["spinach","350g","菠菜"],["egg","2个","鸡蛋"]],"optional":[],"pantry":[["oil","15ml","食用油"],["salt","5g","食用盐"]],"steps":[["处理菠菜","菠菜去根，洗净，放在篮子里，焯水"],["准备蛋液","将鸡蛋打入碗中，搅匀"],["热锅加油","热锅，加入 10ml 油"],["炒鸡蛋","油热后，倒入鸡蛋液，中火翻炒 15 秒，先煎成蛋饼，然后再用锅铲切成小块"],["盛出鸡蛋","关火，将鸡蛋块盛到盘子中，不要洗锅"],["炒菠菜","重新开火，倒入 5ml 油，油热后，放入菠菜，大火翻炒 15 秒后，倒入鸡蛋块，翻炒均匀"],["调味","加入 5g 盐、100ml 饮用水，大火翻炒 10 秒"],["出锅","关火，盛盘"]]},
  {"id":"other_bo-luo-ka-fei-te-diao","name":"菠萝咖啡特调","category":"饮料","servings":1,"minutes":10,"difficulty":"中等","coverPath":"ai-generated/other_bo-luo-ka-fei-te-diao.jpg","sourcePath":"dishes/drink/菠萝咖啡特调/菠萝咖啡特调.md","calories":180,"tips":["咖啡液建议选用花果风味，浓缩可以用中烘豆，冷萃可以用普通水洗或者日晒","倒入奶油时，高度尽量放低，让奶油能均匀漂浮在饮料表面形成奶盖","用新鲜的咖啡液和菠萝汁能大大提升整体风味口感"],"required":[["vibe-e59296e595a1e6b6b2","30ml","咖啡液"],["vibe-e88fa0e8909de6b181","60ml","菠萝汁"],["vibe-e586b0e59d97","50g","冰块"],["vibe-e88b8fe68993e6b0b4","30ml","苏打水"],["vibe-e5a5b6e6b2b9","30ml","奶油"],["milk","10ml","牛奶"]],"optional":[["vibe-e6b5b7e79b90","0.5g","海盐"],["vibe-e69c97e5a786e98592","5ml","朗姆酒"]],"pantry":[["sugar","8g","糖"]],"steps":[["混合基底液","杯子里依次加入冰块，咖啡液，菠萝汁和苏打水"],["制作奶盖","奶油加糖打发至湿性发泡，加入朗姆酒和牛奶均匀搅拌至具有流动性"],["铺设奶盖","在第一步混合液上方倒入奶油"],["最后装饰","奶油顶面撒上海盐"]]},
  {"id":"other_cao-mei-bing-qi-lin","name":"草莓冰淇淋","category":"甜品","servings":1,"minutes":20,"totalMinutes":480,"waitMinutes":460,"difficulty":"简单","coverPath":"ai-generated/other_cao-mei-bing-qi-lin.jpg","sourcePath":"dishes/dessert/草莓冰淇淋/草莓冰淇淋.md","calories":1653,"tips":["制作过程中注意安全，避免割/烫到手。","如果想让口感更丰富，可以适当增加重奶油的比例（按需调整）。","冷冻后的容器建议预先在室温放置1-2分钟，更易舀取。"],"required":[["vibe-e88d89e88e93","500克","草莓"],["vibe-e58aa0e7b396e782bce4b9b3","400克","加糖炼乳"],["vibe-e9878de5a5b6e6b2b9","6克","重奶油"],["vibe-e9a699e88d89e7b2be","6克","香草精"]],"optional":[],"pantry":[["sugar","45克","白砂糖"],["salt","2克","食盐"]],"steps":[["处理草莓","将草莓洗净去蒂，切成 5mm 的小块。将切碎的草莓分成两半，一半留待后续折叠入料，一半用于制作糖浆。"],["熬制草莓糖浆","将一半草莓碎和白砂糖放入酱汁锅中，用中火搅拌烹饪，直到草莓释放液体并形成糖浆。"],["浓缩糖浆","继续加热并不断搅拌，直到草莓分解变形，糖浆明显变稠。"],["冷却糖浆","当划开糖浆能保持分开 3 秒钟时即可关火。加入 1g 香草精和 1g 盐搅拌均匀，放在一旁彻底冷却。"],["打发冰淇淋底料","在碗中混合甜炼乳、重奶油、5g 香草精和 1g 盐。使用手动搅拌器搅打，直至混合物轻盈蓬松并形成柔软的尖峰。"],["混合与入模","将保留的另一半新鲜草莓碎折叠拌入底料中。将混合物转移到冷冻安全容器，淋上冷却的草莓糖浆，轻轻旋出纹路。"],["冷冻成型","盖上容器盖子，放入冰箱冷冻八小时，直至完全凝固后即可舀取食用。"]]},
  {"id":"other_cao-mei-jiang","name":"草莓酱","category":"酱料","servings":1,"minutes":120,"difficulty":"简单","coverPath":"ai-generated/other_cao-mei-jiang.jpg","sourcePath":"dishes/condiment/草莓酱/草莓酱.md","calories":1940,"tips":["如需要低糖饮食，可以考虑将白糖降低到 200g"],"required":[["vibe-e88d89e88e93","1200g","草莓"]],"optional":[],"pantry":[["sugar","400g","白砂糖"]],"steps":[["清洗草莓","草莓洗净去叶"],["切碎草莓","将草莓切碎放入合适的碗中"],["混合糖分","将白糖倒入碗中与草莓搅拌均匀"],["静置出汁","碗用保鲜膜覆盖静置 1 小时"],["大火烧开","将静置的草莓和糖的混合物倒入不粘锅中开大火烧开"],["小火熬煮","烧开后转小火不断搅拌直至果酱呈粘稠状关火"],["装罐保存","待草莓酱冷却后装入准备好的密封罐中"]]},
  {"id":"other_chao-fang-bian-mian-de-zuo-fa","name":"炒方便面的做法","category":"主食","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/other_chao-fang-bian-mian-de-zuo-fa.jpg","sourcePath":"dishes/staple/炒方便面/炒方便面.md","calories":789,"tips":["在北京，可以考虑在盛盘后加入芝麻酱。如果芝麻酱太浓稠，可以 1:1 兑水稀释。","冷水冲面是保证面条下锅炒不坨、不粘锅、保持 Q 弹的核心原理。","进阶方案：将面饼凉水浸泡 2 分钟后捞出沥干，上锅大火蒸 8 分钟，口感更劲道。"],"required":[["vibe-e696b9e4bebfe99da2","1包","方便面"],["egg","1个","鸡蛋"],["vibe-e696b9e4bebfe99da2e8b083e69699e58c85","1套","方便面调料包"]],"optional":[["vibe-e781abe885bfe882a0","1个","火腿肠"]],"pantry":[["oil","18ml","食用油"],["water","1200ml","水"]],"steps":[["火腿肠预处理","将火腿肠撕开包装，切成宽度 1cm 的小块。"],["煮面打散","向煮锅中加入 1200 ml 水，完全煮沸后加入面饼，煮 45 秒并用筷子挑动打散。"],["面条冷冲处理","舀出 80ml 热面汤备用。将面条捞出立即用凉水冲洗并沥干水分。"],["调制调料汁","在碗中混合所有菜包、酱包及 50%-80% 的粉包，倒入 80ml 热面汤搅匀。"],["预炒鸡蛋","鸡蛋打散。热锅 20s 加入份数*8ml 油，翻炒蛋液约 20s 至成固态后盛出。"],["炒制主料","重新热锅 20s，加份数*10ml 油。先下火腿肠翻炒 10s，再加入面条翻炒 30s。"],["混合出锅","倒入调料汁翻炒 30s，最后加入煎鸡蛋翻炒 30s 即可关火。"]]},
  {"id":"other_chao-hua-dan","name":"炒滑蛋","category":"素菜","servings":1,"minutes":5,"difficulty":"简单","coverPath":"ai-generated/other_chao-hua-dan.jpg","sourcePath":"dishes/vegetable_dish/炒滑蛋/炒滑蛋.md","calories":391,"tips":["最后可根据个人口味撒些黑胡椒或者盐来调味。"],"required":[["egg","4颗","鸡蛋"],["milk","30ml","牛奶"]],"optional":[],"pantry":[["oil","10ml","食用油"]],"steps":[["准备蛋液","鸡蛋加入牛奶以及 5ml 食用油搅拌均匀，备用"],["热锅","大火烧热平底锅约 30s, 加入 5ml 食用油"],["入锅","烧 30s 转小火, 并且放入搅拌好的鸡蛋"],["推滑","在锅中静置 5 秒后，用锅铲将蛋液从边缘缓慢推向中间"],["凝固出锅","翻炒至鸡蛋大致凝固后关火，装盘"]]},
  {"id":"other_chao-liang-fen-de-zuo-fa","name":"炒凉粉的做法","category":"素菜","servings":1,"minutes":15,"difficulty":"中等","coverPath":"ai-generated/other_chao-liang-fen-de-zuo-fa.jpg","sourcePath":"dishes/staple/炒凉粉/炒凉粉.md","calories":567,"tips":["选择凉粉时最好选用豌豆淀粉制作成的凉粉，条件不允许的话红薯淀粉或其他也可","炒制过程中尽量使用中小火，避免凉粉粘锅或调料焦化"],"required":[["vibe-e58789e7b289","500g","凉粉"],["vibe-e78e89e7b1b3e6b2b9","10ml","玉米油"],["garlic","10g","大蒜"],["scallion","15g","香葱"],["vibe-e8b186e793a3e985b1","15g","豆瓣酱"],["vibe-e58d81e4b889e9a699","5g","十三香"],["vibe-e4b8ade7b297e8bea3e6a492e99da2","15g","中粗辣椒面"],["vibe-e79fbfe6b389e6b0b4","20ml","矿泉水"]],"optional":[],"pantry":[["soy","20ml","生抽"],["darkSoy","10ml","老抽"],["salt","5g","食盐"]],"steps":[["食材改刀","凉粉改刀切麻将块大小"],["爆香底料","开小火，起锅烧油，锅烧微热后，下入蒜末爆香后加入豆瓣酱炒出红油"],["初步翻炒","将凉粉块下入锅中，翻炒 10 秒"],["调色加辣","加入生抽提味，老抽上色，翻炒均匀后加入辣椒面继续翻炒均匀"],["调味阶段","加入食盐、十三香继续翻炒 10 秒"],["加水煨煮","加入准备好的矿泉水，再次翻炒 10 秒，待汤汁浓稠后，关火出锅装盘"],["撒葱点缀","撒上葱花即可完成"]]},
  {"id":"other_chao-yi-da-li-mian","name":"炒意大利面","category":"主食","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_chao-yi-da-li-mian.jpg","sourcePath":"dishes/staple/炒意大利面/炒意大利面.md","calories":406,"tips":[],"required":[["vibe-e6848fe5a4a7e588a9e99da2","50g","意大利面"],["beef","5片","肥牛片"],["vibe-e795aae88c84e985b1202f20e9bb91e883a1e6a492e985b1","10g","番茄酱 / 黑胡椒酱"]],"optional":[],"pantry":[["vibe-e88f9ce7b1bde6b2b9","5ml","菜籽油"],["salt","2g","食盐"],["water","250g","水"]],"steps":[["烧水","加入 250 克水 / 人"],["煮面","待水烧开，下入面条，中火煮 15 - 20 分钟"],["备面","捞出面条，盛入盘中备用"],["初炒面条","热锅倒入食用油，待油温中热，下入面条翻炒一分钟"],["调味与配料","放入 10 克番茄酱、肥牛、加入 2g 食盐，继续翻炒一分钟"],["起锅","起锅装盘"]]},
  {"id":"other_cheng-bao-dan","name":"蛏抱蛋","category":"水产","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_cheng-bao-dan.jpg","sourcePath":"dishes/aquatic/蛏抱蛋/蛏抱蛋.md","calories":1229,"tips":["更多情况下，福州当地会选用马蹄（解腻）和马铃薯（洗油），因为疫情期间买不到，所以选用了凤梨","闽菜以甜为主，如果吃不惯的可以放弃白糖","可以通过勺子敲打瘦肉块，听到声响来判断是否炸透瘦肉"],"required":[["vibe-e89b8fe5ad90","200g","蛏子"],["egg","2个","鸡蛋"],["onion","0.25个","洋葱"]],"optional":[],"pantry":[["oil","100ml","食用油"],["starch","20g","淀粉"],["soy","5ml","生抽"],["vibe-e9b8a1e7b2be","5ml","鸡精"],["wine","5ml","料酒"]],"steps":[["焯水去壳","烧开水，将蛏子放入水中，水煮 2 分钟后，捞上来去壳，放入大碗"],["调味搅拌","往大碗中加入洋葱、生抽、料酒、鸡精、生粉后，充分搅拌"],["混合蛋液","往大碗中打入 2 个 鸡蛋，继续搅拌"],["煎炸成品","起锅烧油，倒入碗中蛏子，煎炸至单面金黄后，翻面继续煎炸"]]},
  {"id":"other_chuan-wei-kao-yu","name":"川味烤鱼","category":"水产","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_chuan-wei-kao-yu.jpg","sourcePath":"dishes/aquatic/混合烤鱼/烤鱼.md","calories":2152,"tips":["食盐、胡椒粉、孜然粉、食用油、生抽、白糖等的使用量可根据个人口味和食材比例灵活调整，无需死磕分量。","如果没有烤箱，用平底锅煎鱼时一定要注意控温，保持鱼皮完整。","配菜可以根据喜好更换成土豆片、藕片等，但难熟的菜建议先焯水。"],"required":[["vibe-e88d89e9b1bc","1条（约1500g）","草鱼"],["vibe-e5a4a7e891b1","0.5根","大葱"],["garlic","8粒","大蒜"],["vibe-e6a182e79aae","1小片","桂皮"],["vibe-e9a699e58fb6","2张","香叶"],["vibe-e99d92e88ab1e6a492","1小把","青花椒"],["vibe-e5b9b2e8bea3e6a492e6aeb5","10个","干辣椒段"],["pepper","4个","灯笼椒"],["vibe-e781abe99485e5ba95e69699","0.5包","火锅底料"],["vibe-e58d83e5bca0","1张","千张"],["beanSprout","1份","绿豆芽"],["onion","0.5个","洋葱"],["vibe-e8b186e793a3e985b1","15-20g","豆瓣酱"],["celery","2根","芹菜"],["vibe-e7869fe88ab1e7949fe7b1b3","适量","熟花生米"],["vibe-e799bde88a9de9babb","适量","白芝麻"],["vibe-e5ad9ce784b6e7b289","适量","孜然粉"]],"optional":[["cilantro","适量","香菜"]],"pantry":[["oil","20ml","食用油"],["wine","10-15ml","料酒"],["salt","17-22g","食用盐"],["whitePepper","5-10g","白胡椒粉"],["starAnise","2个","八角"],["sugar","5g","白糖"],["soy","5ml","生抽"]],"steps":[["处理草鱼","草鱼从背部切开，两面沿着鱼背往下划几刀，注意不要划到肚皮。用热水或刷子在流水下刷洗，去除表面粘液直到手感不黏。"],["腌制鱼肉","将鱼放入容器，加料酒、10g白胡椒粉、5g食盐抹匀，腌制二十分钟。"],["准备香料","大葱切块，大蒜粒对半切开，与八角、香叶、桂皮同放一个容器。"],["准备辣椒","干辣椒段一分为二，与灯笼椒装在一起。"],["处理蔬菜","芹菜切小段，洋葱切丝。"],["焯水处理","豆芽焯水备用；千张焯水后切成丝。"],["烤制或煎制鱼","有烤箱：烤盘刷油，鱼皮朝下烤至两面金黄；无烤箱：热锅热油撒2g盐，下鱼煎至两面金黄。出锅前撒孜然粉。"],["炒制底料","锅中入20ml油，热后倒入大葱、大蒜、八角、香叶炒香。"],["熬制红油汤汁","加入半包火锅底料和15-20g豆瓣酱炒出红油，加5g白糖、10g食盐、5ml生抽，倒入适量清水煮开。"],["组合食材","依次下入芹菜、豆芽、千张丝稍微烫一下，铺上洋葱丝，放上烤鱼。加入干辣椒、灯笼椒和青花椒。"],["激发香味","另烧热油，浇在辣椒和花椒上。撒上花生米、葱花、白芝麻、香菜。"],["最后炖煮","中小火继续煮5-6分钟，让配菜和鱼肉充分吸收汤汁。"]]},
  {"id":"other_cong-shao-hai-shen","name":"葱烧海参","category":"水产","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_cong-shao-hai-shen.jpg","sourcePath":"dishes/aquatic/葱烧海参/葱烧海参.md","calories":299,"tips":["操作时，需要注意观察锅中的水量，如快见底的时候就直接接入水淀粉即可。"],"required":[["vibe-e6b3a1e58f91e5a5bde79a84e6b5b7e58f82efbc88e58c97e69e81e58f82efbc89","4个","泡发好的海参（北极参）"],["vibe-e5a4a7e891b1e891b1e799bd","1根","大葱葱白"]],"optional":[],"pantry":[["oil","20-25ml","食用油"],["oysterSauce","20g","蚝油"],["soy","5g","生抽"],["sugar","2g","白糖"],["starch","2g","淀粉"]],"steps":[["处理大葱","葱白切成 1cm 的段，备用。"],["处理海参","海参切成 1cm 的段，备用。"],["调制料汁","准备一个空碗，倒入 20g 蚝油， 10g 生抽， 2g 白糖，搅拌均匀。"],["准备水淀粉","另一个空碗倒入淀粉，水，制备水淀粉，勾芡用。"],["热锅凉油","热锅，锅内放入 20ml - 25ml 食用油。等待 10 秒让油温升高。"],["炸制葱油","放入葱白，调小火，大概煎 3-5 分钟即可。"],["盛出葱段","用筷子夹出葱白，放入盘中备用。"],["炒香料汁","倒入调好的料汁，炒香，等待 1 - 2 分钟 。"],["翻炒海参","放入切好的海参，翻炒 1 分钟"],["焖煮入味","加入 100 ml 的水， 中小火， 等待 5 分钟"],["勾芡回葱","等待锅中汤汁快干的时候，加入水淀粉，加入前面取出的葱白"],["收汁盛盘","在外观呈粘稠状态后关火，盛盘"]]},
  {"id":"other_cong-you-gui-yu","name":"葱油桂鱼","category":"水产","servings":2,"minutes":45,"difficulty":"中等","coverPath":"ai-generated/other_cong-you-gui-yu.jpg","sourcePath":"dishes/aquatic/葱油桂鱼/葱油桂鱼.md","calories":311,"tips":["本菜谱容错性高，适合多种口味人群。","原料不限于桂鱼，可用鲈鱼、多宝鱼等海鱼代替。","不建议使用淡水鱼，因为淡水鱼寄生虫风险相对较高。","鱼身的黏液、黑膜和贴骨血是腥味的主要源头，务必清理干净。"],"required":[["vibe-e6a182e9b1bc","1斤(500g)","桂鱼"],["scallion","1根(约30cm)","小葱"],["vibe-e5b08fe7b1b3e8bea3","2个","小米辣"],["ginger","50g","姜"],["vibe-e6a48de789a9e6b2b9","15g","植物油"]],"optional":[],"pantry":[["wine","25g","料酒"],["salt","8g","盐"],["vibe-e892b8e9b1bce8b189e6b2b9","10g","蒸鱼豉油"],["water","5L","清水"]],"steps":[["处理鱼鳞","将桂鱼表面所有鳞片刮干净，确保无残留。"],["清理腹腔","用厨房纸将鱼肚子里的贴骨血和黑膜擦干净。"],["去除黏液","用菜刀在鱼身表面来回刮几次去除黏液，然后用清水冲洗内外。"],["鱼身改刀","擦干鱼身水分，从鱼鳃边开始每隔3cm纵向划一刀，深达脊椎骨，双面同理。"],["准备姜片","姜去皮切成3mm厚的姜片。"],["准备辅料","小米辣切2mm圆片或1mm丝；小葱切3cm段，粗葱从中劈开。"],["按摩腌制","加入盐和料酒，戴手套对鱼全身按摩1分钟，确保涂抹均匀。"],["塞姜腌制","在每个刀口塞入姜片，腹中放3片，腌制10分钟。"],["准备蒸锅","蒸锅加5L水烧开，放上蒸笼。"],["蒸前二次处理","倒掉腌制出的水分和料酒，洗净鱼身内外并用厨房纸擦干。"],["上锅蒸制","重新在刀口和腹部塞入姜片，平放盘中，中火蒸20分钟。"],["淋豉油摆盘","取出蒸盘，保留盘中鱼汤，淋上10g蒸鱼豉油，撒上葱段和小米辣。"],["熬油泼油","铁锅中小火慢熬植物油5分钟，然后均匀淋在鱼身上。"]]},
  {"id":"other_di-san-xian","name":"地三鲜","category":"素菜","servings":2,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/other_di-san-xian.jpg","sourcePath":"dishes/vegetable_dish/地三鲜/地三鲜.md","calories":264,"tips":["糖比淀粉多是合理的，淀粉主要起物理增稠作用，不负责调味。","茄子煎炸后体积会缩小约4倍，下锅量大出锅量小属于正常物理变化。","青椒入油锅瞬间易溅油，务必使用锅盖挡在身前保护安全。","淀粉在调料碗中容易沉淀，入锅前必须再次彻底搅拌均匀。"],"required":[["eggplant","200g","茄子"],["potato","150g","土豆"],["vibe-e5b096e6a492","3-4个","尖椒"],["scallion","5g","葱"],["ginger","5g","姜"],["garlic","15g","蒜"],["vibe-e8b186e793a3e985b1","15ml","豆瓣酱"]],"optional":[],"pantry":[["starch","8g","淀粉"],["soy","10ml","生抽"],["sugar","10g","白糖"],["oil","约180ml","食用油"],["water","80ml","清水"]],"steps":[["清洗与去皮","土豆、茄子、尖椒洗净，土豆去皮。"],["食材切块","茄子、土豆切成15g的不规则小块；尖椒顺纹路撕成比土豆、茄子略大25%的块。"],["食材脱水","尽可能除去青椒表面水分，使用厨房纸或风干半小时。"],["准备辅料与料汁","葱切段(5g)，姜切沫(5g)，蒜剁碎(15g)并均分为两份。取碗放入生抽10ml、糖10g、淀粉8g、清水80ml搅拌均匀。"],["煎炸土豆","热锅加150ml油，加入土豆煎炸3-4分钟至金黄色、筷子能扎透，捞出留油。"],["煎炸茄子","加入茄子煎炸2-3分钟至7分熟，待其变软、边缘微焦并吐油后捞出。"],["过油尖椒","视情况补油，加入尖椒块煎炸约15秒起虎皮后立刻捞出，倒出锅内余油。"],["爆香底料","重新热锅加15ml新底油，中小火爆香葱、姜及一半蒜蓉(7.5g)，再加入豆瓣酱炒出红油。"],["勾芡与翻炒","倒入调料碗大火高速搅拌至汤汁黏稠，倒入所有食材大火翻炒20秒均匀挂浆。"],["撒蒜出锅","关火，撒入剩余的7.5g蒜蓉，翻拌均匀后盛盘。"]]},
  {"id":"other_dian-fan-bao-san-wen-yu-chui-fan","name":"电饭煲三文鱼炊饭","category":"主食","servings":1,"minutes":45,"difficulty":"简单","coverPath":"ai-generated/other_dian-fan-bao-san-wen-yu-chui-fan.jpg","sourcePath":"dishes/staple/电饭煲三文鱼炊饭/电饭煲三文鱼炊饭.md","calories":889,"tips":["建议根据个人口味在出锅前加入少量黑胡椒或葱花提味。"],"required":[["vibe-e7b1b3","50g/人","米"],["vibe-e4b889e69687e9b1bc","300g/人","三文鱼"],["vibe-e69c89e79b90e7899be6b2b9","1汤匙/人","有盐牛油"]],"optional":[["vibe-e7b29fe7b1b3","适量","粟米"],["vibe-e98791e88f87","适量","金菇"],["vibe-e586ace88f87","适量","冬菇"]],"pantry":[["water","适量","水"]],"steps":[["处理鱼肉","三文鱼去鳞，去骨。"],["处理辅料","将金菇、冬菇洗净并切碎。"],["洗米","洗米三次，沥干多余水分。"],["放入食材","把三文鱼、米、牛油放入电饭煲中。"],["加水","根据电饭煲的刻度放水。"],["开启烹饪","把电饭煲调较至煲饭模式，等待大约 30 - 45 分钟直到完成。"]]},
  {"id":"other_dian-fan-bao-zheng-mi-fan","name":"电饭煲蒸米饭","category":"主食","servings":1,"minutes":40,"difficulty":"简单","coverPath":"ai-generated/other_dian-fan-bao-zheng-mi-fan.jpg","sourcePath":"dishes/staple/米饭/煮锅蒸米饭.md","calories":442,"tips":["不论什么容器，水的量都是可以使用“指尖量水法”煮出好米饭。","水的多少是能够严重影响一碗好米饭的口感。","江南米比较细长，而北方大米会比较短且圆，不同品种对水量的需求有微调。","更多信息请参考所使用的电饭煲说明书。"],"required":[["vibe-e6b19fe58d97e7b1b3e68896e58c97e696b9e5a4a7e7b1b3","100ml-200ml","江南米或北方大米"]],"optional":[],"pantry":[["water","适量（见指尖量水法）","水"]],"steps":[["清洗米","将准备好的大米放入容器，用清水轻轻揉洗，洗去表面灰尘，重复1-2次。"],["加水调配","将洗净的米放入电饭煲内胆，加入水。使用指尖量水法确定水量：江南米水面没过食指触米点约2.6厘米；北方大米没过约2厘米。"],["开启加热","将内胆放入电饭煲，连接电源，按下煮饭键进入加热模式。等待大约 30 分钟。"],["自动保温","待电饭煲自动跳至保温模式。"],["焖饭","保持保温状态，让米饭在电饭煲中继续焖 10-15 分钟。"],["盛出","用饭勺将米饭拨松，盛入碗中即可食用。"]]},
  {"id":"other_dong-gua-niang-rou-de-zuo-fa","name":"冬瓜酿肉的做法","category":"荤菜","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_dong-gua-niang-rou-de-zuo-fa.jpg","sourcePath":"dishes/meat_dish/冬瓜酿肉/冬瓜酿肉.md","calories":578,"tips":["操作时，拿出冬瓜酿肉时注意碟子很烫，小心操作。","卷肉技巧需要多加练习，冬瓜片腌制到位后会非常柔软易卷。"],"required":[["mince","300g","猪肉末"],["winterMelon","200g","冬瓜"],["scallion","20g","葱花"],["vibe-e6b0b4e6b780e7b289","25g淀粉+50ml水","水淀粉"],["ginger","30g","姜"]],"optional":[["egg","1个","鸡蛋"]],"pantry":[["whitePepper","5g","胡椒粉"],["soy","10ml","生抽"],["starch","5g","淀粉"],["salt","20g","盐"]],"steps":[["冬瓜切片","冬瓜去皮，切成 25cm 长 3cm 厚的片"],["腌制冬瓜","将切好的冬瓜放入碗中，放入 15g 盐，将冬瓜抹匀，放置 10 分钟"],["准备肉馅","换个碗放入肉末，葱姜末， 5g 盐，淀粉 5g，胡椒粉，生抽"],["搅拌肉馅","使用筷子在肉末中进行顺时针搅拌，搅拌到食材颜色没有明显对比"],["清洗冬瓜","将腌制好的冬瓜使用清水洗三遍"],["卷肉操作","拿出 1 片冬瓜片卷起来，并把肉塞进去"],["摆盘","放入碟子中摆到碟子的边缘"],["加入鸡蛋","打入 1 个鸡蛋到中间圆圈处"],["蒸制","放入普通铁锅中水烧开后，蒸 15 分钟，盖上锅盖"],["出锅","开盖，取出蒸好的冬瓜酿肉"],["熬制芡汁","将碟子里的原汁倒入锅中，放入水淀粉，加入 50ml 清水烧开"],["淋汁完成","将熬好的芡汁均匀淋到冬瓜酿肉上"]]},
  {"id":"other_dou-chi-ling-yu-you-mai-cai","name":"豆豉鲮鱼油麦菜","category":"水产","servings":2,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/other_dou-chi-ling-yu-you-mai-cai.jpg","sourcePath":"dishes/meat_dish/豆豉鲮鱼油麦菜/豆豉鲮鱼油麦菜.md","calories":416,"tips":["鲮鱼罐头本身带味道，加入生抽后够味，无需下盐","建议全程动作迅速，以保持油麦菜的脆爽口感"],"required":[["vibe-e6b2b9e9baa6e88f9c","500g","油麦菜"],["vibe-e79498e7abb9e7898ce9b2aee9b1bce7bd90e5a4b4","1罐(约250g)","甘竹牌鲮鱼罐头"],["garlic","4瓣","蒜"]],"optional":[],"pantry":[["soy","20g","生抽"],["sugar","3g","白糖"],["oil","15ml","食用油"]],"steps":[["食材预处理","油麦菜洗净后切成长段；打开鲮鱼罐头，去除鲮鱼的主刺，将鱼肉切成小段；大蒜去皮切成末。"],["初炒油麦菜","热锅倒入食用油，待油热后加入油麦菜，快速翻炒至叶片萎蔫并略微出水，立即盛出，倒掉锅中炒出的余水。"],["煸香蒜末","重新洗锅或控干后热锅，倒入鲮鱼罐头里的油（更香），放入蒜末中小火煸炒出香味。"],["炒制豆豉鲮鱼","在锅中加入罐头里的豆豉翻炒片刻，再加入切好的鲮鱼段，中火翻拌均匀。"],["合炒调味","将盛出的油麦菜重新入锅，加入生抽和白糖，大火快速翻炒均匀即可出锅。"]]},
  {"id":"other_dou-jiao-men-mian","name":"豆角焖面","category":"主食","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_dou-jiao-men-mian.jpg","sourcePath":"dishes/staple/豆角焖面/豆角焖面.md","calories":1386,"tips":["面条粗细区别：毛细（像细粉丝）、细（像香头）、二细（常规炒面粗细）、三细（像粗粉条）、韭叶（像韭菜叶宽）、大宽（像宽粉）。","焖面过程中要注意火候，防止底部烧焦。","最后加入生蒜粒是北方焖面的灵魂做法。"],"required":[["vibe-e9b29ce99da2e69da1","300g","鲜面条"],["porkBelly","100g","五花肉"],["greenBean","150g","豆角"],["vibe-e88097e6b2b9","5g","耗油"],["vibe-e58d81e4b889e9a699","1g","十三香"],["scallion","10g","葱"],["garlic","10g","蒜头"],["ginger","5g","姜"]],"optional":[],"pantry":[["salt","2g","盐"],["oil","10-18ml","食用油"],["vibe-e9b8a1e7b2be","2g","鸡精"],["vibe-e591b3e7b2be","1g","味精"],["soy","10ml","生抽"],["darkSoy","5ml","老抽"],["water","150ml","热水"]],"steps":[["处理蔬菜","将豆角切成 5cm - 6cm 的小段；葱切成 1cm - 2cm 小段；姜切成 1mm x 1mm x 3cm 的长条；蒜拍碎切成 1mm 粒度。"],["切肉","将五花肉切成 2mm 厚度的肉片。"],["热锅挂油","锅烧热至手放上方有明显烤手感，加入食用油并摇晃使油挂满锅壁三分之二。"],["爆香葱姜","放入全部姜和葱段，翻炒爆香 5 秒。"],["炒肉片","放入全部肉片，静置 5 秒后再翻炒，使肉片均匀裹油并变色。"],["调味及炒豆角","沿锅边淋入生抽翻炒，再依次加入盐、老抽、耗油、十三香、鸡精和豆角，翻炒 2 分钟。"],["加水及舀汤","加入热水，水开后用勺子舀出锅内 1/2 的菜汤备用。"],["铺面焖煮","将面条平铺在菜上方，盖盖中火焖 5 分钟。"],["二次淋汤","打开锅盖，将舀出的菜汤分次均匀撒在面条上，盖盖再中火焖 3 分钟。"],["最后调味与搅拌","撒入蒜粒和味精，使用筷子不断翻炒将菜、肉、面搅拌均匀后关火。"]]},
  {"id":"other_fan-sha-yu-tou","name":"反沙芋头","category":"甜品","servings":1,"minutes":20,"difficulty":"中等","coverPath":"ai-generated/other_fan-sha-yu-tou.jpg","sourcePath":"dishes/dessert/反沙芋头/反沙芋头.md","calories":397,"tips":["刚做好的反沙芋头很烫，小心烫嘴哦","再配上茶，啊~真惬意啊"],"required":[["vibe-e88d94e6b5a6e88a8be5a4b4","200g","荔浦芋头"],["scallion","少许","葱"]],"optional":[],"pantry":[["sugar","30g","白砂糖"],["water","15g","水"],["oil","适量（需没过芋头）","食用油"]],"steps":[["切条备用","芋头切成长条。"],["热油","锅中加入可以没过芋头的油，加热至油温升高。"],["油炸芋头","将芋头条放入油中炸至浮起。"],["回收炸油","将炸芋头的油盛起存放。"],["熬制糖浆","将30g白砂糖和15g水按照2:1比例倒入锅中加热。"],["关火反沙","倒入葱花和炸好的芋头，立即关火翻炒。"],["装盘","将成品装入盘中即可上桌。"]]},
  {"id":"other_ga-li-fei-niu","name":"咖喱肥牛","category":"荤菜","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/other_ga-li-fei-niu.jpg","sourcePath":"dishes/meat_dish/咖喱肥牛/咖喱肥牛.md","calories":1821,"tips":["咖喱块不用捣碎，直接整块投入即可。","操作时，需要注意搅拌食材，避免食材调味料不均匀。","如果喜欢更浓稠的汤汁，最后可以开大火稍微收一下汁。"],"required":[["vibe-e9a699e58fb6","1片","香叶"],["vibe-e7baafe7899be5a5b6","50ml","纯牛奶"],["onion","100g","洋葱"],["carrot","150g","胡萝卜"],["potato","200g","土豆"],["vibe-e882a5e7899be58db7","300g","肥牛卷"],["vibe-e59296e596b1e59d97","2块(约100g)","咖喱块"]],"optional":[],"pantry":[["oil","10ml-15ml","食用油"],["water","适量","冷水"]],"steps":[["食材预处理","洋葱切成条状、胡萝卜以及土豆切成块状，备用"],["肥牛焯水","烧一锅开水，水沸时将肥牛卷下锅，捞出血沫后放在一边沥水，备用"],["热油","热锅，锅内放入 10ml - 15ml 食用油，等待 10 秒让油温升高"],["炒洋葱","放入洋葱，翻炒至洋葱变软变透明"],["炒蔬菜","放入土豆以及胡萝卜翻炒 2 分钟"],["加水","加入冷水至淹没所有食材即可"],["炖煮蔬菜","将香叶、咖喱块投入锅中，盖上锅盖，待水沸腾后将火调小然后等待直至土豆块以及胡萝卜块炖至软烂（可用筷子确认）"],["混合出锅","加入肥牛卷以及牛奶，盖上锅盖再小火煮 2-3 分钟即可出锅（用勺子搅拌食材，注意力度，避免肥牛卷破碎）"]]},
  {"id":"other_gan-bian-zi-ji","name":"干煸仔鸡","category":"荤菜","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_gan-bian-zi-ji.jpg","sourcePath":"dishes/meat_dish/干煸仔鸡/干煸仔鸡.md","calories":1300,"tips":["不舍得使用宽油油炸的话，可改用更少的油煎鸡块和土豆块。会增长用时，部分影响口感，但不会影响总体味道。","豆瓣酱的咸度较高，请根据个人口味酌情调整盐的用量。","复炸步骤是外酥里嫩的关键，建议不要省略。"],"required":[["vibe-e9b8a1e885bfe88289","400g","鸡腿肉"],["potato","200g","土豆"],["vibe-e99d92e6a492","60g","青椒"],["garlic","10g","蒜瓣"],["vibe-e983abe58ebfe7baa2e6b2b9e8b186e793a3e985b1","40g","郫县红油豆瓣酱"],["vibe-e88ab1e6a492e7a28e","2g","花椒碎"]],"optional":[["vibe-e9b8a1e7b2be","3g","鸡精"]],"pantry":[["salt","3g","盐"],["whitePepper","2g","胡椒粉"],["soy","5g","生抽"],["darkSoy","2g","老抽"],["wine","5g","料酒"],["starch","20g","淀粉"],["sugar","30g","白糖"]],"steps":[["食材改刀","鸡腿去骨（如使用鸡腿排可忽略此步骤），鸡腿肉用刀背砸一砸，切成 2cm 的块。"],["腌制鸡肉","鸡腿肉中加入盐、鸡精（可选）、胡椒粉、生抽、老抽、料酒，抓拌至粘手时加入淀粉拌匀，加入食用油防止粘连，腌制 30 分钟。"],["土豆预处理","土豆去皮，切成 2cm 的块，沸水煮 5 分钟后捞出，控干水分，防止油炸时爆锅。"],["配菜准备","青椒去籽，切成 2cm 小片，放在笊篱中备用。"],["初炸土豆","锅中加入宽油，油温烧至 180℃ 时，下入土豆块炸 3 分钟后捞出。"],["初炸鸡块","待油温再次升高到 180℃时，下入鸡块炸 2 分钟后捞出。"],["复炸鸡块","待油温再次升高到 180℃时，下入鸡块复炸 1 分钟后捞出。"],["复炸土豆及青椒断生","待油温再次升高到 180℃时，下入土豆块复炸 1 分钟后，将锅中的油和土豆块经过笊篱过滤倒出，让笊篱上的青椒片断生。"],["熬制酱汁","锅中加入 5ml 食用油，小火煸炒蒜瓣至发黄，下入红油豆瓣酱煸炒出香，下入白糖炒融化，下入花椒碎，加 40ml 清水，不停搅拌至酱汁粘稠。"],["混合成菜","下入炸好的鸡块、土豆块、青椒片，搅拌均匀后出锅。"]]},
  {"id":"other_gan-guo-hua-cai","name":"干锅花菜","category":"素菜","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/other_gan-guo-hua-cai.jpg","sourcePath":"dishes/vegetable_dish/干锅花菜/干锅花菜.md","calories":759,"tips":["焯水后必须充分沥干水分，否则口感不脆。","五花肉要煸炒至出油焦黄才香。"],"required":[["vibe-e88ab1e88f9c","400g","花菜"],["porkBelly","100g","五花肉"],["vibe-e8bea3e6a492","1-2 根","辣椒"],["garlic","3-4 个","蒜瓣"]],"optional":[],"pantry":[["soy","10ml","生抽"],["sugar","5g","白糖"],["salt","2g","盐"],["oil","10ml","油"]],"steps":[["处理花菜","花菜朵朝下，没入淡盐水中浸泡 20 分钟。然后洗净用小刀拆成小朵。"],["焯水过凉","入开水锅中焯水 1 分钟，捞出立即用冷水冲淋至完全凉透，沥水备用。"],["切配辅料","五花肉切成薄片，大蒜白色切下用刀背拍扁，小红辣椒切成段。"],["爆香葱白","锅烧热放油，油热下大葱白爆香。"],["煸炒五花肉","下五花肉片入锅，用中火煸炒至表面全部变色，继续煸炒一会儿，把肥肉部分的油份逼出一部分。"],["加入主料","倒入红辣椒段和花菜，翻炒几下。"],["调味","加入 10 ml 生抽。"],["大火翻炒","再加入 5 g 白糖，转大火不断翻炒 1 分钟。"],["收尾焖制","把大蒜叶部分切成段，放入锅中，翻炒几下后，关火盖上盖子焖 1 分钟即可。"]]},
  {"id":"other_gan-jian-a-gen-ting-hong-xia","name":"干煎阿根廷红虾","category":"水产","servings":1,"minutes":20,"difficulty":"中等","coverPath":"ai-generated/other_gan-jian-a-gen-ting-hong-xia.jpg","sourcePath":"dishes/aquatic/干煎阿根廷红虾/干煎阿根廷红虾.md","calories":309,"tips":["柠檬可提升虾的口感，但偏酸，可以根据喜好添加，也可以不用","趁热吃"],"required":[["vibe-e998bfe6a0b9e5bbb7e7baa2e899be","2-3 只","阿根廷红虾"],["vibe-e6b5b7e79b90","5g","海盐"],["vibe-e9bb91e883a1e6a492","适量","黑胡椒"],["vibe-e799bde891a1e89084e98592","20ml","白葡萄酒"],["cilantro","3 片","香菜"],["onion","10g","洋葱"],["ginger","10g","生姜"],["garlic","10g","大蒜"]],"optional":[["vibe-e69fa0e6aaac","1 片","柠檬"]],"pantry":[["soy","1ml","生抽"],["vibe-e6a984e6a684e6b2b9","2 调羹","橄榄油"]],"steps":[["解冻","阿根廷红虾解冻，最好是提前 1 天从速冻取出放到冷藏里自然解冻。"],["清洗吸水","解冻好的红虾洗净擦干备用。"],["切配辅料","生姜切片，洋葱切小方块，香菜叶茎分离并切碎，大蒜压碎切成末。"],["煸炒香料","大火热锅，倒入两调羹橄榄油，放入生姜片、洋葱块和香菜茎煸炒。"],["取出香料","约 1 分钟后取出生姜、洋葱和香菜茎，弃用。"],["煎虾单面","调中大火，放入红虾煎约 2 分钟，同时给每只虾刷上一层油。"],["翻面加蒜","待底面虾壳微微焦黄时翻面，撒入大蒜碎末，轻微晃动平底锅。"],["喷入白酒","约 1 分钟后添加 20ml 白葡萄酒。"],["调味","再煎 1 分钟后调中小火，均匀撒上一层盐和黑胡椒。"],["提鲜","给每只虾滴上一滴生抽。"],["撒花装盘","撒上香菜叶，装入盘中。"],["装饰","切好柠檬片，摆放到盘边即可。"]]},
  {"id":"other_gong-bao-ji-ding","name":"宫保鸡丁","category":"荤菜","servings":1,"minutes":90,"difficulty":"中等","coverPath":"ai-generated/other_gong-bao-ji-ding.jpg","sourcePath":"dishes/meat_dish/宫保鸡丁/宫保鸡丁.md","calories":1790,"tips":["辣椒依据个人口味酌量添加，怕辣可去籽"],"required":[["vibe-e6898be69eaae885bfefbc88e68896e9b8a1e883b8e884afe88289efbc89","1 支（约 350g）","手枪腿（或鸡胸脯肉）"],["vibe-e5a4a7e891b1","1 根（约 180g）","大葱"],["vibe-e7869fe88ab1e7949f","150g","熟花生"],["ginger","10g","姜片"],["vibe-e5b9b2e8bea3e6a492efbc88e68896e4ba8ce88d86e69da1efbc89","10g","干辣椒（或二荆条）"],["vibe-e7949fe68abde985b1e6b2b9","10g","生抽酱油"],["vibe-e6a48de789a9e6b2b9","20g","植物油"],["vibe-e88081e68abde985b1e6b2b9","5g","老抽酱油"],["vibe-e88ab1e6a492","5g","花椒"],["vibe-e6b780e7b289efbc88e794a8e4bba5e58bbee88aa1efbc89","10g","淀粉（用以勾芡）"]],"optional":[["vibe-e8b186e793a3e985b1","10g","豆瓣酱"],["vibe-e88eb4e7ac8b","250g","莴笋"],["vibe-e6b2b9e6b3bce8bea3e5ad90","5g","油泼辣子"]],"pantry":[["sugar","2g","白糖"],["salt","2g","盐"],["starch","15g","淀粉"],["wine","15g","料酒"],["vibe-e9a699e9868b","5g","香醋"],["vibe-e9b8a1e7b2be","2g","鸡精"],["sesame","10g","芝麻油"]],"steps":[["肉材处理","手枪腿去骨，刀背拍打鸡肉，切成 1.5cm 见方肉丁；泡水 10 分钟后控干。"],["辅料准备","取葱绿与 5g 姜片泡 50g 开水制成葱姜水；葱白切 1.5cm 圆粒；花生微波炉高火 5 分钟焙干。"],["腌制鸡丁","鸡丁加入盐、老抽、料酒、淀粉搅拌，分次加入葱姜水搅至粘手，冷藏腌制 1 小时。"],["焙香干料","干辣椒切段，小火焙干至微糊捞出；花椒焙干至出香味捞出。"],["滑炒鸡丁","大火热油至 7 成热，下鸡丁煎至面发白后翻炒均匀。"],["焖煮入味","加入葱粒翻炒，倒入余下葱姜水（或热水），中小火焖 2 分钟。"],["调味合炒","转大火，下花生、辣椒、花椒，加入鸡精、香醋、白糖翻炒均匀。"],["勾芡收汁","倒入调好的水淀粉，翻炒至汤汁浓稠度合适。"],["淋油出锅","关火，淋入芝麻油搅拌均匀即可。"]]},
  {"id":"other_gou-qian-xiang-gu-tang","name":"勾芡香菇汤","category":"汤","servings":1,"minutes":25,"difficulty":"中等","coverPath":"ai-generated/other_gou-qian-xiang-gu-tang.jpg","sourcePath":"dishes/soup/勾芡香菇汤/勾芡香菇汤.md","calories":146,"tips":["香菇切片厚度决定口感，建议在0.5-1cm之间","煎炸香菇为可选步骤，新手若怕溅油可跳过"],"required":[["mushroom","2 朵","鲜香菇"],["scallion","0.5 根","香葱"]],"optional":[],"pantry":[["vibe-e9b8a1e7b2be","3 g","鸡精"],["oil","10 ml","食用油"],["salt","5 g","食用盐"],["water","350 ml","开水"],["starch","10 g","生粉"]],"steps":[["处理香菇","香菇切片（每片厚度 0.5-1 cm），放入大碗中，倒入 2g 食用盐浸泡 15 分钟"],["调制水淀粉","生粉倒入小碗中，加入 50ml 水，搅拌生粉直至融化没有颗粒"],["沥干水分","倒掉碗中的盐水，适当去掉香菇本身的水分"],["煎炸香菇","小火倒入油，待油开始冒小泡，倒入香菇，每面煎 10s"],["煮汤","倒入开水 300ml ，调中火再煮 3-5 分钟"],["勾芡出锅","倒入水淀粉，适当搅拌锅中汤汁后，加入 3g 盐、3g 鸡精，最后撒上葱花出锅"]]},
  {"id":"other_guang-shi-luo-bo-niu-nan","name":"广式萝卜牛腩","category":"荤菜","servings":4,"minutes":150,"difficulty":"中等","coverPath":"ai-generated/other_guang-shi-luo-bo-niu-nan.jpg","sourcePath":"dishes/meat_dish/广式萝卜牛腩/广式萝卜牛腩.md","calories":483,"tips":["牛腩焯水后再切块，焖煮时基本不会缩水。","冰糖没有了可以用白糖代替，效果相近。","若喜欢色泽深红浓郁，老抽的比例可以适当增加。"],"required":[["beefBrisket","500g","牛腩"],["radish","1 根","白萝卜"],["ginger","8 片","姜片"],["garlic","5 片","蒜瓣"],["scallion","1 把","葱"],["vibe-e6a182e79aae","1 小块","桂皮"],["chili","2 个","干辣椒"],["vibe-e9a699e58fb6","2 片","香叶"],["vibe-e58d97e4b9b3","1 块","南乳"],["vibe-e69fb1e4beafe985b1","30g","柱侯酱"]],"optional":[],"pantry":[["starAnise","2 片","八角"],["oysterSauce","15g","蚝油"],["vibe-e985b1e6b2b9","15g","酱油"],["rockSugar","10g","冰糖"],["salt","5g","盐"],["darkSoy","15g","老抽"]],"steps":[["萝卜预处理","白萝卜洗净去皮，切成滚刀块备用。"],["牛腩焯水","牛腩整块放入冷水中，加入 2 片姜和一把葱结，水开后煮 5-10 分钟撇去浮沫。"],["牛腩切件","将焯水后的牛腩捞出，切成自己喜欢的大小块状。"],["调配酱汁","将南乳、柱侯酱、酱油、蚝油、糖、盐按比例放入碗中调和均匀。"],["炒制牛腩","热锅下油，爆香姜蒜，放入牛腩炒至表面干身。倒入调好的酱料炒香，可加少许老抽润色。"],["加入热水","向锅中倒入足量的热水，没过牛腩。"],["小火焖煮","将牛腩及汤汁换到汤锅中，放入桂皮、八角、香叶和干辣椒，大火烧开转小火焖约 2 小时。"],["加入萝卜","当牛腩焖至半软状态时，加入白萝卜块继续焖煮 30 分钟。"],["收汁完成","待萝卜焖至透明软烂，根据咸淡最后调味即可出锅。"]]},
  {"id":"other_gui-lin-shi-ba-niang-de-zuo-fa","name":"桂林十八酿的做法","category":"素菜","servings":1,"minutes":45,"totalMinutes":90,"waitMinutes":45,"difficulty":"中等","coverPath":"ai-generated/other_gui-lin-shi-ba-niang-de-zuo-fa.jpg","sourcePath":"dishes/meat_dish/桂林十八酿/桂林十八酿.md","calories":468,"tips":["万物皆可酿，可根据季节选择柚子皮、南瓜花、笋等作为容器","核心逻辑是桥接模式：将容器与馅料解耦，自由组合","猪肉馅肥瘦 3:7 是通用黄金比例","田螺酿必须搭配紫苏和薄荷才能体现灵魂风味"],"required":[["mince","300g","猪肉馅"],["vibe-e99d92e6a4922fe88ba6e7939c2fe88c84e5ad90e7ad89e5aeb9e599a8e9a39fe69d90","500g","青椒/苦瓜/茄子等容器食材"]],"optional":[["vibe-e899bee6bb91e9a685","150g","虾滑馅"],["vibe-e794b0e89eba","10-15个","田螺"],["vibe-e7b4abe88b8f","10g","紫苏"],["vibe-e89684e88db7","5g","薄荷"]],"pantry":[],"steps":[["容器预处理","将青椒去籽挖空、苦瓜切段去瓤、茄子切厚片并在中间切开但不切断；若是田螺则需焯水取肉。"],["馅料调制","将猪肉剁碎，按肥瘦 3:7 比例调好味；田螺酿需将螺肉与猪肉 1:1 混合并加入紫苏薄荷；虾滑可直接使用或与肉馅混搭。"],["塞填馅料（酿心）","将调好的肉馅逐一塞入准备好的容器食材中，并按压紧实，防止烹饪时脱落。"],["煎制定型","锅中入油，将酿菜开口朝下放入锅中，煎至肉馅表面金黄。青椒酿需煎出虎皮色。"],["焖煮入味","加入调好的酱汁（如生抽、蚝油、少量水），中小火焖煮至食材熟透入味，最后大火收汁。"]]},
  {"id":"other_gui-ling-gao","name":"龟苓膏","category":"甜品","servings":4,"minutes":135,"difficulty":"简单","coverPath":"ai-generated/other_gui-ling-gao.jpg","sourcePath":"dishes/dessert/龟苓膏/龟苓膏.md","calories":129,"tips":["龟苓膏冷却过程中不可随意移动容器，否则可能影响成型。","加热时应避免使用大火，防止结块或糊底。","可根据个人口味添加蜂蜜、炼乳或水果食用。","不同品牌龟苓膏粉浓度略有差异，建议参照包装说明调整配比。"],"required":[["vibe-e9be9fe88b93e8868fe7b289","25克","龟苓膏粉"]],"optional":[],"pantry":[["water","120毫升","冷水"],["water","500毫升","开水"],["sugar","100克","白砂糖"]],"steps":[["调制粉液","在锅中倒入龟苓膏粉 25 克与冷水 120 毫升，充分搅拌至无颗粒感。"],["溶解糖水","在另一个容器中加入白砂糖 100 克，倒入沸水 500 毫升，搅拌至糖完全溶解。"],["混合浆液","将糖水缓慢倒入龟苓膏粉液中，立即搅拌均匀，避免结块。"],["加热熬煮","将混合液体放入锅中，加热时保持中小火，并持续搅拌以防粘锅。"],["煮至粘稠","加热至液体变粘稠并开始冒小泡，即可关火。"],["冷却冷藏","快速将液体倒入模具中，自然冷却凝固。建议冷藏 1~2 小时后食用，口感更佳。"]]},
  {"id":"other_gui-zhou-la-zi-ji","name":"贵州辣子鸡","category":"荤菜","servings":3,"minutes":90,"difficulty":"中等","coverPath":"ai-generated/other_gui-zhou-la-zi-ji.jpg","sourcePath":"dishes/meat_dish/贵州辣子鸡/贵州辣子鸡.md","calories":1441,"tips":["操作时需要注意频繁翻炒，因为糍粑辣椒含有水分且粘性大，非常容易糊底","选择多种辣椒混合制作的糍粑辣椒是这道菜风味正宗的关键"],"required":[["vibe-e5869ce69d91e78e89e7b1b3e9b8a1","2000g (4斤)","农村玉米鸡"],["potato","2个","土豆"],["garlic","2个","大蒜"],["vibe-e9a699e58fb6","2片","香叶"],["ginger","2块 (手指大小)","姜"],["vibe-e88ab1e6a492206f7220e9babbe6a492","适量","花椒 or 麻椒"],["vibe-e7b38de7b291e8bea3e6a492","500g","糍粑辣椒"],["vibe-e8b186e793a3e985b1","适量","豆瓣酱"],["vibe-e595a4e98592","半瓶","啤酒"],["vibe-e8929ce88b97","3根","蒜苗"],["vibe-e98592e7b39f","适量","酒糟"],["vibe-e9a39fe794a8e6b2b92028e88f9ce7b1bde6b2b929","1000ml (2斤)","食用油 (菜籽油)"]],"optional":[],"pantry":[["darkSoy","20ml","老抽"]],"steps":[["炸制土豆与鸡块","锅中加入半锅油，将切成长条的土豆炸至表面金黄捞出。待油温升高后，放入鸡块、生姜片和花椒炸制。"],["脱水处理","持续炸制鸡块，直到锅中的油由浑浊（水汽）转为清澈，此时鸡块已炸好，捞出备用。"],["调整油量","从锅中捞出约三分之一的油，避免后续操作油量过大。"],["炒制底料","加热剩余油，加入糍粑辣椒、豆瓣酱、生姜片，小火炒出红油，再倒入炸好的鸡块翻炒均匀。"],["焖煮入味","加入老抽上色，倒入啤酒（量需盖过鸡块），放入香叶，盖盖焖煮10分钟，期间适时翻炒。"],["加入配菜焖煮","放入炸好的土豆条和整颗大蒜，继续盖盖焖煮20分钟。"],["收汁出锅","加入酒糟翻炒均匀，最后撒上切好的蒜苗段，即可出锅。"]]},
  {"id":"other_hai-bian-luo-ri","name":"海边落日","category":"饮料","servings":1,"minutes":15,"difficulty":"中等","coverPath":"ai-generated/other_hai-bian-luo-ri.jpg","sourcePath":"dishes/drink/海边落日/海边落日.md","calories":173,"tips":["倒液沿搅拌棒做出分层需要一点耐心，是这款酒成功的关键","建议使用大冰块，融化速度慢，不会过快稀释酒精"],"required":[["vibe-e7baa2e79fb3e6a6b4e7b396e6b586","15ml","红石榴糖浆"],["vibe-4e464320e6a999e6b181","35~50ml","NFC 橙汁"],["vibe-e88b8fe68993e6b0b4","50ml","苏打水"],["vibe-e799bde69c97e5a786","30ml","白朗姆"],["vibe-e8939de6a999e58a9be5a887e98592","15ml","蓝橙力娇酒"],["vibe-e69fa0e6aaace6b181","15ml","柠檬汁"],["vibe-e586b0e59d97","适量","冰块"],["vibe-e69fa0e6aaac","1 片","柠檬"]],"optional":[],"pantry":[],"steps":[["处理柠檬","将柠檬洗净，用水果刀切出一片备用。"],["准备玻璃杯","选择一个容量在 350~400 毫升的透明玻璃杯。"],["冰杯","放入大冰块，用搅拌棒搅拌冰杯以降低杯温。"],["加入底层糖浆","倒入 15ml 红石榴糖浆作为底层。"],["倒入橙汁分层","让橙汁沿搅拌棒缓缓导入酒杯，直到酒杯容量的一半左右。"],["微调层次","轻轻搅拌半圈，使颜色自然过渡。"],["加入苏打水","倒入 50ml 苏打水。"],["摇晃上层酒液","在调酒杯中加入白朗姆、蓝橙力娇酒、柠檬汁及冰块，剧烈摇晃（shake）。"],["完成分层","将摇好的蓝色酒液轻轻倒入酒杯最上层。"],["装饰点缀","插上柠檬片和吸管即可饮用。"]]},
  {"id":"other_han-shi-ban-fan","name":"韩式拌饭","category":"主食","servings":1,"minutes":45,"difficulty":"中等","coverPath":"ai-generated/other_han-shi-ban-fan.jpg","sourcePath":"dishes/staple/韩式拌饭/韩式拌饭.md","calories":1080,"tips":["虽然备菜过程稍显繁琐，但搅拌均匀后口感非常丰富满足","如果对外观有更高要求，可以用砂锅代替普通瓷碗，甚至可以加热出锅巴"],"required":[["rice","1碗(400g)","米饭"],["egg","1颗","鸡蛋"],["vibe-e781abe99485e7899be88289e58db7","6卷(60g)","火锅牛肉卷"],["beanSprout","1把(80g)","豆芽"],["vibe-e89891e88f87","50g","蘑菇"],["carrot","1/4根","胡萝卜"],["zucchini","50g","西葫芦"],["vibe-e99fa9e5bc8fe8bea3e985b1","25ml","韩式辣酱"],["vibe-e99baae7a2a7","20ml","雪碧"],["vibe-e88a9de9babb","10g","芝麻"]],"optional":[],"pantry":[["sesame","20ml","芝麻油"],["soy","15ml","生抽"]],"steps":[["炒制蔬菜","将豆芽、蘑菇、胡萝卜和西葫芦清洗干净并切成丝，放入锅中翻炒，待食材变软后盛出备用。"],["焯熟牛肉","锅中烧水，沸腾后放入火锅牛肉卷，焯水约3分钟至全熟捞出。"],["制作溏心蛋","使用平底锅煎出一个外焦里嫩的溏心蛋。"],["米饭打底","将米饭先装入一个小碗压实，然后倒扣在大碗中心位置。"],["摆盘布局","将准备好的各种蔬菜丝和肉卷依次绕圈摆放在米饭周围，最后将煎蛋放在最中间。"],["调制秘制酱汁","将10ml韩式辣酱、5ml生抽、两瓶盖雪碧、10g芝麻和5ml芝麻油混合。充分搅拌，可根据口味额外添加生抽或盐。"],["淋汁上桌","将调制好的酱汁均匀地倒在摆好盘的碗中即可。"]]},
  {"id":"other_hao-you-san-xian-gu","name":"蚝油三鲜菇","category":"素菜","servings":1,"minutes":15,"difficulty":"中等","coverPath":"ai-generated/other_hao-you-san-xian-gu.jpg","sourcePath":"dishes/vegetable_dish/蚝油三鲜菇/蚝油三鲜菇.md","calories":222,"tips":["制作简单，新手也能轻松掌握"],"required":[["mushroom","2 朵","鲜香菇"],["vibe-e89fb9e591b3e88f87","30 g","蟹味菇"],["vibe-e799bde78e89e88f87","30 g","白玉菇"],["vibe-e5b08fe7b1b3e8bea3","1 根","小米辣"],["vibe-e88f9ce6a492","0.5 颗","菜椒"],["scallion","0.5 根","香葱"],["ginger","1 粒","姜末"],["vibe-e8a5bfe8939de88ab1","100 g","西蓝花"]],"optional":[],"pantry":[["oil","10 ml","食用油"],["salt","5 g","食用盐"],["wine","2 ml","料酒"],["starch","10 g","淀粉"],["soy","10 ml","生抽"],["vibe-e9b8a1e7b2be","3 g","鸡精"],["oysterSauce","5 ml","蚝油"]],"steps":[["处理蟹味菇和白玉菇","蟹味菇、白玉菇去掉根部泥土，掰散菌朵。"],["切香菇片","香菇切片（每片厚度 0.5-1 cm）。"],["调制水淀粉","生粉倒入小碗中，加入 50ml 水，搅拌生粉直至融化没有颗粒。"],["焯烫西蓝花","水开，放入西蓝花，清水煮 3 分钟，放入碗中备用。"],["菌菇焯水","洗锅烧开水，加入 5 g 食用盐，倒入蟹味菇、白玉菇、香菇，水煮 1 分钟。"],["沥干备用","1 分钟后，捞出沥干水分。"],["煸炒配料","起锅烧油，待油开始冒小泡，放入姜末、小米辣、菜椒煸炒 30 S。"],["加入菌菇调味","倒入三鲜菇，然后依次倒入生抽、蚝油、鸡精，翻炒均匀后，倒入水淀粉。"],["收汁出锅","中火烧干汁，加入料酒、葱花出锅。"],["摆盘","摆上西蓝花。"]]},
  {"id":"other_he-lan-dou-chao-la-chang","name":"荷兰豆炒腊肠","category":"荤菜","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/other_he-lan-dou-chao-la-chang.jpg","sourcePath":"dishes/meat_dish/荷兰豆炒腊肠/荷兰豆炒腊肠.md","calories":606,"tips":["在制作过程中没有放盐，是因为腊肠本身会有一些味道，同时生抽也会有一些咸味。","腊肠虽然味道不错，但属于不太健康的食物，建议少放。"],"required":[["vibe-e88db7e585b0e8b186","50个","荷兰豆"],["vibe-e8858ae882a0","100g","腊肠"]],"optional":[],"pantry":[["oil","10ml","食用油"],["soy","10ml","生抽"]],"steps":[["预处理荷兰豆","把荷兰豆去掉蒂，有时间的也可以同时把尾部去掉。"],["准备腊肠","确认腊肠生熟：如果是生的，需要提前蒸一下；如果是熟的可以直接切片使用。"],["清洗与焯水","把荷兰豆清洗干净，放入沸水中焯水大约 45s，至变色即可捞出，随后过凉水备用。"],["热油","热锅，锅内放入大约 10ml 食用油，等待 10 秒让油温升高。"],["煸炒腊肠","放入腊肠，保持翻炒至腊肠微微卷边。"],["合炒出锅","放入荷兰豆，转为中大火，翻炒 30s 放入生抽，接着再翻炒 20-30s 即可。"]]},
  {"id":"other_he-nan-zheng-mian-tiao","name":"河南蒸面条","category":"主食","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/other_he-nan-zheng-mian-tiao.jpg","sourcePath":"dishes/staple/河南蒸面条/河南蒸面条.md","calories":3066,"tips":["细的、圆的挂面口感更加劲道，超市常见","宽的、扁的挂面口感比较软","挂面先蒸再拌汤汁最后再蒸是成功的关键"],"required":[["noodles","300g","挂面"],["porkBelly","350g","五花肉"],["vibe-e8929ce896b9","150g","蒜薹"],["vibe-e58d81e4b889e9a699","1g","十三香"],["scallion","10g","葱"],["ginger","5g","姜"],["garlic","10g","蒜"],["vibe-e9babbe6b2b9","5ml","麻油"]],"optional":[],"pantry":[["oil","10-15ml","食用油"],["soy","15ml","生抽"],["darkSoy","10ml","老抽"],["oysterSauce","5ml","蚝油"],["salt","2g","盐"],["vibe-e9b8a1e7b2be","2g","鸡精"],["wine","5ml","料酒"]],"steps":[["第一次蒸面","起锅加7成水，水开后放上蒸篦子。将挂面均匀铺开，淋上5ml油抹匀，蒸15分钟后取出面条和篦子，倒掉锅中的水。"],["食材改刀","五花肉切2mm厚片；蒜薹切3cm段；葱切0.2cm薄片；姜切细丝；蒜拍碎切粒。"],["炒制底料","干锅加3ml油润锅。中火下肉片翻炒1分钟，加入葱姜蒜、料酒炒1分钟，再入蒜薹翻炒1分钟。加入老抽、生抽、蚝油、盐、鸡精、十三香翻炒均匀。"],["焖煮拌面","锅中加入500ML水没过蔬菜，炖煮1分钟。将蒸好的挂面放入，不断搅拌3分钟直至均匀上色，然后关火倒入额外的盆中。"],["第二次蒸制","起锅加冷水，放上蒸篦子，将拌好的面和菜均匀铺在上面。水开后大火蒸15分钟。"],["出锅调味","蒸好出锅，淋上麻油即可食用。"]]},
  {"id":"other_hei-jiao-niu-liu","name":"黑椒牛柳","category":"荤菜","servings":1,"minutes":51,"difficulty":"中等","coverPath":"ai-generated/other_hei-jiao-niu-liu.jpg","sourcePath":"dishes/meat_dish/黑椒牛柳/黑椒牛柳.md","calories":216,"tips":["粉与腌料可相互替代，具体用量参照包装说明","油量应依据菜量变动，牛肉增加时油量也需对应增加"],"required":[["vibe-e7899be88289","100g","牛肉"],["onion","1/12个","洋葱"],["vibe-e88f9ce6a492","1/12个","菜椒"],["vibe-e9bb91e883a1e6a492e7b289","1g","黑胡椒粉"],["vibe-e9bb91e6a492e8858ce69699","适量","黑椒腌料"]],"optional":[],"pantry":[["starch","3g","淀粉"],["salt","1g","盐"],["vibe-e88ab1e7949fe6b2b9","10ml","花生油"]],"steps":[["牛肉切配","将牛肉切条，长度控制在 8 厘米以下，厚度约 5-10 毫米，宽度约 1 厘米。"],["初步腌制","利用腌料腌制牛肉，混合均匀后静置。"],["二次腌制锁水","若用液态腌料，可在结束前3分钟撒黑胡椒粉，加淀粉混合均匀后静置20分钟。"],["热锅凉油","开火，热锅，加入花生油。"],["翻炒牛肉","当油冒出一丝烟时放入牛肉，开中火偏大翻炒2分钟至外表变色。"],["加入蔬菜","放入洋葱和菜椒，持续翻炒2分钟。"],["调味提香","加入盐，再次撒一份黑胡椒粉，翻炒30秒搅拌均匀。"],["出锅盛盘","观察洋葱已经变软即可关火，出锅盛盘。"]]},
  {"id":"other_hong-shao-dong-gua","name":"红烧冬瓜","category":"素菜","servings":1,"minutes":25,"difficulty":"中等","coverPath":"ai-generated/other_hong-shao-dong-gua.jpg","sourcePath":"dishes/vegetable_dish/红烧冬瓜/红烧冬瓜.md","calories":519,"tips":["冬瓜煎炸至金黄色是口感软糯入味的关键。","水一定要没过冬瓜，保证有足够的焖煮时间。"],"required":[["winterMelon","300g","冬瓜"],["scallion","0.5根","香葱"],["ginger","1粒","姜末"]],"optional":[],"pantry":[["oil","50ml","食用油"],["wine","2ml","料酒"],["starch","10g","淀粉"],["soy","10ml","生抽"],["darkSoy","15ml","老抽"],["vibe-e9b8a1e7b2be","3g","鸡精"],["oysterSauce","15ml","蚝油"]],"steps":[["食材预处理","冬瓜去皮，切 边长不超过 2cm 小块"],["煎炸冬瓜","起锅烧油，放入冬瓜，缓缓翻滚煎炸 2 分钟 ，直至冬瓜表面泛金黄色"],["盛出备用","取出冬瓜，放入大碗备用"],["炒制底料","利用锅中的剩余油，依次放入姜末、生抽、蚝油，翻炒 15 S"],["大火焖煮","重新倒入冬瓜，翻炒 30 S 后，加入开水，水要没过冬瓜表面，大火煮 10 分钟"],["上色焖煮","加入老抽上色，继续煮，直至冬瓜软糯（筷子可以轻松插近冬瓜）"],["最后调味","加入鸡精、料酒、香葱翻炒后 30 S， 取出冬瓜到大碗中"],["勾芡浇汁","锅中剩余汤汁保留，倒入水淀粉，煮开后汤汁浇灌在冬瓜表面"]]},
  {"id":"other_hong-shao-zhu-ti","name":"红烧猪蹄","category":"荤菜","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_hong-shao-zhu-ti.jpg","sourcePath":"dishes/meat_dish/红烧猪蹄/红烧猪蹄.md","calories":639,"tips":["这道菜对新手有一定挑战，建议有一定烹饪基础的人士尝试","借助高压锅可以极大简化流程并确保肉质软糯"],"required":[["vibe-e78caae8b984","2~3 根","猪蹄"],["vibe-e9a699e58fb6","2 片","香叶"],["ginger","5 片","姜"],["scallion","半根","葱"],["vibe-e6a182e79aae","1 块","桂皮"]],"optional":[],"pantry":[["oil","30ml","食用油"],["rockSugar","7-8 粒","冰糖"],["wine","30 ml","料酒"],["soy","20 ml","生抽"],["darkSoy","20 ml","老抽"],["salt","8 克","盐"],["starAnise","4 个","八角"]],"steps":[["焯水去血腥","冷水锅中放入剁好的猪蹄，加入 20 ml 料酒与葱姜，煮 15 分钟去掉血腥"],["熬制糖色","热锅冷油，倒入 30ml 食用油，放入 7-8 粒冰糖，开小火，熬成糖色，期间用锅铲把冰糖压碎，大概熬 2 分钟"],["炒猪蹄上色","熬成糖色后，放入焯过水的猪蹄，继续小火，翻炒猪蹄，直至所有猪蹄两面微黄"],["加入调料翻炒","加入香叶 2 片、桂皮 1 块、八角 4 个、生抽 20 ml、老抽 20 ml、料酒 10 ml、姜 3 片、盐 8 克，转中火、继续翻炒 1 分钟"],["加水烧开","加入开水或者冷水，水需要没过猪蹄，盖上锅盖，大火烧开，烧开之后关火"],["高压锅压制","把锅内的食材全部倒入高压锅中，压制 15 分钟"],["回锅收汁","15 分钟之后，把高压锅的食材倒入炒锅中，开大火收汁，此时可用筷子尝下味道、淡的话可以再加 2~3g 盐"],["最后出锅","大火收汁时长根据锅中的水来算，一般 30 秒即可，多留点也无碍、红烧猪蹄汤也是很下饭的"]]},
  {"id":"other_hong-you-dan-gao","name":"红柚蛋糕","category":"甜品","servings":1,"minutes":35,"difficulty":"中等","coverPath":"ai-generated/other_hong-you-dan-gao.jpg","sourcePath":"dishes/dessert/红柚蛋糕/红柚蛋糕.md","calories":622,"tips":["如果喜欢较甜的口感可以增加 10g 糖","红柚果肉可以酌情添加，但每份最好不超过 40g 以免影响成品观感","糊状指没有面粉疙瘩且整体颜色均匀","刚出锅的锡纸盘比较烫，请用夹子夹取或使用湿抹布之类的隔热材料拿取"],"required":[["egg","2个","鸡蛋"],["vibe-e7baa2e69f9ae69e9ce88289","20g","红柚果肉"],["flour","80g","面粉"]],"optional":[],"pantry":[["oil","15ml","油"],["sugar","15g","糖"],["water","80ml","水"]],"steps":[["准备底料","在锡纸盘里打入鸡蛋 2 个， 加入红柚果肉 20g"],["润盘","锡纸盘中倒入 15ml 油并摇晃锡纸盘时期均匀覆盖盘底"],["添加第一部分面糊材料","锡纸盘中放入 10g 糖， 以及 40g 面粉和 40ml 水"],["第一次搅拌","用筷子顺时针方向搅拌至淡黄色糊状"],["添加第二部分面糊材料","锡纸盘中放入 5g 糖， 以及 40g 面粉和 40ml 水"],["第二次搅拌","继续用筷子搅拌至淡黄色糊状"],["初步烘烤","锡纸盘放入空气炸锅的烤篮上，用 180 摄氏度烤 15 分钟"],["蛋糕翻面","打开空气炸锅，小心取出锡纸盘，用筷子或勺子将蛋糕翻面"],["再次烘烤","继续 180 摄氏度烤 8 分钟"],["出锅","取出即可食用"]]},
  {"id":"other_hu-nan-jia-chang-hong-shao-rou","name":"湖南家常红烧肉","category":"荤菜","servings":2,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_hu-nan-jia-chang-hong-shao-rou.jpg","sourcePath":"dishes/meat_dish/湖南家常红烧肉/湖南家常红烧肉.md","calories":1348,"tips":["炖煮过程中必须观察水量，防止干锅。","小米椒的量可以根据个人耐受程度增减。"],"required":[["vibe-e5b8a6e79aaee4ba94e88ab1e88289","500g","带皮五花肉"],["vibe-e9a699e58fb6","5片","香叶"],["ginger","3-6片","姜"],["vibe-e6a182e79aae","1小块","桂皮"]],"optional":[["vibe-e5b9b2e5b08fe7b1b3e6a492","适量","干小米椒"]],"pantry":[["oil","10g","食用油"],["rockSugar","6颗","冰糖"],["wine","20克","料酒"],["soy","5克","生抽"],["darkSoy","2克","老抽"],["salt","2克","盐"],["starAnise","3颗","八角"],["water","适量","开水"]],"steps":[["焯水去腥","带皮五花肉洗净冷水下锅，加入姜片 2~3 片去腥味，煮到沸腾捞出冷水冲净白沫"],["改刀切块","五花肉切块，尺寸 1.5cm*1.5cm 块状大小"],["炒糖色","热锅加入油，加入冰糖小火搅拌至焦糖色即可，加入切好的五花肉，中火翻炒上色"],["加香料炖煮","加入备好的姜片、八角、桂皮、生抽、老抽、料酒、干小米椒、盐，小火翻炒 1 分钟，加开水没过肉"],["小火慢炖","加盖中火煮沸，转小火慢顿 30 分钟，慢炖期间，间隔 10 分钟搅拌一次防止粘锅"],["收汁出锅","小火慢炖汤汁剩三分之一的时，调成中火收汁出锅。"]]},
  {"id":"other_hu-pi-qing-jiao","name":"虎皮青椒","category":"素菜","servings":1,"minutes":15,"difficulty":"中等","coverPath":"ai-generated/other_hu-pi-qing-jiao.jpg","sourcePath":"dishes/vegetable_dish/虎皮青椒/虎皮青椒.md","calories":341,"tips":[],"required":[["vibe-e99d92e6a492","5个","青椒"],["garlic","2-3瓣","大蒜"]],"optional":[],"pantry":[["sugar","15g","白糖"],["vinegar","15ml","醋"],["soy","15ml","生抽"],["salt","4g","盐"],["oil","20ml","油"]],"steps":[["清洗青椒","去掉青椒蒂，用自来水冲洗干净。"],["青椒切片","青椒切长片，平均一个青椒纵向切成 3-4 片即可。"],["切蒜末","大蒜去皮，切成碎末，体积在 2mm x 2mm x 2mm 即可。"],["准备调料 1","拿一个小碗倒入 20ml 油，将大蒜末放入其中。"],["准备调料 2","白糖、生抽、醋、盐全部倒入砵（碗）等容器，搅拌。"],["青椒入锅","将调料 1 倒入锅中，开火加热 5 成放入青椒，青椒片不要叠在一起，单独成片放置锅中。"],["按压翻面","用锅铲不停的按压青椒，合适的时候翻面。"],["加入调味汁","翻炒约 2 分钟，待青椒表皮出现褶皱时，倒入调料 2。"],["大火收汁","加大火候继续翻炒 30s 后即可出锅盛入盘中。"]]},
  {"id":"other_hua-mei-zhu-mao-dou","name":"话梅煮毛豆","category":"素菜","servings":1,"minutes":45,"difficulty":"简单","coverPath":"ai-generated/other_hua-mei-zhu-mao-dou.jpg","sourcePath":"dishes/vegetable_dish/话梅煮毛豆/话梅煮毛豆.md","calories":454,"tips":[],"required":[["vibe-e6af9be8b186","300g","毛豆"],["vibe-e8af9de6a285","6颗","话梅"]],"optional":[],"pantry":[["salt","2g","食用盐"]],"steps":[["盐水浸泡","清水加入食用盐，毛豆浸泡 15 分钟"],["加入原料水煮","加入开水，倒入毛豆、话梅，水煮 20-30 分钟"],["起锅装盘","起锅开吃"]]},
  {"id":"other_huang-you-jian-xia","name":"黄油煎虾","category":"水产","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_huang-you-jian-xia.jpg","sourcePath":"dishes/meat_dish/黄油鸡.md","calories":741,"tips":["虾开背才更好入味，不过处理时切记切记小心用刀，新手容易伤到手"],"required":[["vibe-e9b29ce899be","300g","鲜虾"],["vibe-e9bb84e6b2b9","7g","黄油"],["vibe-e9bb91e883a1e6a492e7b292","15ml","黑胡椒粒"],["vibe-e7b1b3e98592","5ml","米酒"]],"optional":[],"pantry":[["oil","45ml","食用油"],["soy","10ml","生抽"],["sugar","10ml","白糖"],["salt","2.5ml","盐"]],"steps":[["处理鲜虾","鲜虾摘除头部，顺带扯出虾线（这步处理不好可在下一步开背时取出虾线），使用剪刀剪开或菜刀片开虾背，沥干水分备用"],["调制酱汁","小碗放入上述量的全部生抽、米酒、白糖、盐搅匀备用"],["热锅热油","中大火热锅，热锅内放入食用油，等待 10 秒让油温升高"],["入锅翻炒并调味","虾全部放入锅中，开始瓶磨黑胡椒，均匀地撒在虾上翻炒"],["加入黄油和酱汁","虾变色后加入黄油，黄油完全融化后倒入调制酱汁，继续翻炒"],["大火收汁","大火翻炒 15 秒收汁即可装盘"]]},
  {"id":"other_hui-guo-rou","name":"回锅肉","category":"荤菜","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/other_hui-guo-rou.jpg","sourcePath":"dishes/meat_dish/回锅肉/回锅肉.md","calories":997,"tips":["不喜欢蒜苗可以换成洋葱或其他蔬菜，但要注意提前炒制防止半生不熟","五花肉煮至筷子稍微用力即可插入猪皮即可","肉块过冷水晾凉后肉质会更紧致","切记肉片不要切厚了，否则会很腻","擦干水分是防止爆油溅伤的关键"],"required":[["porkBelly","0.3-0.5斤","五花肉"],["scallion","2棵","小葱"],["ginger","10-40g","生姜"],["vibe-e99d92e7baa2e6a492","0-30g","青红椒"],["vibe-e8929ce88b97","1把","蒜苗"],["vibe-e8b186e793a3e985b1","10ml","豆瓣酱"],["vibe-e7949fe68abde985b1e6b2b9","5ml","生抽酱油"]],"optional":[],"pantry":[["wine","5ml","料酒"],["vibe-e591b3e7b2be","5g","味精"]],"steps":[["炙皮处理","锅烧热，用手将五花肉紧紧压在锅上炙皮。"],["刷洗碳化物","用钢丝球把皮刷干净，至黑色碳化部分被完全去除。"],["初次烹煮","将五花肉放入锅中，加入淹没肉的冷水，放入生姜片、料酒和小葱结。大火煮开撇去浮沫，继续煮15分钟。"],["配菜加工","青红椒切圈，蒜苗切段，生姜切小薄片。将5ml豆瓣酱和5ml生抽提前混合。"],["切片准备","将煮熟的肉捞出放冷水晾凉，擦干水分，切成2mm厚的薄片。"],["煸炒出油","锅烧热放底油滑锅，放入肉片煸炒至肥肉透明、肉片微卷（灯盏窝）。"],["调味翻炒","倒入豆瓣生抽混合物和5g味精，翻炒15秒。"],["加入辣椒","放入青红椒圈、姜片和剩余5ml豆瓣酱，翻炒30秒。"],["加入蒜苗出锅","放入蒜苗翻炒60秒后出锅。"]]},
  {"id":"other_hui-pai-hong-shao-rou","name":"徽派红烧肉","category":"荤菜","servings":1,"minutes":45,"difficulty":"中等","coverPath":"ai-generated/other_hui-pai-hong-shao-rou.jpg","sourcePath":"dishes/meat_dish/徽派红烧肉/徽派红烧肉.md","calories":3847,"tips":["葱是整根，不需要切碎","步骤二加盐的目的是锁住五花肉的油脂","制作过程中不建议对肉块做水煮处理，直接煎炸肉质更 Q 弹"],"required":[["porkBelly","300g","五花肉"],["ginger","2片","姜片"],["garlic","3颗","蒜头"],["scallion","1根","葱"],["vibe-e4ba94e9a699e7b289","10g","五香粉"]],"optional":[],"pantry":[["sugar","100g","白砂糖"],["oil","200ml","食用油"],["soy","10ml","生抽"],["oysterSauce","5ml","蚝油"],["darkSoy","5ml","老抽"],["wine","100ml","料酒"],["salt","10g","盐"]],"steps":[["食材处理","五花肉切块，每块 2-3 cm 大小"],["初步煎炸","锅中加入 150 ml 食用油，倒入五花肉，煎炸 2 分钟 后，加入盐，翻炒五花肉，2 分钟 后出锅"],["炒糖色","锅中加入 50 ml 食用油，倒入白砂糖，翻炒到咖啡色"],["煸炒增香","倒入五花肉，翻炒 30 S ，加入姜片、蒜头后翻炒 30 S"],["焖煮","加入料酒，五香粉、葱，加入水没过五花肉，盖上锅盖煮 10 分钟"],["调味慢炖","加入生抽、老抽、蚝油，中火煮 20 分钟"],["大火收汁","开锅，大火烧汁，端盘"]]},
  {"id":"other_huo-tui-fan-tuan","name":"火腿饭团","category":"主食","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_huo-tui-fan-tuan.jpg","sourcePath":"dishes/staple/火腿饭团/火腿饭团.md","calories":665,"tips":["沙拉酱的程度可以根据个人口味酌情删减。","可以尝试混合不同种类的沙拉酱以丰富口味。","参考资料：小红书 - 干饭选手又困了"],"required":[["vibe-e781abe885bf","100g","火腿"],["rice","125g","米饭"],["vibe-e6b299e68b89e985b1","20g","沙拉酱"]],"optional":[["vibe-e586b7e586bbe99d92e8b186","30g","冷冻青豆"],["vibe-e586b7e586bbe78e89e7b1b3e7b292","30g","冷冻玉米粒"],["vibe-e6b5b7e88b94e7a28e","10g","海苔碎"]],"pantry":[["water","90ml","水"],["oil","10-15ml","食用油"]],"steps":[["煮制米饭","将米饭和水放到电饭锅里，点击米饭模式，等待完成。"],["焯烫配菜","冷冻玉米粒和青豆放到锅里，加水没过所有食材，沸腾后静待 2 分钟后，捞出。"],["处理火腿","火腿切成 1cm 的方块。"],["煎炒火腿","锅中加入 10ml 食用油，加入火腿翻炒至火腿上色。"],["混合搅拌","将米饭，火腿，海苔碎，青豆，玉米粒，沙拉酱放入碗中，混合均匀即可。"],["装盘成型","装盘（如果有的话）。"]]},
  {"id":"other_ji-chu-niu-nai-mian-bao","name":"基础牛奶面包","category":"主食","servings":1,"minutes":50,"totalMinutes":200,"waitMinutes":150,"difficulty":"较难","coverPath":"ai-generated/other_ji-chu-niu-nai-mian-bao.jpg","sourcePath":"dishes/staple/基础牛奶面包/基础牛奶面包.md","calories":2048,"tips":["1 cup 面粉约等于 120g，1 cup 水为 250ml。","发酵失败可检查酵母活性，或尝试将烤箱预热至60℃后关闭放入面团。","面包切片后可冷冻保存一个月，千万不要冷藏，否则水分流失快。","推荐吃法：面包切片煎烤后夹入流心蛋和酱料食用。"],"required":[["vibe-e9ab98e7ad8be68896e4b8ade7ad8be99da2e7b289","3.5 cup (1 cup酵头 + 2.5 cup面团)","高筋或中筋面粉"],["egg","1 个","鸡蛋"],["vibe-e7b396e68896e7b396e6b586","1/8 cup","糖或糖浆"],["vibe-e5b9b2e985b5e6af8d","2 g","干酵母"],["vibe-3330e2848320e6b8a9e6b0b4","1 cup","30℃ 温水"],["vibe-e5a5b6e588b6e5938128e5a5b6e7b2892fe7899be5a5b62fe6b7a1e5a5b6e6b2b92fe782bce4b9b329","1/4 cup","奶制品(奶粉/牛奶/淡奶油/炼乳)"],["vibe-e9bb84e6b2b9e68896e78e89e7b1b3e6b2b9","1/8 cup","黄油或玉米油"]],"optional":[["vibe-e8b0b7e69c8ae7b289","1/4 ~ 1/2 cup","谷朊粉"],["vibe-e9a699e88d89e7b2be","3 g","香草精"]],"pantry":[["salt","2 g","盐"]],"steps":[["制作酵头","将酵母和30℃温水混合静置5分钟，随后与1 cup面粉混合成粘稠面糊。"],["酵头第一次发酵","用布盖上，放置在温暖的地方发酵 45~60 分钟。"],["混合面团原料","将剩下的面粉、鸡蛋、糖、奶制品、油脂等原料与酵头混合搅拌，直至无干粉并形成大面团。"],["揉制面团","在面板上用手掌下部推开面团并对折揉制，直至表面没有干粉结块。"],["面团第二次发酵","容器内喷油，放入面团盖布发酵 1 小时至体积两倍大。"],["排气与整形","面团按压排气，擀成1cm厚片卷起，旋转90度重复操作，最后放入模具。"],["最后发酵与预热","在模具内继续发酵 30~45 分钟，同时将烤箱调至最高温预热 20 分钟。"],["烘烤","面包表面划缝、刷蛋液。放入烤箱，上下火 180℃ 烤 30 分钟，再调至 165℃ 烤 10 分钟。"],["冷却与保存","放凉后装入食品袋，密封过夜回软。"]]},
  {"id":"other_ji-dan-geng","name":"鸡蛋羹","category":"汤","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/other_ji-dan-geng.jpg","sourcePath":"dishes/vegetable_dish/鸡蛋羹/蒸箱鸡蛋羹.md","calories":168,"tips":["基础水蒸蛋做法可以派生，添加诸如火腿肠、肉馅、虾皮等材料，丰富口感。"],"required":[["egg","2个","鸡蛋"],["vibe-e7949fe68abd202f20e591b3e69e81e9b29c","8ml","生抽 / 味极鲜"],["vibe-3730e5baa6e7baafe58780e6b0b4","鸡蛋体积1-1.5倍","70度纯净水"]],"optional":[["vibe-e799bde9868b202f20e69699e98592","2ml","白醋 / 料酒"],["vibe-e897a4e6a492e6b2b9","适量","藤椒油"]],"pantry":[["salt","3g","食用盐"],["sesame","2-4ml","香油"]],"steps":[["打散鸡蛋","将两个鸡蛋放入碗中充分打散。"],["加入底味","向蛋液中加入3g食用盐。"],["去腥处理","加入2ml白醋或料酒。"],["加温水搅拌","向碗中加入鸡蛋体积 1-1.5 倍的 70 度纯净水，并且搅拌均匀。"],["过滤蛋液","过滤蛋液，去掉蛋液中的浮沫。"],["入锅准备","锅中烧开水，碗盖上盖子或保鲜膜放入锅中。"],["蒸制","方案一：中火蒸10分钟再闷5分钟；方案二：大火蒸5分钟（需每2分钟开盖释放蒸汽）。"],["判断熟度","晃动碗，检查蛋羹状态。"],["出锅调味","加入香油（或藤椒油）和生抽即可享用。"]]},
  {"id":"other_ji-dan-hua","name":"鸡蛋花","category":"甜品","servings":1,"minutes":5,"difficulty":"简单","coverPath":"ai-generated/other_ji-dan-hua.jpg","sourcePath":"dishes/vegetable_dish/鸡蛋花/鸡蛋花.md","calories":107,"tips":["为了防止生鸡蛋中可能含有的沙门氏菌，建议使用刚烧开的、100 ℃ 的滚水，瞬间将鸡蛋液完全烫熟。"],"required":[["egg","1个(约50g)","鸡蛋"],["vibe-e6b2b8e6b0b4","100-150ml","沸水"]],"optional":[["sugar","5-10g","白糖"],["salt","1-2g","食盐"]],"pantry":[],"steps":[["打蛋","将鸡蛋打入碗中。"],["充分搅打","使用筷子或搅拌器，顺着一个方向搅打蛋液，直至蛋清与蛋黄完全混合均匀，颜色一致。"],["添加调味","将糖或盐等调味料加入蛋液中，略微搅匀。"],["准备沸水","准备刚烧开的、100 ℃ 的沸水。"],["冲入沸水","一边用筷子快速搅拌碗中的蛋液，一边将沸水以细流状冲入蛋液中。确保沸水与蛋液充分混合。"],["最后成型","持续搅拌片刻，直至蛋液被完全烫熟，形成均匀的淡黄色蛋花。"]]},
  {"id":"other_jia-chang-lao-bing","name":"家常烙饼","category":"主食","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_jia-chang-lao-bing.jpg","sourcePath":"dishes/staple/烙饼/烙饼.md","calories":1185,"tips":["制作需要一点手法，尤其卷酥和擀饼环节，但跟着步骤操作并不难，新手也能掌握。"],"required":[["flour","400g","面粉"]],"optional":[],"pantry":[["water","130ml","热水"],["water","130ml","冷水"],["oil","适量","油"]],"steps":[["和面醒面","将 400g 面粉倒入盆中，一半用凉水和面，一半用热水和面，搅拌成面絮，用手揉成团。用保鲜膜封起来，醒面 40 分钟。"],["准备油酥","离醒面完成时间还有 10 分钟时，制作油酥（热油酥效果更好）。"],["面团分份","醒好的面不用揉，稍微摁一下，用一横刀一竖刀将其分成四份。"],["涂抹油酥","搓圆，擀开，擀成与电饼铛大小差不多的饼，取 1/4 的油酥，将饼表面涂抹均匀。"],["卷制造型","沿饼的半径切开，从外圈将其卷成圆锥形，然后将圆锥尾部捏好，防止油酥外漏。"],["二次擀制","按压面饼圆锥尖的地方，将其压扁，然后再次擀成与电饼铛大小差不多的面饼（厚度约为 3mm）。"],["下锅预热","将电饼铛预热，涂上凉油（热锅凉油），将擀好的饼放入电饼铛中，将饼的上方也刷点油，涂抹均匀（锁住水分），盖上盖子。"],["翻面烙制","大火烙一分钟，打开盖子，将饼翻个面再烙一分钟。"],["重复完成","重复以上动作，完成剩余三份饼的烙制。"]]},
  {"id":"other_jian-jiao-niu-wa","name":"尖叫牛蛙","category":"水产","servings":1,"minutes":45,"totalMinutes":90,"waitMinutes":45,"difficulty":"中等","coverPath":"ai-generated/other_jian-jiao-niu-wa.jpg","sourcePath":"dishes/meat_dish/尖叫牛蛙/尖叫牛蛙.md","calories":1643,"tips":["控干水分的时候可以选择漏勺按压","生粉抓揉的时候要均匀覆盖蛙肉","牛蛙过油时间一定要严格控制在10秒左右，以保证滑嫩口感"],"required":[["vibe-e7899be89b99e88289","800g","牛蛙肉"],["vibe-e6b3a1e5a79c","20-30g","泡姜"],["vibe-e6b3a1e6a492","5-10g","泡椒"],["vibe-e9878ee5b1b1e6a492","10g","野山椒"],["vibe-e99d92e7baa2e8bea3e6a492","20g","青红辣椒"],["garlic","30-50g","大蒜"],["vibe-e8b186e793a3e985b1","20-30g","豆瓣酱"],["vibe-e79b90e5b7b4","15g","盐巴"],["vibe-e595a4e98592","450-550ml","啤酒"],["scallion","5g","葱花"]],"optional":[["vibe-e897a4e6a492e6b2b9","5-10ml","藤椒油"],["vibe-e78caae6b2b9","20ml","猪油"]],"pantry":[["whitePepper","10g","胡椒粉"],["starch","30g","生粉"],["wine","10ml","料酒"],["oil","200ml","食用油"]],"steps":[["去腥处理","牛蛙肉洗净后控干水分，加入10克以上的盐巴和50ml以上的啤酒，用手抓5分钟，去除牛蛙肉的腥味"],["冲洗控干","对着清水冲洗，直至不再流出血水和杂质，控干水分，放到合适的器皿中"],["腌制牛蛙","加入5克盐，30克生粉，10ml料酒，5克胡椒粉，用手抓均匀，腌制5-10分钟"],["辅料切配","将泡姜、泡椒、野山椒切丝或者片，青红辣椒切成圈圈，大蒜拨开即可"],["牛蛙过油","起锅烧热加入200ml食用油，烧至6成油温（有小气泡），将牛蛙倒入快速过油炸制，10秒钟后捞出"],["准备炒底油","捞出蛙肉控油，锅中热油倒出保留30ml，加入20ml猪油（或总共50ml食用油）"],["炒制底料","油温6成热时加入泡姜、泡椒、野山椒、大蒜爆香，加入豆瓣酱20克，中火翻炒30秒至出红油，倒入400ml啤酒"],["焖煮入味","倒入炸过的牛蛙肉，用勺子推着翻（不要用力搅拌），加入5克胡椒粉、5ml藤椒油，中火慢焖3分钟"],["收汁增色","加大火力大火收汁半分钟，加入青红辣椒圈，再煮10秒准备起锅"],["装盘","盛到盆里，撒上葱花即可开动"]]},
  {"id":"other_jian-kao-yang-pai-de-zuo-fa","name":"煎烤羊排的做法","category":"荤菜","servings":1,"minutes":90,"difficulty":"中等","coverPath":"ai-generated/other_jian-kao-yang-pai-de-zuo-fa.jpg","sourcePath":"dishes/meat_dish/煎烤羊排/煎烤羊排.md","calories":1850,"tips":["花椒和白芷是这道菜的关键调料，不可缺少。","炖煮时间不宜过长，羊排过于软烂则在煎制时容易碎裂。","煎制时利用羊排自身煎出的油脂来炒香调料，风味更佳。","焯水、炖煮、煎制过程中会产生较多羊油，处理时请注意不要直接倒入下水道，以防堵塞。"],"required":[["vibe-e7be8ae68e92","750g","羊排"],["vibe-e6a182e79aae","2g","桂皮"],["vibe-e88ab1e6a492","5g","花椒"],["vibe-e799bde88ab7","6g","白芷"],["vibe-e9a699e58fb6","5片","香叶"],["vibe-e8bea3e6a492e7b289","5g","辣椒粉"],["vibe-e5ad9ce784b6e7b292","2g","孜然粒"],["vibe-e783a7e783a4e69292e69699","2g","烧烤撒料"],["vibe-e5ad9ce784b6e7b289","2g","孜然粉"],["vibe-e799bde88a9de9babb","2g","白芝麻"]],"optional":[],"pantry":[["starAnise","1颗","八角"],["salt","25g","盐"],["wine","10ml","料酒"],["sugar","1g","糖"]],"steps":[["食材处理","将羊排按照骨头分布，切成块状。"],["焯水去腥","炒锅中加入冷水，放入全部羊排块，水沸腾后继续焯水 2 - 3 分钟，捞出备用。"],["准备炖煮","将焯好水的羊排、桂皮、花椒、八角、白芷、香叶、料酒放入锅中。"],["加水炖煮","加入饮用水没过所有食材。如果使用高压锅，上汽后压 30 分钟。如果使用普通锅，炖煮 80 分钟。"],["沥干备煎","将炖煮完成的羊排捞出，沥干水分，放入无油无水的炒锅 / 煎锅中。"],["煎制上色","中大火煎 6 - 7 分钟，直至羊排中的油脂被煎出，表面呈金黄酥脆状态。"],["加入调料","锅中保留煎出的羊油，加入辣椒粉、孜然粒、烧烤撒料、孜然粉、白芝麻，翻炒均匀。"],["最后调味","加入糖和盐（如果在炖煮步骤中未添加），翻炒均匀。"],["出锅盛盘","翻炒均匀后即可关火，盛盘。"]]},
  {"id":"other_jian-yi-hong-shao-rou","name":"简易红烧肉","category":"荤菜","servings":1,"minutes":90,"difficulty":"中等","coverPath":"ai-generated/other_jian-yi-hong-shao-rou.jpg","sourcePath":"dishes/meat_dish/红烧肉/简易红烧肉.md","calories":2775,"tips":["如果有可能，请尽量把刀磨的锋利一些，切肉更整齐。","炖肉必须使用开水，否则冷水会使蛋白质收缩导致口感变柴。"],"required":[["vibe-e78caae4ba94e88ab1e88289","3~4 斤","猪五花肉"],["ginger","6 片","生姜"],["vibe-e9a699e58fb6","3 片","香叶"],["vibe-e5a4a7e891b1","适量","大葱"]],"optional":[["vibe-e9b98ce9b991e89b8b2fe9b8a1e89b8b","0-2 个","鹌鹑蛋/鸡蛋"],["vibe-e8b186e79aae","0-80g","豆皮"]],"pantry":[["rockSugar","15 克","冰糖"],["soy","10ml","生抽"],["darkSoy","15ml","老抽"],["wine","5ml","料酒"],["water","600ml-900ml","开水"],["starAnise","2 个","八角"],["salt","2-3g","盐"]],"steps":[["食材预处理","猪五花肉切成约 4.5cm 的大块；豆皮切 2cm 宽；生姜切 3mm 厚片；大葱取葱白备用。"],["准备配料","烧开水；将鹌鹑蛋煮熟剥壳，并用叉子或牙签在表面扎孔以便入味。"],["焯水去腥","冷水锅中放入五花肉块，加入料酒、葱、姜，煮 15 分钟捞出沥干。"],["煸炒出油","锅中放两片生姜，开中小火直接放入五花肉，不放油，将肉的六个面都煎至出油且微焦。"],["炒糖色与上色","将肉推至一边，加入冰糖炒至融化上色，随后加入 10ml 生抽、15ml 老抽、5ml 料酒翻炒均匀。"],["初次炖煮","加入烧好的开水没过食材，放入 2 片生姜、3 片香叶、2 个八角，盖盖煮沸后转中小火炖 40 分钟。"],["加入辅料继续炖煮","加入准备好的鹌鹑蛋和豆皮，继续中小火炖煮 40 分钟。"],["收汁出锅","打开锅盖，待汤汁浓稠时转大火收汁，加入 2-3g 盐翻炒均匀后出锅。"]]},
  {"id":"other_jian-yu-hai-tai-yu-mi-fan","name":"鲣鱼海苔玉米饭","category":"主食","servings":1,"minutes":40,"difficulty":"简单","coverPath":"ai-generated/other_jian-yu-hai-tai-yu-mi-fan.jpg","sourcePath":"dishes/staple/米饭/煮锅蒸米饭.md","calories":383,"tips":["使用米家小饭煲煮东北米的话，水没过米 3 毫米就行，太多水煮出来不是一粒一粒的饭","不推荐使用高压锅煮饭"],"required":[["vibe-e4b89ce58c97e7b1b3","适量","东北米"],["vibe-e9b2a3e9b1bce6b5b7e88b94e7a28e","20g","鲣鱼海苔碎"],["corn","80g","玉米粒"]],"optional":[],"pantry":[],"steps":[["煮饭","使用电饭煲煮熟东北米。"],["混合玉米粒","盛好米饭，放入玉米粒拌好。"],["加入海苔碎","在拌好的饭上均匀撒入鲣鱼海苔碎。"]]},
  {"id":"other_jiang-ban-qiao-mai-mian","name":"酱拌荞麦面","category":"主食","servings":1,"minutes":20,"difficulty":"简单","coverPath":"ai-generated/other_jiang-ban-qiao-mai-mian.jpg","sourcePath":"dishes/staple/酱拌荞麦面/酱拌荞麦面.md","calories":475,"tips":["荞麦面沥干后可以放冰箱冰镇后口感更佳","配料可以根据个人喜好选择其他，例如虾仁、肉沫等","酱料可以根据个人喜欢选择其他，例如花生酱、芝麻酱等","荞麦面跟其他面条热量几乎一致，所以不适合作为减脂的主食"],"required":[["vibe-e88d9ee9baa6e99da2","100g","荞麦面"],["cucumber","0.5根","黄瓜"],["carrot","0.5根","红萝卜"],["vibe-e88081e5b9b2e5a688","20ml","老干妈"]],"optional":[],"pantry":[],"steps":[["煮熟面条","荞麦面下冷水煮熟，8-10 分钟后捞出沥干备用"],["处理配菜","将黄瓜和红萝卜清洗干净，切成均匀的小条"],["调味拌面","将荞麦面、黄瓜条、萝卜条放入盘子，放上老干妈酱料，搅拌均匀"]]},
  {"id":"other_jiang-chao-ji","name":"姜炒鸡","category":"荤菜","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_jiang-chao-ji.jpg","sourcePath":"dishes/meat_dish/姜炒鸡/姜炒鸡.md","calories":1539,"tips":[],"required":[["vibe-e9b8a1","半只（约 650g）","鸡"],["ginger","250g","生姜"],["vibe-e595a4e98592","250ml","啤酒"],["vibe-e6b3a1e6a492","50g","泡椒"],["garlic","50g","大蒜"]],"optional":[["vibe-e5b08fe7b1b3e6a492","0-50g","小米椒"],["vibe-e7be8ee4babae8bea3","0-50g","美人辣"]],"pantry":[["soy","20ml","生抽"],["darkSoy","10ml","老抽"],["salt","3g","盐"],["oil","50ml","食用油"]],"steps":[["食材处理与腌制","鸡尽量剁成 1cm 的小块，洗净后滤干，再放生抽和料酒腌制 30 分钟"],["热锅凉油","先热锅到微微冒烟，放入食用油，等 5 秒"],["煸炒生姜","下入姜片后转中火炒 30 秒"],["煸炒鸡块","下入鸡块翻炒 3 分钟，炒干水分，炒出鸡油"],["加入佐料","放入各种剁碎的辣椒和大蒜子，加盐和老抽继续翻炒 30 秒"],["焖煮入味","倒入啤酒，中小火焖 2 分钟"],["大火收汁","大火收汁盛盘"]]},
  {"id":"other_jiang-cong-lao-ji","name":"姜葱捞鸡","category":"荤菜","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/other_jiang-cong-lao-ji.jpg","sourcePath":"dishes/meat_dish/姜葱捞鸡/姜葱捞鸡.md","calories":549,"tips":["手撕鸡肉时注意防烫，建议佩戴食品级一次性手套","淋油时油温要够高，才能激发出葱姜的香气","如果想让鸡皮更脆，蒸熟后可以迅速浸入冰水"],"required":[["thigh","4个(约400g)","鸡腿"],["vibe-e79b90e78497e9b8a1e7b289","5g","盐焗鸡粉"],["ginger","50g","姜"],["scallion","1根","葱"]],"optional":[],"pantry":[["salt","5g","盐"],["sugar","5g","糖"],["oil","35ml","油"]],"steps":[["清洗鸡腿","四个鸡腿清洗干净，放入碗中"],["加入调料","碗中加入盐焗鸡粉和 5ml 油，搅拌均匀"],["腌制与备水","让鸡腿静置腌制 15 分钟，同时准备蒸锅并把水煮开"],["蒸制鸡腿","鸡腿腌制完成后，放入水开后的蒸锅中，蒸制 20 分钟"],["切姜","将姜根据个人口味切成姜蓉、姜丝或姜粒"],["切葱","将葱切成 0.5cm 小段"],["混合底料","将葱姜放入蘸料碗，并加入盐和糖"],["加热油","将剩余的油倒入另一个锅中加热至六至七层热"],["淋油","将热油淋入葱姜碗中"],["手撕鸡肉","鸡腿蒸好后将其撕碎成鸡丝，不需要特别细，大概 1cm 粗就可以"],["搅拌成菜","将姜葱油淋在鸡丝上，搅拌均匀即可"]]},
  {"id":"other_jiang-niu-rou","name":"酱牛肉","category":"荤菜","servings":1,"minutes":45,"totalMinutes":600,"waitMinutes":555,"difficulty":"较难","coverPath":"ai-generated/other_jiang-niu-rou.jpg","sourcePath":"dishes/meat_dish/酱牛肉/酱牛肉.md","calories":2265,"tips":["操作时，需要注意观察沸腾的水位线，如发现低于 2/3 的食材应加热水至没过食材（约每 30 分钟确认一次）。","用保鲜膜紧密包裹牛肉，放入冰箱冷藏数小时，可以使得切片肉质紧实不散。","用牙签或者叉子在牛肉表面扎孔可以破坏筋膜，便于入味。"],"required":[["vibe-e7899be885b1e5ad90e88289","2000g","牛腱子肉"],["vibe-e9a699e58fb6","1片","香叶"],["ginger","3片","姜"],["scallion","半根","葱"],["vibe-e6a182e79aae","1块","桂皮"],["vibe-e88ab1e6a492","15粒","花椒"],["vibe-e9bb84e8b186e985b1","15ml","黄豆酱"]],"optional":[],"pantry":[["darkSoy","15ml","老抽"],["rockSugar","7-8粒","冰糖"],["wine","30ml","料酒"],["soy","15ml","生抽"],["salt","8克","盐"],["starAnise","4个","八角"]],"steps":[["清洗浸泡","牛腱子肉清洗干净，用清水浸泡 1 小时，去除血水"],["扎孔腌制","用牙签或者叉子在牛腱子肉表面扎孔，加料酒、花椒、姜片后，用保鲜膜紧密包裹容器，腌制 4-6 小时"],["肉块分割","牛腱子肉切成 8cm，不超过 10cm 的肉块"],["焯水去腥","牛腱子肉放入锅中，加入冷水至水面没过牛肉，开锅至水沸腾开始计时，同时捞出浮沫。3 分钟后停火，捞出牛肉，用温水洗净"],["入锅调味","将洗净后的牛腱子肉放入砂锅或炖锅，加水没过牛腱子肉，开大火，放入除盐之外其他未使用的配料"],["第一阶段慢炖","水开之后，大火转为小火，持续加热 90 分钟，加盐"],["第二阶段慢炖","加盐后，继续小火 90 分钟（注：每 30 分钟确认水位线，要求至少达到牛肉面高度의 80%）"],["冷藏定型","加热 180 分钟后，捞出牛腱子肉，用保鲜膜紧密包裹，放入冰箱冷藏数小时"],["切片装盘","取出后沿牛肉纹路切片，上桌食用，其他牛腱子肉建议不切片冷藏"]]},
  {"id":"other_jiang-pai-gu","name":"酱排骨","category":"荤菜","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_jiang-pai-gu.jpg","sourcePath":"dishes/meat_dish/酱排骨/酱排骨.md","calories":1351,"tips":["增加味道的可以考虑加入豆瓣酱、番茄酱等","大火煮时间可以根据每个人情况做调整","煮排骨期间，可以顺道放入 2-3 个 鸡蛋一起煮，做成简易版卤蛋"],"required":[["ribs","300g","排骨"],["vibe-e4ba94e9a699e7b289","20g","五香粉"],["vibe-e5b08fe7b1b3e6a492","1个","小米椒"],["garlic","2粒","蒜"],["ginger","2片","姜"]],"optional":[],"pantry":[["wine","10ml","料酒"],["oil","30ml","食用油"],["sugar","15g","白砂糖"],["darkSoy","10ml","老抽"],["soy","10ml","生抽"],["oysterSauce","5ml","蚝油"]],"steps":[["焯水去腥","起锅烧热水，放入排骨、姜片、料酒，煮开后用勺子舀去白色油沫，2-3 分钟后出锅。"],["清洗排骨","冷水清洗排骨，清洗 2-3 遍。"],["炒糖色","小火起锅，加入食用油，加入白砂糖 ，轻轻搅拌到糖水变成黄色。"],["翻炒上料","倒入排骨翻炒 30 S 后，加入生抽、蚝油、五香粉、蒜、小米椒后翻炒 30 S 后，加入清水没过排骨。"],["焖煮上色","大火煮 30 分钟，加入老抽上色，再煮 10 分钟。"],["出锅摆盘","起锅摆盘。"]]},
  {"id":"other_jiao-bai-chao-rou","name":"茭白炒肉","category":"荤菜","servings":1,"minutes":20,"difficulty":"中等","coverPath":"ai-generated/other_jiao-bai-chao-rou.jpg","sourcePath":"dishes/meat_dish/茭白炒肉/茭白炒肉.md","calories":515,"tips":["最后一个步骤，可以考虑加蚝油、生抽代替盐上色","腌肉时加入适量淀粉（生粉）是肉质鲜嫩的关键","茭白焯水时间不宜过长，以免失去爽脆口感"],"required":[["vibe-e88cade799bd","2 根","茭白"],["pork","100 g","瘦肉"],["ginger","1 片","姜"],["garlic","1 个","蒜"]],"optional":[],"pantry":[["starch","15 g","淀粉"],["oil","30 ml","食用油"],["vibe-e9b8a1e7b2be","5 g","鸡精"],["wine","5 ml","料酒"],["salt","2 g","盐"]],"steps":[["处理茭白","茭白切片，每片厚度 0.5 cm"],["腌制瘦肉","瘦肉切条，厚度 0.3-0.5 cm，加入料酒、生粉、盐、水搅拌"],["处理佐料","姜切片、蒜头剁碎"],["茭白焯水","起锅水烧开，放入茭白，水煮 60-90 S 后取出沥干"],["滑炒肉条","起锅，倒入 15 ml 油，倒入瘦肉，反复翻炒 60 S 取出"],["爆香底料并炒茭白","起锅，倒入 15 ml 油，倒入姜、蒜翻炒 30 S，加入茭白继续翻炒 30 S"],["混合调味出锅","继续加入瘦肉翻炒 60 S，加入 20 ml 水，加入盐、鸡精后翻炒 60 S 出锅"]]},
  {"id":"other_jiao-yan-yu-mi","name":"椒盐玉米","category":"主食","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_jiao-yan-yu-mi.jpg","sourcePath":"dishes/vegetable_dish/椒盐玉米/椒盐玉米.md","calories":693,"tips":["玉米粒建议直接买剥好的，省去剥皮的麻烦","千万别煮玉米本身，如果是带包装解冻，可以带着包装一起煮，撕掉一个小口即可","裹粉前的脱水步骤直接决定了成品的外壳是否酥脆且不脱落"],"required":[["corn","350g","玉米粒"],["vibe-e6a492e79b90e7b289","10g","椒盐粉"],["vibe-e88a9de9babbe7b292","10g","芝麻粒"]],"optional":[],"pantry":[["starch","40-70g","淀粉"],["oil","适量","油"]],"steps":[["解冻玉米","玉米粒直接解冻，可用温水泡 15 分钟，或者在灶上用开水煮 5 分钟。"],["初步吸水","拿出簸箕 BoxA，垫上吸油纸，倒进解冻好的玉米粒，持续摇晃直到吸油纸变湿。"],["二次吸水","拿出第二个簸箕 BoxB，垫上新吸油纸，将 BoxA 的玉米粒倒入 BoxB 中继续摇晃。"],["多次脱水处理","重复上述更换吸油纸和摇晃的操作多次，直到玉米表面没有明显水滴但保持湿润。"],["裹淀粉","倒入大量淀粉，确保能够完全盖住玉米粒，持续摇晃直到每颗玉米都均匀裹上粉。"],["热油","开灶放锅，倒入油尽量铺满锅底但不要太多。加热至油温 8 成热。"],["下锅煎制","倒入裹好粉的玉米粒，中火先煎 30 秒，期间不要翻炒。"],["翻炒出锅","轻微翻炒 3 分钟，观察颜色金黄即可出锅。"],["调味完成","撒上椒盐粉和芝麻粒，搅拌均匀即可。"]]},
  {"id":"other_jie-mo-huang-you-luo-shi-xia","name":"芥末黄油罗氏虾","category":"水产","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_jie-mo-huang-you-luo-shi-xia.jpg","sourcePath":"dishes/aquatic/芥末黄油罗氏虾/芥末黄油罗氏虾.md","calories":637,"tips":["酱汁提前调配好，黄油提前备好，防止中间备料耗时。","蒜蓉切记要等虾煎好后捞出再下，防止煎炒过久变黑，发苦。","如果不太能接受芥末就放少点，能接受就放多点，如果放多了，煮久一会儿，芥末味也会散去。"],"required":[["vibe-e7bd97e6b08fe899be","1 斤多","罗氏虾"],["vibe-e9bb84e6b2b9","20g","黄油"],["vibe-e88aa5e69cab","15g","芥末"],["vibe-e69699e98592e38081e69c97e5a786e98592e68896e595a4e98592","15g 到 30g","料酒、朗姆酒或啤酒"],["cilantro","5 条","香菜"],["garlic","5 颗","蒜"]],"optional":[],"pantry":[["sugar","3g","白糖"],["soy","30g","生抽"],["oysterSauce","30g","蚝油"],["salt","3g","盐"]],"steps":[["处理罗氏虾","将罗氏虾剪掉头尾尖刺、触须和脚，用剪刀把虾身开背，去除虾线。"],["调配芥末酱汁","提前搅拌好芥末酱汁：将酱油、蚝油、芥末、盐、糖放入碗中，搅拌均匀。"],["准备辅料","洗好香菜，切段备用；蒜剁成蒜蓉。"],["煎虾","罗氏虾沥掉水，锅中加入油，直接放入罗氏虾，中火，外表煎至金黄，捞出。"],["炒香蒜蓉与黄油","利用煎虾剩下的油继续大火煎炒蒜蓉，等到锅中白雾冒出，蒜蓉已经煎出香味，下虾和黄油，让虾充分吸收黄油香味。"],["调味收汁","下入调好的酱汁，继续大火煮沸，翻炒虾至酱汁收汁，加入酒（料酒、啤酒放 30g，朗姆酒放 15g）。"],["加入香菜出锅","待酱汁稍微收汁，加入香菜翻炒两下，即可出锅。"]]},
  {"id":"other_jie-mo-luo-shi-xia","name":"芥末罗氏虾","category":"水产","servings":2,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_jie-mo-luo-shi-xia.jpg","sourcePath":"dishes/meat_dish/芥末罗氏虾/芥末罗氏虾.md","calories":579,"tips":["黄油入锅后不宜炸制太久，融化翻拌均匀即可烹入碗汁","如不吃辣，小米辣可不放或替换为红菜椒"],"required":[["vibe-e7bd97e6b08fe899be","250g","罗氏虾"],["garlic","1-2 个","蒜"],["vibe-e99d92e88aa5e69cab","20g","青芥末"],["vibe-e9bb84e6b2b9","20g","黄油"]],"optional":[["vibe-e5b08fe7b1b3e8bea3","1-2 个","小米辣"]],"pantry":[["starch","10g","生粉"],["soy","30g","生抽"],["whitePepper","5g","胡椒粉"],["sugar","3g","白糖"],["oysterSauce","15g","蚝油"],["salt","3g","盐"],["oil","80ml","食用油"]],"steps":[["处理虾","将虾从背部或腹部切开，去除虾线和沙袋，用清水洗净控干水分。可根据喜好决定是否拍上生粉。"],["准备蒜蓉及碗汁","将大蒜切成蒜末。在碗中放入生抽、蚝油、白糖、胡椒粉、盐，挤入芥末，加清水稀释后加入生粉搅拌均匀。"],["煎制罗氏虾","锅中倒入食用油覆盖锅底，放入控干的虾慢慢煎制，直到煎出虾油（锅中出现大量气泡）。"],["加入配料与焖煮","加入蒜蓉和小米辣炒香，随后放入黄油。黄油融化翻拌均匀后，倒入碗汁，盖上锅盖焖煮 2 分钟至汤汁浓稠即可。"]]},
  {"id":"other_jin-fei-shi","name":"金菲士","category":"饮料","servings":1,"minutes":5,"difficulty":"简单","coverPath":"ai-generated/other_jin-fei-shi.jpg","sourcePath":"dishes/drink/金菲士/金菲士.md","calories":150,"tips":["饮酒有害健康，请勿过量。","注入苏打水时需缓慢，避免气泡过快消散影响口感。","若冰块融化过快，可选择过滤掉碎冰并重新补充大冰块。"],"required":[["vibe-e98791e98592","30~40 毫升","金酒"],["vibe-e88b8fe68993e6b094e6b3a1e6b0b4","1 罐","苏打气泡水"],["vibe-e69fa0e6aaac","1 个","柠檬"],["vibe-e89497e7b396e7b396e6b586","30~40 克","蔗糖糖浆"],["vibe-e586b0e59d97","100 克","冰块"]],"optional":[["vibe-e696b0e9b29ce7bbbfe58fb6","适量","新鲜绿叶"]],"pantry":[],"steps":[["处理柠檬","将柠檬对半切（刀方向垂直于柠檬头尾连线），从其中一半切取一片柠檬备用；将剩余柠檬再次对半切，用压汁器压出 20 毫升柠檬汁备用。"],["准备杯具与基底","选择一个约 350~400 毫升的透明玻璃杯，将 100 克冰块放置在杯底，依次倒入金酒、柠檬汁和蔗糖糖浆。"],["混合与装饰","先用勺子搅拌均匀基底。放入准备好的柠檬片。缓慢沿杯壁注入苏打气泡水直至满杯。"],["最终提拉","用勺子轻轻上下提拉将液体混合均匀，在液面放置装饰用绿叶即可。"]]},
  {"id":"other_jin-tang-li","name":"金汤力","category":"饮料","servings":1,"minutes":5,"difficulty":"简单","coverPath":"ai-generated/other_jin-tang-li.jpg","sourcePath":"dishes/drink/金汤力/金汤力.md","calories":205,"tips":["缓慢注入汤力水是保持气泡感的关键","搅拌时使用提拉法而非旋转法以减少气泡损耗","柠檬汁的比例可根据个人对酸度的喜好灵活调整"],"required":[["vibe-e98791e98592","30~40 毫升","金酒"],["vibe-e6b1a4e58a9be6b0b4e6b094e6b3a1e6b0b4","1 罐","汤力水气泡水"],["vibe-e69fa0e6aaac","1 个","柠檬"],["vibe-e586b0e59d97","100 克","冰块"]],"optional":[["vibe-e696b0e9b29ce7bbbfe58fb6","适量","新鲜绿叶"]],"pantry":[],"steps":[["柠檬切片与取汁","将柠檬对半切（刀方向垂直于柠檬的头尾连线），并从其中的一半中切取一片柠檬备用；再次将剩下的柠檬对半切，用压汁器压出柠檬汁置于容器中备用。"],["放置冰块","选择一个容量在 350~400 毫升的透明玻璃杯，将 100 克冰块放置在杯底。"],["倒入金酒与柠檬汁","向杯中倒入 30~40 毫升金酒，随后倒入 15 毫升柠檬汁。"],["初步搅拌","用勺子将金酒与柠檬汁搅拌均匀。"],["放入装饰柠檬片","将之前准备的一片柠檬放置在杯中。"],["注入汤力水","缓慢沿杯壁注入汤力水直至满杯。"],["提拉搅拌","用勺子轻轻上下提拉将液体搅拌均匀。"],["最后装饰","在液面放置好装饰用的新鲜绿叶。"]]},
  {"id":"other_jiu-niang-lao-zao","name":"酒酿醪糟","category":"饮料","servings":1,"minutes":30,"totalMinutes":2880,"waitMinutes":2850,"difficulty":"中等","coverPath":"ai-generated/other_jiu-niang-lao-zao.jpg","sourcePath":"dishes/drink/酒酿醪糟/酒酿醪糟.md","calories":420,"tips":["发酵温度至关重要，低温会发酵缓慢或失败，高温会杀死酒曲","发酵失败常见原因：温度过高、米饭太热时拌入酒曲、容器未清洁干净或进水进油","可搭配汤圆、蛋花、枸杞等加热食用，但注意不要煮沸时间过长以免酒香散失","酒酿汁可用于制作酒酿米糕、酒酿饼等，还可以用作调料","如果想停止发酵，可以上锅蒸 10 分钟杀菌，或放入冰箱冷藏"],"required":[["vibe-e7b3afe7b1b3","800g","糯米"],["vibe-e5ae89e790aae7949ce98592e69bb2","8g","安琪甜酒曲"],["vibe-e6b885e6b0b4efbc88e892b8e9a5ade794a8efbc89","720g","清水（蒸饭用）"],["vibe-e6b885e6b0b4efbc88e58f91e985b5e794a8efbc89","600g","清水（发酵用）"]],"optional":[],"pantry":[["water","20ml","温水"]],"steps":[["蒸糯米饭","将 800g 糯米淘洗干净放入电饭煲，加入 720g 清水选择蒸饭模式。"],["摊凉糯米","蒸熟后将米饭倒出摊凉，使用干净的工具将其摊至 30°C。"],["拌入酒曲","将 8g 安琪甜酒曲用 20ml 温水（约 30°C）化开，均匀撒在糯米饭中并翻拌均匀。"],["加水补湿","向糯米饭中加入 600g 清水帮助酒曲翻拌均匀。静置 2-3 分钟使糯米饭吸饱水分。"],["挖酒窝","用擀面杖在糯米饭中央挖一个小洞，便于观察出酒情况。"],["密封装瓶","将混合好的米饭装入干净容器中，轻轻压平表面，盖上盖子或保鲜膜密封好。"],["恒温发酵","放置于 28 ～ 32°C 环境下发酵 24 ～ 48 小时。"],["检查成品","观察中间凹槽是否有透明酒液渗出，闻是否有酒香。"],["冷藏保存","发酵结束后可立即冷藏保存，过程中可以加入桂花。"]]},
  {"id":"other_jun-gu-dun-ru-ge","name":"菌菇炖乳鸽","category":"荤菜","servings":1,"minutes":65,"difficulty":"中等","coverPath":"ai-generated/other_jun-gu-dun-ru-ge.jpg","sourcePath":"dishes/soup/菌菇炖乳鸽/菌菇炖乳鸽.md","calories":324,"tips":[],"required":[["vibe-e4b9b3e9b8bd","300g","乳鸽"],["vibe-e88f8ce88f87","100g","菌菇"],["vibe-e78e89e7b1b3","200g","玉米"],["ginger","30g","姜"]],"optional":[],"pantry":[["wine","15ml","料酒"],["salt","10g","食用盐"]],"steps":[["清洗食材","冷水洗干净热心摊主处理好的乳鸽。"],["焯水去腥","冷水锅中放入洗干净的乳鸽，加入 15ml 料酒与姜，水煮开即可捞出乳鸽。"],["炖煮","把乳鸽放到高压锅或者瓦罐中、倒入的水要没过乳鸽，放入生姜 20g，玉米 200g、菌菇 100g。"],["调味出锅","时间到了，盛到碗中，加入 3~5g 盐即可。"]]},
  {"id":"other_ka-fei-ye-nai-dong","name":"咖啡椰奶冻","category":"甜品","servings":3,"minutes":15,"totalMinutes":240,"waitMinutes":225,"difficulty":"中等","coverPath":"ai-generated/other_ka-fei-ye-nai-dong.jpg","sourcePath":"dishes/dessert/咖啡椰奶冻/咖啡椰奶冻.md","calories":162,"tips":["请务必不要让液体煮沸，也不要让液体冒泡，否则会影响凝固效果和口感","吉利丁凝固后较难清洗，建议使用洗碗机或者用温水手洗厨具","食用前可撒少量咖啡粉或摆放蓝莓装饰"],"required":[["vibe-e6b7a1e5a5b6e6b2b9","125ml","淡奶油"],["vibe-e6a4b0e6a091e7898ce6a4b0e6b181","250ml","椰树牌椰汁"],["vibe-657370726573736f20e6848fe5bc8fe6b593e7bca9","35ml","espresso 意式浓缩"],["vibe-e6a4b0e5ad90e6b0b4","50ml","椰子水"],["vibe-e59089e588a9e4b881","10g","吉利丁"]],"optional":[["sugar","适量","糖"],["vibe-e8939de88e93","少量","蓝莓"],["vibe-e59296e595a1e7b289","少量","咖啡粉"]],"pantry":[],"steps":[["液体混合","将定量的淡奶油、椰树牌椰汁、espresso 意式浓缩和椰子水倒入容器中混合备用。"],["加热液体","将混合好的液体加热约 1 分钟，观察温度达到 50-60 度即可。"],["调味（可选）","如果格外嗜甜，可以根据个人口味加入额外的糖并搅拌均匀。"],["溶解吉利丁","倒入吉利丁，搅拌至完全融化，继续煮约 1 分钟。"],["过筛（可选）","使用过滤网对液体进行过筛。"],["装模","将液体倒入准备好的模具中。"],["去泡（可选）","过滤或撇掉表层的泡泡。"],["冷藏定型","放入冰箱冷藏区，等待至少 3 小时直至完全定型。"]]},
  {"id":"other_kao-dan-ta","name":"烤蛋挞","category":"甜品","servings":30,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_kao-dan-ta.jpg","sourcePath":"dishes/dessert/烤蛋挞/烤蛋挞.md","calories":169,"tips":["操作时请务必小心烤箱高温，防止烫伤","蛋挞皮填充后可直接冷冻保存，方便快捷"],"required":[["vibe-e89b8be68c9ee79aae","30只","蛋挞皮"],["egg","8个","鸡蛋"],["milk","200ml","牛奶"],["vibe-e6b7a1e5a5b6e6b2b9","450ml","淡奶油"]],"optional":[],"pantry":[["sugar","80g","白砂糖"]],"steps":[["称量淡奶油","将碗置于克数称上，称量 450 克淡奶油。"],["加入白砂糖","加入 80 克白砂糖。"],["加入牛奶","加入 200 克牛奶。"],["加入蛋黄","取 8 个蛋黄加入，蛋清可留作他用。"],["均匀搅拌","均匀搅拌所有材料直至白砂糖全部融化。"],["过滤蛋挞液","使用网筛对搅拌完成的食材进行过滤。"],["预热烤箱","将烤箱设置 220 摄氏度开始预热（约 10 分钟），记得拿出烤盘。"],["摆放蛋挞皮","将蛋挞皮以 0.5 厘米的间隔均匀放置于烤盘中。"],["填充蛋挞液","将过滤完成的食材倒入蛋挞皮中，液面距离蛋挞皮上沿 0.5 厘米即可，不宜过多。"],["冷冻保存（可选）","至此步骤可直接放入冰箱速冻 12 小时以上保存。"],["烤制","将半成品蛋挞放入烤箱中进行烤制，温度为 200 摄氏度，时间为 25 分钟。"],["出炉食用","烤制结束后即可食用。"]]},
  {"id":"other_kao-qie-zi","name":"烤茄子","category":"素菜","servings":2,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_kao-qie-zi.jpg","sourcePath":"dishes/vegetable_dish/烤茄子/烤茄子.md","calories":145,"tips":["茄子表面有水分、未涂满食用油或未使用叉子扎孔可能导致茄子在烤制的过程中爆裂","第一次用刀划口子的时候，可以直接将茄子竖直切成两半，然后切割出纹路后涂抹上酱料","最终成品和楼下烧烤摊的烤茄子差不多，非常香"],"required":[["eggplant","1个(大约200g)","茄子"],["vibe-e985b1e6b2b9efbc88e7949fe68abdefbc89","4-6克","酱油（生抽）"],["vibe-e5b08fe7b1b3e6a492","1个(大约20g)","小米椒"],["vibe-e8929ce89389","3-4瓣","蒜蓉"],["vibe-e5ad9ce784b6","1-3克","孜然"]],"optional":[],"pantry":[["oil","20-30毫升","食用油"],["salt","0.5-2克","食用盐"]],"steps":[["调配酱料","将酱油、孜然、食用盐、蒜蓉和切碎的小米椒置于碗中，均匀搅拌备用"],["清洁茄子","茄子洗净，用纸巾擦干表面的水分"],["扎孔透气","用叉子在茄子的一侧扎 4-8 下"],["涂抹油脂","使用 15-25ml 的食用油涂满茄子表面"],["预热烤箱","将烤箱温度设置为 200℃ （打开烤箱风扇 大火），预热 2 分钟"],["第一次烤制","将茄子放入烤箱中层或者上层，烤制 12-15 分钟"],["划开口子","取出茄子，用刀茄子上竖着划一个口子。口子居中，上下距 1-1.5cm"],["处理内部","用小刀或者叉子伸入口子，竖着切割茄子内部"],["填入酱料","将口子微微掰开，倒入第一步准备的酱料"],["第二次烤制","再次将茄子放入烤箱，将烤箱温度设置为 200℃ ，烤制 4-7 分钟"],["出炉","取出，关闭烤箱电源"]]},
  {"id":"other_kao-xiang-ban-ba-si-ke-zhi-shi-dan-gao","name":"烤箱版巴斯克芝士蛋糕","category":"甜品","servings":1,"minutes":35,"totalMinutes":480,"waitMinutes":445,"difficulty":"简单","coverPath":"ai-generated/other_kao-xiang-ban-ba-si-ke-zhi-shi-dan-gao.jpg","sourcePath":"dishes/dessert/烤箱版巴斯克芝士蛋糕/烤箱版巴斯克芝士蛋糕.md","calories":266,"tips":["烤箱出来成品抖动是正常的，放凉后口感还不是最好的，一定要冷藏才好吃！","参考资料：下厨房 - 巴斯克芝士蛋糕『最简单的蛋糕』零失败🔥芝士控"],"required":[["vibe-e5a5b6e6b2b9e5a5b6e985aa","212g","奶油奶酪"],["egg","2个","鸡蛋"],["vibe-e9b8a1e89b8be9bb84","1个","鸡蛋黄"],["vibe-e6b7a1e5a5b6e6b2b9","120g","淡奶油"],["vibe-e4bd8ee7ad8be99da2e7b289","10g","低筋面粉"]],"optional":[["vibe-e5b7a7e5858be58a9b","38g","巧克力"]],"pantry":[["sugar","60g","白砂糖"]],"steps":[["软化奶油奶酪","奶油奶酪软化，使用微波炉加热 10s + 10s。"],["混合砂糖","奶油奶酪加入白砂糖，使用打蛋器打至顺滑无颗粒状态。"],["加入蛋液","加入 2 个全蛋和 1 个蛋黄，搅拌均匀。"],["混合淡奶油","加入淡奶油，搅拌均匀。如做巧克力味，在此步加入融化的巧克力。"],["加入面粉","加入低筋面粉，搅拌均匀至无干粉。"],["高温烘烤","烤箱预热至 220°C (425°F)，放入烤箱烤制 20 - 25 分钟。"],["冷藏熟成","取出放凉之后放入冰箱冷藏，最好冷藏过夜。"]]},
  {"id":"other_kong-qi-zha-guo-cui-pi-xian-yan-zha-ji","name":"空气炸锅脆皮现腌炸鸡","category":"荤菜","servings":1,"minutes":70,"difficulty":"中等","coverPath":"ai-generated/other_kong-qi-zha-guo-cui-pi-xian-yan-zha-ji.jpg","sourcePath":"dishes/meat_dish/空气炸锅脆皮现腌炸鸡/空气炸锅脆皮现腌炸鸡.md","calories":700,"tips":["本菜谱也适用于带骨鸡腿，需适当增加时长","辣味爱好者可在裹粉中加3g辣椒粉","孜然味可在出锅后撒2g孜然粉和白芝麻","严禁鸡翅叠放，否则会导致受热不均，外壳不脆","蒜粉、红甜椒粉和洋葱粉可根据个人口味灵活增减"],"required":[["vibe-e696b0e9b29ce9b8a1e7bf85e4b8ad","6个(约300g)","新鲜鸡翅中"],["vibe-e8929ce7b289","13g","蒜粉"],["vibe-70617072696b61efbc88e7baa2e7949ce6a492e7b289efbc89","10g","paprika（红甜椒粉）"],["vibe-e6b48be891b1e7b289","5g","洋葱粉"],["vibe-e9bb91e883a1e6a492e7b289","5g","黑胡椒粉"],["flour","60g","中筋面粉"]],"optional":[["vibe-e985b8e5a5b6e68896e7899be5a5b6","5ml","酸奶或牛奶"],["egg","1个","鸡蛋"],["vibe-e6b3a1e68993e7b289","1g","泡打粉"]],"pantry":[["soy","15ml","生抽"],["starch","30g","淀粉"],["oil","5ml","食用油"]],"steps":[["处理鸡翅","鸡翅清洗后擦干水分，每个鸡翅两面各划2刀。"],["调制腌料","混合生抽15ml、蒜粉8g、红甜椒粉5g、洋葱粉3g、黑胡椒粉3g及牛奶/酸奶。"],["腌制鸡翅","将鸡翅与腌料放入zip袋充分按摩，冰箱冷藏静置一晚。"],["准备裹粉","将中筋面粉60g、淀粉30g、蒜粉5g、红甜椒粉5g、洋葱粉2g、黑胡椒粉2g、泡打粉1g混合均匀。"],["初步裹粉","鸡翅抖干水分放入裹粉按压，抖落余粉后静置10分钟。"],["二次裹粉（可选）","如需更厚外壳，依次经过蛋浆和二次裹粉，静置20分钟。"],["预热与入锅","空气炸锅180°C预热5分钟。炸篮刷油，鸡皮朝下放入鸡翅，表面喷油。"],["第一阶段炸制","180°C先炸10分钟。"],["翻面补油","翻面并在表面补喷薄油，180°C再炸6分钟。"],["补脆上色","观察颜色并检查熟度，如有需要200°C炸1-2分钟补脆。"]]},
  {"id":"other_kong-qi-zha-guo-ji-chi-zhong-de-zuo-fa","name":"空气炸锅鸡翅中的做法","category":"荤菜","servings":1,"minutes":40,"difficulty":"简单","coverPath":"ai-generated/other_kong-qi-zha-guo-ji-chi-zhong-de-zuo-fa.jpg","sourcePath":"dishes/semi-finished/空气炸锅鸡翅中/空气炸锅鸡翅中.md","calories":504,"tips":["推荐购买温控比较好的空气炸锅，不然可能会糊","如果使用未腌制的鸡翅，需要提前自行腌制入味"],"required":[["vibe-e9b8a1e7bf85e4b8ad","6个","鸡翅中"]],"optional":[["vibe-e7bd97e58b92e7a28e","适量","罗勒碎"],["vibe-e4ba91e58d97e58d95e5b1b1e898b8e6b0b4","适量","云南单山蘸水"]],"pantry":[],"steps":[["自然解冻","鸡翅从冰箱拿出来，鸡翼面朝下放入锡纸烤盘，撒上罗勒碎，盖上保鲜膜自然解冻 20 分钟。"],["第一阶段烘烤","撒上罗勒碎，放入空气炸锅设置 200°C，烘烤 10 分钟。"],["翻面烘烤","将鸡翅翻面，再次撒上罗勒碎，空气炸锅 200°C，继续烘烤 7 分钟。"]]},
  {"id":"other_kong-qi-zha-guo-yang-pai","name":"空气炸锅羊排","category":"荤菜","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/other_kong-qi-zha-guo-yang-pai.jpg","sourcePath":"dishes/semi-finished/空气炸锅羊排/空气炸锅羊排.md","calories":473,"tips":["推荐购买温控比较好的空气炸锅，不然可能会糊","洗架子比较麻烦，可根据个人对油脂和入味程度的偏好选择是否使用烤架"],"required":[["vibe-e7be8ae68e92","160g","羊排"],["vibe-e9bb91e6a492e6b7b7e59088e7899be68e92e8b083e591b3e69699","5g","黑椒混合牛排调味料"],["vibe-e8929ce89389e985b1","20g","蒜蓉酱"]],"optional":[["vibe-e9bb84e6b2b9","10g","黄油"],["vibe-e783a7e783a4e69699","20g","烧烤料"],["vibe-e7bd97e58b92e7a28e","适量","罗勒碎"]],"pantry":[],"steps":[["清洗羊排","羊排放入碗中清水洗净血水"],["吸水与腌制","羊排用厨房纸吸干水分，双面抹上黑椒混合调味料、蒜蓉酱，静置腌制 20 分钟"],["正面烘烤","锡纸碗放上烤架，羊排放在烤架上，撒上罗勒碎，黄油或烧烤料放在羊排上，空气炸锅 180° 烘烤 10 分钟"],["翻面烘烤","羊排翻面，撒上罗勒碎，将锡纸碗里的黄油舀上来或放上烧烤料，空气炸锅 180° 再烤 5 分钟"]]},
  {"id":"other_kong-qi-zha-guo-zhao-shao-ji-fan","name":"空气炸锅照烧鸡饭","category":"主食","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_kong-qi-zha-guo-zhao-shao-ji-fan.jpg","sourcePath":"dishes/staple/空气炸锅照烧鸡饭/空气炸锅照烧鸡饭.md","calories":1854,"tips":["米饭的做法参考电饭煲蒸米饭或煮锅蒸米饭","操作时，需要注意温度以免烫伤","参考资料源自库克美食教程: Air fryer Teriyaki Chicken Meatloaf"],"required":[["vibe-e9b8a1e88289","900g","鸡肉"],["vibe-e7b396efbc88e799bde6b299e7b396efbc89","60-65g","糖（白沙糖）"],["vibe-e4b8bde6bb8be9a5bce5b9b2285269747a20637261636b65727329","16个(48g)","丽滋饼干(Ritz crackers)"],["egg","2个","鸡蛋"]],"optional":[],"pantry":[["vibe-e985b1e6b2b9","100-125ml","酱油"],["vibe-e799bde9868b","30-35ml","白醋"]],"steps":[["调制料汁","将酱油、糖和醋混合在一起, 搅匀料汁备用。"],["混合肉馅","在另一个碗中加入鸡肉、鸡蛋、1/2 料汁和压碎的丽滋饼干，搅拌均匀。"],["入锅准备","空气炸锅用箔纸碗铺底，加入肉饼混合物，将剩余的料汁均匀的倒在上面。"],["空气烘炸","在 350°F(177°C) 温度下炸 40 分钟。最好在米饭上食用。"],["切块盛盘","在外观呈金黄酥脆后出锅，切块盛盘。"]]},
  {"id":"other_kou-shui-ji","name":"口水鸡","category":"荤菜","servings":1,"minutes":90,"difficulty":"中等","coverPath":"ai-generated/other_kou-shui-ji.jpg","sourcePath":"dishes/meat_dish/口水鸡/口水鸡.md","calories":1392,"tips":["口水鸡第二种做法待更","注意煮鸡火候，过火会导致肉质变柴","红油调味是关键，热油泼入辣椒粉时需注意油温，避免焦糊","冰水浸泡是鸡皮脆爽的关键"],"required":[["vibe-e9b8a1","半只(500g)","鸡"],["vibe-e8bea3e6a492e7b289","20g","辣椒粉"],["vibe-e88ab1e6a492","30颗(20g)","花椒"],["vibe-e88ab1e7949f","10颗(30g)","花生"],["scallion","2颗(50g)","小葱"],["ginger","1小块(20g)","姜"],["garlic","2个(10g)","蒜"],["vibe-e88ab1e6a492e7b289","5g","花椒粉"]],"optional":[["cilantro","5g","香菜"]],"pantry":[["oil","20ml","食用油"],["sugar","5g","白糖"],["soy","5ml","生抽"],["vinegar","5ml","醋"],["vibe-e591b3e7b2be","5g","味精"]],"steps":[["备料","姜切片，1 颗小葱，15 颗花椒备用"],["煮鸡起锅","鸡肉洗干净，放入锅中，清水没过鸡肉，放入姜片、小葱和花椒，开大火烧开。"],["焖煮鸡肉","大火烧开后，转中小火 20 分钟关火"],["冰镇冷却","取出鸡肉，放入冰水中，直至冰凉"],["切块摆盘","取出鸡肉，切块摆盘子中，备用"],["烘烤花生","小火把锅烧热，导入花生，烘烤至表皮爆裂。"],["处理辅料","一颗葱切成段，蒜拍成末，花椒 15 颗，花生去皮切碎。"],["炼制葱油","锅内导入油烧热后，放入葱段，花椒和一半蒜末，炒香"],["滤油","炒至油温 8 成热，关火，滤出热油"],["泼红油","将热油倒入放辣椒粉的碗中，搅拌，并滤出红油"],["调配料汁","红油中放入剩余蒜末、生抽、醋、盐、味精、糖、香油、花椒粉。拌匀放凉"],["淋汁成盘","在鸡肉上撒上花生碎，把红油淋到切好的鸡肉上，撒上香菜。成盘"]]},
  {"id":"other_lan-cai-rou-mo-si-ji-dou","name":"榄菜肉末四季豆","category":"荤菜","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_lan-cai-rou-mo-si-ji-dou.jpg","sourcePath":"dishes/vegetable_dish/榄菜肉末四季豆/榄菜肉末四季豆.md","calories":720,"tips":["四季豆必须彻底炒熟以避免植物血凝素中毒。","热锅冷油是防止瘦肉粘锅的关键技巧。","橄榄菜自带咸鲜，调味时盐量需谨慎控制。","如果不吃辣，可以省略小米辣，不影响基本风味。"],"required":[["greenBean","220g","四季豆"],["porkBelly","100g","五花肉"],["vibe-e6a984e6a684e88f9c","20g","橄榄菜"],["garlic","10g","大蒜"]],"optional":[["vibe-e5b08fe7b1b3e8bea3","10g","小米辣"]],"pantry":[["oil","30ml","食用油"],["vibe-e985b1e6b2b9","2ml","酱油"],["salt","2g","盐"],["vibe-e9b8a1e7b2be","1g","鸡精"],["whitePepper","1g","胡椒粉"],["sugar","0.5g","白糖"]],"steps":[["处理四季豆","将四季豆洗净，并把筋撕干净，然后切成大小均匀的颗粒备用。"],["处理大蒜","将大蒜拍碎剁成蒜末备用。"],["处理辣椒","将小米辣切成大小均匀的颗粒备用。"],["剁肉末","将五花肉去皮，然后剁成肉末备用。"],["热锅冷油","将锅烧热，加入20ml油滑锅，将热油倒出，再加入10ml冷油。"],["煸炒肉末","放入肉末开始煸炒，小火煸炒两分钟，炒出猪油。"],["爆香配料","肉末炒香之后加入蒜末，橄榄菜和小米辣，炒出香味。"],["炒制四季豆","加入四季豆开中火煸炒，四季豆至少要炒5分钟，一定要保证四季豆熟透。"],["调味","加入2ml酱油从锅边淋入，然后加入2g盐、1g鸡精、1g胡椒粉和0.5g糖。"],["翻炒均匀","将调料翻炒均匀。"],["出锅","出锅，装盘。"]]},
  {"id":"other_lan-ren-dan-ta","name":"懒人蛋挞","category":"甜品","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/other_lan-ren-dan-ta.jpg","sourcePath":"dishes/semi-finished/懒人蛋挞/懒人蛋挞.md","calories":137,"tips":["操作时，可以根据焦褐斑大小适当调整时间","可以在蛋挞中加 10g 碎芝士，制作芝士蛋挞","蛋挞液倒入 4/5 最佳，防止受热溢出"],"required":[["vibe-e89b8be68c9ee6b6b2","10ml/个","蛋挞液"],["vibe-e89b8be68c9ee79aae","1个","蛋挞皮"]],"optional":[["vibe-e7a28ee88a9de5a3ab","10g","碎芝士"]],"pantry":[],"steps":[["预热烤箱","烤箱设置 200 度，预热 10 分钟"],["装填蛋挞","在烤盘上放上蛋挞皮，蛋挞皮中倒入蛋挞液约 10ml，通常倒入 4/5 即可"],["烘烤","将烤盘放入烤箱内，上下火 190 度，烤 10 - 20 分钟"],["出炉","观察蛋挞液烤出焦褐斑点，蛋挞皮完全蓬松冒油即可出炉"]]},
  {"id":"other_lao-ma-ti-hua","name":"老妈蹄花","category":"荤菜","servings":1,"minutes":120,"difficulty":"中等","coverPath":"ai-generated/other_lao-ma-ti-hua.jpg","sourcePath":"dishes/meat_dish/老妈蹄花/老妈蹄花.md","calories":1425,"tips":["猪前蹄比后蹄更适合炖煮，肉质更丰厚。","白芸豆如果没买到，可以用海带代替，风味略有不同。","汤色奶白的关键在于大火焯水和高压压煮的过程。","中途加水必须加热水，否则冷水会使肉质收缩变柴。"],"required":[["vibe-e78caae5898de8b984","3 根","猪前蹄"],["vibe-e799bde88ab8e8b186","200g","白芸豆"],["ginger","30g","姜片"],["vibe-e799bde88ab7","适量","白芷"],["garlic","8g","蒜末"],["scallion","10g","葱花"],["vibe-e5b08fe7b1b3e6a492","适量","小米椒"],["vibe-e88ab1e6a492e6b2b9","适量","花椒油"]],"optional":[["vibe-e5bd93e5bd92","2g","当归"],["vibe-e6b2b9e6b3bce8bea3e5ad90","适量","油泼辣子"]],"pantry":[["whitePepper","5g","白胡椒粉"],["soy","25g","生抽"],["vibe-e9b8a1e7b2be","2g","鸡精"],["wine","适量","料酒"],["salt","适量","盐"],["vibe-e9a699e9868b","适量","香醋"]],"steps":[["浸泡白芸豆","200g 白芸豆提前一晚用清水浸泡备用。"],["处理猪蹄","准备猪前蹄，让师傅从中间劈开。用喷火枪烧除毛囊，然后拿回家彻底清洗干净。"],["焯水去腥","冷水锅中加入猪蹄、大葱段、姜片、料酒，大火煮开后焯水十分钟，撇去浮沫，捞出洗净备用。"],["高压压煮","高压锅中放入猪蹄、当归、白芷、白胡椒粉、姜片。上汽后压 30 分钟，泄压后放入白芸豆，再压 10 分钟。"],["汤底调味","高压锅揭盖后，加入盐、鸡精、葱花进行调味。"],["调制蘸汁","碗中放入葱、蒜、小米椒、白胡椒粉、生抽、香醋、油泼辣子、花椒油，最后加入一勺猪蹄原汤搅匀。"],["成品出锅","将蹄花和汤装碗，配上灵魂蘸汁即可享用。"]]},
  {"id":"other_lao-shi-guo-bao-rou","name":"老式锅包肉","category":"荤菜","servings":2,"minutes":90,"difficulty":"中等","coverPath":"ai-generated/other_lao-shi-guo-bao-rou.jpg","sourcePath":"dishes/meat_dish/老式锅包肉/老式锅包肉.md","calories":882,"tips":["肉片厚度应为 8mm，过厚过薄都会影响口感。","炸制时控制油温，避免外壳过深或不酥脆，这点非常重要。","熬糖醋汁时，注意熬至粘稠但不结块，避免变成糖浆。"],"required":[["vibe-e78caae9809ae8848ae88289","300g","猪通脊肉"],["vibe-e5a4a7e891b1","50g","大葱"],["ginger","30g","姜"],["garlic","3-4 瓣","蒜"],["cilantro","10g","香菜"],["vibe-e59c9fe8b186e6b780e7b289","170g-210g","土豆淀粉"]],"optional":[["carrot","10g","胡萝卜"],["vibe-e591b3e7b2be","适量","味精"],["flour","70g","中筋面粉"],["vibe-e5b08fe88b8fe68993","5g","小苏打"],["vibe-e799bde7869fe88a9de9babb","5g","白熟芝麻"],["starch","1.5g","玉米淀粉"]],"pantry":[["vibe-e799bde9868b","55g","白醋"],["sugar","65g","白糖"],["wine","5ml","料酒"],["salt","5g","盐"],["oil","1000ml","食用油"],["soy","4g","生抽"]],"steps":[["处理猪肉","将猪通脊肉切成厚度 8mm 的均匀肉片，去除筋膜。冲洗血水后，可选加入小苏打抓匀静置 5 分钟，再冲洗干净。"],["腌制肉片","肉片中加入盐 3g、料酒 5ml，拌匀腌制 15 分钟。"],["挂浆（沉淀淀粉法）","土豆淀粉加水静置 60 分钟，倒掉上层水，保留底层淀粉浆。放入肉片，加 5ml 水和 3ml 油搅拌均匀。"],["调制糖醋汁","混合白糖 65g、白醋 55g、生抽 4g、盐 2g，搅拌均匀。可选准备少量水淀粉备用。"],["准备配菜","葱、姜、胡萝卜切丝，香菜切段，蒜切片。"],["炸制肉片","分三次炸制：初炸(170℃)定型捞出；复炸(200℃)至金黄酥脆；三炸(220℃)快速复炸提脆。"],["炒制出锅","锅留底油，熬浓糖醋汁，倒入肉片和配菜，快速翻炒均匀裹汁。"],["出锅装盘","盛入盘中，撒上白熟芝麻即可。"]]},
  {"id":"other_lao-you-zhu-rou-fen","name":"老友猪肉粉","category":"主食","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/other_lao-you-zhu-rou-fen.jpg","sourcePath":"dishes/staple/老友猪肉粉/老友猪肉粉.md","calories":927,"tips":["米粉必须提前用 50 度的温水泡半小时，否则口感会很差。","白糖是可选的，根据个人对甜味的接受程度决定是否添加。","酸笋是这道菜的灵魂，一定要先干炒出水分。"],"required":[["riceNoodle","250g","米粉"],["vibe-e78caae88289","50g","猪肉"],["vibe-e985b8e7ac8b","50g","酸笋"],["vibe-e58981e6a492","15g","剁椒"],["vibe-e8b186e8b189","30g","豆豉"],["garlic","10g","大蒜"]],"optional":[["sugar","5g","白糖"]],"pantry":[["wine","10-20ml","料酒"],["soy","15ml","生抽"],["vinegar","5ml","米醋"],["salt","5ml","盐"],["oil","15ml","油"],["starch","15ml","生粉"],["whitePepper","10ml","胡椒粉"]],"steps":[["腌制猪肉","全部猪肉用料酒、盐、生抽、生粉、胡椒粉倒在一个碗里调味，搅拌均匀后备用。"],["炒干酸笋","热锅不放油，下全部酸笋把水分炒干，炒干的酸笋中间留出一点空间。"],["爆香佐料","放入 10ml - 15ml 食用油与全部大蒜、剁椒、豆豉到酸笋中间，炒出香味后全部推到中间翻炒。"],["炒猪肉","放入全部调味好的猪肉，持续放入 10ml 生抽炒一分钟。"],["煮汤底","放入 5ml 米醋、10ml 生抽、450ml 清水一起煮开。"],["煮粉盛盘","水煮开后，放入温水泡好的米粉，继续煮 3 分钟即可盛盘。"]]},
  {"id":"other_li-yu-dun-bai-cai","name":"鲤鱼炖白菜","category":"水产","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/other_li-yu-dun-bai-cai.jpg","sourcePath":"dishes/aquatic/鲤鱼炖白菜/鲤鱼炖白菜.md","calories":792,"tips":["也可以放一些粉条，粉条需先用冷水或热水泡软，可以和娃娃菜一起放入","干辣椒根据个人口味选择，不吃辣可以不放","调料比例建议根据鱼的实际大小进行同比例缩放"],"required":[["vibe-e9b2a4e9b1bc","1.2 斤","鲤鱼"],["babyCabbage","13 片","娃娃菜"],["ginger","3 片","姜"],["garlic","3 瓣","蒜"],["vibe-e6a182e79aae","1 块","桂皮"],["vibe-e983abe58ebfe8b186e793a3e985b1","20 克","郫县豆瓣酱"]],"optional":[["chili","4-6 个","干辣椒"]],"pantry":[["oil","10ml","食用油"],["salt","5-8 克","盐"],["darkSoy","3ml","老抽"],["soy","6ml","生抽"],["starAnise","3 个","八角"]],"steps":[["食材处理","鲤鱼清洗干净，在鱼身上多划几个伤口（改刀），方便入味。"],["备菜","娃娃菜清洗干净放入盘中备用。"],["炒制底料","锅中加油，等油热放入“少盐”、“姜”、“蒜”、“郫县豆瓣酱”、“桂皮”、“八角”炒出香味。"],["煎鱼","把鱼放锅里煎，总共煎 3 分钟，每 30 秒翻一次面。"],["加入配料","加入水（水量尽量和鱼平齐，可以少一点点），放入“生抽”、“老抽”、“娃娃菜”。"],["炖煮出锅","大火炖 15-20 分钟，汤汁快干时添加“盐”即可出锅。"]]},
  {"id":"other_li-zhi-rou","name":"荔枝肉","category":"荤菜","servings":1,"minutes":45,"difficulty":"中等","coverPath":"ai-generated/other_li-zhi-rou.jpg","sourcePath":"dishes/meat_dish/荔枝肉/荔枝肉.md","calories":681,"tips":["更多情况下，福州当地会选用马蹄（解腻）和马铃薯（洗油），若买不到可用凤梨替代。","闽菜以甜为主，如果吃不惯的可以减少或放弃白糖。","可以通过勺子敲打瘦肉块，听到声响来判断是否炸透瘦肉。"],"required":[["pork","150g","瘦肉"],["vibe-e587a4e6a2a8","100g","凤梨"],["mushroom","2朵","鲜香菇"],["vibe-e89fb9e591b3e88f87","30g","蟹味菇"],["egg","1个","鸡蛋"],["vibe-e6b780e7b2892fe7949fe7b289","100g","淀粉/生粉"],["vibe-e795aae88c84e985b1","20g","番茄酱"],["ginger","5g","姜末"],["vibe-e88a9de9babb","2g","芝麻"]],"optional":[],"pantry":[["oil","500ml","食用油"],["sugar","5g","白砂糖"],["soy","5ml","生抽"],["vibe-e9b8a1e7b2be","5g","鸡精"],["vibe-e9a699e9868b","2ml","香醋"]],"steps":[["处理瘦肉并腌制","瘦肉切块（每块 2-3 cm ），放入大碗中，加入鸡蛋 1 个 、生粉 50 g 、生抽 3 ml 、鸡精 2 g"],["挂糊处理","充分搅拌,直至生粉包裹住瘦肉块（太稀则继续加生粉，太干则加水），然后加入 5 ml 油，在充分搅拌后备用"],["调配糖醋汁","在准备一个碗，加入番茄酱、鸡精 3 g 、生抽 2 ml 、姜末、白砂糖、生粉 10 g 、香醋、凉水 200 ml ,充分搅拌后备用"],["准备凤梨","切一个凤梨, 准备 6 个 （每个 1.5-2 cm）凤梨块"],["热油","起锅烧油，倒入 500 ml 油，一直烧油直到听到油炸声"],["下锅初炸","将瘦肉一个一个放入锅中（切记不可以整碗倒入），保证每个肉不要粘在一起"],["翻炸定型","全部放入瘦肉后，每 30 S 用勺子来回两面翻转瘦肉块，直至瘦肉块表面金黄"],["复炸","取出瘦肉，一分钟后倒入油锅中继续炸，直至瘦肉块表面出现焦黄后，取出放入大碗备用"],["裹汁翻炒","起锅，倒入汤汁，30 S 后倒入瘦肉块、凤梨块，充分翻炒后出锅"],["点缀","摆上芝麻"]]},
  {"id":"other_liang-ban-ji-si","name":"凉拌鸡丝","category":"荤菜","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_liang-ban-ji-si.jpg","sourcePath":"dishes/meat_dish/凉拌鸡丝/凉拌鸡丝.md","calories":293,"tips":["有条件可以加入香菜、小葱等进行调味","喜欢吃辣的可以加入辣椒油","鸡胸肉大小会影响成熟时间，请灵活掌握煮制时长"],"required":[["chicken","200g","鸡胸肉"],["vibe-e9babbe6b2b9efbc88e88ab1e6a492e6b2b9efbc89","5ml","麻油（花椒油）"],["ginger","20g","姜"],["vibe-e58789e799bde5bc80e6b0b4","适量","凉白开水"]],"optional":[],"pantry":[["soy","4ml","生抽"],["vibe-e9a699e9868b","4ml","香醋"],["sugar","3g","白糖"],["salt","2g","盐"],["wine","20ml","料酒"],["water","4L","水"]],"steps":[["食材预处理","姜切片，备用。"],["准备煮锅","锅中倒入 4 升水。"],["加入食材","加入鸡胸肉、姜片。"],["去腥","倒入 20 毫升料酒。"],["烧开","开大火不盖盖将水烧开。"],["撇浮沫","水开后转中火，用勺子将浮沫捞出。"],["煮制","继续煮 5-7 分钟。"],["熟度检测","用筷子插入鸡胸肉检测。"],["降温","用凉白开水冲泡鸡胸肉，使鸡胸肉降至室温。"],["撕鸡丝","顺着鸡胸肉纹理将鸡胸肉撕成细丝。"],["准备调料碗","准备一个碗。"],["配制料汁","碗中加入准备好的麻油、生抽、香醋、白糖、盐。"],["搅拌料汁","搅拌料汁，使糖和盐尽量溶化。"],["拌匀成品","将料汁倒入鸡丝中，搅拌均匀。"]]},
  {"id":"other_liang-ban-mu-er","name":"凉拌木耳","category":"素菜","servings":1,"minutes":65,"difficulty":"简单","coverPath":"ai-generated/other_liang-ban-mu-er.jpg","sourcePath":"dishes/vegetable_dish/凉拌木耳/凉拌木耳.md","calories":129,"tips":["调味品的数量可以根据个人口味进行调整，如果不喜欢芥末，可以不加入。","等木耳冷却入味后口味更佳，建议放置约15分钟。","木耳一定要彻底煮熟，但时间不宜过长保持爽脆。"],"required":[["vibe-e5b9b2e69ca8e880b3","20g","干木耳"],["garlic","2-3个","蒜瓣"],["vibe-e5b08fe7b1b3e8bea3","2个","小米辣"]],"optional":[["vibe-e6b9bfe69ca8e880b3","120g","湿木耳"],["vibe-e88aa5e69cab","约2cm","芥末"]],"pantry":[["salt","2g","盐"],["sugar","5-10g","白糖"],["soy","15ml","生抽"],["vinegar","15ml","醋"],["sesame","5ml","香油"]],"steps":[["泡发木耳","将干木耳放入容器，加入约400ml水，泡发约45分钟。如果是湿木耳则跳过此步。"],["修整清洗","将泡发好的木耳剪去根部硬块，并用清水彻底洗净杂质。"],["焯水处理","起锅烧水，水沸腾后放入木耳，大火煮1.5-2分钟。"],["准备调味料","将蒜瓣、小米辣切碎放入中大碗中，依次加入盐、糖、生抽、醋、香油、芥末。"],["沥水混合","将煮好的木耳捞出，充分沥干水分，放入盛有调料的碗中。"],["搅拌装盘","将木耳与调料充分搅拌均匀，端盘上桌。"]]},
  {"id":"other_liang-ban-wo-sun","name":"凉拌莴笋","category":"素菜","servings":1,"minutes":20,"difficulty":"简单","coverPath":"ai-generated/other_liang-ban-wo-sun.jpg","sourcePath":"dishes/vegetable_dish/凉拌莴笋/凉拌莴笋.md","calories":295,"tips":["萝卜非必须，只是为了增加菜色","端盘后，可以根据个人口味，额外增加生抽、白砂糖、香醋、芝麻等佐料","莴笋条的大小看个人口感决定，但莴笋皮要尽量多削点，不然真的影响口感","冰镇效果更加"],"required":[["vibe-e88eb4e7ac8b","1 根","莴笋"],["vibe-e5b08fe7b1b3e8bea3","2 个","小米辣"],["ginger","1 片","姜"],["garlic","2 粒","蒜头"]],"optional":[["vibe-e8909de58d9c","0.25 根","萝卜"]],"pantry":[["salt","5 g","盐"],["oil","25 ml","食用油"]],"steps":[["削皮腌制","莴笋削皮，切小条。萝卜切条，一起放入大碗，加入盐搅拌，放置 10 分钟"],["清洗去盐","放置后的莴笋用水清洗 1-2 遍"],["焯水处理","起锅烧水，放入莴笋，水煮 1 分钟捞出，沥干水分，放入大碗"],["热油煸香","起锅烧油，放入姜片、蒜粒、小米椒煸炒 30-45 S，倒入莴笋中"],["搅拌成菜","搅拌充分，端盘"]]},
  {"id":"other_liang-fen","name":"凉粉","category":"甜品","servings":1,"minutes":25,"totalMinutes":240,"waitMinutes":215,"difficulty":"中等","coverPath":"ai-generated/other_liang-fen.jpg","sourcePath":"dishes/staple/凉粉/凉粉.md","calories":539,"tips":["制作过程需要耐心搅煮，防止底部烧焦","冷藏定型时间必须充足，否则凉粉容易断裂","水量配比是成功的关键，建议严格称重"],"required":[["vibe-e8b18ce8b186e6b780e7b289","100g","豌豆淀粉"],["garlic","3 瓣","大蒜"],["vibe-e5b08fe7b1b3e8bea3","3 颗","小米辣"],["vibe-e8bea3e6a492e7b289","10g","辣椒粉"],["vibe-e88ab1e7949fe7a28e","5g","花生碎"],["cilantro","5g","香菜"]],"optional":[],"pantry":[["vibe-e985b1e6b2b9","10ml","酱油"],["vinegar","10ml","醋"],["sugar","3ml","白糖"],["vibe-e9b8a1e7b2be","3g","鸡精"],["salt","3g","盐"]],"steps":[["准备食材","准备好豌豆淀粉、调料等所有食材。"],["混合淀粉水","把豌豆淀粉和水各 100 克混合搅拌均匀。"],["烧开水","往锅中倒入 600g 水，大火煮开后转为小火。"],["煮制淀粉糊","倒入淀粉水，边倒边不断的搅拌，搅拌到浓稠且色泽均匀。"],["准备容器","找一个容器，在容器中刷一层薄薄的食用油。"],["冷藏定型","将煮好的淀粉倒入容器中，待冷却后放入冰箱冷藏 2-4 小时。"],["切条处理","冷藏后取出，脱模，切成均匀的条状。"],["炸制辣油","大蒜和小米辣剁成沫，放上 10g 辣椒粉，5g 花生碎，泼上热油搅拌均匀。"],["调制酱汁","再加入 10ml 酱油，10ml 醋，5g 白糖，3g 鸡精，3g 盐搅拌均匀。"],["装盘完成","将调味料倒在凉粉上，然后撒上香菜即可。"]]},
  {"id":"other_lu-cai-de-zuo-fa","name":"卤菜的做法","category":"荤菜","servings":1,"minutes":60,"totalMinutes":720,"waitMinutes":660,"difficulty":"中等","coverPath":"ai-generated/other_lu-cai-de-zuo-fa.jpg","sourcePath":"dishes/meat_dish/卤菜/卤菜.md","calories":467,"tips":["卤水过滤后可反复使用，越陈越香，存放时需重新烧开杀菌并冷冻","卤制素菜必须另取卤水，且该部分卤水不可再重复使用","卤水可作为牛肉面的汤底，味道极佳","凉拌时可按蒜末、葱花、白芝麻、辣椒粉 1:1:1:1 比例配制调料，加入热油和卤汤"],"required":[["vibe-e58da4e69699e58c85","1包(约10g)","卤料包"],["vibe-e9bb84e8b186e985b1","15ml","黄豆酱"],["vibe-e8b186e793a3e985b1","15ml","豆瓣酱"],["vibe-e58d97e88590e4b9b3","15ml","南腐乳"],["onion","半个(约100g)","洋葱"],["ginger","30g","生姜"],["garlic","40g","大蒜"],["chili","10g","干辣椒"],["vibe-e595a4e98592","1罐(330ml)","啤酒"],["vibe-e7899be885b1e5ad90","500g","牛腱子"]],"optional":[],"pantry":[["oysterSauce","15ml","蚝油"],["soy","120ml","生抽"],["darkSoy","60ml","老抽"],["salt","10-15g","盐"],["sugar","30g","白糖"],["water","足量","清水"]],"steps":[["牛腱子去血水","牛腱子提前浸泡在冷水中 3 小时以上，去除血水"],["熬制糖色","锅中加入 30g 白糖，小火加热至糖完全融化并呈现棕褐色，加入 150ml 热水，搅拌均匀备用"],["准备辅料","将洋葱切块，生姜和大蒜拍碎，干辣椒掰断备用"],["烧制卤水基底","在高压锅中加入足量的水，放入卤料包、洋葱、生姜、大蒜、干辣椒，大火烧开"],["调味卤水","依次加入黄豆酱、豆瓣酱、蚝油、南腐乳、糖色、生抽、老抽、盐和啤酒，再次烧开"],["牛肉焯水","牛腱子放入锅中焯水 2-3 分钟，捞出并用热水冲洗干净表面的浮沫"],["高压卤制","将牛腱子放入卤水中，盖上高压锅盖，上汽后继续烹饪 25-30 分钟"],["浸泡入味","烹饪完成后不要开盖，自然冷却并浸泡一晚上"],["冷藏切片","将卤好的肉取出放入冰箱冷藏使其成型，食用前取出切片"]]},
  {"id":"other_ma-ge-li-te-bing-gan","name":"玛格丽特饼干","category":"甜品","servings":1,"minutes":45,"difficulty":"中等","coverPath":"ai-generated/other_ma-ge-li-te-bing-gan.jpg","sourcePath":"dishes/dessert/玛格丽特饼干/玛格丽特饼干.md","calories":863,"tips":["可根据个人口味微调盐与糖的比例，如果喜欢其他风味可以把每份的 3 克玉米淀粉换成可可粉或抹茶粉。","如果条件允许可以把蛋黄、低筋面粉等食材过筛，口感会更好。","介于材料获取难度选择了白砂糖，如果条件允许可以换成糖粉 30 克。","如果没有烤箱可使用微波炉（高火 2-3 分钟）或空气炸锅（150℃ 20 分钟）。"],"required":[["vibe-e7869fe89b8be9bb84","1个","熟蛋黄"],["vibe-e9bb84e6b2b9","50克","黄油"],["vibe-e4bd8ee7ad8be99da2e7b289","50克","低筋面粉"]],"optional":[],"pantry":[["sugar","20克","白砂糖"],["salt","1克","盐"],["starch","50克","玉米淀粉"]],"steps":[["预处理原料","黄油隔热水融化、将蛋黄磨碎备用。"],["混合油糖蛋","在融化的黄油中添加糖、盐、以及碾碎的鸡蛋黄，搅拌均匀"],["揉制面团","加入低筋面粉与玉米淀粉，揉成面团"],["分割搓圆","将面团均匀分割成大约 8 克重的小面团，然后将它们搓成球状。"],["压制花纹","使用大拇指轻压在每个小面团上，以形成自然裂纹。"],["烘烤","预热烤箱至 150℃，将小面团放入烤箱中，烘烤 20 分钟。"],["冷却食用","微微放凉即可食用"]]},
  {"id":"other_ma-po-dou-fu","name":"麻婆豆腐","category":"素菜","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/other_ma-po-dou-fu.jpg","sourcePath":"dishes/meat_dish/麻婆豆腐/麻婆豆腐.md","calories":476,"tips":["期间一定要注意观察，防止糊锅","咸鸭蛋的蛋白已有咸味，盐量请根据口味酌情添加","内脂豆腐易碎，操作全程尽量减少翻动"],"required":[["vibe-e58685e88482e8b186e88590","1盒","内脂豆腐"],["vibe-e592b8e9b8ade89b8b","1枚","咸鸭蛋"],["porkBelly","20-30g","五花肉"],["garlic","两瓣","大蒜"],["ginger","2片","生姜"],["vibe-e9a699e8bea3e985b1","5g","香辣酱"],["vibe-e88ab1e6a492","20颗","花椒"]],"optional":[["vibe-e5b08fe7b1b3e6a492","5根","小米椒"]],"pantry":[["salt","3g","食盐"],["vibe-e985b1e6b2b9","10g","酱油"]],"steps":[["处理辅料","大蒜和生姜切碎，备用"],["处理辣椒","小米辣切成辣椒圈，备用"],["处理肉糜","五花肉切成肉糜（本来就是买的肉糜的跳过）"],["腌制肉糜","肉糜中加入一半的食盐和味极鲜酱油，搅拌均匀，备用"],["处理咸鸭蛋","鸭蛋用菜刀竖着对半切开，去除蛋黄，剩下的蛋白捣碎成大约 2 mm * 2 mm 大小"],["切豆腐","打开豆腐包装，用水果刀将在盒子中的豆腐划成大约 2.5 cm * 3 cm 大小，备用"],["热锅起油","热锅，锅内放入 10ml - 15ml 食用油。等待 10 秒让油温升高"],["炒香底料","调成小火，放入大蒜、生姜、辣椒圈、花椒、咸鸭蛋、蒜蓉辣酱翻炒 20 秒，炒出香味"],["炒肉糜","调成中火，放入肉糜，翻炒大约 1 分钟，肉炒变色"],["下豆腐","调成小火，放入豆腐，将剩下的食盐、味极鲜酱油酱油均匀的洒在豆腐上"],["加水焖煮","从锅边倒入开水，没过豆腐即可"],["大火收汁","开大火，水沸腾后立马转入中火，等待大约 10 分钟"],["出锅","等到水只剩 1/5 并且豆腐表面已经入色，关火，盛盘"]]},
  {"id":"other_mei-cai-kou-rou","name":"梅菜扣肉","category":"荤菜","servings":1,"minutes":150,"difficulty":"中等","coverPath":"ai-generated/other_mei-cai-kou-rou.jpg","sourcePath":"dishes/meat_dish/梅菜扣肉/梅菜扣肉.md","calories":3756,"tips":["不喜欢吃甜的可以去掉白砂糖，不影响主流程。","蒸制时间可以根据个人喜好调整。","炒干梅干菜的作用是为了在蒸的过程中充分吸收五花肉出的油。","油炸后的五花肉皮非常香，是这道菜的精华。"],"required":[["porkBelly","200g","五花肉"],["vibe-e6a285e88f9c","30g","梅菜"],["vibe-e4ba94e9a699e7b289","2g","五香粉"],["vibe-e5b08fe7b1b3e6a492","1个","小米椒"],["garlic","10g","蒜末"]],"optional":[["sugar","5g","白砂糖"]],"pantry":[["oil","300ml","食用油"],["darkSoy","30ml","老抽"],["soy","20ml","生抽"],["salt","2g","食用盐"],["vibe-e9b8a1e7b2be","2g","鸡精"]],"steps":[["浸泡梅菜","梅菜放到清水中，浸泡 1 小时。"],["处理猪皮（可选）","锅中倒入 50 ml 食用油，将整个五花肉猪皮朝下，放到锅中 1 分钟，取出刮掉猪皮上的杂质。"],["水煮五花肉","锅中加入开水，放入五花肉，大火煮 20 分钟（至筷子可以插进五花肉），取出五花肉。"],["腌制五花肉","在五花肉表面涂抹均匀老抽、五香粉、白砂糖，放置 15 分钟。"],["油炸五花肉","起锅烧油，加入五花肉，中火油炸直至两面金黄色（约 3-5 分钟）。"],["炒制梅菜","起锅烧油，倒入梅菜，加上小米椒、蒜蓉、鸡精、食用盐后翻炒，直至炒干梅干菜水分。"],["切片装碗","五花肉切片（厚度约 0.5-1 cm），放在大碗中，撒上炒好的梅干菜。"],["上锅蒸制","中火蒸 45 分钟。"],["倒扣装盘","拿个盘子倒盖在五花肉大碗中，将五花肉倒扣在盘子中即可。"]]},
  {"id":"other_mo-yu-dan-gao","name":"魔芋蛋糕","category":"甜品","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_mo-yu-dan-gao.jpg","sourcePath":"dishes/dessert/魔芋蛋糕/魔芋蛋糕.md","calories":234,"tips":["本食谱主要参考生酮蛋糕制作视频","打发蛋白及翻拌流程可大幅借鉴戚风蛋糕的制作经验","魔芋粉吸水性强，翻拌速度需适中，避免消泡"],"required":[["egg","3个","鸡蛋"],["vibe-e8b5a4e89793e7b396e98687","50g","赤藓糖醇"],["vibe-e58fafe58fafe7b289","10g","可可粉"],["vibe-e9ad94e88a8be7b289","10g","魔芋粉"],["vibe-e5a194e5a194e7b289","1g","塔塔粉"]],"optional":[],"pantry":[],"steps":[["预热烤箱","在准备蛋糕糊之前，将烤箱预热至 350 ℉ (150 ℃)。"],["前期分离操作","将新鲜鸡蛋的蛋清与蛋黄分离到两个干燥的容器中。"],["打发蛋白","蛋清加塔塔粉，先高速打至粗泡，加赤藓糖醇后中低速打至干性发泡。"],["混合其他原料","将蛋黄加入蛋白霜拌匀，再加入可可粉和魔芋粉，先餐刀翻拌再用打蛋器低速搅匀。"],["烘烤","模具铺纸，倒入蛋糕糊抹平并震出大气泡，入炉烘烤 25 分钟。"],["冷却与脱模","模具从高处落下震出热气，倒扣冷却 10 分钟后脱模切块。"]]},
  {"id":"other_nai-lao-pei-gen-tong-xin-fen","name":"奶酪培根通心粉","category":"甜品","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_nai-lao-pei-gen-tong-xin-fen.jpg","sourcePath":"dishes/meat_dish/奶酪培根通心粉/奶酪培根通心粉.md","calories":728,"tips":["本料理热量极高，约有 1300 大卡及 80g 脂肪，不建议常吃。","制作白酱时火候控制非常重要，一定要保持小火以免结块。"],"required":[["vibe-e9809ae5bf83e7b289","100-125g","通心粉"],["vibe-e5a5b6e985aa","40-55g(烘烤需额外准备25g)","奶酪"],["vibe-e59fb9e6a0b9e68896e585b6e4bb96e88289e7b1bb","100-125g","培根或其他肉类"],["onion","25-40g","洋葱"],["vibe-e9bb84e6b2b9","15g","黄油"],["flour","10g","面粉"],["milk","125ml","牛奶"],["garlic","半瓣","大蒜"]],"optional":[],"pantry":[],"steps":[["准备奶酪","将奶酪用磨丝器磨成碎末备用。"],["切配洋葱","将洋葱切成细条状或碎末。"],["煮通心粉","在锅中加入微咸的水，煮沸后放入通心粉煮 6 分钟。"],["融化黄油","炒锅开启中火，放入黄油等待完全融化。"],["炒香洋葱大蒜","加入洋葱炒至软化，随后加入蒜末炒出香味。"],["炒肉","加入培根或其他肉类，翻炒约 5 秒。"],["调制白酱","调至小火，分四次加入牛奶，每次加入后搅拌 5 秒使酱汁乳化，再加入下一次。"],["增稠与调味","加入面粉并充分搅拌均匀，随后加入奶酪碎继续搅拌至完全融化。"],["混合","将煮好的通心粉倒入奶酪酱中搅拌均匀。"],["烘烤（可选）","预热烤箱至 180°C。在通心粉表面铺上额外的 50g 芝士碎，放入烤箱烤至表面金黄（约 24 分钟）。"]]},
  {"id":"other_nan-pai-hong-shao-rou-de-zuo-fa","name":"南派红烧肉的做法","category":"荤菜","servings":2.5,"minutes":90,"difficulty":"中等","coverPath":"ai-generated/other_nan-pai-hong-shao-rou-de-zuo-fa.jpg","sourcePath":"dishes/meat_dish/红烧肉/简易红烧肉.md","calories":3248,"tips":["刀要尽量磨得锋利，切肉更顺手。","炖煮锅具首选砂锅，受热更均匀。","收汁阶段是关键，汤汁呈粘稠挂杯状即可，千万不要完全收干。","焯水后再改刀小块，肉质收紧，形状更规整漂亮。"],"required":[["vibe-e78caae4ba94e88ab1e88289","1000g","猪五花肉"],["ginger","6片","姜"],["scallion","30g","小葱"],["garlic","25g","大蒜"],["vibe-e58789e6b0b4","适量","凉水"],["vibe-e9a699e58fb6","4片","香叶"],["vibe-e88ab1e6a492","10g","花椒"]],"optional":[],"pantry":[["oil","100-150ml","油"],["rockSugar","100g","冰糖"],["sugar","30g","白砂糖"],["darkSoy","15ml","老抽"],["wine","30ml","料酒"],["water","适量","开水"],["starAnise","3个","八角"],["salt","2-3g","盐"]],"steps":[["改刀大块","猪五花肉先不切小块，切成能放入锅中的大块（约 5–6cm 宽）即可。"],["准备姜片","生姜切片，每片厚度约 3mm。"],["烧开水","烧开一锅水备用。"],["切葱白","小葱白色的部分切成小段。"],["处理大蒜","蒜中间切开，不要拍扁。"],["分装预备包","将辅料分为A包（2片姜、2段葱）和B包（余下姜、葱、蒜、花椒、八角、香叶）。"],["冷水焯水","凉水锅中放入肉块，加入20ml料酒与A包，煮15分钟捞出洗净。"],["切小方块","肉块稍放凉后，切成约 3cm × 3cm × 3cm 的正方体块。"],["炒糖色与爆香","另起锅炒糖色，待糖液起密集小泡时，迅速加入B包爆香5-10秒。"],["煸炒与炖煮","倒入五花肉大火翻炒上色并煸出油脂，倒入开水没过肉，盖盖转中小火炖50-60分钟。"],["二次调味","加入10ml料酒，盖盖煮沸。"],["撇油除沫","炖煮期间每隔25分钟打开盖子捞出表面的油和沫。"],["捞出辅料准备收汁","当汤汁降至肉高度的3/5时，转中火，捞出所有辅料。"],["收汁出锅","打开锅盖收汁至粘稠状，切记不可收干。"]]},
  {"id":"other_ning-meng-shui-de-zuo-fa","name":"柠檬水的做法","category":"饮料","servings":1,"minutes":5,"difficulty":"简单","coverPath":"ai-generated/other_ning-meng-shui-de-zuo-fa.jpg","sourcePath":"dishes/drink/柠檬水/柠檬水.md","calories":141,"tips":[],"required":[["vibe-e69fa0e6aaac","40~45克","柠檬"],["vibe-e69e9ce89c9c","40~45克","果蜜"]],"optional":[["vibe-e586b0","几块","冰"]],"pantry":[["water","约400ml","水"]],"steps":[["准备柠檬","称 40~45 克柠檬，放入雪克杯中"],["捶打出汁","雪克杯盖盖子锤大约 10 次"],["加入调味","加入果蜜 40~45 克"],["补水","向雪克杯中补水"],["摇晃均匀","盖紧盖子用力摇晃均匀"],["加冰完成","最后根据喜好加冰"]]},
  {"id":"other_niu-pai-de-zuo-fa","name":"牛排的做法","category":"荤菜","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_niu-pai-de-zuo-fa.jpg","sourcePath":"dishes/meat_dish/牛排/牛排.md","calories":1605,"tips":["电磁炉火候：高火1.8-2.2kw，中火800-1400w，小火200-600w。","燃气灶火候：高火旋转气阀70%-90%，中火40%-60%，小火10%-30%。","调味建议：大蒜、黑胡椒和黄油是核心，可根据喜好加入小米辣等创新调料。","油温判断：淋油时冒泡且颜色不深褐为宜；锅中出现大量水通常是由于解冻或吸水不彻底。"],"required":[["vibe-e7899be68e92","450-500g (两片)","牛排"],["vibe-e9bb84e6b2b9","20-25g","黄油"],["vibe-e9bb91e883a1e6a492e7b289","2g","黑胡椒粉"],["garlic","1个 (约25-30g)","大蒜"]],"optional":[["vibe-e9a699e69699","2g (3-6根)","香料"],["vibe-e58fa3e89891","5-10个","口蘑"],["vibe-e5b08fe59c9fe8b186","5-10个 (每个约20g)","小土豆"],["vibe-e5b08fe795aae88c84","5-10个 (每个约15g)","小番茄"],["vibe-e9a284e588b6e7899be68e92e985b1e6b181","适量","预制牛排酱汁"]],"pantry":[["vibe-e6a984e6a684e6b2b9","10-15ml","橄榄油"],["salt","5g","盐"]],"steps":[["牛排解冻","从冰箱取出牛排。若冰冻需提前一晚冷藏解冻，并在烹饪前半小时放至常温。"],["配菜预处理","将小番茄、小土豆和口蘑洗净，对半切开备用。"],["大蒜处理","大蒜剥皮，留5-8个大蒜瓣，用刀背压扁。"],["牛排预处理","肉眼牛排需剪断中心结缔组织；西冷可剔除边油。最后用厨房纸吸干表面全部水分。"],["热锅热油","高火热锅，加入橄榄油，热锅15-30秒至油温6-8成。"],["即时腌制","将海盐和黑胡椒均匀洒在牛排表面并涂抹揉搓。完成后立即下锅。"],["第一面煎制","将牛排由近及远放入锅中，高火煎制1.5分钟（视厚度调整）。"],["土豆预熟","煎肉同时，将土豆微波加热10分钟或水煮3-5分钟。"],["翻面煎制","牛排翻面，继续煎制1.5分钟。"],["侧面煎制","若是西冷或菲力，需用工具将牛排竖起煎侧面约30秒。"],["加入香料黄油","切中火，快速加入黄油、大蒜、百里香，推动黄油融化并将大蒜压在肉下。"],["淋油增香","倾斜平底锅，用汤匙舀起热油不断淋在牛排上，每面各持续30秒。"],["醒肉","牛排盛出放在案板上，用锡箔纸包裹静置5-10分钟。"],["煎配菜","利用锅中余油，中火煎土豆、番茄、蘑菇5分钟。"],["切块装盘","牛排切成1.5cm宽条，与配菜一同装盘，淋上余油或酱汁。"]]},
  {"id":"other_nong-jia-yi-wan-xiang","name":"农家一碗香","category":"荤菜","servings":1,"minutes":17,"difficulty":"中等","coverPath":"ai-generated/other_nong-jia-yi-wan-xiang.jpg","sourcePath":"dishes/meat_dish/农家一碗香/农家一碗香.md","calories":1638,"tips":["如果第一次炒鸡蛋的时候放的油太多，炒猪肉的时候可以视情况不加油","豆瓣酱和酱油已有咸味，通常无需额外加盐","参考资料来源：下厨房"],"required":[["vibe-e78caae88289","250g","猪肉"],["vibe-e99d92e6a492","3个","青椒"],["egg","2-3个","鸡蛋"],["vibe-e8929ce78987","2片","蒜片"],["vibe-e8b186e793a3e985b1","10g","豆瓣酱"],["vibe-e5b08fe7b1b3e6a492","1个","小米椒"],["ginger","2片","姜"]],"optional":[],"pantry":[["sugar","5g","白糖"],["vibe-e985b1e6b2b9","15ml","酱油"]],"steps":[["备菜阶段","将猪肉切片（肥瘦肉分开放），青椒和小米辣切段，蒜瓣拍末，姜切丝，鸡蛋打入碗中搅散。"],["滑炒鸡蛋","锅中倒入适量油开小火，油热后倒入蛋液炒散，断生即可盛出备用。"],["煸炒肥肉","锅中留少许底油，放入肥猪肉片小火煸炒，逼出猪油。"],["炒制瘦肉","待肥肉变色金黄时，转中火放入瘦肉片翻炒至完全变色。"],["加入香料调味","加入姜丝、蒜末和豆瓣酱，翻炒均匀使肉片上色。"],["合炒成菜","放入青红椒和之前炒好的鸡蛋，加入酱油和白糖，翻炒至青椒微微断生。"],["出锅装盘","翻炒均匀后即可出锅上菜。"]]},
  {"id":"other_pai-gu-ku-gua-tang","name":"排骨苦瓜汤","category":"汤","servings":1,"minutes":30,"totalMinutes":240,"waitMinutes":210,"difficulty":"中等","coverPath":"ai-generated/other_pai-gu-ku-gua-tang.jpg","sourcePath":"dishes/soup/排骨苦瓜汤/排骨苦瓜汤.md","calories":905,"tips":["可以使用其他带有鲜味的食材代替虾皮，如瑶柱","苦瓜瓤必须去除干净，否则汤头会过苦","一份分量约够4人食用","传统慢炖建议提前4小时准备"],"required":[["ribs","250g-500g","排骨"],["vibe-e88ba6e7939c","100g-200g","苦瓜"],["vibe-e899bee79aae","5g-15g","虾皮"],["vibe-e799bde883a1e6a492","0.1g-0.5g/250ml","白胡椒"]],"optional":[["ginger","5g-10g","生姜"]],"pantry":[["salt","0.3g-0.6g/250ml","盐"]],"steps":[["排骨预处理","排骨洗净，切到约 4cm ±2cm * 3 ± 2cm 的小块。"],["排骨焯水","炒锅倒入冷水 700ml 和排骨一起加热至煮沸，关火捞出排骨。"],["处理苦瓜","苦瓜中间切为两半，清除干净内部的种子和苦瓜瓤，切为 0.5 ± 0.3 cm 的苦瓜条，洗净。"],["烹饪（汤锅法或压力锅法）","汤锅法：倒入1100ml水和排骨，沸腾后下苦瓜和虾皮转小火炖120-240分钟；压力锅法：倒入1000ml水、排骨、虾皮和苦瓜，选择炖汤功能烹饪（约45分钟）。"],["调味出锅","出锅时加盐和白胡椒，推荐量为每 250ml 加入 0.3 到 0.6g 盐，0.1 到 0.5g 白胡椒。"]]},
  {"id":"other_pai-gu-shan-yao-yu-mi-tang","name":"排骨山药玉米汤","category":"汤","servings":1,"minutes":60,"difficulty":"简单","coverPath":"ai-generated/other_pai-gu-shan-yao-yu-mi-tang.jpg","sourcePath":"dishes/soup/排骨山药玉米汤/排骨山药玉米汤.md","calories":1054,"tips":["防氧化技巧：山药去皮后若不立即下锅，应浸泡在清水中，防止接触空气氧化变黑。","口感控制：若喜欢山药极度软糯，可与排骨同时下锅；若喜欢山药成块不散，可在排骨炖煮 20 分钟后再放入山药。","补水须知：炖煮过程中如发现水位低于食材，务必添加热水，避免加入冷水导致肉质纤维瞬间收缩变柴。"],"required":[["ribs","500g","排骨"],["yam","1根(大约300g)","山药"],["carrot","1根(大约150g)","胡萝卜"],["vibe-e78e89e7b1b3","1根(大约250g)","玉米"],["ginger","20g","生姜"],["scallion","15g","小葱"]],"optional":[],"pantry":[["wine","15ml","料酒"],["oil","10ml","食用油"],["water","1500ml-2000ml","饮用水"],["salt","6g-8g","食盐"]],"steps":[["食材预处理","将胡萝卜洗净去皮切滚刀块；玉米洗净剁成圆柱块；山药去皮切成长段。"],["排骨焯水","冷水下排骨，加入姜片、葱结和料酒。大火煮沸后等待3分钟，撇去浮沫，捞出用40℃温水洗净沥干。"],["翻炒排骨","热锅入油，放入姜片爆香，下排骨中火翻炒约1分钟至表面微焦。"],["炖煮过程","一次性加入饮用水，放入胡萝卜、玉米和山药。大火烧开后转小火，盖盖慢炖40分钟。"],["调味与出锅","加入食盐搅拌均匀，继续小火炖煮2分钟，关火撒上葱末即可。"]]},
  {"id":"other_pi-jiu-ya","name":"啤酒鸭","category":"荤菜","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_pi-jiu-ya.jpg","sourcePath":"dishes/meat_dish/啤酒鸭/啤酒鸭.md","calories":170,"tips":["啤酒的量一定要足够把所有鸭肉没过，啤酒最好选择清香型的。","不要额外加水，全程使用啤酒炖煮风味最浓郁。"],"required":[["vibe-e9b8ade88289","半只（约 1kg）","鸭肉"],["vibe-e595a4e98592","800ml","啤酒"],["vibe-e7949fe68abde985b1e6b2b9","10-15ml","生抽酱油"],["vibe-e88081e68abde985b1e6b2b9","5-10ml","老抽酱油"],["ginger","5 片","姜"],["garlic","12 瓣","蒜"],["chili","5 个","干辣椒"],["vibe-e4b881e9a699","4 颗","丁香"],["vibe-e9a699e58fb6","3 片","香叶"],["vibe-e8b186e793a3e985b1","20g","豆瓣酱"]],"optional":[],"pantry":[["rockSugar","10g","冰糖"],["wine","30ml","料酒"],["salt","8g","盐"],["vibe-e9b8a1e7b2be","5g","鸡精"],["starAnise","3 个","八角"]],"steps":[["鸭肉焯水预处理","把鸭子切成 3 cm 小块，鸭肉冷水下锅，加姜片、料酒，焯一遍水，盛出沥干水分，备用。"],["煸炒鸭肉","炒锅烧热，放入约 100ml 食用油，大火待油烧开，鸭肉入锅翻炒至上色。"],["炒制糖色与底酱","待鸭肉完全变色（肉眼可见泛白），将鸭肉拨到锅的一边，倒入豆瓣酱和糖，小火翻炒出香味和糖色。"],["加入香料调味","加入丁香、八角、香叶、干辣椒、生抽、老抽、蒜，翻炒出香味。"],["加入啤酒焖煮","倒入啤酒，没过鸭肉，加入盐、鸡精，然后中火将鸭子烧 30 分钟（牙口不好的话可以再多烧 5 分钟）。"],["出锅装盘","出锅盛盘，上桌食用。"]]},
  {"id":"other_pi-sa-bing-pi-de-zuo-fa","name":"披萨饼皮的做法","category":"主食","servings":1,"minutes":45,"totalMinutes":840,"waitMinutes":795,"difficulty":"中等","coverPath":"ai-generated/other_pi-sa-bing-pi-de-zuo-fa.jpg","sourcePath":"dishes/staple/披萨饼皮/披萨饼皮.md","calories":537,"tips":["一定要注意水的比例","烤箱品质层次不齐，第一次做注意观察火候对披萨的影响","一般不特别标注是低筋或高筋面粉，基本都是中筋面粉","容易出水的水果不能作为食材，比如西瓜、橘子等"],"required":[["flour","125g","中筋面粉"],["vibe-e6b0b4efbc88e6b8a9e6b0b4efbc89","87.5g","水（温水）"],["vibe-e5ae89e790aae5b9b2e985b5e6af8de7b289","1.25g","安琪干酵母粉"]],"optional":[],"pantry":[["vibe-e6a984e6a684e6b2b9","8.75g","橄榄油"],["salt","0.75g","食用盐"],["sugar","0.75g","白砂糖"]],"steps":[["化开酵母","用准备好的温水把酵母粉化开，稍微搅拌下就好，备用"],["混合干料","取准备好的面粉，依次添加盐、橄榄油、白砂糖"],["加水搅拌","准备混合水和面粉，边加水边搅拌直至水全部加完"],["揉匀面团","搅拌至看不到干粉为止"],["冷藏发酵","用差不多三倍大面团的容器装好，密封，冰箱冷藏（4 度） 等待 8~12 小时"],["检查状态","观察面团醒发完毕，差不多是原始大小大约两倍算醒发完毕"],["分块备用","取醒发好的面团，均匀分成四份（以示例总量计），分别用保鲜膜盖好，备用"],["准备案板","案板撒稍微多一点的干面粉，准备开始揉面"],["揉面至光滑","因为是比较湿的面团，所以粘上干面粉后才没那么粘手，不用揉太多次，面团表面稍微光滑一点就可以了"],["擀平饼皮","用手拉扯，或者擀面杖擀平，也不一定非得擀圆，只要厚度均匀，烤箱放得进去就好"],["铺设食材","铺好油纸，放上饼皮，依照个人口味，把准备好的食材放上去，撒上芝士碎"],["水果类烘烤","如果是水果披萨，烤箱上 180 度，下 220 度，烘烤 16 分钟即可"],["肉菜类烘烤","如果是肉蔬菜披萨，烤箱上 200 度，下 230 度，烘烤 18 分钟即可"],["装饰享用","挤上沙拉酱或者其他自己喜欢的酱即可享用"]]},
  {"id":"other_qi-feng-dan-gao-de-zuo-fa","name":"戚风蛋糕的做法","category":"甜品","servings":1,"minutes":30,"totalMinutes":120,"waitMinutes":90,"difficulty":"较难","coverPath":"ai-generated/other_qi-feng-dan-gao-de-zuo-fa.jpg","sourcePath":"dishes/dessert/戚风蛋糕/戚风蛋糕.md","calories":274,"tips":["油会严重阻碍蛋白打发，容器必须无油。","冷藏鸡蛋易分离，但恢复室温后的蛋清更易打发。","若蛋清特别硬，5个蛋的配方可加15ml水辅助打发。","空气炸锅操作：130℃预热，盖锡纸烤35分钟，撤锡纸150℃上色10-15分钟。","判断熟透：牙签插入中心拔出无湿润面糊。"],"required":[["egg","1个(约50g)","鸡蛋"],["milk","10g","牛奶"],["vibe-e4bd8ee7ad8be99da2e7b289","17g","低筋面粉"]],"optional":[["vibe-e69fa0e6aaace6b181e68896e799bde9868b","几滴","柠檬汁或白醋"]],"pantry":[["sugar","16g","白糖"],["oil","8g","食用油"]],"steps":[["蛋液分离","准备两个干燥容器。将蛋清与蛋黄分离，蛋清容器严禁有油，蛋黄容器不能有水。确保蛋清中不混入任何蛋黄。"],["制作乳化液","在空碗中加入全部食用油和牛奶，用打蛋器手动快速搅拌至完全融合，呈乳白色悬浊液状。"],["混合面粉与蛋黄","筛入低筋面粉，用刮刀以“Z字形”划拌至无干粉。加入全部蛋黄，继续以“Z字形”划拌至细腻顺滑。"],["打发蛋白","蛋清中加柠檬汁，分三次加入白糖。分别在粗气泡、细腻气泡、湿性发泡阶段加糖。最终打发至干性发泡（提起呈短小直立尖角）。"],["翻拌混合","取1/3蛋白霜加入蛋黄糊中翻拌，再将混合液倒回剩余蛋白霜中，采用类似炒菜的“翻拌”手法混合均匀。"],["烘烤阶段","蛋糕糊倒入模具震出大气泡。烤箱预热后放入下层。第一阶段：上管150℃/下管160℃烘烤总时间的3/5；第二阶段：上管160℃/下管170℃烘烤剩余2/5时间。"],["冷却与脱模","出炉后从高处震出热气，立刻倒扣在架子上冷却至少10分钟，待完全冷却后进行脱模。"]]},
  {"id":"other_qi-yi-guo-bo-cai-te-diao","name":"奇异果菠菜特调","category":"饮料","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/other_qi-yi-guo-bo-cai-te-diao.jpg","sourcePath":"dishes/drink/奇异果菠菜特调/奇异果菠菜特调.md","calories":184,"tips":["关于白砂糖的量：全糖为 12g，可根据个人情况在 0-12g 中调整","本品是仿照宜家的奇异果菠菜汁研制的，口感清爽","建议现做现喝，以免果汁氧化分层"],"required":[["vibe-e5a587e5bc82e69e9c","2个","奇异果"],["vibe-e88bb9e69e9c","1/2个","苹果"],["vibe-e88fa0e88f9ce58fb6","4叶","菠菜叶"]],"optional":[["sugar","12克","白砂糖"]],"pantry":[["water","700ml","饮用水"]],"steps":[["处理奇异果","将奇异果去皮切成两半，每半再分四份小块"],["处理苹果","将苹果去核切丁"],["菠菜去梗","将菠菜叶去梗，只留叶子部分"],["切碎菠菜","将菠菜叶切碎"],["放入容器","将所有处理好的果蔬一起倒入榨汁机搅拌杯"],["注入饮用水","注入 700ml 饮用水"],["调味","加入白砂糖"],["搅拌成汁","启动搅拌机，搅拌约 4 个 15 秒（每 15 秒停下看状态）"]]},
  {"id":"other_qian-long-bai-cai","name":"乾隆白菜","category":"素菜","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/other_qian-long-bai-cai.jpg","sourcePath":"dishes/vegetable_dish/乾隆白菜/乾隆白菜.md","calories":150,"tips":["白菜控水是关键，越干越好；湿菜叶挂不住麻酱，整道菜口味会被稀释。","调麻酱汁时必须先用醋'解'酱，再依次加入其他调料，切勿一次全部倒入。","陈醋优先选用镇江香醋，颜色与酸香均最为适宜；不建议使用米醋或白醋。","本配方为醋糖版，如希望口味更醇厚圆润，可将白糖的一半替换为蜂蜜。"],"required":[["vibe-e5a4a7e799bde88f9ce5aba9e58fb6","300g","大白菜嫩叶"],["vibe-e88a9de9babbe985b1","30g","芝麻酱"]],"optional":[["vibe-e7869fe799bde88a9de9babb","3g","熟白芝麻"]],"pantry":[["vibe-e99988e9868b","45ml","陈醋"],["sugar","5g","白糖"],["sesame","5ml","香油"],["salt","1g","食盐"]],"steps":[["手撕白菜","大白菜只取内部嫩叶（黄色部分），去除菜帮，用手撕成半个巴掌大的块。"],["清洗控水","将撕好的白菜叶冲洗干净，充分控干水分。"],["醋解芝麻酱","碗中加入30g芝麻酱，先加入45ml陈醋，沿同一方向搅拌，将麻酱慢慢稀释开。"],["调味酱汁","向麻酱汁中依次加入5g白糖、1g食盐和5ml香油，每加一种都需搅拌均匀。"],["抓拌白菜","将调好的麻酱汁均匀淋在白菜叶上，用手轻轻抓拌。"],["点缀与静置","撒上熟白芝麻装盘，可静置5分钟后食用。"]]},
  {"id":"other_qian-shi-la-chang-wa-wa-cai","name":"黔式腊肠娃娃菜","category":"荤菜","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/other_qian-shi-la-chang-wa-wa-cai.jpg","sourcePath":"dishes/meat_dish/黔式腊肠娃娃菜/黔式腊肠娃娃菜.md","calories":1030,"tips":["根据锅的大小，建议以水量没过食材为宜，宁多勿少","如果没有刀具，娃娃菜和腊肠不切也可以"],"required":[["vibe-e9bb94e5bc8fe8858ae882a0","200g","黔式腊肠"],["babyCabbage","300g","娃娃菜"]],"optional":[],"pantry":[["water","750ml","水"]],"steps":[["烧水","锅内放入 750ml 水，开火加热至沸腾"],["煮腊肠","放入腊肠，计时 13 分钟"],["煮娃娃菜","放入娃娃菜，计时 2 分钟"],["取出食材","关火，夹出腊肠及娃娃菜"],["切配装盘","娃娃菜切段、腊肠切片，装盘"]]},
  {"id":"other_qie-zi-rou-jian-bing","name":"茄子肉煎饼","category":"主食","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_qie-zi-rou-jian-bing.jpg","sourcePath":"dishes/staple/茄子肉煎饼/茄子肉煎饼.md","calories":904,"tips":["全程使用小火煎制，确保内里熟透且外皮不糊","清水仅用于调节粘稠度，没有固定比例，以面糊能挂住食材为准","煎的过程中食用油会被米粉吸收，需根据情况补油"],"required":[["riceNoodle","250g","米粉"],["vibe-e5b08fe9baa6e7b289","50g","小麦粉"],["egg","1个","鸡蛋"],["vibe-e785aee7869fe79a84e8858ae88289","100g","煮熟的腊肉"],["eggplant","1根(约10-15cm长)","茄子"]],"optional":[],"pantry":[["oil","10-30ml","食用油"],["salt","1-2g","食盐"]],"steps":[["食材预处理","将茄子去皮后切成片，将腊肉切成片，备用。"],["混合干粉","依次向盆中加入 250g 米粉、50g 面粉和 1 个鸡蛋。"],["调制面糊并挂糊","边用筷子搅拌，边加入清水调节粘稠度，使粉料混合成面糊。当面糊能够附着在茄片、肉片上而不掉落时停止加水，而后将所有茄片和肉片放入面糊中充分包裹。"],["热锅起油","平底锅加入食用油 10-30ml，开小火预热。"],["煎制煎饼","用筷子或勺子把裹了面糊的茄片、肉片放入锅中，先煎至两面金黄，再煎 3-6 分钟。"],["调味装盘","撒入 1-2g 食盐，翻炒均匀，使盐分分布在表面，起锅装盘。"]]},
  {"id":"other_qin-cai-ban-cha-shu-gu","name":"芹菜拌茶树菇","category":"素菜","servings":1,"minutes":30,"difficulty":"简单","coverPath":"ai-generated/other_qin-cai-ban-cha-shu-gu.jpg","sourcePath":"dishes/vegetable_dish/芹菜拌茶树菇/芹菜拌茶树菇.md","calories":127,"tips":["焯水时的水位需要没过芹菜","芹菜叶太老太硬的话可以不要","如果没有芹菜苗，山芹也是不错的替代选择"],"required":[["vibe-e997bde6989fe88cb6e6a091e88f87","1瓶","闽星茶树菇"],["celery","250-300g","芹菜"],["vibe-e591b3e69e81e9b29c","3ml","味极鲜"]],"optional":[],"pantry":[["sesame","5ml","香油"],["oysterSauce","7ml","蚝油"],["salt","2g","食用盐"]],"steps":[["烧水备用","（如果是芹菜苗这一步略过）用热水壶烧一壶热水,备用"],["清洗食材","新鲜的芹菜苗或者芹菜摘去黄叶清洗,备用"],["处理芹菜（非芹菜苗）","（如果是芹菜苗这一步略过）将芹菜摘去叶子单独放一个盆中,将芹菜茎用刀划成 2-3 毫米宽的芹菜条备用"],["切段","芹菜苗或芹菜条切成 4cm 的芹菜段,备用"],["热锅烧水","（如果是芹菜苗这一步略过）起锅开火,将热水壶的开水倒入锅中待水起泡沸腾"],["焯水过凉","（如果是芹菜苗这一步略过）将切好的芹菜条放入锅中焯水,大约 20 秒放入芹菜叶,5 秒后关火全部捞出过凉水,备用"],["调味搅拌","将盆中焯好的芹菜或者芹菜苗撒上准备好的食盐,香油,耗油和味极鲜搅拌均匀"],["加入茶树菇","将茶树菇倒入盆中搅拌均匀"],["装盘","将搅拌好的菜品装入盘中"],["享用","开吃"]]},
  {"id":"other_qing-jiao-niang","name":"青椒酿","category":"素菜","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_qing-jiao-niang.jpg","sourcePath":"dishes/meat_dish/青椒酿/青椒酿.md","calories":1403,"tips":["青椒选笔直的比弯的好塞馅料，肉厚的尖椒比薄皮的口感更好","馅料朝一个方向搅拌才能上劲，口感更 Q 弹","青椒内壁涂干淀粉是防粘的关键，煎时肉馅不会脱落","煎至虎皮色是风味来源，不要跳过","酱汁可依个人口味调整，喜欢更辣的可加桂林辣椒酱","虾滑和猪肉馅可以混合使用，比例随意，虾肉增加鲜甜，猪肉提供油脂香","汤汁拌饭极佳，不要收太干"],"required":[["vibe-e99d92e6a492","8个(约400g)","青椒"],["mince","250g","猪肉馅"],["scallion","2根(约30g)","葱"],["ginger","1小块(约10g)","生姜"]],"optional":[["starch","10g","淀粉"],["garlic","4瓣(约15g)","大蒜"],["oysterSauce","10ml","蚝油"],["wine","10ml","料酒"],["egg","1个","鸡蛋"],["whitePepper","2g","白胡椒粉"],["sugar","5g","白糖"]],"pantry":[["soy","30ml","生抽"],["darkSoy","5ml","老抽"],["salt","3g","食盐"],["oil","30ml","食用油"]],"steps":[["准备馅料","猪肉洗净剁成肉馅，姜切末，葱切葱花。"],["调味肉馅","肉馅中加入姜末、葱花、生抽 15ml、老抽 5ml、食盐 3g，以及可选的料酒、蚝油、鸡蛋、淀粉、白胡椒粉和白糖。"],["搅拌上劲","朝一个方向搅拌肉馅至粘稠上劲，腌制 10 分钟。"],["处理青椒","青椒洗净去蒂，用筷子小心挖去内部的籽和白筋，保持完整不破。"],["内壁挂粉","在青椒内壁撒入约 5g 干淀粉，摇晃均匀。"],["酿入肉馅","将肉馅塞入青椒中，尽量填满但不要太紧以防撑破。"],["调酱汁","碗中加入生抽 15ml、老抽 5ml、清水 100ml，可选加入淀粉 5g，搅拌均匀。"],["煎制虎皮","热锅倒油，油温五六成热时放入青椒（肉面朝下先煎），中小火慢煎至各面呈虎皮色，盛出。"],["焖煮入味","锅留底油爆香蒜末，倒入酱汁烧开，放入青椒盖盖中小火焖煮 5-8 分钟。"],["大火收汁","开盖大火收汁至汤汁油亮包裹青椒，即可出锅。"]]},
  {"id":"other_qing-jiao-tu-dou-chao-rou","name":"青椒土豆炒肉","category":"荤菜","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_qing-jiao-tu-dou-chao-rou.jpg","sourcePath":"dishes/meat_dish/青椒土豆炒肉/青椒土豆炒肉.md","calories":1288,"tips":[],"required":[["vibe-e99d92e6a492","2个(约200g)","青椒"],["potato","2个(约300g)","土豆"],["vibe-e78caae88289efbc88e4ba94e88ab1e88289efbc89","200g","猪肉（五花肉）"],["scallion","1根(约10g)","葱"],["ginger","1块(约5g)","姜"],["garlic","3瓣(约12g)","蒜"],["vibe-e59c9fe8b186e6b780e7b289","5g","土豆淀粉"]],"optional":[],"pantry":[["salt","7g","盐"],["vibe-e985b1e6b2b9","6-10ml","酱油"],["oil","10-15ml","食用油"],["water","15g","水"]],"steps":[["食材预处理","青椒去除根蒂切小块，土豆去皮切 2mm 薄片，猪肉切 4mm 薄片，葱横纵切 3mm 小段，姜蒜去皮拍散剁碎末；土豆淀粉加入约 15g 水搅拌均匀至水淀粉。"],["煸炒猪肉","起锅烧油，加热至 7 成热放入猪肉片，缓缓翻滚炒至去肉红色，加入约 3ml 酱油，翻炒肉片均匀上色，放入约 2g 盐。"],["炒制土豆","转 5 成油温，加入葱姜蒜炒 5 秒，然后加入土豆片，转 7 成油温均匀翻炒，加入加入约 5ml 酱油和 2g 盐，炒至土豆断生，表面轻微焦黄。"],["加入青椒与勾芡","转 8 成油温加入青椒，大火煸炒出锅气（有白烟冒出），反复均匀翻炒 1 分钟上色，最后在锅周围倒入水淀粉转 4 成火勾芡。"],["收汁盛盘","在外观呈粘稠状态后关火，盛盘。"]]},
  {"id":"other_qing-zheng-gui-yu","name":"清蒸鳜鱼","category":"水产","servings":2,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_qing-zheng-gui-yu.jpg","sourcePath":"dishes/meat_dish/清蒸鳜鱼/清蒸鳜鱼.md","calories":359,"tips":["鳜鱼背部鱼鳍容易伤人，处理时候需要注意，最好用剪刀剪掉","蒸制时间需要根据鱼的大小调整，蒸鱼的关键在于水多汽大火足"],"required":[["vibe-e9b39ce9b1bc","500g","鳜鱼"],["vibe-e5a4a7e891b1","1 节","大葱"],["scallion","2 根","小葱"],["vibe-e7baa2e8bea3e6a492","1 颗","红辣椒"],["ginger","3 片","姜片"]],"optional":[["vibe-e78caae6b2b9","适量","猪油"]],"pantry":[["soy","30g","生抽"],["oil","20ml","食用油"]],"steps":[["食材预处理","鳜鱼去鳃内脏及鳞，刮除表面粘液；鱼身打花刀，放姜片和少许猪油；盘底垫筷子支撑鱼身；将大葱、小葱、红椒切丝泡水备用。"],["大火蒸鱼","蒸锅加足量水，水开后放入鳜鱼，盖盖大火蒸制 8 - 10 分钟。"],["泼油调味","另起锅将食用油烧至冒烟；倒掉蒸鱼盘中的多余水分，去除姜片，码上葱丝红椒丝，将热油均匀浇在丝上，最后倒入生抽。"]]},
  {"id":"other_qing-zheng-lu-yu","name":"清蒸鲈鱼","category":"水产","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_qing-zheng-lu-yu.jpg","sourcePath":"dishes/aquatic/清蒸鲈鱼/清蒸鲈鱼.md","calories":385,"tips":["关键点在于火候，大火蒸鱼一般 10 分钟内较佳，太久会影响口感。","切记蒸鱼需要用筷子隔开装鱼的盘子，防止鱼肉沾染腥水并保证受热均匀。","改刀让鱼立起来不仅美观，还能提高烹饪效率。"],"required":[["seaBass","一条","鲈鱼"],["scallion","三根","香葱"],["ginger","一块","姜"]],"optional":[],"pantry":[["oil","10-15ml","食用油"],["vibe-e892b8e9b1bce8b189e6b2b9","10-15ml","蒸鱼豉油"],["wine","10-15ml","料酒"],["salt","5-10g","食用盐"]],"steps":[["处理辅料","姜切片切丝、香葱的葱白切段，葱绿切丝，切丝后放入冷水浸泡备用。"],["腌制鲈鱼","鲈鱼处理好后洗净，用厨房纸擦干，两面分别划几刀，用盐洗掉鱼身的粘液，并用 10g 盐抹遍鱼身的内外，腌制 10 分钟以上。"],["改刀摆盘","采用特殊的改刀方法让鲈鱼立起来蒸，这样可以均匀受热，吃时无需翻面。"],["准备入蒸锅","鱼肚内塞上姜和葱白，鱼身也撒上姜和葱白（用量的一半）。蒸鱼的碟子用筷子将鱼跟碟子隔开。"],["大火蒸制","水烧热感觉到水温后放入鱼，大火清蒸 10 分钟。"],["更换盘子","蒸好的鱼，用干净的盘子装起来并去除身上的姜葱。"],["调味与淋油","鱼身浇上 15ml 蒸鱼豉油。重新撒上新鲜姜葱丝。锅内烧热 10ml 食用油，淋至鱼身即可。"]]},
  {"id":"other_ri-shi-fei-niu-jing-fan","name":"日式肥牛丼饭","category":"主食","servings":2,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_ri-shi-fei-niu-jing-fan.jpg","sourcePath":"dishes/staple/日式肥牛丼饭/日式肥牛丼饭.md","calories":774,"tips":["如果用的是比较不错的牛肉，可以选择不焯水，能够更加保留牛肉的风味。","因为加入了味淋所以不会很腥，无需担心牛肉不熟，加热 10 分钟肯定熟了。","如果有条件，选择加入 15g 清酒可以提升香气。","冷藏后加热：微波炉单人份高火 2-3 分钟；锅加热需额外加 50ml 水并不断翻动。","咸度调整：建议尝一口汤汁，若咸度低于预期，每次加入 1g 酱油微调。"],"required":[["onion","1个","洋葱"],["vibe-e882a5e7899b","250g","肥牛"],["scallion","1~2根","葱"],["vibe-e799bde88a9de9babb","5g","白芝麻"],["vibe-e591b3e6b78b","40g","味淋"],["vibe-e88097e6b2b9","20g","耗油"]],"optional":[["darkSoy","5g","老抽"],["vibe-e6b8a9e6b389e89b8b","1-2个","温泉蛋"],["vibe-e587bae6b181","250g","出汁"],["vibe-e6b885e98592","15g","清酒"]],"pantry":[["vibe-e985b1e6b2b9","30g","酱油"],["sugar","5g","糖"]],"steps":[["处理洋葱","洋葱剥去外层去芯，切成月牙状"],["处理葱花","葱洗净切成 0.5cm 的小段"],["焙烤芝麻","热锅直接放入白芝麻，前后晃动锅体使芝麻均匀受热至略呈金黄色"],["肥牛焯水","肥牛焯水 1 分钟后捞出"],["调制酱汁","将味淋（或料酒）、酱油、耗油、糖、老抽在碗中搅拌混合成调料"],["翻炒洋葱","热油锅放入洋葱，快速翻炒至洋葱变透明状"],["加水炖煮","关小火，加入 250g 水（或出汁），开回大火加热等待 3 分钟"],["混合烹煮","加入牛肉和调料汁，不断翻动所有食材 10 分钟，防止食材粘锅"],["盛装成品","盛装肥牛丼至米饭上，淋上汁水，撒上葱花和白芝麻"]]},
  {"id":"other_ri-shi-ga-li-fan","name":"日式咖喱饭","category":"主食","servings":6,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_ri-shi-ga-li-fan.jpg","sourcePath":"dishes/staple/日式咖喱饭/日式咖喱饭.md","calories":730,"tips":["做好的咖喱在冰箱冷藏后风味更佳。","2-5 到 2-6 之间需注意观察水位，保持水没过食材。","炖煮期间可以同步准备点缀用的水煮花椰菜或煎蛋。","冷藏后再加热时，若用锅加热需额外加50ml水并保持搅拌。"],"required":[["vibe-e59296e596b1e59d97","半盒(115g)","咖喱块"],["potato","2个","土豆"],["carrot","1根","胡萝卜"],["onion","2个","洋葱"],["vibe-e88289efbc88e78caa2fe9b8a12fe7899be88289efbc89","2斤","肉（猪/鸡/牛肉）"],["garlic","2~3瓣","蒜头"]],"optional":[["vibe-e88ab1e6a4b0e88f9c","适量","花椰菜"],["vibe-e59fb9e6a0b9","适量","培根"],["egg","1-2个","鸡蛋"]],"pantry":[],"steps":[["食材预处理","胡萝卜去头尾剥皮滚刀切；洋葱剥去外层去芯切月牙状；土豆去皮切大块；肉切块；蒜拍平切碎。"],["处理咖喱块","将咖喱块切碎，增加接触面积以加速溶解。"],["炒制肉与蒜","热油锅放入蒜和肉，快速翻炒至肉表面变白。"],["翻炒蔬菜","依次加入胡萝卜、洋葱翻炒至洋葱变透明，最后加入土豆翻炒至变软（可用筷子确认）。"],["加水炖煮","加水没过所有食材，沸腾后等待15分钟。"],["融化咖喱","关火，加入切碎的咖喱并充分搅拌至完全融化。"],["最后收汁","重新开火，缓慢搅拌10分钟，直到外观呈粘稠状态后关火。"]]},
  {"id":"other_sha-tang-ye-zi-bing-sha","name":"砂糖椰子冰沙","category":"饮料","servings":1,"minutes":10,"totalMinutes":605,"waitMinutes":595,"difficulty":"简单","coverPath":"ai-generated/other_sha-tang-ye-zi-bing-sha.jpg","sourcePath":"dishes/drink/砂糖椰子冰沙/砂糖椰子冰沙.md","calories":231,"tips":["瓶装椰汁可以提前冰冻，但是不宜超过 7 天，否则有变质风险。","300g在零下18度制成的冰沙在室温下通常可维持30分钟。"],"required":[["vibe-e793b6e8a385e6a4b0e5ad90e6b181","500ml","瓶装椰子汁"],["vibe-e59296e595a1e8b083e7b396","10g","咖啡调糖"]],"optional":[["vibe-e59d9ae69e9ce7a28e","适量","坚果碎"]],"pantry":[],"steps":[["倒出多余椰汁","500ml 瓶装椰汁倒掉 200ml，立刻拧紧瓶盖。"],["冷冻处理","将这瓶椰汁放入冰箱冷冻区并冷冻 10 小时以上。"],["抽打成沙","将这瓶椰汁取出，确认瓶中椰汁已彻底冻结后，在墙角、椅背、桌角等坚硬表面上用力抽打。"],["倒出冰沙","当抽打到冻结椰汁变成冰沙状态，打开瓶盖倒出冰沙。"],["调味装饰","在冰沙表面均匀撒上咖啡调糖或坚果碎。"],["完成","制作完成，立即享用。"]]},
  {"id":"other_shan-xi-you-po-mian","name":"陕西油泼面","category":"主食","servings":1,"minutes":30,"difficulty":"简单","coverPath":"ai-generated/other_shan-xi-you-po-mian.jpg","sourcePath":"dishes/staple/陕西油泼面/陕西油泼面.md","calories":771,"tips":["辣椒面的选择很关键，建议使用陕西秦椒面，香而不辣。","泼油的油温是成败关键，油温过低辣椒不香，油温过高容易糊。","喜欢吃肉的可以加入肉末做成肉臊子油泼面。","传统陕西油泼面讲究“一青二白三红四绿”，即面条、蒜末、辣椒、葱花的颜色搭配。"],"required":[["vibe-e9b29ce99da2e69da1","3-4根","鲜面条"],["scallion","1根","葱"],["garlic","3瓣","大蒜"],["vibe-e5b9b2e8bea3e6a492e99da2","15g","干辣椒面"],["bokchoy","50g","青菜"]],"optional":[["beanSprout","50g","豆芽"]],"pantry":[["salt","2g","盐"],["oil","50ml","食用油"],["soy","10ml","生抽"],["vibe-e9a699e9868b","5ml","香醋"]],"steps":[["拉制扯面","用擀面杖（或手）将面片上下两边轻压，两手拽住左右两端，轻轻拉开。"],["切配辅料","将葱切成葱花，蒜切成蒜末备用。"],["清洗蔬菜","将青菜和豆芽（如使用）洗净备用。"],["烧水准备","锅中加入足量清水，大火烧开后加入 1g 盐。"],["煮制面条","放入面条，用筷子轻轻搅动防止粘连，煮至面条浮起后再煮 1-2 分钟。"],["蔬菜焯水","在煮面的最后 1 分钟，放入青菜和豆芽焯水。"],["捞出调味","将煮好的面条和蔬菜捞出，沥干水分放入碗中。依次加入生抽、香醋、葱花、蒜末和干辣椒面。"],["炸香底油","炒锅倒入食用油，放入花椒、八角等香料小火炸香后捞出。"],["热油泼面","待油温升至七成热（微微冒烟）时，迅速均匀地泼在干辣椒面上。"],["搅拌食用","用筷子将所有调料和面条充分拌匀即可。"]]},
  {"id":"other_shang-tang-wa-wa-cai","name":"上汤娃娃菜","category":"素菜","servings":2,"minutes":20,"difficulty":"中等","coverPath":"ai-generated/other_shang-tang-wa-wa-cai.jpg","sourcePath":"dishes/vegetable_dish/上汤娃娃菜/上汤娃娃菜.md","calories":158,"tips":["拍照时注意光线，虽然味道好，但精美的摆盘能增加食欲。"],"required":[["babyCabbage","700g","娃娃菜"],["vibe-e58d88e9a490e88289","适量","午餐肉"],["scallion","3g","葱"],["garlic","10g","蒜"],["ginger","10g","姜"]],"optional":[["enoki","10g","金针菇"],["vibe-e79aaee89b8b","1个","皮蛋"]],"pantry":[["salt","适量","盐"],["sugar","适量","糖"],["oysterSauce","适量","蚝油"],["vibe-e591b3e7b2be","适量","味精"],["starch","适量","淀粉"]],"steps":[["处理娃娃菜","娃娃菜洗净, 竖着切开切成段。"],["切配料","葱 3g 切小段。蒜 10g 切片。姜 10g 切小片。"],["准备辅料丁","皮蛋切成丁, 火腿肠或者午餐肉切成丁（1cm 大小的丁）"],["处理金针菇","金针菇洗净撕开"],["焯水","烧热水娃娃菜放进去十秒钟出一下水捞出。"],["润锅","热锅凉油, 加热锅倒入油过一遍就倒出来, 重新倒入一点油。"],["爆香底料","调至小火加入葱姜蒜，煎炒出香味即可。"],["加入主料及水","加入 300g 清水（水量没过娃娃菜即可）, 放入娃娃菜, 金针菇, 午餐肉"],["调味","加入调味料蚝油、糖、盐、味精烧开。"],["焖煮装盘","煮 3 分钟, 煮开后开始装盘, 盛出娃娃菜后皮蛋放在上面把汤汁浇上去就可以了"]]},
  {"id":"other_shi-zhi-zheng-bai-shan","name":"豉汁蒸白鱔","category":"水产","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_shi-zhi-zheng-bai-shan.jpg","sourcePath":"dishes/meat_dish/豉汁蒸白鱔/豉汁蒸白鱔.md","calories":472,"tips":["确保白鱔新鲜，购买时选择活鱼，肉质更鲜嫩。","鱼贩切段时指定约5厘米长度为宜，方便蒸制。","蒸制时间不宜过长，以免肉质变韧。","可加入辣椒或XO酱增加辣味层次。","腌制时加入米酒可使口感更软嫩。"],"required":[["vibe-e799bde9b194","250g","白鱔"],["vibe-e8b186e8b189","1 汤匙","豆豉"],["garlic","2 瓣","蒜头"],["ginger","3 片","姜"],["scallion","1 根","葱"],["vibe-e9babbe6b2b9","0.5 茶匙","麻油"]],"optional":[["starch","1 茶匙","生粉"],["vibe-e7baa2e6a492","10g","红椒"]],"pantry":[["soy","1.5 汤匙","生抽"],["darkSoy","0.5 茶匙","老抽"],["sugar","0.5 茶匙","糖"],["water","1 汤匙","水"]],"steps":[["检查与清洗白鱔","检查鱼贩处理过的白鱔，冲洗干净。可用3g盐和1茶匙生粉轻搓白鱔段，腌制5分钟后冲洗干净。"],["准备酱汁","在小碗中混合豆豉、蒜末、生抽、老抽、糖、麻油和水，搅拌均匀。"],["摆盘","将白鱔段平铺在耐热盘中，尽量不重叠。撒上姜丝，均匀淋上豉汁。"],["蒸制","烧开500ml水，放入盘子盖盖，中大火蒸约8-10分钟至熟透。"],["装饰与完成","取出白鱔，撒上葱丝和红椒丝，可淋上热麻油。"]]},
  {"id":"other_shou-rou-tu-dou-pian","name":"瘦肉土豆片","category":"荤菜","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_shou-rou-tu-dou-pian.jpg","sourcePath":"dishes/meat_dish/瘦肉土豆片/瘦肉土豆片.md","calories":585,"tips":["土豆片焯水注意不宜太久，防止土豆片变软烂影响口感","腌制瘦肉要搅拌均匀，确保每一片肉都裹上淀粉和调料"],"required":[["vibe-e7baafe798a6e88289","200g","纯瘦肉"],["potato","200g","土豆"],["vibe-e8929ce88b97","2 根（约 20 g）","蒜苗"]],"optional":[],"pantry":[["starch","5g","生粉"],["soy","10g","生抽"],["darkSoy","3g","老抽"],["salt","2g","食用盐"],["oil","10ml - 15ml","食用油"]],"steps":[["处理土豆","土豆去皮、对半切开，再切成约 2mm 的薄片，备用"],["处理蒜苗","蒜苗洗净，切成约 1cm 的段，备用"],["腌制瘦肉","瘦肉洗净切成约 2mm 的薄片，放入碗中，加入 5g 生粉、5g 生抽、3g 老抽腌制十分钟，备用"],["土豆焯水","瘦肉腌制时，烧一锅开水，将土豆片放入锅中，焯水，约 5 分钟"],["热油","热锅，锅内放入 10ml - 15ml 食用油。等待 10 秒让油温升高"],["炒肉与蒜苗","放入瘦肉，翻炒至变色，倒入蒜苗一起炒，蒜苗炒约 20 秒"],["加入土豆调味","放入土豆，保持翻炒，加入 2g 食用盐、5g 生抽"],["出锅","炒约 3 分钟，盛盘"]]},
  {"id":"other_shou-si-bao-cai","name":"手撕包菜","category":"素菜","servings":1,"minutes":20,"difficulty":"中等","coverPath":"ai-generated/other_shou-si-bao-cai.jpg","sourcePath":"dishes/vegetable_dish/手撕包菜/手撕包菜.md","calories":1663,"tips":["步骤五中，翻炒时间需要根据实际情况做调整，一般是炒到包菜七分熟后即可。七分熟是指包菜已经出水质感变软","步骤五中，加盐的作用是锁住包菜水分的同时，给包菜上一点味道","最后一个步骤中，翻炒时间根据实际情况和个人口感做灵活调整"],"required":[["vibe-e58c85e88f9c","1 颗","包菜"],["porkBelly","200 g","五花肉"],["vibe-e5b08fe7b1b3e8bea3","2 根","小米辣"],["ginger","2 片","姜"],["garlic","2 粒","蒜头"],["vibe-e8929ce88b97","0.5 根","蒜苗"]],"optional":[],"pantry":[["oil","60 ml","食用油"],["wine","5 ml","料酒"],["soy","5 ml","生抽"],["vibe-e9a699e9868b","5 ml","香醋"],["vibe-e9b8a1e7b2be","2 g","鸡精"],["salt","5 g","盐"]],"steps":[["处理包菜","包菜对半切开，去掉中间白色硬芯部分。"],["手撕并清洗","将包菜手撕成大小适中的块，碗中放入 2 g 盐，清洗包菜并沥干备用。"],["准备辅料","姜片、蒜头切片，小米辣切圈、蒜苗切段处理后备用。"],["切五花肉","五花肉切成薄片，用清水清洗后沥干备用。"],["预炒包菜","锅中加入 30 ml 食用油，倒入包菜翻炒，大火翻炒 1 分钟后，加入 3 g 盐，继续翻炒 2 分钟后取出备用。"],["煸炒五花肉","锅中加入剩余 30 ml 食用油，倒入五花肉，大火翻炒 1 分钟。"],["炒香辅料","倒入姜片、蒜、辣椒等材料，翻炒 1 分钟。"],["混合调味出锅","倒入预炒好的包菜翻炒后，加入香醋、料酒、鸡精、生抽，大火继续翻炒，2 分钟后出锅。"]]},
  {"id":"other_shui-zhu-niu-rou","name":"水煮牛肉","category":"荤菜","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/other_shui-zhu-niu-rou.jpg","sourcePath":"dishes/meat_dish/水煮牛肉/水煮牛肉.md","calories":431,"tips":["注意火候，牛肉切勿煮太久以保持嫩滑","泼油时注意安全，避免油溅出伤人","牛肉切片尽量厚薄均匀","豆瓣酱已有盐分，一般无需额外加盐"],"required":[["vibe-e7899be88289","300g","牛肉"],["beanSprout","100g","豆芽"],["egg","1个","鸡蛋"],["cilantro","5根","香菜"],["vibe-e8b186e793a3e985b1","10g","豆瓣酱"],["vibe-e5b9b2e8bea3e6a492e7b289","5g","干辣椒粉"],["ginger","20g","姜"],["garlic","3瓣","蒜"],["vibe-e7baa2e8bea3e6a492","1根","红辣椒"]],"optional":[],"pantry":[["wine","10ml","料酒"],["starch","15g","淀粉"],["oysterSauce","8g","蚝油"]],"steps":[["处理牛肉","牛肉洗干净切片。"],["腌制牛肉","加入 15g 姜丝，1 个鸡蛋，15g 淀粉，8g 蚝油，10ml 料酒搅拌均匀，腌制 15 分钟。"],["准备配菜","香菜洗干净切好。"],["炒制底料","锅里倒油，加入豆瓣酱，5g 姜丝，蒜片。"],["煮红汤","倒入开水，煮成红汤。"],["焯烫豆芽","豆芽洗干净去掉尾须，放进开水里焯熟。"],["装碗垫底","将豆芽铺入碗底。"],["煮牛肉","将牛肉片一片一片的放进红汤中，煮熟以后捞出。"],["铺放牛肉","将牛肉铺在豆芽上，撒上香菜梗。"],["摆放辅料","撒上香菜叶，辣椒粉，辣椒圈。"],["泼油激香","另起锅烧热油，将热油淋在菜上面，就完成了。"]]},
  {"id":"other_su-dong-tang-yuan","name":"速冻汤圆","category":"早餐","servings":1,"minutes":6,"difficulty":"简单","coverPath":"ai-generated/other_su-dong-tang-yuan.jpg","sourcePath":"dishes/semi-finished/速冻汤圆/速冻汤圆.md","calories":568,"tips":["注意先加汤圆再加热水，不要颠倒，不然汤圆倒入热水可能会溅出烫伤。以及无法控制水面高度可能溢出。","假如微波炉里碗太烫无法取出，可以用毛巾，或者某些微波炉可以连托盘一起取出。"],"required":[["vibe-e9809fe586bbe6b1a4e59c86","11个","速冻汤圆"]],"optional":[],"pantry":[["water","适量（以浸没汤圆为准）","开水"]],"steps":[["准备汤圆","取出速冻汤圆，放入碗中。"],["加入热水","倒入开水，直至浸没汤圆。"],["微波加热","放入微波炉，调至高火加热 4 分钟。"],["检查与调整","假如汤圆均已吸水膨胀，则已熟。如果没熟，再加热 1 分钟。"]]},
  {"id":"other_su-ge-lan-dan-de-zuo-fa","name":"苏格兰蛋的做法","category":"荤菜","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_su-ge-lan-dan-de-zuo-fa.jpg","sourcePath":"dishes/breakfast/苏格兰蛋/苏格兰蛋.md","calories":599,"tips":["芝士片、培根片、手抓饼直接淘宝购买即可","手抓饼的用量需根据鸡蛋的大小灵活调整"],"required":[["egg","50g（约 1 颗）","鸡蛋"],["vibe-e6898be68a93e9a5bc","1-2 份","手抓饼"],["vibe-e88a9de5a3abe78987","1-2 片","芝士片"],["vibe-e59fb9e6a0b9e78987","1-2 片","培根片"]],"optional":[],"pantry":[],"steps":[["煮糖心蛋","用冷水下锅水开 3 分钟后捞出"],["冷却去壳","鸡蛋捞出，放入冰水中剥壳更快速也更完整"],["包裹芝士","用芝士片包裹鸡蛋"],["包裹培根","培根片包裹鸡蛋"],["手抓饼塑形","手抓饼两端切除以矩形包裹鸡蛋"],["油炸处理（可选）","油温 6 成下锅炸制金黄即可"],["空气炸锅处理（可选）","空气炸锅 160 度 15 分钟"],["出锅享用","切开即可食用"]]},
  {"id":"other_suan-mei-tang","name":"酸梅汤","category":"饮料","servings":1,"minutes":25,"totalMinutes":360,"waitMinutes":335,"difficulty":"简单","coverPath":"ai-generated/other_suan-mei-tang.jpg","sourcePath":"dishes/drink/酸梅汤/酸梅汤.md","calories":359,"tips":["放入冰箱冷藏后再饮用效果更佳","所有用量可以根据个人口味等比例增加或减小","建议提前 6 小时开始制作"],"required":[["vibe-e4b98ce69ea3","25g","乌枣"],["vibe-e4b98ce6a285","25g","乌梅"],["vibe-e5b1b1e6a582e78987efbc88e7949fefbc89","30g","山楂片（生）"],["vibe-e9bb84e586b0e7b396","100g","黄冰糖"],["vibe-e79498e88d89","2g","甘草"],["vibe-e99988e79aae","4g","陈皮"],["vibe-e7baa2e8b186e894bb","1g","红豆蔻"],["vibe-e5b9b2e6a182e88ab1","3g","干桂花"]],"optional":[],"pantry":[["water","2000ml","水"]],"steps":[["冲洗与浸泡","冲洗材料（干桂花和冰糖除外），用 1.5 升水常温浸泡两小时以上。"],["头煎熬煮","开中大火煮沸，盖盖，转小火煮 40 分钟，此为头煎。"],["融化冰糖","将冰糖放入盆内，再将沥好用材的头汤趁热倒入，搅拌至冰糖融化。"],["二煎熬煮","药材重新装回锅内再加入 600 毫升的水，开大火煮沸，盖盖，转中火，再煮 20 分钟为二煎。"],["混合与冷藏","将二煎和冰糖水趁热混合。在成品 60-70℃时加入干桂花（不要超过 80℃），加盖晾凉后再放入冰箱冷藏 3 小时以上。"],["过滤饮用","饮用时记得将干桂花沥出。如饮茶般细啜，感受冰凉酸甜的滋味。"]]},
  {"id":"other_suan-nai-yi-shi-nai-dong","name":"酸奶意式奶冻","category":"甜品","servings":1,"minutes":20,"totalMinutes":300,"waitMinutes":280,"difficulty":"中等","coverPath":"ai-generated/other_suan-nai-yi-shi-nai-dong.jpg","sourcePath":"dishes/dessert/酸奶意式奶冻/酸奶意式奶冻.md","calories":1034,"tips":["传统版本的意式奶冻只用淡奶油，且糖量更大，比较甜腻。此版本做了改良，吃起来负担更小。"],"required":[["vibe-e6b7a1e5a5b6e6b2b9","200g","淡奶油"],["vibe-e58e9fe591b3e985b8e5a5b6","250g","原味酸奶"],["vibe-e59089e588a9e4b881e78987","6g","吉利丁片"]],"optional":[],"pantry":[["sugar","40g","糖"]],"steps":[["泡发吉利丁","吉利丁片剪成小片，泡入冷水中"],["加热奶液","淡奶油和糖放入锅中，加热至 60 度"],["溶解吉利丁","关火，吉利丁从水中取出，控干水份，加入热淡奶油中，搅拌均匀"],["混合酸奶","淡奶油降温至 40 度，加入原味酸奶，搅拌均匀"],["过筛处理","将上述步骤得到的混合物过两遍筛网"],["冷藏定型","分装入合适的容器，放入冰箱冷藏 4 小时以上"]]},
  {"id":"other_suan-rong-kong-xin-cai","name":"蒜蓉空心菜","category":"素菜","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/other_suan-rong-kong-xin-cai.jpg","sourcePath":"dishes/vegetable_dish/蒜蓉空心菜/蒜蓉空心菜.md","calories":440,"tips":["空心菜尽量选择新鲜，鲜嫩的，否则炒出来口感可能会比较老","实际放入空心菜的量可以根据锅的大小决定，建议不超过一个锅，否则太多的话容易掉出灶台","炒空心菜时一定要开大火，这样空心菜才能快速变软的同时保持脆嫩的口感，大火也有利于炒出生抽的香味。"],"required":[["vibe-e7a9bae5bf83e88f9c","250g","空心菜"],["garlic","半个","大蒜"]],"optional":[],"pantry":[["oil","45ml","食用油"],["salt","2g","盐"],["sugar","3g","白糖"],["soy","8ml","生抽"]],"steps":[["食材预处理","空心菜洗净，去掉烂叶或者老梗，均匀切成 2 段或者 3 段（防止过长不好炒）"],["热锅凉油","锅里先倒少量油，烧至微微冒烟，此时拿起锅将国内的热油向四周浸润，让油均匀覆盖锅底，然后再倒入剩余的油"],["煸香蒜末","放入蒜末，小火炒 10 到 15 秒煸香"],["大火速炒","尽快均匀地放入空心菜，开大火，左手拿铲子，右手拿筷子，配合将空心菜不停翻动，直至软化变绿。"],["调味翻炒","使用铲子快速翻炒已软化的空心菜 15 - 20 秒，使之受热更均匀，撒入盐 2 g ，白糖 3 g，生抽 8 ml。"],["最后抢炒出锅","继续大火翻炒 10 秒，即可出锅。"]]},
  {"id":"other_suan-rong-xia","name":"蒜蓉虾","category":"水产","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/other_suan-rong-xia.jpg","sourcePath":"dishes/aquatic/蒜蓉虾/蒜蓉虾.md","calories":456,"tips":[],"required":[["vibe-e6b5b7e899be","8只","海虾"],["vibe-e8929ce89389e985b1","50g","蒜蓉酱"]],"optional":[],"pantry":[["oil","20ml","食用油"],["soy","5ml","生抽"]],"steps":[["处理海虾","用刀从从虾头中间切开，切到距离虾尾 1 cm"],["铺设酱料","将蒜蓉酱铺在虾身中间，放在盘子中"],["大火蒸制","锅中倒入热水，将盘子放入锅中，大火蒸 3 分钟"],["淋油提鲜","烧热油，倒入虾盘中，倒入生抽"]]},
  {"id":"other_suan-xiang-huang-you-xia","name":"蒜香黄油虾","category":"水产","servings":1,"minutes":20,"difficulty":"简单","coverPath":"ai-generated/other_suan-xiang-huang-you-xia.jpg","sourcePath":"dishes/aquatic/蒜香黄油虾/蒜香黄油虾.md","calories":526,"tips":["虾不宜过度烹饪，否则会变硬","建议使用不粘平底锅以获得更好的煎制效果"],"required":[["vibe-e5a4a7e899be","8-10只(约200g)","大虾"],["vibe-e697a0e79b90e9bb84e6b2b9","30g","无盐黄油"],["garlic","4瓣(约20g)","大蒜"],["vibe-e69fa0e6aaac","1/4个","柠檬"]],"optional":[["vibe-e799bde891a1e89084e98592","15ml","白葡萄酒"]],"pantry":[["vibe-e6a984e6a684e6b2b9","10ml","橄榄油"]],"steps":[["预处理大虾","大虾去头去壳留尾，用牙签挑去虾线，洗净后用厨房纸吸干水分。"],["准备辅料","大蒜切成蒜末备用。"],["热锅凉油","中火加热平底锅，放入 10ml 橄榄油。"],["煎制大虾","油热后放入大虾，每面煎 1-1.5 分钟至变色，取出备用。"],["炒制蒜末","同一锅中加入黄油，融化后放入蒜末，小火炒香（约 30 秒）。"],["加入白葡萄酒","如使用白葡萄酒，此时加入并煮至酒精挥发（约 1 分钟）。"],["混合翻炒","将虾放回锅中，与蒜香黄油酱汁翻炒均匀（约 1 分钟）。"],["调味关火","挤入柠檬汁，翻炒均匀后立即关火。"],["出锅装盘","装盘，淋上锅中剩余酱汁。"]]},
  {"id":"other_tai-guo-shou-biao-hong-cha-de-zuo-fa","name":"泰国手标红茶的做法","category":"饮料","servings":1,"minutes":15,"totalMinutes":260,"waitMinutes":245,"difficulty":"中等","coverPath":"ai-generated/other_tai-guo-shou-biao-hong-cha-de-zuo-fa.jpg","sourcePath":"dishes/drink/泰国手标红茶/泰国手标红茶.md","calories":185,"tips":["制作步骤简单，但需反复过滤茶汤并等待长时间冷藏","对新手稍有耐心即可完成"],"required":[["vibe-e88cb6e7b289","20g","茶粉"],["milk","18ml","牛奶"],["vibe-e782bce4b9b3","24g","炼乳"]],"optional":[["vibe-e586b0e59d97","6-8颗","冰块"]],"pantry":[["water","600cc","水"],["sugar","24g","白糖"]],"steps":[["烧开水","将 600cc 水大火烧开。"],["过滤茶汤","在过滤袋中装入 20g 茶粉，开水倒入过滤袋中，反复过滤 20 遍。"],["备料奶基","使用克称量取 24g 炼乳、24g 白糖和 18ml 牛奶放入 1000ml 以上的水壶中。"],["混合搅拌","将过滤好的茶水倒入水壶中搅拌，直到白糖融化。"],["冷藏","将水壶放到冰箱冷藏 4 小时以上。"],["饮用","喝前可以根据个人喜好加入 6-8 颗冰块。"]]},
  {"id":"other_tai-shi-lu-rou-fan","name":"台式卤肉饭","category":"主食","servings":2.5,"minutes":90,"difficulty":"中等","coverPath":"ai-generated/other_tai-shi-lu-rou-fan.jpg","sourcePath":"dishes/meat_dish/台式卤肉饭/台式卤肉饭.md","calories":1495,"tips":["五花肉切条定义：带皮面向上摆放，肉皮所在平面为长宽面，垂直平面为高，形成肥瘦相间的细长条。","未冷冻五花肉切条技巧：放入冰箱冷冻室 30 分钟再取出更易切齐。","冷冻五花肉切条技巧：在常温下放置 30 分钟后再切。","切割技巧：切条时以较小力度将刀刃与肉快速摩擦，能保护肥瘦相间的结构不被压碎。","注意细肉条更易于炖煮软糯。"],"required":[["vibe-e5b8a6e79aaee4ba94e88ab1e88289","500g","带皮五花肉"],["vibe-e7baa2e891b1e5a4b4","25g","红葱头"],["garlic","25g","大蒜"],["rice","适量","米饭"],["vibe-e7949fe68abde985b1e6b2b9","75ml","生抽酱油"],["vibe-e7b1b3e98592","35ml","米酒"],["vibe-e9a699e58fb6","2片","香叶"]],"optional":[["egg","4个","鸡蛋"],["vibe-e4ba94e9a699e7b289","6g","五香粉"]],"pantry":[["oil","15ml","食用油"],["starAnise","1颗","八角"],["rockSugar","20g","冰糖"],["whitePepper","6g","白胡椒粉"]],"steps":[["处理五花肉","带皮五花肉切成 0.7cm(长) x 0.7cm(宽) x 2.5cm(高) 的细长条。"],["备料","红葱头、大蒜切末备用。"],["准备卤蛋","鸡蛋煮熟剥壳，并用刀划破蛋白（便于入味），备用。"],["热锅凉油","大火热锅，锅内放入 15ml 食用油，让油滑满锅底即可。"],["煸炒肉条","放入五花肉条，翻炒至肉色稍微变白，沿锅边淋入米酒 10ml。继续翻炒至五花肉不再出油。"],["爆香葱末","将切好的红葱头加入锅中，翻炒 1 分钟爆出油葱香味。"],["爆香蒜末","将切好的大蒜末加入锅中，翻炒 30 秒。"],["炒糖色","把猪肉推到旁边，放入冰糖加热到融化冒泡变成焦糖，再把猪肉一起翻拌，让焦糖均匀附着。"],["调味","加入生抽炒出香气。"],["小火慢炖","呛入米酒 25ml，水加到淹过猪肉，加入白胡椒粉、五香粉、八角、香叶、水煮蛋，沸腾后转小火卤 1 小时。"],["大火收汁","1 小时后，开大火收汁直到酱汁浓稠，呈现有光泽的琥珀色，即完成。"],["装盘享用","乘一碗米饭，将软烂的卤肉浇在米饭上，并加上卤蛋，开始享用。"]]},
  {"id":"other_tang-ban-xi-hong-shi","name":"糖拌西红柿","category":"素菜","servings":2,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/other_tang-ban-xi-hong-shi.jpg","sourcePath":"dishes/vegetable_dish/糖拌西红柿/糖拌西红柿.md","calories":104,"tips":["在制作过程中请您小心使用刀具。","沿纹路切西红柿可以更多的留住汁水。"],"required":[["tomato","2个(约200g)","西红柿"]],"optional":[],"pantry":[["sugar","20g","白砂糖"]],"steps":[["划皮","用刀将西红柿皮米字型划开"],["加热烫皮","用筷子插入西红柿的菊花，在燃气上转动烤 10 秒（或用开水冲 30 秒），直到西红柿皮卷边"],["去皮","把西红柿的衣服脱光"],["切块备用","再西红柿大卸八块（沿纹路切可以更多的留汁水），去掉头部根蒂部，备用"],["码放第一层","全部切好后，将西红柿在盘子中均匀码一层"],["撒糖与层叠","撒上白糖，重复上面一步直到全部西红柿放完"],["冷藏入味","放入冰箱冷藏 10 分钟"],["出餐","一盘糖拌西红柿就好了，营养美味，酸甜爽口，夏日解暑又解腻"]]},
  {"id":"other_tang-cu-li-yu","name":"糖醋鲤鱼","category":"水产","servings":3,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_tang-cu-li-yu.jpg","sourcePath":"dishes/aquatic/糖醋鲤鱼/糖醋鲤鱼.md","calories":1011,"tips":["这道菜难度系数中等偏上，对新手不太友好，需掌握改刀、挂糊和火候","腌制时间越长，鱼腥味就越小","炸鱼时要注意油温控制，防止底部炸糊","糖醋汁的稠度要适中，以便能均匀挂在鱼身上"],"required":[["vibe-e9b2a4e9b1bc","约 3 斤","鲤鱼"],["vibe-e795aae88c84e985b1","40g","番茄酱"],["vibe-e5a4a7e891b1","30g","大葱"],["ginger","30g","姜"],["flour","100g","面粉"],["egg","1个","鸡蛋"]],"optional":[["cilantro","1颗","香菜"]],"pantry":[["sugar","20g","白糖"],["vibe-e799bde9868b","10g","白醋"],["starch","210g","淀粉"],["salt","35g","盐"],["wine","25g","料酒"],["water","240g","清水"],["oil","约 1L","食用油"]],"steps":[["清洗处理","将鱼清洗干净，确保无鱼鳞等异物"],["改刀处理","将鱼头朝左，鱼肚朝下，右手持刀。刀竖直切下 1cm，按紧鱼身往左片 3-4cm，再将鱼片中间轻轻划一刀"],["准备腌制辅料","将大姜切片，大葱切段"],["提取葱姜汁","用力将大葱大姜里的汁水挤到装鱼的盆中"],["腌制去腥","加入 20g 盐，25g 料酒，涂抹均匀给鲤鱼进行“按摩”腌制"],["调制面糊","在一个干净盆中加入 100g 面粉、200g 淀粉、180g 水、5g 盐，搅拌至可拉丝状态后打入一个鸡蛋再次搅匀"],["擦干挂糊","用干毛巾将鱼身上的水擦干，然后均匀挂上面糊"],["热油烧制","起锅烧油（约 1L），将油温烧至 7 成热（约 200-240 度）"],["入锅炸制","捏起鱼尾，将鱼头沉入锅底，用勺子往鱼身上淋热油，待面糊成型后慢慢放入锅中，用锅铲和笊篱托住头部防止炸糊"],["翻面复炸","用锅铲和笊篱配合将鱼翻身，再炸两分钟后盛入盘中"],["调配料汁","将 50g 清水、40g 番茄酱、20g 白糖、10g 白醋混合；另备 10g 淀粉和 10g 水调成水淀粉"],["熬制糖醋汁","大火烧热锅倒入料汁烧开，转小火加入水淀粉边倒边搅拌，20秒后关火"],["淋汁成菜","将熬好的糖醋汁均匀浇在鱼身上，点缀香菜或葱花"]]},
  {"id":"other_tang-cu-pai-gu","name":"糖醋排骨","category":"荤菜","servings":1,"minutes":45,"difficulty":"中等","coverPath":"ai-generated/other_tang-cu-pai-gu.jpg","sourcePath":"dishes/meat_dish/糖醋排骨/糖醋排骨.md","calories":1022,"tips":["炸排骨时可轻撒少量干淀粉以提升酥脆口感。","焯水必须冷水下锅，清洗必须使用开水，以防肉质变柴。","炒糖水步骤的关键在于确保白糖完全溶解，不必强求深颜色。","收汁阶段应快速翻炒，确保调料均匀包裹，避免长时间炖煮损伤口感。"],"required":[["ribs","300g","排骨"],["ginger","2片","姜片"],["vibe-e88a9de9babb","2g","芝麻"],["vibe-e795aae88c84e985b1","10g","番茄酱"],["vibe-e4ba94e9a699e7b289","0.5g","五香粉"]],"optional":[],"pantry":[["sugar","30g","白砂糖"],["oil","300-350ml","食用油"],["soy","5ml","生抽"],["oysterSauce","5ml","蚝油"],["darkSoy","5ml","老抽"],["vibe-e9b8a1e7b2be","2g","鸡精"],["vibe-e9a699e9868b","5ml","香醋"]],"steps":[["排骨焯水","排骨与姜片放入冷水中，大火加热至水沸腾、出现大量泡沫后转中火，待水持续沸腾时再转小火焯水 2–3 分钟，捞出备用。"],["清洗排骨","用开水反复清洗排骨 2–3 遍，确保彻底去除血沫。"],["油炸排骨","在锅中倒入足够量的食用油进行深炸，待油温升至约 170°C 后，下排骨炸制 3–5 分钟，直至表面略呈金黄色，捞出控油。"],["炒制糖水","另取干净锅，置于小火上加热 50 ml 热水，加入白砂糖 30 g，轻轻搅拌直至糖完全溶解，并略呈淡黄色。"],["调味翻炒","将炸好的排骨倒入糖水中，迅速翻炒 30 秒后，依次加入香醋 5 ml、生抽 5 ml、蚝油 5 ml、鸡精 2 g、番茄酱 10 g、五香粉 0.5 g，再次翻炒 30 秒使调料均匀裹覆，加开水至没过排骨。"],["上色收汁","用大火将液体煮沸后，加入老抽 5 ml 进行上色，并快速收汁；若排骨块大，可转小火焖煮 5–10 分钟入味。"],["装盘点缀","起锅装盘，撒上芝麻 2 g，即可享用。"]]},
  {"id":"other_ti-la-mi-su-de-zuo-fa","name":"提拉米苏的做法","category":"甜品","servings":1,"minutes":40,"totalMinutes":270,"waitMinutes":230,"difficulty":"中等","coverPath":"ai-generated/other_ti-la-mi-su-de-zuo-fa.jpg","sourcePath":"dishes/dessert/提拉米苏/提拉米苏.md","calories":809,"tips":["关于蛋白打发的具体细节，可参考下厨房相关教程","容器建议使用玻璃乐扣，方便观察分层且密封性好"],"required":[["vibe-e9a9ace696afe58da1e5bdade88a9de5a3ab","450g","马斯卡彭芝士"],["vibe-e6898be68c87e9a5bce5b9b2","1 包","手指饼干"],["vibe-e694bee58789e6b593e7bca9e59296e595a1","350ml","放凉浓缩咖啡"],["vibe-e697a0e88f8ce9b8a1e89b8b","4 个","无菌鸡蛋"],["vibe-e58fafe58fafe7b289","10g","可可粉"]],"optional":[["vibe-e69c97e5a786e98592","35ml","朗姆酒"]],"pantry":[["sugar","50g","白砂糖"]],"steps":[["分离蛋黄蛋清","使用分蛋器或蛋壳小心将4个无菌鸡蛋的蛋黄与蛋清分离，分别装在两个干净的碗中。"],["打发蛋白","在蛋白中加入10g白砂糖，使用打蛋器打发至湿性发泡（提起打蛋器有弯曲的小尖角）。"],["蛋黄加糖搅拌","在蛋黄中分三次加入剩余的40g白砂糖，持续搅拌至蛋黄颜色变浅且均匀。"],["加入马斯卡彭芝士","将马斯卡彭芝士分三次加入蛋黄液中，搅拌至完全顺滑无颗粒。"],["加入朗姆酒","在蛋黄芝士糊中最后加入35ml朗姆酒，搅拌均匀。"],["混合蛋白与芝士糊","将打发好的蛋白分三次加入蛋黄芝士液中，采用翻拌的手法轻轻混合均匀。"],["饼干浸泡咖啡","将手指饼干两面快速浸入放凉的浓缩咖啡液中，迅速取出平铺在容器底部。"],["组装铺层","按照“一层饼干、一层芝士液”的顺序交替铺入容器，通常为两层饼干两层芝士。"],["冷藏成型","盖上盖子或保鲜膜，放入冰箱冷藏至少四个小时。"],["筛粉装饰","食用前从冰箱取出，在表面均匀筛上一层可可粉。"]]},
  {"id":"other_tian-luo-niang","name":"田螺酿","category":"水产","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/other_tian-luo-niang.jpg","sourcePath":"dishes/meat_dish/田螺酿/田螺酿.md","calories":533,"tips":["食用方法：先吮吸壳内汤汁，再用牙签挑出或用嘴猛吸出肉馅","螺肉和猪肉最佳比例为 1:1","薄荷是这道菜的精华，紫苏配田螺是绝配，两者至少要有其一","没有三花酒可用料酒代替，但风味会打折扣","焯水时间一定要短，久了螺肉变老发硬","搭配冰镇漓泉啤酒是阳朔当地的标准吃法"],"required":[["vibe-e5a4a7e794b0e89eba","20-25个(约1000g)","大田螺"],["vibe-e78caae88289","250g","猪肉"],["vibe-e696b0e9b29ce89684e88db7e58fb6","10g","新鲜薄荷叶"],["vibe-e7b4abe88b8fe58fb6","10g","紫苏叶"],["ginger","1小块(约15g)","生姜"],["scallion","2根(约30g)","葱"],["vibe-e6a182e69e97e4b889e88ab1e98592","15ml","桂林三花酒"]],"optional":[["vibe-e985b8e7ac8b","50g","酸笋"],["garlic","5瓣(约20g)","大蒜"],["chili","4个","干辣椒"],["oysterSauce","10ml","蚝油"],["starch","10g","淀粉"],["whitePepper","2g","白胡椒粉"]],"pantry":[["soy","30ml","生抽"],["salt","5g","食盐"],["oil","30ml","食用油"]],"steps":[["吐沙","将田螺放入清水盆中静置一下午，水中可滴入香油或芥末加速吐沙。"],["处理田螺","刷洗外壳，用老虎钳剪掉尾部，水开后焯烫1-2分钟。捞出挑出螺肉，去掉螺盖和泥肠，洗净螺壳甩干。"],["制作馅料","螺肉剁碎，猪肉剁成肉末，加入切碎的薄荷、紫苏、姜葱及调料（三花酒、生抽、盐、可选蚝油等），顺时针搅拌上劲。"],["酿制","用筷子将肉馅塞入处理好的田螺壳中，尽量塞满塞紧。"],["焖煮","热锅凉油炒香酸笋和辣椒，加水和调料烧开，放入田螺中小火焖煮10分钟，最后放入剩余薄荷紫苏大火收汁。"]]},
  {"id":"other_tu-dou-dun-pai-gu","name":"土豆炖排骨","category":"荤菜","servings":2,"minutes":90,"difficulty":"中等","coverPath":"ai-generated/other_tu-dou-dun-pai-gu.jpg","sourcePath":"dishes/meat_dish/土豆炖排骨/土豆炖排骨.md","calories":991,"tips":["全程使用热水：焯水后的清洗及后续炖煮必须使用热水，否则排骨肉质会变柴。","糖色观察：炒糖色是关键，糖色呈现棕红且有细密小泡时状态最佳。","土豆防氧化：切好的土豆必须泡水，否则氧化变黑会影响成品视觉效果。"],"required":[["vibe-e8828be68e92","750g","肋排"],["potato","300g","土豆"],["ginger","30g","姜"],["scallion","25g","小葱"],["chili","5g","干辣椒"],["vibe-e88ab1e6a492","1g","花椒"],["vibe-e6a182e79aae","1g","桂皮"],["vibe-e9bb84e8b186e985b1","5g","黄豆酱"]],"optional":[],"pantry":[["wine","25ml","料酒"],["sugar","10g","白糖"],["starAnise","1g","八角"],["soy","10ml","生抽"],["darkSoy","5ml","老抽"],["oysterSauce","5ml","蚝油"],["salt","3g","盐"],["oil","20ml","食用油"],["water","700ml","开水"]],"steps":[["处理土豆","将300g土豆去皮切成滚刀块，并立刻泡入清水中防止氧化发黑。"],["处理葱姜","姜切片分两份；小葱15g挽结，10g切成葱花备用。"],["封装调料与开启异步水程","混合生抽、老抽、蚝油、黄豆酱；准备香料碟；同时烧开700ml水。"],["排骨焯水","肋排冷水下锅，加葱结、姜片、料酒，沸腾后焯水2分钟捞出。"],["热洗与脱水","用热水洗净排骨浮沫，并用厨房纸彻底吸干表面水分。"],["炒糖色与煎制","热锅凉油下白糖，中小火炒至红棕色冒泡后下排骨，翻炒2-3分钟上色。"],["爆香与调味","加入香料碟爆香10秒，淋入料酒，倒入酱汁碗翻炒30秒。"],["长时炖煮","加入700ml开水，大火烧开转小火焖煮40分钟。"],["加入土豆继续炖煮","下入沥干的土豆块，盖盖继续小火焖煮15-20分钟。"],["收汁出锅","加盐调味，转大火收汁至浓稠，撒葱花装盘。"]]},
  {"id":"other_wei-bo-lu-ji-dan-geng","name":"微波炉鸡蛋羹","category":"早餐","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/other_wei-bo-lu-ji-dan-geng.jpg","sourcePath":"dishes/vegetable_dish/鸡蛋羹/蒸箱鸡蛋羹.md","calories":160,"tips":["鸡蛋 1 个约为 50±5g。若使用其他品种蛋品可按比例增减水量。","一定要确保将鸡蛋打散，否则可能会发生轻度鸡蛋爆炸。","鸡蛋和水不能超过碗容量的 2/3，否则可能发生溢出。"],"required":[["egg","2个","鸡蛋"]],"optional":[["vibe-e899bee79aae","10个","虾皮"],["scallion","5g","葱"],["vibe-e985b1e6b2b9","适量","酱油"],["vibe-e88a9de9babbe6b2b9efbc88e9a699e6b2b9efbc89","1ml","芝麻油（香油）"]],"pantry":[["water","200ml","水"],["salt","3g","盐"]],"steps":[["打散鸡蛋","将鸡蛋打入可使用微波炉加热的陶瓷碗中，使用筷子将其打散。"],["调味搅拌","向蛋液中加入水和盐，搅拌均匀。"],["加入虾皮","将虾皮放入碗中，搅拌均匀，保证所有虾皮不会堆积在一起。"],["准备葱花","葱切碎至边长 0.6±3mm 状，放入碗中搅拌均匀。"],["初次加热","将碗覆盖保鲜膜或以可微波瓷盘加盖，放入微波炉加热 2 分钟(500W)。"],["二次加热","小心地取下保鲜膜或其他覆盖物，然后继续加热 2 分钟。"],["水平旋转","若微波炉不带旋转式加热盘，将碗缓慢的水平旋转 180 度，以确保内容物加热均匀。"],["调香","放入芝麻油。"],["取出容器","小心地从微波炉中拿出碗。"],["点缀酱油","如果选择放入酱油，则确保酱油在鸡蛋羹表面流动后能以最薄的形式沾满鸡蛋羹表面即可。"],["完成","开心的享受鸡蛋羹。"]]},
  {"id":"other_wei-bo-lu-la-chang-bao-zai-fan","name":"微波炉腊肠煲仔饭","category":"早餐","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/other_wei-bo-lu-la-chang-bao-zai-fan.jpg","sourcePath":"dishes/staple/微波炉腊肠煲仔饭/微波炉腊肠煲仔饭.md","calories":1039,"tips":["微波炉加热器皿必须是微波炉专用材质，严禁使用金属器皿","多余的青菜可以沾着叮热的酱油食用"],"required":[["vibe-e7b1b3","200ml","米"],["vibe-e8858ae882a0","1根","腊肠"],["egg","1个","鸡蛋"],["carrot","1个","红萝卜"],["bokchoy","适量","青菜"]],"optional":[["scallion","1颗","香葱"]],"pantry":[["salt","5g","盐"],["oil","15ml","油"],["soy","10ml","生抽"]],"steps":[["淘米入碗","将米淘洗干净后倒入饭碗内，加入 400ml 的水，并盖上盖子。"],["初次微波与备料","放入微波炉，高火加热 6 分钟。加热期间切好腊肠、红萝卜片、葱花，洗净青菜。在青菜碗中放入青菜、红萝卜，加入 10ml 油和 5g 盐；小碗内倒入 10ml 生抽和 5ml 油。"],["加入腊肠","取出饭碗，在米饭上摆入切好的腊肠片，继续高火加热 2 分钟。"],["烹饪青菜","取出腊肠饭，放入准备好的青菜碗，高火加热 4-5 分钟。"],["组合与加蛋","在腊肠饭上摆好煮熟的青菜，在空隙处磕入一个鸡蛋，根据对蛋黄成熟度的喜好继续高火 40-60 秒。"],["加热酱汁与淋味","取出腊肠饭。将调料小碗放入微波炉高火 30 秒。取出后淋在饭上，撒上葱花即可。"]]},
  {"id":"other_wen-quan-dan","name":"温泉蛋","category":"早餐","servings":1,"minutes":33,"difficulty":"中等","coverPath":"ai-generated/other_wen-quan-dan.jpg","sourcePath":"dishes/breakfast/温泉蛋/温泉蛋.md","calories":72,"tips":["若使用机械式温度计则探头需没入水中至少 6cm，若使用电子温度计则无特殊要求","锅可以采用稍厚的锅，方便控制温度","虽然 70 摄氏度 25 分钟已经完全可以杀死沙门氏菌，但还是要尽量少吃，或购买正规可生食鸡蛋制作"],"required":[["egg","1个","鸡蛋"]],"optional":[["vibe-e69886e5b883e985b1e6b2b9","适量","昆布酱油"],["scallion","适量","香葱"]],"pantry":[],"steps":[["准备与控温","在锅中盛装一定量自来水，确保水面没过约鸡蛋 3cm，水中插入温度计。开火逐渐调整功率，使水温保持在 70 摄氏度。"],["放入鸡蛋","将鸡蛋放入锅中。鸡蛋不可互相堆叠，应皆在底部，并留有空间可以晃动。"],["恒温烹煮","保持当前 70 摄氏度水温持续加热 25 分钟。"],["准备冰水","在烹煮过程中，准备一杯冰水备用。"],["冰镇降温","捞出鸡蛋，并立刻放入冰水中，等待 3 分钟。"],["装碗完成","将鸡蛋打入小碗，加入昆布酱油和葱花点缀。"]]},
  {"id":"other_wo-sun-ye-jian-bing","name":"莴笋叶煎饼","category":"主食","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/other_wo-sun-ye-jian-bing.jpg","sourcePath":"dishes/vegetable_dish/莴笋叶煎饼/莴笋叶煎饼.md","calories":477,"tips":["选择莴笋叶是某省市买到的蔬菜包基本都包含莴笋，可以换成韭菜等","莴笋叶直接焯水后凉拌有苦味，所以选择做成煎饼的配菜"],"required":[["vibe-e88eb4e7ac8be58fb6","50g","莴笋叶"],["egg","2个","鸡蛋"]],"optional":[],"pantry":[["oil","30ml","食用油"],["soy","5ml","生抽"],["starch","15g","淀粉"],["vibe-e9b8a1e7b2be","2g","鸡精"]],"steps":[["备料与搅拌","莴笋叶剁碎，加入鸡蛋、淀粉（生粉）、生抽、鸡精搅拌均匀备用"],["入锅铺平","起锅烧油，倒入莴笋叶浆汁，均匀平铺在锅面上"],["煎制翻面","第一面炸 120 S 后，翻面再炸 60 S 后出锅"]]},
  {"id":"other_wu-chu-shi-ji-feng-mi-mian-bao","name":"无厨师机蜂蜜面包","category":"主食","servings":12,"minutes":180,"difficulty":"较难","coverPath":"ai-generated/other_wu-chu-shi-ji-feng-mi-mian-bao.jpg","sourcePath":"dishes/dessert/无厨师机蜂蜜面包/无厨师机蜂蜜面包.md","calories":176,"tips":["发面时间并不固定, 每 1 小时看一下确认就可以, 明显发酵变大即可, 建议发酵 2 - 2.5 倍大。","面团大小不会显著影响口感和烘烤效果，可根据喜好调整。","冰箱储存会变硬, 微波炉加热 10 - 20s 即可恢复松软。"],"required":[["vibe-e9ab98e7ad8be99da2e7b289","400g","高筋面粉"],["milk","200g","牛奶"],["vibe-e985b5e6af8d","4g","酵母"],["egg","1个","鸡蛋"],["vibe-e9bb84e6b2b9","30g","黄油"],["vibe-e89c82e89c9c","20g","蜂蜜"],["vibe-e89b8be6b6b2","适量","蛋液"]],"optional":[["vibe-e88a9de9babb","适量","芝麻"]],"pantry":[["sugar","70g","白砂糖"],["salt","2g","盐"],["water","20g","水"],["vibe-e88ab1e7949fe6b2b9","适量","花生油"]],"steps":[["混合原料","将面粉，牛奶（建议微波炉加热15-20s至40°），酵母，鸡蛋，糖和盐混合起来。"],["揉捏成团","搅拌面团，将原料混合均匀成团。"],["加入黄油","加入软化的黄油进行混合。"],["手揉面团","继续搅拌并手揉，使面团均匀混合。"],["第一次发酵","使用保鲜膜覆盖容器，普通气温(10-20°)放置1-2小时。"],["检查发酵","明显看到面团发酵至2倍大即可，此时面团应不再十分黏手。"],["切分面团","切分面团，理想状态每一份60g，可根据喜好调整大小。"],["初步卷制","将每一份小面团使用擀面杖擀成舌状后卷起，再次醒面10分钟。"],["二次卷切","再次使用擀面杖擀成舌状后卷起，从中间切开（一个变成两个）。"],["多次卷切","再次擀成舌状后卷起并从中间切开（两个变成四个）。"],["入盘准备","烤盘放入油纸并倒入花生油，将卷好的面团底部蘸水和面粉后放入烤盘。"],["第二次醒发","盖上保鲜膜再次醒发。"],["刷蛋液","在面包表面均匀刷上一层蛋液。"],["烘烤","烤箱预热至180°(355°F)，烘烤18-20分钟。"],["最后装饰","出炉后，刷上蜂蜜水，撒上芝麻。"]]},
  {"id":"other_wu-gu-ji-zhao","name":"无骨鸡爪","category":"荤菜","servings":1,"minutes":50,"totalMinutes":495,"waitMinutes":445,"difficulty":"较难","coverPath":"ai-generated/other_wu-gu-ji-zhao.jpg","sourcePath":"dishes/meat_dish/无骨鸡爪/无骨鸡爪.md","calories":815,"tips":["操作时需注意观察水位，如低于食材3/4应加热水没过","去骨步骤极为耗时，可参考B站视频教程：bili_89324373958","柠檬酸度可根据个人喜好以1颗为单位进行调整"],"required":[["vibe-e9b8a1e788aa","1kg","鸡爪"],["ginger","4片","姜"],["vibe-e5a4a7e891b1","3段（5cm/段）","大葱"],["garlic","10瓣","大蒜"],["vibe-e5b08fe7b1b3e8bea3","12个","小米辣"],["onion","半个","洋葱"],["vibe-e9bb91e9868befbc88e99988e9868befbc89","50g","黑醋（陈醋）"],["vibe-e88ab1e6a492e6b2b9","10ml","花椒油"],["cilantro","3颗","香菜"],["vibe-e69fa0e6aaac","2颗","柠檬"]],"optional":[],"pantry":[["wine","65g","料酒"],["soy","75g","生抽"],["oysterSauce","30g","蚝油"],["sugar","10g","白糖"],["salt","3g","盐"]],"steps":[["修剪鸡爪","用剪刀或菜刀把鸡爪上的指甲部分全部剪掉，包括指甲下面的肉和骨头，确保一点指甲都不剩。"],["清洗备用","用水将鸡爪洗干净，放置一旁备用。"],["焯水去腥","将鸡爪放入大锅，加入大葱、料酒、姜片，加水没过鸡爪。"],["大火煮沸","大火煮开，中途用勺子撇去浮沫。待水完全沸腾后继续煮10分钟。"],["冷却沥干","关火捞出鸡爪，用冷水冲洗干净并沥干水分，放入盆中。"],["冷冻定型","将鸡爪放入冰箱冷冻层冷冻20分钟。"],["分批去骨","从冰箱取出鸡爪转至冷藏，每次拿10个出来去骨。从手指前端划开至手背，再划开至手臂，掰动关节后向内推，使皮骨分离。"],["准备配料","小米辣切均匀小颗；大蒜、洋葱、香菜切碎；柠檬对半切开挤汁。"],["调味抓拌","将全部调料和切好的配料（小米辣、大蒜、洋葱、香菜、柠檬汁）倒入装鸡爪的容器，抓拌均匀。"],["冷藏腌制","放入冰箱冷藏腌制一个晚上（约6小时）即可食用。"]]},
  {"id":"other_xi-hong-shi-dou-fu-tang-geng","name":"西红柿豆腐汤羹","category":"汤","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/other_xi-hong-shi-dou-fu-tang-geng.jpg","sourcePath":"dishes/vegetable_dish/西红柿豆腐汤羹/西红柿豆腐汤羹.md","calories":242,"tips":[],"required":[["tomato","1个","西红柿"],["egg","1个","鸡蛋"],["tofu","100g","豆腐"],["scallion","0.5根","香葱"],["ginger","1片","姜"]],"optional":[],"pantry":[["oil","5ml","食用油"],["salt","2g","盐"],["starch","5g","淀粉"],["vibe-e9b8a1e7b2be","2g","鸡精"],["water","350ml","开水"]],"steps":[["食材预处理","西红柿切成小丁、鸡蛋打入碗中搅拌、豆腐切块备用"],["炒制西红柿","起锅烧油，放入姜片 5 S 后倒入入西红柿翻炒 30 S"],["煮汤加料","锅中加入开水，汤水烧开，60 S 后到入鸡蛋液、豆腐块"],["勾芡","汤水重新烧开后，加入水淀粉，沿一个方向搅拌 2 圈"],["调味起锅","加入鸡精、盐、香葱，30 S 后起锅"]]},
  {"id":"other_xi-hong-shi-ji-dan-gua-mian","name":"西红柿鸡蛋挂面","category":"主食","servings":1,"minutes":20,"difficulty":"简单","coverPath":"ai-generated/other_xi-hong-shi-ji-dan-gua-mian.jpg","sourcePath":"dishes/staple/西红柿鸡蛋挂面/西红柿鸡蛋挂面.md","calories":654,"tips":["鸡蛋蛋液中可以加入 2g 黑胡椒味道更好","熬臊子过程中加入 2g 白胡椒粉提升香辛口味","煮面条技巧在于煮沸就加冷水，循环往复两三次，面条不粘且口感劲道"],"required":[["noodles","50-100g","挂面"],["tomato","1个(约200g)","西红柿"],["egg","1-2个","鸡蛋"],["vibe-e99d92e6a492","1个","青椒"],["scallion","1根","葱"],["garlic","2瓣","大蒜"]],"optional":[["oysterSauce","5g","蚝油"],["vibe-e9b8a1e7b2be","3g","鸡精"],["sugar","2g","白砂糖"],["sesame","5g","香油"],["vibe-e799bde9868b","2g","白醋"]],"pantry":[["salt","5g","盐"],["vibe-e985b1e6b2b9","5-8g","酱油"],["oil","20g","食用油"]],"steps":[["食材预处理","小葱切成葱花；西红柿切块；青椒切成菱形块；鸡蛋打入小碗加白醋打散。"],["鸡蛋预处理","热锅倒入15-20g食用油，油温七成热时倒入蛋液快速划散，凝固后盛出备用，留底油。"],["制作西红柿鸡蛋臊子","锅中留底油炒香葱白和蒜末，加入西红柿和青椒炒出汁，加入酱油和白糖翻炒，加一碗清水煮沸，倒入鸡蛋和蚝油/鸡精，中小火收汁后加入葱绿和香油。"],["煮面条与组合","锅中加500ml水烧开，下挂面。面条煮软后加100ml冷水，再次煮沸飘起后再加100ml冷水。待面条边缘透明即熟，捞出放入臊子碗中拌匀。"]]},
  {"id":"other_xi-hong-shi-niu-nan","name":"西红柿牛腩","category":"荤菜","servings":1,"minutes":90,"difficulty":"较难","coverPath":"ai-generated/other_xi-hong-shi-niu-nan.jpg","sourcePath":"dishes/meat_dish/西红柿牛腩/西红柿牛腩.md","calories":1569,"tips":["用火注意安全、用火注意安全、用火注意安全","用砂锅/铝锅炖肉时，水开后转中小火/小火","教程中的番茄去皮方式是目前为止实践最快的方式","绝对不用番茄酱和少加佐料，尽可能还原食材的原味"],"required":[["tomato","3-4 个（每个约 200g）","西红柿"],["beefBrisket","500g","牛腩"],["vibe-e891b1e6aeb5","2cm 两段","葱段"],["ginger","两片","姜片"],["scallion","10g","葱花"],["ginger","10g","姜"],["vibe-e696992fe9bb84e98592","5-10ml","料/黄酒"]],"optional":[],"pantry":[["oil","20-30ml","食用油"],["soy","适量","生抽"],["whitePepper","适量","白胡椒粉"],["sugar","适量","白糖"],["starAnise","三小片","八角"]],"steps":[["处理牛腩并焯水","牛腩切条、切块成长宽高均 2cm ，冷水下锅，开锅煮制 2 分钟去除血水，捞出冲洗干净。"],["炖制牛腩","另起锅 2L 水烧开，加入 2cm 两段葱段、两片姜片、八角、料/黄酒 5-10ml，放入焯好的牛肉，盖盖炖制（砂锅 1 小时，高压锅炖肉模式 45 分钟），筷子能轻松插透就证明炖好了。"],["西红柿去皮切块","西红柿头部滑十字至腰线，筷子/刀叉从果蒂捅入，煤气灶小火，一边转动一边烤，起皮后撕下来，切块。越小越好。"],["炒制番茄底料","起锅烧油，油温 7 成热，葱、姜各 10g，番茄下锅，炒透炒出番茄红色，加入煮好的牛腩和原汤，原汤刚刚没过牛肉即可。"],["调味","根据个人口味放入盐、糖、生抽调味盖盖。"],["大火收汁","开锅后大火继续炒制 3-5 分钟。"],["盛盘","待番茄汁呈中等粘稠程度后关火，散入葱花，盛盘。"]]},
  {"id":"other_xi-hong-shi-tu-dou-dun-niu-rou","name":"西红柿土豆炖牛肉","category":"荤菜","servings":1,"minutes":90,"difficulty":"中等","coverPath":"ai-generated/other_xi-hong-shi-tu-dou-dun-niu-rou.jpg","sourcePath":"dishes/meat_dish/西红柿土豆炖牛肉/西红柿土豆炖牛肉.md","calories":827,"tips":["炖煮时保证加入的汤水是温热的","炖煮时不要扣盖，并时不时翻动避免糊底","使用砂锅炖煮风味更佳，但注意不要大火以免裂开","酱油总量不宜过多，汤汁浓缩后会变咸","严禁使用鸡精味精，以免掩盖牛肉本身的鲜味"],"required":[["vibe-e7899be88289","500-700g","牛肉"],["potato","2-3个","土豆"],["tomato","2-3个","西红柿"],["onion","1个","洋葱"],["scallion","1根","葱"],["ginger","4片","姜"],["vibe-e88ab1e6a492","3g","花椒"],["vibe-e9a699e58fb6","2片","香叶"],["vibe-e799bde7b3962fe586b0e7b396","适量","白糖/冰糖"],["vibe-e9bb91e883a1e6a492e7b2892fe799bde883a1e6a492e7b289","2g","黑胡椒粉/白胡椒粉"]],"optional":[["vibe-e795aae88c84e8868f2fe795aae88c84e985b1","5-10g","番茄膏/番茄酱"]],"pantry":[["wine","约50g","料酒"],["starAnise","1-1.5个","八角"],["oil","10-15ml","油"],["soy","15ml","生抽"],["darkSoy","适量","老抽"]],"steps":[["食材预处理","土豆去皮切5cm大块；西红柿烫皮去芯切3cm块；洋葱切0.5-1cm小粒；葱切葱花（4g）和长段；牛肉泡凉水半小时或焯水撇浮沫。"],["高压压制牛肉","牛肉入高压锅，凉水没过，加葱段、姜片、20g料酒，上汽压20分钟。"],["炒香底料","牛肉切5cm块。炒锅倒油，四五成热下花椒八角香叶，出香后捞出。下牛肉、葱姜炒香。"],["调味与炒制配菜","加入生抽、料酒、胡椒粉、番茄膏，下入洋葱炒至透明。随后加入西红柿炒至软烂化开，倒入剩下的原汤。"],["小火炖煮","开锅后转小火。出锅前30-40分钟加入土豆，并根据口味加糖和盐调味。"]]},
  {"id":"other_xi-hu-lu-chao-ji-dan","name":"西葫芦炒鸡蛋","category":"素菜","servings":2,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/other_xi-hu-lu-chao-ji-dan.jpg","sourcePath":"dishes/vegetable_dish/西葫芦炒鸡蛋/西葫芦炒鸡蛋.md","calories":224,"tips":["西葫芦不宜久炒，否则会失去爽脆口感","西红柿是点睛之笔，建议不要省略","制作过程中通过小火焖煮可以保留食材的原汁原味"],"required":[["zucchini","500g","西葫芦"],["egg","3个","鸡蛋"]],"optional":[["tomato","100g","西红柿"]],"pantry":[["oil","10-20ml","食用油"],["salt","6g","食用盐"]],"steps":[["处理西红柿","西红柿洗净，切成小块，备用"],["处理西葫芦","西葫芦洗净，切成边长约为 4cm 的菱形，备用"],["准备蛋液","打三个鸡蛋到碗里，打散搅匀，备用"],["热锅注油","热锅，锅内放入 5ml - 10ml 食用油"],["炒鸡蛋","倒入鸡蛋，保持翻炒至鸡蛋成固体，用锅铲分成小块后盛到碗里，备用"],["炒西红柿","锅内再放入 5ml - 10ml 食用油，倒入西红柿，炒至变软"],["焖炒西葫芦","倒入西葫芦一起翻炒均匀，放入 6g 食用盐，将火调小然后等待 4 - 5 分钟"],["混合翻炒","倒入备用的鸡蛋，中火翻炒 15 秒"],["出锅","关火，盛盘"]]},
  {"id":"other_xiang-gan-qin-cai-chao-rou","name":"香干芹菜炒肉","category":"荤菜","servings":2,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_xiang-gan-qin-cai-chao-rou.jpg","sourcePath":"dishes/meat_dish/香干芹菜炒肉/香干芹菜炒肉.md","calories":741,"tips":["如果没有买到香芹，或者用的芹菜比较粗，可以考虑焯水，放入滚水中 1 分钟捞出，冷水冲洗（保持爽脆）","如果买到的豆干比较硬、紧实，也可以切条后再焯水"],"required":[["driedTofu","150g","豆干"],["vibe-e9a699e88ab9","4 根","香芹"],["vibe-e78caae88289","200g","猪肉"],["garlic","2 瓣","蒜头"],["vibe-e8bea3e6a492","4 个","辣椒"]],"optional":[["vibe-e88ab1e6a492","6 粒","花椒"],["vibe-e9b8a1e7b2be","3g","鸡精"]],"pantry":[["salt","5g","盐"],["darkSoy","8ml","老抽"],["oysterSauce","5ml","蚝油"],["oil","10-15ml","食用油"]],"steps":[["准备芹菜","芹菜去叶切段、切成不超过 4cm 的条状，备用"],["准备香干","香干切条，宽约小拇指，备用"],["处理辅料：蒜","蒜头切片或者剁成蒜泥都行，备用"],["处理辅料：辣椒","辣椒切圈或者斜切成条都行，备用"],["热锅凉油","热锅，锅内放入 10ml - 15ml 食用油。等待 10 秒让油温升高"],["爆香底料","放入花椒、大蒜爆香（可以吃姜的也可以额外放入一些姜片/姜丝）"],["炒肉上色","加入猪肉炒至变色，再加入 8ml 老抽上色翻炒均匀（有豆瓣酱的，可以放入 3ml 豆瓣酱一起翻炒）"],["加入香干","加入香干翻炒均匀（大约 2 分钟）"],["加入辣椒","加入辣椒翻炒均匀（大约 1-2 分钟）"],["加入芹菜调味","加入芹菜，放入 5g 盐翻炒 1 分钟"],["出锅前调味","加入 3g 鸡精、 5ml 蚝油翻炒均匀，即可出锅"]]},
  {"id":"other_xiang-gu-hua-ji","name":"香菇滑鸡","category":"荤菜","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_xiang-gu-hua-ji.jpg","sourcePath":"dishes/meat_dish/香菇滑鸡/香菇滑鸡.md","calories":608,"tips":["鸡腿去骨时，骨头正对操作者，从头部划一刀至底部，刀口要深碰到骨头","用手扒拉肉到两边，用刀尖隔开骨头上沾着的肉","翻面后刀紧贴骨头插入，挑断连接点并切断最后的粘连","香菇水富含鲜味物质，一定要保留并加入锅中"],"required":[["vibe-e5a4a7e9b8a1e885bf","2个","大鸡腿"],["vibe-e5b9b2e9a699e88f87","5粒","干香菇"],["ginger","2片","姜"],["scallion","2颗","葱"],["garlic","2瓣","蒜"],["vibe-e6b8a9e6b0b42833302d343020e2848329","150ml","温水(30-40 ℃)"]],"optional":[],"pantry":[["wine","15ml","料酒"],["soy","30ml","生抽"],["salt","1.5g","盐"],["darkSoy","15ml","老抽"],["sugar","15ml","糖"],["sesame","5ml","香油"]],"steps":[["泡发香菇","使用30-40 ℃温水泡发干香菇"],["准备辅料","姜切小块，葱切段，蒜对半切小粒"],["处理鸡腿","鸡腿去骨（可选），切成小块"],["处理香菇","泡发的香菇一分为四，香菇水留着备用"],["焯水","鸡腿肉焯水 1 分钟，去除血沫和杂质"],["腌制","鸡腿肉中加料酒 15ml、生抽 15ml、盐 1.5g、老抽 15ml，抓匀"],["煸炒鸡肉","油温 3 成，下入鸡腿肉煸炒，等鸡腿肉金黄后盛出备用"],["炒香底料","锅留底油，下入葱、姜、蒜炒香，香菇入锅，大火翻匀"],["混合焖煮","等待 20 秒飘出香味后，下入鸡腿肉、全部香菇水、糖 15ml、生抽 30ml"],["收汁装盘","转中火不盖盖，咕嘟 2 分钟收浓汤汁，淋入香油 5ml，撒上葱花后关火装盘"]]},
  {"id":"other_xiang-jian-qiao-zui-yu","name":"香煎翘嘴鱼","category":"水产","servings":2,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_xiang-jian-qiao-zui-yu.jpg","sourcePath":"dishes/aquatic/香煎翘嘴鱼/香煎翘嘴鱼.md","calories":820,"tips":["切记鱼是开背杀，腌制和晾晒时间控制在1-2天即可。","煎鱼全程保持小火，刚入锅时切勿移动，否则鱼皮会破。","里面的青椒吸收了鱼汤非常好吃，注意不要煮得太烂。","注意火候切换：前期煎鱼小火，中期焖煮中大火，后期收尾小火。"],"required":[["vibe-e7bf98e598b4e9b1bc","2斤","翘嘴鱼"],["ginger","20g","姜末"],["scallion","50g","葱"],["garlic","4个","蒜"],["vibe-e99d92e6a492","适量","青椒"],["vibe-e8b186e793a3e985b1","适量","豆瓣酱"],["chili","4-6个","干辣椒"],["vibe-e58d81e4b889e9a699","适量","十三香"]],"optional":[["cilantro","适量","香菜"],["darkSoy","2ml","老抽"]],"pantry":[["sugar","10g","白糖"],["wine","100ml","料酒"],["soy","4ml","生抽"],["salt","50g","盐"],["oil","100ml","食用油"],["vibe-e9b8a1e7b2be","适量","鸡精"],["vibe-e99988e9868b","适量","陈醋"]],"steps":[["宰杀清洗","鱼开背杀好（切记是开背，不要剖腹），清洗干净。"],["腌制入味","鱼表面涂抹均匀盐，倒入料酒80ml、姜末20g，放入冰箱保鲜层腌制1-2天。"],["晾晒脱水","取出腌好的鱼，用绳挂起晾晒至半干（约1-2天，视天气而定）。"],["烹前处理","食用前将鱼用清水清洗，彻底沥干水分。"],["热锅下鱼","大火烧热锅后转小火，倒油铺满锅面，将鱼沿锅边划入，先煎鱼背面。"],["定型控火","鱼入锅后不要急于移动，煎约30秒后再尝试晃动锅。"],["双面煎制","背面煎约1分钟后翻面，再煎1-2分钟，至两面金黄。"],["炒制佐料","将鱼推向锅边，在空位放入豆瓣酱炒香，随后放入姜蒜。"],["加水焖煮","炒香后加入料酒、生抽、老抽，倒入热水，水量与鱼平齐或略少。"],["调味收汁","改中大火煮5-10分钟，放入青椒段、白糖、鸡精、十三香、陈醋。"],["出锅装盘","转小火煮2-5分钟，放入葱和香菜，即可出锅。"]]},
  {"id":"other_xiang-jian-wu-hua-rou","name":"香煎五花肉","category":"荤菜","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_xiang-jian-wu-hua-rou.jpg","sourcePath":"dishes/meat_dish/香煎五花肉/香煎五花肉.md","calories":2985,"tips":["操作时，小心被溅出的油烫到","建议使用平底不粘锅，受热更均匀"],"required":[["vibe-e4ba94e88ab1e88289e69da1","1条(20cm*6cm*5cm)","五花肉条"],["lettuce","1朵","生菜"],["ginger","2片","姜"],["garlic","2朵","大蒜"],["vibe-e8b186e793a3e985b1","适量","豆瓣酱"]],"optional":[],"pantry":[["vibe-e985b1e6b2b9","8g","酱油"],["salt","1g","盐"],["vibe-e591b3e7b2be","1g","味精"],["wine","10g","料酒"],["oil","5ml","食用油"]],"steps":[["食材改刀","将五花肉条沿长边切片，每片厚 1mm-1.5mm，备用"],["腌制入味","将切好的五花肉放置碗中，依次加入 8g 酱油，1g 盐，1g 味精，10g 料酒，两片姜，两朵拍扁的大蒜腌制 10 分钟"],["准备生菜","将生菜叶直接用手扒下来，洗干净，备用"],["香煎五花肉","热锅，倒入 5ml 食用油。油轻微冒烟后下入五花肉。单面煎制焦黄色后翻面，另一边同理。"],["出锅装盘","五花肉出锅后，装盘。"],["抹酱食用","将豆瓣酱抹到菜叶上，卷着五花肉即可食用"]]},
  {"id":"other_xiang-la-ji-zhao-bao","name":"香辣鸡爪煲","category":"荤菜","servings":1,"minutes":45,"difficulty":"中等","coverPath":"ai-generated/other_xiang-la-ji-zhao-bao.jpg","sourcePath":"dishes/meat_dish/香辣鸡爪煲/香辣鸡爪煲.md","calories":986,"tips":["如果需要加入配菜（如土豆、豆皮等），请在放入鸡爪之前，底料炒香之后执行。"],"required":[["vibe-e9b8a1e788aa","500g","鸡爪"],["scallion","2根","小葱"],["ginger","10g姜末及适量姜片","姜"],["vibe-e9a699e58fb6","3片","香叶"],["garlic","10g蒜末","蒜"],["vibe-e5b08fe7b1b3e6a492","6个","小米椒"],["vibe-e4ba94e9a699e7b289","1g","五香粉"]],"optional":[["vibe-e8bea3e6a492e99da2","适量","辣椒面"]],"pantry":[["wine","15ml","料酒"],["starAnise","3个","八角"],["soy","适量","生抽"],["darkSoy","适量","老抽"],["oysterSauce","3g","蚝油"],["salt","适量","盐"],["vibe-e9b8a1e7b2be","适量","鸡精"]],"steps":[["食材预处理","给鸡爪剪去指甲。如果买的鸡爪只有脚掌部分，对半切开即可。如果是整只鸡爪，需要去骨。最后用清水洗干净。"],["焯水去腥","鸡爪冷水下锅，放入葱、姜、料酒，大火烧开后撇去表面的浮沫。"],["小火焖煮","锅中加入香叶、八角、生抽、老抽，盖上锅盖，转小火慢煮三十分钟。"],["留汤备用","捞出鸡爪，另外留取一小碗煮鸡爪的原汤备用。"],["炒制底料","起锅烧油，用小火炒香姜末、蒜末、小米椒，能吃辣的可再加入辣椒面。随后加入生抽、老抽、蚝油、五香粉、盐，炒出浓郁酱香味。"],["翻炒入味","放入煮好的鸡爪，加少许盐调味，翻炒一两分钟。倒入备好的鸡汤，边炒边搅动，使汤汁均匀包裹在鸡爪上。"],["收尾出锅","放入鸡精提鲜，撒入葱段搅拌均匀，即可出锅装盘。"]]},
  {"id":"other_xiang-qi-mi-fu-ya","name":"湘祁米夫鸭","category":"荤菜","servings":3,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_xiang-qi-mi-fu-ya.jpg","sourcePath":"dishes/meat_dish/湘祁米夫鸭/湘祁米夫鸭.md","calories":1332,"tips":["这是一道家乡特色菜，鸭子品种不限，水鸭价格适中且口感好","蒸制时间是关键：水鸭 20-25 分钟，老鸭需 1 小时以上","粘米粉、糯米粉、蒸肉粉的比例决定了最终粉子的口感和味道","辣椒粉和胡椒粉提供的是复合香味，可根据个人口味调整"],"required":[["vibe-e9b8ade5ad90","1000g","鸭子"],["vibe-e7b3afe7b1b3e7b289","100g","糯米粉"],["vibe-e7b298e7b1b3e7b289","300g","粘米粉"],["vibe-e892b8e88289e7b289","50g","蒸肉粉"],["vibe-e5a79ce8929c","20g","姜蒜"]],"optional":[["vibe-e7bb86e8bea3e6a492e7b289","50g","细辣椒粉"],["porkBelly","50g","五花肉"]],"pantry":[["whitePepper","5g","白胡椒粉"],["salt","10g","盐"],["oil","10g","食用油"],["water","100g","开水"]],"steps":[["准备米粉","将糯米粉、粘米粉、蒸肉粉、细辣椒粉、5 克盐、白胡椒粉倒一起搅匀。"],["食材预处理","鸭子剁成蒸煮块，姜切片，蒜子剥皮，五花肉切片备用。"],["煸炒出油","热锅凉油煸炒五花肉出油，再加食用油烧热，下入鸭子煸炒。"],["增香调味","鸭子煸炒到表皮焦变色，下入姜蒜和剩余的盐继续煸炒出香味。"],["裹粉翻炒","关小火倒入混合好的米粉翻炒，使鸭肉均匀裹满米粉子，随后少量多次地加入开水，边加边翻炒。"],["高压蒸制","待鸭肉和米粉有明显湿感后，铲出装入碗中，放入高压锅隔水蒸 20-25 分钟。"],["出锅装盘","出锅前撒上点葱花装饰，即可享用。"]]},
  {"id":"other_xiao-chao-huang-niu-rou","name":"小炒黄牛肉","category":"荤菜","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_xiao-chao-huang-niu-rou.jpg","sourcePath":"dishes/meat_dish/小炒黄牛肉/小炒黄牛肉.md","calories":619,"tips":["操作时，全程需要开大火"],"required":[["vibe-e7899be9878ce8848a","400g","牛里脊"],["celery","200g","芹菜"],["vibe-e5b08fe7b1b3e6a492","30g","小米椒"],["vibe-e9878ee5b1b1e6a492","30g","野山椒"],["cilantro","30g","香菜"]],"optional":[],"pantry":[["oil","15ml","食用油"],["vibe-e985b1e6b2b9","6ml","酱油"]],"steps":[["处理牛肉","牛里脊切成不超过 3cm 宽，3mm 厚的薄片，倒入 6ml 酱油，用手抓匀备用"],["处理芹菜","芹菜切成不超过 5cm 的小段，备用"],["处理小米椒","小米椒切成丝状，备用"],["处理野山椒","野山椒切成颗粒，备用"],["处理香菜","香菜切成成不超过 3cm 的小段，备用"],["热锅起油","热锅，锅内放入 15ml 食用油，大火等待 30 秒让油温升高"],["爆香配料","放入小米椒和野山椒爆香"],["大火快炒","放入牛里脊和芹菜，然后大火翻炒 1 分钟"],["撒香菜出锅","关火，撒上香菜，盛盘"]]},
  {"id":"other_xiao-chao-ji-gan","name":"小炒鸡肝","category":"荤菜","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/other_xiao-chao-ji-gan.jpg","sourcePath":"dishes/meat_dish/小炒鸡肝/小炒鸡肝.md","calories":760,"tips":["焯水时，需要注意观察沸腾的水位线，不要让水溢出避免发生危险。","焯完水的鸡肝建议用凉水冲洗，更推荐冰水，可以让口感更好。"],"required":[["vibe-e7949fe9b8a1e8829d","5个(约800g)","生鸡肝"],["vibe-e8929ce88b97","约200g","蒜苗"],["vibe-e5a4a7e891b1","150g","大葱"],["ginger","120g","姜"],["vibe-e4ba94e9a699e7b289","5g","五香粉"]],"optional":[["vibe-e783a7e783a4e69699e68896e5ad9ce784b6e7b289","10g","烧烤料或孜然粉"],["vibe-e88a9de9babb","5g","芝麻"]],"pantry":[["wine","30ml","料酒"],["salt","5g","食用盐"],["vibe-e9b8a1e7b2be","5g","鸡精"],["whitePepper","5g","胡椒粉"],["oil","30ml","食用油"]],"steps":[["食材预处理","鸡肝清洗干净；蒜苗切段；大葱100g切段、50g切片；姜70g切片、50g切丁。"],["鸡肝焯水","锅内加入凉水淹没鸡肝，放入葱段、姜片和料酒。大火烧开撇去浮沫，转中火煮5-10分钟。捞出过凉水洗净并切片。"],["爆香底料","中火热锅，入油加热10秒。放入50g葱片和50g姜丁翻炒爆香。"],["炒制鸡肝","加入鸡肝片翻炒至微微发黄，随后加入蒜苗翻炒30秒至断生，调至小火。"],["调味出锅","加入盐、鸡精、五香粉、胡椒粉、烧烤料。转大火快速翻炒30秒防止糊锅，关火盛出，撒芝麻装饰。"]]},
  {"id":"other_xiao-chao-ou-ding","name":"小炒藕丁","category":"素菜","servings":1,"minutes":20,"difficulty":"中等","coverPath":"ai-generated/other_xiao-chao-ou-ding.jpg","sourcePath":"dishes/vegetable_dish/小炒藕丁/小炒藕丁.md","calories":214,"tips":["食用莲藕要挑选外皮呈黄褐色、肉肥厚而白的。如果发黑，有异味，则不宜食用。","请尽量不要使用铁器，会导致莲藕发黑"],"required":[["vibe-e5a4a7e891b1","1 段","大葱"],["vibe-e5b08fe7b1b3e8bea3","1-2 根","小米辣"],["lotusRoot","1 段","莲藕"],["vibe-e88097e6b2b9","15 ml","耗油"]],"optional":[],"pantry":[["soy","30 ml","生抽"],["darkSoy","15 ml","老抽"],["oil","10-15 ml","食用油"]],"steps":[["切配辅料","大葱、小米辣切小段，备用。"],["处理莲藕","莲藕去皮，切成不超过 3cm 的小块，放入水中备用。"],["烧水","取炒锅，锅内放入 500ml 凉水，煮沸。"],["藕丁焯水","将藕丁下入沸水中，焯水 2 分钟后，取出放入盘中备用。"],["热锅凉油","将锅中水倒掉后，将锅加热干燥，加入 10-15 ml 食用油。"],["爆香辅料","待油温升高后，下入葱花，小米辣爆香。"],["下锅翻炒","将处理好的藕丁下入锅中，大火翻炒。"],["加入调料","加入生抽、老抽、耗油。"],["出锅","持续翻炒 2 分钟至入味均匀即可出锅。"]]},
  {"id":"other_xiao-long-xia","name":"小龙虾","category":"水产","servings":1,"minutes":45,"difficulty":"中等","coverPath":"ai-generated/other_xiao-long-xia.jpg","sourcePath":"dishes/aquatic/小龙虾/小龙虾.md","calories":571,"tips":["家庭制作推荐用比平时稍多的油煎代替油炸，既省油又美味","去虾线后的虾肉口感会比不去虾线的稍差，新手可根据需求选择","处理活虾时需注意安全，防止被钳伤"],"required":[["vibe-e5b08fe9be99e899be","2 斤","小龙虾"],["vibe-e9a699e58fb6","两片","香叶"],["vibe-e6a182e79aae","3 克","桂皮"],["vibe-e99d92e88ab1e6a492","10 克","青花椒"],["vibe-e88ab1e6a492","10 克","花椒"],["vibe-e5ad90e5bcb9e5a4b4e8bea3e6a492","5 克","子弹头辣椒"],["scallion","一根大葱","葱"],["ginger","30 克","姜"],["garlic","7 瓣大蒜","蒜"],["vibe-e983abe58ebfe8b186e793a3","30 克","郫县豆瓣"],["vibe-e9bb84e8b186e985b1","30 克","黄豆酱"],["vibe-e595a4e98592","500 毫升","啤酒"]],"optional":[],"pantry":[["oil","70 毫升","油"],["starAnise","一个","八角"],["soy","30 毫升","生抽"],["salt","10 克","盐"]],"steps":[["备料处理","小龙虾刷干净去虾线，葱切 2cm 葱段，姜蒜切末。"],["炒香料","烧油，油微热, 下香叶、八角、桂皮、青花椒、花椒、子弹头辣椒。"],["下葱姜蒜","香料出香气之后下锅葱姜蒜。"],["炒酱","葱姜蒜爆香后，加入郫县豆瓣、黄豆酱，炒出红油。"],["翻炒虾肉","下小龙虾，翻炒至变色。"],["加液调味","加入啤酒，等啤酒烧开后加入生抽，盐。"],["焖煮出锅","将小龙虾完全煮熟后出锅。"]]},
  {"id":"other_xin-jiang-da-pan-ji","name":"新疆大盘鸡","category":"荤菜","servings":2,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_xin-jiang-da-pan-ji.jpg","sourcePath":"dishes/meat_dish/新疆大盘鸡/新疆大盘鸡.md","calories":1108,"tips":["此做法非常适合搭配宽面（皮带面）食用。将粗面剂子压扁拉成宽面下好，放入大盘鸡中搅拌汤汁，味道极佳。","炒糖色是关键步骤，决定了成品颜色是否红亮。"],"required":[["vibe-e9b8a1e88289","1kg (约两个火枪腿)","鸡肉"],["potato","2个 (约750g)","土豆"],["vibe-e5a4a7e891b1","100g","大葱"],["vibe-e5b9b2e7babfe6a492","5个","干线椒"],["garlic","4瓣","大蒜"],["vibe-e88ab1e6a492","适量","花椒"],["vibe-e9a699e58fb6","适量","香叶"],["vibe-e9a699e69e9c","适量","香果"]],"optional":[["vibe-e88f9ce6a492","50g","菜椒"],["pepper","50g","甜椒"]],"pantry":[["sugar","20g","白糖"],["oil","50g","油"],["salt","5g","盐"],["soy","7ml","生抽"],["oysterSauce","10g","蚝油"],["wine","100g","料酒"],["water","1升","清水"]],"steps":[["鸡肉预处理","肉先剁好块状，用清水加盐浸泡 5 分钟，去除血水去腥，然后控干水。"],["蔬菜清洗","葱、蒜、辣椒、土豆等洗干净，土豆削皮。"],["切配辅料","葱白切成长约 4cm 的段，菜椒和线椒切成块状。"],["切土豆","土豆切成滚刀块，每一块大小约为 4cm*4cm。"],["炒糖色与上色","先将油加入锅中，放入白糖并用锅铲搅拌至化开，炒出焦黄色。倒入控干水的鸡肉翻炒上色。"],["加入干香料","放入花椒、香叶、香果、干线椒等进行翻炒。"],["调味加水","放入 5g 盐、生抽 7ml、蚝油 10g、料酒 100g（或啤酒），倒入 1 升清水。"],["焖炖入味","调至中火将水烧开，再转中小火慢炖入味。"],["放入土豆与配菜","当水收至鸡肉即将露出时，将土豆盖在锅表面（不要翻动），继续盖盖炖。随后放入大葱、菜椒和甜椒继续炖。"],["收汁出锅","炖到汁收得差不多时进行翻面，让土豆充分吸收汤汁，关火盛出。"]]},
  {"id":"other_xue-hua-su","name":"雪花酥","category":"甜品","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_xue-hua-su.jpg","sourcePath":"dishes/dessert/雪花酥/雪花酥.md","calories":1313,"tips":["棉花糖加热时间越长，最后成品口感越硬","必须使用不粘锅，否则清理会非常困难","制作过程中注意火候，全程建议使用小火"],"required":[["vibe-e697a0e79b90e9bb84e6b2b9","20g","无盐黄油"],["vibe-e6a389e88ab1e7b396","75g","棉花糖"],["vibe-e585a8e88482e5a5b6e7b289","40g","全脂奶粉"],["vibe-e6b7b7e59088e59d9ae69e9c","60g","混合坚果"],["vibe-e9a5bce5b9b2","75g","饼干"]],"optional":[],"pantry":[],"steps":[["预处理饼干","饼干若超过一元硬币大小，先手动切成或掰成小块。"],["融化黄油","将无盐黄油加入不粘锅中，开小火加热至完全融化。"],["融化棉花糖","棉花糖加入锅中，使用刮刀不断搅拌，直至棉花糖完全融化并与黄油均匀融合。"],["混合奶粉","将20g奶粉加入锅中，快速搅拌均匀后立即关火。"],["加入干果饼干","趁热将混合坚果与饼干倒入锅中，用刮刀初步搅拌。"],["手工揉拉","待温度降至手可接触时，戴上手套，在锅中搓揉或拿起拉扯，使棉花糖包裹住所有食材。"],["模具整形","将混合物压入模具，边角压实，用擀面杖擀平。未满处用手压成直边。"],["冷却切块与撒粉","室温放凉冷却后脱模，按纹路切块。撒上剩余奶粉，使每面均匀沾裹。"]]},
  {"id":"other_xue-jiang-ya","name":"血浆鸭","category":"荤菜","servings":1,"minutes":120,"difficulty":"较难","coverPath":"ai-generated/other_xue-jiang-ya.jpg","sourcePath":"dishes/meat_dish/血浆鸭/血浆鸭.md","calories":2482,"tips":["操作时，需要注意观察水位线，调整炉火大小，以防水烧干粘锅。","放入鲜鸭血时，需要不断翻炒搅拌，防止鸭血抱团凝固成块。"],"required":[["vibe-e9b29ce4bb94e9b8ade88289","2000g","鲜仔鸭肉"],["vibe-e9b29ce9b8ade8a180","250ml","鲜鸭血"],["ginger","6-9片","姜"],["vibe-e8929ce4bb94","6瓣","蒜仔"],["scallion","2根","香葱"],["vibe-e8bea3e6a492","1000g","辣椒"],["vibe-e98592","200ml","酒"]],"optional":[["vibe-e5b1b1e883a1e6a492e6b2b9","3-6滴","山胡椒油"]],"pantry":[["soy","10ml","生抽"],["wine","30ml","料酒"],["salt","8g","盐"],["vibe-e9b8a1e7b2be","5g","鸡精"]],"steps":[["处理鸭肉","鲜仔鸭肉切成约 3cm 小块，加料酒、姜片，去除血水。"],["大火翻炒","炒锅烧热，放入约 100ml 食用油，大火待油烧开，放入腌制好的鲜鸭肉，不断翻炒。"],["初次焖煮","待鸭肉完全变色（肉眼可见泛白），放入酒，再加入 200ml 开水，刚好淹没鸭肉即可，盖上锅盖中火煮 15 分钟。"],["加入姜蒜二次焖煮","水开之后，打开锅盖放入姜蒜，翻炒一遍，盖上锅盖持续加热 10 分钟。"],["加入辣椒与鸭血","打开锅盖放入辣椒，不断翻炒，待至肉眼可见辣椒炒软，放入鲜鸭血，此时需要不断翻炒，确保每块鸭肉和每片辣椒都有鸭血的浸润。"],["调味收尾","翻炒至肉眼可见鸭血均为黑色，加入盐，鸡精，香葱，（喜欢食用山胡椒油的朋友也可以在此时放入 3-6 滴山胡椒油）再次翻炒一到二次即可。"],["出锅","出锅盛盘，上桌食用。"]]},
  {"id":"other_yang-cong-chao-ji-dan","name":"洋葱炒鸡蛋","category":"素菜","servings":1,"minutes":5,"difficulty":"简单","coverPath":"ai-generated/other_yang-cong-chao-ji-dan.jpg","sourcePath":"dishes/vegetable_dish/洋葱炒鸡蛋/洋葱炒鸡蛋.md","calories":562,"tips":[],"required":[["egg","2个","鸡蛋"],["onion","50g","洋葱"],["scallion","半根","葱"]],"optional":[],"pantry":[["oil","50ml","食用油"],["salt","2g","盐"],["wine","2ml","料酒"]],"steps":[["备料搅拌","鸡蛋打入大碗中，加入洋葱片、盐后搅拌 60 S"],["炒制成型","起锅烧油，倒入鸡蛋，一面煎炸 30-45 S ，翻面继续翻炒，反复 2-3 分钟 后散上料酒出锅"],["装盘装饰","鸡蛋装盘，散上葱花"]]},
  {"id":"other_yang-pai-men-mian","name":"羊排焖面","category":"主食","servings":1,"minutes":90,"difficulty":"中等","coverPath":"ai-generated/other_yang-pai-men-mian.jpg","sourcePath":"dishes/meat_dish/羊排焖面/羊排焖面.md","calories":1616,"tips":["可以用超市买的现成面条代替手工面，但建议选择宽面以获得更好口感。","炖羊肉的水量要预留足够，因为面皮会吸收大量汤汁。","和面时一定要有醒面的过程，否则面皮不够筋道。"],"required":[["vibe-e5b8a6e79aaee7be8ae68e92","500g","带皮羊排"],["vibe-e99d92e6a492","2个","青椒"],["pepper","2个","甜椒"],["flour","300g","中筋面粉"],["ginger","4片","生姜"],["vibe-e5a4a7e891b1","1段","大葱"],["vibe-e88ab1e6a492","1小把","花椒"],["chili","3-5个","干辣椒"]],"optional":[],"pantry":[["water","180ml","水"],["salt","适量(面团3g+炖肉适量)","盐"],["sugar","适量","白砂糖"],["darkSoy","适量","老抽"]],"steps":[["羊排焯水","羊肉冷水下锅焯水，水开了之后把血沫撇掉，捞出羊肉。"],["准备辅料","切好生姜（4片），放入干辣椒与花椒在碗里备用。"],["炒糖色","在炒锅加入稍多一点油。油热之后，放入白砂糖，给羊肉炒出焦糖色。"],["调味翻炒","羊肉水份炒干之后，放入盐、老抽，以及备好的调味料（姜、辣椒、花椒）。"],["炖煮羊排","加入清水没过羊肉，大火煮沸之后，继续煮10分钟，之后转小火炖煮30分钟。"],["和面醒面","面粉加盐和水混合均匀，揉至光滑，醒面10分钟后再次揉匀，再醒5分钟。"],["制备面皮","把面团揉成条，切成6到8个小剂子，抹上油等待5分钟后擀成面皮。"],["焖煮面皮与配菜","放入切好的青椒、甜椒、大葱，将面皮一片一片铺在羊肉上，翻炒均匀或盖盖焖煮4分钟。"],["出锅","确保面皮熟透，收汁均匀后即可出锅。"]]},
  {"id":"other_yang-rou-tang","name":"羊肉汤","category":"汤","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_yang-rou-tang.jpg","sourcePath":"dishes/soup/羊肉汤/羊肉汤.md","calories":599,"tips":["加入开水时，注意要开大火，使油脂与汤汁更好的融合","焯水时使用冷水，炖汤时使用开水，这是保证汤鲜肉嫩的秘诀","白胡椒粉的量可根据个人口味增减，怕膻的可以多放一点"],"required":[["vibe-e7be8ae88289e68896e7be8ae69d82","300g","羊肉或羊杂"],["vibe-e5a4a7e891b1","50g","大葱"]],"optional":[["vibe-e5ad9ce784b6e7b289","1g","孜然粉"],["cilantro","20g","香菜"]],"pantry":[["oil","10ml","食用油"],["wine","20ml","料酒"],["water","1000ml","开水"],["whitePepper","1g","白胡椒粉"],["salt","5g","食用盐"]],"steps":[["切制羊肉","羊肉切成长 5cm 宽 0.5cm 的块"],["准备配料","大葱切成小段"],["冷水下锅","羊肉放入锅中，加入 1000ml 常温水，加入料酒、大葱"],["焯水洗净","煮沸 2 分钟后，捞出羊肉，使用常温水洗净，沥干水分"],["煸炒羊肉","热锅加入食用油，加入羊肉，翻炒 2 分钟至羊肉表面微黄"],["加入开水","加入开水，开到大火档位"],["大火炖煮","5 分钟后，加入白胡椒粉、盐，继续煮沸 5 分钟"],["调味出锅","出锅之后，加入香菜、孜然粉，搅拌均匀"]]},
  {"id":"other_yang-shuo-pi-jiu-yu","name":"阳朔啤酒鱼","category":"水产","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_yang-shuo-pi-jiu-yu.jpg","sourcePath":"dishes/aquatic/阳朔啤酒鱼/阳朔啤酒鱼.md","calories":1092,"tips":["鱼鳞是这道菜的关键特色，一定要保留，煎炸后会变得酥脆可口","鱼剖成两半更容易煎透入味，比整条划刀效果更好","正宗做法使用桂林辣椒酱，没有可以用蒜蓉辣酱代替","番茄要炒软出汁，这样汤汁更浓郁","汤汁不要收太干，留一些拌饭或拌面非常好吃"],"required":[["vibe-e58991e9aaa8e9b1bce68896e9b2a4e9b1bc","1.5斤(约750g)","剑骨鱼或鲤鱼"],["vibe-e6bc93e6b389e595a4e98592","1瓶(330ml)","漓泉啤酒"],["tomato","2个(约300g)","番茄"],["vibe-e99d92e6a492","2个(约150g)","青椒"],["vibe-e7baa2e6a492","1个(约80g)","红椒"],["garlic","6瓣(约30g)","大蒜"],["ginger","1块(约20g)","生姜"],["scallion","2根(约40g)","葱"],["vibe-e6a182e69e97e8bea3e6a492e985b1","15g","桂林辣椒酱"]],"optional":[],"pantry":[["wine","15ml","料酒"],["soy","15ml","生抽"],["darkSoy","5ml","老抽"],["sugar","5g","白糖"],["salt","8g","食盐"],["oil","30ml","食用油"]],"steps":[["腌制鱼肉","鱼处理好内脏，保留鱼鳞，清洗干净，从腹部剖开成两半（背部相连），用 15ml 料酒、姜片、食盐 3g 腌制 15 分钟"],["切配准备","番茄切块，青椒红椒切块，大蒜拍碎，生姜切片，葱切段（葱白葱叶分开）"],["煎制鱼肉","用姜片擦拭锅底，热锅后倒入 30ml 食用油，油热后放入鱼（鱼皮朝下），煎至两面金黄、鱼鳞酥脆，盛出备用"],["爆香底料","锅中留底油，放入葱白、姜片、蒜瓣爆香"],["炒制辣椒酱","加入 15g 桂林辣椒酱，炒出红油"],["炒制番茄","放入番茄块，翻炒至番茄出汁变软"],["调味并加入啤酒","倒入整瓶啤酒，加入 15ml 生抽、5ml 老抽、5g 白糖、5g 食盐，搅拌均匀"],["焖煮鱼肉","放入煎好的鱼，大火烧开后转中小火，盖上锅盖焖煮 15-20 分钟"],["加入配椒","开盖，放入青椒红椒块，继续煮 3-5 分钟"],["大火收汁","大火收汁至汤汁浓稠，撒上葱叶段，出锅装盘"]]},
  {"id":"other_yang-zhou-chao-fan","name":"扬州炒饭","category":"主食","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_yang-zhou-chao-fan.jpg","sourcePath":"dishes/staple/扬州炒饭/扬州炒饭.md","calories":1769,"tips":["如做完后胳膊酸痛为正常现象，需加强上肢锻炼","超市有青豆，胡萝卜，玉米粒的混合冷冻包装，可以使用这个省去切丁的烦恼，推荐 Pams Mixed Veges 或类似产品"],"required":[["rice","500g","冷饭"],["egg","2-3个","鸡蛋"],["vibe-e586b7e586bbe58ebbe5a4b4e58ebbe79aaee59fbae59bb4e899be","10-15只","冷冻去头去皮基围虾"],["vibe-e58d88e9a490e88289e7bd90e5a4b4","150g","午餐肉罐头"],["peas","30g","青豆"],["carrot","30g","胡萝卜"],["scallion","1根","葱"]],"optional":[["corn","30g","玉米粒"]],"pantry":[["oil","30-40ml","油"],["salt","12-15g","盐"]],"steps":[["胡萝卜切丁","将胡萝卜切成 0.2cm*0.2cm*0.2cm 的小丁，备用。"],["午餐肉切丁","将午餐肉切成 0.2cm*0.2cm*0.2cm 的小丁，备用。"],["切葱段","葱分别取葱白和葱绿，各切成 0.25-0.5cm 的小段，分开备用。"],["准备蛋液","在碗中打入鸡蛋液，均匀搅拌，备用。"],["焯熟蔬菜","将胡萝卜，青豆，玉米粒煮熟捞出，备用（保留煮菜的水）。"],["煮虾","将虾放入刚才煮蔬菜的水中煮熟，捞出备用。"],["滑蛋","热锅热油，第二次倒油需使用 20-30ml 油，待油热后缓慢倒入鸡蛋液，不要搅拌。"],["捞出鸡蛋","鸡蛋凝固后立刻捞出，备用。"],["预炒配料","将午餐肉，青豆，胡萝卜，玉米粒，虾倒入锅中翻炒 1-2 分钟，装盘备用。"],["清理锅底","用水冲一下锅，将杂物冲干净，保证锅内干净无杂质。"],["爆香葱白","热锅热油(10ml)，将葱白放入爆香。"],["炒散米饭","调至小火，放入米饭，用铲子快速砸击米饭并翻炒，保证米饭均匀沾到油且粒粒分明。"],["混合鸡蛋","倒入鸡蛋，继续砸击，使鸡蛋碎开并与米饭充分混合。"],["大火合炒","转大火，倒入其他所有备用配料，快速翻炒 1-2 分钟。"],["调味","撒入盐，并翻炒至充分混合。"],["最后增香","撒入葱绿，翻炒 1 分钟。"],["出锅","关火，装盘。"]]},
  {"id":"other_yi-shi-rou-jiang-mian","name":"意式肉酱面","category":"主食","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/other_yi-shi-rou-jiang-mian.jpg","sourcePath":"dishes/staple/意式肉酱面/意式肉酱面.md","calories":1199,"tips":["意大利面分为很多不同的粗细，煮面条之前请注意意面盒子上标注的时间","意大利面酱并不是番茄酱（番茄沙司），加的调味料不同，购买时需注意区分"],"required":[["vibe-e6848fe5a4a7e588a9e99da2","180g","意大利面"],["vibe-e88289e6b2ab","80g","肉沫"],["vibe-e799bde6b48be891b1","150g","白洋葱"],["vibe-e6848fe5a4a7e588a9e99da2e985b1","300g","意大利面酱"]],"optional":[],"pantry":[["oil","10-15ml","食用油"]],"steps":[["煮意面","锅中加水，烧开后放入意面，根据包装指示煮 6 - 12 分钟。"],["准备配菜","在煮面的同时，将洋葱切成小丁。"],["炒制洋葱","空锅中倒油，中火下入洋葱碎，时刻搅拌直到洋葱变成半透明状。"],["炒肉沫","下入肉沫继续搅拌，将其搅散，直到肉末完全变成棕色。"],["混合酱汁","加入意大利面酱，稍微搅拌均匀即可。"],["拌面出锅","把煮好的意大利面沥干水分，倒入肉酱中搅拌均匀（或将肉酱淋在面上）。"]]},
  {"id":"other_yin-er-lian-zi-zhou","name":"银耳莲子粥","category":"主食","servings":1,"minutes":30,"totalMinutes":210,"waitMinutes":180,"difficulty":"中等","coverPath":"ai-generated/other_yin-er-lian-zi-zhou.jpg","sourcePath":"dishes/soup/银耳莲子粥/银耳莲子粥.md","calories":282,"tips":["当银耳呈现粘稠状态时，需要用勺子及时搅拌，防止银耳糊在锅底"],"required":[["vibe-e993b6e880b3","60g","银耳"],["vibe-e58ebbe5bf83e88eb2e5ad90","20g","去心莲子"],["vibe-e7baa2e69ea3","6g","红枣"]],"optional":[["vibe-e69eb8e69d9e","5-6g","枸杞"]],"pantry":[["rockSugar","10-20g","冰糖"]],"steps":[["食材浸泡","把银耳、莲子用清水浸泡 2 个小时，红枣浸泡 10 - 20 分钟，枸杞洗净，备用"],["烧水入料","在锅中倒入 600ml 水，烧开后依次放入银耳、莲子、红枣"],["中火焖煮","等待水再次烧开后，盖上锅盖，转至中火继续熬"],["初步调味","熬到大约 1 小时后，放入 5g - 10g 冰糖和 5g - 6g 枸杞，转至小火熬"],["小火慢炖","小火继续熬 30 分钟，此时银耳开始呈现粘稠状态"],["二次调味与搅拌","再次放入 5g - 10g 冰糖，用勺子搅拌 5 - 10 分钟"],["关火出锅","关火，用勺子盛出"]]},
  {"id":"other_ying-shi-si-kang","name":"英式司康","category":"甜品","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_ying-shi-si-kang.jpg","sourcePath":"dishes/dessert/英式司康/英式司康.md","calories":1197,"tips":["最简单的分切方案是擀成圆形面皮，用刀切成 6 个扇形"],"required":[["vibe-e697a0e79b90e9bb84e6b2b9","40g","无盐黄油"],["vibe-e4bd8ee7ad8be99da2e7b289","180g","低筋面粉"],["vibe-e6b3a1e68993e7b289","5g","泡打粉"],["egg","1个(约50g)","鸡蛋"],["vibe-e6b7a1e5a5b6e6b2b9","45g","淡奶油"]],"optional":[["vibe-e5a5b6e6b2b9e5a5b6e985aa","50g","奶油奶酪"]],"pantry":[["sugar","30g","糖"],["salt","1g","盐"]],"steps":[["准备蛋奶液","鸡蛋打散，称量出 30g 蛋液放入干净容器中，放入全量淡奶油和奶油奶酪混合均匀。"],["混合干粉","将低筋面粉，盐，糖，泡打粉放入干净容器中混合均匀。"],["搓入黄油","黄油切成小块，放入上一步的混合物中，用手将黄油捏入混合物中。"],["合成面团","将第一步的蛋奶混合液倒入上一步得到的粉油混合物中，搅拌均匀，叠压成均匀面团。"],["擀压分切","面团放到案板上，擀成 1.5cm 厚的面片，用刀或者模具分切成合适的形状。"],["表面刷蛋液","用刷子蘸取剩余的 20g 鸡蛋液，刷在司康表面。"],["烘烤","烤箱预热 180 度，烤制 27 分钟。"]]},
  {"id":"other_you-men-da-xia","name":"油焖大虾","category":"水产","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/other_you-men-da-xia.jpg","sourcePath":"dishes/aquatic/油焖大虾/油焖大虾.md","calories":584,"tips":["做法参考老饭骨泰斗级大师还原的真味道","炼油火候至关重要，不可使葱姜变黑","焖煮过程中必须保证密封性，中途不可添水"],"required":[["vibe-e9bb91e8998ee899be2fe6988ee899be","10只","黑虎虾/明虾"],["scallion","50g","葱"],["ginger","20g","姜"],["vibe-e6a48de789a9e6b2b9","适量","植物油"],["vibe-e88ab1e6a492","5g","花椒"]],"optional":[],"pantry":[["wine","30g","黄酒"],["salt","3g","盐"],["rockSugar","10g","冰糖"]],"steps":[["食材处理","剪去虾枪、虾须和虾爪，挑出头部沙包。从背部剪开挑出虾线，洗净备用。"],["炸制葱油","冷油下花椒，三成热后油热离火。放入葱段和姜片，待葱稍微变黄后捞出沥干油，留油备用。"],["煎虾调味","下葱油，将虾整齐摆放，煎至两面变色。轻轻按压虾头挤出虾脑。加入姜米、30g黄酒、两小碗水、3g盐和10g冰糖。"],["焖烧","大火烧开后，转小火盖上锅盖焖煮。直到虾身弯曲且虾皮发亮。"],["摆盘与收汁","将虾先捞出摆盘。将锅中汤汁过滤杂质后倒回锅中，加入少许葱油，大火收汁至剩余1/4时关火。"],["浇汁完成","将浓缩好的汤汁均匀浇在摆好的虾身上即可。"]]},
  {"id":"other_you-po-la-zi","name":"油泼辣子","category":"酱料","servings":1,"minutes":10,"difficulty":"中等","coverPath":"ai-generated/other_you-po-la-zi.jpg","sourcePath":"dishes/condiment/油泼辣子/油泼辣子.md","calories":1854,"tips":["五香粉、草寇作为调料加入，可以显著增加油泼辣子的香味层次","掌握油温是成功的关键，建议使用厨房温度计","泼油时分次倒入可以更好地控制辣椒的焦香味"],"required":[["garlic","1个","蒜头"],["vibe-e5b9b2e8bea3e6a492e99da2","100g","干辣椒面"],["vibe-e7869fe799bde88a9de9babb","15g","熟白芝麻"],["vibe-e5b08fe7b1b3e6a492","1个","小米椒"],["vibe-e88ab1e6a492","20-50粒","花椒"],["vibe-e9a699e58fb6","2-3片","香叶"],["vibe-e799bde88ab7","2-3片","白芷"]],"optional":[["vibe-e4ba94e9a699e7b289","10g","五香粉"],["vibe-e88d89e5af87","1个","草寇"],["scallion","3-5根","小葱"],["ginger","大拇指粗细量","姜片"],["vibe-e591b3e7b2be","适量","味精"]],"pantry":[["salt","5g","盐"],["vibe-e88ab1e7949fe6b2b9","150ml","花生油"],["starAnise","1个","八角"],["sugar","30g","糖"],["vibe-e799bde9868b","5ml","白醋"]],"steps":[["处理蒜头","拿出蒜头掰 2 个小蒜头去皮。"],["剁碎辅料","拿出砧板剁碎小蒜头、小米椒。"],["准备油脂","拿出碗倒入花生油。"],["炼香料油","油热放入八角、花椒、香叶、白芷等配料和小葱，等到香料变焦，捞出扔掉。"],["高温加热","拿出铁锅将碗内的油放入加热 2 分钟（若使用菜籽油需烧至冒烟）。"],["准备干料混合物","往空碗加入干辣椒面、白芝麻、蒜末、小米椒、盐、五香粉、草寇作为'调料'。"],["控制油温","关火将油温冷却至 210 摄氏度。"],["泼油搅拌","将锅内热油倒入碗内并用勺子搅拌即可。"],["白醋增香","倒入热油稍微搅拌后放入白醋，此时会重新沸腾。继续进行搅拌，使白醋增香。"],["调味收尾","油泼辣子冷却到温热放白糖和味精进行最后调味。"]]},
  {"id":"other_yu-mi-pai-gu-tang","name":"玉米排骨汤","category":"汤","servings":1,"minutes":90,"difficulty":"中等","coverPath":"ai-generated/other_yu-mi-pai-gu-tang.jpg","sourcePath":"dishes/soup/玉米排骨汤/玉米排骨汤.md","calories":1724,"tips":["这道菜制作起来并不难，而且食材简单，对新手友好","适合降温的时候来上一大碗","水要一次性加足，中途加水会冲淡汤的鲜味"],"required":[["ribs","500-800g","排骨"],["vibe-e78e89e7b1b3","1-2根","玉米"],["carrot","1-2根","胡萝卜"],["ginger","适量（大片）","生姜"],["vibe-e5a4a7e891b1","小半根","大葱"],["vibe-e9bb91e883a1e6a492e7b289","4g","黑胡椒粉"],["scallion","1根","香葱"]],"optional":[],"pantry":[["oil","10ml","食用油"],["vinegar","10ml","醋"],["wine","10ml","料酒"],["salt","10-15g","食用盐"],["water","1000ml","开水"]],"steps":[["切葱段","大葱切成 3-4cm 的大段，用刀背拍一下"],["玉米改刀","玉米剁成小块"],["胡萝卜改刀","胡萝卜切成滚刀块"],["准备姜片","生姜去皮切大片"],["排骨改刀","新鲜的排骨砍成小块"],["排骨焯水","排骨凉水下锅，放入大葱、生姜、料酒开始焯水，大火烧开，撇去浮沫，捞出排骨，沥干水分"],["煸炒排骨","热锅凉油，切大片的生姜和排骨一起下锅煸炒，待排骨表面微微焦黄，放入醋，继续煸炒一分钟"],["冲入开水","冲入开水，一次给足，之后就不要再加了，大火烧开"],["炖玉米","先下入玉米，放入胡椒粉，盖盖小火炖二十分钟"],["炖胡萝卜","然后放入胡萝卜，盖盖继续小火炖四十分钟"],["最后调味","出锅前三分钟，放入盐，最后撒上一把小葱花即可"]]},
  {"id":"other_yu-ni-xue-mei-niang","name":"芋泥雪媚娘","category":"甜品","servings":1,"minutes":120,"difficulty":"较难","coverPath":"ai-generated/other_yu-ni-xue-mei-niang.jpg","sourcePath":"dishes/dessert/芋泥雪媚娘/芋泥雪媚娘.md","calories":160,"tips":["制作时最好佩戴不粘手套","制作完即可食用，不用再加热","冷藏后口感更佳"],"required":[["vibe-e88d94e6b5a6e88a8be5a4b4","200g","荔浦芋头"],["vibe-e7b4abe896afe7b289","3g","紫薯粉"],["milk","165g","牛奶"],["vibe-e7b3afe7b1b3e7b28920612028e6898be7b289e794a829","50g","糯米粉 a (手粉用)"],["vibe-e7b3afe7b1b3e7b28920622028e99da2e79aaee794a829","75g","糯米粉 b (面皮用)"],["vibe-e9bb84e6b2b9","30g","黄油"],["vibe-e6b7a1e5a5b6e6b2b9","145g","淡奶油"]],"optional":[],"pantry":[["starch","22g","玉米淀粉"],["sugar","76g","白砂糖"]],"steps":[["蒸煮芋头","芋头切块，大火煮熟至软（40 分钟即可），全部放入料理机"],["初步打泥","向料理机内加入 30g 牛奶，25g 淡奶油，将其打成泥状"],["调色及调味","再向内加入 3g 紫薯粉，18g 白砂糖，继续搅拌打成细腻芋泥"],["制作面糊并蒸制","取碗加入全部糯米粉 b，22g 玉米淀粉，135g 牛奶，50g 白砂糖，混匀并过筛一遍，盖上保鲜膜并扎小洞，中火蒸半小时"],["炒制手粉","将糯米粉 a 放入平底锅小火翻炒至微微发黄（即炒熟），作为手粉备用"],["揉捏面团并冷藏","将蒸好的混合物趁热加入 30g 黄油，揉至面团完全吸收，然后放冰箱冷藏一小时"],["打发奶油","取碗加入 120g 淡奶油，8g 白砂糖，打发至有纹路，装进裱花袋备用"],["包制雪媚娘","取出冷藏面团揉捏 5 分钟，分成 30g 一个，撒上 2g 手粉擀成圆形，挤入 5g 奶油和 30g 芋泥，像包包子一样包起"],["最后处理","包好后再均匀撒 2g 手粉防粘"],["批量制作","重复以上包制步骤直至原材料用光"]]},
  {"id":"other_yu-xiang-qie-zi","name":"鱼香茄子","category":"素菜","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/other_yu-xiang-qie-zi.jpg","sourcePath":"dishes/meat_dish/鱼香茄子/鱼香茄子.md","calories":579,"tips":["茄子看个人喜好，可以去皮，肉沫也可以多放一点。"],"required":[["eggplant","2 根","茄子"],["vibe-e88289e69cab","20g","肉末"],["vibe-e6b0b4e6b780e7b289","100ml","水淀粉"],["vibe-e8b186e793a3e985b1","20-30g","豆瓣酱"]],"optional":[["scallion","适量","小葱"],["ginger","适量","姜"],["garlic","适量","蒜"],["vibe-e5b08fe7b1b3e8bea3","适量","小米辣"]],"pantry":[["salt","3-5g","盐"],["sugar","5-10g","糖"],["vibe-e591b3e7b2be","5g","味精"],["soy","10ml","生抽"],["darkSoy","5ml","老抽"],["vinegar","10ml","醋"]],"steps":[["茄子切条","将茄子洗净并切成条状。"],["准备配料","将肉切成肉沫，葱姜蒜切碎、小米椒切丁。"],["调制鱼香汁","取一碗，放入盐、味精、糖、生抽、老抽、醋、水淀粉搅拌均匀。"],["油炸茄子","锅中倒入 300ml 油，开小火，油温七成热（约40秒，有烟冒出）放入茄子炸两分钟，当茄子边缘微黄就捞出。多出的油盛出。"],["煸炒肉末","锅中留 15-30ml 油，倒入肉沫炒至颜色变白后盛出备用。"],["炒香底料","锅中再倒入 15-30ml 油，放入豆瓣酱、葱白、姜、蒜炒香，然后倒入肉沫翻炒均匀。"],["烩制起锅","加入 80-150ml 清水，倒入茄子和料汁，爆炒入味收汁。最后放入葱翻炒均匀即可。"]]},
  {"id":"other_zha-shu-tiao","name":"炸薯条","category":"素菜","servings":1,"minutes":25,"difficulty":"简单","coverPath":"ai-generated/other_zha-shu-tiao.jpg","sourcePath":"dishes/semi-finished/炸薯条/炸薯条.md","calories":1132,"tips":["番茄酱、蛋黄酱、蜂蜜芥末酱、蒜香酱油……炸薯条的晋级之路在于对酱料及酱料组合的探究","不同品牌的空气炸锅火力不同，需根据实际情况微调时间","不建议等薯条软化后再炸制，否则会影响口感"],"required":[["vibe-e58d8ae68890e59381e896afe69da1","400g","半成品薯条"]],"optional":[["oil","少许","食用油"]],"pantry":[],"steps":[["开封薯条","开封大分量半成品薯条"],["预热空气炸锅","插电，设置 200℃ 预热 5 分钟"],["炸制薯条","将冷冻薯条放入锅内，200℃ 炸 20 分钟"],["可选脆化","在炸制 10-15 分钟时，向薯条表面喷一层油"],["取出装盘","根据口味喜好取出薯条并装盘"]]},
  {"id":"other_zha-xian-nai","name":"炸鲜奶","category":"甜品","servings":1,"minutes":80,"difficulty":"中等","coverPath":"ai-generated/other_zha-xian-nai.jpg","sourcePath":"dishes/dessert/炸鲜奶/炸鲜奶.md","calories":1026,"tips":["煮牛奶时必须小火慢煮，才能均匀受热","奶糊下锅时油温不能过高或过低，最好保持在 5 分热","冷藏定型的时间必须保证，否则难以切块"],"required":[["milk","250g","牛奶"],["vibe-e99da2e58c85e7b3a0","100g","面包糠"],["egg","2个","鸡蛋"]],"optional":[],"pantry":[["starch","30g","玉米淀粉"],["sugar","30g","白糖"]],"steps":[["混合奶液","将牛奶倒入碗中"],["加入配料","加入玉米淀粉和白糖，搅拌均匀"],["模具准备","将模具刷上食用油"],["初次加热","牛奶下锅，中火烧开"],["熬煮奶糊","烧开后转小火，边煮边搅拌"],["装模","牛奶变粘稠后出锅，倒入模具"],["冷藏定型","将模具放冰箱冷却 1 小时"],["切条","拿出，切成大小均匀的条，随后放入碗中"],["初裹面包糠","向碗中倒入一半的面包糠，奶糊裹上后取出，备用"],["准备蛋液","在一个新碗中打入鸡蛋，搅匀，备用"],["复裹挂浆","将奶糊裹上蛋液和剩余的面包糠"],["油炸过程","锅中倒入足以覆盖奶糊的油，下锅"],["出锅摆盘","奶糊外观呈金黄状态后停火，摆盘"]]},
  {"id":"other_zhe-tang-tang-jiang","name":"蔗糖糖浆","category":"酱料","servings":1,"minutes":5,"difficulty":"简单","coverPath":"ai-generated/other_zhe-tang-tang-jiang.jpg","sourcePath":"dishes/condiment/蔗糖糖浆/蔗糖糖浆.md","calories":400,"tips":["水无论冷热都可，如果比较急用，可用热水溶解后再冷却糖浆。","配制好的糖浆不会轻易变质，在冷藏状态下保存一周通常是没问题的。"],"required":[],"optional":[],"pantry":[["sugar","100g","白砂糖"],["water","100g","水"]],"steps":[["混合溶解","将称好的白砂糖的饮用水于容器混匀"],["封存冷藏","容器封盖放冰箱冷藏"]]},
  {"id":"other_zheng-xiang-ji-dan-geng","name":"蒸箱鸡蛋羹","category":"早餐","servings":1,"minutes":15,"difficulty":"中等","coverPath":"ai-generated/other_zheng-xiang-ji-dan-geng.jpg","sourcePath":"dishes/vegetable_dish/鸡蛋羹/蒸箱鸡蛋羹.md","calories":118,"tips":["水温控制在60度左右有利于蛋白质凝固且口感细腻","过滤是保证蛋羹表面如镜面的关键"],"required":[["egg","1个","鸡蛋"],["vibe-3630e5baa6e7baafe58780e6b0b4","鸡蛋体积1.0-1.5倍","60度纯净水"]],"optional":[["vibe-e7949fe68abd202f20e591b3e69e81e9b29c","6ml","生抽 / 味极鲜"]],"pantry":[["salt","1g","食用盐"],["oil","5ml","食用油"]],"steps":[["打散鸡蛋","一个鸡蛋放入碗中打散"],["加入温水","向碗中加入鸡蛋体积 1.0-1.5 倍 60 度纯净水，并且搅拌均匀"],["调底味","加入食用盐 1g"],["加入油脂","加入食用油 5ml"],["过滤蛋液","过滤蛋液，去掉蛋液中的浮沫"],["检查水源","确认蒸箱的水源已经补充至足够（若不确定，可把水槽补满）"],["放入蒸箱","将已经完全搅拌均匀的鸡蛋液碗放入蒸箱"],["开始烹饪","调节至100摄氏度蒸 10 分钟"],["开启蒸箱","打开蒸箱"],["出锅调味","出锅（可加入生抽调味）"],["享用","趁热享用"]]},
  {"id":"other_zhi-ma-shao-bing","name":"芝麻烧饼","category":"主食","servings":7,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/other_zhi-ma-shao-bing.jpg","sourcePath":"dishes/staple/烧饼/芝麻烧饼.md","calories":282,"tips":["如果没有电饼铛，也可以用平底锅，需注意火候防止烙糊","芝麻如果没有也可不用，一样好吃"],"required":[["flour","330g (300g用于面团，30g用于油酥)","面粉"],["vibe-e985b5e6af8de7b289","3g","酵母粉"],["vibe-e58d81e4b889e9a699","4g","十三香"]],"optional":[["vibe-e799bde88a9de9babb","适量","白芝麻"]],"pantry":[["sugar","3g","白糖"],["water","180g (40℃)","温水"],["oil","40g+适量刷油","食用油"],["salt","2g","盐"]],"steps":[["制作面团","将300克面粉、3克酵母粉、3克白糖、180克温水和20克食用油混合，揉成面团，醒面10分钟"],["制作油酥","在小碗中放入30克面粉、2克盐、4克十三香和20克食用油，拌匀后静置备用"],["成型加工","将面擀成长方形，抹上调好的油酥，从一头卷起，切成7个面剂子。对折后用虎口收拢，先沾水再沾白芝麻，最后擀成小圆饼"],["烙制成熟","电饼铛预热倒入凉油铺满锅底，放入饼胚，上方也刷点油涂匀。盖上盖子选大饼档，听到提示音后出锅"]]},
  {"id":"other_zhi-zhu-yang-nan-bao","name":"枝竹羊腩煲","category":"荤菜","servings":1,"minutes":150,"difficulty":"较难","coverPath":"ai-generated/other_zhi-zhu-yang-nan-bao.jpg","sourcePath":"dishes/meat_dish/枝竹羊腩煲/枝竹羊腩煲.md","calories":2391,"tips":["此菜属于粤菜，正宗做法多会添加马蹄。考虑到萝卜青菜各有所爱，也可根据个人口味替换成土豆、萝卜等其他食材。","炖煮过程中若水分流失过快，请补充热水而非冷水。","炸腐竹浸泡时间不宜过长，否则焖煮时容易碎烂。"],"required":[["vibe-e7be8ae885a9","500g","羊腩"],["vibe-e782b8e88590e7abb9","30g-50g","炸腐竹"],["vibe-e69fb1e4beafe985b1","30g","柱侯酱"],["vibe-e88590e4b9b3","40g","腐乳"],["vibe-e58d97e4b9b3","35g","南乳"],["vibe-e8bea3e6a492e6b2b9","5ml","辣椒油"],["vibe-e7a082e7b396","10g","砂糖"],["scallion","5根","小葱"],["ginger","6-8片","姜片"],["mushroom","7-8个","香菇"],["vibe-e6b48be891b12fe7baa2e891b1e5a4b4","1个/4-5个","洋葱/红葱头"],["garlic","7-8瓣","蒜瓣"],["vibe-e9a699e58fb6","1片","香叶"],["vibe-e6a182e79aae","10g","桂皮"]],"optional":[["vibe-e9a9ace8b9842fe59c9fe8b1862fe8909de58d9c","适量","马蹄/土豆/萝卜"]],"pantry":[["darkSoy","5ml","老抽"],["wine","适量","料酒"],["oysterSauce","适量","蚝油"],["water","500ml","清水"],["rockSugar","20g","冰糖"],["starAnise","4-5个","八角"]],"steps":[["食材预处理","香菇提前浸泡 2 - 3 小时至变软。腐竹提前浸泡 30 分钟至变软。"],["调制焖煮酱汁","准备酱汁 1: 南乳、柱侯酱、20g 腐乳、老抽放入同个小碗中搅拌均匀。"],["调制蘸酱","准备酱汁 2: 20g 腐乳、砂糖、辣椒油放入同个小碗搅拌均匀。"],["处理配菜","泡好的香菇去除根部；腐竹切成 5cm 的小段并挤干水分；洋葱切丝或红葱头去皮；小葱切 5cm 葱段。"],["羊腩焯水","羊腩冷水下锅，放入 2 - 3 片姜片，大火煮至水滚后关火。"],["冷水激肉","捞出羊腩，放入准备好的冷水盆中放凉。"],["爆香佐料","锅烧热后放入冷油，放入姜片、洋葱/红葱头、葱白段、蒜瓣进行爆香。"],["煸炒羊腩","放入冷却好的羊腩，翻炒大约 2 - 5 分钟直至出现金黄色。"],["上色调味","放入调好的酱汁 1，翻炒大约 2 分钟至颜色均匀。"],["加入汤底与香料","倒入清水至刚好没过食材，放入香菇、冰糖、香叶、八角、桂皮。"],["漫长炖煮","加盖转小火炖 90 分钟。"],["加入腐竹","开盖加入腐竹，加盖转中火煮 20 分钟。"],["最后提味","开盖加入酱汁 2 搅拌均匀，关火，出锅前加入葱绿段或香菜。"]]},
  {"id":"other_zhong-shi-xian-bing","name":"中式馅饼","category":"主食","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/other_zhong-shi-xian-bing.jpg","sourcePath":"dishes/staple/中式馅饼/中式馅饼.md","calories":1265,"tips":["将肉沫和胡萝卜末加入面糊后，应该尽量搅匀，保证味道扩散到饼内各处。","肉沫和胡萝卜末即馅料可以使用各类熟馅料替代。","新手制作时请务必严格掌握火候，建议全程小火。"],"required":[["flour","200g","面粉"],["vibe-e88289e6b2ab","50g","肉沫"],["garlic","2 瓣","蒜头"],["vibe-e5a4a7e891b1","1/4 根","大葱"]],"optional":[["vibe-e9a38ee591b3e8b083e69699","3g","风味调料"],["egg","1 个","鸡蛋"],["carrot","适量","胡萝卜"]],"pantry":[["oil","30ml","油"],["salt","3g","盐"],["sugar","5g","糖"],["starch","10g","生粉"],["vibe-e985b1e6b2b9","5g","酱油"]],"steps":[["腌制肉沫","取肉沫，加入 1/2 的调料（油、盐、糖、酱油、风味调料）和全部生粉，搅拌均匀。"],["调制面糊","面粉中加入鸡蛋、剩余 1/2 调料及面粉量 1/2 的水，搅拌成粘稠可流动的面糊。"],["处理蔬菜","蒜头切末，大葱切段，胡萝卜切成细碎的末。"],["炒制馅料","热锅宽油，爆香蒜末，加入肉沫翻炒至断生，再加入胡萝卜末炒至油呈金黄色。"],["混合面糊","关火冷却 2 分钟后，将炒好的肉沫倒入生面糊中彻底搅匀。"],["煎制饼底","平底锅铺底油，小火将面糊倒入铺平，趁表面未凝固撒上葱段。"],["双面煎烤","小火煎至底面凝固后翻面，另一面也煎至凝固，最后每面各加煎 20 秒。"]]},
  {"id":"other_zhu-guo-zheng-mi-fan","name":"煮锅蒸米饭","category":"主食","servings":1,"minutes":25,"difficulty":"简单","coverPath":"ai-generated/other_zhu-guo-zheng-mi-fan.jpg","sourcePath":"dishes/staple/米饭/煮锅蒸米饭.md","calories":418,"tips":["锅盖的密封性对最终口感影响很大"],"required":[["vibe-e58c97e696b9e5a4a7e7b1b3","100ml-200ml/人","北方大米"]],"optional":[],"pantry":[["water","米的体积的 2 倍","水"]],"steps":[["清洗大米","将准备好的北方大米淘洗干净，去除表面多余淀粉。"],["米水入锅","将洗净的米和按比例（1:2）准备的水加入厚底煮锅中。"],["大火煮沸","开启大火加热，直到锅内的水开始剧烈沸腾。"],["搅拌防粘","在水沸腾后，用勺子搅拌一下锅底，防止米粒粘在锅底。"],["小火焖煮","盖上严丝合缝的锅盖，将火调至最小，加热 10-15 分钟。"],["关火静置","关火，利用余温继续焖 5 分钟。"],["享用","打开锅盖，用饭勺轻轻拨散米饭，装碗食用。"]]},
  {"id":"other_zhu-hou-niu-nan","name":"柱候牛腩","category":"荤菜","servings":2,"minutes":180,"difficulty":"中等","coverPath":"ai-generated/other_zhu-hou-niu-nan.jpg","sourcePath":"dishes/meat_dish/柱候牛腩/柱候牛腩.md","calories":980,"tips":["操作高压锅要注意安全，确保排气后再开盖","普通炖煮约需 3 小时，用高压锅则约 1 小时即可完成","如果觉得不够咸加盐或生抽，不够甜则加糖"],"required":[["beefBrisket","500-600g","牛腩"],["vibe-e69fb1e58099e985b1","50g","柱候酱"],["vibe-e983abe58ebfe8b186e793a3e985b1","15g","郫县豆瓣酱"],["vibe-e58d97e88590e4b9b3","2块","南腐乳"],["vibe-e88ab1e99b95e98592","10g","花雕酒"],["vibe-e799bde98592","20g","白酒"],["ginger","30g","姜"],["garlic","半头","蒜"],["vibe-e9a699e58fb6","2片","香叶"],["vibe-e88ab1e6a492","0.5g","花椒"],["chili","3个","干辣椒"],["vibe-e4b881e9a699","3个","丁香"],["vibe-e79498e88d89","2片","甘草"]],"optional":[["vibe-e58f89e783a7e985b1","20g","叉烧酱"],["vibe-e5b08fe7b1b3e8bea3","1条","小米辣"]],"pantry":[["oysterSauce","20g","蚝油"],["darkSoy","5g","老抽"],["soy","60g","生抽"],["starAnise","2个","八角"],["rockSugar","10g","冰糖"]],"steps":[["准备辅料","分碗准备好姜蒜、香料、南乳、豆瓣酱、冰糖、酒类及混合酱料。"],["牛腩焯水","牛腩不用切，冷水下锅，大火煮沸后捞出。"],["切块备用","冲洗净表面杂质，将牛腩切成 4cm*4cm*4cm 的大块，控干水分。"],["炒香姜蒜辣椒","大火热锅下油，倒入碗1（姜、蒜、小米辣）炒香。"],["炒制香料","转中小火，倒入碗2（香叶、花椒、八角等）翻炒约30秒。"],["加入南乳","中小火放入碗3（南乳），用锅铲压碎。"],["加入豆瓣酱","中小火放入碗4（豆瓣酱），翻炒均匀约30秒。"],["融化冰糖","中小火放入碗5（冰糖），炒至完全融化。"],["牛腩上色","下入牛腩块，中小火翻炒至牛肉均匀上色。"],["淋酒提香","大火沿锅边淋入碗6（酒），快速翻炒至表面略微焦褐。"],["炒制酱汁","倒入碗7（复合酱料），翻炒至汤汁浓稠并冒小气泡。"],["转移炖煮","将食材转移至炖锅或高压锅，加水淹过食材。"],["焖炖阶段","根据锅具选择：普通锅小火炖3小时；高压锅压40分钟。"],["最终调味","开盖尝味，根据咸甜度补加盐、生抽或糖。"],["捞出牛腩","将炖好的牛腩先捞出备用。"],["煮制配菜（可选）","放入萝卜或土豆片，煮10-15分钟（高压锅加压5分钟）。"],["合并食材","将煮好的配菜与牛腩放在一起。"],["过滤淋汁","将锅中汤汁过滤掉残渣，淋入碗中即可。"]]},
  {"id":"other_zhu-pi-dong","name":"猪皮冻","category":"荤菜","servings":1,"minutes":40,"totalMinutes":1440,"waitMinutes":1400,"difficulty":"中等","coverPath":"ai-generated/other_zhu-pi-dong.jpg","sourcePath":"dishes/meat_dish/猪皮冻/猪皮冻.md","calories":1630,"tips":["做猪皮冻最忌讳直接下锅煮，一定要先处理干净","一定要用白醋和盐不断搓洗猪皮，这样保证煮好的猪皮晶莹剔透，而且还没腥味"],"required":[["vibe-e78caae79aae","1kg","猪皮"],["scallion","10g","葱"],["ginger","20g","姜片"],["vibe-e88ab1e6a492","5g","花椒"]],"optional":[["vibe-e799bde88ab7e38081e6a182e79aaee38081e4b881e9a699e38081e9a699e58fb6e38081e5b08fe88cb4e9a699","适量","白芷、桂皮、丁香、香叶、小茴香"]],"pantry":[["water","4kg","水"],["salt","13g","盐"],["vibe-e591b3e7b2be","10g","味精"],["vibe-e9b8a1e7b2be","15g","鸡精"],["soy","50ml","生抽"],["darkSoy","20ml","老抽"],["starAnise","10g","八角"],["wine","50ml","料酒"],["vibe-e799bde9868b","20g","白醋"]],"steps":[["浸泡与汆烫","将猪皮剁成不超过 10cm 小块，用清水浸泡 12 小时，然后冷水下锅，加入姜 10g、料酒 50ml 后，汆烫 5-10 分钟，捞出放入冷水中"],["剔除油脂与切条","将焯过水的猪皮放到案板上，将里面的白肉部分全部剔除，然后再切成成不超过 3mm 的长条，放入盆中"],["白醋盐搓洗","加入白醋 20g，盐 5g，用力搓洗 3 分钟，再用清水洗净"],["煲煮猪皮","锅内加入 4kg 水，放入猪皮，葱 10g，姜片 10g，八角 10g，花椒 5g，大火烧开后，小火煲煮 90 分钟至猪皮软烂"],["调味与晾凉","加入盐 8g、味精 10g、鸡精 15g、生抽 50ml、老抽 20ml 调味后，倒入盘中，将葱姜，八角拣出，晾凉至果冻状"],["冷藏与切片","放冰箱冷藏即可，食用时，切成小块或者厚片"]]},
  {"id":"other_zhu-que-tang","name":"朱雀汤","category":"汤","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/other_zhu-que-tang.jpg","sourcePath":"dishes/soup/朱雀汤/朱雀汤.md","calories":168,"tips":["鸡蛋一定要打散，水一定要在沸腾冒泡状态倒入鸡蛋液中，否则汤可能会浑浊影响口感","此为豫东地区做法，其他地区有不放白糖放盐的，口味不同，根据个人口味调整","此汤乃去火神器！"],"required":[["egg","1个","鸡蛋"],["vibe-e9a699e6b2b9efbc88e88a9de9babbe6b2b9efbc89","2ml","香油（芝麻油）"]],"optional":[],"pantry":[["water","500ml","水"],["sugar","20g","白糖"]],"steps":[["准备蛋液","鸡蛋在碗中打散，再倒入香油。"],["冲入沸水","水烧开后，在沸腾状态下快速倒入盛有鸡蛋的碗中。"],["调味搅拌","放入白糖。"]]},
  {"id":"other_zi-bo-shao-kao","name":"淄博烧烤","category":"荤菜","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/other_zi-bo-shao-kao.jpg","sourcePath":"dishes/meat_dish/淄博烧烤/淄博烧烤.md","calories":650,"tips":["五花肉切片时建议放入冰箱冷冻 30 分钟后再切，更易切块。","炭火烤制风味优于燃气，有条件建议使用木炭。","酱料可根据个人口味调整芝麻酱与甜面酱的比例，也可以换成芝麻盐。"],"required":[["vibe-e78caae4ba94e88ab1e88289","200g","猪五花肉"],["vibe-e5b08fe89684e9a5bc","5张","小薄饼"],["vibe-e5a4a7e891b1","1根(约100g)","大葱"],["vibe-e88a9de9babbe985b1","20g","芝麻酱"],["vibe-e7949ce99da2e985b1","15g","甜面酱"]],"optional":[["vibe-e88a9de9babbe79b90","适量","芝麻盐"]],"pantry":[],"steps":[["准备肉串","五花肉切成厚度不超过 2cm 长的块，并串成串。"],["处理大葱","大葱切成 5cm 长的葱段，备用。"],["调制酱料","芝麻酱加 10ml 温水调稀，与甜面酱混合均匀。"],["点火备炉","点燃炭火，等待炭火烧至通红无明火状态。"],["开始烤制","将五花肉串均匀摆在在烤网上，烤至底面焦黄出油后翻面。"],["完成烤肉","继续烤制约 2 - 3 分钟，至两面焦黄、边缘微焦后取下。"],["抹酱准备","取一张小薄面饼平铺，抹上 3 - 4g 混合酱料。"],["卷饼食用","放上烤好的肉片和 1 - 2 段大葱，卷起即可食用。"]]},
  {"id":"other_zui-pai-gu","name":"醉排骨","category":"荤菜","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/other_zui-pai-gu.jpg","sourcePath":"dishes/meat_dish/醉排骨/醉排骨.md","calories":934,"tips":["鱼露，又称鱼酱油，是一种广东、福建等地常见的调味品，效果类似于生抽但更鲜香","如果没有鱼露，可以用老抽代替，但排骨颜色会偏黑，正常成色应该是金黄色"],"required":[["ribs","200g","排骨"],["vibe-e9b1bce99cb2","5ml","鱼露"],["vibe-e88a9de9babb","5g","芝麻"],["vibe-e795aae88c84e985b1","5g","番茄酱"],["garlic","2粒","蒜头"],["scallion","1根","葱"],["vibe-e59cb0e7939ce7b289","30g","地瓜粉"],["vibe-e9b8a1e89b8be9bb84","1个","鸡蛋黄"]],"optional":[],"pantry":[["sugar","10g","白砂糖"],["oil","500ml","食用油"],["vibe-e9a699e9868b","5ml","香醋"]],"steps":[["清洗排骨","排骨中加入 5 g 地瓜粉和水进行搅拌，清洗 2-3 遍后放入大碗备用"],["挂糊腌制","排骨中加入鱼露、地瓜粉、鸡蛋黄 充分搅拌"],["初次下锅","将排骨一个一个放入锅中（切记不可以整碗倒入），保证每个不要粘在一起"],["油炸定型","全部放入后，每 30 S 用勺子来回两面翻转瘦肉块，直至排骨表面金黄"],["复炸酥脆","取出排骨，一分钟后倒入油锅中继续炸，直至瘦肉块表面出现焦黄后，取出放入大碗备用"],["调制醉汁","准备一个小碗，加入蒜末、香醋、白砂糖、鱼露、番茄酱、葱花、芝麻搅拌均匀，倒入 5 ml 热油"],["混合装盘","将汤汁浇灌入排骨，在充分搅拌后倒入盘中"]]},
  {"id":"semi-finished_ban-cheng-pin-yi-mian-de-zuo-fa","name":"半成品意面的做法","category":"半成品加工","servings":2,"minutes":2,"difficulty":"简单","coverPath":"ai-generated/semi-finished_ban-cheng-pin-yi-mian-de-zuo-fa.jpg","sourcePath":"dishes/semi-finished/半成品意面.md","calories":578,"tips":["不同类型的意面烧制时长有所不同，这里是意大利直面的标准。","传统意大利面非常长。20 世纪下半叶开始流行短的意大利粉，典型长度 25–30 cm。","“Spaghettoni”是较厚的意大利粉，“Spaghettini”较细，“capellini”是更细版的意大利面。","微波炉法：将面、酱、水混合后 700W 加热 2 分钟，取出拌匀即可。"],"required":[["vibe-e58d8ae68890e59381e6848fe5a4a7e588a9e99da2","1袋(约260g)","半成品意大利面"],["vibe-e9858de5a597e985b1e69699","1袋","配套酱料"]],"optional":[],"pantry":[["water","50ml","清水"]],"steps":[["热锅并加水","热锅，将 50 ml 清水倒入平底锅"],["炒制面条","将面条放入锅中，翻炒 1 分钟"],["加入酱料","将酱料倒入，继续翻炒 1 分钟"],["装盘","将炒好的意面盛入盘中即可"]]},
  {"id":"semi-finished_jia-chang-liang-pi","name":"家常凉皮","category":"半成品加工","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/semi-finished_jia-chang-liang-pi.jpg","sourcePath":"dishes/semi-finished/凉皮.md","calories":761,"tips":["个人口味根据地区、天气、时间均有不同，调料的具体使用量请据个人情况而定。","超市购买的凉皮表面油较多，建议务必清洗。","盐和香醋的比例是大众口味，可根据个人喜酸/咸程度微调。"],"required":[["vibe-e58789e79aae","300g","凉皮"],["vibe-e99da2e7ad8b","适量","面筋"],["vibe-e88a9de9babbe985b1","30g","芝麻酱"],["cucumber","100g","黄瓜"],["beanSprout","50g","绿豆芽"],["garlic","10g","大蒜"]],"optional":[["vibe-e8bea3e6a492e6b2b9","适量","辣椒油"]],"pantry":[["salt","8g","盐"],["vibe-e9b8a1e7b2be","5g","鸡精"],["soy","10g","生抽"],["darkSoy","2g","老抽"],["oysterSauce","5g","蚝油"],["vibe-e9a699e9868b","5g","香醋"],["sesame","1g","香油"]],"steps":[["烧水","锅中加入 500ml 水并煮沸。"],["焯烫豆芽","将绿豆芽放入锅中，大火煮 60 秒。捞出后迅速过凉水，放入盘中备用。"],["处理黄瓜","将黄瓜洗净切丝，放入盘中备用。"],["制作蒜泥","将 10g 蒜瓣剥皮放入蒜臼，加入 1g 盐锤成蒜泥，再加入 10g 水混合均匀备用。"],["清洗凉皮面筋","用自来水清洗凉皮和面筋表面的油脂。清洗后用手轻轻挤出面筋中的多余水分。"],["调配盐水","小碗中加入 3g 盐、2g 鸡精、5g 生抽、1g 老抽、1g 香油、2g 蚝油、5g 香醋及 25-35g 温水，搅拌至溶解并冷却。"],["调配芝麻酱","在芝麻酱中加入 4g 盐、3g 鸡精、5g 生抽、1g 老抽、3g 蚝油拌匀。分 2-3 次加入共计约 30g 清水，每次加入后均充分搅拌至所需浓稠度。"],["混合装碗","盆中放入凉皮，倒入盐水拌匀后盛入碗中。依次放上豆芽、面筋，淋上芝麻酱，最后撒上黄瓜丝。"],["最后调味","根据个人喜好加入辣椒油，搅拌均匀即可享用。"]]},
  {"id":"semi-finished_niu-you-huo-guo-di-liao","name":"牛油火锅底料","category":"半成品加工","servings":1,"minutes":60,"difficulty":"较难","coverPath":"ai-generated/semi-finished_niu-you-huo-guo-di-liao.jpg","sourcePath":"dishes/semi-finished/牛油火锅底料.md","calories":585,"tips":["操作时请务必擦干手上和工具上的水滴，以免油锅爆炸造成严重烧伤","炒制过程中要时刻观察火候，豆瓣和辣椒一旦炒焦，整锅料会发苦","香料的比例可以根据个人喜好微调，但丁香和草果不可过量","建议在通风良好的环境下操作，因为气味非常浓烈"],"required":[["vibe-e7899be6b2b9","4500g","牛油"],["vibe-e889b2e68b89e6b2b9e68896e88f9ce7b1bde6b2b9","1000ml","色拉油或菜籽油"],["vibe-e7baafe78caae6b2b9","500g","纯猪油"],["vibe-e983abe58ebfe8b186e793a3","1000g","郫县豆瓣"],["vibe-e7b38de7b291e8bea3e6a492","3000g","糍粑辣椒"],["vibe-e88081e5a79c","250g","老姜"],["vibe-e5a4a7e891b1","100g","大葱"],["onion","100g","洋葱"],["garlic","200g","大蒜"],["vibe-e6b0b8e5b79de8b186e8b189","10g","永川豆豉"],["vibe-e8b186e6af8de5ad90","140g","豆母子"],["vibe-e7baa2e88ab1e6a492","150g","红花椒"],["vibe-e9baa6e88abde7b289","12.5g","麦芽粉"],["vibe-3532e5baa6e799bde98592","150ml","52度白酒"],["vibe-e5b1b1e5a588","5g","山奈"],["vibe-e88d89e69e9c","10g","草果"],["vibe-e88289e6a182","10g","肉桂"],["vibe-e4b881e9a699","5g","丁香"],["vibe-e5b08fe88cb4e9a699","10g","小茴香"],["vibe-e799bde88ab7","10g","白芷"],["vibe-e88d9ce68ba8","5g","荜拨"],["vibe-e9a699e88d89","10g","香草"],["vibe-e9a699e69e9c","10g","香果"],["vibe-e5b1b1e6a582","10g","山楂"],["vibe-e99988e79aae","5g","陈皮"],["vibe-e9a699e88c85","10g","香茅"],["vibe-e7a082e4bb81","10g","砂仁"],["vibe-e799bde894bb","10g","白蔻"],["vibe-e9a699e58fb6","10g","香叶"]],"optional":[["vibe-e9a297e7b292e9a699e69699","100g","颗粒香料"],["vibe-e695b4e5bda2e9a699e69699","150g","整形香料"],["vibe-e5b9b2e8bea3e6a492e99da2","15g","干辣椒面"]],"pantry":[["starAnise","10g","八角"]],"steps":[["牛油去腥处理","锅置旺火放入牛油烧至八成热(240±10°C)，放入老姜、大葱、洋葱、大蒜各100g，炸干后捞出，以吸尽牛油腥味。"],["炒制糍粑辣椒","向锅中加入色拉油（或菜籽油）和纯猪油，待油温降至五成热(150±10°C)时放入糍粑辣椒，持续翻炒 5-8 分钟。"],["炒制豆瓣","放入豆瓣炒散，转用中小火慢炒，直至料渣略微发白且呈现翻砂状态（发出沙沙声）。"],["加入姜蒜调味","观察油液呈现樱桃红色时，放入剩余的姜片(150g)和大蒜(100g)炒香，约 15 秒。"],["加入辅料与花椒","放入剁碎的豆豉、豆母子炒香，随后放入红花椒和小茴香继续炒制。"],["加入核心香料","若制作老油则放入颗粒香料，否则放入整形香料翻炒均匀。"],["调味收尾","放入麦芽粉炒散，最后倒入白酒炒匀即可起锅。"],["底料静置熟化","将底料装入容器，置于 10-20°C 环境下静置 5 天，待其味道融合后再使用。"],["火锅老油炼制（可选）","底料加干辣椒面静置24小时后，加水烧开撇沫，中小火熬25-30分钟，过滤去渣后油水分离，最后将油炼干水分即成老油。"]]},
  {"id":"semi-finished_su-dong-hun-tun-de-zuo-fa","name":"速冻馄饨的做法","category":"半成品加工","servings":1,"minutes":55,"difficulty":"简单","coverPath":"ai-generated/semi-finished_su-dong-hun-tun-de-zuo-fa.jpg","sourcePath":"dishes/semi-finished/速冻馄饨.md","calories":540,"tips":["使用的烹饪工具不同速冻馄饨可能有不同的做法，这里仅介绍使用「电饭煲」的做法","出锅后也可以加入水煮荷包蛋（太阳蛋）一起食用"],"required":[["vibe-e9809fe586bbe9a684e9a5a8","12-20个","速冻馄饨"]],"optional":[["salt","适量","盐"],["vibe-e9b8a1e7b2be","适量","鸡精"],["whitePepper","适量","胡椒粉"],["sesame","适量","香油"],["cilantro","1根","香菜"]],"pantry":[["water","600ml","水"]],"steps":[["烧开水","将水倒入电饭煲中，按炖或煮的模式运行 35 分钟。"],["下馄饨","将速冻馄饨小心放入水中，如果馄饨有调料包，此时可一并加入水中。"],["煮馄饨","盖上电饭煲，按同样炖或煮的模式运行 20 分钟。"],["盛馄饨与调味","将所有馄饨连同汤水盛入碗中。若无调料包，此时加入盐、鸡精、胡椒粉、香油，并可撒上香菜。"]]},
  {"id":"semi-finished_su-dong-shui-jiao","name":"速冻水饺","category":"半成品加工","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/semi-finished_su-dong-shui-jiao.jpg","sourcePath":"dishes/semi-finished/速冻水饺.md","calories":502,"tips":["建议尝试黑醋搭配姜丝作为蘸料，味道更丰富","蘸料中加入 1~3 滴香油可以增香","加入蒜泥可提升风味，但需注意社交场合口气问题","必须及时刷锅，否则面粉形成的黏性物质很难清理"],"required":[["vibe-e9809fe586bbe6b0b4e9a5ba","1袋","速冻水饺"]],"optional":[["vibe-e9bb91e9868b","10-20ml","黑醋"],["ginger","1小块(50g)","姜"],["sesame","2-3滴","香油"],["garlic","3瓣/人","大蒜"]],"pantry":[["water","饺子体积的2倍","饮用水"]],"steps":[["煮水","中火，将水倒入锅中，静候水煮沸。"],["预处理","倒入锅前可以适当将饺子用水过一下。"],["下饺子","将饺子倒入沸水中。"],["初次搅拌","用炒菜勺子或铲子搅动锅内的水。"],["间歇摇晃","平均每 30 秒摇 3 秒，直到饺子浮起。"],["观察与点水","水再次煮沸后，若面皮夹生可舀入 80ml 凉水降温，继续煮至沸腾。重复此操作最多两次。"],["装盘","所有饺子浮起后（下饺子后约 8 分钟），用铲子或漏勺把饺子盛入盘或碗中。"],["清洁","吃完后等锅内水温降低，将水倒掉并用洗洁精及时刷锅。"]]},
  {"id":"soup_chen-pi-pai-gu-tang","name":"陈皮排骨汤","category":"汤","servings":1,"minutes":120,"difficulty":"中等","coverPath":"ai-generated/soup_chen-pi-pai-gu-tang.jpg","sourcePath":"dishes/soup/陈皮排骨汤/陈皮排骨汤.md","calories":357,"tips":["煲汤盅很烫，拿的时候小心别烫到或者手滑摔破","广东老火靓汤，讲究用料和火候，只要备好料和炖够一定时辰，就算大功告成！"],"required":[["ribs","4-5 块","排骨"],["vibe-e99988e79aae","1 瓣","陈皮"],["vibe-e8a5bfe6b48be58f82","9 片","西洋参"],["vibe-e79fb3e6969b","6 颗","石斛"],["vibe-e78e89e7abb9","5 片","玉竹"],["vibe-e9baa6e586ac","7 个","麦冬"]],"optional":[],"pantry":[["salt","5g","食盐"]],"steps":[["排骨焯水","排骨用热水过一边，去除血水和杂质。"],["清洗药材","将陈皮、麦冬、玉竹、石斛和西洋参用清水冲洗干净。"],["清洗容器","将煲汤盅彻底清洗干净备用。"],["放入食材","打开煲汤盅，先放入排骨铺在底部，然后依次放入陈皮、麦冬、玉竹、石斛和西洋参。"],["加入热水","向煲汤盅内加入热水，注意水不宜太满，留出一定空间。"],["隔水炖煮","在外部煲汤容器中加入足量水，放入炖盅，慢炖 1.5 小时。"],["调味饮用","加入食盐调味，搅拌均匀后趁热饮用。"]]},
  {"id":"soup_fan-qie-niu-rou-dan-hua-tang","name":"番茄牛肉蛋花汤","category":"汤","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/soup_fan-qie-niu-rou-dan-hua-tang.jpg","sourcePath":"dishes/soup/番茄牛肉蛋花汤.md","calories":262,"tips":["可以根据个人口味加入一定的醋或糖来调整酸甜口感","如果喜欢辣味，可以加入一定的辣椒或辣椒酱来调味","牛肉切得越薄，煮的时间越短，口感越嫩"],"required":[["vibe-e7899be88289","150g","牛肉"],["tomato","1个","番茄"],["egg","1个","鸡蛋"]],"optional":[["scallion","适量","葱"],["ginger","2-3片","姜"],["garlic","2瓣","蒜"]],"pantry":[["salt","2g","盐"],["whitePepper","0.5g","胡椒粉"]],"steps":[["食材改刀","将牛肉切成薄片，番茄切成小块，葱切葱花，姜切片，蒜剁成蒜泥。"],["牛肉腌制","牛肉放入碗中，加入盐和胡椒粉抓匀，静置腌制 15-20 分钟。"],["煮开水并下料","锅中加水烧开，放入姜片和腌制好的牛肉片，煮至牛肉变色。"],["加入番茄","加入切好的番茄块，继续煮至番茄变软出汁。"],["淋入蛋液","鸡蛋打散成液，缓慢倒入锅中，同时用筷子轻轻搅拌形成漂亮的蛋花。"],["调味出锅","加入剩余的盐和胡椒粉调味，撒上葱花即可出锅。"]]},
  {"id":"soup_huang-gua-pi-dan-tang","name":"黄瓜皮蛋汤","category":"汤","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/soup_huang-gua-pi-dan-tang.jpg","sourcePath":"dishes/soup/黄瓜皮蛋汤.md","calories":311,"tips":["黄瓜可以根据喜好决定是否去皮","黄瓜薄片可以用刮皮刀刮，口感更佳","皮蛋切块时抹点香油不容易粘刀","使用猪油可以使汤色更浓白"],"required":[["cucumber","1 根","黄瓜"],["vibe-e79aaee89b8b","2 个","皮蛋"],["garlic","2 瓣","大蒜"],["scallion","适量","小葱"],["vibe-e9a39fe794a8e6b2b9efbc88e68ea8e88d90e78caae6b2b9efbc89","10-15 g","食用油（推荐猪油）"]],"optional":[["vibe-e9b8a1e7b2be","0.5-1 g","鸡精"]],"pantry":[["salt","2-3 g","盐"],["water","400-500 ml","水"]],"steps":[["处理黄瓜","黄瓜洗净，切成 0.5-1.2 mm 厚的薄片"],["处理辅料","葱洗净切成末，蒜用刀拍几下去皮，对半切一下"],["切皮蛋并下锅","皮蛋剥去壳，然后每个切成 6-8 份。锅里倒入油，放入切好的皮蛋和大蒜"],["煸炒并煮汤","小火炒至皮蛋和大蒜表面有些焦黄，加入水，转大火烧开"],["加入黄瓜并调味","放入黄瓜片。水再次沸腾以后立马关火，放入盐、鸡精调味即可出锅"],["装碗点缀","装入碗中，再撒上葱花即可"]]},
  {"id":"soup_jin-zhen-gu-tang","name":"金针菇汤","category":"汤","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/soup_jin-zhen-gu-tang.jpg","sourcePath":"dishes/soup/金针菇汤.md","calories":149,"tips":["如果喜欢在汤里加入鸡蛋，可在步骤 3 中水沸腾之后将打散的鸡蛋液倒入锅中。","出锅后可加入 3-4 滴香油（或者麻油）增香。"],"required":[["enoki","400-500克","金针菇"]],"optional":[["egg","1-2个","鸡蛋"],["vibe-e9a699e6b2b92fe9babbe6b2b9","3-4滴","香油/麻油"]],"pantry":[["salt","15克","食盐"],["vibe-e591b3e7b2be","5克","味精"]],"steps":[["处理金针菇","金针菇徒手掰散，越散越好不然容易藏牙，洗净备用。"],["切段","用菜刀或者水果刀将上述金针菇段段切，可依据个人喜好，但长度不宜超过 5 cm。"],["入锅煮制","将金针菇放入锅中，加水没过约食材总高度 1.1 倍，沸腾后等待 3 分钟。"],["调味","加入味精和食盐并搅拌。"],["装盘","继续加热约 30 秒，关火装盘。"]]},
  {"id":"soup_la-ba-zhou","name":"腊八粥","category":"汤","servings":1,"minutes":180,"difficulty":"中等","coverPath":"ai-generated/soup_la-ba-zhou.jpg","sourcePath":"dishes/soup/腊八粥.md","calories":2042,"tips":["往粥锅加入食材时，应当进行搅拌，使食材原料均匀分布，并注意观察水位线，如低于食材应立即补水。","注意控制火候不要过大，定时搅拌。普通锅建议烧开水后再下原料，搅拌到再次烧开改小火，避免糊底。","如果有条件，建议改用高压锅或专用粥锅，效果更佳且更省心。","米类总量不建议超过150g，豆类不建议超过50g，以免粥体过稠。"],"required":[["vibe-e5a4a7e7b1b3","50 g","大米"],["vibe-e7b3afe7b1b3","50 g","糯米"],["vibe-e88ab1e7949f","25 g","花生"],["vibe-e7baa2e8b186","25 g","红豆"],["vibe-e7baa2e69ea3","25 g","红枣"]],"optional":[["vibe-e8968fe7b1b3","50 g","薏米"],["vibe-e9bb91e7b1b3","50 g","黑米"],["vibe-e5b08fe7b1b3","50 g","小米"],["vibe-e88eb2e5ad90","25 g","莲子"],["vibe-e7bbbfe8b186","25 g","绿豆"],["vibe-e9bb84e8b186","25 g","黄豆"],["peas","25 g","豌豆"],["vibe-e7baa2e885b0e8b186","25 g","红腰豆"],["vibe-e6a182e59c86","25 g","桂圆"],["vibe-e6a097e5ad90","25 g","栗子"],["vibe-e58ebbe5a3b3e6a0b8e6a183","25 g","去壳核桃"],["vibe-e891a1e89084e5b9b2","25 g","葡萄干"],["rockSugar","10~25 g","冰糖"]],"pantry":[["water","1 L","饮用水"]],"steps":[["浸泡硬质豆类","提前洗净绿豆、红豆、花生、黄豆、豌豆、红腰豆，放入玻璃碗，注入3/4碗的饮用水，浸泡一夜（或最少8小时）。"],["浸泡谷物莲子","提前洗净大米、糯米、薏米、黑米、小米、莲子，放入玻璃碗，注入3/4碗的饮用水，浸泡3小时。"],["初步熬煮豆类","倒掉豆类的浸泡水，将豆类倒入粥锅中，加入1升饮用水（或漫过食材1拇指块），大火煮沸后合盖，转小火煮30分钟。"],["加入谷物慢熬","倒掉谷物的浸泡水，将谷物原料倒入粥锅中，合上锅盖，继续用小火煮60分钟。"],["加入干果调味","洗净红枣（切成小片）、桂圆、栗子、核桃、葡萄干、冰糖，全部倒入锅中，合盖小火再煮60分钟。"],["确认出锅","确认煮出的粥已达到粘稠软糯的状态后即可关火、盛盘食用。"]]},
  {"id":"soup_luo-song-tang","name":"罗宋汤","category":"汤","servings":1,"minutes":180,"difficulty":"中等","coverPath":"ai-generated/soup_luo-song-tang.jpg","sourcePath":"dishes/soup/罗宋汤.md","calories":2006,"tips":["番茄尽量不用新鲜番茄代替，番茄罐头+番茄膏的组合风味更足","除了胡萝卜、洋葱、欧芹、牛肉是必备食材外，其余可自由搭配"],"required":[["vibe-e7899be88289e9ab98e6b1a4","500 mL","牛肉高汤"],["vibe-e7899be88289","250 g","牛肉"],["vibe-e795aae88c84e7bd90e5a4b4","2 罐","番茄罐头"],["vibe-e795aae88c84e8868f","5 g","番茄膏"],["onion","100 g","洋葱"],["carrot","100 g","胡萝卜"],["vibe-e6aca7e88ab9","100 g","欧芹"],["vibe-e6a48de789a9e6b2b9","5 mL","植物油"],["vibe-e9bb91e883a1e6a492","3 g","黑胡椒"]],"optional":[["potato","400 g","马铃薯"],["vibe-e58c85e88f9c","200 g","包菜"],["vibe-e7baa2e882a0","100 - 200 g","红肠"]],"pantry":[["vibe-e6a984e6a684e6b2b9","5 mL","橄榄油"],["salt","18 g","盐"]],"steps":[["切配准备-蔬菜","将洋葱、胡萝卜、欧芹切成 1cm 见方的小丁；红肠、马铃薯切成 2cm 块；包菜去梗后手撕至 2cm 片。"],["牛肉腌制","牛肉中撒入盐 3 g、黑胡椒 3 g，抓匀腌制 5 分钟。"],["煎制牛肉","平底锅烧热加入植物油，煎制牛肉直至表面呈焦黄色，取出备用。"],["炒制底料","汤锅烧热加入橄榄油，下洋葱丁、胡萝卜丁、欧芹丁炒至洋葱透明，再加入番茄膏和番茄罐头。"],["初次烹煮","加入煎好的牛肉和马铃薯丁翻炒均匀，加水没过食材，中火烹制 1 小时。"],["二次烹煮","开锅加入包菜丁、红肠丁，搅拌均匀后继续中火烹制半小时。"],["调味盛盘","最后加入剩余的 15 g 盐，混合均匀后即可盛盘。"]]},
  {"id":"soup_mi-zhou","name":"米粥","category":"汤","servings":1,"minutes":25,"difficulty":"简单","coverPath":"ai-generated/soup_mi-zhou.jpg","sourcePath":"dishes/soup/米粥.md","calories":308,"tips":["掌握好火候和水量是成功的关键","溢锅非常危险，请务必在T1前转小火"],"required":[["vibe-e7b1b3","60ml-110ml","米"]],"optional":[["vibe-e6a48de789a9e6b2b9","生米体积 / 10","植物油"]],"pantry":[["water","米体积的9-12倍","水"]],"steps":[["油米混合（可选）","将 Mo ml 的油与洗净的米混合，尽量确保完全混合，即每粒米上至少都沾上少量油。"],["冷藏保存（可选）","将米-油混合物品冷藏保存，冷藏时间 Tc。"],["加水入锅","将米和水加入锅中。"],["大火加热","开大火，加热到 T1 时间。"],["转小火","在 T1 之前将火关小。"],["持续加热至熟","继续加热到 Tr 时间。在 Tr 时关闭火源。"]]},
  {"id":"soup_nai-you-mo-gu-tang","name":"奶油蘑菇汤","category":"汤","servings":1,"minutes":30,"difficulty":"简单","coverPath":"ai-generated/soup_nai-you-mo-gu-tang.jpg","sourcePath":"dishes/soup/奶油蘑菇汤.md","calories":426,"tips":["可将部分蘑菇预留作为装饰，提前煎香再添加。","使用鸡高汤代替清水风味更佳，建议控制总液体不超过 300 毫升/份。","喜欢浓汤口感可适当增加面粉和淡奶油用量。","建议现做现吃，不建议冷藏或冷冻保存。"],"required":[["vibe-e799bde89891e88f87","200克","白蘑菇"],["onion","50克","洋葱"],["vibe-e9bb84e6b2b9","15克","黄油"],["flour","10克","面粉"],["milk","200毫升","牛奶"],["vibe-e6b7a1e5a5b6e6b2b9","30毫升","淡奶油"],["vibe-e9bb91e883a1e6a492e7a28e","1克","黑胡椒碎"]],"optional":[],"pantry":[["water","100毫升","清水"],["salt","2克","盐"]],"steps":[["食材预处理","白蘑菇洗净切片备用，洋葱切成细末备用。"],["炒香洋葱","平底锅中放入黄油，小火融化后加入洋葱末炒至透明出香味。"],["炒制蘑菇与炒面","加入白蘑菇翻炒至出水变软，均匀撒入面粉，搅拌至面粉与食材融合。"],["加入液体煮沸","分次加入牛奶和清水，边加边搅拌均匀，小火煮沸，保持搅拌防止糊底。"],["熬煮浓稠","转小火煮约 10 分钟，直至汤汁变得浓稠。"],["调味收尾","倒入淡奶油继续加热 1 分钟，最后加入盐和黑胡椒碎调味。"],["精细化处理（可选）","熄火后，可将汤汁倒入料理机或使用手持搅拌棒打成细腻的浓汤。"]]},
  {"id":"soup_pi-dan-shou-rou-zhou","name":"皮蛋瘦肉粥","category":"汤","servings":1,"minutes":15,"totalMinutes":90,"waitMinutes":75,"difficulty":"中等","coverPath":"ai-generated/soup_pi-dan-shou-rou-zhou.jpg","sourcePath":"dishes/soup/皮蛋瘦肉粥.md","calories":776,"tips":["作为早餐时可提前一夜准备好主料，利用电饭锅预约或保温模式到第二天早餐，再添加配料和酱料","计量和处理食材时建议佩戴一次性手套，保证卫生","生蔬食材建议提前洗净放置一旁备用"],"required":[["vibe-e79aaee89b8befbc88e69dbee88ab1e89b8befbc89","2 颗","皮蛋（松花蛋）"],["pork","100g","瘦肉"],["vibe-e5a4a7e7b1b3","150ml","大米"],["scallion","1 棵","小葱"],["lettuce","4 叶","生菜"],["ginger","1 拇指块","生姜"]],"optional":[["cilantro","1 棵","香菜"]],"pantry":[["water","1 升","饮用水"],["vibe-e985b1e6b2b9","5 ml","酱油"],["oysterSauce","5 ml","蚝油"],["salt","2g","盐"],["whitePepper","1g","胡椒粉"],["oil","10ml","食用油"]],"steps":[["准备米底","大米洗净，放入电饭锅内胆，加入 1 升饮用水。"],["处理瘦肉","瘦肉洗净并简易晾去水分，加入 10ml 食用油揉搓均匀，放入电饭锅内胆。"],["处理皮蛋","皮蛋去壳洗净，对半切开分离蛋白蛋黄。蛋白切碎块，蛋黄揉碎，一同放入电饭锅内胆。"],["准备姜丝","生姜洗净削皮，去除杂质后切成细丝，放入电饭锅内胆。"],["启动烹饪","使用电饭锅的“煮粥”模式开始烹饪。"],["处理配料","将小葱、香菜、生菜洗净去根并切碎，分别放入小碗备用。"],["调制酱汁","将酱油、蚝油、盐、胡椒粉在小碗中搅拌均匀备用。"],["最后混合","待主料煮熟后开盖，生菜单独过一次热水。将所有配料和酱料加入锅中搅拌均匀即可。"]]},
  {"id":"soup_sheng-cuan-wan-zi-tang","name":"生汆丸子汤","category":"汤","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/soup_sheng-cuan-wan-zi-tang.jpg","sourcePath":"dishes/soup/生汆丸子汤.md","calories":857,"tips":["辣椒油可以根据口味在最后步骤放入","掌握好挤丸子的火候是成功的关键","如果觉得口感不够，可以适当增加搅拌肉馅的时间"],"required":[["vibe-e78caae5898de885bfe88289","500g","猪前腿肉"],["vibe-e891b1e5a79ce88ab1e6a492e6b0b4","80g","葱姜花椒水"],["vibe-e9b8a1e89b8be6b885","1个","鸡蛋清"],["vibe-e59c9fe8b186e6b780e7b289","40g","土豆淀粉"],["vibe-e7869fe8b186e6b2b9","适量","熟豆油"],["vibe-e69ca8e880b3","适量","木耳"],["vibe-e9bb84e88ab1","适量","黄花"],["vermicelli","1把","粉丝"],["vibe-e5b08fe9a699e891b1","适量","小香葱"]],"optional":[["vibe-e9b8a1e7b289","适量","鸡粉"],["cilantro","1小颗","香菜"],["vibe-e8bea3e6a492e6b2b9","按口味","辣椒油"]],"pantry":[["salt","6g","盐"],["whitePepper","2g","胡椒粉"],["sesame","3-5滴","香油"]],"steps":[["手工剁肉","将前腿肉改刀切开（肥瘦三七分），先用刀背砸松肉筋，再反复剁成肉末。"],["肉馅调味与打水","肉末加入盐和胡椒粉抓匀；分次加入葱姜花椒水，边加边顺时针揉匀让肉吸饱水；放入蛋清搅匀，再加入淀粉搅匀，最后加入熟豆油封住水分。"],["汆煮丸子","起锅烧水，水开后改小火保持似开非开的状态。上手挤出丸子下锅，待全部丸子漂浮起来后，继续小火煮1分钟。"],["汤底组装","在碗底铺上泡好的粉丝，加入木耳、黄花、小香葱，并用盐、胡椒粉、鸡粉打底。将丸子连同原汤一起冲入碗中，淋上香油，放上香菜即可。"]]},
  {"id":"soup_xi-hong-shi-ji-dan-tang","name":"西红柿鸡蛋汤","category":"汤","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/soup_xi-hong-shi-ji-dan-tang.jpg","sourcePath":"dishes/soup/西红柿鸡蛋汤.md","calories":258,"tips":["味素可加可不加。","对新手非常友好，快手省时。","鸡蛋数量可根据口味自行调整（1-2个）。"],"required":[["tomato","1个","西红柿"],["egg","1-2个","鸡蛋"],["vibe-e891b1e38081e5a79ce38081e8929c","共15克","葱、姜、蒜"]],"optional":[["vibe-e591b3e7b4a0","5克","味素"]],"pantry":[["sesame","2滴","香油"],["salt","15克","盐"],["oil","15毫升","食用油"]],"steps":[["准备西红柿","将西红柿洗净，切块。"],["准备辅料","葱姜蒜切碎。"],["搅打蛋液","鸡蛋打到碗中，用筷子（或打蛋器）搅拌均匀。"],["爆香","热锅，并放入 15 毫升的油，待能从油中看到冒出一丝烟时，放入葱姜蒜翻炒 30 秒。"],["炒西红柿","放入西红柿翻炒 1 分钟。"],["加水煮沸","倒入水，水的高度大约为锅内菜品高度的 1.2 倍，并放入盐。"],["淋入蛋液","待开锅后，将鸡蛋液放入，并用筷子将鸡蛋打散，放入味素和香油。"],["出锅","等待 30 秒，关火出锅。"]]},
  {"id":"soup_xiao-mi-zhou","name":"小米粥","category":"汤","servings":1,"minutes":35,"difficulty":"简单","coverPath":"ai-generated/soup_xiao-mi-zhou.jpg","sourcePath":"dishes/soup/小米粥.md","calories":362,"tips":["这是普通锅熬制（只需 30-35 分钟即可出锅）,味道最佳。高压锅和电饭锅省事，不过效果下降，水量要适当减少，一般 100 克小米+1800 克水","小米只需用水去除浮灰，千万不可过分淘，会损失掉小米油的","千万记住小米需要在水开的时候下锅","不建议放碱，原汁原味的小米香更佳"],"required":[["vibe-e5b08fe7b1b3","100g","小米"]],"optional":[],"pantry":[["water","2000g","水"]],"steps":[["淘洗小米","小米 100 克，放入碗中，用水轻淘一遍（用手搅拌一下，将水倒掉，只是去掉外面的浮灰，不可搓洗！！！）"],["烧开水","锅中加入 2000 克水烧开，务必烧开！！！"],["下小米","水烧开沸腾时，将小米倒入锅内。"],["大火熬煮","搅拌使得小米不会粘连锅底，继续用大火熬 6-10 分钟，注意用中间穿插搅拌几次。"],["文火慢熬","改中火、文火熬 15-20 分钟，锅盖要错开一条缝，千万不能让小米油溜掉哟，中间继续搅拌几次，不要糊锅底"]]},
  {"id":"soup_zi-cai-dan-hua-tang","name":"紫菜蛋花汤","category":"汤","servings":1,"minutes":20,"difficulty":"简单","coverPath":"ai-generated/soup_zi-cai-dan-hua-tang.jpg","sourcePath":"dishes/soup/紫菜蛋花汤.md","calories":217,"tips":["水开后，将火关小，将打好的蛋液围绕中间沸腾的水倒入。为了使蛋花比较嫩，锅盖盖上熄灭火等半分钟后再打开","如果喜欢浓稠口感，可加入 2g 淀粉进行勾芡","紫菜份量可根据个人喜好调整"],"required":[["nori","10g","干紫菜"],["egg","2个","鸡蛋"],["scallion","适量","葱花"]],"optional":[["vibe-e899bee4bb812fe899bee79aae","适量","虾仁/虾皮"],["starch","2g","淀粉"]],"pantry":[["water","1.5升","水"],["salt","2克","盐"],["oil","5ml","油"],["sesame","几滴","香油"]],"steps":[["泡发紫菜","干紫菜用清水泡 15 分钟，捞起沥干水份备用。"],["煮汤底","热锅，倒入 1.5 升清水、5ml 油、2g 盐。待水开后放入紫菜。"],["倒入蛋液","紫菜烧开后 3 分钟，将打好的蛋液徐徐倒入锅内，30 秒既可起锅。"],["加入葱花","撒上葱花，转小火 20 秒。"],["调味出锅","关火，出锅前放入几滴香油，也可以根据个人口味放入一点虾皮。"]]},
  {"id":"staple_chao-he-fen","name":"炒河粉","category":"主食","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/staple_chao-he-fen.jpg","sourcePath":"dishes/staple/炒河粉.md","calories":822,"tips":["个人口味根据地区、天气、时间均有不同，调料量请据个人情况而定","喜欢吃辣的可以在爆香阶段加入干辣椒或辣椒油","河粉建议买鲜河粉，口感比干河粉更软韧","面筋和凉皮表面的食用油清洗掉后炒制更清爽"],"required":[["vibe-e6b2b3e7b289","250g","河粉"],["vibe-e78caae882892fe7899be88289","100g","猪肉/牛肉"],["cucumber","30g","黄瓜"],["vibe-e99da2e7ad8be59d97","30g","面筋块"],["beanSprout","30g","绿豆芽"],["egg","1个","鸡蛋"],["garlic","2个","蒜瓣"],["scallion","1根","小葱"],["vibe-e5ad9ce784b6e7b289","3g","孜然粉"]],"optional":[["whitePepper","适量","胡椒粉"],["vibe-e6b2b3e7b289e78292e69699","20g","河粉炒料"]],"pantry":[["salt","10g","盐"],["vibe-e591b3e7b2be","2g","味精"],["darkSoy","10ml","老抽"],["soy","15ml","生抽"],["starch","5g","淀粉"],["oil","20g","食用油"]],"steps":[["切配辅料","小葱切碎并将葱白和葱叶分开，蒜瓣拍碎，放在案板备用。"],["鸡蛋预处理","打碎鸡蛋，取少量蛋清放入一只碗中（用于腌肉），剩下的蛋液放入另一只碗中备用。"],["豆芽焯水","将绿豆芽放入锅中，大火煮 60 秒后捞出，过凉水，放入盘中备用。"],["切黄瓜丝","黄瓜切丝，可以和处理好的豆芽放在同一个盘子中。"],["处理面筋","将面筋单独放入盘中。如购买的带油，可用自来水清洗并用手挤出多余水分。"],["腌制肉丝","肉切细条，加入淀粉、预留的鸡蛋清和胡椒粉，顺时针搅拌均匀。"],["滑炒肉丝","热锅倒入食用油，锅热后倒出（润锅），重新倒入肉丝翻炒至变色，盛出备用。"],["爆香底料","锅中重新加入 20g 食用油，倒入葱白、蒜瓣大火爆炒出香味。"],["炒制河粉","加入河粉，淋入老抽提色，翻炒均匀后再加入河粉炒料继续翻炒。"],["混合肉丝","待河粉即将透明时，放入炒好的肉丝与面筋，淋入生抽提鲜，简单翻炒。"],["加入配菜","最后加入豆芽与黄瓜丝，翻炒至河粉完全透明后关火。"],["出锅装盘","撒入剩下的葱叶点缀，端锅倒入盘中即可。"]]},
  {"id":"staple_chao-mo","name":"炒馍","category":"主食","servings":1,"minutes":15,"difficulty":"中等","coverPath":"ai-generated/staple_chao-mo.jpg","sourcePath":"dishes/staple/炒馍.md","calories":767,"tips":["炒的过程中要注意控制火候，以防炒糊","若火太大，可将火调小，沿锅边少量加些油润锅或洒极少量的水，注意要分散开","调味料可根据个人喜好放入其他香料，如南德调味料","如果喜欢吃脆的，可以将火开到最小多翻炒一会，关火后趁锅热再放置一会再倒出","辅料可根据个人口味放入蒜末、蒜苗等，可以单独爆香后再混合"],"required":[["steamedBun","2个","馒头"],["vibe-e5ad9ce784b6e7b289","3g","孜然粉"],["vibe-e8bea3e6a492e7b289","3g","辣椒粉"],["vibe-e4ba94e9a699e7b289","3g","五香粉"],["scallion","2棵","小葱"]],"optional":[["egg","2个","鸡蛋"]],"pantry":[["salt","3g","盐"],["oil","20ml","食用油"]],"steps":[["食材改刀","将馒头切成均匀的小块或小片。"],["准备蛋液","（可选）将鸡蛋打进碗里，充分打散。"],["裹蛋液","将蛋液浇在馒头丁上并拌匀。"],["热锅起油","大火热锅，倒入食用油。"],["入锅翻炒","将馍丁放进去翻炒，翻炒均匀。"],["小火慢煎","将火调小，炒至馍丁呈金黄色。"],["加入调料","放入盐、辣椒粉、五香粉、孜然粉。"],["收尾翻炒","最后将葱花放入一起翻炒几下。"],["出锅","关火出锅装盘。"]]},
  {"id":"staple_chao-nian-gao","name":"炒年糕","category":"主食","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/staple_chao-nian-gao.jpg","sourcePath":"dishes/staple/炒年糕.md","calories":960,"tips":["辅料的选择可以根据个人选择酌情添加，如加入瘦肉等","在煮年糕的时候注意搅拌，以免粘锅","葱油是这道菜的灵魂，建议不要省略"],"required":[["vibe-e5b9b4e7b3952fe799bde7b2bf","250g","年糕/白粿"],["scallion","2根","小葱"]],"optional":[["egg","1-2个","鸡蛋"],["bokchoy","适量","青菜"]],"pantry":[["oil","50ml","食用油"],["vibe-e985b1e6b2b9","15ml","酱油"],["salt","1-2g","盐"]],"steps":[["煮年糕","锅中加水烧开，煮熟年糕，捞出后放入加了水的碗中确保年糕不会粘连备用。"],["食材处理","小葱切葱花（将葱白和葱叶分开），青菜切小段备用。"],["炒鸡蛋（可选）","如果准备了鸡蛋，先将鸡蛋打散炒熟盛出备用。"],["准备葱油","热锅，加入 30ml 食用油，放入葱白炸至焦黄发出香味，倒出葱油备用。"],["翻炒辅料","重新热锅，加入 20ml 食用油，加入鸡蛋、青菜等辅料翻炒均匀。"],["加入年糕","将年糕的水倒掉，向锅中加入年糕。"],["调味翻炒","加入酱油和盐，大火翻炒均匀，使年糕均匀上色。"],["淋入葱油","关火，加入之前准备好的葱油，翻炒均匀后出锅乘盘。"]]},
  {"id":"staple_cong-you-ban-mian","name":"葱油拌面","category":"主食","servings":1,"minutes":20,"difficulty":"简单","coverPath":"ai-generated/staple_cong-you-ban-mian.jpg","sourcePath":"dishes/staple/葱油拌面.md","calories":355,"tips":["炸葱油时，火一定要小，要有耐心，才能将葱的香味充分炸出。","制作好的葱油酱汁可以冷藏保存一段时间，下次吃面时直接取用。"],"required":[["noodles","80g","干面条"],["scallion","100g","小葱"]],"optional":[],"pantry":[["oil","100ml","食用油"],["soy","60ml","生抽"],["darkSoy","20ml","老抽"],["sugar","15g","白糖"]],"steps":[["准备葱段","将小葱洗净，切成长段（约 5-7 cm）。葱白和葱绿可以分开。"],["炸制葱白","锅中加入 100 ml 食用油，中火烧热。先放入葱白段，煸炒至微黄。"],["炸制葱绿","加入葱绿段，转小火，继续煸炒。"],["慢火煸炸","保持小火，耐心煸炒约 15-20 分钟，直至葱段变得焦黄酥脆。"],["捞出葱段","将焦黄的葱段捞出，葱油保留在锅中。"],["调制酱汁","在锅中葱油里加入 60 ml 生抽，20 ml 老抽，15 g 白糖。小火加热并搅拌约 1 分钟，至糖溶解且酱汁均匀。立即关火并倒出放凉。"],["煮面条","锅中加入 1000 ml 饮用水烧开，放入 80 g 干面条，煮至熟透（约 3-8 分钟）。"],["沥水装碗","将煮好的面条捞出，沥干水分，放入碗中。"],["拌匀食用","在碗中加入 15 ml 葱油酱汁及适量炸好的葱段，用筷子快速搅拌均匀。"]]},
  {"id":"staple_dan-bao-fan","name":"蛋包饭","category":"主食","servings":1,"minutes":25,"difficulty":"中等","coverPath":"ai-generated/staple_dan-bao-fan.jpg","sourcePath":"dishes/staple/蛋包饭.md","calories":695,"tips":["炒饭用隔夜饭不易粘锅，口感更好。","打蛋时加入牛奶可以让蛋皮更加嫩滑。","操作蛋皮时火力需小，避免底部焦糊。","如果不擅长包裹造型，也可以直接将炒饭铺盘后盖上蛋皮。"],"required":[["egg","2个","鸡蛋"],["onion","30g","洋葱"],["carrot","30g","胡萝卜"],["corn","15g","玉米粒"],["vibe-e781abe885bfe882a0e68896e9b8a1e883b8e88289","50g","火腿肠或鸡胸肉"],["rice","200g","米饭"],["vibe-e795aae88c84e985b1","20ml","番茄酱"]],"optional":[["peas","15g","青豆"],["milk","10ml","牛奶"]],"pantry":[["oil","15ml","食用油"]],"steps":[["食材预处理","将洋葱、胡萝卜、火腿肠或鸡胸肉切成小丁，备用。"],["预热油锅","热锅，锅中倒入 10ml 食用油，等待 10 秒加热。"],["翻炒蔬菜","先放入洋葱丁翻炒 1 分钟，出香味后加入胡萝卜、玉米粒、青豆继续翻炒 2 分钟。"],["炒制肉类","加入火腿肠或鸡胸肉丁，炒至变色。"],["混合炒饭","加入米饭炒散后，加入番茄酱 20ml，翻炒均匀，盛出备用。"],["准备蛋液","鸡蛋打散，加入 10ml 牛奶搅匀。"],["摊蛋皮","锅中放入 5ml 食用油，倒入蛋液，轻晃锅底让蛋液均匀铺满锅面。"],["填入炒饭","用小火加热，待蛋液表面半熟状态时，将炒饭放入蛋液中央。"],["包裹定型","用铲子将蛋皮折叠包住米饭，形成椭圆形状。"],["装盘装饰","用锅铲轻轻推至盘中，整理外形，可在表面挤上少量番茄酱装饰。"]]},
  {"id":"staple_dan-chao-fan","name":"蛋炒饭","category":"主食","servings":1,"minutes":25,"difficulty":"中等","coverPath":"ai-generated/staple_dan-chao-fan.jpg","sourcePath":"dishes/staple/蛋炒饭.md","calories":853,"tips":["使用隔夜的冷饭炒饭最佳，因为隔夜饭流失了一定水分，更易做到粒粒分明。","没有冷饭可以现煮，但建议使用冰箱快速降温，且需要炒制更长时间来蒸发水分。","炒饭要做到“粒粒分明”的核心在于将饭炒干。"],"required":[["rice","500ml","冷饭"],["egg","1.5个","鸡蛋"],["vibe-e781abe885bf","2个","火腿"],["scallion","1颗","香葱"]],"optional":[["cucumber","30g","黄瓜"],["carrot","30g","胡萝卜"],["vibe-e7869fe88289efbc88e5a682e781afe5bdb1e7899be88289e4b89d2fe58d88e9a490e882892fe8858ae882a02fe58da4e88289efbc89","适量","熟肉（如灯影牛肉丝/午餐肉/腊肠/卤肉）"]],"pantry":[["oil","12ml","油"],["salt","4g-6g","盐"],["whitePepper","8g","胡椒粉"],["soy","10ml","生抽"]],"steps":[["处理米饭","米饭提前用铲子铲成小块"],["切配菜","火腿肠、胡萝卜、黄瓜等根据需求切片或者块状"],["准备熟肉","如果家里有熟肉（如灯影牛肉丝/午餐肉/腊肠/卤肉）准备好味道更佳"],["蛋液分离","将蛋白，蛋黄分开，分别打入一个大碗里，各自搅匀。注意，不要在这一步加盐。"],["炒蛋白","大火热锅，待锅里冒烟放入食用油，放入蛋白，待主体凝固后盛出备用。"],["热油准备","如果油够，则直接放入蛋黄，如果油不够则放入食用油并等其升温到大火热锅"],["炒蛋黄与配菜","待蛋黄主体凝固后，将火调至中小火，倒入火腿肠、熟肉，胡萝卜、黄瓜等备料、翻炒 10 秒钟（到爆香）"],["加入米饭","重新倒入蛋白，翻炒 5s 钟，迅速倒入米饭大火翻炒，为的就是每一粒饭都裹上鸡蛋。"],["捣碎翻炒","翻炒过程中将米饭的块状捣碎、这一步过程会比较长、待米饭全部捣碎再翻炒均匀即可"],["调味","调至小火、加盐、胡椒粉、生抽"],["最后翻炒","进一步翻炒均匀，能看到一些米饭在锅里有“跳起来”的时候其实就已经差不多了"],["加入葱花","最后倒入香葱再翻炒 10s"],["盛出","关火、盛入碗中"]]},
  {"id":"staple_hong-yun-dou-ban-fan","name":"红芸豆拌饭","category":"主食","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/staple_hong-yun-dou-ban-fan.jpg","sourcePath":"dishes/staple/红芸豆拌饭.md","calories":1842,"tips":["红芸豆必须煮熟透才能食用，未熟的红芸豆含有植物血凝素，可能导致食物中毒。","在印度，Rajma Chawal 被认为是最有家的味道的食物，地位类似于中国的红烧肉配米饭。","如果想要更浓郁的口感，可以加入 30ml 淡奶油。","剩余的红芸豆咖喱冷藏保存可达 3-4 天，味道会更好。"],"required":[["vibe-e5b9b2e7baa2e88ab8e8b186","200g","干红芸豆"],["onion","2个(约200g)","洋葱"],["tomato","3个(约300g)","番茄"],["ginger","10g","生姜"],["garlic","4瓣(约12g)","大蒜"],["vibe-e9a39fe794a8e6b2b9e68896e985a5e6b2b9","30ml","食用油或酥油"],["vibe-e69c88e6a182e58fb6","2片","月桂叶"],["vibe-e5a79ce9bb84e7b289","3g","姜黄粉"],["vibe-e7baa2e8bea3e6a492e7b289","5g","红辣椒粉"],["vibe-e9a699e88f9ce7b289","5g","香菜粉"],["vibe-e5ad9ce784b6e7b289","3g","孜然粉"],["vibe-e58db0e5baa6e7bbbce59088e9a699e69699e7b28928476172616d204d6173616c6129","3g","印度综合香料粉(Garam Masala)"],["vibe-e5b7b4e696afe9a9ace89282e9a699e7b1b3e68896e699aee9809ae5a4a7e7b1b3","200g","巴斯马蒂香米或普通大米"]],"optional":[["vibe-e99d92e8bea3e6a492","1根","青辣椒"],["vibe-e9a699e88f9ce58fb6","15g","香菜叶"]],"pantry":[["salt","6g","盐"],["water","1000ml","水"]],"steps":[["准备工作","将干红芸豆用清水浸泡至少 8 小时（过夜），浸泡后体积会膨胀约两倍。"],["煮红芸豆","将浸泡好的红芸豆沥干。使用高压锅：放入豆子和 600ml 水，大火上气后转中火压 15-20 分钟；若用普通锅则需煮 60-90 分钟。"],["炒制底料","炒锅中倒入油，中火加热后放入月桂叶炸香。加入切碎的洋葱翻炒至金棕色，随后加入磨碎的姜蒜翻炒1分钟。"],["加入番茄与调味","加入切碎的番茄翻炒至软烂出油。加入姜黄粉、红辣椒粉、香菜粉、孜然粉和盐，继续翻炒 2 分钟。"],["炖煮咖喱","将煮好的豆子连汤倒入锅中，加入青辣椒，大火煮沸后转小火炖 15-20 分钟。期间压碎部分豆子使汤汁浓稠，最后加入印度综合香料粉并撒上香菜。"],["蒸米饭","将大米淘洗干净，加入 400ml 水，放入电饭锅正常蒸煮。"],["装盘","将米饭盛入盘中，浇上红芸豆咖喱，搭配洋葱沙拉和柠檬角食用。"]]},
  {"id":"staple_jiu-cai-he-zi","name":"韭菜盒子","category":"主食","servings":1,"minutes":150,"difficulty":"中等","coverPath":"ai-generated/staple_jiu-cai-he-zi.jpg","sourcePath":"dishes/staple/韭菜盒子.md","calories":794,"tips":["制作时可根据个人口味添加豆腐干等配料。","注意煎制时火候，避免外焦内生。"],"required":[["vibe-e99fade88f9c","500g","韭菜"],["shrimp","100g","虾仁"],["egg","3枚","鸡蛋"],["flour","250g","面粉"]],"optional":[],"pantry":[["sesame","10ml","香油"],["salt","5g","盐"]],"steps":[["和面静置","将面粉放入大碗中，加入水，搅拌成光滑的面团，静置 30 分钟。"],["准备馅料","韭菜洗净切碎，加入打散的鸡蛋、5g 盐，搅拌均匀。"],["包制盒子","将面团分成小剂子，擀成薄圆饼，包入韭菜、虾仁、鸡蛋液。"],["煎制","热锅，加入食用油，放入包好的韭菜盒子，煎至两面金黄，约 3-4 分钟。"],["盛盘享用","盛盘，稍凉后即可享用。"]]},
  {"id":"staple_ke-le-chao-fan","name":"可乐炒饭","category":"主食","servings":1,"minutes":20,"difficulty":"中等","coverPath":"ai-generated/staple_ke-le-chao-fan.jpg","sourcePath":"dishes/staple/可乐炒饭.md","calories":913,"tips":["含糖可乐口感更好","如果喜欢干一点，多炒一会儿","如果嫌麻烦，可以在第一步直接放 3 个鸡蛋，取消挖洞打另一个鸡蛋的步骤"],"required":[["rice","200g","米饭"],["vibe-e58fafe4b990","160ml","可乐"],["egg","3个","鸡蛋"],["scallion","5g","葱花"]],"optional":[["vibe-e781abe885bfe882a0","20-100g","火腿肠"],["vibe-e8b186e793a3e985b1","7.5ml","豆瓣酱"]],"pantry":[["oil","25ml","油"],["soy","15ml","生抽"],["darkSoy","7.5ml","老抽"],["oysterSauce","5ml","蚝油"],["whitePepper","1g","胡椒粉"]],"steps":[["煎制鸡蛋","将锅烧热后，加入 25 ml 油，放两个鸡蛋，煎至底部完全凝固。"],["鸡蛋翻面","翻面，煎至两面完全凝固。"],["处理蛋块","关火，将鸡蛋取出，剪成 2-5 cm² 的小块后放回锅中（也可以直接用锅铲铲碎）。"],["调制酱汁","重新开火，倒入可乐、生抽、老抽、豆瓣酱、蚝油，搅拌均匀。"],["收汁翻炒","加热到锅内液体剩 1/3，倒入米饭和火腿肠翻炒。"],["焖煮鸡蛋","翻炒均匀后，改小火，锅内食物中心挖一个洞，打入 1 个鸡蛋，盖上锅盖，焖 2 分钟。"],["出锅装盘","开盖翻炒至第三颗鸡蛋熟透，撒上葱花和胡椒粉，出锅。"]]},
  {"id":"staple_lao-gan-ma-ban-mian","name":"老干妈拌面","category":"主食","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/staple_lao-gan-ma-ban-mian.jpg","sourcePath":"dishes/staple/老干妈拌面.md","calories":502,"tips":[],"required":[["vibe-e99da2","120g","面"],["vibe-e88081e5b9b2e5a688","15ml","老干妈"]],"optional":[],"pantry":[["vibe-e985b1e6b2b9","5ml","酱油"]],"steps":[["烧水","将水倒入锅中并煮沸"],["下入面条","将面均匀放入锅中"],["搅拌防粘","在煮的过程注意搅拌，避免面粘成一坨"],["确认熟度","当用筷子挑起一根面且该面能自然地从筷子上滑落时再等 30 秒关火"],["盛面","将面夹入碗中"],["调味","按照上面的计量放入老干妈和酱油"],["搅拌","用筷子将碗里的面、老干妈、酱油拌均匀"],["享用","吃"]]},
  {"id":"staple_lao-zao-xiao-tang-yuan","name":"醪糟小汤圆","category":"主食","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/staple_lao-zao-xiao-tang-yuan.jpg","sourcePath":"dishes/staple/醪糟小汤圆.md","calories":957,"tips":["白糖的用量根据个人口味更改","若喜欢更浓的口感可以减少 100 毫升内的水","若喜欢软点的枸杞口感，可以将枸杞和小汤圆同时煮"],"required":[["vibe-e5b08fe6b1a4e59c86","250g","小汤圆"],["vibe-e986aae7b39f","50g","醪糟"]],"optional":[["vibe-e69eb8e69d9e","5颗","枸杞"]],"pantry":[["water","300ml","水"],["sugar","适量","白糖"]],"steps":[["烧水","将水倒入锅中并煮沸"],["煮汤圆","放入小汤圆煮 8 分钟"],["加入醪糟枸杞","放入醪糟和枸杞再煮 2 分钟"],["调味","盛入碗中根据个人口味加入白糖并搅拌均匀"],["享用","吃"]]},
  {"id":"staple_li-ti-qiao-ka--litti-chokha","name":"利提巧卡 (Litti Chokha)","category":"主食","servings":1,"minutes":60,"difficulty":"较难","coverPath":"ai-generated/staple_li-ti-qiao-ka--litti-chokha.jpg","sourcePath":"dishes/staple/利提巧卡.md","calories":1019,"tips":["Sattu是特色食材，若买不到可将干鹰嘴豆炒至深棕色后自行磨粉。","芥末油是风味核心，不建议替换，若必须替换请用菜籽油。","传统做法使用牛粪饼火烤制，家庭制作推荐明火烧烤架以模拟烟熏味。","这是一道具有数千年历史的古老食物，曾是古代士兵的行军粮。"],"required":[["vibe-e585a8e9baa6e99da2e7b289284174746129","200g","全麦面粉(Atta)"],["vibe-e783a4e9b9b0e598b4e8b186e7b28928536174747529","120g","烤鹰嘴豆粉(Sattu)"],["eggplant","1个(约250g)","茄子"],["tomato","2个(约180g)","番茄"],["potato","2个(约240g)","土豆"],["onion","1个(约80g)","洋葱"],["garlic","4瓣(约12g)","大蒜"],["ginger","5g","生姜"],["vibe-e99d92e8bea3e6a492","3根","青辣椒"],["vibe-e69fa0e6aaac","10ml(汁)","柠檬"],["cilantro","20g","香菜"],["vibe-e88aa5e69cabe6b2b9284d757374617264204f696c29","30ml","芥末油(Mustard Oil)"],["vibe-e5ad9ce784b6e7b1bd","3g","孜然籽"],["vibe-e7baa2e8bea3e6a492e7b289","3g","红辣椒粉"],["vibe-e88a9de9babb","5g","芝麻"],["vibe-e985a5e6b2b9284768656529","30g","酥油(Ghee)"]],"optional":[["vibe-e58db0e5baa6e9bb91e79b90284b616c61204e616d616b29","3g","印度黑盐(Kala Namak)"]],"pantry":[["salt","7g","盐"],["water","约100ml","温水"]],"steps":[["制作利提馅料","在碗中混合烤鹰嘴豆粉、细碎洋葱、青辣椒、生姜、孜然籽、芝麻、红辣椒粉、印度黑盐、盐、芥末油、柠檬汁和香菜叶。"],["揉制面团","将全麦面粉放入大碗，逐渐加入温水，揉成光滑且柔软的面团。"],["面团静置","将揉好的面团盖上湿布静置。"],["包制面球","面团分成8等份，压成直径8cm面片（中心厚），包入约15g馅料，收口捏紧搓圆。"],["烤制利提","烤箱预热200°C烤25-30分钟，或用明火小火不断翻转烤至焦黄。热时涂抹酥油。"],["烤制蔬菜","将茄子、番茄、土豆在明火上或200°C烤箱烤20-25分钟至皮焦肉软。"],["制作巧卡","蔬菜去皮捣碎，加入切碎的大蒜、青辣椒、盐、芥末油混合均匀，撒上香菜。"],["摆盘上菜","将利提摆盘，配上巧卡，趁热用手掰开利提蘸取蔬菜泥食用。"]]},
  {"id":"staple_luo-si-fen","name":"螺蛳粉","category":"主食","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/staple_luo-si-fen.jpg","sourcePath":"dishes/staple/螺蛳粉.md","calories":1109,"tips":["如果想要更有嚼劲的粉，可以缩短第二步煮粉的时间","如果想在螺蛳粉中添加炸蛋，请参考炸蛋的教程","配料的选择请依照个人口味"],"required":[["vibe-e8a28be8a385e89ebae89bb3e7b289","1包","袋装螺蛳粉"]],"optional":[],"pantry":[["water","1L","水"]],"steps":[["烧水","锅中加水，将水烧开"],["煮米粉","下米粉，煮 3-5 分钟，期间用筷子搅拌，防止米粉粘在一起"],["加汤料","下汤料包，按个人口味添加"],["煮入味配料","下一部分配料包，如木耳，花生，螺蛳（这部分配料需要煮一会才入味）"],["调味","下调味包，按个人口味添加"],["捞出盛碗","搅拌后捞出，放入碗中"],["添加爽口配料","下剩下的配料包，如酸笋，豆皮（这部分配料不适合被汤泡太久）"],["享用","享用美食"]]},
  {"id":"staple_ma-la-jian-zhi-qiao-mai-mian","name":"麻辣减脂荞麦面","category":"主食","servings":1,"minutes":20,"difficulty":"简单","coverPath":"ai-generated/staple_ma-la-jian-zhi-qiao-mai-mian.jpg","sourcePath":"dishes/staple/麻辣减脂荞麦面.md","calories":790,"tips":["一定要选半干荞麦面，口感最好","可以随意添加其他东西，比如火锅丸、蛋饺等","火锅底料、花生酱、牛奶一定要加，口味三大巨头","如果不能吃酸，可以不加醋"],"required":[["vibe-e58d8ae5b9b2e88d9ee9baa6e99da2","100g","半干荞麦面"],["babyCabbage","8片(约150g)","娃娃菜"],["lettuce","6片(约80g)","生菜"],["vibe-e781abe99485e5ba95e69699","25g","火锅底料"],["vibe-e88ab1e7949fe985b1","15g","花生酱"],["vibe-e585a8e88482e7899be5a5b6","150ml","全脂牛奶"],["vibe-e8bea3e6a492e6b2b9","10ml","辣椒油"],["vibe-e88ab1e6a492e6b2b9","10ml","花椒油"]],"optional":[["vinegar","20ml","醋"]],"pantry":[["soy","6ml","生抽"],["water","500ml","水"]],"steps":[["食材预处理","将娃娃菜、生菜洗好，备用。"],["初煮面菜","锅内倒入 500ml 水，开大火，将荞麦面和娃娃菜放进去，等待水沸腾。"],["调味与焖煮","水沸腾后，转小火，加入火锅底料、花生酱、牛奶、生抽、辣椒油，水开后煮 5 分钟。"],["加入绿叶菜","加入生菜，再煮 2 分钟。"],["最后调味","加入醋、花椒油，关火，直接端着小锅开吃。"]]},
  {"id":"staple_ma-you-ban-mian","name":"麻油拌面","category":"主食","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/staple_ma-you-ban-mian.jpg","sourcePath":"dishes/staple/麻油拌面.md","calories":451,"tips":["30g 盐仅用于煮面水，不会被全部食用，主要作用是增加面条韧性"],"required":[["vibe-e9a38ee5b9b2e5bfabe7869fe99da2","1块","风干快熟面"],["vibe-e9babbe6b2b9","15ml","麻油"]],"optional":[["salt","30g","盐"],["soy","5g","生抽"]],"pantry":[["darkSoy","10g","老抽"],["whitePepper","10g","胡椒粉"],["water","1升","水"]],"steps":[["煮水","将水倒入锅中并煮沸。"],["下入面条","将快熟面放入锅中煮 3 分钟。"],["搅拌受热","当面开始散了可以开始搅拌，让面受热均匀。"],["沥水装碗","将水滤干，把面倒入碗中。"],["加入调料","按照计量放入麻油、老抽、胡椒粉、生抽（可选）。"],["搅拌均匀","使用筷子将调料与面条搅拌均匀。"],["完成","一道简单即省钱的懒人麻油拌面就完成啦。"]]},
  {"id":"staple_re-gan-mian","name":"热干面","category":"主食","servings":1,"minutes":15,"difficulty":"中等","coverPath":"ai-generated/staple_re-gan-mian.jpg","sourcePath":"dishes/staple/热干面.md","calories":1341,"tips":["辣椒油看个人口味添加","如果觉得太干，可以多加一点肉汤汁","面条煮好后不能过冷水，要直接拌酱"],"required":[["vibe-e7a2b1e6b0b4e99da2","250g","碱水面"],["scallion","10g","小葱"],["vibe-e985b8e8b186e8a792","20g","酸豆角"],["vibe-e88289e69cab","30g","肉末"],["vibe-e8929ce6b0b4","30ml","蒜水"],["vibe-e88289e6b1a4e6b181","30ml","肉汤汁"],["vibe-e8909de58d9ce5b9b2","50g","萝卜干"],["vibe-e88a9de9babbe985b1","40ml","芝麻酱"]],"optional":[["vibe-e8bea3e6a492e6b2b9","0-10ml","辣椒油"],["vibe-e9b8a1e7b2be","0-3g","鸡精"]],"pantry":[["whitePepper","0-10g","胡椒粉"],["vibe-e985b1e6b2b9","5ml","酱油"],["salt","3g","食盐"]],"steps":[["煮面捞起","水煮沸，并加入碱水面，焯烫 25 秒钟捞起"],["干料调味","撒上食盐、鸡精和胡椒粉"],["调制芝麻酱","芝麻酱用 90ml 水稀释，搅匀，然后加入面中"],["加入液态调味","加入 5ml 酱油，加入 30ml 肉汤汁和蒜水"],["添加配料","加入萝卜干，肉末，酸豆角，葱花"],["拌匀食用","拌均匀后开吃"]]},
  {"id":"staple_rou-dan-gai-fan","name":"肉蛋盖饭","category":"主食","servings":1,"minutes":15,"difficulty":"中等","coverPath":"ai-generated/staple_rou-dan-gai-fan.jpg","sourcePath":"dishes/staple/肉蛋盖饭.md","calories":1822,"tips":["如果喜欢甜口可以增加 10g 糖","请务必保证做完饭后关掉燃气设备以免发生危险"],"required":[["rice","240g","米饭"],["egg","4个","鸡蛋"],["vibe-e88289e9a685","300g","肉馅"],["scallion","10g","葱"]],"optional":[["vibe-e7baa2e891b1e6b2b9","10g","红葱油"]],"pantry":[["darkSoy","10ml","老抽"],["soy","25ml","生抽"],["vinegar","20ml","醋"],["oil","30ml","油"],["sugar","15g","糖"]],"steps":[["煮米饭","煮好米饭，通常使用买米赠送的量杯，一杯米 240g"],["热油","锅中放油 30ml"],["煎肉馅","放入肉馅，调中火煎至两面微焦"],["下鸡蛋焖煮","将鸡蛋打入锅中，不要打散，盖上锅盖"],["调制碗汁","调一个碗汁，碗中放入计算中的对应数量的老抽，生抽，醋，糖，红葱油，搅拌均匀"],["倒入酱汁焖煮","打开锅盖，将碗汁倒入锅中，等待三分钟"],["组合盖饭","关火，将肉蛋盖到米饭上"],["安全检查","安全检查，开始食用盖饭"]]},
  {"id":"staple_shou-gong-shui-jiao","name":"手工水饺","category":"主食","servings":1,"minutes":180,"difficulty":"较难","coverPath":"ai-generated/staple_shou-gong-shui-jiao.jpg","sourcePath":"dishes/staple/手工水饺.md","calories":1313,"tips":["煮水饺不需要盖锅盖，防止表皮破损。","蘸料建议：黑醋10-20ml，可搭配姜丝、香油或蒜泥。","吃完蒜泥后建议清洁口腔，以免残留气味影响交谈。","新手擀皮若不圆，可以多练习手眼配合。"],"required":[["flour","200g","面粉"],["vibe-e798a6e88289e69cab","250g","瘦肉末"],["vibe-e88a9de9babbe9a699e6b2b9","2-3ml","芝麻香油"],["ginger","3g","姜"],["scallion","15g","葱"],["egg","1个","鸡蛋"]],"optional":[["vibe-e882a5e88289e69cab","20g","肥肉末"],["vibe-e9bb91e9868b","10-20ml","黑醋"],["garlic","3瓣","大蒜"]],"pantry":[["water","150ml","冷水"],["salt","3g","盐"],["oysterSauce","2ml","蚝油"],["soy","2ml","生抽"],["sesame","2ml","香油"]],"steps":[["揉面准备","盆中加入所有面粉和芝麻香油，在面粉中央挖个小洞。"],["加水和面","分4-5次加入冷水并搅和，当出现碎末状干燥面团时停止加水，用手将面团压实，直到盆光面光。"],["面团醒发","将面团置于桌上，用盆倒扣，在25度环境温度下醒发约45分钟。"],["揉条切剂","将面团搓成长条并重复揉搓3次，最后切成20份均匀的面团，搓成直径3-3.5cm的球状。"],["擀皮","撒上面粉防粘，将面团压扁，用擀面杖擀成直径8cm、边缘厚2mm、中间厚3mm的圆片。"],["剁馅调味","猪肉剁成肉末，加入葱姜末搅拌；韭菜切至3mm以下长度。混合肉沫、韭菜、蚝油、生抽、香油和蛋清。"],["静置入味","馅料搅拌均匀后放置30分钟，使调料充分渗透。"],["包饺子","左手拿皮，右手用筷子夹约皮直径1/2的馅。沿圆周合拢捏实，确保不漏。"],["煮饺子","水烧开后下饺子，调至中火。水开后分三次加入50ml冷水。第三次水开后加入冷水，转小火等60秒出锅。"]]},
  {"id":"staple_suan-la-jue-gen-fen","name":"酸辣蕨根粉","category":"主食","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/staple_suan-la-jue-gen-fen.jpg","sourcePath":"dishes/staple/酸辣蕨根粉.md","calories":318,"tips":["葱姜蒜为附加调料，加入可以增添风味，不加也并无大碍","糖和盐根据个人口味，需要加入的具体量不同，请酌情加入","建议使用碗作为最终装盘餐具，因为使用盘子会使吃粉变得困难一些","整体口味偏辣，如果不能吃辣请减少油泼辣子的量并且不加入小米辣"],"required":[["vibe-e895a8e6a0b9e7b289","100g (1人份)","蕨根粉"],["vibe-e6b2b9e6b3bce8bea3e5ad90","2勺","油泼辣子"]],"optional":[["vibe-e5b08fe7b1b3e8bea3","1-2个","小米辣"],["garlic","2瓣","蒜"],["scallion","1根","葱"]],"pantry":[["vibe-e985b1e6b2b9","3勺","酱油"],["vibe-e9a699e9868b","2勺","香醋"],["salt","2-5克","盐"],["sugar","2克","糖"]],"steps":[["烧水","锅中加入约为深度 3/5 的水，大火烧开。"],["煮制蕨根粉","水沸腾后加入蕨根粉，转中小火煮 8 分钟后出锅。"],["调制酱料","按照酱油、醋、油泼辣子 3:2:2 的比例混合，加入盐和糖，充分搅拌至溶解。"],["过水与装盘","将煮好的蕨根粉过冷水，沥干后放入装有酱料的碗中，充分搅拌。"],["撒上配料完成","将葱、蒜、小米辣切碎，撒在粉上即可。"]]},
  {"id":"staple_tang-mian","name":"汤面","category":"主食","servings":1,"minutes":30,"difficulty":"简单","coverPath":"ai-generated/staple_tang-mian.jpg","sourcePath":"dishes/staple/汤面.md","calories":565,"tips":["操作流程可根据自己喜好更改，多多尝试会有惊喜","如掌握不好加盐量，可采用少量多次添加的方法，以免过量"],"required":[["vibe-e99da2e9a39fe69d90e69699","70-230g","面食材料"],["vibe-e894ace88f9ce7b1bb","适量（体积约与面相当）","蔬菜类"]],"optional":[["vibe-e88289e7b1bb2fe89b8be7b1bb2fe8b186e588b6e59381","适量（体积约与面相当）","肉类/蛋类/豆制品"],["whitePepper","适量","胡椒粉"],["sesame","少许","香油"]],"pantry":[["water","200-400ml","冷水"],["salt","适量","盐"]],"steps":[["食材预处理","先将菜类材料切成边长不超过 4cm 的块状，便于煮熟。"],["处理生肉（可选）","如有生肉，则先放入冷水中，盖上锅盖，煮沸腾，先捞出上层血沫，再关火，捞出半熟的肉备用。"],["烧水","先大火将水加热至沸腾，后调至中火。"],["煮制耐煮食材","将较难煮熟的食材放入锅中（比如半熟肉类、香菇类等）。沸腾后计时 10 分钟，特别难熟的大块食材可追加 5 分钟。"],["煮面","将面食放入锅中，适当搅拌确保面和汤充分接触，使液面保持轻微沸腾，煮 5 分钟。"],["加入易熟蔬菜","将易于煮熟的食材如青菜类放入锅中，适当搅拌以充分浸没，煮 2-5 分钟。"],["调味出锅","关火，随后加入盐、胡椒粉、香油等自己喜欢的调味料，适当搅拌即可出锅食用。"]]},
  {"id":"staple_xian-rou-cai-fan","name":"咸肉菜饭","category":"主食","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/staple_xian-rou-cai-fan.jpg","sourcePath":"dishes/staple/咸肉菜饭.md","calories":847,"tips":["炒好的咸肉和菜梗铺在饭上，煮饭时千万不要搅匀","尽量不要买“家乡鲜肉”，可以预期会很咸。如果不是淡咸肉可以混入新鲜五花肉丁，或减少咸肉的用量，或将瘦肉部分切下泡入 5% 糖水 20 分钟。","参考资料：咸肉菜饭 - 维基百科"],"required":[["vibe-e5a4a7e7b1b3","300g","大米"],["bokchoy","400g","青菜"],["vibe-e592b8e88289","150g","咸肉"],["vibe-e78caae6b2b9","15g","猪油"]],"optional":[["vibe-e586ace7ac8b","100g","冬笋"],["wine","15ml","料酒"],["sugar","0-3g","白糖"],["whitePepper","1g","白胡椒粉"]],"pantry":[["water","310ml","水"]],"steps":[["处理冬笋","如果加入冬笋，切薄片后冷水下锅煮 10 分钟去涩味"],["切咸肉","咸肉切 1 cm 小丁"],["煸炒咸肉冬笋","咸肉和冬笋冷锅下 10 g 猪油、料酒、白糖，中小火煸炒到透明冒泡"],["处理青菜","青菜切碎，菜梗和菜叶分开放，菜梗切成 0.5 cm 小块，菜叶切成 2-3 cm 长条"],["炒菜梗","菜梗下锅炒到翡翠色"],["淘米准备","米淘净后倒进电饭煲，加水"],["铺料","把炒好的咸肉和菜梗铺在米上"],["煮饭及加入菜叶","正常煮饭模式启动，最后 10 分钟开盖快速铺入菜叶"],["焖制与拌匀","煮好后焖 5 分钟，再淋 5 g 猪油、白胡椒粉疯狂翻拌均匀"]]},
  {"id":"staple_xian-rou-shao-mai","name":"鲜肉烧卖","category":"主食","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/staple_xian-rou-shao-mai.jpg","sourcePath":"dishes/staple/鲜肉烧卖.md","calories":1485,"tips":["低脂版通过添加少量动物油和增稠剂来模拟肥肉的口感。","如果没有烧卖皮，可用大馄饨皮或饺子皮擀薄代替。","皮和馅的比例建议控制在 1:2 到 1:2.5 之间。","绞肉机建议用中档，保持肉末的颗粒感，口感更 Q 弹。","做多了可 -18 ℃ 冷冻保存，冷冻状态直接蒸需 12-15 分钟。","食用时推荐蘸玫瑰米醋，或搭配辣酱、姜丝。"],"required":[["vibe-e783a7e58d96e79aae","240-465g (约30张)","烧卖皮"],["mince","300g","猪肉末"],["vibe-e7949fe5a79ce69cab","5-10g","生姜末"],["vibe-e891b1e69cab","10-20g","葱末"],["vibe-e9ab98e6b1a4","30mL","高汤"]],"optional":[["sugar","2-3g","糖"],["whitePepper","2g","白胡椒粉"],["vibe-e6b593e6b1a4e5ae9d","6g","浓汤宝"],["vibe-e586ace7ac8b","50g","冬笋"],["vibe-e79aaee586bb","100g","皮冻"],["mushroom","75g","香菇"],["shrimp","100-200g","虾仁"],["vibe-e5a48de9858de9a39fe59381e5a29ee7a8a0e58982","1.2g","复配食品增稠剂"],["vibe-e78caae6b2b9","15g","猪油"]],"pantry":[["soy","15mL","生抽"],["wine","10mL","料酒"],["salt","3-5g","盐"],["sesame","5mL","芝麻油"]],"steps":[["调配增稠剂（低脂版专用）","取 10 mL 冷水，加入复配食品增稠剂，调成糊状。"],["制作凝胶（低脂版专用）","加入 25 mL 开水，快速搅拌至呈现半透明凝胶状。"],["瘦肉预处理（低脂版专用）","凝胶冷却后，混入 280 g 纯瘦肉糜和 15 g 融化的猪油。"],["基础拌馅","将猪肉末与生姜末、葱末混合，加入生抽、料酒、盐、糖、白胡椒粉，顺一个方向搅拌上劲。"],["准备汤汁","若使用浓汤宝，取 15 mL 热水混合化开，再加入 15 mL 常温水调匀。"],["打水上劲","慢慢将水或高汤分次加入肉馅，继续搅拌至完全吸收，馅料变得粘稠。"],["加入配料与冷藏","加入冬笋、皮冻、香菇碎，淋上芝麻油拌匀，冷藏 30 分钟。"],["包制烧卖","取一张皮，放上约 20-25 g 馅料，用虎口轻轻收拢成“花瓶”状，顶部留开口。"],["定型与装饰","轻轻压实底部确保站立稳定，在顶部开口处放上一颗虾仁。"],["上笼蒸制","水开后放入蒸笼，保持间隔，大火蒸 8-10 分钟即可。"]]},
  {"id":"staple_yin-du-kao-bing","name":"印度烤饼","category":"主食","servings":1,"minutes":90,"difficulty":"中等","coverPath":"ai-generated/staple_yin-du-kao-bing.jpg","sourcePath":"dishes/staple/印度烤饼.md","calories":559,"tips":["面团的柔软度是关键，太硬的面团烤出的饼会干硬。面团应该是湿润且略微粘手的状态。","铸铁锅比不粘锅效果更好，能产生更高的温度和更好的焦斑。","烤好后必须立刻涂酥油或黄油，这是印度烤饼香气和口感的关键。","常见的变体还有：蒜蓉烤饼(Garlic Naan)、芝士烤饼(Cheese Naan)、黄油烤饼(Butter Naan)。"],"required":[["flour","300g","中筋面粉"],["vibe-e985b8e5a5b6","60ml","酸奶"],["vibe-e5b9b2e985b5e6af8d","3g","干酵母"],["vibe-e985a5e6b2b9284768656529e68896e9bb84e6b2b9","30g","酥油(Ghee)或黄油"]],"optional":[["vibe-e9bb91e88a9de9babb","5g","黑芝麻"],["vibe-e9a699e88f9ce58fb6","10g","香菜叶"],["garlic","3瓣(约9g)","大蒜"]],"pantry":[["sugar","10g","糖"],["salt","5g","盐"],["oil","15ml","食用油"],["water","100ml","温水"]],"steps":[["激活酵母","将干酵母 3g 和糖 10g 溶解在 100ml 温水中，静置 5 分钟，直至表面冒出细泡沫。"],["混合干料","在大碗中放入中筋面粉 300g 和盐 5g，混合均匀。"],["和面","倒入酵母水、酸奶 60ml 和食用油 15ml，用手揉成光滑柔软的面团。"],["发酵","在面团表面涂 3ml 油防止干裂，用湿布或保鲜膜盖住，放置在温暖处发酵至少 1 小时。"],["分剂排气","取出面团轻揉排气，分成 6 个等大的小剂子（每个约 80g）。"],["擀制面饼","取一个剂子，用擀面杖擀成长椭圆形或泪滴形，厚度约 4-5mm。若做蒜蓉味则此时加入蒜末和香菜。"],["煎烤","平底锅大火加热至极烫，面饼一面刷水后刷水面朝下入锅。烤 1-2 分钟至鼓泡，翻面再烤 1-2 分钟。"],["涂油脂","取出后立即在表面涂上酥油或黄油。"]]},
  {"id":"staple_yin-du-men-fan--biryani","name":"印度焖饭 (Biryani)","category":"主食","servings":1,"minutes":90,"difficulty":"较难","coverPath":"ai-generated/staple_yin-du-men-fan--biryani.jpg","sourcePath":"dishes/staple/印度焖饭.md","calories":730,"tips":["巴斯马蒂香米是制作 Biryani 的必备原料，普通大米无法替代其独特的长粒香气。","密封焖制(Dum)是这道菜的精髓，蒸汽不能泄漏，否则米饭会干燥。","米饭只能煮到七成熟，因为焖制过程中会继续吸水变熟。","本食谱采用的是最常见的混合做法，鸡肉生肉铺底，米饭半熟组装。","此菜在印度是婚礼和节日的必备菜品，被誉为“印度的国菜”。"],"required":[["vibe-e5b7b4e696afe9a9ace89282e995bfe7b292e9a699e7b1b3284261736d617469205269636529","300g","巴斯马蒂长粒香米(Basmati Rice)"],["vibe-e9b8a1e885bfe88289","500g","鸡腿肉"],["vibe-e985b8e5a5b6","100ml","酸奶"],["onion","3个(约300g)","洋葱"],["ginger","15g","生姜"],["garlic","6瓣(约18g)","大蒜"],["vibe-e99d92e8bea3e6a492","3根","青辣椒"],["cilantro","20g","香菜"],["vibe-e89684e88db7e58fb6","20g","薄荷叶"],["vibe-e6b8a9e7899be5a5b6","30ml","温牛奶"],["vibe-e985a5e6b2b9284768656529","30g","酥油(Ghee)"],["vibe-e5a79ce9bb84e7b289","3g","姜黄粉"],["vibe-e7baa2e8bea3e6a492e7b289","5g","红辣椒粉"],["vibe-e58db0e5baa6e7bbbce59088e9a699e69699e7b28928476172616d204d6173616c6129","5g","印度综合香料粉(Garam Masala)"],["vibe-e585a8e9a699e69699","月桂叶2片、肉桂棒1根、小豆蔻3颗、丁香4颗、八角1颗","全香料"],["vibe-e69fa0e6aaace6b181","15ml","柠檬汁"]],"optional":[["tomato","适量","番茄"],["vibe-e8978fe7baa2e88ab12853616666726f6e29","0.5g","藏红花(Saffron)"],["vibe-e99da2e59ba2","适量","面团"]],"pantry":[["oil","50ml","食用油"],["salt","15g","盐"]],"steps":[["腌制鸡肉","在大碗中混合酸奶、姜蒜泥、红辣椒粉、姜黄粉、印度综合香料粉、盐和柠檬汁，放入鸡肉块均匀裹上腌料，盖保鲜膜冷藏腌制至少 1 小时。"],["准备藏红花牛奶和炸洋葱","藏红花放入温牛奶浸泡15分钟。同时在锅中加热食用油，将洋葱薄片翻炒至深金棕色且酥脆，捞出用厨房纸吸油。"],["煮半熟米饭","烧开2000ml水，加入所有全香料和10g盐，放入浸泡好的米饭大火煮5-6分钟至七成熟，立即沥干并丢弃全香料。"],["组装与密封","厚底锅底涂酥油，按顺序铺入腌鸡肉、一半米饭、一半配料（洋葱、薄荷、香菜、青椒）、剩余米饭、剩余配料，最后淋上藏红花牛奶和酥油。用面团条或锡纸密封锅盖。"],["焖制烹饪","先大火加热3分钟见蒸汽，再转最小火焖25-30分钟。"],["静置与翻拌","关火后不开盖静置5分钟。开盖后用大铲子从底部轻轻翻拌均匀，盛盘搭配酸奶食用。"]]},
  {"id":"staple_ying-zui-dou-zha-bing--chole-bhature","name":"鹰嘴豆炸饼 (Chole Bhature)","category":"主食","servings":1,"minutes":50,"difficulty":"中等","coverPath":"ai-generated/staple_ying-zui-dou-zha-bing--chole-bhature.jpg","sourcePath":"dishes/staple/鹰嘴豆炸饼.md","calories":1098,"tips":["鹰嘴豆提前浸泡是必须步骤，不泡的话煮不软。如果时间紧迫，可以用高压锅将未泡的鹰嘴豆压 20 分钟。","红茶包的作用是给鹰嘴豆上色，使其呈现深棕色。这是印度餐厅的秘诀。","炸饼面团中的酸奶和小苏打是其松软蓬松的关键。面团不宜太硬。","炸饼趁热食用口感最佳，搭配洋葱片和柠檬角可以解腻增香。"],"required":[["vibe-e5b9b2e9b9b0e598b4e8b186","200g","干鹰嘴豆"],["onion","2个（约200g）","洋葱"],["tomato","3个（约300g）","番茄"],["ginger","10g","生姜"],["garlic","4瓣（约12g）","大蒜"],["vibe-e99d92e8bea3e6a492","2根","青辣椒"],["flour","250g","中筋面粉"],["vibe-e985b8e5a5b6","60ml","酸奶"],["vibe-e7baa2e88cb6e58c85","1个","红茶包"],["vibe-e58db0e5baa6e7bbbce59088e9a699e69699e7b28928476172616d204d6173616c6129","5g","印度综合香料粉(Garam Masala)"],["vibe-e5b08fe88b8fe68993","2g","小苏打"],["vibe-e5a48de59088e9a699e6969928e5a79ce9bb842fe7baa2e8bea3e6a4922fe9a699e88f9c2fe5ad9ce784b6e7b28929","共21g","复合香料(姜黄/红辣椒/香菜/孜然粉)"]],"optional":[["vibe-e79fb3e6a6b4e7b28928416d6368757229","3g","石榴粉(Amchur)"]],"pantry":[["oil","30ml+15ml+500ml","食用油"]],"steps":[["浸泡鹰嘴豆","将干鹰嘴豆用清水浸泡过夜（至少 8 小时），直至体积膨胀至约两倍。"],["煮制鹰嘴豆","沥干豆子，入锅加500ml水和红茶包，大火煮沸转中火煮25-30分钟，至豆子可用手指压碎。捞出茶包，保留汤水。"],["炒制洋葱底料","炒锅热油，中火将碎洋葱翻炒至金棕色（约6-8分钟），再加入姜蒜泥翻炒1分钟。"],["熬制番茄香料酱","加入番茄炒至软烂出油，混入姜黄粉、辣椒粉、香菜粉、孜然粉和盐，翻炒2分钟释放香味。"],["炖煮咖喱","倒入鹰嘴豆及原汤、青辣椒，大火煮沸转小火炖15-20分钟。期间压碎部分豆子增稠。最后加入综合香料粉和石榴粉调味。"],["制作面团","混合面粉、小苏打、盐，加入酸奶和油，逐渐加入温水揉成光滑柔软的面团。盖湿布静置30分钟。"],["擀皮与炸制","面团分8份，擀成3mm厚圆饼。油温180°C时滑入面饼，轻压使其膨胀，炸至两面金黄（约1-2分钟）。"]]},
  {"id":"staple_zha-jiang-mian","name":"炸酱面","category":"主食","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/staple_zha-jiang-mian.jpg","sourcePath":"dishes/staple/炸酱面.md","calories":1272,"tips":["肉推荐瘦肉丁，口感更好，推荐现买现用。","面条推荐使用普通面条，口感关键在于劲道，勿选龙须等细面。","如有条件且熟练后，炒酱（第2、3步）与处理面条（第1、4、5、6步）可分时并行执行以缩短时间。","甜咸口味因人而异，两种酱的配比需要根据个人喜好进行迭代优化。"],"required":[["vibe-e88289e4b8812fe88289e69cab","150g","肉丁/肉末"],["scallion","15g","葱"],["vibe-e88f9ce7a081","35g","菜码"],["vibe-e8b186e793a3e985b1","20g","豆瓣酱"],["vibe-e7949ce99da2e985b1","20g","甜面酱"]],"optional":[["noodles","150g","挂面"],["vibe-e699aee9809ae99da2e69da1","250g","普通面条"]],"pantry":[["oil","10g","食用油"]],"steps":[["准备菜码","菜码切丝备用。"],["煸炒肉丁","葱切碎。油锅烧热，下葱和肉，炒至肉完全熟透（无红色）。"],["熬制炸酱","下豆瓣酱和甜面酱，继续炒至微微粘稠。盛出，得到炸酱。"],["准备凉水","取大碗，加凉水备用。"],["煮面条","煮面条至断生（无白芯），盛入第 4 步装有凉水的碗中。"],["面条控水","立即控水捞出，盛入干净的碗中。"],["拌匀享用","取第 3 步炸酱，倒入碗中，拌匀。然后取第 1 步菜码，倒入碗中，拌匀。"]]},
  {"id":"staple_zhao-shao-ji-tui-fan","name":"照烧鸡腿饭","category":"主食","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/staple_zhao-shao-ji-tui-fan.jpg","sourcePath":"dishes/staple/照烧鸡腿饭.md","calories":1670,"tips":["如果使用白砂糖、淀粉组合代替一定让白砂糖和淀粉完全溶解再下锅，否则容易糊锅","焖煮时每隔 3-5 分钟翻搅一下，避免局部过热","如果酱汁冒大泡、颜色变深褐，或边缘出现细密焦糖结晶，立即关火"],"required":[["thigh","500g(约3只)","鸡腿"],["vibe-e9bb91e6a492e7a28e","5g","黑椒碎"],["vibe-e9bb91e6a492e7b289","5g","黑椒粉"],["broccoli","50g","西兰花"],["carrot","50g","胡萝卜"],["garlic","10g","大蒜"],["ginger","10g","生姜"],["rice","300-400g","米饭"]],"optional":[["vibe-e89c82e89c9c","15ml","蜂蜜"]],"pantry":[["wine","15ml","料酒"],["soy","30ml","生抽"],["salt","2.5g","盐"],["darkSoy","12ml","老抽"],["oil","15-25ml","食用油"],["water","30ml","清水"]],"steps":[["准备鸡腿","取一只鸡腿，鸡皮朝下放在砧板上"],["划开鸡肉","用刀尖沿着鸡腿骨头的轮廓轻轻划开，从一端到另一端"],["剥离骨头","用手指或刀背慢慢推开鸡肉，让骨头暴露出来。如果遇到筋膜，用刀尖切断"],["拔出骨头","当鸡肉完全分离后，握住骨头一端，轻轻扭转并拔出"],["完成去骨","重复上述步骤将所有鸡腿去骨"],["腌制鸡腿","去骨鸡腿加入黑胡椒粉、黑胡椒碎、盐、姜片腌制 5 分钟"],["调制酱汁","碗里加入料酒、生抽、蜂蜜、老抽清水拌匀"],["处理蔬菜","蔬菜焯水 1-2 分钟煮熟捞起"],["爆香蒜瓣","热锅放油 15 ml 放入拍碎的大蒜爆香"],["煎鸡腿","放入鸡腿中小火煎至两面金黄，如果感觉锅中太干，补 5-10 ml 油"],["焖煮收汁","加入调好的酱汁，盖好盖子中小火焖 5-10 分钟熟透，酱汁浓稠起泡即可"],["切件摆盘","切件，和蔬菜一起摆在饭面，淋入煎鸡腿的酱汁即可"]]},
  {"id":"staple_zheng-lu-mian","name":"蒸卤面","category":"主食","servings":1,"minutes":60,"difficulty":"中等","coverPath":"ai-generated/staple_zheng-lu-mian.jpg","sourcePath":"dishes/staple/蒸卤面.md","calories":1563,"tips":["切割猪肉时，可以让菜市场摊贩帮忙，在付款前请求成功率最高","新手建议提前备好所有料，熟练后可并发执行蒸面和炒菜","两次蒸面都要尽量弄散，避免粘连","佐餐时啤酒更配"],"required":[["vibe-e78caae4ba94e88ab1e88289","350g","猪五花肉"],["celery","2根中等大小","芹菜"],["vibe-e9b29ce99da2e69da1","500g","鲜面条"],["vibe-e5a4a7e891b1","10cm","大葱"],["garlic","5瓣","大蒜"],["ginger","20g","姜片"],["vibe-e4ba94e9a699e7b289","5g","五香粉"]],"optional":[["vibe-e99d92e6a492","2个","青椒"],["vibe-e5b9b2e7baa2e6a492","3个","干红椒"],["vibe-e88ab1e6a492","20粒","花椒"]],"pantry":[["oil","适量","食用油"],["soy","15ml","生抽"],["darkSoy","10ml","老抽"],["wine","适量","料酒"],["salt","10g","盐"]],"steps":[["食材预处理","猪肉去皮切成2cm*6cm*0.5cm薄片；芹菜去叶根切2cm段；葱姜蒜按要求切片/丝/粒。"],["滑锅与炒肉","热锅至冒烟，用3ml油滑锅后倒出。重新加油，入肉片、葱姜蒜、干红椒匀速翻炒1分钟。"],["调味与炖汤","加入料酒、生抽、老抽翻炒1分钟。倒入500ml热水，盖盖炖煮3分钟。"],["配菜炖煮","加入芹菜、青椒、盐、五香粉，盖盖继续炖煮3分钟后关火。"],["初次蒸面","蒸锅烧开上汽，面条摊平在笼屉上蒸15分钟。取出后在案板上扒拉散开冷却。"],["搅拌上色","将面条倒入菜锅，一手持筷一手持铲翻拌，直到面条全部均匀上色。"],["二次蒸制","将拌好的面条重新放回蒸屉，再次蒸10分钟即可关火。"]]},
  {"id":"staple_zhu-pao-mian-jia-dan","name":"煮泡面加蛋","category":"主食","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/staple_zhu-pao-mian-jia-dan.jpg","sourcePath":"dishes/staple/煮泡面加蛋.md","calories":550,"tips":["本指南中的鸡蛋包括但不仅限于：生鸡蛋，熟鸡蛋，卤蛋等","可根据个人需要加入佐料，和其他食材包括但不仅限于：火腿肠，生菜，小肉丝，辣条，鱼干，虾仁，鸡腿","单人份量能支撑一个成年人不饥饿状态约 3 至 4 小时"],"required":[["vibe-e6b3a1e99da2","1包","泡面"],["egg","1个","鸡蛋"]],"optional":[],"pantry":[["water","550ml-1000ml","水"]],"steps":[["烧水","先将水加热至沸腾"],["下面饼","将取出的面饼放入锅中"],["下佐料","将泡面里附带的佐料放入锅中"],["拨动面饼","取出筷子轻微拨动泡面，使佐料充分溶解，面饼充分浸泡受热"],["复滚","盖上锅盖等待约 1 分钟至锅内水再次沸腾"],["加蛋","去壳鸡蛋，加入锅中"],["焖煮","等待约 3 至 4 分钟，即可"]]},
  {"id":"staple_zhu-you-ban-fan","name":"猪油拌饭","category":"主食","servings":1,"minutes":5,"difficulty":"简单","coverPath":"ai-generated/staple_zhu-you-ban-fan.jpg","sourcePath":"dishes/staple/猪油拌饭.md","calories":420,"tips":["建议搭配瘦肉和蔬菜食用来均衡营养","高胆固醇，不建议经常食用","参考资料：猪油拌饭 - 维基百科"],"required":[["rice","200g","米饭"],["vibe-e78caae6b2b9","15g","猪油"]],"optional":[["oysterSauce","8g","蚝油"],["scallion","5g","葱花"],["vibe-e78caae6b2b9e6b8a3","5g","猪油渣"]],"pantry":[["soy","5ml","生抽"],["darkSoy","2ml","老抽"]],"steps":[["铺底","在碗底铺上准备好的猪油"],["盛饭","盛入刚煮好的热米饭，盖在猪油上"],["调味","淋上生抽、老抽和蚝油"],["点缀","撒上葱花和猪油渣"],["搅拌","用勺子迅速搅拌均匀，直至每粒米饭都裹上油脂和酱色"]]},
  {"id":"vegetable_dish_chao-qie-zi","name":"炒茄子","category":"素菜","servings":1,"minutes":20,"difficulty":"中等","coverPath":"ai-generated/vegetable_dish_chao-qie-zi.jpg","sourcePath":"dishes/vegetable_dish/炒茄子.md","calories":610,"tips":["酱油含盐，通常不必额外加盐。出锅前可品尝，若淡可微量加盐。","加入虾皮时需酌情减少酱油量。","炒制过程中严禁加水，否则会变成水煮茄子，影响口感。","糖和醋必须在最后阶段加入，快进快出保持风味。","油量是保证茄子软嫩的关键，宁多勿少。"],"required":[["eggplant","1.8个","茄子"],["vibe-e88f9ce7b1bde6b2b9e68896e88ab1e7949fe6b2b9","适量","菜籽油或花生油"]],"optional":[["starAnise","1个","八角"],["vibe-e899bee79aae","半把","虾皮"],["scallion","2颗","香葱"],["vibe-e88289e69cab","50g","肉末"],["sugar","5g","糖"],["vinegar","10ml","醋"]],"pantry":[["vibe-e985b1e6b2b9","40ml","酱油"]],"steps":[["食材预处理","将茄子洗净，竖切一刀分为两段。每段切成菱形块，放入碗中待命。"],["准备辅料","将香葱洗净切成葱花；八角切好备用。"],["预炒肉末","如使用肉末，用10-15ml油中火炒至变色（约1分钟），盛出备用。"],["热锅倒油","开火热锅至无水，倒入食用油，油量需没过锅底的两倍。"],["炸香辅料","油温热至6成时，放入八角、虾皮、香葱。若无可选材料则热油至9成。"],["下茄子翻炒","油温至9成热时，倒入茄子大火翻炒约40秒。"],["加入酱油","将酱油倒入锅铲内（一人份约2.5锅铲），再淋入锅中翻炒。"],["合炒肉末","茄子炒至半软时（约1分钟后），放回肉末，快速搅拌均匀。"],["调味出锅","加入糖和醋，继续翻炒至所有茄子变色变软后捞出。"]]},
  {"id":"vegetable_dish_chao-qing-cai","name":"炒青菜","category":"素菜","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/vegetable_dish_chao-qing-cai.jpg","sourcePath":"dishes/vegetable_dish/炒青菜.md","calories":152,"tips":["加入白糖，会让青菜颜色更绿。","全程火候控制在中小火与大火之间，避免叶片烧焦。"],"required":[["bokchoy","100g","青菜"],["garlic","2粒","蒜瓣"]],"optional":[],"pantry":[["oil","10-15ml","食用油"],["salt","2g","食盐"],["water","70ml","饮用水"],["sugar","5g","白糖"]],"steps":[["食材预处理","青菜掰成小瓣，用清水洗净，备用。"],["切配辅料","将蒜瓣剁碎，备用。"],["热锅凉油","中火或大火热锅后，锅内放入 10-15ml 食用油。再等待 30 秒让油温升高。"],["翻炒青菜","将准备好的青菜倒入锅中，翻炒至青菜变软（约 1 分钟）。"],["加入蒜末","放入剁碎的蒜瓣。"],["加水调味","倒入计算好的清水，水位应当完全浸润或即将没过青菜，加入食盐，继续翻炒约 1 分钟。"],["焖煮提色","最后加入白糖小火加热 2 分钟，加热时盖上锅盖。"],["出锅盛盘","盛盘。"]]},
  {"id":"vegetable_dish_cong-jian-dou-fu","name":"葱煎豆腐","category":"素菜","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/vegetable_dish_cong-jian-dou-fu.jpg","sourcePath":"dishes/vegetable_dish/葱煎豆腐.md","calories":364,"tips":["煎豆腐时需掌握小火慢煎，新手需耐心操作","切豆腐时厚度保持在5mm左右，口感最佳"],"required":[["vibe-e799bde8b186e88590","0.8块","白豆腐"],["scallion","0.67根","葱"],["vibe-e99d92e8bea3e6a492","0.5只","青辣椒"]],"optional":[],"pantry":[["salt","3g","盐"],["vibe-e9b8a1e7b2be","1.5g","鸡精"],["oil","9ml","食用油"]],"steps":[["豆腐改刀","豆腐洗净。切约 5 mm 厚度，置于碟中。"],["切葱花","葱洗净，除去根部，切成葱花，备用。"],["处理辣椒","辣椒洗净，切开，去籽，切成 1cm * 1cm 状，备用。"],["热锅注油","热锅，加入适量油（每份约9ml）。"],["煎豆腐","使油均匀布于锅底，均匀放入豆腐，小火煎至金黄翻面。"],["豆腐出锅","待两面金黄，盛入碟中备用。"],["炒辣椒","补油至覆盖锅底，倒入辣椒大火翻炒，并铲碾 3 分钟。"],["调味与收汁","倒入豆腐，翻炒，加入盐与鸡精，中火翻炒 1 分钟后倒入 10 ML 水，大火收汁。"],["撒葱出锅","出锅前撒上葱花，起锅盛盘。"]]},
  {"id":"vegetable_dish_cui-pi-dou-fu","name":"脆皮豆腐","category":"素菜","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/vegetable_dish_cui-pi-dou-fu.jpg","sourcePath":"dishes/vegetable_dish/脆皮豆腐.md","calories":840,"tips":["制作需要耐心煎出金黄脆皮，急火容易导致外焦里生","酱汁比例可根据个人喜好微调咸甜度","建议使用不粘平底锅以降低操作难度"],"required":[["vibe-e88081e8b186e88590","1块(约1.25格/人)","老豆腐"],["egg","2只","鸡蛋"]],"optional":[],"pantry":[["starch","60g","玉米淀粉"],["soy","20g","生抽"],["oysterSauce","10g","蚝油"],["darkSoy","5g","老抽"],["sugar","10g","白糖"],["water","200ml","清水"],["oil","18ml","食用油"]],"steps":[["准备蛋液","鸡蛋搅拌形成蛋液放置备用。"],["配置酱料","将20g生抽、10g蚝油、5g老抽、10g白糖、10g玉米淀粉和200ml清水混合均匀。"],["豆腐切片","老豆腐切成厚度约1.2cm的片（建议每人5片）。"],["挂糊处理","将老豆腐片先均匀粘上一层干淀粉，再浸入蛋液中裹匀，放置备用。"],["热锅烧油","热锅，锅内放入18ml食用油，等待10秒让油温升高。"],["小火煎制","将豆腐片均匀放入锅中铺好，小火煎至底面金黄后翻面，煎至两面金黄。"],["焖煮收汁","倒入酱料，让每块豆腐充分接触酱汁，大火煮3分钟至酱汁浓稠。"],["关火出锅","待汤汁浓稠后关火装盘。"]]},
  {"id":"vegetable_dish_hao-you-sheng-cai","name":"蚝油生菜","category":"素菜","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/vegetable_dish_hao-you-sheng-cai.jpg","sourcePath":"dishes/vegetable_dish/蚝油生菜.md","calories":125,"tips":["这道菜富含维生素，做法简单，尝起来爽口又不上火。","焯水时加入油盐是蔬菜亮绿的关键秘诀。","蒜泥的用量可以根据个人口味适当增减。"],"required":[["lettuce","1 棵( 200 g ± 50 )","生菜"],["garlic","4-5 瓣","大蒜"]],"optional":[],"pantry":[["oysterSauce","6-8 ml","蚝油"],["soy","6 ml","生抽"],["salt","0.5 g","盐"],["sugar","1 g","白糖"],["oil","5-8 ml","食用油"]],"steps":[["食材预处理","生菜洗净并去掉烂菜叶。"],["烧水准备","热锅，放入 1 L 清水，然后在锅内放入 2 ml - 3 ml 食用油和 0.5 g 盐，等待锅中的水煮沸。"],["生菜焯水","水沸后，放入生菜，将每一片生菜叶都焯水 10 s。"],["捞出摆盘","捞出生菜，控干水份，摆盘。"],["调制酱汁","将生抽 10 ml 、蚝油 6-8 ml 、盐 0.5 g 、 白糖 1 g 放入碗中调匀，并加入 10-15 ml 清水搅拌均匀。"],["爆香蒜泥","再开火，热锅，放入食用油 5-8 ml，油热放入蒜泥。"],["煮沸酱汁","等待有蒜香飘出，倒入调好的汁，煮沸即可，立马关火。"],["浇汁完成","将锅中的汤汁均匀地浇在生菜上。"]]},
  {"id":"vegetable_dish_hong-shao-qie-zi","name":"红烧茄子","category":"素菜","servings":1,"minutes":45,"difficulty":"中等","coverPath":"ai-generated/vegetable_dish_hong-shao-qie-zi.jpg","sourcePath":"dishes/vegetable_dish/红烧茄子.md","calories":547,"tips":["在操作的第 4-6 步骤中一定要顺序执行，否则会有灾难性错误","茄子挂糊油炸是关键，油温控制决定了茄子是否油腻"],"required":[["vibe-e99d92e88c84e5ad90","0.7个","青茄子"],["vibe-e99d92e8bea3e6a492","0.5个","青辣椒"],["onion","0.3个","洋葱"],["tomato","1个","西红柿"],["vibe-e5a4a7e891b1","0.5颗","大葱"],["garlic","3瓣","大蒜"],["egg","1个","鸡蛋"],["flour","105g","面粉"]],"optional":[],"pantry":[["starch","26.25g","淀粉"],["vibe-e985b1e6b2b9","5g","酱油"],["salt","8.25g","盐"]],"steps":[["清洗食材","将青茄子、青辣椒、西红柿、洋葱、大葱洗净备用。"],["切配辅料","大葱切 5 毫米宽的葱花，大蒜扒皮并拍碎，西红柿切 6 立方厘米的块，青辣椒、洋葱切 5g 的块。"],["切茄子","茄子切菱形块：先切 2 公分厚的片，然后再把片切成 2 公分的条，最后斜刀切块儿。"],["调配初始面糊","将面粉倒入盆中，依次加入少量水，搅拌均匀，呈粘稠糊状。"],["加入淀粉","加入淀粉，加入 30 克水，搅拌均匀。"],["加入鸡蛋和盐","将鸡蛋打到盆中，加入（面粉 / 20）克的盐，搅拌均匀。"],["茄子挂糊","将茄块倒入面糊中，搅拌使茄块的每一面都能沾上面糊。"],["油炸茄块","开大火，热锅，加入 500 毫升的油，当看到油冒出一丝烟时，调至小火，将茄块用筷子夹入油锅，全部下锅后调至中火，炸至金黄色捞出，倒出余油。"],["炒香底料","加入（份数 * 5）g 的油，放入大蒜、葱花翻炒 15 秒，放入青辣椒块翻炒 30 秒，再放入西红柿翻炒 30 秒。"],["回锅加水","放入炸好的茄块，加水至水位高度为锅内食材的 0.8 倍。"],["加入调料","放入酱油和（份数 * 3）g 的盐。"],["收汁盛出","等待直到汤汁呈粘稠状（水位为剩余食材高度的 0.2-0.3 倍），开盖盛出，关火。"]]},
  {"id":"vegetable_dish_ji-dan-huo-tui-chao-huang-gua","name":"鸡蛋火腿炒黄瓜","category":"素菜","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/vegetable_dish_ji-dan-huo-tui-chao-huang-gua.jpg","sourcePath":"dishes/vegetable_dish/鸡蛋火腿炒黄瓜.md","calories":337,"tips":["火腿是咸的，要在调味后才加入，这样不会让火腿也沾上盐"],"required":[["cucumber","1 根（约 200g）","黄瓜"],["egg","2 个","鸡蛋"],["vibe-e781abe885bfe882a0","1 根（约 40g）","火腿肠"]],"optional":[["vibe-e7baa2e5b096e6a492","1 个","红尖椒"]],"pantry":[["oil","10ml","食用油"],["soy","3ml","生抽"],["salt","2g","盐"]],"steps":[["处理黄瓜","黄瓜洗净，切半圆形片，备用"],["处理火腿","火腿切半圆形片，备用"],["准备辣椒","红尖椒（可选）切碎，备用"],["打散鸡蛋","将鸡蛋打入碗中，搅匀，即为 鸡蛋液"],["热锅倒油","热锅里倒 5ml 食用油"],["炒鸡蛋","油热后转小火，倒入打散的鸡蛋液，用筷子划散，翻炒至鸡蛋结为固体且颜色微微发黄，即为 半熟鸡蛋，盛出备用"],["炒黄瓜","不用洗锅，往锅内倒入 5ml 食用油，倒入黄瓜片大火翻炒 1 分钟"],["混合调味","把 半熟鸡蛋 倒入锅中，调入 2g 盐、3ml 生抽，立刻倒入火腿片和辣椒碎（可选）翻炒均匀"],["出锅","关火，盛盘"]]},
  {"id":"vegetable_dish_jia-chang-ri-ben-dou-fu","name":"家常日本豆腐","category":"素菜","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/vegetable_dish_jia-chang-ri-ben-dou-fu.jpg","sourcePath":"dishes/vegetable_dish/家常日本豆腐.md","calories":946,"tips":["煎好的豆腐不要放太久，否则外皮会变软，影响口感","建议提前准备好所有配料和调料，因为烹饪过程很快","如果添加了鸡精，盐的用量需大幅减少（约0.5g）或不放"],"required":[["vibe-e697a5e69cace8b186e88590","300g (约3个)","日本豆腐"],["vibe-e99d92e6a492","120g (中等大小1个)","青椒"],["carrot","50g","胡萝卜"],["garlic","10g (约2瓣)","蒜"],["vibe-e795aae88c84e985b1","15ml","番茄酱"]],"optional":[["vibe-e781abe885bfe882a0","50g (约1根)","火腿肠"],["vibe-e9bb91e69ca8e880b3","30g (干重约10g泡发)","黑木耳"],["onion","30g","洋葱"],["vibe-e9b8a1e7b2be","3g","鸡精"]],"pantry":[["starch","80g","生粉"],["oil","160-165ml","油"],["soy","8ml","生抽"],["oysterSauce","15ml","蚝油"],["salt","2g","盐"],["sugar","10g","白砂糖"]],"steps":[["食材预处理","胡萝卜切片，尖椒切薄块，葱蒜切碎备用。"],["切豆腐","将日本豆腐从包装中取出，切成厚度约为 1 cm 的圆柱体。"],["准备裹粉","将生粉均匀铺在平盘中。"],["豆腐裹面","轻轻将豆腐块放入粉盘，使上下两面及侧面都均匀裹上薄薄一层生粉。"],["煎炸豆腐","平底锅倒入约 150 ml 油，油温热后放入豆腐，煎至边缘金黄后翻面，两面均煎至金黄。"],["沥油备用","将煎好的豆腐捞出，放入干净的盘子中备用。"],["炒制配菜","炒锅倒入 10-15 ml 油，放入葱蒜爆香，随后加入青椒、胡萝卜、火腿肠和黑木耳翻炒。"],["调味","在锅中加入蚝油、生抽、盐、鸡精、白砂糖和番茄酱。"],["混合出锅","放入煎好的豆腐，轻轻翻炒至颜色均匀即可出锅。"]]},
  {"id":"vegetable_dish_jin-qian-dan","name":"金钱蛋","category":"素菜","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/vegetable_dish_jin-qian-dan.jpg","sourcePath":"dishes/vegetable_dish/金钱蛋.md","calories":427,"tips":["原汁原味的做法建议辣椒放 15 g，不能吃辣的减少到 6 g，还可以剔除辣椒籽","推荐使用不粘锅，使用不粘锅时初次放油可以减少 5 ml","应确保鸡蛋剥皮时已经完全凝固","不宜过度翻炒，容易散"],"required":[["egg","5个","鸡蛋"],["vibe-e7babfe6a492","15g","线椒"],["vibe-e5b08fe7b1b3e8bea3","6-15g","小米辣"],["vibe-e8b186e793a3e985b1","15ml","豆瓣酱"],["garlic","10g","蒜"],["scallion","3g","小葱"]],"optional":[["starch","40g","玉米淀粉"]],"pantry":[["oil","20-35ml","食用油"],["soy","15ml","生抽"],["oysterSauce","15ml","蚝油"],["sugar","5g","糖"]],"steps":[["煮蛋","鸡蛋冷水下锅，大火煮开转小火煮 8 分钟"],["冷却剥壳","用自来水冲凉，方便剥皮"],["切配料","蒜切沫（粒径不大于 1 mm），线椒和小米辣切小粒（约 2-3 mm）"],["切蛋片","每个熟鸡蛋沿短轴切成体积类似的 4 份"],["裹粉（可选）","如果打算沾淀粉，每片鸡蛋粘上淀粉，抖掉多余的淀粉"],["煎制第一面","锅内放入 25 ml 油（如果不沾淀粉，放 20 ml），放入熟鸡蛋片"],["翻面补油","煎至微焦黄后，补 10 ml 油（如果不沾淀粉，补 10 ml），翻面"],["炒制配料","第二面微黄后，加入线椒、小米辣、蒜末煎制约一分钟，翻面"],["加酱调味","接着加豆瓣酱煎制约几十秒，翻面"],["调汁出锅","生抽、耗油、糖调成汁，轻轻颠锅后即可出锅"]]},
  {"id":"vegetable_dish_jin-zhen-gu-ri-ben-dou-fu-bao","name":"金针菇日本豆腐煲","category":"素菜","servings":1,"minutes":30,"difficulty":"简单","coverPath":"ai-generated/vegetable_dish_jin-zhen-gu-ri-ben-dou-fu-bao.jpg","sourcePath":"dishes/vegetable_dish/金针菇日本豆腐煲.md","calories":606,"tips":["金针菇一定要先炒软","豆腐尽量不要翻炒，容易碎","如果喜欢更浓稠的汤汁，最后可以加少许水淀粉勾芡"],"required":[["enoki","1-2 把","金针菇"],["vibe-e697a5e69cace8b186e88590","2 袋","日本豆腐"],["vibe-e5b08fe7b1b3e6a492","3-5 根","小米椒"],["garlic","2-3 瓣","蒜"]],"optional":[],"pantry":[["soy","15ml","生抽"],["oysterSauce","5ml","蚝油"],["darkSoy","3ml","老抽"],["sugar","3g","糖"],["oil","10-15ml","食用油"]],"steps":[["煎日本豆腐","将日本豆腐切片，锅中放少许油，小火煎到两面金黄后出锅备用。"],["准备辅料和料汁","切蒜成蒜末；小米椒切碎；在一个小碗中将生抽、蚝油、老抽、糖和100ml水混合调汁备用。"],["焖煮收汁","热锅放油，油热后放入小米椒、蒜末爆香。先放入金针菇炒软，然后将煎好的豆腐平铺在金针菇上，倒入调好的料汁，盖盖焖5分钟，最后大火收汁。"]]},
  {"id":"vegetable_dish_lei-jiao-pi-dan","name":"雷椒皮蛋","category":"素菜","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/vegetable_dish_lei-jiao-pi-dan.jpg","sourcePath":"dishes/vegetable_dish/雷椒皮蛋.md","calories":448,"tips":["青椒去籽是关键，可防止煎炸时溅油。","如果砸击过程噪音过大，建议采用手撕和叉子压碎的替代方案。"],"required":[["vibe-e79aaee89b8b","2个","皮蛋"],["vibe-e995bfe69da1e99d92e6a492","4根 (长 10-15cm，宽 2-4cm)","长条青椒"],["scallion","约10cm (葱绿最佳)","葱"],["garlic","3-4瓣","蒜"]],"optional":[["vibe-e5b08fe7b1b3e8bea3","3-4颗","小米辣"]],"pantry":[["oil","10-20ml","食用油"],["soy","15-20ml","生抽"],["vibe-e99988e9868b","15-20ml","陈醋"],["sugar","6-10g","白糖"],["sesame","5-7ml","香油"]],"steps":[["处理青椒","青椒清洗，去除根部，侧面切开，去除内部的子后在案板压平备用。"],["切葱蒜","葱切成半厘米小段，蒜去皮切成碎末备用。"],["备皮蛋与辣椒","皮蛋去皮备用，小米辣切成 5-10mm 的小段备用。"],["热锅加油","热锅，锅内放入 10ml - 20ml 食用油。"],["煎制青椒","放入全部青椒，改小火保持锅子温度，煎至青椒变软。"],["放入容器","关火，将皮蛋和青椒放入深一点的小铁盆中。"],["混合捣碎","方法1：用擀面杖在盆中砸击皮蛋和青椒至混合；方法2：手撕青椒条并用叉子压碎皮蛋。"],["调味搅拌","加入小米辣，倒入生抽、陈醋、白糖、香油及其他备用食材，均匀搅拌。"]]},
  {"id":"vegetable_dish_liang-ban-dou-fu","name":"凉拌豆腐","category":"素菜","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/vegetable_dish_liang-ban-dou-fu.jpg","sourcePath":"dishes/vegetable_dish/凉拌豆腐.md","calories":343,"tips":["制作凉拌豆腐时，建议选用质地较硬的北豆腐或老豆腐，不易碎裂，口感更佳。","如果喜欢更清淡的口感，可以省略醋和辣椒油。","酱汁的比例可以根据个人口味进行调整。"],"required":[["tofu","250g","豆腐"],["scallion","10g","小葱"],["garlic","2-3瓣","大蒜"]],"optional":[["vinegar","5ml","醋"],["sugar","2g","白糖"],["vibe-e8bea3e6a492e6b2b9","5ml","辣椒油"]],"pantry":[["soy","15ml","生抽"],["sesame","5ml","香油"]],"steps":[["切豆腐","将豆腐切成 2 cm 见方的小块，备用。"],["烧水","锅中加入 500 ml 饮用水，大火烧开。"],["焯水","放入豆腐块，煮 1-2 分钟。"],["沥干备用","将煮好的豆腐块捞出，沥干水分，放入碗中，备用。"],["切葱花","将小葱洗净，切成葱花，备用。"],["切蒜末","将大蒜去皮，切成蒜末，备用。"],["调制酱汁基底","在一个干净的小碗中，加入 15 ml 生抽，5 ml 香油，5 ml 醋（可选），2 g 白糖（可选）。"],["加入蒜末","加入切好的大蒜末。"],["搅拌均匀","搅拌均匀，使白糖充分溶解，酱汁混合均匀。"],["淋入酱汁","将制作好的酱汁均匀淋在豆腐块上。"],["撒上葱花","撒上切好的小葱花。"],["加入辣椒油","根据个人喜好，淋上 5 ml 辣椒油（可选）。"],["拌匀食用","用筷子或勺子轻轻拌匀，即可食用。"]]},
  {"id":"vegetable_dish_liang-ban-huang-gua","name":"凉拌黄瓜","category":"素菜","servings":1,"minutes":20,"difficulty":"简单","coverPath":"ai-generated/vegetable_dish_liang-ban-huang-gua.jpg","sourcePath":"dishes/vegetable_dish/凉拌黄瓜.md","calories":107,"tips":["部分情况下黄瓜端头有苦味，请洗净切下后确认","做好之后直接开吃，亦可先准备好后放入冰箱冷藏（并非冷冻）后食用","若放入冰箱冷藏，则需使用保鲜膜包紧，并在 8 小时内食用完毕，否则黄瓜会因过度腌制失去清脆口感","推荐黄瓜去皮，口感更好"],"required":[["cucumber","200克","黄瓜"],["garlic","3瓣","蒜"]],"optional":[],"pantry":[["vinegar","11.5ml","醋"],["vibe-e985b1e6b2b9","7.5ml","酱油"],["salt","0.6克","盐"],["sesame","7ml","香油"],["oysterSauce","5ml","蚝油"],["sugar","5克","白糖"]],"steps":[["处理黄瓜","用菜刀将黄瓜拍扁，再剁成长 3 厘米的碎块"],["装碗","将碎黄瓜装入碗中"],["准备蒜末","将蒜拍碎切成碎末"],["糖渍腌制","将碗中放入 5 克白糖，搅拌均匀腌制 15 分钟"],["调味搅拌","将醋，酱油，盐，蚝油和蒜依次倒入碗中搅拌均匀"],["淋油收尾","将香油倒入碗中并均匀搅拌"]]},
  {"id":"vegetable_dish_liang-ban-jin-zhen-gu","name":"凉拌金针菇","category":"素菜","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/vegetable_dish_liang-ban-jin-zhen-gu.jpg","sourcePath":"dishes/vegetable_dish/凉拌金针菇.md","calories":163,"tips":["金针菇焯水时间不宜过长，以免影响口感。","酱汁的比例可以根据个人口味喜好进行调整。","如果不喜欢吃辣，可以省略辣椒油。"],"required":[["enoki","150g (约1小包)","金针菇"],["scallion","5g","小葱"],["garlic","2瓣","大蒜"]],"optional":[["sugar","3g","白糖"],["sesame","5ml","香油"],["vibe-e8bea3e6a492e6b2b9","5ml","辣椒油"]],"pantry":[["soy","15ml","生抽"],["vinegar","10ml","醋"]],"steps":[["处理金针菇","将金针菇根部切除，用清水冲洗干净，备用。"],["切葱花","将小葱洗净，切成葱花，备用。"],["切蒜末","将大蒜去皮，切成蒜末，备用。"],["烧开水","锅中加入 1000 ml 饮用水，大火烧开。"],["焯烫金针菇","放入金针菇，煮 1-2 分钟，至金针菇变软。"],["沥干备用","将煮好的金针菇捞出，沥干水分，放入一个较大的碗中，备用。"],["调配料汁","在另一个干净的小碗中，加入 15 ml 生抽，10 ml 醋，3 g 白糖（可选），5 ml 香油（可选）。"],["加入蒜末","加入切好的大蒜末。"],["搅拌酱汁","搅拌均匀，使白糖充分溶解，酱汁混合均匀。"],["淋上酱汁","将制作好的酱汁均匀淋在金针菇上。"],["撒上葱花","撒上切好的小葱花。"],["淋辣椒油","根据个人喜好，淋上 5 ml 辣椒油（可选）。"],["拌匀装盘","用筷子轻轻拌匀，即可食用。"]]},
  {"id":"vegetable_dish_liang-ban-you-mai-cai","name":"凉拌油麦菜","category":"素菜","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/vegetable_dish_liang-ban-you-mai-cai.jpg","sourcePath":"dishes/vegetable_dish/凉拌油麦菜.md","calories":191,"tips":["芝麻酱可以用花生酱代替，风味略有不同。","芝麻酱一定要和油麦菜混合均匀才更好吃。"],"required":[["vibe-e6b2b9e9baa6e88f9c","1颗(约200g)","油麦菜"],["vibe-e88a9de9babbe985b1","10ml","芝麻酱"],["garlic","2头","蒜"]],"optional":[],"pantry":[["vinegar","15ml","醋"],["vibe-e985b1e6b2b9","5ml","酱油"],["oysterSauce","10ml","蚝油"],["sugar","5g","白糖"],["sesame","5ml","香油"],["salt","适量","盐"]],"steps":[["处理大蒜","将蒜瓣拍碎并剁成细小的蒜末。"],["调配酱汁","将醋、酱油、芝麻酱、香油、糖、蚝油以及蒜末全部放入碗中，搅拌至完全融合均匀。"],["切油麦菜","油麦菜洗净沥干水分，切成长度约 4cm 的段。"],["混合拌匀","将油麦菜段放入大盆中，倒入调好的酱汁，充分搅拌均匀即可装盘。"]]},
  {"id":"vegetable_dish_pi-dan-dou-fu","name":"皮蛋豆腐","category":"素菜","servings":1,"minutes":5,"difficulty":"简单","coverPath":"ai-generated/vegetable_dish_pi-dan-dou-fu.jpg","sourcePath":"dishes/vegetable_dish/皮蛋豆腐.md","calories":566,"tips":["豆腐先焯水去豆腥味可以去除豆腥味","皮蛋切瓣时刀上可以抹点香油防止粘刀","参考资料：涼拌皮蛋豆腐 by 低配版小當家 - 愛料理"],"required":[["vibe-e79aaee89b8b","2个","皮蛋"],["vibe-e58685e985afe8b186e88590","1盒","内酯豆腐"]],"optional":[["sesame","15ml","香油"],["vibe-e8bea3e6a492e6b2b9","10ml","辣椒油"],["vibe-e88ab1e7949fe7a28e","10g","花生碎"],["scallion","15g","葱花"],["cilantro","1株","香菜"]],"pantry":[["soy","15ml","生抽"],["sugar","2.5g","白砂糖"],["vinegar","15ml","醋"]],"steps":[["处理皮蛋","先把皮蛋剥壳，切成四瓣。"],["处理豆腐","嫩豆腐切块或者切片放中间。"],["调制淋汁","将生抽、白砂糖、醋、香油、辣椒油调成酱汁，淋上去。"],["最后装点","最后可选撒上花生碎、葱花、香菜。"]]},
  {"id":"vegetable_dish_pu-shao-qie-zi","name":"蒲烧茄子","category":"素菜","servings":1,"minutes":30,"difficulty":"中等","coverPath":"ai-generated/vegetable_dish_pu-shao-qie-zi.jpg","sourcePath":"dishes/vegetable_dish/蒲烧茄子.md","calories":326,"tips":["中式煎烧手法与日式传统烤制蒲烧有所不同。","灵魂在于蒲烧汁，若图方便也可以购买现成的蒲烧汁。","装盘后撒点小葱（2~5mm）可以缓解甜腻感并丰富色彩。","浙茄皮嫩适合做鱼香茄子，但做这道菜建议去皮并使用普通长茄子。"],"required":[["eggplant","1个","茄子"],["vibe-e89c82e89c9c","20ml","蜂蜜"]],"optional":[["vibe-e6b0b4e6b780e7b289","适量","水淀粉"],["scallion","适量","小葱"]],"pantry":[["sugar","15ml","白糖"],["soy","40ml","生抽"],["darkSoy","10ml","老抽"],["wine","20ml","料酒"],["water","100ml","水"],["oil","适量","食用油"]],"steps":[["处理茄子","将茄子削皮，横着切成两段。"],["初步蒸制","放入蒸锅蒸 5 分钟。"],["改刀摊平","将茄段纵向切开但不要切断，在两边切面各划 2~3 刀至可以摊平。"],["煎制上色","锅中入油，将茄子煎至两面金黄。"],["初次浇汁","往茄子上浇入调好的蒲烧汁，至没过 1/2 茄子高度。"],["收汁翻面","煎至背面上色后翻面，同时进行收汁。"],["二次浇汁","把剩下的蒲烧汁浇在茄子上。"],["出锅装盘","出锅，一份蒲烧茄子就做好了。"]]},
  {"id":"vegetable_dish_qie-zi-dun-tu-dou","name":"茄子炖土豆","category":"素菜","servings":1,"minutes":45,"difficulty":"中等","coverPath":"ai-generated/vegetable_dish_qie-zi-dun-tu-dou.jpg","sourcePath":"dishes/vegetable_dish/茄子炖土豆.md","calories":623,"tips":["在操作的第 5-7 步骤中要注意：在此过程中注意锅底如果没有液体（油或水），则加 5 毫升的水再继续翻炒。","需要掌握翻炒和收汁的火候，对新手有一定挑战。","注意辣椒是新鲜青辣椒，绝对不能用辣椒面或辣椒油替代。","蒜的用量是3小瓣，切记不是3整头蒜。"],"required":[["eggplant","1个 (约150g)","茄子"],["potato","1个 (约150g)","土豆"],["vibe-e88289","180g","肉"],["vibe-e8bea3e6a492","50g","辣椒"],["garlic","3瓣","蒜"]],"optional":[],"pantry":[["vibe-e985b1e6b2b9","15ml","酱油"],["salt","5g","盐"],["oil","13ml","油"]],"steps":[["食材预处理","将茄子、土豆、辣椒洗净，蒜扒皮并拍碎。"],["食材改刀","将茄子、土豆切成约 6 立方厘米的块，辣椒切成 5 克的小块，肉切成 3 厘米的丝。"],["热锅凉油","开火，热锅，加入相应份数的油。"],["爆香辣椒","当能看到锅里的油冒出一丝烟时，放入辣椒。"],["炒肉","煸出辣椒香气后，立刻放入肉，用铲子翻炒 30 秒。"],["炒土豆","放入土豆，翻炒 30 秒。"],["炒茄子","放入茄子，翻炒 30 秒。"],["调味翻炒","放入酱油和盐，继续翻炒 5 分钟。"],["加水焖煮","加入水，水面高度为锅内食材高度的 0.9 倍，并盖上锅盖。"],["收汁出锅","等待直到锅内水的高度剩余食材高度的 0.1 倍时，开盖，放入蒜，搅拌均匀，关火。"]]},
  {"id":"vegetable_dish_qing-chao-hua-cai","name":"清炒花菜","category":"素菜","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/vegetable_dish_qing-chao-hua-cai.jpg","sourcePath":"dishes/vegetable_dish/清炒花菜.md","calories":211,"tips":["提前将花菜焯水可以缩短炒制时间，并使花菜更容易熟透。","炒制时间可以根据个人喜欢的花菜软硬程度调整。喜欢脆一些可以缩短时间。"],"required":[["vibe-e88ab1e88f9c","300g (约1/2中等大小)","花菜"],["garlic","2-3 瓣","大蒜"]],"optional":[],"pantry":[["salt","3g","盐"],["oil","15ml","食用油"],["water","50ml","饮用水"]],"steps":[["食材预处理","将花菜洗净，用刀或手掰成小朵，粗茎部分可以切片，备用。"],["准备辅料","将大蒜去皮，切成蒜片，备用。"],["烧水","锅中加入 1000 ml 饮用水，大火烧开。"],["焯水","放入花菜朵，煮 2-3 分钟，至花菜颜色变浅，口感稍微软化。"],["沥水","将煮好的花菜捞出，沥干水分，备用。"],["热油","热锅，加入 15 ml 食用油，大火烧热。"],["爆香","放入蒜片，快速煸炒出香味。"],["翻炒","放入焯好水的花菜朵，转中大火，快速翻炒约 2 分钟，使花菜均匀受热。"],["调味","加入 3 g 盐，继续翻炒均匀。"],["焖煮","沿锅边淋入 50 ml 饮用水，盖上锅盖，焖 1 分钟，帮助花菜完全熟透入味。"],["出锅","开盖，快速翻炒均匀，即可出锅。"]]},
  {"id":"vegetable_dish_qing-zheng-nan-gua","name":"清蒸南瓜","category":"素菜","servings":1,"minutes":20,"difficulty":"简单","coverPath":"ai-generated/vegetable_dish_qing-zheng-nan-gua.jpg","sourcePath":"dishes/vegetable_dish/清蒸南瓜.md","calories":80,"tips":["南瓜的品种不同，甜度和口感会有差异。老南瓜通常更甜更面。","南瓜皮含有营养，如果喜欢也可以不去皮蒸，但需要彻底洗净。","蒸的时间取决于南瓜块的大小和厚度，以及南瓜的品种。用筷子测试是判断是否蒸熟的好方法。"],"required":[["pumpkin","300g","南瓜"]],"optional":[],"pantry":[["water","1000ml","饮用水"]],"steps":[["预处理南瓜","将南瓜外皮洗净，去除瓜瓤和籽。"],["切片备用","将南瓜切成厚度大约 2 cm 的片。"],["蒸锅准备","在蒸锅的锅中加入 1000 ml 饮用水。"],["摆盘","将切好的南瓜片均匀摆放在盘中。"],["入锅","待蒸锅中的水烧开后，将装有南瓜的盘子放入蒸锅中。"],["大火蒸煮","盖上锅盖，保持大火蒸 15-20 分钟，直至南瓜变软。"],["出锅","关火，小心取出盘子。"]]},
  {"id":"vegetable_dish_shan-bei-ao-dou-jiao","name":"陕北熬豆角","category":"素菜","servings":2,"minutes":30,"difficulty":"简单","coverPath":"ai-generated/vegetable_dish_shan-bei-ao-dou-jiao.jpg","sourcePath":"dishes/vegetable_dish/陕北熬豆角.md","calories":191,"tips":["加入西红柿后开始继续熬制后，需要偶尔翻搅防止糊底","土豆块的大小决定了炖煮时间，建议切得均匀","水量控制在刚好没过食材即可，不宜过多变成汤菜"],"required":[["greenBean","600g","豆角"],["potato","2个","土豆"],["tomato","2个","西红柿"],["vibe-e4ba94e9a699e7b289","6g","五香粉"],["scallion","3圈","葱"],["ginger","2g","姜"],["garlic","2颗","蒜"]],"optional":[["vibe-e89ebae4b89de6a492","4个","螺丝椒"],["vibe-e9a699e88f9ce7a28e","适量","香菜碎"]],"pantry":[["salt","12g","盐"],["soy","12ml","生抽"],["oysterSauce","12ml","蚝油"]],"steps":[["处理辅料","葱切花，蒜切沫，姜切丝，备用。"],["处理豆角","豆角去筋，切2-10cm小段，备用。"],["处理土豆","土豆去皮，切1cm³小块，备用。"],["处理西红柿","西红柿去皮，切1cm³小块，备用。"],["处理辣椒","辣椒去仔，切0.15cm宽条，备用。"],["爆香底料","起锅烧油(10ml - 15ml)，冒烟后放入葱姜蒜，翻炒至闻到葱姜蒜香味。"],["炒豆角","加入豆角，翻炒至变色（青绿色变为翠绿色）。"],["炒土豆","加入土豆块，翻炒30s。"],["加水炖煮","加入热水（水面刚刚漫过菜），盖上锅盖熬至土豆变软（可以用筷子确认）。"],["调味收汁","加入西红柿块，加入盐，生抽，蚝油，五香粉，辣椒，熬至西红柿成汁（注意搅拌，防止糊锅）。"],["出锅","加入香菜碎，出锅。"]]},
  {"id":"vegetable_dish_shui-you-men-shu-cai","name":"水油焖蔬菜","category":"素菜","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/vegetable_dish_shui-you-men-shu-cai.jpg","sourcePath":"dishes/vegetable_dish/水油焖蔬菜.md","calories":92,"tips":["不确定咸淡的情况，可以先少放盐，在出锅前尝味，考虑调整加盐","可以用鸡汤、骨头汤等替代水，味道会更加鲜美浓郁","焖的时间不可过长，保持蔬菜翠绿是关键"],"required":[["vibe-e58fb6e88f9ce7b1bbe894ace88f9c","300g~500g","叶菜类蔬菜"]],"optional":[["oysterSauce","3ml","蚝油"]],"pantry":[["oil","2ml","食用油"],["salt","3g","盐"],["water","150ml","水"]],"steps":[["准备蔬菜","将叶菜类蔬菜彻底洗净，沥干水分备用。"],["烧水","锅中加入 150ml 水，并烧至沸腾。"],["加入调料","在沸水中加入 3g 盐、3ml 蚝油（可选）以及 2ml 食用油。"],["焖煮蔬菜","下入蔬菜，用锅铲翻拌均匀，让蔬菜接触到油水，然后迅速盖上锅盖焖 1 分钟。"],["出锅盛盘","打开锅盖，稍微翻匀后即可盛入盘中。"]]},
  {"id":"vegetable_dish_song-ren-yu-mi","name":"松仁玉米","category":"素菜","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/vegetable_dish_song-ren-yu-mi.jpg","sourcePath":"dishes/vegetable_dish/松仁玉米.md","calories":580,"tips":["松仁可以提前用小火干炒至微微金黄香脆，更加美味","使用罐头玉米时应先沥干水分，避免炒制过程中出水过多","炒制时火候不宜过大，以防糊锅或松仁焦糊"],"required":[["corn","200g","玉米粒"],["vibe-e7869fe69dbee5ad90e4bb81","30g","熟松子仁"]],"optional":[["carrot","50g","胡萝卜"]],"pantry":[["oil","15ml","食用油"],["sugar","10g","白砂糖"],["salt","1g","盐"],["starch","5g","淀粉"],["water","20ml","水"]],"steps":[["食材预处理","玉米粒和胡萝卜丁提前焯水 1 分钟，捞出沥干备用"],["翻炒蔬菜","热锅凉油，放入胡萝卜丁略炒，再加入玉米粒翻炒"],["调味","加入白砂糖和盐，炒匀"],["勾芡","混合水与淀粉成水淀粉，倒入锅中快速翻炒使汤汁略稠"],["加入松仁","加入熟松仁翻炒均匀"],["装盘","出锅装盘"]]},
  {"id":"vegetable_dish_su-chao-dou-jiao","name":"素炒豆角","category":"素菜","servings":2,"minutes":20,"difficulty":"简单","coverPath":"ai-generated/vegetable_dish_su-chao-dou-jiao.jpg","sourcePath":"dishes/vegetable_dish/素炒豆角.md","calories":107,"tips":["切豆角需要一定的刀工，不会的可以使用剪刀","豆角必须彻底煮熟，否则可能引起食物中毒"],"required":[["greenBean","250g","豆角"],["vibe-e5b08fe7b1b3e6a492","2个","小米椒"],["scallion","3圈","葱"],["garlic","2颗","蒜"],["vibe-e88097e6b2b9","6ml","耗油"]],"optional":[],"pantry":[["soy","6ml","生抽"],["darkSoy","2ml","老抽"],["salt","6g","盐"],["oil","10ml-15ml","食用油"]],"steps":[["切配辅料","葱切花，蒜切沫，备用。"],["调配酱汁","生抽、老抽、耗油、盐混合调料汁，备用。"],["处理辣椒","小米椒切圈，备用。"],["处理豆角","豆角去筋，45° 斜切4-10cm小段，备用。"],["爆香底料","起锅烧油(10ml - 15ml)，冒烟后放入葱、小米椒，翻炒至闻到香味。"],["初炒豆角","加入豆角，翻炒30s。"],["加入酱汁","加入料汁，开大火翻炒2分钟。"],["加水","倒入 150ml 水。"],["焖制","转中小火，盖上锅盖焖制 8-10 分钟。"],["最后增香","加入蒜切沫，出锅。"]]},
  {"id":"vegetable_dish_suan-la-tu-dou-si","name":"酸辣土豆丝","category":"素菜","servings":1,"minutes":20,"difficulty":"简单","coverPath":"ai-generated/vegetable_dish_suan-la-tu-dou-si.jpg","sourcePath":"dishes/vegetable_dish/酸辣土豆丝.md","calories":374,"tips":["清洗土豆丝淀粉一定要去干净，不然会全黏在一起","加入蒜末、盐后应尽快出锅，保留蒜香以及避免破坏口感。"],"required":[["potato","240g","土豆"],["garlic","4 瓣","大蒜"],["vibe-e99d92e6a492","0.5 个","青椒"],["vibe-e7baa2e6a492","0.5 个","红椒"],["chili","3 个","干辣椒"],["scallion","1 根","葱"]],"optional":[],"pantry":[["soy","5ml","生抽"],["vibe-e99988e9868b","10ml","陈醋"],["salt","2g","盐"],["oil","10-15ml","食用油"]],"steps":[["食材预处理","土豆去皮、切丝（或用刨丝器）。"],["清洗与焯水","切好的土豆丝用清水清洗，去除多余的淀粉，然后对土豆丝焯水 10 秒。沥干，备用。"],["配料准备","葱切成葱花；大蒜拍碎切成蒜末（分为两等份备用）；干辣椒切小段；青红椒切丝。"],["爆香底料","热锅，小火热油，下入一半的葱花（葱白部分）、一半的蒜末和干辣椒爆香。"],["主料翻炒","加入青红椒翻炒几下，加入土豆丝翻炒至变色。"],["调味","加 5ml 生抽，10ml 陈醋，倒入剩下的一半蒜末和 2g 盐快速翻炒均匀。"],["出锅","出锅前撒上剩余的葱花，翻匀即可装盘。"]]},
  {"id":"vegetable_dish_suan-rong-xi-lan-hua","name":"蒜蓉西兰花","category":"素菜","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/vegetable_dish_suan-rong-xi-lan-hua.jpg","sourcePath":"dishes/vegetable_dish/蒜蓉西兰花.md","calories":187,"tips":["焯水时间不宜超过推荐时长，以免影响西兰花的口感和营养。","如果想保留西兰花更脆的口感，可以缩短焯水时间。"],"required":[["broccoli","200g (约1/2个)","西兰花"],["garlic","3-4 瓣","大蒜"]],"optional":[],"pantry":[["soy","10ml","生抽"],["oysterSauce","5ml","蚝油"],["sugar","2g","白糖"],["oil","10ml","食用油"],["water","1030ml","饮用水"]],"steps":[["处理西兰花","将 西兰花 切成小朵，清洗干净。"],["准备蒜末","将 大蒜 去皮，切成蒜末，备用。"],["烧水","锅中加入 1000 ml 饮用水，大火烧开。"],["焯水","放入 西兰花，保持大火 煮 2-3 分钟，至 西兰花 颜色变翠绿，口感变软。"],["摆盘","将 煮好的 西兰花 捞出，沥干水分，摆入盘中，备用。"],["爆香蒜末","热锅，加入 10 ml 食用油。油温升高后，放入 大蒜末，小火煸炒出香味。"],["调味","加入 10 ml 生抽，5 ml 蚝油，2 g 白糖，加入 30 ml 饮用水。"],["煮开汤汁","将锅中汤汁烧开。"],["淋汁","将烧好的蒜蓉汁 均匀淋在盘中的 西兰花 上。"]]},
  {"id":"vegetable_dish_xi-hong-shi-chao-ji-dan","name":"西红柿炒鸡蛋","category":"素菜","servings":1,"minutes":15,"difficulty":"简单","coverPath":"ai-generated/vegetable_dish_xi-hong-shi-chao-ji-dan.jpg","sourcePath":"dishes/vegetable_dish/西红柿炒鸡蛋.md","calories":252,"tips":["快速做法：直接在有半熟鸡蛋的锅中加入西红柿块，与鸡蛋一起翻炒直至西红柿软烂，再进行调味","口味偏好：如果不喜欢放盐，可以尝试将盐改为加入两滴生抽提鲜"],"required":[["tomato","1个(约180g)","西红柿"],["egg","1.5个","鸡蛋"]],"optional":[["sugar","0-2g","糖"],["scallion","0-10g","葱花"]],"pantry":[["oil","6ml","食用油"],["salt","1.5-2g","盐"]],"steps":[["清洗西红柿","西红柿洗净"],["西红柿去皮（可选）","开水烫表皮，然后将西红柿放入冷水，剥去外皮"],["切块","西红柿去蒂，切成边长不超过 4cm 的小块"],["准备蛋液","将鸡蛋打入碗中，加入 1g * 份数的盐，搅匀"],["热油","热锅，加入食用油"],["炒制鸡蛋","油热后，倒入鸡蛋液。翻炒至鸡蛋结为固体且颜色微微发黄"],["盛出鸡蛋","关火。将半熟鸡蛋盛盘，重新开火"],["炒制西红柿","加入西红柿块，锅铲拍打并翻炒 20 秒，或至西红柿软烂"],["混合食材","向锅中加入半熟鸡蛋，翻炒均匀"],["最终调味","加入剩余的盐、糖（可选，如果倾向于甜味版本）、葱花（可选），翻炒均匀"],["出锅盛盘","关火，盛盘"]]},
  {"id":"vegetable_dish_yin-du-hu-lu-wan-zi","name":"印度葫芦丸子","category":"素菜","servings":1,"minutes":40,"difficulty":"中等","coverPath":"ai-generated/vegetable_dish_yin-du-hu-lu-wan-zi.jpg","sourcePath":"dishes/vegetable_dish/印度葫芦丸子.md","calories":571,"tips":["瓠瓜挤水是关键步骤，水分过多会导致丸子散开无法成型。","丸子不宜在酱汁中炖太久，否则会变软失去口感。","此菜在印度通常搭配印度烤饼(Naan)或蒸米饭(Chawal)食用。","Kofte一词源自波斯语/阿拉伯语，意为'压碎、磨碎'，广泛流传于南亚和中东地区。"],"required":[["vibe-e793a0e7939cefbc88e891abe88aa6efbc89","1 根（约 400g）","瓠瓜（葫芦）"],["vibe-e9b9b0e598b4e8b186e7b28928426573616e29","80g","鹰嘴豆粉(Besan)"],["onion","2 个（约 200g）","洋葱"],["tomato","3 个（约 300g）","番茄"],["ginger","10g","生姜"],["garlic","4 瓣（约 12g）","大蒜"],["vibe-e99d92e8bea3e6a492","1 根","青辣椒"],["cilantro","10g","香菜"],["vibe-e5a79ce9bb84e7b289","3g","姜黄粉"],["vibe-e7baa2e8bea3e6a492e7b289","8g","红辣椒粉"],["vibe-e9a699e88f9ce7b289","8g","香菜粉"],["vibe-e5ad9ce784b6e7b289","3g","孜然粉"],["vibe-e58db0e5baa6e7bbbce59088e9a699e69699e7b28928476172616d204d6173616c6129","3g","印度综合香料粉(Garam Masala)"]],"optional":[],"pantry":[["salt","8g","盐"],["oil","530ml","食用油"],["water","200ml","水"]],"steps":[["处理瓠瓜","将瓠瓜去皮，用刨丝器刨成细丝。"],["挤干水分","用手将瓠瓜丝中的水分挤干，尽量挤干。"],["调制丸子面团","在挤干的瓠瓜丝中加入鹰嘴豆粉 80g、盐 3g、红辣椒粉 3g、香菜粉 3g，用手充分混合均匀。"],["搓丸子","将混合物搓成直径约 3cm 的小丸子，备用。"],["油炸丸子","深锅倒油加热至 170°C（面团能快速浮起），分批放入丸子炸 4-5 分钟，直至表面金黄酥脆。"],["吸油备用","炸好的丸子用厨房纸吸去多余油分，备用。"],["炒制洋葱","炒锅热油，放入洋葱碎翻炒 5-7 分钟，至洋葱变成金棕色。"],["加入姜蒜番茄","加入姜蒜泥炒香 1 分钟，再加入番茄碎翻炒约 5 分钟，直至番茄软烂出油。"],["调味与熬酱","加入姜黄粉、红辣椒粉、香菜粉、孜然粉、盐，翻炒 2 分钟后加水煮沸，转小火炖 5 分钟。"],["组合与装饰","将炸丸子放入酱汁小火炖 3-5 分钟，撒上综合香料粉、青辣椒和香菜叶即可。"]]},
  {"id":"vegetable_dish_yin-du-tu-dou-hua-cai--aloo-gobi","name":"印度土豆花菜 (Aloo Gobi)","category":"素菜","servings":1,"minutes":25,"difficulty":"中等","coverPath":"ai-generated/vegetable_dish_yin-du-tu-dou-hua-cai--aloo-gobi.jpg","sourcePath":"dishes/vegetable_dish/印度土豆花菜.md","calories":668,"tips":["这道菜是干炒风格(Dry)，不需要加水。如果觉得太干容易粘锅，可以加入极少量水（约 15-30ml），但不宜过多。","土豆块不要切太小，否则容易炒散。","花菜的边缘略微焦黄是正常的，反而会增添风味。","可以搭配印度烤饼(Naan)、印度薄饼(Roti)或米饭食用。","Aloo Gobi 因 2001 年的电影《像贝克汉姆一样踢球》而在西方世界广为人知。"],"required":[["potato","2个(约250g)","土豆"],["vibe-e88ab1e88f9c","1个(约300g)","花菜"],["onion","1个(约100g)","洋葱"],["tomato","1个(约100g)","番茄"],["ginger","8g","生姜"],["garlic","3瓣(约9g)","大蒜"],["vibe-e99d92e8bea3e6a492","1根","青辣椒"],["vibe-e5ad9ce784b6e7b1bd","3g","孜然籽"],["vibe-e5a79ce9bb84e7b289","3g","姜黄粉"],["vibe-e7baa2e8bea3e6a492e7b289","3g","红辣椒粉"],["vibe-e9a699e88f9ce7b289","5g","香菜粉"],["vibe-e58db0e5baa6e7bbbce59088e9a699e69699e7b289","3g","印度综合香料粉"]],"optional":[["vibe-e9a699e88f9ce58fb6","15g","香菜叶"]],"pantry":[["oil","30ml","食用油"],["salt","5g","盐"]],"steps":[["处理土豆","将土豆去皮切成约 2cm 的块状"],["处理花菜","将花菜掰成均匀的小朵，大朵可用刀切小"],["热油","在炒锅中倒入 30ml 食用油，中火加热"],["炸香孜然","油热后放入孜然籽 3g，炸至变深色且散发香味"],["炒洋葱","放入切碎的洋葱，翻炒至变透明微黄"],["加入姜蒜辣","加入生姜、大蒜和青辣椒，翻炒 1 分钟"],["炒番茄","加入切碎的番茄，翻炒至番茄软烂"],["添加粉末香料","加入姜黄粉 3g、红辣椒粉 3g、香菜粉 5g、盐 5g"],["融合香料","翻炒 1 分钟，使香料与蔬菜融合"],["炒土豆","放入土豆块，翻炒 2 分钟使土豆表面裹上香料"],["加入花菜","放入花菜朵，轻轻翻拌均匀"],["焖煮","盖上锅盖，转中小火，焖 12-15 分钟"],["最后的调味","当土豆用筷子可轻松戳透、花菜略有焦边时，撒入印度综合香料粉 3g"],["最后翻炒","翻炒 1 分钟"],["出锅","关火，撒上香菜叶，盛盘"]]},
  {"id":"vegetable_dish_you-cu-bao-dan","name":"油醋爆蛋","category":"素菜","servings":1,"minutes":10,"difficulty":"简单","coverPath":"ai-generated/vegetable_dish_you-cu-bao-dan.jpg","sourcePath":"dishes/vegetable_dish/油醋爆蛋.md","calories":471,"tips":["亲测老恒和酿造香醋零添加口味最好，醋香是本菜灵魂所在。","一份分量正好够2个人食用。"],"required":[["egg","4个","鸡蛋"],["vibe-e5b08fe7b1b3e8bea3","10g(约3个)","小米辣"],["scallion","10g","小葱"],["garlic","5g","蒜"]],"optional":[["oysterSauce","10g","蚝油"],["sugar","0-5g","白糖"]],"pantry":[["oil","35-50mL","食用油"],["vibe-e9a699e9868b","15mL","香醋"],["soy","10-15mL","生抽"]],"steps":[["准备鸡蛋","鸡蛋不需打散，直接打入碗中备用。"],["处理配菜","香葱切成3cm长的小段。"],["制作蒜辣沫","将蒜瓣和小米辣放入打蒜器中，打成沫状。"],["调制料汁","将香醋、生抽、蚝油、白糖以及少许水加入小碗，搅拌均匀。"],["爆炒鸡蛋","锅中油热后倒入鸡蛋，待凝固后铲成大块，随后倒入蒜沫、小米辣沫和糖醋料汁。"],["收汁出锅","切换至大火收汁，快出锅时加入葱段即可。"]]}
]

const legacyRecipeIds = {
  "tomato-eggs": "vegetable_dish_xi-hong-shi-chao-ji-dan",
  "smashed-cucumber": "vegetable_dish_liang-ban-huang-gua",
  "garlic-broccoli": "vegetable_dish_suan-rong-xi-lan-hua",
  "steamed-egg": "breakfast_zheng-shui-dan",
  "steamed-pumpkin": "vegetable_dish_qing-zheng-nan-gua",
  "nori-egg-soup": "soup_zi-cai-dan-hua-tang",
  "egg-fried-rice": "staple_dan-chao-fan",
  "scallion-noodles": "staple_cong-you-ban-mian",
  "steamed-sea-bass": "other_qing-zheng-lu-yu",
  "braised-chicken-wings": "meat_dish_hong-shao-ji-chi",
  "vermicelli-mince": "meat_dish_ma-yi-shang-shu",
  "oyster-lettuce": "vegetable_dish_hao-you-sheng-cai",
  "cold-enoki": "vegetable_dish_liang-ban-jin-zhen-gu"
}

module.exports = { ingredients: { ...ingredients, ...lightIngredients }, recipes: recipes.concat(lightRecipes), legacyRecipeIds }
