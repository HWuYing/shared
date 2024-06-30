import { Injector } from '@fm/di';
import { PLATFORM } from '../token';
export { ApplicationContext, PLATFORM_SCOPE } from './application';
export function createPlatformFactory(createPlatform) {
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
            return Injector.create(injectorProviders).get(PLATFORM);
        }
        return createPlatform(appContext, injectorProviders);
    };
}
