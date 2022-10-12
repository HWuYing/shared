import { __decorate, __metadata } from "tslib";
import { Injectable } from '@fm/di';
import { AppContextService } from '../../providers/app-context';
import { BaseHttp } from './base-http';
let HttpClient = class HttpClient extends BaseHttp {
    constructor(appContext) {
        super(appContext.fetch);
    }
};
HttpClient = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AppContextService])
], HttpClient);
export { HttpClient };
