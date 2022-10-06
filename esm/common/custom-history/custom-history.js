import { __awaiter, __decorate, __metadata, __param } from "tslib";
import { Inject, Injectable, Injector } from '@fm/di';
import { parsePath } from 'history';
import { lastValueFrom, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { HISTORY, ROUTER_CONFIG, ROUTER_INTERCEPT } from '../../token';
import { Router } from './router';
import { AbstractRouterIntercept } from './router-intercept.abstract';
let SharedHistory = class SharedHistory {
    constructor(injector, intercept) {
        this.injector = injector;
        this.intercept = intercept;
        this.activeRoute = new Subject().pipe(shareReplay(1));
        this.history = this.injector.get(HISTORY);
        this.router = new Router(injector, this.injector.get(ROUTER_CONFIG));
        this.history.listen(this.listener.bind(this));
    }
    navigateTo(url) {
        const location = parsePath(url);
        this.resolveIntercept(location).then((status) => status && this.history.push(url));
    }
    resolve() {
        return __awaiter(this, void 0, void 0, function* () {
            const { location } = this.history;
            const status = yield this.resolveIntercept(location);
            status && (yield this.listener());
        });
    }
    get currentRouteInfo() {
        return this._routeInfo || { path: null, params: {}, query: {}, list: [] };
    }
    listener() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.intercept) {
                yield this.intercept.resolve(this.currentRouteInfo);
            }
            yield lastValueFrom(this.router.loadResolve(this.currentRouteInfo));
            this.activeRoute.next(this.currentRouteInfo);
        });
    }
    resolveIntercept(location) {
        return __awaiter(this, void 0, void 0, function* () {
            const [pathname, query] = this.parse(location);
            const { params, list = [] } = yield this.router.getRouterByPath(pathname);
            this._routeInfo = { path: pathname, query, params, list };
            const status = yield lastValueFrom(this.router.canActivate(this.currentRouteInfo));
            if (!status) {
                this._routeInfo.list = [];
            }
            else if (yield this.router.loadModule(this.currentRouteInfo)) {
                return yield this.resolveIntercept(location);
            }
            return status;
        });
    }
    parse(location) {
        const { pathname, search = '' } = location;
        return [`/${pathname}`.replace('//', '/'), this.parseSearch(search.replace(/^\?/, ''))];
    }
    parseSearch(search) {
        const query = {};
        (search.match(/[^&]/ig) || []).forEach((item) => {
            const [name, value] = item.split('=');
            query[name] = value;
        });
        return query;
    }
};
SharedHistory = __decorate([
    Injectable(),
    __param(1, Inject(ROUTER_INTERCEPT)),
    __metadata("design:paramtypes", [Injector, AbstractRouterIntercept])
], SharedHistory);
export { SharedHistory };
