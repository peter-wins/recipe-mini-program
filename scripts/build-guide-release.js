// 构建食材指南发布文件：把随包数据打成版本化 JSON，上传到云存储后更新数据库清单。
// 用法：node scripts/build-guide-release.js <输出目录>
const { createHash } = require('node:crypto')
const { mkdirSync, writeFileSync } = require('node:fs')
const { resolve } = require('node:path')
const { groups, bundled } = require('../miniprogram/guide-data')
const { schemaVersion, validateGuide } = require('../miniprogram/guide-release')

if (!process.argv[2]) {
  console.error('用法：node scripts/build-guide-release.js <输出目录>')
  process.exit(1)
}

const source = { groups, ingredients: bundled }
validateGuide(source)
const version = createHash('sha256').update(JSON.stringify({ schemaVersion, ...source })).digest('hex').slice(0, 32)
const manifest = { schemaVersion, version, ingredientCount: bundled.length }
const cloudPath = 'guide-catalog/v1/' + version + '.json'
const outputDir = resolve(process.argv[2])
mkdirSync(outputDir, { recursive: true })
const localPath = resolve(outputDir, version + '.json')
writeFileSync(localPath, JSON.stringify({ ...manifest, ...source }))
console.log(JSON.stringify({ localPath, cloudPath, manifest }, null, 2))
