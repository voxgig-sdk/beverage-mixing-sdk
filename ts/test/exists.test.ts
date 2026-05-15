
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { BeverageMixingSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await BeverageMixingSDK.test()
    equal(null !== testsdk, true)
  })

})
