import { Injector, InjectorToken } from '@fm/di';
import { Observable } from 'rxjs';
import { HttpFetchHandler } from './http-fetch-handler';
import { HttpHandler } from './http-handler';
export { HttpClient } from './http-client';
export { HttpHandler } from './http-handler';
export type { Fetch, HttpInterceptor } from './type-api';
export { createResponse } from './util';
export declare const HTTP_INTERCEPTORS: InjectorToken;
export declare class HttpInterceptingHandler implements HttpHandler {
    private fetchHandler;
    private injector;
    private chain;
    constructor(fetchHandler: HttpFetchHandler, injector: Injector);
    handle(req: RequestInfo, params?: RequestInit | undefined): Observable<Response>;
}
