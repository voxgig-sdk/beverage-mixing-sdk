// Typed models for the BeverageMixing SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Beverage {
  difficulty?: string
  ingredients?: any[]
  recommendation?: string
}

export interface BeverageLoadMatch {
  beverage?: string
  ingredient?: string

  // Selects a custom action instead of the plain load:
  //   'mix'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
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

