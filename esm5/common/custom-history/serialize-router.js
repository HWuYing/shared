import { __rest, __spreadArray } from "tslib";
import { isEmpty } from 'lodash';
var filterRoute = function (_a) {
    var component = _a.component, loadModule = _a.loadModule;
    return !!component || !!loadModule;
};
var toArray = function (obj) { return Array.isArray(obj) ? obj : [obj]; };
function stackFunction(stackArray) {
    var stack = stackArray;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return { add: function (obj) { return stack.push(obj); }, run: function (handler) { while (stack.length)
            handler(stack.shift()); } };
}
export var addRouterKey = function (router, flag) {
    if (flag === void 0) { flag = 'root'; }
    var stack = stackFunction(toArray(router).map(function (r, index) { return ({ router: r, flag: "".concat(flag, "-").concat(index) }); }));
    stack.run(function (_a) {
        var stackRouter = _a.router, staciFlag = _a.flag;
        var children = stackRouter.children;
        stackRouter.flag = staciFlag;
        if (!isEmpty(children)) {
            children.forEach(function (r, index) { return stack.add({ router: r, flag: "".concat(flag, "-").concat(index) }); });
        }
    });
};
export var serializeRouter = function (router, parentRouter) {
    var stack = stackFunction(toArray(router).map(function (r) { return ({ router: r, parentRouter: parentRouter }); }));
    var routerInfoList = [];
    stack.run(function (_a) {
        var stackRouter = _a.router, _b = _a.parentRouter, stackParentRouter = _b === void 0 ? {} : _b;
        var _c = stackRouter.children, children = _c === void 0 ? [] : _c, routeInfo = __rest(stackRouter, ["children"]);
        var _d = stackParentRouter.path, parentPath = _d === void 0 ? "" : _d, _e = stackParentRouter.list, parentList = _e === void 0 ? [] : _e;
        var routePath = "".concat(parentPath, "/").concat(routeInfo.path || '').replace(/[/]{1,}/ig, '/');
        var list = __spreadArray([routeInfo], parentList, true).filter(filterRoute);
        if (!isEmpty(children)) {
            children.forEach(function (r) { return stack.add({ router: r, parentRouter: { path: routePath, list: list } }); });
        }
        else if (list.length) {
            routerInfoList.push({ path: routePath, list: list });
        }
    });
    return routerInfoList;
};
