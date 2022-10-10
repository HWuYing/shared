"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var rxjs_1 = require("rxjs");
var app_context_1 = require("../../providers/app-context");
function factoryRequest(fetch, method) {
    return function (url, params) { return (0, rxjs_1.from)(fetch(url, tslib_1.__assign({ method: method }, params))); };
}
function createProxy(fetch) {
    var methods = ['get'];
    return methods.reduce(function (proxy, method) {
        var _a;
        return (tslib_1.__assign(tslib_1.__assign({}, proxy), (_a = {}, _a[method] = factoryRequest(fetch, method), _a)));
    }, {});
}
var HttpClient = /** @class */ (function () {
    function HttpClient(appContext) {
        this.appContext = appContext;
        this.proxy = createProxy(this.appContext.fetch);
    }
    HttpClient.prototype.get = function (req, params) {
        return this.proxy.get(req, params).pipe((0, rxjs_1.mergeMap)(function (res) { return res.json(); }));
    };
    HttpClient.prototype.getText = function (req, params) {
        return this.proxy.get(req, params).pipe((0, rxjs_1.mergeMap)(function (res) { return res.text(); }));
    };
    HttpClient = tslib_1.__decorate([
        (0, di_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [app_context_1.AppContextService])
    ], HttpClient);
    return HttpClient;
}());
exports.HttpClient = HttpClient;
