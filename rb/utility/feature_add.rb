# BeverageMixing SDK utility: feature_add
module BeverageMixingUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
