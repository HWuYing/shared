import { __assign, __decorate, __metadata } from "tslib";
import { Injectable } from '@fm/di';
import { from } from 'rxjs';
import { AppContextService } from '../../providers/app-context';
function factoryRequest(fetch, method, parseData) {
    return function (url, params) { return from(fetch(url, __assign({ method: method }, params)).then(parseData)); };
}
var HttpClient = /** @class */ (function () {
    function HttpClient(appContext) {
        this.appContext = appContext;
        this.fetch = this.appContext.fetch;
    }
    HttpClient.prototype.get = function (req, params) {
        return factoryRequest(this.fetch, 'get', function (res) { return res.json(); })(req, params);
    };
    HttpClient.prototype.getText = function (req, params) {
        return factoryRequest(this.fetch, 'get', function (res) { return res.text(); })(req, params);
    };
    HttpClient = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AppContextService])
    ], HttpClient);
    return HttpClient;
}());
export { HttpClient };
