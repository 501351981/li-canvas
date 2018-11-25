"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addTask = addTask;
exports.runTask = runTask;

var _constant = require("./constant");

var _drawImage = require("./drawImage");

var _drawText = require("./drawText");

function addTask(LeeCanvas, type, params) {
    LeeCanvas.tasks.push({ type: type, params: params });
}

function runTask(LeeCanvas, callback) {
    if (LeeCanvas.tasks.length == 0) {
        typeof callback == 'function' && callback();
        return;
    }
    var task = LeeCanvas.tasks.shift();
    if (task) {
        switch (task.type) {
            case _constant.DRAW_IMAGE_TASK:
                (0, _drawImage.drawImage)(LeeCanvas, task.params, function () {
                    runTask(LeeCanvas, callback);
                });
                break;
            case _constant.DRAW_TEXT_TASK:
                (0, _drawText.drawTexts)(LeeCanvas, task.params);
                runTask(LeeCanvas, callback);
                break;
            default:
                break;
        }
    }
}