const test = require('node:test')
const assert = require('node:assert/strict')
const { APP_VERSION, RELEASE_NOTES, readVersion, versionInfo } = require('../miniprogram/app-version')

test('本地版本号为 1.2.3 且更新说明覆盖三大改动点', () => {
  assert.equal(APP_VERSION, '1.2.3')
  assert.ok(RELEASE_NOTES.some(note => note.includes('我的')), '应包含我的页改版')
  assert.ok(RELEASE_NOTES.some(note => note.includes('冰箱')), '应包含冰箱页改版')
  assert.ok(RELEASE_NOTES.some(note => note.includes('图标')), '应包含图标统一')
})

test('无微信环境、读取异常或非正式版本号时回退本地版本', () => {
  const original = global.wx
  global.wx = undefined
  assert.equal(readVersion(), APP_VERSION)
  global.wx = { getAccountInfoSync: () => { throw new Error('mock failure') } }
  assert.equal(readVersion(), APP_VERSION)
  global.wx = { getAccountInfoSync: () => ({ miniProgram: { envVersion: 'develop', version: 'dev' } }) }
  assert.equal(readVersion(), APP_VERSION)
  global.wx = original
})

test('正式与体验环境读取微信后台配置的版本号', () => {
  const original = global.wx
  global.wx = { getAccountInfoSync: () => ({ miniProgram: { envVersion: 'release', version: '1.2.0' } }) }
  assert.equal(readVersion(), '1.2.0')
  global.wx = original
})

test('版本信息带版本号标签与更新说明副本', () => {
  const info = versionInfo()
  assert.equal(info.versionLabel, 'v' + APP_VERSION)
  assert.deepEqual(info.releaseNotes, RELEASE_NOTES)
  assert.notEqual(info.releaseNotes, RELEASE_NOTES)
})
