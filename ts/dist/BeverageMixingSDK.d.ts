import { BeverageEntity } from './entity/BeverageEntity';
import { DareEntity } from './entity/DareEntity';
export type * from './BeverageMixingTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { BeverageMixingEntityBase } from './BeverageMixingEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class BeverageMixingSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Beverage(entopts?: Record<string, any>): BeverageEntity;
    Dare(entopts?: Record<string, any>): DareEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): BeverageMixingSDK;
    tester(testopts?: any, sdkopts?: any): BeverageMixingSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof BeverageMixingSDK;
export { stdutil, config, BaseFeature, BeverageMixingEntityBase, BeverageMixingSDK, SDK, };
