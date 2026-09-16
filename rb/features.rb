# BeverageMixing SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module BeverageMixingFeatures
  def self.make_feature(name)
    case name
    when "base"
      BeverageMixingBaseFeature.new
    when "ratelimit"
      BeverageMixingRatelimitFeature.new
    when "retry"
      BeverageMixingRetryFeature.new
    when "test"
      BeverageMixingTestFeature.new
    when "timeout"
      BeverageMixingTimeoutFeature.new
    else
      BeverageMixingBaseFeature.new
    end
  end
end
