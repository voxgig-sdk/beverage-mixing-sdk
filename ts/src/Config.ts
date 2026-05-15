
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://abhi-api.vercel.app',

    auth: {
      prefix: 'Bearer',
    },

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
          "name": "code",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "creator",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "result",
          "req": true,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 2
        },
        {
          "name": "status",
          "req": true,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "beverage",
      "op": {
        "load": {
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
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "milk",
                    "kind": "query",
                    "name": "ingredient",
                    "orig": "ingredient",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
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
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
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
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "creator",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "result",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "status",
          "req": true,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "dare",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "method": "GET",
              "orig": "/api/game/dare",
              "parts": [
                "api",
                "game",
                "dare"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
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

