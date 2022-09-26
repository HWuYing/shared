import { Injector } from '@fm/di';
import { Observable } from 'rxjs';
import { AppContextService } from '../app-context';
export declare abstract class JsonConfigService {
    protected injector: Injector;
    protected appContext: AppContextService;
    protected cacheConfig: Map<string, Observable<object>>;
    protected abstract getServerFetchData(url: string): Observable<object>;
    constructor(injector: Injector);
    getJsonConfig(url: string): Observable<object>;
}
