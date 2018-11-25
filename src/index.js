import {initMixin} from "./init";
import {drawImageMixin} from "./drawImage";
import {drawTextMixin} from "./drawText";
import {saveMixin} from "./save";

function LeeCanvas(canvas_id,options) {
    if(!(this instanceof LeeCanvas)){
        throw new Error("LeeCanvas 必须通过new关键词进行实例化")
    }

    this._init(canvas_id,options)
}

initMixin(LeeCanvas)
drawImageMixin(LeeCanvas)
drawTextMixin(LeeCanvas)
saveMixin(LeeCanvas)

export default LeeCanvas