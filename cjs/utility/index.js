"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneDeepPlain = cloneDeepPlain;
var lodash_1 = require("lodash");
function cloneDeepPlain(value) {
    return (0, lodash_1.cloneDeepWith)(value, function (obj) {
        if (Object.prototype.toString.call(obj) === '[object Object]' && !(0, lodash_1.isPlainObject)(obj))
            return obj;
    });
}
