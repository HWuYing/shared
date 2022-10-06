import { __rest } from "tslib";
import { isEmpty } from 'lodash';
const filterRoute = ({ component, loadModule }) => !!component || !!loadModule;
export const serializeRouter = (router, parentRouter) => {
    if (isEmpty(router)) {
        return [];
    }
    if (Array.isArray(router)) {
        return serializeRouter({ path: ``, children: router, list: [] });
    }
    const { children = [] } = router, routeInfo = __rest(router, ["children"]);
    const { path = `` } = routeInfo;
    const { path: parentPath = ``, list: parentList = [] } = parentRouter || {};
    const routePath = `${parentPath}/${path}`.replace(/[/]{1,}/ig, '/');
    const ComponentList = [routeInfo, ...parentList];
    if (!isEmpty(children)) {
        return children.reduce((list, r) => [
            ...list,
            ...serializeRouter(r, { path: routePath, list: ComponentList })
        ], []);
    }
    const list = ComponentList.filter(filterRoute);
    return !list.length ? [] : [{ path: routePath, list }];
};
