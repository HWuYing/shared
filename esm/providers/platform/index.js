import { Injector, INJECTOR_SCOPE, InjectorToken } from '@fm/di';
import { PLATFORM } from '../../token';
import { PLATFORM_SCOPE } from './application';
export const PlatformOptions = InjectorToken.get('PlatformOptions');
export { APPLICATION_METDATA, APPLICATION_TOKEN, ApplicationContext, PLATFORM_SCOPE } from './application';
export function createPlafformFactory(createPlatform, ...providers) {
    return (appContext, ...extraProviders) => {
        const injectorProviders = providers.concat(extraProviders);
        if (!createPlatform) {
            injectorProviders.push(appContext.platformProviders, { provide: INJECTOR_SCOPE, useValue: PLATFORM_SCOPE });
            return Injector.create(injectorProviders).get(PLATFORM);
        }
        return createPlatform(appContext, injectorProviders);
    };
}
