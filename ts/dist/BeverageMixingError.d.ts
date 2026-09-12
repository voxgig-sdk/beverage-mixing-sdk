import { Context } from './Context';
declare class BeverageMixingError extends Error {
    isBeverageMixingError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { BeverageMixingError };
