import { Injector, InjectorToken } from '@fm/di';
import { PLATFORM } from '../../token';
export const PlatformOptions = InjectorToken.get('PlatformOptions');
export { APPLICATION_METADATA, APPLICATION_TOKEN, ApplicationContext, PLATFORM_SCOPE } from './application';
export function createPlatformFactory(createPlatform, ...providers) {
    return (appContext, ...extraProviders) => {
        const injectorProviders = providers.concat(extraProviders);
        if (!createPlatform) {
            injectorProviders.push(appContext.platformProviders);
            return Injector.create(injectorProviders).get(PLATFORM);
        }
        return createPlatform(appContext, injectorProviders);
    };
}
