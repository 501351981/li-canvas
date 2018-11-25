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

export function initMixin(LeeCanvas) {
    LeeCanvas.prototype._init=function(canvas_id,{backgroundColor,fontStyle}=defaultParams){
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
            setBackgroundColor(this,backgroundColor)
        }
    }
}

function setBackgroundColor(LeeCanvas,color){
    LeeCanvas.ctx.fillStyle=color
    LeeCanvas.ctx.fillRect(0,0,LeeCanvas.canvasWidth,LeeCanvas.canvasHeight)
}