import { __assign, __decorate, __metadata } from "tslib";
import { Injectable } from '@fm/di';
import { from, mergeMap } from 'rxjs';
import { AppContextService } from '../../providers/app-context';
function factoryRequest(fetch, method) {
    return function (url, params) { return from(fetch(url, __assign({ method: method }, params))); };
}
function createProxy(fetch) {
    var methods = ['get'];
    return methods.reduce(function (proxy, method) {
        var _a;
        return (__assign(__assign({}, proxy), (_a = {}, _a[method] = factoryRequest(fetch, method), _a)));
    }, {});
}
var HttpClient = /** @class */ (function () {
    function HttpClient(appContext) {
        this.appContext = appContext;
        this.proxy = createProxy(this.appContext.fetch);
    }
    HttpClient.prototype.get = function (req, params) {
        return this.proxy.get(req, params).pipe(mergeMap(function (res) { return res.json(); }));
    };
    HttpClient.prototype.getText = function (req, params) {
        return this.proxy.get(req, params).pipe(mergeMap(function (res) { return res.text(); }));
    };
    HttpClient = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AppContextService])
    ], HttpClient);
    return HttpClient;
}());
export { HttpClient };
