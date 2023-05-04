"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlatformFactory = void 0;
var di_1 = require("@fm/di");
var token_1 = require("../token");
function createPlatformFactory(createPlatform) {
    var providers = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        providers[_i - 1] = arguments[_i];
    }
    return function (appContext) {
        var extraProviders = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            extraProviders[_i - 1] = arguments[_i];
        }
        var injectorProviders = providers.concat(extraProviders);
        if (!createPlatform) {
            injectorProviders.push(appContext.platformProviders);
            return di_1.Injector.create(injectorProviders).get(token_1.PLATFORM);
        }
        return createPlatform(appContext, injectorProviders);
    };
}
exports.createPlatformFactory = createPlatformFactory;
