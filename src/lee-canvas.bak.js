const setBackgroundColor=Symbol()
const getDataURL=Symbol()
const saveFile=Symbol()
const fixType=Symbol()
const saveToImage=Symbol()
const addTask=Symbol()
const runTask=Symbol()
const drawImage=Symbol()
const drawImageWithBorderRadius=Symbol()
const drawTexts=Symbol()
const drawText=Symbol()

const downloadMime = 'image/octet-stream'
const DRAW_IMAGE_TASK='DRAW_IMAGE_TASK'
const DRAW_TEXT_TASK='DRAW_TEXT_TASK'

import {isArray,isObject,isString} from "./utils";

const defaultParams={
    backgroundColor:'#ffffff',
    fontStyle:{
        x:0,
        y:0,
        fontSize:14,
        fontStyle:'normal',
        fontWeight:'normal',
        fontFamily:"PingFangSC-Regular,'Microsoft YaHei',SimSun,Arial,'Helvetica Neue',sans-serif",
        lineHeight:20,
        color:'black',
        marginBottom:10
    }
}


class Canvas {
    constructor(canvas_id,{backgroundColor,fontStyle}=defaultParams){
        this.canvas=document.getElementById(canvas_id)
        this.ctx=this.canvas.getContext("2d")
        this.canvasWidth=this.canvas.width
        this.canvasHeight=this.canvas.height

        this.tasks=new Array()

        this.fontStyle=fontStyle
        this.fontStartX=fontStyle.x
        this.fontStartY=fontStyle.y
        delete fontStyle.x
        delete fontStyle.y

        if(backgroundColor){
            this[setBackgroundColor](backgroundColor)
        }
    }

    [setBackgroundColor](color){
        this.ctx.fillStyle=color
        this.ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight)
    }

    [getDataURL](type){
        return this.canvas.toDataURL(type)
    }
    [saveFile](strData) {
        // document.location.href = strData;
        var a = document.createElement('a');
        a.href = strData;
        a.download = this.saveFileName
        a.click();
    }

    [fixType](type) {
        type = type.toLowerCase().replace(/jpg/i, 'jpeg');
        type = type.match(/png|jpeg|gif/)[0];
        return 'image/' + type;
    }

    [saveToImage](type){
        type=this[fixType](type)
        let strData=this[getDataURL](type)
        // this[saveFile](strData.replace(type,downloadMime))
        this[saveFile](strData)
    }

    saveToPng(fileName='lee-canvas'){
        this.saveFileName=fileName+'.png'
        this[saveToImage]('png')
    }
    saveToJpeg(fileName='lee-canvas'){
        this.saveFileName=fileName+'.jpeg'
        this[saveToImage]('jpeg')
    }
    saveToGif(fileName='lee-canvas'){
        this.saveFileName=fileName+'.gif'
        this[saveToImage]('gif')
    }


    addDrawImageTask(image){
        if(isArray(image)){
            image.forEach((img)=>{
                this[addTask](DRAW_IMAGE_TASK,img)
            })
        }else if(isObject(image)){
            this[addTask](DRAW_IMAGE_TASK,image)
        }else {
            throw new Error("addDrawImageTask 参数只支持对象或数组")
        }

    }

    addDrawTextTask(text,style={}){
        this[addTask](DRAW_TEXT_TASK,{text,style})
    }

    [addTask](type,params){
        this.tasks.push({type,params})
    }

    draw(callback=''){
        this[runTask](callback)
    }
    [runTask](callback){
        if(this.tasks.length==0){
            typeof callback=='function'&&callback()
            return
        }
        let task=this.tasks.shift()
        if(task){
            switch (task.type){
                case DRAW_IMAGE_TASK:
                    this[drawImage](task.params,()=>{this[runTask](callback)})
                    break
                case DRAW_TEXT_TASK:
                    this[drawTexts](task.params)
                    this[runTask](callback)
                    break
                default:
                    break
            }

        }
    }


    [drawImage](image,callback){
        let img=new Image();
        img.setAttribute("crossOrigin",'Anonymous')
        img.src=image.src
        img.onload=()=>{
            if(image.hasOwnProperty('borderRadius')){
                this[drawImageWithBorderRadius](img,image.x,image.y,image.width,image.height,image.borderRadius)

            }else {
                this.ctx.drawImage(img,image.x,image.y,image.width,image.height)
            }

            typeof callback=='function'&&callback.call(this)
        }
    }

    [drawImageWithBorderRadius](img,x,y,w,h,borderRadius){
        let r=Math.min(borderRadius,w/2,h/2)
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.moveTo(x,y+r)
        this.ctx.arcTo(x,y,x+r,y,r)
        this.ctx.lineTo(x+w-r,y)
        this.ctx.arcTo(x+w,y,x+w,y+r,r)
        this.ctx.lineTo(x+w,y+h-r)
        this.ctx.arcTo(x+w,y+h,x+w-r,y+h,r)
        this.ctx.lineTo(x+r,y+h)
        this.ctx.arcTo(x,y+h,x,y+h-r,r)
        this.ctx.lineTo(x,y+r)
        this.ctx.clip()
        this.ctx.drawImage(img,x,y,w,h)
        this.ctx.restore()
    }

    [drawTexts]({text,style}){
        if(isString(text)){
            let textStyle=Object.assign({},this.fontStyle,style)
            this[drawText](text,textStyle)
        }else if(isArray(text)){
            text.forEach((t,index)=>{
                if(isString(t)){
                    let textStyle=Object.assign({},this.fontStyle,style)
                    this[drawText](t,textStyle)
                    if(index==0){
                        delete style.x
                        delete style.y
                    }
                }else if(isObject(t)){
                    let textStyle=Object.assign({},this.fontStyle,style,t)
                    this[drawText](t.text,textStyle)
                    if(index==0){
                        delete style.x
                        delete style.y
                    }
                }
            })
        }else if(isObject(text)){
            let textStyle=Object.assign({},this.fontStyle,style,text)
            this[drawText](text.text,textStyle)
        }
    }
    [drawText](text,style){
        if(style.hasOwnProperty('x')){
            this.fontStartX = style.x
        }
        if(style.hasOwnProperty('y')){
            this.fontStartY = style.y
        }
        let rowWidth
        if(style.hasOwnProperty('width')){
            rowWidth=style.width
        }else {
            rowWidth=this.canvasWidth-this.fontStartX
        }

        this.ctx.font=[style.fontStyle,style.fontWeight,style.fontSize+'px',style.fontFamily].join(" ")
        this.ctx.fillStyle=style.color
        this.ctx.textBaseline="top"

        let temp = "";
        let row = [];
        for(let i = 0; i < text.length; i++){
            temp += text[i];
            if( this.ctx.measureText(temp).width >= rowWidth || i==text.length-1){
                row.push(temp);
                temp = "";
            }
        }

        for(let j = 0; j < row.length; j++){
            this.ctx.fillText(row[j],Math.floor(this.fontStartX),Math.floor(this.fontStartY));
            if(j<row.length-1){
                this.fontStartY+=style.lineHeight
            }else {
                this.fontStartY+=style.fontSize+style.marginBottom
            }
        }
    }

    getImageData(){
        return this.canvas.toDataURL('image/png')
    }


}

Canvas.prototype.said=function () {
    console.log("执行了said")
}
export default Canvas