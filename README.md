# 今晚吃什么

在微信开发者工具中导入本目录。使用现有项目配置，点击「编译」。

## 菜谱来源

内置菜谱已替换为 [Vibe Cook 开放数据集](https://github.com/zkeq/vibe-cook-backend/tree/dataset)的 364 道已发布菜谱，源自 [HowToCook](https://github.com/Anduin2017/HowToCook)。数据集采用 [The Unlicense](https://github.com/zkeq/vibe-cook-backend/blob/dataset/LICENSE)。小程序的页面和业务逻辑沿用原项目。

菜谱文本离线保存于 `miniprogram/data.js`，包含上游菜谱 ID、封面相对路径和原文路径。原始用量和份数直接显示，范围及「适量」照原文保留。原始步骤中的用量按原份数阅读。配图由独立服务提供。

- 「我的 → 冰箱食材」可添加和移除食材。首页按冰箱记录推荐菜谱，菜谱页可按菜名、食材、分类和耗时筛选。
- 菜谱详情显示 Vibe Cook 的参考热量原值和烹饪注意事项。上游热量字段无统一的人份换算口径，详情保留千卡原值。可逐步烹饪，也可按原用量把缺料加入采购。既有冰箱和采购记录继续使用本地存储。
- 「我的」汇总收藏、浏览历史和做过的菜。旧菜谱有明确对应项时显示新版本，其余旧菜不再展示。
- 「轻食」含 26 道从 [每日食光](https://github.com/Jiayu-zheng1/EveryDay_Food) 改编的中文菜谱和六套家常搭配。新增菜谱的食材已映射到冰箱库存，可加入采购清单。热量和营养以来源每份数据作为参考，耗时为估算值。MIT 许可证和署名随 `miniprogram/light-recipes.js` 保留。
- 每日食光的数据只含步骤文字。新增成品图后可把文件放到外部图源的 `recipe-covers/ai-generated/`，再在对应的 `coverPath` 填入相对路径。

运行 `node --test tests/prototype.test.js` 验证数据、匹配、采购与页面逻辑。

## 菜谱图源

开发版、体验版和正式版默认从微信云开发的云存储读取图片。把本地图片上传到云存储的 `recipe-covers/ai-generated/` 和 `recipe-covers/steps/`，沿用现有文件名和目录结构。小程序通过 `wx.cloud.downloadFile` 读取对应文件 ID。

### 本地 Docker 图源

菜谱封面存放在项目根目录的 `recipe-covers/ai-generated/`，步骤图存放在 `recipe-covers/steps/`。两个目录均位于 `miniprogram/` 外。打开 Docker Desktop 后，在项目根目录运行以下命令。

```sh
docker compose -p recipe-local-images -f compose.images.yaml up -d
curl -I http://192.168.1.81:8088/ai-generated/aquatic_ga-li-chao-xie.jpg
```

如需切回本地图源，在 `miniprogram/recipe-image.js` 中把 `useLocalImagesInDevelopment` 设为 `true`。此时开发版从 `http://192.168.1.81:8088` 获取图片。若模拟器显示域名校验错误，在微信开发者工具的「详情 → 本地设置」中启用「不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书」，再重新编译。手机和电脑连接到同一 Wi-Fi 后，在微信开发者工具点「真机调试」并扫描新生成的二维码。也可以先用手机浏览器打开上面的示例图片地址，确认能连接到图源。

若电脑的 Wi-Fi 地址变了，请同步修改 `compose.images.yaml` 和 `miniprogram/recipe-image.js` 中的 IP，重新启动容器并重新编译。

停止容器可运行 `docker compose -p recipe-local-images -f compose.images.yaml down`。

