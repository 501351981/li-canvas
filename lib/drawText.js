"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.drawTextMixin = drawTextMixin;
exports.drawTexts = drawTexts;

var _utils = require("./utils");

var _task = require("./task");

var _constant = require("./constant");

function drawTextMixin(LiCanvas) {
    LiCanvas.prototype.addDrawTextTask = function (text) {
        var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        (0, _task.addTask)(this, _constant.DRAW_TEXT_TASK, { text: text, style: style });
    };
}

function drawTexts(LiCanvas, _ref) {
    var text = _ref.text,
        style = _ref.style;

    if ((0, _utils.isString)(text)) {
        var textStyle = Object.assign({}, LiCanvas.fontStyle, style);
        drawText(LiCanvas, text, textStyle);
    } else if ((0, _utils.isArray)(text)) {
        text.forEach(function (t, index) {
            if ((0, _utils.isString)(t)) {
                var _textStyle = Object.assign({}, LiCanvas.fontStyle, style);
                drawText(LiCanvas, t, _textStyle);
                if (index == 0) {
                    delete style.x;
                    delete style.y;
                }
            } else if ((0, _utils.isObject)(t)) {
                var _textStyle2 = Object.assign({}, LiCanvas.fontStyle, style, t);
                drawText(LiCanvas, t.text, _textStyle2);
                if (index == 0) {
                    delete style.x;
                    delete style.y;
                }
            }
        });
    } else if ((0, _utils.isObject)(text)) {
        var _textStyle3 = Object.assign({}, LiCanvas.fontStyle, style, text);
        drawText(LiCanvas, text.text, _textStyle3);
    }
}
function drawText(LiCanvas, text, style) {

    if (style.hasOwnProperty('x')) {
        LiCanvas.fontStartX = style.x;
    }
    if (style.hasOwnProperty('y')) {
        LiCanvas.fontStartY = style.y;
    }
    var rowWidth = void 0;

    if (style.hasOwnProperty('width')) {
        rowWidth = style.width;
    } else {
        rowWidth = style.textDirection == 'horizontal' ? LiCanvas.canvasWidth - LiCanvas.fontStartX : LiCanvas.canvasHeight - LiCanvas.fontStartY;
    }

    LiCanvas.ctx.font = [style.fontStyle, style.fontWeight, style.fontSize + 'px', style.fontFamily].join(" ");
    LiCanvas.ctx.fillStyle = style.color;
    LiCanvas.ctx.textBaseline = "top";

    if (style.textDirection == 'horizontal') {
        drawTextHorizontal(LiCanvas, text, rowWidth, style);
    } else {
        drawTextVertical(LiCanvas, text, rowWidth, style);
    }
}

function drawTextHorizontal(LiCanvas, text, rowWidth, style) {
    var temp = "";
    var row = [];
    for (var i = 0; i < text.length; i++) {
        temp += text[i];
        if (LiCanvas.ctx.measureText(temp).width >= rowWidth || i == text.length - 1) {
            row.push(temp);
            temp = "";
        }
    }

    for (var j = 0; j < row.length; j++) {
        LiCanvas.ctx.fillText(row[j], Math.floor(LiCanvas.fontStartX), Math.floor(LiCanvas.fontStartY));
        if (j < row.length - 1) {
            LiCanvas.fontStartY += style.lineHeight;
        } else {
            LiCanvas.fontStartY += style.fontSize + style.marginBottom;
        }
    }
}

function drawTextVertical(LiCanvas, text, rowWidth, style) {
    var temp = "";
    var row = [];
    for (var i = 0; i < text.length; i++) {
        temp += text[i];
        if (LiCanvas.ctx.measureText(temp).width >= rowWidth || i == text.length - 1) {
            row.push(temp);
            temp = "";
        }
    }

    for (var j = 0; j < row.length; j++) {
        var t = row[j];
        var startY = LiCanvas.fontStartY;
        for (var k = 0; k < t.length; k++) {
            LiCanvas.ctx.fillText(t[k], Math.floor(LiCanvas.fontStartX), Math.floor(LiCanvas.fontStartY));
            LiCanvas.fontStartY += style.fontSize;
        }
        LiCanvas.fontStartY = startY;

        if (j < row.length - 1) {
            if (style.rowDirection == 'ltr') {
                LiCanvas.fontStartX += style.lineHeight;
            } else {
                LiCanvas.fontStartX -= style.lineHeight;
            }
        } else {
            if (style.rowDirection == 'ltr') {
                LiCanvas.fontStartX += style.fontSize + style.marginBottom;
            } else {
                LiCanvas.fontStartX -= style.fontSize + style.marginBottom;
            }
        }
    }
}