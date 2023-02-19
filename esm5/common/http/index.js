import { __decorate, __metadata } from "tslib";
import { Injectable, Injector, InjectorToken } from '@fm/di';
import { HttpFetchHandler } from './http-fetch-handler';
import { HttpInterceptHandler } from './http-intercept-handler';
export { HttpClient } from './http-client';
export { HttpHandler } from './http-handler';
export { createResponse } from './util';
export var HTTP_INTERCEPTORS = InjectorToken.get('HTTP_INTERCEPTORS');
var HttpInterceptingHandler = /** @class */ (function () {
    function HttpInterceptingHandler(fetchHandler, injector) {
        this.fetchHandler = fetchHandler;
        this.injector = injector;
    }
    HttpInterceptingHandler.prototype.handle = function (req, params) {
        if (!this.chain) {
            var interceptors = this.injector.get(HTTP_INTERCEPTORS) || [];
            this.chain = interceptors.reduceRight(function (next, interceptor) { return new HttpInterceptHandler(next, interceptor); }, this.fetchHandler);
        }
        return this.chain.handle(req, params);
    };
    HttpInterceptingHandler = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpFetchHandler, Injector])
    ], HttpInterceptingHandler);
    return HttpInterceptingHandler;
}());
export { HttpInterceptingHandler };
