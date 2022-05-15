"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppContextService = exports.APP_CONTEXT = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@fm/di");
const import_rxjs_1 = require("@fm/import-rxjs");
const lodash_1 = require("lodash");
const token_1 = require("../../token");
exports.APP_CONTEXT = di_1.InjectorToken.get('APP_CONTEXT');
let AppContextService = class AppContextService {
    ls;
    resourceCache = new Map();
    constructor(ls) {
        this.ls = ls;
    }
    getContext() {
        return this.ls.getProvider(exports.APP_CONTEXT) || {};
    }
    getEnvironment() {
        return this.ls.getProvider(token_1.ENVIRONMENT);
    }
    getResourceCache(type) {
        if (!type || this.resourceCache.has(type)) {
            return type && this.resourceCache.get(type) || new Map();
        }
        const resource = this.getContext().resource;
        const cacheResource = new Map();
        Object.keys(resource).forEach((key) => {
            const { source, type: sourceType } = resource[key];
            if (sourceType === type) {
                cacheResource.set(key, (0, import_rxjs_1.of)(source).pipe((0, import_rxjs_1.map)(lodash_1.cloneDeep)));
            }
        });
        this.resourceCache.set(type, cacheResource);
        return cacheResource;
    }
    get microManage() {
        return this.getContext().useMicroManage();
    }
    get fetch() {
        return this.getContext().fetch;
    }
    get isMicro() {
        return this.getContext().isMicro;
    }
};
AppContextService = tslib_1.__decorate([
    tslib_1.__param(0, (0, di_1.Inject)(di_1.LocatorStorage)),
    tslib_1.__metadata("design:paramtypes", [di_1.LocatorStorage])
], AppContextService);
exports.AppContextService = AppContextService;
