import { Observable } from 'rxjs';
import { HttpHandler } from './http-handler';
import { HttpInterceptor } from './type-api';
export declare class HttpInterceptHandler implements HttpHandler {
    private next;
    private interceptor;
    constructor(next: HttpHandler, interceptor: HttpInterceptor);
    handle(req: RequestInfo, params: RequestInit | undefined): Observable<Response>;
}
