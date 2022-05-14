"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const lodash_1 = require("lodash");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const serialize_router_1 = require("./serialize-router");
const getRex = () => /^:([^:]+)/g;
class Router {
    ls;
    routerConfig;
    routerList = [];
    constructor(ls, routerConfig) {
        this.ls = ls;
        this.routerConfig = routerConfig;
        this.refreshRouterList();
    }
    async getRouterByPath(pathname) {
        let params = {};
        const pathList = pathname.split('/');
        const router = this.routerList.find(({ path }) => {
            params = {};
            return !(path?.split('/') || []).some((itemPath, index) => {
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
        const routeInfo = (0, lodash_1.cloneDeepWith)({ ...router, params }, (value) => (0, lodash_1.isFunction)(value) ? value : undefined);
        return this.pathKey(pathname, routeInfo);
    }
    async loadModule(routeInfo) {
        const { list = [] } = routeInfo;
        const promiseAll = [];
        list.forEach((routeItem) => {
            const { loadModule } = routeItem;
            if (loadModule) {
                promiseAll.push(loadModule().then((result) => {
                    Object.assign(routeInfo, { needRefresh: this.addRouteConfig(routeItem, result) });
                }));
            }
        });
        return await Promise.all(promiseAll).then(() => routeInfo.needRefresh);
    }
    canActivate(routeInfo) {
        const execList = this.getExecList(routeInfo, (routeItem) => {
            const { canActivate = [] } = routeItem;
            return canActivate.map((item) => [routeItem, item]);
        });
        return execList.reduce((ob, [routeItem, activate]) => ob.pipe((0, operators_1.mergeMap)((result) => {
            if (result !== false) {
                const activeResult = this.ls.getProvider(activate).canActivate(routeInfo, routeItem);
                return (0, lodash_1.isBoolean)(activeResult) ? (0, rxjs_1.of)(activeResult) : (0, rxjs_1.from)(activeResult);
            }
            return (0, rxjs_1.of)(result);
        })), (0, rxjs_1.of)(true));
    }
    loadResolve(routeInfo) {
        const execList = this.getExecList(routeInfo, (routeItem) => {
            const { resolve = {} } = routeItem;
            return Object.keys(resolve).map((key) => [routeItem, [key, resolve[key]]]);
        });
        const list = [];
        execList.forEach(([routeItem, [key, result]]) => {
            const { props = {} } = routeItem;
            const server = this.ls.getProvider(result);
            routeItem.props = props;
            if (server && server.resolve) {
                result = server.resolve(routeInfo, routeItem);
                if (result && (result.then || (0, rxjs_1.isObservable)(result))) {
                    return list.push((0, rxjs_1.from)(result).pipe((0, operators_1.tap)((r) => props[key] = r)));
                }
            }
            props[key] = result;
        });
        return list.length ? (0, rxjs_1.forkJoin)(list) : (0, rxjs_1.of)([]);
    }
    pathKey(pathname, routeInfo) {
        const { params, list = [] } = routeInfo;
        list.forEach((routeItem) => {
            const { path } = routeItem;
            const hasRex = path.indexOf('*') !== -1;
            routeItem.key = hasRex ? pathname : path.replace(getRex(), (a, b) => params[b]);
        });
        return routeInfo;
    }
    getExecList(routeInfo, handler) {
        const { list = [] } = routeInfo;
        return [...list].reverse().reduce((arr, routeItem) => arr.concat(handler(routeItem)), []);
    }
    addRouteConfig(routeItem, result) {
        const { children = [] } = result;
        const routeConfig = this.getRouteItemByPath(this.routerConfig, routeItem.path);
        const needRefresh = children.length;
        delete routeItem.loadModule;
        delete routeConfig.loadModule;
        Object.assign(routeConfig, result);
        needRefresh ? this.refreshRouterList() : Object.assign(routeItem, result);
        return needRefresh;
    }
    getRouteItemByPath(routerConfig, path) {
        return routerConfig.find(({ path: _path, children }) => _path === path || children && this.getRouteItemByPath(children, path));
    }
    refreshRouterList() {
        const routerConfig = this.routerConfig;
        this.routerConfig = Array.isArray(routerConfig) ? routerConfig : [routerConfig];
        this.routerList = (0, serialize_router_1.serializeRouter)(this.routerConfig);
    }
}
exports.Router = Router;
