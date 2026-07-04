# BeverageMixing SDK configuration

module BeverageMixingConfig
  def self.make_config
    {
      "main" => {
        "name" => "BeverageMixing",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://abhi-api.vercel.app",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "beverage" => {},
          "dare" => {},
        },
      },
      "entity" => {
        "beverage" => {
          "fields" => [
            {
              "active" => true,
              "name" => "code",
              "req" => true,
              "type" => "`$INTEGER`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "creator",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "result",
              "req" => true,
              "type" => "`$OBJECT`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "status",
              "req" => true,
              "type" => "`$BOOLEAN`",
              "index$" => 3,
            },
          ],
          "name" => "beverage",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "coffee",
                        "kind" => "query",
                        "name" => "beverage",
                        "orig" => "beverage",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => "milk",
                        "kind" => "query",
                        "name" => "ingredient",
                        "orig" => "ingredient",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/api/beverage/mix",
                  "parts" => [
                    "api",
                    "beverage",
                    "mix",
                  ],
                  "select" => {
                    "$action" => "mix",
                    "exist" => [
                      "beverage",
                      "ingredient",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "dare" => {
          "fields" => [
            {
              "active" => true,
              "name" => "code",
              "req" => true,
              "type" => "`$INTEGER`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "creator",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "result",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "status",
              "req" => true,
              "type" => "`$BOOLEAN`",
              "index$" => 3,
            },
          ],
          "name" => "dare",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "method" => "GET",
                  "orig" => "/api/game/dare",
                  "parts" => [
                    "api",
                    "game",
                    "dare",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    BeverageMixingFeatures.make_feature(name)
  end
end
