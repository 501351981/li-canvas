import {isArray,isObject,isString} from "./utils";
import {addTask} from "./task";
import {DRAW_TEXT_TASK} from "./constant";

export function drawTextMixin(LiCanvas) {
    LiCanvas.prototype.addDrawTextTask=function(text,style={}){
        addTask(this,DRAW_TEXT_TASK,{text,style})
    }
}

export function drawTexts(LiCanvas,{text,style}){
    if(isString(text)){
        let textStyle=Object.assign({},LiCanvas.fontStyle,style)
        drawText(LiCanvas,text,textStyle)
    }else if(isArray(text)){
        text.forEach((t,index)=>{
            if(isString(t)){
                let textStyle=Object.assign({},LiCanvas.fontStyle,style)
                drawText(LiCanvas,t,textStyle)
                if(index==0){
                    delete style.x
                    delete style.y
                }
            }else if(isObject(t)){
                let textStyle=Object.assign({},LiCanvas.fontStyle,style,t)
                drawText(LiCanvas,t.text,textStyle)
                if(index==0){
                    delete style.x
                    delete style.y
                }
            }
        })
    }else if(isObject(text)){
        let textStyle=Object.assign({},LiCanvas.fontStyle,style,text)
        drawText(LiCanvas,text.text,textStyle)
    }
}
function drawText(LiCanvas,text,style){
    if(style.hasOwnProperty('x')){
        LiCanvas.fontStartX = style.x
    }
    if(style.hasOwnProperty('y')){
        LiCanvas.fontStartY = style.y
    }
    let rowWidth
    if(style.hasOwnProperty('width')){
        rowWidth=style.width
    }else {
        rowWidth=LiCanvas.canvasWidth-LiCanvas.fontStartX
    }

    LiCanvas.ctx.font=[style.fontStyle,style.fontWeight,style.fontSize+'px',style.fontFamily].join(" ")
    LiCanvas.ctx.fillStyle=style.color
    LiCanvas.ctx.textBaseline="top"

    let temp = "";
    let row = [];
    for(let i = 0; i < text.length; i++){
        temp += text[i];
        if( LiCanvas.ctx.measureText(temp).width >= rowWidth || i==text.length-1){
            row.push(temp);
            temp = "";
        }
    }

    for(let j = 0; j < row.length; j++){
        LiCanvas.ctx.fillText(row[j],Math.floor(LiCanvas.fontStartX),Math.floor(LiCanvas.fontStartY));
        if(j<row.length-1){
            LiCanvas.fontStartY+=style.lineHeight
        }else {
            LiCanvas.fontStartY+=style.fontSize+style.marginBottom
        }
    }
}