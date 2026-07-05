// Typed models for the BeverageMixing SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Beverage {
  code: number
  creator: string
  result: Record<string, any>
  status: boolean
}

export interface BeverageLoadMatch {
  code?: number
  creator?: string
  result?: Record<string, any>
  status?: boolean
}

export interface Dare {
  code: number
  creator: string
  result: string
  status: boolean
}

export interface DareLoadMatch {
  code?: number
  creator?: string
  result?: string
  status?: boolean
}

