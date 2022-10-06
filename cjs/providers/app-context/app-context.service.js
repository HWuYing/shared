"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppContextService = exports.APP_CONTEXT = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var lodash_1 = require("lodash");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var token_1 = require("../../token");
exports.APP_CONTEXT = di_1.InjectorToken.get('APP_CONTEXT');
var AppContextService = /** @class */ (function () {
    function AppContextService(injector) {
        this.injector = injector;
        this.resourceCache = new Map();
    }
    AppContextService.prototype.getContext = function () {
        return this.injector.get(exports.APP_CONTEXT) || {};
    };
    AppContextService.prototype.getEnvironment = function () {
        return this.injector.get(token_1.ENVIRONMENT);
    };
    AppContextService.prototype.getResourceCache = function (type) {
        if (!type || this.resourceCache.has(type)) {
            return type && this.resourceCache.get(type) || new Map();
        }
        var resource = this.getContext().resource;
        var cacheResource = new Map();
        Object.keys(resource).forEach(function (key) {
            var _a = resource[key], source = _a.source, sourceType = _a.type;
            if (sourceType === type) {
                cacheResource.set(key, (0, rxjs_1.of)(source).pipe((0, operators_1.map)(lodash_1.cloneDeep)));
            }
        });
        this.resourceCache.set(type, cacheResource);
        return cacheResource;
    };
    Object.defineProperty(AppContextService.prototype, "fetch", {
        get: function () {
            return this.getContext().fetch;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppContextService.prototype, "isMicro", {
        get: function () {
            return this.getContext().isMicro;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppContextService.prototype, "microManage", {
        get: function () {
            return this.getContext().useMicroManage();
        },
        enumerable: false,
        configurable: true
    });
    AppContextService = tslib_1.__decorate([
        tslib_1.__param(0, (0, di_1.Inject)(di_1.Injector)),
        tslib_1.__metadata("design:paramtypes", [di_1.Injector])
    ], AppContextService);
    return AppContextService;
}());
exports.AppContextService = AppContextService;
