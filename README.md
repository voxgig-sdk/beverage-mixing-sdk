# BeverageMixing SDK

Fetch random truth and dare prompts from the Abhi API game collection

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Beverage Mixing API

This SDK wraps a small slice of the [Abhi API](https://abhi-api.vercel.app), a free hobby API maintained by [Abhishek Suresh](https://github.com/AbhishekSuresh2) that bundles dozens of casual endpoints across anime, games, jokes, search, and tooling. Despite the "Beverage Mixing" label inherited from the catalogue listing, the endpoints exposed here are the game prompts from the same host.

What you get from the API:

- A random `truth` prompt via `/api/game/truth`
- A random `dare` prompt via `/api/game/dare`
- Plain GET requests, no API key, JSON responses

Operational notes: no authentication is required and no rate limits are documented, but the public catalogue notes that CORS is disabled on these endpoints, so browser-side calls will need to go through a server. Availability depends on the upstream Vercel deployment; treat it as best-effort.

## Try it

**TypeScript**
```bash
npm install beverage-mixing
```

**Python**
```bash
pip install beverage-mixing-sdk
```

**PHP**
```bash
composer require voxgig/beverage-mixing-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/beverage-mixing-sdk/go
```

**Ruby**
```bash
gem install beverage-mixing-sdk
```

**Lua**
```bash
luarocks install beverage-mixing-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { BeverageMixingSDK } from 'beverage-mixing'

const client = new BeverageMixingSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o beverage-mixing-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "beverage-mixing": {
      "command": "/abs/path/to/beverage-mixing-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Beverage** | Despite the SDK name, the upstream host does not expose beverage-mixing endpoints; the closest match in the catalogued routes is the truth prompt at `/api/game/truth`, surfaced here under this grouping. | `/api/beverage/mix` |
| **Dare** | A random dare challenge served from the Abhi API games collection at `/api/game/dare`. | `/api/game/dare` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from beveragemixing_sdk import BeverageMixingSDK

client = BeverageMixingSDK({})


# Load a specific beverage
beverage, err = client.Beverage(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'beveragemixing_sdk.php';

$client = new BeverageMixingSDK([]);


// Load a specific beverage
[$beverage, $err] = $client->Beverage(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/beverage-mixing-sdk/go"

client := sdk.NewBeverageMixingSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "BeverageMixing_sdk"

client = BeverageMixingSDK.new({})


# Load a specific beverage
beverage, err = client.Beverage(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("beverage-mixing_sdk")

local client = sdk.new({})


-- Load a specific beverage
local beverage, err = client:Beverage(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = BeverageMixingSDK.test()
const result = await client.Beverage().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = BeverageMixingSDK.test(None, None)
result, err = client.Beverage(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = BeverageMixingSDK::test(null, null);
[$result, $err] = $client->Beverage(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Beverage(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = BeverageMixingSDK.test(nil, nil)
result, err = client.Beverage(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Beverage(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Beverage Mixing API

- Upstream: [https://abhi-api.vercel.app](https://abhi-api.vercel.app)

- Usage is subject to the Abhi API site Terms of Service and Privacy Policy.
- No explicit licence is published alongside the endpoints.
- Attribution to the upstream service (Abhi API by Abhishek Suresh) is recommended.
- CORS is reported as disabled, so calls from a browser will likely require a server-side proxy.

---

Generated from the Beverage Mixing API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
