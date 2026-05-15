# BeverageMixing SDK exists test

require "minitest/autorun"
require_relative "../BeverageMixing_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = BeverageMixingSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
