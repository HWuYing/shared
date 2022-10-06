import { __awaiter, __decorate, __generator, __metadata, __param } from "tslib";
import { Inject, Injectable, Injector } from '@fm/di';
import { parsePath } from 'history';
import { lastValueFrom, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { HISTORY, ROUTER_CONFIG, ROUTER_INTERCEPT } from '../../token';
import { Router } from './router';
import { AbstractRouterIntercept } from './router-intercept.abstract';
var SharedHistory = /** @class */ (function () {
    function SharedHistory(injector, intercept) {
        this.injector = injector;
        this.intercept = intercept;
        this.activeRoute = new Subject().pipe(shareReplay(1));
        this.history = this.injector.get(HISTORY);
        this.router = new Router(injector, this.injector.get(ROUTER_CONFIG));
        this.history.listen(this.listener.bind(this));
    }
    SharedHistory.prototype.navigateTo = function (url) {
        var _this = this;
        var location = parsePath(url);
        this.resolveIntercept(location).then(function (status) { return status && _this.history.push(url); });
    };
    SharedHistory.prototype.resolve = function () {
        return __awaiter(this, void 0, void 0, function () {
            var location, status, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        location = this.history.location;
                        return [4 /*yield*/, this.resolveIntercept(location)];
                    case 1:
                        status = _b.sent();
                        _a = status;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.listener()];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        _a;
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(SharedHistory.prototype, "currentRouteInfo", {
        get: function () {
            return this._routeInfo || { path: null, params: {}, query: {}, list: [] };
        },
        enumerable: false,
        configurable: true
    });
    SharedHistory.prototype.listener = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.intercept) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.intercept.resolve(this.currentRouteInfo)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, lastValueFrom(this.router.loadResolve(this.currentRouteInfo))];
                    case 3:
                        _a.sent();
                        this.activeRoute.next(this.currentRouteInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    SharedHistory.prototype.resolveIntercept = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, pathname, query, _b, params, _c, list, status;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this.parse(location), pathname = _a[0], query = _a[1];
                        return [4 /*yield*/, this.router.getRouterByPath(pathname)];
                    case 1:
                        _b = _d.sent(), params = _b.params, _c = _b.list, list = _c === void 0 ? [] : _c;
                        this._routeInfo = { path: pathname, query: query, params: params, list: list };
                        return [4 /*yield*/, lastValueFrom(this.router.canActivate(this.currentRouteInfo))];
                    case 2:
                        status = _d.sent();
                        if (!!status) return [3 /*break*/, 3];
                        this._routeInfo.list = [];
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.router.loadModule(this.currentRouteInfo)];
                    case 4:
                        if (!_d.sent()) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.resolveIntercept(location)];
                    case 5: return [2 /*return*/, _d.sent()];
                    case 6: return [2 /*return*/, status];
                }
            });
        });
    };
    SharedHistory.prototype.parse = function (location) {
        var pathname = location.pathname, _a = location.search, search = _a === void 0 ? '' : _a;
        return ["/".concat(pathname).replace('//', '/'), this.parseSearch(search.replace(/^\?/, ''))];
    };
    SharedHistory.prototype.parseSearch = function (search) {
        var query = {};
        (search.match(/[^&]/ig) || []).forEach(function (item) {
            var _a = item.split('='), name = _a[0], value = _a[1];
            query[name] = value;
        });
        return query;
    };
    SharedHistory = __decorate([
        Injectable(),
        __param(1, Inject(ROUTER_INTERCEPT)),
        __metadata("design:paramtypes", [Injector, AbstractRouterIntercept])
    ], SharedHistory);
    return SharedHistory;
}());
export { SharedHistory };
