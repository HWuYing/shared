"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@fm/di");
const rxjs_1 = require("rxjs");
const app_context_1 = require("../../providers/app-context");
function factoryRequest(fetch, method, parseData) {
    return (url, params) => (0, rxjs_1.from)(fetch(url, { method, ...params }).then(parseData));
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
HttpClient = tslib_1.__decorate([
    (0, di_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [app_context_1.AppContextService])
], HttpClient);
exports.HttpClient = HttpClient;
