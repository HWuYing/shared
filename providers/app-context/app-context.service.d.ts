import { Injector, InjectorToken } from '@fm/di';
import { MicroManageInterface } from '../../micro/types';
export declare type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;
export declare const APP_CONTEXT: InjectorToken;
export declare abstract class AppContextService {
    protected injector: Injector;
    private resourceCache;
    constructor(injector: Injector);
    getContext<T = any>(): T;
    getEnvironment(): any;
    getResourceCache(type?: string): Map<any, any>;
    get fetch(): Fetch;
    get isMicro(): boolean;
    get microManage(): MicroManageInterface;
}
