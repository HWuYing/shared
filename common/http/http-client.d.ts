import { Observable } from 'rxjs';
import { HttpHandler } from "./http-handler";
export declare class HttpClient {
    private handler;
    constructor(handler: HttpHandler);
    request(method: string, req: RequestInfo | string, params?: RequestInit): Observable<Response>;
    get<T = any>(req: RequestInfo | string, params?: RequestInit): Observable<T>;
    getText(req: RequestInfo | string, params?: RequestInit): Observable<string>;
    post(req: RequestInfo | string, params?: RequestInit): Observable<string>;
    put(req: RequestInfo | string, params?: RequestInit): Observable<string>;
    delete(req: RequestInfo | string, params?: RequestInit): Observable<string>;
}
