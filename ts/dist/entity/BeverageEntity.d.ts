import { BeverageMixingEntityBase } from '../BeverageMixingEntityBase';
import type { BeverageMixingSDK } from '../BeverageMixingSDK';
import type { Control } from '../types';
import type { Beverage, BeverageLoadMatch } from '../BeverageMixingTypes';
declare class BeverageEntity extends BeverageMixingEntityBase<Beverage> {
    constructor(client: BeverageMixingSDK, entopts: any);
    make(this: BeverageEntity): BeverageEntity;
    load(this: any, reqmatch?: BeverageLoadMatch, ctrl?: Control): Promise<BeverageEntity>;
}
export { BeverageEntity };
