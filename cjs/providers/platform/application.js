"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationContext = exports.APPLICATION_METDATA = exports.APPLICATION_TOKEN = exports.PLATFORM_SCOPE = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@fm/di");
var APPLICATION = 'Application';
exports.PLATFORM_SCOPE = 'platform';
exports.APPLICATION_TOKEN = di_1.InjectorToken.get('APPLICATION_TOKEN');
exports.APPLICATION_METDATA = di_1.InjectorToken.get('APPLICATION_METDATA');
var ApplicationContext = /** @class */ (function () {
    function ApplicationContext(_platformProviders, _providers) {
        if (_platformProviders === void 0) { _platformProviders = []; }
        if (_providers === void 0) { _providers = []; }
        this._platformProviders = _platformProviders;
        this._providers = _providers;
    }
    ApplicationContext.prototype.registryApplication = function (app, metadata) {
        if (metadata === void 0) { metadata = {}; }
        this._providers.push({ provide: exports.APPLICATION_TOKEN, useExisting: app });
        this._platformProviders.push({ provide: exports.APPLICATION_METDATA, useValue: metadata });
        (0, di_1.setInjectableDef)(app, { token: app, providedIn: 'root', factory: (0, di_1.convertToFactory)(app) });
        this.runStart();
    };
    ApplicationContext.prototype.regeditStart = function (runStart) {
        this.runStart = runStart;
    };
    ApplicationContext.prototype.makeApplicationDecorator = function () {
        var _this = this;
        // eslint-disable-next-line max-len
        return (0, di_1.makeDecorator)(APPLICATION, undefined, function (injectableType, metadata) { return _this.registryApplication(injectableType, metadata); });
    };
    ApplicationContext.prototype.makeProvDecorator = function (name) {
        var _this = this;
        // eslint-disable-next-line max-params
        var typeFn = function (type, method, descriptor, token, options) {
            if (options === void 0) { options = {}; }
            var providedIn = options.providedIn, others = tslib_1.__rest(options, ["providedIn"]);
            var useFactory = function (target) { return descriptor.value.apply(target); };
            var providers = providedIn === exports.PLATFORM_SCOPE ? _this._platformProviders : _this._providers;
            providers.push(tslib_1.__assign(tslib_1.__assign({ provide: token || method }, others), { useFactory: useFactory, deps: [type] }));
        };
        return (0, di_1.makeMethodDecorator)(name, undefined, typeFn);
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
