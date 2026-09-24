# BeverageMixing SDK configuration

module BeverageMixingConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "BeverageMixing",
        "slug" => "beverage-mixing",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
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
          "fields" => [],
          "name" => "beverage",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/beverage/mix",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "beverage",
                    },
                    {
                      "lit" => "mix",
                    },
                  ],
                  "parts" => [
                    "api",
                    "beverage",
                    "mix",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.result`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "beverage",
                        "orig" => "beverage",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "coffee",
                      },
                      {
                        "name" => "ingredient",
                        "orig" => "ingredient",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "milk",
                      },
                    ],
                  },
                  "select" => {
                    "$action" => "mix",
                    "exist" => [
                      "beverage",
                      "ingredient",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "dare" => {
          "fields" => [
            {
              "name" => "code",
              "title" => "Code",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "HTTP status code",
            },
            {
              "name" => "creator",
              "title" => "Creator",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "API creator name",
            },
            {
              "name" => "result",
              "title" => "Result",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The dare challenge text",
            },
            {
              "name" => "status",
              "title" => "Status",
              "type" => "`$BOOLEAN`",
              "req" => true,
              "short" => "Indicates if the request was successful",
            },
          ],
          "name" => "dare",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/game/dare",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "game",
                    },
                    {
                      "lit" => "dare",
                    },
                  ],
                  "parts" => [
                    "api",
                    "game",
                    "dare",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
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
