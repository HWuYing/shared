import { Injector, InjectorToken } from '@fm/di';
import { Fetch } from '@fm/shared/common/http/type-api';
import { MicroManageInterface } from '../../micro/types';
export declare const APP_CONTEXT: InjectorToken;
export declare abstract class AppContextService {
    protected injector: Injector;
    constructor(injector: Injector);
    getContext<T = any>(): T;
    getEnvironment(): any;
    get fetch(): Fetch;
    get isMicro(): boolean;
    get microManage(): MicroManageInterface;
}
