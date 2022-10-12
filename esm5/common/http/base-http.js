import { __assign } from "tslib";
import { from, mergeMap } from 'rxjs';
function factoryRequest(fetch, method) {
    return function (url, params) { return from(fetch(url, __assign({ method: method }, params))); };
}
function createProxy(_a) {
    var fetch = _a.fetch;
    var methods = ['get'];
    return methods.reduce(function (proxy, method) {
        var _a;
        return (__assign(__assign({}, proxy), (_a = {}, _a[method] = factoryRequest(fetch, method), _a)));
    }, {});
}
var BaseHttp = /** @class */ (function () {
    function BaseHttp(fetch) {
        this.proxy = createProxy({ fetch: fetch });
    }
    BaseHttp.prototype.get = function (req, params) {
        return this.proxy.get(req, params).pipe(mergeMap(function (res) { return res.json(); }));
    };
    BaseHttp.prototype.getText = function (req, params) {
        return this.proxy.get(req, params).pipe(mergeMap(function (res) { return res.text(); }));
    };
    return BaseHttp;
}());
export { BaseHttp };
