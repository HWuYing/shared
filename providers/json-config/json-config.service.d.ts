import { Injector } from '@fm/di';
import { Observable } from 'rxjs';
export declare abstract class JsonConfigService {
    protected injector: Injector;
    constructor(injector: Injector);
    abstract getJsonConfig(url: string): Observable<object>;
}
