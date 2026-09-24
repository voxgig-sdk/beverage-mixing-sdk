
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { BeverageMixingSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = BeverageMixingSDK.test()
    equal(testsdk instanceof BeverageMixingSDK, true,
      'BeverageMixingSDK.test() must return a client synchronously')
  })

})
