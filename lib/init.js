"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initMixin = initMixin;

var _task = require("./task");

var _constant = require("./constant");

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
        marginBottom: 10,
        textDirection: 'horizontal',
        rowDirection: 'ltr'
    },
    backgroundImage: '',
    backgroundRepeat: 'repeat'
};

function initMixin(LiCanvas) {
    LiCanvas.prototype._init = function (canvas_id, options) {

        options.fontStyle = Object.assign({}, defaultParams.fontStyle, options.fontStyle);
        this.options = Object.assign({}, defaultParams, options);

        this.canvas = document.getElementById(canvas_id);
        this.ctx = this.canvas.getContext("2d");

        if (this.options.width) {
            this.canvas.width = this.options.width;
        }
        this.canvasWidth = this.canvas.width;

        if (this.options.height) {
            this.canvas.height = this.options.height;
        }
        this.canvasHeight = this.canvas.height;

        this.tasks = new Array();

        this.fontStyle = this.options.fontStyle;
        this.fontStartX = this.options.fontStyle.x;
        this.fontStartY = this.options.fontStyle.y;
        delete this.fontStyle.x;
        delete this.fontStyle.y;

        if (this.options.backgroundColor) {
            (0, _task.addTask)(this, _constant.SET_BACKGROUND_COLOR, { backgroundColor: this.options.backgroundColor });
        }

        if (this.options.backgroundImage) {
            (0, _task.addTask)(this, _constant.DRAW_BACKGROUND_IMAGE, {
                backgroundImage: this.options.backgroundImage,
                backgroundRepeat: this.options.backgroundRepeat
            });
        }
    };
}