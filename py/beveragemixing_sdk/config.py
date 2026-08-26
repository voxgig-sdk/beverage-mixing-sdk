# BeverageMixing SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "BeverageMixing",
            "slug": "beverage-mixing",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "name": "difficulty",
            "short": "Difficulty level of preparing the mix",
            "type": "`$STRING`",
          },
          {
            "name": "ingredients",
            "short": "List of ingredients in the mix",
            "type": "`$ARRAY`",
          },
          {
            "name": "recommendation",
            "short": "Detailed mixing recommendation",
            "type": "`$STRING`",
          },
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
                      "type": "`$STRING`",
                    },
                    {
                      "example": "milk",
                      "kind": "query",
                      "name": "ingredient",
                      "orig": "ingredient",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
                  "res": "`body.result`",
                },
              },
            ],
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
            "short": "HTTP status code",
            "type": "`$INTEGER`",
          },
          {
            "name": "creator",
            "req": True,
            "short": "API creator name",
            "type": "`$STRING`",
          },
          {
            "name": "result",
            "req": True,
            "short": "The dare challenge text",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "req": True,
            "short": "Indicates if the request was successful",
            "type": "`$BOOLEAN`",
          },
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
                  "dare",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
