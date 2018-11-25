import {isArray,isObject,isString} from "./utils";
import {addTask} from "./task";
import {DRAW_TEXT_TASK} from "./constant";

export function drawTextMixin(LeeCanvas) {
    LeeCanvas.prototype.addDrawTextTask=function(text,style={}){
        addTask(this,DRAW_TEXT_TASK,{text,style})
    }
}

export function drawTexts(LeeCanvas,{text,style}){
    if(isString(text)){
        let textStyle=Object.assign({},LeeCanvas.fontStyle,style)
        drawText(LeeCanvas,text,textStyle)
    }else if(isArray(text)){
        text.forEach((t,index)=>{
            if(isString(t)){
                let textStyle=Object.assign({},LeeCanvas.fontStyle,style)
                drawText(LeeCanvas,t,textStyle)
                if(index==0){
                    delete style.x
                    delete style.y
                }
            }else if(isObject(t)){
                let textStyle=Object.assign({},LeeCanvas.fontStyle,style,t)
                drawText(LeeCanvas,t.text,textStyle)
                if(index==0){
                    delete style.x
                    delete style.y
                }
            }
        })
    }else if(isObject(text)){
        let textStyle=Object.assign({},LeeCanvas.fontStyle,style,text)
        drawText(LeeCanvas,text.text,textStyle)
    }
}
function drawText(LeeCanvas,text,style){
    if(style.hasOwnProperty('x')){
        LeeCanvas.fontStartX = style.x
    }
    if(style.hasOwnProperty('y')){
        LeeCanvas.fontStartY = style.y
    }
    let rowWidth
    if(style.hasOwnProperty('width')){
        rowWidth=style.width
    }else {
        rowWidth=LeeCanvas.canvasWidth-LeeCanvas.fontStartX
    }

    LeeCanvas.ctx.font=[style.fontStyle,style.fontWeight,style.fontSize+'px',style.fontFamily].join(" ")
    LeeCanvas.ctx.fillStyle=style.color
    LeeCanvas.ctx.textBaseline="top"

    let temp = "";
    let row = [];
    for(let i = 0; i < text.length; i++){
        temp += text[i];
        if( LeeCanvas.ctx.measureText(temp).width >= rowWidth || i==text.length-1){
            row.push(temp);
            temp = "";
        }
    }

    for(let j = 0; j < row.length; j++){
        LeeCanvas.ctx.fillText(row[j],Math.floor(LeeCanvas.fontStartX),Math.floor(LeeCanvas.fontStartY));
        if(j<row.length-1){
            LeeCanvas.fontStartY+=style.lineHeight
        }else {
            LeeCanvas.fontStartY+=style.fontSize+style.marginBottom
        }
    }
}