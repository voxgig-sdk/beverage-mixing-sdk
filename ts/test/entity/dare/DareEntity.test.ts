

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { BeverageMixingSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('DareEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when BEVERAGE_MIXING_TEST_LIVE=TRUE.
  afterEach(liveDelay('BEVERAGE_MIXING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = BeverageMixingSDK.test()
    const ent = testsdk.Dare()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.BEVERAGE_MIXING_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'dare.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"code","req":true,"short":"HTTP status code","type":"`$INTEGER`","index$":0},{"active":true,"name":"creator","req":true,"short":"API creator name","type":"`$STRING`","index$":1},{"active":true,"name":"result","req":true,"short":"The dare challenge text","type":"`$STRING`","index$":2},{"active":true,"name":"status","req":true,"short":"Indicates if the request was successful","type":"`$BOOLEAN`","index$":3}],"name":"dare","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /api/game/dare","json":"{\"operationId\":\"getDare\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"code\":200,\"creator\":\"𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀\",\"result\":\"Flirt with someone you have a crush on, your closest friend, an unknown person of the opposite gender, etc.\",\"status\":true},\"schema\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":200,\"type\":\"integer\"},\"creator\":{\"description\":\"API creator name\",\"example\":\"𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀\",\"type\":\"string\"},\"result\":{\"description\":\"The dare challenge text\",\"example\":\"Flirt with someone you have a crush on, your closest friend, an unknown person of the opposite gender, etc.\",\"type\":\"string\"},\"status\":{\"description\":\"Indicates if the request was successful\",\"example\":true,\"type\":\"boolean\"}},\"required\":[\"code\",\"status\",\"creator\",\"result\"],\"type\":\"object\"}}},\"description\":\"Successful response with dare challenge\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"HTTP error status code\",\"example\":500,\"type\":\"integer\"},\"creator\":{\"description\":\"API creator name\",\"example\":\"𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"example\":\"An error occurred while processing your request\",\"type\":\"string\"},\"status\":{\"description\":\"Indicates if the request was successful\",\"example\":false,\"type\":\"boolean\"}},\"required\":[\"code\",\"status\",\"error\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/game/dare","segments":[{"lit":"api"},{"lit":"game"},{"lit":"dare"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"dare","name__orig":"dare","Name":"Dare","name_":"dare","name-":"dare","NAME":"DARE","index$":1}, {"active":true,"entity":"dare","key$":"BasicDareFlow","kind":"basic","name":"BasicDareFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"dare_ref01","srcdatavar":"dare_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-dare_ref01"}}],"index$":0}]}, 'Dare')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let dare_ref01_data = Object.values(setup.data.existing.dare)[0] as any

    // LOAD
    const dare_ref01_ent = client.Dare()
    const dare_ref01_match_dt0: any = {}
    const dare_ref01_data_dt0 = (await dare_ref01_ent.load(dare_ref01_match_dt0)).data()
    assert(null != dare_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/dare/DareTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = BeverageMixingSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['dare01','dare02','dare03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'BEVERAGE_MIXING_TEST_DARE_ENTID': idmap,
    'BEVERAGE_MIXING_TEST_LIVE': 'FALSE',
    'BEVERAGE_MIXING_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['BEVERAGE_MIXING_TEST_DARE_ENTID']

  const live = 'TRUE' === env.BEVERAGE_MIXING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['BEVERAGE_MIXING_TEST_DARE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new BeverageMixingSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.BEVERAGE_MIXING_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
