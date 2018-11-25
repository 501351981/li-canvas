'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var isArray = exports.isArray = function isArray(obj) {
    var array = [];
    return Object.prototype.toString.call(obj) == Object.prototype.toString.call(array);
};

var isObject = exports.isObject = function isObject(obj) {
    var object = {};
    return Object.prototype.toString.call(obj) == Object.prototype.toString.call(object);
};

var isString = exports.isString = function isString(str) {
    var string = 'a';
    return Object.prototype.toString.call(str) == Object.prototype.toString.call(string);
};