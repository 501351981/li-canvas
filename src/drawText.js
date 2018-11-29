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
        rowWidth=style.textDirection=='horizontal'?LiCanvas.canvasWidth-LiCanvas.fontStartX:LiCanvas.canvasHeight-LiCanvas.fontStartY
    }

    LiCanvas.ctx.font=[style.fontStyle,style.fontWeight,style.fontSize+'px',style.fontFamily].join(" ")
    LiCanvas.ctx.fillStyle=style.color
    LiCanvas.ctx.textBaseline="top"

    if(style.textDirection=='horizontal'){
        drawTextHorizontal(LiCanvas,text,rowWidth,style)
    }else {
        drawTextVertical(LiCanvas,text,rowWidth,style)
    }


}

function drawTextHorizontal(LiCanvas,text,rowWidth,style) {
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

function drawTextVertical(LiCanvas,text,rowWidth,style) {
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
        let t=row[j];
        let startY=LiCanvas.fontStartY
        for(let k=0;k<t.length;k++){
            LiCanvas.ctx.fillText(t[k],Math.floor(LiCanvas.fontStartX),Math.floor(LiCanvas.fontStartY));
            LiCanvas.fontStartY+=style.fontSize
        }
        LiCanvas.fontStartY=startY

        if(j<row.length-1){
            if(style.rowDirection=='ltr'){
                LiCanvas.fontStartX+=style.lineHeight
            }else {
                LiCanvas.fontStartX-=style.lineHeight
            }

        }else {
            if(style.rowDirection=='ltr'){
                LiCanvas.fontStartX+=style.fontSize+style.marginBottom
            }else {
                LiCanvas.fontStartX-=style.fontSize+style.marginBottom
            }

        }
    }
}

