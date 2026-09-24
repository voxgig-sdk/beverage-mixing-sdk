"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeverageMixingError = void 0;
class BeverageMixingError extends Error {
    isBeverageMixingError = true;
    sdk = 'BeverageMixing';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.BeverageMixingError = BeverageMixingError;
//# sourceMappingURL=BeverageMixingError.js.map