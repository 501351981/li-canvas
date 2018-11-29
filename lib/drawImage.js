"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.drawImageMixin = drawImageMixin;
exports.drawImage = drawImage;
exports.setBackgroundColor = setBackgroundColor;
exports.drawBackgroundImage = drawBackgroundImage;

var _utils = require("./utils");

var _task = require("./task");

var _constant = require("./constant");

function drawImageMixin(LiCanvas) {
    LiCanvas.prototype.addDrawImageTask = function (image) {
        var _this = this;

        if ((0, _utils.isArray)(image)) {
            image.forEach(function (img) {
                (0, _task.addTask)(_this, _constant.DRAW_IMAGE_TASK, img);
            });
        } else if ((0, _utils.isObject)(image)) {
            (0, _task.addTask)(this, _constant.DRAW_IMAGE_TASK, image);
        } else {
            throw new Error("addDrawImageTask 参数只支持对象或数组");
        }
    };

    LiCanvas.prototype.addSetBackgroundTask = function (_ref) {
        var _ref$backgroundColor = _ref.backgroundColor,
            backgroundColor = _ref$backgroundColor === undefined ? '' : _ref$backgroundColor,
            _ref$backgroundImage = _ref.backgroundImage,
            backgroundImage = _ref$backgroundImage === undefined ? '' : _ref$backgroundImage,
            _ref$backgroundRepeat = _ref.backgroundRepeat,
            backgroundRepeat = _ref$backgroundRepeat === undefined ? 'repeat' : _ref$backgroundRepeat;

        if (backgroundColor) {
            (0, _task.addTask)(this, _constant.SET_BACKGROUND_COLOR, { backgroundColor: backgroundColor });
        }

        if (backgroundImage) {
            (0, _task.addTask)(this, _constant.DRAW_BACKGROUND_IMAGE, {
                backgroundImage: backgroundImage,
                backgroundRepeat: backgroundRepeat
            });
        }
    };
}

function drawImage(LiCanvas, image, callback) {
    var img = new Image();
    img.setAttribute("crossOrigin", 'Anonymous');
    img.src = image.src;
    img.onload = function () {
        if (image.hasOwnProperty('borderRadius')) {
            drawImageWithBorderRadius(LiCanvas, img, image.x, image.y, image.width, image.height, image.borderRadius);
        } else {
            LiCanvas.ctx.drawImage(img, image.x, image.y, image.width, image.height);
        }

        typeof callback == 'function' && callback.call(LiCanvas);
    };
}

function drawImageWithBorderRadius(LiCanvas, img, x, y, w, h, borderRadius) {
    var r = Math.min(borderRadius, w / 2, h / 2);
    LiCanvas.ctx.save();
    LiCanvas.ctx.beginPath();
    LiCanvas.ctx.moveTo(x, y + r);
    LiCanvas.ctx.arcTo(x, y, x + r, y, r);
    LiCanvas.ctx.lineTo(x + w - r, y);
    LiCanvas.ctx.arcTo(x + w, y, x + w, y + r, r);
    LiCanvas.ctx.lineTo(x + w, y + h - r);
    LiCanvas.ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    LiCanvas.ctx.lineTo(x + r, y + h);
    LiCanvas.ctx.arcTo(x, y + h, x, y + h - r, r);
    LiCanvas.ctx.lineTo(x, y + r);
    LiCanvas.ctx.clip();
    LiCanvas.ctx.drawImage(img, x, y, w, h);
    LiCanvas.ctx.restore();
}

function setBackgroundColor(LiCanvas, _ref2, callback) {
    var backgroundColor = _ref2.backgroundColor;

    LiCanvas.ctx.fillStyle = backgroundColor;
    LiCanvas.ctx.fillRect(0, 0, LiCanvas.canvasWidth, LiCanvas.canvasHeight);

    typeof callback == 'function' && callback.call(LiCanvas);
}

function drawBackgroundImage(LiCanvas, _ref3, callback) {
    var backgroundImage = _ref3.backgroundImage,
        backgroundRepeat = _ref3.backgroundRepeat;

    var img = new Image();
    img.setAttribute("crossOrigin", 'Anonymous');
    img.src = backgroundImage;
    img.onload = function () {
        var bg = LiCanvas.ctx.createPattern(img, backgroundRepeat);
        LiCanvas.ctx.fillStyle = bg;
        LiCanvas.ctx.fillRect(0, 0, LiCanvas.canvasWidth, LiCanvas.canvasHeight);

        typeof callback == 'function' && callback.call(LiCanvas);
    };
}