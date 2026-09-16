
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'BeverageMixing',
        slug: "beverage-mixing",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://abhi-api.vercel.app",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      beverage: {
      },

      dare: {
      },

    }
  }


  entity = {
    "beverage": {
      "fields": [
        {
          "name": "difficulty",
          "short": "Difficulty level of preparing the mix",
          "type": "`$STRING`"
        },
        {
          "name": "ingredients",
          "short": "List of ingredients in the mix",
          "type": "`$ARRAY`"
        },
        {
          "name": "recommendation",
          "short": "Detailed mixing recommendation",
          "type": "`$STRING`"
        }
      ],
      "name": "beverage",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "coffee",
                    "kind": "query",
                    "name": "beverage",
                    "orig": "beverage",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "milk",
                    "kind": "query",
                    "name": "ingredient",
                    "orig": "ingredient",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/beverage/mix",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "beverage"
                },
                {
                  "lit": "mix"
                }
              ],
              "select": {
                "$action": "mix",
                "exist": [
                  "beverage",
                  "ingredient"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              },
              "parts": [
                "api",
                "beverage",
                "mix"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "dare": {
      "fields": [
        {
          "name": "code",
          "req": true,
          "short": "HTTP status code",
          "type": "`$INTEGER`"
        },
        {
          "name": "creator",
          "req": true,
          "short": "API creator name",
          "type": "`$STRING`"
        },
        {
          "name": "result",
          "req": true,
          "short": "The dare challenge text",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "req": true,
          "short": "Indicates if the request was successful",
          "type": "`$BOOLEAN`"
        }
      ],
      "name": "dare",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/game/dare",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "game"
                },
                {
                  "lit": "dare"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "game",
                "dare"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

