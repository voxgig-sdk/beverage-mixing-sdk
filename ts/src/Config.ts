
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


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
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
      "fields": [],
      "name": "beverage",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
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
              "parts": [
                "api",
                "beverage",
                "mix"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.result`"
              },
              "args": {
                "query": [
                  {
                    "name": "beverage",
                    "orig": "beverage",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "coffee"
                  },
                  {
                    "name": "ingredient",
                    "orig": "ingredient",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "milk"
                  }
                ]
              },
              "select": {
                "$action": "mix",
                "exist": [
                  "beverage",
                  "ingredient"
                ]
              }
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
          "title": "Code",
          "type": "`$INTEGER`",
          "req": true,
          "short": "HTTP status code"
        },
        {
          "name": "creator",
          "title": "Creator",
          "type": "`$STRING`",
          "req": true,
          "short": "API creator name"
        },
        {
          "name": "result",
          "title": "Result",
          "type": "`$STRING`",
          "req": true,
          "short": "The dare challenge text"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "Indicates if the request was successful"
        }
      ],
      "name": "dare",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
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
              "parts": [
                "api",
                "game",
                "dare"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
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

