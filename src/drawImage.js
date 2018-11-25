import {isArray,isObject,isString} from "./utils";
import {addTask} from "./task";
import {DRAW_IMAGE_TASK} from "./constant";

export function drawImageMixin(LiCanvas) {
    LiCanvas.prototype.addDrawImageTask=function(image){
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

export function drawImage(LiCanvas,image,callback){
    let img=new Image();
    img.setAttribute("crossOrigin",'Anonymous')
    img.src=image.src
    img.onload=()=>{
        if(image.hasOwnProperty('borderRadius')){
            drawImageWithBorderRadius(LiCanvas,img,image.x,image.y,image.width,image.height,image.borderRadius)

        }else {
            LiCanvas.ctx.drawImage(img,image.x,image.y,image.width,image.height)
        }

        typeof callback=='function'&&callback.call(LiCanvas)
    }
}

function drawImageWithBorderRadius(LiCanvas,img,x,y,w,h,borderRadius){
    let r=Math.min(borderRadius,w/2,h/2)
    LiCanvas.ctx.save()
    LiCanvas.ctx.beginPath()
    LiCanvas.ctx.moveTo(x,y+r)
    LiCanvas.ctx.arcTo(x,y,x+r,y,r)
    LiCanvas.ctx.lineTo(x+w-r,y)
    LiCanvas.ctx.arcTo(x+w,y,x+w,y+r,r)
    LiCanvas.ctx.lineTo(x+w,y+h-r)
    LiCanvas.ctx.arcTo(x+w,y+h,x+w-r,y+h,r)
    LiCanvas.ctx.lineTo(x+r,y+h)
    LiCanvas.ctx.arcTo(x,y+h,x,y+h-r,r)
    LiCanvas.ctx.lineTo(x,y+r)
    LiCanvas.ctx.clip()
    LiCanvas.ctx.drawImage(img,x,y,w,h)
    LiCanvas.ctx.restore()
}