import { Observable } from "rxjs";
import { HttpHandler } from "./http-handler";
export declare type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;
export interface HttpInterceptor {
    intercept(req: RequestInfo, params: RequestInit | undefined, next: HttpHandler): Observable<Response>;
}
