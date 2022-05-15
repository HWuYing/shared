import { InjectorToken, LocatorStorage } from '@fm/di';
import { MicroManageInterface } from '../../micro/types';
export declare type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;
export declare const APP_CONTEXT: InjectorToken;
export declare abstract class AppContextService {
    protected ls: LocatorStorage;
    private resourceCache;
    constructor(ls: LocatorStorage);
    getContext<T = any>(): T;
    getEnvironment(): any;
    getResourceCache(type?: string): Map<any, any>;
    get microManage(): MicroManageInterface;
    get fetch(): Fetch;
    get isMicro(): boolean;
}
