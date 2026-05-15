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
            "auth": {
                "prefix": "Bearer",
            },
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
            "name": "code",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "creator",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "result",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "status",
            "req": True,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 3,
          },
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
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "milk",
                      "kind": "query",
                      "name": "ingredient",
                      "orig": "ingredient",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
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
            "name": "code",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "creator",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "result",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "status",
            "req": True,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 3,
          },
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
                  "dare",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
