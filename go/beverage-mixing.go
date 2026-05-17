package voxgigbeveragemixingsdk

import (
	"github.com/voxgig-sdk/beverage-mixing-sdk/go/core"
	"github.com/voxgig-sdk/beverage-mixing-sdk/go/entity"
	"github.com/voxgig-sdk/beverage-mixing-sdk/go/feature"
	_ "github.com/voxgig-sdk/beverage-mixing-sdk/go/utility"
)

// Type aliases preserve external API.
type BeverageMixingSDK = core.BeverageMixingSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type BeverageMixingEntity = core.BeverageMixingEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type BeverageMixingError = core.BeverageMixingError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBeverageEntityFunc = func(client *core.BeverageMixingSDK, entopts map[string]any) core.BeverageMixingEntity {
		return entity.NewBeverageEntity(client, entopts)
	}
	core.NewDareEntityFunc = func(client *core.BeverageMixingSDK, entopts map[string]any) core.BeverageMixingEntity {
		return entity.NewDareEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewBeverageMixingSDK = core.NewBeverageMixingSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
