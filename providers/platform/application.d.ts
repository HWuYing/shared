import { InjectorToken, Provider, Type } from '@fm/di';
export declare const PLATFORM_SCOPE = "platform";
export declare const APPLICATION_TOKEN: InjectorToken;
export declare const APPLICATION_METDATA: InjectorToken;
export declare class ApplicationContext {
    private _platformProviders;
    private _providers;
    private runStart;
    constructor(_platformProviders?: Provider[], _providers?: Provider[]);
    private registryApplication;
    regeditStart(runStart: () => any): void;
    makeApplicationDecorator(): (this: unknown, ...args: any[]) => (cls: Type<any>) => any;
    makeProvDecorator(name: string): (this: unknown, ...args: any[]) => any;
    get platformProviders(): Provider[];
    get providers(): Provider[];
}
