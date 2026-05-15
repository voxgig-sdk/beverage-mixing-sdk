-- BeverageMixing SDK error

local BeverageMixingError = {}
BeverageMixingError.__index = BeverageMixingError


function BeverageMixingError.new(code, msg, ctx)
  local self = setmetatable({}, BeverageMixingError)
  self.is_sdk_error = true
  self.sdk = "BeverageMixing"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function BeverageMixingError:error()
  return self.msg
end


function BeverageMixingError:__tostring()
  return self.msg
end


return BeverageMixingError
