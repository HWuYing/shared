import { Injector } from '@hwy-fm/di';
import { Subject } from 'rxjs';
import { RouteInfo } from './type-api';
export declare class CustomHistory {
    private injector;
    private router;
    private history;
    private _routeInfo?;
    private unListen;
    activeRoute: Subject<RouteInfo>;
    pushRoute: Subject<string>;
    cancelRoute: Subject<RouteInfo>;
    constructor(injector: Injector);
    private loadRouter;
    navigateTo(url: string): void;
    redirect(url: string): void;
    resolve(): Promise<void>;
    destroy(): void;
    get currentRouteInfo(): RouteInfo;
    private listener;
    private resolveIntercept;
    private createRouteInfo;
    private parsePath;
    private parse;
    private parseSearch;
}
