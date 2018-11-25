'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initMixin = initMixin;
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

function initMixin(LiCanvas) {
    LiCanvas.prototype._init = function (canvas_id) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultParams,
            backgroundColor = _ref.backgroundColor,
            fontStyle = _ref.fontStyle;

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
            setBackgroundColor(this, backgroundColor);
        }
    };
}

function setBackgroundColor(LiCanvas, color) {
    LiCanvas.ctx.fillStyle = color;
    LiCanvas.ctx.fillRect(0, 0, LiCanvas.canvasWidth, LiCanvas.canvasHeight);
}