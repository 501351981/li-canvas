"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _init = require("./init");

var _drawImage = require("./drawImage");

var _drawText = require("./drawText");

var _save = require("./save");

function LiCanvas(canvas_id) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!(this instanceof LiCanvas)) {
        throw new Error("LiCanvas 必须通过new关键词进行实例化");
    }

    this._init(canvas_id, options);
}

(0, _init.initMixin)(LiCanvas);
(0, _drawImage.drawImageMixin)(LiCanvas);
(0, _drawText.drawTextMixin)(LiCanvas);
(0, _save.saveMixin)(LiCanvas);

exports.default = LiCanvas;
module.exports = exports["default"];