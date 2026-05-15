-- ProjectName SDK configuration

local function make_config()
  return {
    main = {
      name = "BeverageMixing",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://abhi-api.vercel.app",
      auth = {
        prefix = "Bearer",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["beverage"] = {},
        ["dare"] = {},
      },
    },
    entity = {
      ["beverage"] = {
        ["fields"] = {
          {
            ["name"] = "code",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["active"] = true,
            ["index$"] = 0,
          },
          {
            ["name"] = "creator",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 1,
          },
          {
            ["name"] = "result",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
            ["active"] = true,
            ["index$"] = 2,
          },
          {
            ["name"] = "status",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
            ["active"] = true,
            ["index$"] = 3,
          },
        },
        ["name"] = "beverage",
        ["op"] = {
          ["load"] = {
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "coffee",
                      ["kind"] = "query",
                      ["name"] = "beverage",
                      ["orig"] = "beverage",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                    {
                      ["example"] = "milk",
                      ["kind"] = "query",
                      ["name"] = "ingredient",
                      ["orig"] = "ingredient",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/api/beverage/mix",
                ["parts"] = {
                  "api",
                  "beverage",
                  "mix",
                },
                ["select"] = {
                  ["$action"] = "mix",
                  ["exist"] = {
                    "beverage",
                    "ingredient",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["dare"] = {
        ["fields"] = {
          {
            ["name"] = "code",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["active"] = true,
            ["index$"] = 0,
          },
          {
            ["name"] = "creator",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 1,
          },
          {
            ["name"] = "result",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 2,
          },
          {
            ["name"] = "status",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
            ["active"] = true,
            ["index$"] = 3,
          },
        },
        ["name"] = "dare",
        ["op"] = {
          ["load"] = {
            ["name"] = "load",
            ["points"] = {
              {
                ["method"] = "GET",
                ["orig"] = "/api/game/dare",
                ["parts"] = {
                  "api",
                  "game",
                  "dare",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["args"] = {},
                ["select"] = {},
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
