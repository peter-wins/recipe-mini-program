# 首页布局改造方案

> 目标文件：`miniprogram/pages/home/index.wxml`、`index.js`、`index.wxss`、`app.wxss`
> 现状：功能完整、样式已升级为暖橙卡片风，但**首屏优先级、搜索入口、排序可见性**三处不合理。
> 本文档只描述改造方案，不含代码改动。执行时应保持 `miniprogram/catalog.js`、`data.js` 不动，`node --test tests/prototype.test.js` 必须保持 7/7 通过。

---

## 一、现状结构（match 视图）

| 顺序 | 区块 | 现状 | 占屏 |
| --- | --- | --- | --- |
| 1 | Hero 头卡 | 标题「今晚吃什么」+ 冰箱状态一行 + 改食材/添加食材按钮，同处一卡 | 约 200rpx |
| 2 | 筛选条 | 分类 picker + 耗时 picker + 重置 | 约 90rpx |
| 3 | 区块标题 | 「食材齐全 N 道」/「还差一种」/「全部菜谱」 | 约 70rpx |
| 4 | 菜谱列表 | 单列卡片（emoji 圆图标 + 菜名 + 分类标签 + 时长） | 每张约 140rpx |
| 5 | 其他菜谱 | 折叠按钮「查看其他 N 道」 | 约 90rpx |
| 6 | 底部导航 | 今晚 / 冰箱 / 采购 / 收藏（采购为 navigator 跳页，无当前态） | 固定悬浮 |

空冰箱态：Hero 显示「还没添加食材」+ 小按钮，然后直接是「全部菜谱 30 道」单列列表。

---

## 二、问题清单

### P0-1　搜索能力已实现，但首页没有入口
- 证据：`catalog.js` 的 `matchRecipes(selection, { search })` 已支持按**菜名**和**食材别名**匹配；`getIngredientGroups(selection, search)` 也支持搜索。
- 现状：整个首页无搜索框，只在「冰箱」页有一个仅搜食材的输入框。
- 影响：30 道菜只能靠两个 picker + 滚动查找，用户找具体菜名的成本极高。

### P0-2　空冰箱首屏是 30 条同质列表，核心能力无引导
- 现状：空态下 hero 只有一句弱文案 + 小按钮，紧接着铺 30 条单列卡片。
- 影响：新用户看不到「按现有食材推荐」这个核心价值，容易当成普通菜谱列表退出。
- 本质：**首屏优先级排反了**——主 CTA（告诉我你冰箱有什么）应是视觉中心，而不是和标题挤同一行。

### P1-1　排序规则不可见、不可选
- 证据：`matchRecipes` 末尾 `.sort((a, b) => a.missingCount - b.missingCount)`，同组内保持 `data.js` 原始顺序。
- 影响：「食材齐全」组里 30 分钟的菜可能排在 15 分钟前面；用户无法按「最快能做」重排。

### P1-2　冰箱状态是纯文字，食材不可见
- 现状：只有「冰箱里有 5 种食材」一行文案，想看一眼是哪 5 种必须跳页。
- 建议：食材以 chips 形式前置到 hero 下方，点击即移除，右侧「+」进冰箱页补充。

### P2-1　底部导航层级不一致
- 证据：`今晚`/`冰箱`/`收藏` 是 `button.bindtap → switchView`（有 `nav-current` 高亮），`采购` 是 `navigator` 跳独立页（无当前态）。
- 影响：进入采购页后底栏看起来"没有选中项"，与另外三项行为不一致。

### P2-2　首屏信息密度偏低
- hero 200rpx + 筛选 90rpx + 标题 70rpx ≈ 360rpx，1080rpx 可视角内实际只见约 2 道菜。

---

## 三、改造目标

1. **首屏先给决策入口**：空态下「添加食材」是唯一主 CTA，并给出可一键点选的常用食材。
2. **搜索常驻**：无论冰箱是否为空，顶部都能搜菜名 / 食材别名。
3. **两种形态分工**：有食材 → 单列卡片（需要展示"缺什么"）；无食材 → 双列网格（纯发现，扫视效率优先）。
4. **排序可感知**：给出「缺得最少 / 最快先做」切换，并在区块标题旁标注依据。

---

## 四、目标结构

```
[搜索条]  搜菜名或食材，如「番茄炒蛋」「西红柿」        ← 常驻

[Hero]    今晚吃什么
          冰箱 5 种  [番茄 ×] [鸡蛋 ×] [土豆 ×] [+2]   ← chips 前置，可点移除
          （空态时改为）[ 告诉我冰箱里有什么 ]        ← 主 CTA，整宽按钮

[筛选]    [热炒 ⌄] [30 分钟内 ⌄] [缺得最少 ⌄]

—— 有食材 ——
食材齐全 · 4 道
  [卡片] [卡片] ...                                   ← 单列，保持现状样式
还差一种 · 2 道
  [卡片(缺 葱)] [卡片(缺 蒜)]                          ← 单列，missing 文案红色
[查看其他 24 道]

—— 空冰箱 ——
先告诉我冰箱里有什么（引导卡，1 句话说明价值）
  [番茄] [鸡蛋] [土豆] [面条] [猪肉] [白菜]             ← 快捷 chips，点击即入库
按分类找                                          ← 7 个分类横滑
  [热炒] [炖菜] [主食] [蒸菜] [煎菜] [汤羹] [凉拌]
今天先做这几道 · 6 道
  [网格] [网格]                                      ← 双列，2 列 × 3 行
  [网格] [网格]
  [网格] [网格]
```

---

## 五、分段实施方案

### 步骤 1（P0）搜索条 — 改动最小，收益最大

**wxml**（放在 `.screen` 内、`.page-head` 之前）
```xml
<view class="searchbar">
  <text class="searchbar-icon" aria-hidden="true">🔍</text>
  <input class="searchbar-input" type="text" value="{{search}}" bindinput="searchRecipes"
         placeholder="搜菜名或食材，如「番茄炒蛋」「西红柿」" confirm-type="search" />
  <button wx:if="{{search}}" class="searchbar-clear" bindtap="clearSearch" aria-label="清空搜索">×</button>
</view>
```

**wxss 关键值**：`height: 88rpx; border-radius: 999rpx; background: #fff; box-shadow: 0 6rpx 16rpx rgba(180,110,50,.07);`，图标 28rpx、占位文字 26rpx `#a08e7a`。

**js**：`data` 增 `search: ''`；新增
```js
searchRecipes(event) { this.updateResults({ search: event.detail.value }) },
clearSearch() { this.updateResults({ search: '' }) },
```
**关键改动点**：`updateResults` 内部调用 `matchRecipes` 时**必须把 `search` 传进去**——
```js
const results = matchRecipes(selected, { category, maxMinutes, search })
```
> 注意：`matchRecipes` 的 `search` 已存在，无需改 `catalog.js`。

**验收**：输入「西红柿」→ 命中含 `tomato` 的菜谱；输入「番茄炒蛋」→ 命中该菜；清空恢复原列表。

---

### 步骤 2（P0）空冰箱引导态

**wxml**（`wx:if="{{!selected.length}}"`，替换当前「全部菜谱」区块）
```xml
<view class="onboard">
  <view class="onboard-title">先告诉我冰箱里有什么</view>
  <view class="onboard-desc">点几个常备食材，我帮你在 30 道菜里挑今晚能做的。</view>
  <view class="ingredients">
    <button wx:for="{{quickPicks}}" wx:key="id" class="chip" data-id="{{item.id}}"
            bindtap="toggleIngredient">{{item.name}}</button>
  </view>
</view>
```

**js**：新增 `quickPicks`，从已有 `options` 里按 id 取（不新增数据文件）
```js
const quickIds = ['tomato', 'egg', 'potato', 'noodles', 'pork', 'cabbage']
const quickPicks = options.filter(item => quickIds.includes(item.id))
```
`toggleIngredient` 已存在，直接复用（会写库存 → 自动进入"有食材"态，形成正反馈）。

**wxss**：`.onboard { background:#fff4ec; border:1rpx solid #ffd9ba; border-radius:24rpx; padding:28rpx; margin-top:20rpx; }`，标题 32rpx/750，描述 26rpx `#8a7a68`。

**验收**：空冰箱首屏（不滚动）能看到：搜索条 + hero 主 CTA + 引导卡 + 至少 2 个快捷 chip；点 chip 后立即切到"有食材"列表。

---

### 步骤 3（P0）Hero 降高 + 食材 chips 前置

- 标题字号 `54rpx → 46rpx`，hero 内边距 `40rpx 36rpx 36rpx → 30rpx 32rpx 28rpx`（省出约 50rpx）。
- hero 内冰箱状态行下方新增横向 chips：
```xml
<scroll-view wx:if="{{selected.length}}" class="fridge-chips" scroll-x enable-flex>
  <button wx:for="{{selectedItems}}" wx:key="id" class="chip chip-sm" data-id="{{item.id}}"
          bindtap="toggleIngredient" aria-label="移除{{item.name}}">{{item.name}} ×</button>
  <button class="chip chip-sm chip-ghost" bindtap="openFridge">+ 添加</button>
</scroll-view>
```
- **wxss 注意**：`scroll-view` 必须给固定 `height: 64rpx; white-space: nowrap;`，子项 `display:inline-flex`，否则横滑在部分基础库下失效。

**验收**：hero 高度不超过约 260rpx；点 chips 的 × 能移除且推荐列表实时更新。

---

### 步骤 4（P1）空态双列网格

**不要用 CSS Grid**——小程序基础库对 `display:grid` 支持不稳定。用 flex 换行：
```xml
<view class="recipe-grid">
  <navigator wx:for="{{discover}}" wx:key="id" class="grid-card"
              url="/pages/recipe/index?id={{item.id}}" hover-class="card-pressed">
    <view class="dish-tile" aria-hidden="true">{{...emoji 表达式，复用现有三元链...}}</view>
    <view class="grid-name">{{item.name}}</view>
    <view class="grid-meta">{{item.minutes}} 分钟</view>
  </navigator>
</view>
```
**wxss**：`.recipe-grid { display:flex; flex-wrap:wrap; gap:16rpx; }`，`.grid-card { width: calc(50% - 8rpx); box-sizing:border-box; }`（卡片内边距 22rpx、圆角 24rpx、白底浅阴影，与现有 `.recipe-card` 同源）。

**js**：`discover` 取 `results.slice(0, 6)`（或按 `minutes` 升序取 6 道）。

**验收**：空态一屏可见 ≥4 张网格卡；点击可正常跳详情。

---

### 步骤 5（P1）排序可见化

**建议在页面层排序，不改 `catalog.js`**（避免动测试基线）：
```js
const sortOptions = ['缺得最少', '最快先做']
// updateResults 末尾：
const sorted = [...results]
if (sortIndex === 1) sorted.sort((a, b) => a.minutes - b.minutes)
```
picker 放在筛选条第三位，文案与区块标题旁的小字一致（如「食材齐全 · 4 道 · 最快先做」）。

**验收**：切「最快先做」后，列表首项为最短耗时菜；`node --test` 仍 7/7。

---

### 步骤 6（P2）底部导航统一

两个低成本选项，推荐 A：
- **A（推荐）**：保留 4 项，但把 `.bottom-nav` 抽成公共 template，采购页也渲染同一份并高亮「采购」。改动只涉及 wxml 复制 + 一个 `current="shopping"` 传参。
- **B**：把「采购」从底栏移除，改为 hero 内的「看采购清单 (N)」入口，底栏回归 3 个 tab。

---

## 六、实施顺序与依赖

| 顺序 | 步骤 | 依赖 | 可独立交付 |
| --- | --- | --- | --- |
| 1 | 搜索条 | 无 | 是 |
| 2 | 空态引导 | 无 | 是 |
| 3 | Hero 降高 + chips | 无 | 是 |
| 4 | 空态双列网格 | 步骤 2 | 是 |
| 5 | 排序切换 | 步骤 1（共用 updateResults） | 是 |
| 6 | 底部导航统一 | 无 | 是 |

建议按 1 → 2 → 3 → 4 → 5 顺序做，每步跑一次测试。

---

## 七、风险与回归清单

1. **不要改 `catalog.js` / `data.js`**：`matchRecipes` 已支持 search 与 category/minutes 过滤，排序在页面层做。
2. **`updateResults` 是全页状态中枢**：新增字段（search / sortIndex / discover）都要走它的 setData，避免 `setData` 分散导致筛选与搜索互相覆盖。
3. **emoji 三元链已在 template 里**，网格卡片复用同一表达式即可，无需抽函数（WXML 不支持调用 JS 函数）。
4. **scroll-view 横滑**需固定高度 + `enable-flex`，否则 iOS 低版本基础库可能不滚。
5. **无障碍**：新增纯图标按钮（清空 ×、+ 添加）必须带 `aria-label`；装饰性 emoji 保持 `aria-hidden="true"`。
6. **回归测试**：每次改动后 `cd ~/work/recipe-mini-program && node --test tests/prototype.test.js`，必须 `pass 7 / fail 0`。
7. **视觉一致性**：新组件沿用现有 token——底色 `#fdf6ee`、卡片白 `#fff`、主橙渐变 `linear-gradient(135deg,#ff8a3d,#f25c1f)`、次要文字 `#93836f`、圆角 24–32rpx。

---

## 八、成果自检（做完后逐条打勾）

- [ ] 空冰箱首屏不滚动即可看到搜索条、主 CTA、≥2 个快捷食材
- [ ] 搜索「西红柿」能命中番茄类菜谱（别名生效）
- [ ] 有食材时「食材齐全」永远排在「还差一种」之前
- [ ] 切「最快先做」后列表按耗时升序
- [ ] hero 高度 ≤ 约 260rpx，首屏可见菜谱 ≥ 3 道
- [ ] 采购页底栏有明确当前态
- [ ] `node --test tests/prototype.test.js` → 7/7
