import { __decorate, __metadata } from "tslib";
import { Injectable } from '@fm/di';
import { from } from 'rxjs';
import { AppContextService } from '../../providers/app-context';
function factoryRequest(fetch, method, parseData) {
    return (url, params) => from(fetch(url, { method, ...params }).then(parseData));
}
let HttpClient = class HttpClient {
    appContext;
    fetch;
    constructor(appContext) {
        this.appContext = appContext;
        this.fetch = this.appContext.fetch;
    }
    get(req, params) {
        return factoryRequest(this.fetch, 'get', (res) => res.json())(req, params);
    }
    getText(req, params) {
        return factoryRequest(this.fetch, 'get', (res) => res.text())(req, params);
    }
};
HttpClient = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AppContextService])
], HttpClient);
export { HttpClient };
