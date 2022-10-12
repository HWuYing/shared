import { Observable } from 'rxjs';
import { Fetch } from './type-api';
declare type Proxy = {
    [key: string]: (url: string | RequestInfo, params?: RequestInit) => Observable<Response>;
};
export declare class BaseHttp {
    protected proxy: Proxy;
    constructor(fetch: Fetch);
    get<T = any>(req: RequestInfo | string, params?: RequestInit): Observable<T>;
    getText(req: RequestInfo | string, params?: RequestInit): Observable<string>;
}
export {};
