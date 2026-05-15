package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBeverageEntityFunc func(client *BeverageMixingSDK, entopts map[string]any) BeverageMixingEntity

var NewDareEntityFunc func(client *BeverageMixingSDK, entopts map[string]any) BeverageMixingEntity

