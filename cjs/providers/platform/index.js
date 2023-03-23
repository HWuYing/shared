"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlafformFactory = exports.PLATFORM_SCOPE = exports.ApplicationContext = exports.APPLICATION_TOKEN = exports.APPLICATION_METDATA = exports.PlatformOptions = void 0;
var di_1 = require("@fm/di");
var token_1 = require("../../token");
exports.PlatformOptions = di_1.InjectorToken.get('PlatformOptions');
var application_1 = require("./application");
Object.defineProperty(exports, "APPLICATION_METDATA", { enumerable: true, get: function () { return application_1.APPLICATION_METDATA; } });
Object.defineProperty(exports, "APPLICATION_TOKEN", { enumerable: true, get: function () { return application_1.APPLICATION_TOKEN; } });
Object.defineProperty(exports, "ApplicationContext", { enumerable: true, get: function () { return application_1.ApplicationContext; } });
Object.defineProperty(exports, "PLATFORM_SCOPE", { enumerable: true, get: function () { return application_1.PLATFORM_SCOPE; } });
function createPlafformFactory(createPlatform) {
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
exports.createPlafformFactory = createPlafformFactory;
