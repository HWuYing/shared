"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationContext = exports.PLATFORM_SCOPE = void 0;
var tslib_1 = require("tslib");
/* eslint-disable no-await-in-loop */
var di_1 = require("@hwy-fm/di");
var lodash_1 = require("lodash");
var token_1 = require("../token");
var utility_1 = require("../utility");
var DELETE_TOKEN = di_1.InjectorToken.get('DELETE_TOKEN');
exports.PLATFORM_SCOPE = 'platform';
var ApplicationContext = /** @class */ (function () {
    function ApplicationContext(_platformProv, _prov) {
        if (_platformProv === void 0) { _platformProv = []; }
        if (_prov === void 0) { _prov = []; }
        this.dynamicInjectors = [];
        this._providers = this.addDefaultProvider([_prov], di_1.ROOT_SCOPE);
        this._platformProviders = this.addDefaultProvider([_platformProv, { provide: ApplicationContext, useValue: this }], exports.PLATFORM_SCOPE);
    }
    ApplicationContext.prototype.addDefaultProvider = function (providers, scope) {
        var _this = this;
        var initFactory = function (injector) { return (_this.addInjector(injector), scope); };
        var deleteFactory = function (injector) { return ({ destroy: function () { return _this.deleteInjector(injector); } }); };
        providers.unshift([
            { provide: DELETE_TOKEN, useFactory: deleteFactory, deps: [di_1.Injector] },
            { provide: di_1.INJECTOR_SCOPE, useFactory: initFactory, deps: [di_1.Injector, DELETE_TOKEN] }
        ]);
        return providers;
    };
    ApplicationContext.prototype.addInjector = function (injector) {
        this.dynamicInjectors.push(injector);
    };
    ApplicationContext.prototype.deleteInjector = function (injector) {
        var indexOf = this.dynamicInjectors.indexOf(injector);
        if (indexOf !== -1)
            this.dynamicInjectors.splice(indexOf, 1);
    };
    ApplicationContext.prototype.setDynamicProv = function (provider, isPlatform) {
        if (isPlatform === void 0) { isPlatform = false; }
        var provide = provider.provide;
        this.dynamicInjectors.forEach(function (injector) {
            if (injector.scope === exports.PLATFORM_SCOPE === isPlatform)
                injector.set(provide, provider);
        });
    };
    ApplicationContext.prototype.addProvider = function (providers) {
        var _this = this;
        (0, lodash_1.forEach)([providers], function (provider) {
            var isPlatform = provider.providedIn === exports.PLATFORM_SCOPE;
            var _providers = isPlatform ? _this._platformProviders : _this._providers;
            _providers.push(provider);
            _this.setDynamicProv(provider, isPlatform);
        });
    };
    ApplicationContext.prototype.getApp = function (injector_1, app_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function (injector, app, metadata) {
            var isProvide, _metadata, _a, _i, _b, plugin;
            var _c, _d;
            if (metadata === void 0) { metadata = {}; }
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        isProvide = typeof metadata === 'function' || metadata instanceof di_1.InjectorToken;
                        if (!isProvide) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.resolve(((_c = injector.get(metadata)) === null || _c === void 0 ? void 0 : _c.load()) || {})];
                    case 1:
                        _a = _e.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = metadata;
                        _e.label = 3;
                    case 3:
                        _metadata = _a;
                        injector.set(token_1.APPLICATION_METADATA, { provide: token_1.APPLICATION_METADATA, useFactory: function () { return (0, utility_1.cloneDeepPlain)(_metadata); } });
                        injector.set(token_1.APPLICATION_TOKEN, { provide: token_1.APPLICATION_TOKEN, useFactory: function () { return injector.get(app); } });
                        (_d = injector.get(token_1.RUNTIME_INJECTOR)) === null || _d === void 0 ? void 0 : _d.forEach(function (fn) { return fn(injector); });
                        _i = 0, _b = (injector.get(token_1.APPLICATION_PLUGIN) || []).sort(function (item) { return item.__order__ || 0; });
                        _e.label = 4;
                    case 4:
                        if (!(_i < _b.length)) return [3 /*break*/, 7];
                        plugin = _b[_i];
                        return [4 /*yield*/, plugin.register()];
                    case 5:
                        _e.sent();
                        _e.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: return [2 /*return*/, injector.get(token_1.APPLICATION_TOKEN)];
                }
            });
        });
    };
    ApplicationContext.prototype.registerApp = function (app, metadata) {
        var _this = this;
        if (metadata === void 0) { metadata = {}; }
        var appFactory = function (injector) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, this.getApp(injector, app, metadata)];
        }); }); };
        this.addProvider({ provide: token_1.APPLICATION_TOKEN, useFactory: appFactory, deps: [di_1.Injector] });
    };
    Object.defineProperty(ApplicationContext.prototype, "platformProviders", {
        get: function () {
            return this._platformProviders;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApplicationContext.prototype, "providers", {
        get: function () {
            return this._providers;
        },
        enumerable: false,
        configurable: true
    });
    return ApplicationContext;
}());
exports.ApplicationContext = ApplicationContext;
