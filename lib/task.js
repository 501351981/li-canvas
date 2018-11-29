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

    runTaskItem();

    function runTaskItem() {
        var task = LiCanvas.tasks.shift();

        if (task) {
            taskHandle[task.type](LiCanvas, task.params, runTaskItem);
        } else {
            typeof callback == 'function' && callback();
            return;
        }
    }
}

var taskHandle = new Array();

taskHandle[_constant.DRAW_IMAGE_TASK] = function (LiCanvas, params, callback) {
    (0, _drawImage.drawImage)(LiCanvas, params, callback);
};

taskHandle[_constant.DRAW_TEXT_TASK] = function (LiCanvas, params, callback) {
    (0, _drawText.drawTexts)(LiCanvas, params);
    callback();
};

taskHandle[_constant.SET_BACKGROUND_COLOR] = function (LiCanvas, params, callback) {
    (0, _drawImage.setBackgroundColor)(LiCanvas, params, callback);
};

taskHandle[_constant.DRAW_BACKGROUND_IMAGE] = function (LiCanvas, params, callback) {
    (0, _drawImage.drawBackgroundImage)(LiCanvas, params, callback);
};