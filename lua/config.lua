-- BeverageMixing SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "BeverageMixing",
      slug = "beverage-mixing",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
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
        ["fields"] = {},
        ["name"] = "beverage",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/beverage/mix",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "beverage",
                  },
                  {
                    ["lit"] = "mix",
                  },
                },
                ["parts"] = {
                  "api",
                  "beverage",
                  "mix",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.result`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "beverage",
                      ["orig"] = "beverage",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "coffee",
                    },
                    {
                      ["name"] = "ingredient",
                      ["orig"] = "ingredient",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "milk",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "mix",
                  ["exist"] = {
                    "beverage",
                    "ingredient",
                  },
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
            ["title"] = "Code",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
            ["short"] = "HTTP status code",
          },
          {
            ["name"] = "creator",
            ["title"] = "Creator",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "API creator name",
          },
          {
            ["name"] = "result",
            ["title"] = "Result",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "The dare challenge text",
          },
          {
            ["name"] = "status",
            ["title"] = "Status",
            ["type"] = "`$BOOLEAN`",
            ["req"] = true,
            ["short"] = "Indicates if the request was successful",
          },
        },
        ["name"] = "dare",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/game/dare",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "game",
                  },
                  {
                    ["lit"] = "dare",
                  },
                },
                ["parts"] = {
                  "api",
                  "game",
                  "dare",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
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
