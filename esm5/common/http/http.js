import { __decorate, __extends, __metadata } from "tslib";
import { Injectable } from '@fm/di';
import { AppContextService } from '../../providers/app-context';
import { BaseHttp } from './base-http';
var HttpClient = /** @class */ (function (_super) {
    __extends(HttpClient, _super);
    function HttpClient(appContext) {
        return _super.call(this, appContext.fetch) || this;
    }
    HttpClient = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AppContextService])
    ], HttpClient);
    return HttpClient;
}(BaseHttp));
export { HttpClient };
