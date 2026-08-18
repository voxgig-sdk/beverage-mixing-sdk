
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


  main = {
    name: 'BeverageMixing',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$STRING`"
        },
        {
          "name": "ingredients",
          "type": "`$ARRAY`"
        },
        {
          "name": "recommendation",
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
          "type": "`$INTEGER`"
        },
        {
          "name": "creator",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "result",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "req": true,
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

