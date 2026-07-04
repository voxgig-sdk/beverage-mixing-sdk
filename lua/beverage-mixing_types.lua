-- Typed models for the BeverageMixing SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Beverage
---@field code number
---@field creator string
---@field result table
---@field status boolean

---@class BeverageLoadMatch

---@class Dare
---@field code number
---@field creator string
---@field result string
---@field status boolean

---@class DareLoadMatch

local M = {}

return M
