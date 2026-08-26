
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

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
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
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
              "parts": [
                "api",
                "beverage",
                "mix"
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
              "parts": [
                "api",
                "game",
                "dare"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
  config
}

