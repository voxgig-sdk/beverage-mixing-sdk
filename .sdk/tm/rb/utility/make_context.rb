# BeverageMixing SDK utility: make_context
require_relative '../core/context'
module BeverageMixingUtilities
  MakeContext = ->(ctxmap, basectx) {
    BeverageMixingContext.new(ctxmap, basectx)
  }
end
