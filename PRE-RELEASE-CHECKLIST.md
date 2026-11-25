# 提审前检查单（吃饭搭子 · 2026-11-25）

> 合并自两份来源：绘师《提审前真机验证清单》（`docs/ui-device-checklist.md`，仅本机）+ 质检《提审合规检查》。
> 当前 HEAD `dd339f3`，测试 **108 项全绿**，远端已同步。

## 一句话结论

**真机验收全部通过前，不提审。**

代码层面已无已知阻断项（隐私遗漏、死页均已修），但**所有 UI 改动至今只有测试断言支撑，没有一张真机画面**。测试能证明"代码符合预期写法"，证明不了"在 iPhone SE 上最后一张卡不被裁"。这两件事的差距正是本单存在的原因。

---

## 一、已修复（代码层，无需再动）

| 项 | commit | 说明 |
|---|---|---|
| 隐私说明遗漏采购清单、我的搭配两项云端收集数据 | `4f0640f` | `collected` 4→6 项，`purposes`、`storageNote`、`updatedLabel` 同步更新 |
| 死页 `pages/index` 占页面配额、进搜索索引 | `dd339f3` | `app.json` 16→15 页，零引用确认 |
| guide 页同步提示曾占 94rpx 导致裁切风险 | `0f72183` | 改绝对定位不占文档流，风险回到 19rpx |
| 食材指南同步无反馈 | `32248b6` | loading/offline 两态可见，离线态弱化为灰色小字 |
| 测试对 gitignore 资产硬依赖 | `95e58f6` | 缺图时显式 skip，仓库 clone 即可验证 |
| UI 三轮收口（字重/禁用态/间距令牌） | `9aba457` `4a7588a` `9aa132c` | 详见 `docs/ui-device-checklist.md`（仅本机，不入库） |

---

## 二、待人工验证（按严重程度分级）

### 🔴 阻断：不通过这些，不要提审（共 8 项）

#### B1. 食材指南列表最后一张卡能否滚到
- **页面**：我的 → 食材指南，选「肉水产」（最长分组 5 条），滚到底
- **看什么**：最后一张卡完整可见，下边缘有呼吸空间
- **为什么**：第 1 轮标题 36→52rpx，列表可视区少 19rpx
- **不通过怎么退**：`pages/guide/index.wxss:17`，`--fs-3xl` 改回 `var(--fs-2xl, 44rpx)`

#### B2. 食材指南双 scroll-view 在安卓不溢出
- **页面**：同上，左侧分组栏 + 右侧列表
- **期望**：两个滚动区各自滚到尽头
- **为什么**：`.guide-fill { height: 100vh }`（`guide/index.wxss:3`），微信 `100vh` 含状态栏，安卓部分机型高约 40rpx。**既有隐患，非本轮引入**
- **不通过怎么退**：① 先做 B1；② 仍溢出则 `guide/index.wxss:3` 改 `height: 100%` + `.guide-fill` 加 `position: absolute; inset: 0`（**未验证方案**）

#### B3. 四处搜索框都是胶囊
| 页面 | 位置 |
|---|---|
| 首页（首页 tab） | 顶部「搜索菜谱、食材」 |
| 首页（菜谱 tab） | 菜谱库搜索框 |
| 冰箱页 | 搜索并添加食材 |
| 选菜弹层 | 顶部搜索框 |

- **不通过怎么退**：菜谱库 `pages/home/index.wxss`（加回 `.recipe-search.library-search{border-radius:26rpx}`）｜冰箱 `pages/fridge/index.wxss:65`（`22rpx`）｜选菜 `components/recipe-picker/index.wxss:3`（加回 `.picker-search{border-radius:20rpx}`）｜首页搜索按钮 `pages/home/index.wxss:10`（`26rpx`）

#### B4. 五处两列网格间距一致、卡片不变形
- **看什么**：五处两列卡的列间距是否都是 16rpx，卡片仍等宽、无换行、无文字溢出。最大变化 2rpx，安卓不同屏宽（rpx 换算比不同）可能有细微差异
- **五处具体位置与退回值**：
  | 位置 | 文件:行 | 原值 |
  |---|---|---|
  | 首页两列 | `styles/recipe-card.wxss:1` | `gap: 22rpx 18rpx` |
  | 食材指南 | `pages/guide/index.wxss:70`（绘师原文写 :43，**我实测在 :70**） | `gap: 14rpx` |
  | 做饭日历 | `pages/meal-calendar/index.wxss:50` | `gap: 18rpx 14rpx` |
  | 搭配页 | `pages/meals/index.wxss:107` | `gap: 12rpx` |
  | 冰箱页 | `pages/fridge/index.wxss:92` | `gap: 12rpx` |
- **一处统计口径差异**：我用 `grep grid-template-columns` 实测到**还有第 6 处** `components/recipe-picker/index.wxss:27` 的 `.picker-grid` 也是 `repeat(2)` + 16rpx。绘师那 5 处是「本轮改动过的」，`recipe-picker` 本轮未动、本来就是 16rpx。**这是口径不同，不是漏改**，但真机看选菜弹层时顺带确认它没有变形
- **另两处刻意没动**：`.home-shortcuts` 仍 `gap: 8rpx`、`.calendar-grid` 仍 `gap: 2rpx`

#### B5. 「加入采购清单」禁用时不变灰块 ⚠️ 最可能出问题
- **页面**：菜谱详情 → 食材清单区 → 保存中（`savingPurchase`）
- **期望**：**保持透明背景**，只文字变灰
- **为什么**：`app.wxss:101` 的 `.link[disabled], .text-btn[disabled]{background:transparent}` 是本轮新增、无真机验证
- **已验证的部分**：我核过 `app.wxss:97` 与 `:101` 特异性同为 (0,2,0)，`:101` 在后，**按 CSS 层叠规则应生效**
- **不通过怎么退**：把 `app.wxss:101` 提到 `:97` 之前，或加权重 `.recipe-detail .link[disabled]`

#### B6. 「看看食材指南」按钮按下有反馈
- **页面**：食材详情页，手改 URL `id=__not_exist__`
- **期望**：按下变淡
- **为什么**：该按钮是 `.detail-state-primary`，不在 `.primary.hover` 覆盖内，另补规则在 `guide-detail/index.wxss:103`（我核实存在）
- **不通过怎么退**：确认 `:103` 的 `opacity:.75; transform:scale(.98)` 生效

#### B7. 记录页空态「去逛菜谱」能跳
- **写的是什么**：`pages/records/index.wxml:11`，`open-type="redirect"` + `/pages/home/index?view=library`
- **我验证到的（静态可判）**：`redirect` 销毁当前页并新建首页实例，`home/index.js:71-79` 的 `onLoad({view})` 收到 `library` 会走 `openAllRecipes()`，**这条路成立**
- **我另外确认了不会困死用户**：redirect 后无返回按钮，但首页「我的」tab 有回记录页的入口（`home/index.wxml:178-180` 的三个 stat 都是 `<navigator>`），所以用户能自己绕回去，只是多点两步
- **仍需真机确认**：`onLoad` 是否确实触发并切到菜谱库 tab（不是停在首页第一个 tab）
- **不通过怎么退**：改 `open-type="navigate"`（但会叠加返回栈，用户点返回回到空态页，体验反而更差，**建议不退**）；或改首页为 `wx.switchTab`（无原生 tabBar，不适用）

#### B8. 采购清单空态「去菜谱挑食材」能跳
- **同上**：`pages/shopping/index.wxml:39`，同一机制、同一风险、同一结论

### 🟡 重要：建议过一遍，不通过可带问题提审但需记录

| # | 项 | 不通过怎么退 |
|---|---|---|
| I1 | 采购页禁用态整体观感（`app.wxss:82/95/97/101`） | 退回 `--state-disabled` 为 `#b9aca2` |
| I2 | 选菜弹层禁用确认按钮（`components/recipe-picker/index.wxss:114`） | 退回 `--theme-muted`（但它是 5.08:1，比正常态还深，语义错位，不建议退） |
| I3 | 七处按钮按下反馈（见原清单第五节） | 删除对应 wxml 的 `hover-class="hover"` |
| I4 | 空态 CTA 居中、四 tab 标题 52rpx/700 一致 | `app.wxss` 标题类 |
| I5 | 三主题下颜色跟随（新增页面是否漏 `theme-{{themeId}}` 类） | 补主题类 |

### ⚪ 建议：抽查即可

- 菜谱详情「上一步」禁用态（`pages/recipe/index.wxss:155`，我核实存在）
- `--r-lg: var(--card-radius)` 嵌套变量是否解析
- 安卓 `100vh` 溢出（与 B2 同源）

---

## 三、已知但本轮不修（写进交接文档即可）

| 项 | 位置 | 严重度 | 为什么不修 |
|---|---|---|---|
| 只有 dev 一个云环境 | `recipe-image.js:2` `recipe-dev-d9gsv38lz1ade2114`，全项目唯一环境源（`app.js:40`、`cloud-catalog.js:44`、`guide.js:47`、`kitchen-sync.js:109`、`planning-sync.js:84`） | 重要 | 需建新环境+迁数据+改配置+重发布，独立工程 |
| appid 硬编码交叉耦合 | `project.config.json:2` 与 `cloudfunctions/syncKitchen/index.js:7`，用于 `index.js:215` 鉴权 | 建议 | 当前一致；同主体多小程序时需改源码 |
| 废弃 API 1 处 | `pages/shopping/index.js:249` `getSystemInfoSync().pixelRatio` | 建议 | 有 `&&` 守卫和 `\|\| 1` 兜底，不崩；建议换 `wx.getWindowInfo()` |
| 存储写满静默失同步 | `kitchen-sync.js:128`（被 `:145` catch 吞，pending 不推进）、`:52`（抛给调用方，弹"收藏操作失败"误导） | 重要 | 需动两套状态机，单独立项 |

---

## 四、真机验收操作建议

1. **最小屏优先**：iPhone SE（375×667）先过 B1、B2、B5
2. **安卓必测 B2**：`100vh` 溢出是安卓高发
3. 每项只判"符合/不符合"，不符合就按上面的 file:line 退回，**不要现场调样式**
4. 8 项 20 分钟内可过完

## 五、一键回退

```sh
cd ~/work/recipe-mini-program
git reset --hard handover-baseline-20251125   # 回到接手基线 95e58f6
```

单项回退用文档里给的 file:line，不要用 reset。
