import { __decorate, __metadata } from "tslib";
import { Injectable, Injector, InjectorToken } from '@fm/di';
import { HttpFetchHandler } from './http-fetch-handler';
import { HttpInterceptHandler } from './http-intercept-handler';
export { HttpClient } from './http-client';
export { HttpFetchHandler } from './http-fetch-handler';
export { HttpHandler } from './http-handler';
export { createResponse } from './util';
export const HTTP_INTERCEPTORS = InjectorToken.get('HTTP_INTERCEPTORS');
let HttpInterceptingHandler = class HttpInterceptingHandler {
    constructor(fetchHandler, injector) {
        this.fetchHandler = fetchHandler;
        this.injector = injector;
    }
    handle(req, params) {
        if (!this.chain) {
            const interceptors = this.injector.get(HTTP_INTERCEPTORS) || [];
            this.chain = interceptors.reduceRight((next, interceptor) => new HttpInterceptHandler(next, interceptor), this.fetchHandler);
        }
        return this.chain.handle(req, params);
    }
};
HttpInterceptingHandler = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpFetchHandler, Injector])
], HttpInterceptingHandler);
export { HttpInterceptingHandler };
