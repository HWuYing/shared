import { InjectorToken, Provider, TokenKey, Type } from '@fm/di';
type MetadataProps = {
    [key: string]: any;
};
export declare const PLATFORM_SCOPE = "platform";
export declare const APPLICATION_TOKEN: InjectorToken;
export declare const APPLICATION_METADATA: InjectorToken;
export interface MetadataInfo {
    load(): Promise<MetadataProps> | MetadataProps;
}
type ProvDecorator = (token: TokenKey, provider?: {
    providedIn?: string;
    [key: string]: any;
}) => any;
type ApplicationDecorator = <M extends MetadataInfo>(metadata?: Type<M> | MetadataProps) => <T = any>(cls: Type<T>) => Type<T>;
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
    private getApp;
    private registerApp;
    registerStart(runStart: () => any): void;
    makeApplicationDecorator(): ApplicationDecorator;
    makeProvDecorator(name: string): ProvDecorator;
    makePropInput(name: string): (key: string) => any;
    get platformProviders(): Provider[];
    get providers(): Provider[];
}
export {};
