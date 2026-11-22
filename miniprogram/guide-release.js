// 食材指南发布文件格式校验，对齐 catalog-release.js。
const bundled = require('./guide-data').bundled

const schemaVersion = 1
const idPattern = /^[A-Za-z0-9_-]+$/
const validText = value => typeof value === 'string'

function validRelease(release) {
  return !!release && release.schemaVersion === schemaVersion &&
    typeof release.version === 'string' && /^[a-f0-9]{32}$/.test(release.version) &&
    Number.isSafeInteger(release.ingredientCount) && release.ingredientCount >= bundled.length
}

function validateGuide(source) {
  const { groups, ingredients } = source || {}
  if (!Array.isArray(groups) || !groups.length || !groups.every(validText)) throw new Error('食材分组格式不正确')
  if (!Array.isArray(ingredients)) throw new Error('食材数据格式不正确')

  const ids = new Set()
  for (const item of ingredients) {
    if (!item || typeof item.id !== 'string' || !idPattern.test(item.id) || ids.has(item.id) ||
        ![item.name, item.group, item.image, item.tint, item.season, item.therapy, item.audience].every(validText) ||
        !item.name.trim() || !groups.includes(item.group) ||
        !Array.isArray(item.storage) || !item.storage.every(validText) ||
        !Array.isArray(item.tips) || !item.tips.every(validText) ||
        (item.pending !== undefined && typeof item.pending !== 'boolean')) {
      throw new Error('无效食材记录：' + (item && item.id))
    }
    ids.add(item.id)
  }
  // 云端整版替换不能丢掉随包已有的食材，否则老用户切到云端后条目会消失。
  if (bundled.some(item => !ids.has(item.id))) throw new Error('缺少已有食材 ID')
}

function parseRelease(text, expected) {
  const release = JSON.parse(text)
  if (!validRelease(release) || !Array.isArray(release.groups) || !Array.isArray(release.ingredients) ||
      release.ingredients.length !== release.ingredientCount ||
      (expected && (release.version !== expected.version || release.ingredientCount !== expected.ingredientCount))) {
    throw new Error('食材指南发布版本与清单不符')
  }
  validateGuide(release)
  return { version: release.version, groups: release.groups, ingredients: release.ingredients }
}

module.exports = { schemaVersion, validRelease, validateGuide, parseRelease }
