-- BeverageMixing SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
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
            ["name"] = "difficulty",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "ingredients",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "recommendation",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "beverage",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
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
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "milk",
                      ["kind"] = "query",
                      ["name"] = "ingredient",
                      ["orig"] = "ingredient",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
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
                  ["res"] = "`body.result`",
                },
              },
            },
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
          },
          {
            ["name"] = "creator",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "result",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "status",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
          },
        },
        ["name"] = "dare",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/game/dare",
                ["parts"] = {
                  "api",
                  "game",
                  "dare",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
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
