"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeRouter = exports.addRouterKey = void 0;
var tslib_1 = require("tslib");
var lodash_1 = require("lodash");
var filterRoute = function (_a) {
    var component = _a.component, loadModule = _a.loadModule;
    return !!component || !!loadModule;
};
var addRouterKey = function (router, flag) {
    if (flag === void 0) { flag = 'root'; }
    if (!Array.isArray(router)) {
        return (0, exports.addRouterKey)([router], flag);
    }
    router.forEach(function (item, index) {
        item.flag = "".concat(flag, "-").concat(index);
        item.children && (0, exports.addRouterKey)(item.children, item.flag);
    });
};
exports.addRouterKey = addRouterKey;
var serializeRouter = function (router, parentRouter) {
    if ((0, lodash_1.isEmpty)(router)) {
        return [];
    }
    if (Array.isArray(router)) {
        return (0, exports.serializeRouter)({ path: "", children: router, list: [] });
    }
    var _a = router.children, children = _a === void 0 ? [] : _a, routeInfo = tslib_1.__rest(router, ["children"]);
    var _b = routeInfo.path, path = _b === void 0 ? "" : _b;
    var _c = parentRouter || {}, _d = _c.path, parentPath = _d === void 0 ? "" : _d, _e = _c.list, parentList = _e === void 0 ? [] : _e;
    var routePath = "".concat(parentPath, "/").concat(path).replace(/[/]{1,}/ig, '/');
    var ComponentList = tslib_1.__spreadArray([routeInfo], parentList, true);
    if (!(0, lodash_1.isEmpty)(children)) {
        return children.reduce(function (list, r) { return tslib_1.__spreadArray(tslib_1.__spreadArray([], list, true), (0, exports.serializeRouter)(r, { path: routePath, list: ComponentList }), true); }, []);
    }
    var list = ComponentList.filter(filterRoute);
    return !list.length ? [] : [{ path: routePath, list: list }];
};
exports.serializeRouter = serializeRouter;
