package = "voxgig-sdk-beverage-mixing"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/beverage-mixing-sdk.git"
}
description = {
  summary = "BeverageMixing SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["beverage-mixing_sdk"] = "beverage-mixing_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
