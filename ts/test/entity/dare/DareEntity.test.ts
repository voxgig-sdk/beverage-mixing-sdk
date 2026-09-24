

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"code":{"a":true,"h":"Code","n":"code","r":true,"sh":"HTTP status code","t":"`$INTEGER`","key$":"code","index$":0},"creator":{"a":true,"h":"Creator","n":"creator","r":true,"sh":"API creator name","t":"`$STRING`","key$":"creator","index$":1},"result":{"a":true,"h":"Result","n":"result","r":true,"sh":"The dare challenge text","t":"`$STRING`","key$":"result","index$":2},"status":{"a":true,"h":"Status","n":"status","r":true,"sh":"Indicates if the request was successful","t":"`$BOOLEAN`","key$":"status","index$":3}},"name":"dare","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/game/dare","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/game/dare","q":{},"r":{},"s":[{"lit":"api"},{"lit":"game"},{"lit":"dare"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"dare","name__orig":"dare","Name":"Dare","name_":"dare","name-":"dare","NAME":"DARE","index$":1}, {"active":true,"entity":"dare","key$":"BasicDareFlow","kind":"basic","name":"BasicDareFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"dare_ref01","srcdatavar":"dare_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-dare_ref01"}}],"index$":0}]}, 'Dare', {"GET /api/game/dare":{"protocol":"http","operationId":"getDare","responses":{"200":{"description":"Successful response with dare challenge","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"description":"HTTP status code","example":200,"key$":"code","type":"integer"},"status":{"description":"Indicates if the request was successful","example":true,"key$":"status","type":"boolean"},"creator":{"description":"API creator name","example":"𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀","key$":"creator","type":"string"},"result":{"description":"The dare challenge text","example":"Flirt with someone you have a crush on, your closest friend, an unknown person of the opposite gender, etc.","key$":"result","type":"string"}},"required":["code","status","creator","result"],"x-ref":"#/components/schemas/DareResponse","index$":0},"example":{"code":200,"status":true,"creator":"𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀","result":"Flirt with someone you have a crush on, your closest friend, an unknown person of the opposite gender, etc."}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"integer","description":"HTTP error status code","example":500},"status":{"type":"boolean","description":"Indicates if the request was successful","example":false},"creator":{"type":"string","description":"API creator name","example":"𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀"},"error":{"type":"string","description":"Error message","example":"An error occurred while processing your request"}},"required":["code","status","error"],"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[],"securitySource":"unspecified"}})
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
  
