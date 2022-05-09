"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonConfigService = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@fm/di");
const lodash_1 = require("lodash");
const import_rxjs_1 = require("@fm/import-rxjs");
const app_context_1 = require("../app-context");
let JsonConfigService = class JsonConfigService {
    ls;
    appContext;
    cacheConfig;
    constructor(ls) {
        this.ls = ls;
        this.appContext = this.ls.getProvider(app_context_1.AppContextService);
        this.cacheConfig = this.appContext.getResourceCache('file-static');
    }
    getJsonConfig(url) {
        let subject = this.cacheConfig.get(url);
        if (!subject) {
            subject = this.getServerFetchData(url).pipe((0, import_rxjs_1.shareReplay)(1), (0, import_rxjs_1.map)(lodash_1.cloneDeep));
            this.cacheConfig.set(url, subject);
        }
        return subject;
    }
};
JsonConfigService = tslib_1.__decorate([
    tslib_1.__param(0, (0, di_1.Inject)(di_1.LocatorStorage)),
    tslib_1.__metadata("design:paramtypes", [di_1.LocatorStorage])
], JsonConfigService);
exports.JsonConfigService = JsonConfigService;
