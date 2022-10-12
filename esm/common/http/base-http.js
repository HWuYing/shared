import { from, mergeMap } from 'rxjs';
function factoryRequest(fetch, method) {
    return (url, params) => from(fetch(url, Object.assign({ method }, params)));
}
function createProxy({ fetch }) {
    const methods = ['get'];
    return methods.reduce((proxy, method) => (Object.assign(Object.assign({}, proxy), { [method]: factoryRequest(fetch, method) })), {});
}
export class BaseHttp {
    constructor(fetch) {
        this.proxy = createProxy({ fetch });
    }
    get(req, params) {
        return this.proxy.get(req, params).pipe(mergeMap((res) => res.json()));
    }
    getText(req, params) {
        return this.proxy.get(req, params).pipe(mergeMap((res) => res.text()));
    }
}
