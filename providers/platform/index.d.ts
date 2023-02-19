import { InjectorToken, Provider } from '@fm/di';
export declare const PlatformOptions: InjectorToken;
export declare function createPlafformFactory<T>(createPlatform: ((providers: Provider[]) => T) | null, ...providers: Provider[]): (...extraProviders: Provider[]) => T;
