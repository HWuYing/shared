import { Injector, INJECTOR_SCOPE, InjectorToken } from '@fm/di';
import { PLATFORM } from '../../token';
export const PlatformOptions = InjectorToken.get('PlatformOptions');
export function createPlafformFactory(createPlatform, ...providers) {
    return (...extraProviders) => {
        const injectorProviders = providers.concat(extraProviders);
        if (!createPlatform) {
            injectorProviders.push({ provide: INJECTOR_SCOPE, useValue: 'platform' });
            return Injector.create(injectorProviders).get(PLATFORM);
        }
        return createPlatform(injectorProviders);
    };
}
