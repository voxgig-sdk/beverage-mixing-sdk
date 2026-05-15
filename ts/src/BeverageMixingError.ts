
import { Context } from './Context'


class BeverageMixingError extends Error {

  isBeverageMixingError = true

  sdk = 'BeverageMixing'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  BeverageMixingError
}

