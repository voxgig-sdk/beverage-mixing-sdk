export interface Beverage {
    difficulty?: string;
    ingredients?: any[];
    recommendation?: string;
}
export interface BeverageLoadMatch {
    beverage?: string;
    ingredient?: string;
    $action?: string;
    [action: string]: any;
}
export interface Dare {
    code: number;
    creator: string;
    result: string;
    status: boolean;
}
export interface DareLoadMatch {
    code?: number;
    creator?: string;
    result?: string;
    status?: boolean;
}
