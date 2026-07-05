# frozen_string_literal: true

# Typed models for the BeverageMixing SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Beverage entity data model.
#
# @!attribute [rw] code
#   @return [Integer]
#
# @!attribute [rw] creator
#   @return [String]
#
# @!attribute [rw] result
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [Boolean]
Beverage = Struct.new(
  :code,
  :creator,
  :result,
  :status,
  keyword_init: true
)

# Request payload for Beverage#load.
#
# @!attribute [rw] code
#   @return [Integer, nil]
#
# @!attribute [rw] creator
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [Boolean, nil]
BeverageLoadMatch = Struct.new(
  :code,
  :creator,
  :result,
  :status,
  keyword_init: true
)

# Dare entity data model.
#
# @!attribute [rw] code
#   @return [Integer]
#
# @!attribute [rw] creator
#   @return [String]
#
# @!attribute [rw] result
#   @return [String]
#
# @!attribute [rw] status
#   @return [Boolean]
Dare = Struct.new(
  :code,
  :creator,
  :result,
  :status,
  keyword_init: true
)

# Request payload for Dare#load.
#
# @!attribute [rw] code
#   @return [Integer, nil]
#
# @!attribute [rw] creator
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Boolean, nil]
DareLoadMatch = Struct.new(
  :code,
  :creator,
  :result,
  :status,
  keyword_init: true
)

