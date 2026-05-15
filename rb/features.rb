# BeverageMixing SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module BeverageMixingFeatures
  def self.make_feature(name)
    case name
    when "base"
      BeverageMixingBaseFeature.new
    when "test"
      BeverageMixingTestFeature.new
    else
      BeverageMixingBaseFeature.new
    end
  end
end
