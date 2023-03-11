"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpInterceptingHandler = exports.HTTP_INTERCEPTORS = exports.createResponse = exports.HttpHandler = exports.HttpFetchHandler = exports.HttpClient = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var http_fetch_handler_1 = require("./http-fetch-handler");
var http_intercept_handler_1 = require("./http-intercept-handler");
var http_client_1 = require("./http-client");
Object.defineProperty(exports, "HttpClient", { enumerable: true, get: function () { return http_client_1.HttpClient; } });
var http_fetch_handler_2 = require("./http-fetch-handler");
Object.defineProperty(exports, "HttpFetchHandler", { enumerable: true, get: function () { return http_fetch_handler_2.HttpFetchHandler; } });
var http_handler_1 = require("./http-handler");
Object.defineProperty(exports, "HttpHandler", { enumerable: true, get: function () { return http_handler_1.HttpHandler; } });
var util_1 = require("./util");
Object.defineProperty(exports, "createResponse", { enumerable: true, get: function () { return util_1.createResponse; } });
exports.HTTP_INTERCEPTORS = di_1.InjectorToken.get('HTTP_INTERCEPTORS');
var HttpInterceptingHandler = /** @class */ (function () {
    function HttpInterceptingHandler(fetchHandler, injector) {
        this.fetchHandler = fetchHandler;
        this.injector = injector;
    }
    HttpInterceptingHandler.prototype.handle = function (req, params) {
        if (!this.chain) {
            var interceptors = this.injector.get(exports.HTTP_INTERCEPTORS) || [];
            this.chain = interceptors.reduceRight(function (next, interceptor) { return new http_intercept_handler_1.HttpInterceptHandler(next, interceptor); }, this.fetchHandler);
        }
        return this.chain.handle(req, params);
    };
    HttpInterceptingHandler = tslib_1.__decorate([
        (0, di_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [http_fetch_handler_1.HttpFetchHandler, di_1.Injector])
    ], HttpInterceptingHandler);
    return HttpInterceptingHandler;
}());
exports.HttpInterceptingHandler = HttpInterceptingHandler;
