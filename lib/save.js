'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.saveMixin = saveMixin;

var _task = require('./task');

function saveMixin(LiCanvas) {
    LiCanvas.prototype.draw = function () {
        var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        (0, _task.runTask)(this, callback);
    };

    LiCanvas.prototype.getImageData = function () {
        return this.canvas.toDataURL('image/png');
    };

    LiCanvas.prototype.saveToPng = function () {
        var fileName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'lee-canvas';

        this.saveFileName = fileName + '.png';
        saveToImage(this, 'png');
    };

    LiCanvas.prototype.saveToJpeg = function () {
        var fileName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'lee-canvas';

        this.saveFileName = fileName + '.jpeg';
        saveToImage(this, 'jpeg');
    };

    LiCanvas.prototype.saveToGif = function () {
        var fileName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'lee-canvas';

        this.saveFileName = fileName + '.gif';
        saveToImage(this, 'gif');
    };
}

function saveToImage(LiCanvas, type) {
    type = fixType(type);
    var strData = getDataURL(LiCanvas, type);
    saveFile(LiCanvas, strData);
}

function fixType(type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    type = type.match(/png|jpeg|gif/)[0];
    return 'image/' + type;
}

function getDataURL(LiCanvas, type) {
    return LiCanvas.canvas.toDataURL(type);
}

function saveFile(LiCanvas, strData) {
    // document.location.href = strData;
    var a = document.createElement('a');
    a.href = strData;
    a.download = LiCanvas.saveFileName;
    a.click();
}