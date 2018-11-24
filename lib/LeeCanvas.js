'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var setBackgroundColor = Symbol();
var getDataURL = Symbol();
var saveFile = Symbol();
var fixType = Symbol();
var saveToImage = Symbol();
var addTask = Symbol();
var runTask = Symbol();
var drawImage = Symbol();
var drawImageWithBorderRadius = Symbol();

var downloadMime = 'image/octet-stream';
var DRAW_IMAGE_TASK = 'DRAW_IMAGE_TASK';
var DRAW_TEXT_TASK = 'DRAW_TEXT_TASK';

var defaultParams = {
    backgroundColor: '#ffffff',
    fontStyle: {
        x: 0,
        y: 0,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: "PingFangSC-Regular,'Microsoft YaHei',SimSun,Arial,'Helvetica Neue',sans-serif",
        lineHeight: 20,
        color: 'black',
        marginBottom: 10
    }
};

function isArray(obj) {
    var array = [];
    return Object.prototype.toString.call(obj) == Object.prototype.toString.call(array);
}

function isObject(obj) {
    var object = {};
    return Object.prototype.toString.call(obj) == Object.prototype.toString.call(object);
}

function isString(str) {
    var string = 'a';
    return Object.prototype.toString.call(str) == Object.prototype.toString.call(string);
}

var Canvas = function () {
    function Canvas(canvas_id) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultParams,
            backgroundColor = _ref.backgroundColor,
            fontStyle = _ref.fontStyle;

        _classCallCheck(this, Canvas);

        this.canvas = document.getElementById(canvas_id);
        this.ctx = this.canvas.getContext("2d");
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;

        this.tasks = new Array();

        this.fontStyle = fontStyle;
        this.fontStartX = fontStyle.x;
        this.fontStartY = fontStyle.y;
        delete fontStyle.x;
        delete fontStyle.y;

        if (backgroundColor) {
            this[setBackgroundColor](backgroundColor);
        }
    }

    _createClass(Canvas, [{
        key: setBackgroundColor,
        value: function value(color) {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        }
    }, {
        key: getDataURL,
        value: function value(type) {
            return this.canvas.toDataURL(type);
        }
    }, {
        key: saveFile,
        value: function value(strData) {
            // document.location.href = strData;
            var a = document.createElement('a');
            a.href = strData;
            a.download = this.saveFileName;
            a.click();
        }
    }, {
        key: fixType,
        value: function value(type) {
            type = type.toLowerCase().replace(/jpg/i, 'jpeg');
            type = type.match(/png|jpeg|bmp|gif/)[0];
            return 'image/' + type;
        }
    }, {
        key: saveToImage,
        value: function value(type) {
            type = this[fixType](type);
            var strData = this[getDataURL](type);
            // this[saveFile](strData.replace(type,downloadMime))
            this[saveFile](strData);
        }
    }, {
        key: 'saveToPng',
        value: function saveToPng() {
            var fileName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'iCanvas';

            this.saveFileName = fileName + '.png';
            this[saveToImage]('png');
        }
    }, {
        key: 'saveToJpeg',
        value: function saveToJpeg() {
            var fileName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'iCanvas';

            this.saveFileName = fileName + '.jpeg';
            this[saveToImage]('jpeg');
        }
    }, {
        key: addTask,
        value: function value(type, params) {
            this.tasks.push({ type: type, params: params });
        }
    }, {
        key: 'addDrawImageTask',
        value: function addDrawImageTask(image) {
            var _this = this;

            if (isArray(image)) {
                image.forEach(function (img) {
                    _this[addTask](DRAW_IMAGE_TASK, img);
                });
            } else if (isObject(image)) {
                this[addTask](DRAW_IMAGE_TASK, image);
            } else {
                throw new Error("addDrawImageTask 参数只支持对象或数组");
            }
        }
    }, {
        key: 'addDrawTextTask',
        value: function addDrawTextTask(text) {
            var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            this[addTask](DRAW_TEXT_TASK, { text: text, style: style });
        }
    }, {
        key: runTask,
        value: function value(callback) {
            var _this2 = this;

            if (this.tasks.length == 0) {
                typeof callback == 'function' && callback();
                return;
            }
            var task = this.tasks.shift();
            if (task) {
                switch (task.type) {
                    case DRAW_IMAGE_TASK:
                        this[drawImage](task.params, function () {
                            _this2[runTask](callback);
                        });
                        break;
                    case DRAW_TEXT_TASK:
                        this.drawTexts(task.params);
                        this[runTask](callback);
                        break;
                    default:
                        break;
                }
            }
        }
    }, {
        key: 'draw',
        value: function draw() {
            var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            this[runTask](callback);
        }
    }, {
        key: drawImage,
        value: function value(image, callback) {
            var _this3 = this;

            var img = new Image();
            img.setAttribute("crossOrigin", 'Anonymous');
            img.src = image.src;
            img.onload = function () {
                if (image.hasOwnProperty('borderRadius')) {
                    _this3[drawImageWithBorderRadius](img, image.x, image.y, image.width, image.height, image.borderRadius);
                } else {
                    _this3.ctx.drawImage(img, image.x, image.y, image.width, image.height);
                }

                typeof callback == 'function' && callback.call(_this3);
            };
        }
    }, {
        key: drawImageWithBorderRadius,
        value: function value(img, x, y, w, h, borderRadius) {
            var r = Math.min(borderRadius, w / 2, h / 2);
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.moveTo(x, y + r);
            this.ctx.arcTo(x, y, x + r, y, r);
            this.ctx.lineTo(x + w - r, y);
            this.ctx.arcTo(x + w, y, x + w, y + r, r);
            this.ctx.lineTo(x + w, y + h - r);
            this.ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
            this.ctx.lineTo(x + r, y + h);
            this.ctx.arcTo(x, y + h, x, y + h - r, r);
            this.ctx.lineTo(x, y + r);
            this.ctx.clip();
            this.ctx.drawImage(img, x, y, w, h);
            this.ctx.restore();
        }
    }, {
        key: 'getImageData',
        value: function getImageData() {
            return this.canvas.toDataURL('image/png');
        }
    }, {
        key: 'drawTexts',
        value: function drawTexts(_ref2) {
            var _this4 = this;

            var text = _ref2.text,
                style = _ref2.style;

            if (isString(text)) {
                var textStyle = Object.assign({}, this.fontStyle, style);
                this.drawText(text, textStyle);
            } else if (isArray(text)) {
                text.forEach(function (t, index) {
                    if (isString(t)) {
                        var _textStyle = Object.assign({}, _this4.fontStyle, style);
                        _this4.drawText(t, _textStyle);
                        if (index == 0) {
                            delete style.x;
                            delete style.y;
                        }
                    } else if (isObject(t)) {
                        var _textStyle2 = Object.assign({}, _this4.fontStyle, style, t);
                        _this4.drawText(t.text, _textStyle2);
                        if (index == 0) {
                            delete style.x;
                            delete style.y;
                        }
                    }
                });
            } else if (isObject(text)) {
                var _textStyle3 = Object.assign({}, this.fontStyle, style, text);
                this.drawText(text.text, _textStyle3);
            }
        }
    }, {
        key: 'drawText',
        value: function drawText(text, style) {
            console.log(text);
            console.log(style);
            if (style.hasOwnProperty('x')) {
                this.fontStartX = style.x;
            }
            if (style.hasOwnProperty('y')) {
                this.fontStartY = style.y;
            }
            var rowWidth = void 0;
            if (style.hasOwnProperty('width')) {
                rowWidth = style.width;
            } else {
                rowWidth = this.canvasWidth - this.fontStartX;
            }

            this.ctx.font = [style.fontStyle, style.fontWeight, style.fontSize + 'px', style.fontFamily].join(" ");
            this.ctx.fillStyle = style.color;
            this.ctx.textBaseline = "top";

            var temp = "";
            var row = [];
            for (var i = 0; i < text.length; i++) {
                temp += text[i];
                if (this.ctx.measureText(temp).width >= rowWidth || i == text.length - 1) {
                    row.push(temp);
                    temp = "";
                }
            }

            for (var j = 0; j < row.length; j++) {
                this.ctx.fillText(row[j], Math.floor(this.fontStartX), Math.floor(this.fontStartY));
                if (j < row.length - 1) {
                    this.fontStartY += style.lineHeight;
                } else {
                    this.fontStartY += style.fontSize + style.marginBottom;
                }
            }
        }
    }]);

    return Canvas;
}();

exports.default = Canvas;
module.exports = exports['default'];