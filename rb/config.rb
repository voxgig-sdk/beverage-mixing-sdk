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
              "name" => "difficulty",
              "short" => "Difficulty level of preparing the mix",
              "type" => "`$STRING`",
            },
            {
              "name" => "ingredients",
              "short" => "List of ingredients in the mix",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "recommendation",
              "short" => "Detailed mixing recommendation",
              "type" => "`$STRING`",
            },
          ],
          "name" => "beverage",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "coffee",
                        "kind" => "query",
                        "name" => "beverage",
                        "orig" => "beverage",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "milk",
                        "kind" => "query",
                        "name" => "ingredient",
                        "orig" => "ingredient",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                    "res" => "`body.result`",
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
              "req" => true,
              "short" => "HTTP status code",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "creator",
              "req" => true,
              "short" => "API creator name",
              "type" => "`$STRING`",
            },
            {
              "name" => "result",
              "req" => true,
              "short" => "The dare challenge text",
              "type" => "`$STRING`",
            },
            {
              "name" => "status",
              "req" => true,
              "short" => "Indicates if the request was successful",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "dare",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
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
