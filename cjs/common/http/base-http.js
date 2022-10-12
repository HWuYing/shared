"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHttp = void 0;
var tslib_1 = require("tslib");
var rxjs_1 = require("rxjs");
function factoryRequest(fetch, method) {
    return function (url, params) { return (0, rxjs_1.from)(fetch(url, tslib_1.__assign({ method: method }, params))); };
}
function createProxy(_a) {
    var fetch = _a.fetch;
    var methods = ['get'];
    return methods.reduce(function (proxy, method) {
        var _a;
        return (tslib_1.__assign(tslib_1.__assign({}, proxy), (_a = {}, _a[method] = factoryRequest(fetch, method), _a)));
    }, {});
}
var BaseHttp = /** @class */ (function () {
    function BaseHttp(fetch) {
        this.proxy = createProxy({ fetch: fetch });
    }
    BaseHttp.prototype.get = function (req, params) {
        return this.proxy.get(req, params).pipe((0, rxjs_1.mergeMap)(function (res) { return res.json(); }));
    };
    BaseHttp.prototype.getText = function (req, params) {
        return this.proxy.get(req, params).pipe((0, rxjs_1.mergeMap)(function (res) { return res.text(); }));
    };
    return BaseHttp;
}());
exports.BaseHttp = BaseHttp;
