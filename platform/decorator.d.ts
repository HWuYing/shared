import { Provider, TokenKey, Type } from '@fm/di';
import type { ApplicationContext } from './application';
export declare const registerProvider: (provider: Provider) => number;
export declare const ApplicationPlugin: () => <TFunction extends (new (...args: any[]) => any) & Type<any>>(target: TFunction) => TFunction;
export declare const Prov: (args_0: TokenKey, args_1?: {
    [key: string]: any;
    providedIn?: string;
}) => MethodDecorator;
export declare const Input: (key: string) => any;
export declare const execute: (applicationContext: ApplicationContext) => void;
