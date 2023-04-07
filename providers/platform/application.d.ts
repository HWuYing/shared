import { InjectorToken, Provider, TokenKey, Type } from '@fm/di';
export declare const PLATFORM_SCOPE = "platform";
export declare const APPLICATION_TOKEN: InjectorToken;
export declare const APPLICATION_METADATA: InjectorToken;
type ProvDecorator = (token: TokenKey, provider?: {
    providedIn?: string;
    [key: string]: any;
}) => any;
export declare class ApplicationContext {
    private _platformProviders;
    private _providers;
    private runStart;
    private dynamicInjectors;
    constructor(_platformProviders?: Provider[], _providers?: Provider[]);
    private addDefaultProvider;
    private addInjector;
    private deleteInjector;
    private setDynamicProvider;
    private addProvider;
    private addPlatformProvider;
    private registerApp;
    registerStart(runStart: () => any): void;
    makeApplicationDecorator(): (this: unknown, ...args: any[]) => (cls: Type<any>) => any;
    makeProvDecorator(name: string): ProvDecorator;
    makePropInput(name: string): (key: string) => any;
    get platformProviders(): Provider[];
    get providers(): Provider[];
}
export {};
