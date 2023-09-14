"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationContext = exports.PLATFORM_SCOPE = void 0;
var tslib_1 = require("tslib");
// eslint-disable-next-line max-len
var di_1 = require("@fm/di");
var lodash_1 = require("lodash");
var token_1 = require("../token");
var utility_1 = require("../utility");
var APPLICATION = 'Application';
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
            var needPush = isPlatform ? injector.scope === exports.PLATFORM_SCOPE : injector.scope !== exports.PLATFORM_SCOPE;
            if (needPush)
                injector.set(provide, provider);
        });
    };
    ApplicationContext.prototype.addProvider = function (provider) {
        var isPlatform = provider.providedIn === exports.PLATFORM_SCOPE;
        var providers = isPlatform ? this._platformProviders : this._providers;
        providers.push(provider);
        this.setDynamicProv(provider, isPlatform);
    };
    ApplicationContext.prototype.getApp = function (injector, app, metadata) {
        var _a;
        if (metadata === void 0) { metadata = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var isProvide, _metadata, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        isProvide = typeof metadata === 'function' || metadata instanceof di_1.InjectorToken;
                        if (!isProvide) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.resolve(((_a = injector.get(metadata)) === null || _a === void 0 ? void 0 : _a.load()) || {})];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = metadata;
                        _c.label = 3;
                    case 3:
                        _metadata = _b;
                        injector.set(token_1.APPLICATION_METADATA, { provide: token_1.APPLICATION_METADATA, useFactory: function () { return (0, utility_1.cloneDeepPlain)(_metadata); } });
                        injector.set(token_1.APPLICATION_TOKEN, { provide: token_1.APPLICATION_TOKEN, useValue: injector.get(app) });
                        return [2 /*return*/, injector.get(token_1.APPLICATION_TOKEN)];
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
        (0, di_1.setInjectableDef)(app);
        this.runStart();
    };
    ApplicationContext.prototype.registerStart = function (runStart) {
        this.runStart = runStart;
    };
    ApplicationContext.prototype.makeApplicationDecorator = function () {
        var _this = this;
        return (0, di_1.makeDecorator)(APPLICATION, undefined, function (injectableType, metadata) { return _this.registerApp(injectableType, metadata); });
    };
    ApplicationContext.prototype.makeProvDecorator = function (name) {
        var _this = this;
        var typeFn = function (type, method, descriptor) {
            var meta = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                meta[_i - 3] = arguments[_i];
            }
            var _a = meta[0], token = _a === void 0 ? method : _a, _b = meta[1], options = _b === void 0 ? {} : _b;
            _this.addProvider(tslib_1.__assign(tslib_1.__assign({ provide: token }, options), { useFactory: function (target) { return descriptor.value.apply(target); }, deps: [type] }));
        };
        return (0, di_1.makeMethodDecorator)(name, undefined, typeFn);
    };
    ApplicationContext.prototype.makePropInput = function (name) {
        var transform = function (key) { return function (_meta, value) { return (0, lodash_1.get)(value, key); }; };
        return function (key) { return (0, di_1.Inject)(token_1.APPLICATION_METADATA, { metadataName: name, transform: transform(key) }); };
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
