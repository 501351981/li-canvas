'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.saveMixin = saveMixin;

var _task = require('./task');

function saveMixin(LeeCanvas) {
    LeeCanvas.prototype.draw = function () {
        var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        (0, _task.runTask)(this, callback);
    };

    LeeCanvas.prototype.getImageData = function () {
        return this.canvas.toDataURL('image/png');
    };

    LeeCanvas.prototype.saveToPng = function () {
        var fileName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'lee-canvas';

        this.saveFileName = fileName + '.png';
        saveToImage(this, 'png');
    };

    LeeCanvas.prototype.saveToJpeg = function () {
        var fileName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'lee-canvas';

        this.saveFileName = fileName + '.jpeg';
        saveToImage(this, 'jpeg');
    };

    LeeCanvas.prototype.saveToGif = function () {
        var fileName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'lee-canvas';

        this.saveFileName = fileName + '.gif';
        saveToImage(this, 'gif');
    };
}

function saveToImage(LeeCanvas, type) {
    type = fixType(type);
    var strData = getDataURL(LeeCanvas, type);
    saveFile(LeeCanvas, strData);
}

function fixType(type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    type = type.match(/png|jpeg|gif/)[0];
    return 'image/' + type;
}

function getDataURL(LeeCanvas, type) {
    return LeeCanvas.canvas.toDataURL(type);
}

function saveFile(LeeCanvas, strData) {
    // document.location.href = strData;
    var a = document.createElement('a');
    a.href = strData;
    a.download = LeeCanvas.saveFileName;
    a.click();
}