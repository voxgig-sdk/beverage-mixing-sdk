# BeverageMixing SDK configuration


def make_config():
    return {
        "main": {
            "name": "BeverageMixing",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://abhi-api.vercel.app",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "beverage": {},
                "dare": {},
            },
        },
        "entity": {
      "beverage": {
        "fields": [
          {
            "active": True,
            "name": "code",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "creator",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "result",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "status",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 3,
          },
        ],
        "name": "beverage",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "coffee",
                      "kind": "query",
                      "name": "beverage",
                      "orig": "beverage",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "milk",
                      "kind": "query",
                      "name": "ingredient",
                      "orig": "ingredient",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/beverage/mix",
                "parts": [
                  "api",
                  "beverage",
                  "mix",
                ],
                "select": {
                  "$action": "mix",
                  "exist": [
                    "beverage",
                    "ingredient",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "dare": {
        "fields": [
          {
            "active": True,
            "name": "code",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "creator",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "result",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "status",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 3,
          },
        ],
        "name": "dare",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/api/game/dare",
                "parts": [
                  "api",
                  "game",
                  "dare",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
