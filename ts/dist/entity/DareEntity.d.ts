import { BeverageMixingEntityBase } from '../BeverageMixingEntityBase';
import type { BeverageMixingSDK } from '../BeverageMixingSDK';
import type { Control } from '../types';
import type { Dare, DareLoadMatch } from '../BeverageMixingTypes';
declare class DareEntity extends BeverageMixingEntityBase<Dare> {
    constructor(client: BeverageMixingSDK, entopts: any);
    make(this: DareEntity): DareEntity;
    load(this: any, reqmatch?: DareLoadMatch, ctrl?: Control): Promise<DareEntity>;
}
export { DareEntity };
