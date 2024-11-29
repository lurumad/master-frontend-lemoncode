var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var clone = function (source) {
    return JSON.parse(JSON.stringify(source));
};
var merge = function (source, target) {
    return __assign(__assign({}, target), source);
};
module.exports = {
    clone: clone,
    merge: merge,
};