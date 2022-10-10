import { __decorate, __metadata } from "tslib";
import { Injectable } from '@fm/di';
import { from, mergeMap } from 'rxjs';
import { AppContextService } from '../../providers/app-context';
function factoryRequest(fetch, method) {
    return (url, params) => from(fetch(url, Object.assign({ method }, params)));
}
function createProxy(fetch) {
    const methods = ['get'];
    return methods.reduce((proxy, method) => (Object.assign(Object.assign({}, proxy), { [method]: factoryRequest(fetch, method) })), {});
}
let HttpClient = class HttpClient {
    constructor(appContext) {
        this.appContext = appContext;
        this.proxy = createProxy(this.appContext.fetch);
    }
    get(req, params) {
        return this.proxy.get(req, params).pipe(mergeMap((res) => res.json()));
    }
    getText(req, params) {
        return this.proxy.get(req, params).pipe(mergeMap((res) => res.text()));
    }
};
HttpClient = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AppContextService])
], HttpClient);
export { HttpClient };
