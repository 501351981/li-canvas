"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _init = require("./init");

var _drawImage = require("./drawImage");

var _drawText = require("./drawText");

var _save = require("./save");

function LeeCanvas(canvas_id, options) {
    if (!(this instanceof LeeCanvas)) {
        throw new Error("LeeCanvas 必须通过new关键词进行实例化");
    }

    this._init(canvas_id, options);
}

(0, _init.initMixin)(LeeCanvas);
(0, _drawImage.drawImageMixin)(LeeCanvas);
(0, _drawText.drawTextMixin)(LeeCanvas);
(0, _save.saveMixin)(LeeCanvas);

exports.default = LeeCanvas;
module.exports = exports["default"];