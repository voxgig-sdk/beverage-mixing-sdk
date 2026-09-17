"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('BeverageEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when BEVERAGE_MIXING_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('BEVERAGE_MIXING_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.BeverageMixingSDK.test();
        const ent = testsdk.Beverage();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.BEVERAGE_MIXING_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'beverage.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "beverage", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "coffee", "kind": "query", "name": "beverage", "orig": "beverage", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "milk", "kind": "query", "name": "ingredient", "orig": "ingredient", "reqd": false, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /api/beverage/mix", "json": "{\"operationId\":\"getBeverageMix\",\"parameters\":[{\"description\":\"The base beverage to mix\",\"in\":\"query\",\"name\":\"beverage\",\"required\":false,\"schema\":{\"example\":\"coffee\",\"type\":\"string\"}},{\"description\":\"Specific ingredient to include in the mix\",\"in\":\"query\",\"name\":\"ingredient\",\"required\":false,\"schema\":{\"example\":\"milk\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"code\":200,\"creator\":\"𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀\",\"result\":{\"difficulty\":\"easy\",\"ingredients\":[\"coffee\",\"milk\",\"vanilla syrup\"],\"recommendation\":\"Try mixing coffee with milk and a touch of vanilla syrup for a smooth latte experience\"},\"status\":true},\"schema\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":200,\"type\":\"integer\"},\"creator\":{\"description\":\"API creator name\",\"example\":\"𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀\",\"type\":\"string\"},\"result\":{\"description\":\"Beverage mixing recommendation details\",\"properties\":{\"difficulty\":{\"description\":\"Difficulty level of preparing the mix\",\"enum\":[\"easy\",\"medium\",\"hard\"],\"type\":\"string\"},\"ingredients\":{\"description\":\"List of ingredients in the mix\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"recommendation\":{\"description\":\"Detailed mixing recommendation\",\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"description\":\"Indicates if the request was successful\",\"example\":true,\"type\":\"boolean\"}},\"required\":[\"code\",\"status\",\"creator\",\"result\"],\"type\":\"object\"}}},\"description\":\"Successful response with beverage mixing recommendation\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"HTTP error status code\",\"example\":500,\"type\":\"integer\"},\"creator\":{\"description\":\"API creator name\",\"example\":\"𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"example\":\"An error occurred while processing your request\",\"type\":\"string\"},\"status\":{\"description\":\"Indicates if the request was successful\",\"example\":false,\"type\":\"boolean\"}},\"required\":[\"code\",\"status\",\"error\"],\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"HTTP error status code\",\"example\":500,\"type\":\"integer\"},\"creator\":{\"description\":\"API creator name\",\"example\":\"𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"example\":\"An error occurred while processing your request\",\"type\":\"string\"},\"status\":{\"description\":\"Indicates if the request was successful\",\"example\":false,\"type\":\"boolean\"}},\"required\":[\"code\",\"status\",\"error\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/beverage/mix", "segments": [{ "lit": "api" }, { "lit": "beverage" }, { "lit": "mix" }], "select": { "$action": "mix", "exist": ["beverage", "ingredient"] }, "transform": { "req": "`reqdata`", "res": "`body.result`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "beverage", "name__orig": "beverage", "Name": "Beverage", "name_": "beverage", "name-": "beverage", "NAME": "BEVERAGE", "index$": 0 }, { "active": true, "entity": "beverage", "key$": "BasicBeverageFlow", "kind": "basic", "name": "BasicBeverageFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "beverage_ref01", "srcdatavar": "beverage_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-beverage_ref01" } }], "index$": 0 }] }, 'Beverage');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let beverage_ref01_data = Object.values(setup.data.existing.beverage)[0];
        // LOAD
        const beverage_ref01_ent = client.Beverage();
        const beverage_ref01_match_dt0 = {};
        const beverage_ref01_data_dt0 = (await beverage_ref01_ent.load(beverage_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != beverage_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/beverage/BeverageTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.BeverageMixingSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['beverage01', 'beverage02', 'beverage03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'BEVERAGE_MIXING_TEST_BEVERAGE_ENTID': idmap,
        'BEVERAGE_MIXING_TEST_LIVE': 'FALSE',
        'BEVERAGE_MIXING_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['BEVERAGE_MIXING_TEST_BEVERAGE_ENTID'];
    const live = 'TRUE' === env.BEVERAGE_MIXING_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['BEVERAGE_MIXING_TEST_BEVERAGE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.BeverageMixingSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.BEVERAGE_MIXING_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=BeverageEntity.test.js.map