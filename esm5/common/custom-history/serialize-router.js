import { __rest, __spreadArray } from "tslib";
import { isEmpty } from 'lodash';
var filterRoute = function (_a) {
    var component = _a.component, loadModule = _a.loadModule;
    return !!component || !!loadModule;
};
export var addRouterKey = function (router, flag) {
    if (flag === void 0) { flag = 'root'; }
    if (!Array.isArray(router)) {
        return addRouterKey([router], flag);
    }
    router.forEach(function (item, index) {
        item.flag = "".concat(flag, "-").concat(index);
        item.children && addRouterKey(item.children, item.flag);
    });
};
export var serializeRouter = function (router, parentRouter) {
    if (isEmpty(router)) {
        return [];
    }
    if (Array.isArray(router)) {
        return serializeRouter({ path: "", children: router, list: [] });
    }
    var _a = router.children, children = _a === void 0 ? [] : _a, routeInfo = __rest(router, ["children"]);
    var _b = routeInfo.path, path = _b === void 0 ? "" : _b;
    var _c = parentRouter || {}, _d = _c.path, parentPath = _d === void 0 ? "" : _d, _e = _c.list, parentList = _e === void 0 ? [] : _e;
    var routePath = "".concat(parentPath, "/").concat(path).replace(/[/]{1,}/ig, '/');
    var ComponentList = __spreadArray([routeInfo], parentList, true);
    if (!isEmpty(children)) {
        return children.reduce(function (list, r) { return __spreadArray(__spreadArray([], list, true), serializeRouter(r, { path: routePath, list: ComponentList }), true); }, []);
    }
    var list = ComponentList.filter(filterRoute);
    return !list.length ? [] : [{ path: routePath, list: list }];
};
