import { Injector, INJECTOR_SCOPE, InjectorToken } from '@fm/di';
import { PLATFORM } from '../../token';
export var PlatformOptions = InjectorToken.get('PlatformOptions');
export function createPlafformFactory(createPlatform) {
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
            injectorProviders.push({ provide: INJECTOR_SCOPE, useValue: 'platform' });
            return Injector.create(injectorProviders).get(PLATFORM);
        }
        return createPlatform(injectorProviders);
    };
}
