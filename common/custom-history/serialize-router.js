"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeRouter = void 0;
const lodash_1 = require("lodash");
const filterRoute = ({ component, loadModule }) => !!component || !!loadModule;
const serializeRouter = (router, parentRouter) => {
    if ((0, lodash_1.isEmpty)(router)) {
        return [];
    }
    if (Array.isArray(router)) {
        return (0, exports.serializeRouter)({ path: ``, children: router, list: [] });
    }
    const { children = [], ...routeInfo } = router;
    const { path = `` } = routeInfo;
    const { path: parentPath = ``, list: parentList = [] } = parentRouter || {};
    const routePath = `${parentPath}/${path}`.replace(/[/]{1,}/ig, '/');
    const ComponentList = [routeInfo, ...parentList];
    if (!(0, lodash_1.isEmpty)(children)) {
        return children.reduce((list, r) => [
            ...list,
            ...(0, exports.serializeRouter)(r, { path: routePath, list: ComponentList })
        ], []);
    }
    const list = ComponentList.filter(filterRoute);
    return !list.length ? [] : [{ path: routePath, list }];
};
exports.serializeRouter = serializeRouter;
