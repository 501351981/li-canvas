import {initMixin} from "./init";
import {drawImageMixin} from "./drawImage";
import {drawTextMixin} from "./drawText";
import {saveMixin} from "./save";

function LiCanvas(canvas_id,options={}) {
    if(!(this instanceof LiCanvas)){
        throw new Error("LiCanvas 必须通过new关键词进行实例化")
    }

    this._init(canvas_id,options)
}

initMixin(LiCanvas)
drawImageMixin(LiCanvas)
drawTextMixin(LiCanvas)
saveMixin(LiCanvas)

export default LiCanvas