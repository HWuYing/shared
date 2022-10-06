"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var tslib_1 = require("tslib");
var lodash_1 = require("lodash");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var serialize_router_1 = require("./serialize-router");
var getRex = function () { return /^:([^:]+)/g; };
var Router = /** @class */ (function () {
    function Router(injector, routerConfig) {
        this.injector = injector;
        this.routerConfig = routerConfig;
        this.routerList = [];
        this.refreshRouterList();
    }
    Router.prototype.getRouterByPath = function (pathname) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var params, pathList, router, routeInfo;
            return tslib_1.__generator(this, function (_a) {
                params = {};
                pathList = pathname.split('/');
                router = this.routerList.find(function (_a) {
                    var path = _a.path;
                    params = {};
                    return !((path === null || path === void 0 ? void 0 : path.split('/')) || []).some(function (itemPath, index) {
                        if (itemPath === '*' || itemPath === pathList[index]) {
                            return false;
                        }
                        if (getRex().test(itemPath)) {
                            params[itemPath.replace(getRex(), '$1')] = pathList[index];
                            return false;
                        }
                        return true;
                    });
                });
                routeInfo = (0, lodash_1.cloneDeepWith)(tslib_1.__assign(tslib_1.__assign({}, router), { params: params }), function (value) { return (0, lodash_1.isFunction)(value) ? value : undefined; });
                return [2 /*return*/, this.pathKey(pathname, routeInfo)];
            });
        });
    };
    Router.prototype.loadModule = function (routeInfo) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, list, promiseAll;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = routeInfo.list, list = _a === void 0 ? [] : _a;
                        promiseAll = [];
                        list.forEach(function (routeItem) {
                            var loadModule = routeItem.loadModule;
                            if (loadModule) {
                                promiseAll.push(loadModule().then(function (result) {
                                    Object.assign(routeInfo, { needRefresh: _this.addRouteConfig(routeItem, result) });
                                }));
                            }
                        });
                        return [4 /*yield*/, Promise.all(promiseAll).then(function () { return routeInfo.needRefresh; })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    Router.prototype.canActivate = function (routeInfo) {
        var _this = this;
        var execList = this.getExecList(routeInfo, function (routeItem) {
            var _a = routeItem.canActivate, canActivate = _a === void 0 ? [] : _a;
            return canActivate.map(function (item) { return [routeItem, item]; });
        });
        return execList.reduce(function (ob, _a) {
            var routeItem = _a[0], activate = _a[1];
            return ob.pipe((0, operators_1.mergeMap)(function (result) {
                if (result !== false) {
                    var activeResult = _this.injector.get(activate).canActivate(routeInfo, routeItem);
                    return _this.toObservable(activeResult);
                }
                return (0, rxjs_1.of)(result);
            }));
        }, (0, rxjs_1.of)(true));
    };
    Router.prototype.loadResolve = function (routeInfo) {
        var _this = this;
        var execList = this.getExecList(routeInfo, function (routeItem) {
            var _a = routeItem.resolve, resolve = _a === void 0 ? {} : _a;
            return Object.keys(resolve).map(function (key) { return [routeItem, [key, resolve[key]]]; });
        });
        var list = [];
        execList.forEach(function (_a) {
            var routeItem = _a[0], _b = _a[1], key = _b[0], result = _b[1];
            var _c = routeItem.props, props = _c === void 0 ? {} : _c;
            var server = _this.injector.get(result);
            routeItem.props = props;
            if (server && server.resolve) {
                result = server.resolve(routeInfo, routeItem);
                if (result && (result.then || (0, rxjs_1.isObservable)(result))) {
                    return list.push(_this.toObservable(result).pipe((0, operators_1.tap)(function (r) { return props[key] = r; })));
                }
            }
            props[key] = result;
        });
        return list.length ? (0, rxjs_1.forkJoin)(list) : (0, rxjs_1.of)([]);
    };
    Router.prototype.pathKey = function (pathname, routeInfo) {
        var params = routeInfo.params, _a = routeInfo.list, list = _a === void 0 ? [] : _a;
        list.forEach(function (routeItem) {
            var path = routeItem.path;
            var hasRex = path.indexOf('*') !== -1;
            routeItem.key = hasRex ? pathname : path.replace(getRex(), function (a, b) { return params[b]; });
        });
        return routeInfo;
    };
    Router.prototype.getExecList = function (routeInfo, handler) {
        var _a = routeInfo.list, list = _a === void 0 ? [] : _a;
        return tslib_1.__spreadArray([], list, true).reverse().reduce(function (arr, routeItem) { return arr.concat(handler(routeItem)); }, []);
    };
    Router.prototype.addRouteConfig = function (routeItem, result) {
        var _a = result.children, children = _a === void 0 ? [] : _a;
        var routeConfig = this.getRouteItemByPath(this.routerConfig, routeItem.path);
        var needRefresh = children.length;
        delete routeItem.loadModule;
        delete routeConfig.loadModule;
        Object.assign(routeConfig, result);
        needRefresh ? this.refreshRouterList() : Object.assign(routeItem, result);
        return needRefresh;
    };
    Router.prototype.getRouteItemByPath = function (routerConfig, path) {
        var _this = this;
        return routerConfig.find(function (_a) {
            var _path = _a.path, children = _a.children;
            return _path === path || children && _this.getRouteItemByPath(children, path);
        });
    };
    Router.prototype.refreshRouterList = function () {
        var routerConfig = this.routerConfig;
        this.routerConfig = Array.isArray(routerConfig) ? routerConfig : [routerConfig];
        this.routerList = (0, serialize_router_1.serializeRouter)(this.routerConfig);
    };
    Router.prototype.toObservable = function (result) {
        if ((0, rxjs_1.isObservable)(result)) {
            return result;
        }
        return result.then ? (0, rxjs_1.from)(result) : (0, rxjs_1.of)(result);
    };
    return Router;
}());
exports.Router = Router;
