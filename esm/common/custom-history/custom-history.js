import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable, Injector } from '@fm/di';
import { parsePath } from 'history';
import { lastValueFrom, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { HISTORY, ROUTER_CONFIG } from '../../token';
import { Router } from './router';
let SharedHistory = class SharedHistory {
    constructor(injector) {
        this.injector = injector;
        this.activeRoute = new Subject().pipe(shareReplay(1));
        this.pushRoute = new Subject();
        this.cancelRoute = new Subject();
        this.history = this.injector.get(HISTORY);
        this.router = new Router(injector, this.injector.get(ROUTER_CONFIG));
        this.unListen = this.history.listen(this.listener.bind(this));
    }
    loadRouter(url) {
        return __awaiter(this, void 0, void 0, function* () {
            this.pushRoute.next(url);
            return this.resolveIntercept(parsePath(url));
        });
    }
    navigateTo(url) {
        this.loadRouter(url).then((status) => status && this.history.push(url));
    }
    redirect(url) {
        const isServer = typeof window === 'undefined';
        isServer ? this.history.replace(url) : this.loadRouter(url).then((status) => status && this.history.replace(url));
    }
    resolve() {
        return __awaiter(this, void 0, void 0, function* () {
            const { location } = this.history;
            const status = yield this.resolveIntercept(location);
            status && (yield this.listener());
        });
    }
    destory() {
        this.unListen();
        this.activeRoute.unsubscribe();
        this.pushRoute.unsubscribe();
        this.cancelRoute.unsubscribe();
    }
    get currentRouteInfo() {
        return this._routeInfo || { path: null, params: {}, query: {}, list: [] };
    }
    listener() {
        return __awaiter(this, void 0, void 0, function* () {
            const { location } = this.history;
            const routeInfo = this.createRouteInfo(location);
            const needResove = routeInfo.list.some((routeItem) => routeItem.loadModule);
            if (needResove)
                return yield this.resolve();
            yield lastValueFrom(this.router.loadResolve(routeInfo));
            this.activeRoute.next(this._routeInfo = routeInfo);
        });
    }
    resolveIntercept(location) {
        return __awaiter(this, void 0, void 0, function* () {
            const routeInfo = this.createRouteInfo(location);
            const status = yield lastValueFrom(this.router.canActivate(routeInfo));
            if (!status) {
                routeInfo.list = [];
                this.cancelRoute.next(routeInfo);
            }
            else if (yield this.router.loadModule(routeInfo)) {
                return yield this.resolveIntercept(location);
            }
            return status;
        });
    }
    createRouteInfo(location) {
        const [pathname, query] = this.parse(location);
        const { params, list = [] } = this.router.getRouterByPath(pathname);
        return { path: pathname, query, params, list };
    }
    parse(location) {
        const { pathname, search = '' } = location;
        return [`/${pathname}`.replace('//', '/'), this.parseSearch(search.replace(/^\?/, ''))];
    }
    parseSearch(search) {
        const query = {};
        (search.match(/[^&]+/ig) || []).forEach((item) => {
            const [name, value] = item.split('=');
            query[name] = value;
        });
        return query;
    }
};
SharedHistory = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Injector])
], SharedHistory);
export { SharedHistory };
