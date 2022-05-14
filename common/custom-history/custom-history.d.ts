import { LocatorStorage } from '@fm/di';
import { Subject } from 'rxjs';
import { AbstractRouterIntercept } from './router-intercept.abstract';
import { RouteInfo } from './type-api';
export declare class SharedHistory {
    private ls;
    private intercept;
    private router;
    private history;
    private _routeInfo?;
    activeRoute: Subject<RouteInfo>;
    constructor(ls: LocatorStorage, intercept: AbstractRouterIntercept);
    navigateTo(url: string): void;
    resolve(): Promise<void>;
    get currentRouteInfo(): RouteInfo;
    private listener;
    private resolveIntercept;
    private parse;
}
