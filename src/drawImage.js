import {isArray,isObject,isString} from "./utils";
import {addTask} from "./task";
import {DRAW_IMAGE_TASK} from "./constant";

export function drawImageMixin(LeeCanvas) {
    LeeCanvas.prototype.addDrawImageTask=function(image){
        if(isArray(image)){
            image.forEach((img)=>{
                addTask(this,DRAW_IMAGE_TASK,img)
            })
        }else if(isObject(image)){
            addTask(this,DRAW_IMAGE_TASK,image)
        }else {
            throw new Error("addDrawImageTask 参数只支持对象或数组")
        }
    }
}

export function drawImage(LeeCanvas,image,callback){
    let img=new Image();
    img.setAttribute("crossOrigin",'Anonymous')
    img.src=image.src
    img.onload=()=>{
        if(image.hasOwnProperty('borderRadius')){
            drawImageWithBorderRadius(LeeCanvas,img,image.x,image.y,image.width,image.height,image.borderRadius)

        }else {
            LeeCanvas.ctx.drawImage(img,image.x,image.y,image.width,image.height)
        }

        typeof callback=='function'&&callback.call(LeeCanvas)
    }
}

function drawImageWithBorderRadius(LeeCanvas,img,x,y,w,h,borderRadius){
    let r=Math.min(borderRadius,w/2,h/2)
    LeeCanvas.ctx.save()
    LeeCanvas.ctx.beginPath()
    LeeCanvas.ctx.moveTo(x,y+r)
    LeeCanvas.ctx.arcTo(x,y,x+r,y,r)
    LeeCanvas.ctx.lineTo(x+w-r,y)
    LeeCanvas.ctx.arcTo(x+w,y,x+w,y+r,r)
    LeeCanvas.ctx.lineTo(x+w,y+h-r)
    LeeCanvas.ctx.arcTo(x+w,y+h,x+w-r,y+h,r)
    LeeCanvas.ctx.lineTo(x+r,y+h)
    LeeCanvas.ctx.arcTo(x,y+h,x,y+h-r,r)
    LeeCanvas.ctx.lineTo(x,y+r)
    LeeCanvas.ctx.clip()
    LeeCanvas.ctx.drawImage(img,x,y,w,h)
    LeeCanvas.ctx.restore()
}