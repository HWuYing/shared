"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlafformFactory = exports.PlatformOptions = void 0;
var di_1 = require("@fm/di");
var token_1 = require("../../token");
exports.PlatformOptions = di_1.InjectorToken.get('PlatformOptions');
function createPlafformFactory(createPlatform) {
    var providers = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        providers[_i - 1] = arguments[_i];
    }
    return function () {
        var extraProviders = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extraProviders[_i] = arguments[_i];
        }
        var injectorProviders = providers.concat(extraProviders);
        if (!createPlatform) {
            injectorProviders.push({ provide: di_1.INJECTOR_SCOPE, useValue: 'platform' });
            return di_1.Injector.create(injectorProviders).get(token_1.PLATFORM);
        }
        return createPlatform(injectorProviders);
    };
}
exports.createPlafformFactory = createPlafformFactory;
