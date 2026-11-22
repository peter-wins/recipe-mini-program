const { createHash } = require('node:crypto')
const { mkdirSync, writeFileSync } = require('node:fs')
const { resolve } = require('node:path')
const { ingredients, recipes } = require('../miniprogram/data')
const { schemaVersion, validateCatalog } = require('../miniprogram/catalog-release')

if (!process.argv[2]) {
  console.error('用法：node scripts/build-catalog-release.js <输出目录>')
  process.exit(1)
}

const source = { ingredients, recipes }
validateCatalog(source)
const version = createHash('sha256').update(JSON.stringify({ schemaVersion, ...source })).digest('hex').slice(0, 32)
const manifest = { schemaVersion, version, recipeCount: recipes.length }
const cloudPath = 'recipe-catalog/v1/' + version + '.json'
const outputDir = resolve(process.argv[2])
mkdirSync(outputDir, { recursive: true })
const localPath = resolve(outputDir, version + '.json')
writeFileSync(localPath, JSON.stringify({ ...manifest, ...source }))
console.log(JSON.stringify({ localPath, cloudPath, manifest }, null, 2))
