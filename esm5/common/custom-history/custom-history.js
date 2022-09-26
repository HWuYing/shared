import { __decorate, __metadata, __param } from "tslib";
import { Inject, Injectable, Injector } from '@fm/di';
import { parsePath } from 'history';
import { parse } from 'querystring';
import { lastValueFrom, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { HISTORY, ROUTER_CONFIG, ROUTER_INTERCEPT } from '../../token';
import { Router } from './router';
import { AbstractRouterIntercept } from './router-intercept.abstract';
let SharedHistory = class SharedHistory {
    injector;
    intercept;
    router;
    history;
    _routeInfo;
    activeRoute = new Subject().pipe(shareReplay(1));
    constructor(injector, intercept) {
        this.injector = injector;
        this.intercept = intercept;
        this.history = this.injector.get(HISTORY);
        this.router = new Router(injector, this.injector.get(ROUTER_CONFIG));
        this.history.listen(this.listener.bind(this));
    }
    navigateTo(url) {
        const location = parsePath(url);
        this.resolveIntercept(location).then((status) => status && this.history.push(url));
    }
    async resolve() {
        const { location } = this.history;
        const status = await this.resolveIntercept(location);
        status && await this.listener();
    }
    get currentRouteInfo() {
        return this._routeInfo || { path: null, params: {}, query: {}, list: [] };
    }
    async listener() {
        if (this.intercept) {
            await this.intercept.resolve(this.currentRouteInfo);
        }
        await lastValueFrom(this.router.loadResolve(this.currentRouteInfo));
        this.activeRoute.next(this.currentRouteInfo);
    }
    async resolveIntercept(location) {
        const [pathname, query] = this.parse(location);
        const { params, list = [] } = await this.router.getRouterByPath(pathname);
        this._routeInfo = { path: pathname, query, params, list };
        const status = await lastValueFrom(this.router.canActivate(this.currentRouteInfo));
        if (!status) {
            this._routeInfo.list = [];
        }
        else if (await this.router.loadModule(this.currentRouteInfo)) {
            return await this.resolveIntercept(location);
        }
        return status;
    }
    parse(location) {
        const { pathname, search = '' } = location;
        return [`/${pathname}`.replace('//', '/'), parse(search.replace(/^\?/, ''))];
    }
};
SharedHistory = __decorate([
    Injectable(),
    __param(1, Inject(ROUTER_INTERCEPT)),
    __metadata("design:paramtypes", [Injector, AbstractRouterIntercept])
], SharedHistory);
export { SharedHistory };
