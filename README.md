# 今晚吃什么

在微信开发者工具中导入本目录。使用现有项目配置，点击「编译」。

## 菜谱来源

内置菜谱已替换为 [Vibe Cook 开放数据集](https://github.com/zkeq/vibe-cook-backend/tree/dataset)的 364 道已发布菜谱，源自 [HowToCook](https://github.com/Anduin2017/HowToCook)。数据集采用 [The Unlicense](https://github.com/zkeq/vibe-cook-backend/blob/dataset/LICENSE)。小程序的页面和业务逻辑沿用原项目。

菜谱文本离线保存于 `miniprogram/data.js`，包含上游菜谱 ID、封面相对路径和原文路径。原始用量和份数直接显示，范围及「适量」照原文保留。原始步骤中的用量按原份数阅读。配图由独立服务提供。

- 「我的 → 冰箱食材」可添加和移除食材。首页按冰箱记录推荐菜谱，菜谱页可按菜名、食材、分类和耗时筛选。
- 菜谱详情显示 Vibe Cook 的参考热量原值和烹饪注意事项。上游热量字段无统一的人份换算口径，详情保留千卡原值。可逐步烹饪，也可按原用量把缺料加入采购。既有冰箱和采购记录继续使用本地存储。
- 「我的」汇总收藏、浏览历史和做过的菜。旧菜谱有明确对应项时显示新版本，其余旧菜不再展示。
- 「轻食」用新菜谱组成六套搭配。旧版营养估算基于已移除的菜谱，此处暂不显示。

运行 `node --test tests/prototype.test.js` 验证数据、匹配、采购与页面逻辑。

## 本机图片服务

菜谱封面存放在项目根目录的 `recipe-covers/ai-generated/`，步骤图存放在 `recipe-covers/steps/`。两个目录均位于 `miniprogram/` 外。打开 Docker Desktop 后，在项目根目录运行以下命令。

```sh
docker compose -p recipe-local-images -f compose.images.yaml up -d
curl -I http://192.168.1.81:8088/ai-generated/aquatic_ga-li-chao-xie.jpg
```

开发版从 `http://192.168.1.81:8088` 读取封面。若模拟器显示域名校验错误，在微信开发者工具的「详情 → 本地设置」中启用「不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书」，再重新编译。手机和电脑连接到同一 Wi-Fi 后，在微信开发者工具点「真机调试」并扫描新生成的二维码。也可以先用手机浏览器打开上面的示例图片地址，确认能连接到图源。

若电脑的 Wi-Fi 地址变了，请同步修改 `compose.images.yaml` 和 `miniprogram/recipe-image.js` 中的 IP，重新启动容器并重新编译。

上线时将图片按同样的 `ai-generated/` 和 `steps/` 路径部署到 HTTPS 图源，并在 `miniprogram/recipe-image.js` 填写 `productionImageBase`。配置前体验版和正式版使用封面占位图，做法步骤显示文字。

停止容器可运行 `docker compose -p recipe-local-images -f compose.images.yaml down`。

