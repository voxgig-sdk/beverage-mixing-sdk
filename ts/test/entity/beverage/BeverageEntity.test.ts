

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('BeverageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when BEVERAGE_MIXING_TEST_LIVE=TRUE.
  afterEach(liveDelay('BEVERAGE_MIXING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = BeverageMixingSDK.test()
    const ent = testsdk.Beverage()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.BEVERAGE_MIXING_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'beverage.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"beverage","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/beverage/mix","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"coffee","k":"query","n":"beverage","or":"beverage","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"milk","k":"query","n":"ingredient","or":"ingredient","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/beverage/mix","q":{"$action":"mix","exist":["beverage","ingredient"]},"r":{},"s":[{"lit":"api"},{"lit":"beverage"},{"lit":"mix"}],"t":{"req":"`reqdata`","res":"`body.result`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"beverage","name__orig":"beverage","Name":"Beverage","name_":"beverage","name-":"beverage","NAME":"BEVERAGE","index$":0}, {"active":true,"entity":"beverage","key$":"BasicBeverageFlow","kind":"basic","name":"BasicBeverageFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"beverage_ref01","srcdatavar":"beverage_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-beverage_ref01"}}],"index$":0}]}, 'Beverage', {"GET /api/beverage/mix":{"protocol":"http","operationId":"getBeverageMix","responses":{"200":{"description":"Successful response with beverage mixing recommendation","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"description":"HTTP status code","example":200,"key$":"code","type":"integer"},"status":{"description":"Indicates if the request was successful","example":true,"key$":"status","type":"boolean"},"creator":{"description":"API creator name","example":"𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀","key$":"creator","type":"string"},"result":{"description":"Beverage mixing recommendation details","key$":"result","properties":{"difficulty":{"description":"Difficulty level of preparing the mix","enum":["easy","medium","hard"],"type":"string"},"ingredients":{"description":"List of ingredients in the mix","items":{"type":"string"},"type":"array"},"recommendation":{"description":"Detailed mixing recommendation","type":"string"}},"type":"object"}},"required":["code","status","creator","result"],"x-ref":"#/components/schemas/BeverageResponse"},"example":{"code":200,"status":true,"creator":"𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀","result":{"recommendation":"Try mixing coffee with milk and a touch of vanilla syrup for a smooth latte experience","ingredients":["coffee","milk","vanilla syrup"],"difficulty":"easy"}}}}},"400":{"description":"Bad request - invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer","description":"HTTP error status code","example":500},"status":{"type":"boolean","description":"Indicates if the request was successful","example":false},"creator":{"type":"string","description":"API creator name","example":"𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀"},"error":{"type":"string","description":"Error message","example":"An error occurred while processing your request"}},"required":["code","status","error"],"x-ref":"#/components/schemas/ErrorResponse"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer","description":"HTTP error status code","example":500},"status":{"type":"boolean","description":"Indicates if the request was successful","example":false},"creator":{"type":"string","description":"API creator name","example":"𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀"},"error":{"type":"string","description":"Error message","example":"An error occurred while processing your request"}},"required":["code","status","error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"beverage","in":"query","description":"The base beverage to mix","required":false,"schema":{"type":"string","example":"coffee"},"index$":0},{"name":"ingredient","in":"query","description":"Specific ingredient to include in the mix","required":false,"schema":{"type":"string","example":"milk"},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let beverage_ref01_data = Object.values(setup.data.existing.beverage)[0] as any

    // LOAD
    const beverage_ref01_ent = client.Beverage()
    const beverage_ref01_match_dt0: any = {}
    const beverage_ref01_data_dt0 = (await beverage_ref01_ent.load(beverage_ref01_match_dt0)).data()
    assert(null != beverage_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/beverage/BeverageTestData.json')

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
    ['beverage01','beverage02','beverage03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'BEVERAGE_MIXING_TEST_BEVERAGE_ENTID': idmap,
    'BEVERAGE_MIXING_TEST_LIVE': 'FALSE',
    'BEVERAGE_MIXING_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['BEVERAGE_MIXING_TEST_BEVERAGE_ENTID']

  const live = 'TRUE' === env.BEVERAGE_MIXING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['BEVERAGE_MIXING_TEST_BEVERAGE_ENTID']
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
  
