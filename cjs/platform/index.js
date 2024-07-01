"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLATFORM_SCOPE = exports.ApplicationContext = void 0;
exports.createPlatformFactory = createPlatformFactory;
var di_1 = require("@hwy-fm/di");
var token_1 = require("../token");
var application_1 = require("./application");
Object.defineProperty(exports, "ApplicationContext", { enumerable: true, get: function () { return application_1.ApplicationContext; } });
Object.defineProperty(exports, "PLATFORM_SCOPE", { enumerable: true, get: function () { return application_1.PLATFORM_SCOPE; } });
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
