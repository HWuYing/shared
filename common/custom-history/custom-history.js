"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedHistory = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@fm/di");
const import_rxjs_1 = require("@fm/import-rxjs");
const history_1 = require("history");
const querystring_1 = require("querystring");
const token_1 = require("../../token");
const router_1 = require("./router");
const router_intercept_abstract_1 = require("./router-intercept.abstract");
let SharedHistory = class SharedHistory {
    ls;
    intercept;
    router;
    history;
    _routeInfo;
    activeRoute = new import_rxjs_1.Subject().pipe((0, import_rxjs_1.shareReplay)(1));
    constructor(ls, intercept) {
        this.ls = ls;
        this.intercept = intercept;
        this.history = this.ls.getProvider(token_1.HISTORY);
        this.router = new router_1.Router(ls, this.ls.getProvider(token_1.ROUTER_CONFIG));
        this.history.listen(this.listener.bind(this));
    }
    navigateTo(url) {
        const location = (0, history_1.parsePath)(url);
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
        await (0, import_rxjs_1.lastValueFrom)(this.router.loadResolve(this.currentRouteInfo));
        this.activeRoute.next(this.currentRouteInfo);
    }
    async resolveIntercept(location) {
        const [pathname, query] = this.parse(location);
        const { params, list = [] } = await this.router.getRouterByPath(pathname);
        this._routeInfo = { path: pathname, query, params, list };
        const status = await (0, import_rxjs_1.lastValueFrom)(this.router.canActivate(this.currentRouteInfo));
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
        return [`/${pathname}`.replace('//', '/'), (0, querystring_1.parse)(search.replace(/^\?/, ''))];
    }
};
SharedHistory = tslib_1.__decorate([
    (0, di_1.Injectable)(),
    tslib_1.__param(1, (0, di_1.Inject)(token_1.ROUTER_INTERCEPT)),
    tslib_1.__metadata("design:paramtypes", [di_1.LocatorStorage, router_intercept_abstract_1.AbstractRouterIntercept])
], SharedHistory);
exports.SharedHistory = SharedHistory;
