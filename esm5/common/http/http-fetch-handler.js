import { __decorate, __metadata } from "tslib";
import { Injectable } from '@fm/di';
import { from } from 'rxjs';
import { AppContextService } from '../../providers/app-context';
var HttpFetchHandler = /** @class */ (function () {
    function HttpFetchHandler(appContext) {
        this.fetch = appContext.fetch;
    }
    HttpFetchHandler.prototype.handle = function (req, params) {
        return from(this.fetch(req, params));
    };
    HttpFetchHandler = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AppContextService])
    ], HttpFetchHandler);
    return HttpFetchHandler;
}());
export { HttpFetchHandler };
