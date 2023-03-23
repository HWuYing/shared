import { cloneDeepWith, isPlainObject } from 'lodash';
export function cloneDeepPlain(value) {
    return cloneDeepWith(value, (obj) => {
        if (Object.prototype.toString.call(obj) === '[object Object]' && !isPlainObject(obj))
            return obj;
    });
}
