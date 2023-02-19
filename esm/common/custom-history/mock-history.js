import { __decorate, __metadata } from "tslib";
import { Injectable, Injector } from '@fm/di';
import { AppContextService } from '../../providers/app-context';
let MockHistory = class MockHistory {
    constructor(injector) {
        this.injector = injector;
        this.appContext = this.injector.get(AppContextService);
    }
    push() {
        void (0);
    }
    replace(url) {
        this._redirect = { url };
    }
    listen() {
        return () => { void (0); };
    }
    get location() {
        return this.appContext.getContext().location;
    }
    get redirect() {
        return this._redirect;
    }
};
MockHistory = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Injector])
], MockHistory);
export { MockHistory };
