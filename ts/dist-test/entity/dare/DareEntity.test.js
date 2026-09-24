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
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('DareEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when BEVERAGE_MIXING_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('BEVERAGE_MIXING_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.BeverageMixingSDK.test();
        const ent = testsdk.Dare();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.BEVERAGE_MIXING_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'dare.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "code": { "a": true, "h": "Code", "n": "code", "r": true, "sh": "HTTP status code", "t": "`$INTEGER`", "key$": "code", "index$": 0 }, "creator": { "a": true, "h": "Creator", "n": "creator", "r": true, "sh": "API creator name", "t": "`$STRING`", "key$": "creator", "index$": 1 }, "result": { "a": true, "h": "Result", "n": "result", "r": true, "sh": "The dare challenge text", "t": "`$STRING`", "key$": "result", "index$": 2 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "sh": "Indicates if the request was successful", "t": "`$BOOLEAN`", "key$": "status", "index$": 3 } }, "name": "dare", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/game/dare", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/game/dare", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "game" }, { "lit": "dare" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "dare", "name__orig": "dare", "Name": "Dare", "name_": "dare", "name-": "dare", "NAME": "DARE", "index$": 1 }, { "active": true, "entity": "dare", "key$": "BasicDareFlow", "kind": "basic", "name": "BasicDareFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "dare_ref01", "srcdatavar": "dare_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-dare_ref01" } }], "index$": 0 }] }, 'Dare', { "GET /api/game/dare": { "protocol": "http", "operationId": "getDare", "responses": { "200": { "description": "Successful response with dare challenge", "content": { "application/json": { "schema": { "type": "object", "properties": { "code": { "description": "HTTP status code", "example": 200, "key$": "code", "type": "integer" }, "status": { "description": "Indicates if the request was successful", "example": true, "key$": "status", "type": "boolean" }, "creator": { "description": "API creator name", "example": "𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀", "key$": "creator", "type": "string" }, "result": { "description": "The dare challenge text", "example": "Flirt with someone you have a crush on, your closest friend, an unknown person of the opposite gender, etc.", "key$": "result", "type": "string" } }, "required": ["code", "status", "creator", "result"], "x-ref": "#/components/schemas/DareResponse", "index$": 0 }, "example": { "code": 200, "status": true, "creator": "𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀", "result": "Flirt with someone you have a crush on, your closest friend, an unknown person of the opposite gender, etc." } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "code": { "type": "integer", "description": "HTTP error status code", "example": 500 }, "status": { "type": "boolean", "description": "Indicates if the request was successful", "example": false }, "creator": { "type": "string", "description": "API creator name", "example": "𝙰𝙱𝙷𝙸𝚂𝙷𝙴𝙺 𝚂𝚄𝚁𝙴𝚂𝙷🍀" }, "error": { "type": "string", "description": "Error message", "example": "An error occurred while processing your request" } }, "required": ["code", "status", "error"], "x-ref": "#/components/schemas/ErrorResponse" } } } } }, "parameters": [], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let dare_ref01_data = Object.values(setup.data.existing.dare)[0];
        // LOAD
        const dare_ref01_ent = client.Dare();
        const dare_ref01_match_dt0 = {};
        const dare_ref01_data_dt0 = (await dare_ref01_ent.load(dare_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != dare_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/dare/DareTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.BeverageMixingSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['dare01', 'dare02', 'dare03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'BEVERAGE_MIXING_TEST_DARE_ENTID': idmap,
        'BEVERAGE_MIXING_TEST_LIVE': 'FALSE',
        'BEVERAGE_MIXING_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['BEVERAGE_MIXING_TEST_DARE_ENTID'];
    const live = 'TRUE' === env.BEVERAGE_MIXING_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['BEVERAGE_MIXING_TEST_DARE_ENTID'];
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
//# sourceMappingURL=DareEntity.test.js.map