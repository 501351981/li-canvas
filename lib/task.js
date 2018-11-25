"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addTask = addTask;
exports.runTask = runTask;

var _constant = require("./constant");

var _drawImage = require("./drawImage");

var _drawText = require("./drawText");

function addTask(LiCanvas, type, params) {
    LiCanvas.tasks.push({ type: type, params: params });
}

function runTask(LiCanvas, callback) {
    if (LiCanvas.tasks.length == 0) {
        typeof callback == 'function' && callback();
        return;
    }
    var task = LiCanvas.tasks.shift();
    if (task) {
        switch (task.type) {
            case _constant.DRAW_IMAGE_TASK:
                (0, _drawImage.drawImage)(LiCanvas, task.params, function () {
                    runTask(LiCanvas, callback);
                });
                break;
            case _constant.DRAW_TEXT_TASK:
                (0, _drawText.drawTexts)(LiCanvas, task.params);
                runTask(LiCanvas, callback);
                break;
            default:
                break;
        }
    }
}