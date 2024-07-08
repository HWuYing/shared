"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = exports.runtimeInjector = exports.makeApplication = exports.Prov = exports.ApplicationPlugin = exports.Register = exports.createRegisterLoader = exports.registerProvider = void 0;
var tslib_1 = require("tslib");
/* eslint-disable max-len */
var di_1 = require("@hwy-fm/di");
var lodash_1 = require("lodash");
var token_1 = require("../token");
var _1 = require(".");
var queue = [];
var transform = function (key) { return function (_meta, value, type, prop) { return (0, lodash_1.get)(value, key, type && type[prop]); }; };
var registerProvider = function (provider) { return queue.push(function (ctx) { return ctx.addProvider(provider); }); };
exports.registerProvider = registerProvider;
var createRegisterLoader = function (token) {
    var list;
    return function (loader) {
        if (!list)
            (0, exports.registerProvider)({ provide: token, useValue: list = [] });
        list.push(loader);
    };
};
exports.createRegisterLoader = createRegisterLoader;
exports.Register = (0, di_1.makeDecorator)('Register', exports.registerProvider);
exports.ApplicationPlugin = (0, di_1.makeDecorator)('ApplicationPlugin', undefined, function (plugin) {
    (0, exports.registerProvider)({ provide: token_1.APPLICATION_PLUGIN, multi: true, useExisting: (0, di_1.setInjectableDef)(plugin) });
});
exports.Prov = (0, di_1.makeMethodDecorator)('ProvDecorator', undefined, function (type, method, descriptor) {
    var meta = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        meta[_i - 3] = arguments[_i];
    }
    var _a = meta[0], token = _a === void 0 ? method : _a, _b = meta[1], _c = _b === void 0 ? {} : _b, _d = _c.deps, deps = _d === void 0 ? [] : _d, options = tslib_1.__rest(_c, ["deps"]);
    var useFactory = function (target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return descriptor.value.apply(target, args);
    };
    (0, exports.registerProvider)(tslib_1.__assign(tslib_1.__assign({ provide: token }, options), { useFactory: useFactory, deps: tslib_1.__spreadArray([type], deps, true) }));
});
var makeApplication = function (handler) {
    function typeFn(type, metadata) {
        var applicationContext = new _1.ApplicationContext();
        queue.forEach(function (fn) { return fn(applicationContext); });
        applicationContext.registerApp((0, di_1.setInjectableDef)(type), metadata);
        handler(applicationContext);
    }
    return (0, di_1.makeDecorator)('Application', function (metadata) { return ({ metadata: metadata }); }, typeFn);
};
exports.makeApplication = makeApplication;
exports.runtimeInjector = (0, exports.createRegisterLoader)(token_1.RUNTIME_INJECTOR);
var Input = function (key) { return (0, di_1.Inject)(token_1.APPLICATION_METADATA, { metadataName: 'InputPropDecorator', transform: transform(key) }); };
exports.Input = Input;
