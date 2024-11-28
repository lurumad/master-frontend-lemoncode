var head = function (array) {
    var first = array[0];
    return first;
};
var tail = function (array) {
    var rest = array.slice(1);
    return rest;
};
var init = function (array) {
    return array.slice(0, -1);
};
var last = function (array) {
    return array.slice(-1);
};
module.exports = {
    head: head,
    tail: tail,
    init: init,
    last: last,
};
