import {DRAW_TEXT_TASK, DRAW_IMAGE_TASK, DRAW_BACKGROUND_IMAGE, SET_BACKGROUND_COLOR} from "./constant";
import {drawImage, drawBackgroundImage, setBackgroundColor} from "./drawImage";
import {drawTexts} from "./drawText";


export function addTask(LiCanvas,type,params) {
    LiCanvas.tasks.push({type,params})
}

export function runTask(LiCanvas,callback) {
    if(LiCanvas.tasks.length==0){
        typeof callback=='function'&&callback()
        return
    }

    runTaskItem()

    function runTaskItem() {
        let task=LiCanvas.tasks.shift()

        if(task){
            taskHandle[task.type](LiCanvas,task.params,runTaskItem)
        }else {
            typeof callback=='function'&&callback()
            return
        }
    }
}



let taskHandle=new Array()

taskHandle[DRAW_IMAGE_TASK]=function (LiCanvas,params,callback) {
    drawImage(LiCanvas,params,callback)
}

taskHandle[DRAW_TEXT_TASK]=function (LiCanvas,params,callback) {
    drawTexts(LiCanvas,params)
    callback()
}

taskHandle[SET_BACKGROUND_COLOR]=function (LiCanvas,params,callback) {
    setBackgroundColor(LiCanvas,params,callback)
}


taskHandle[DRAW_BACKGROUND_IMAGE]=function (LiCanvas,params,callback) {
    drawBackgroundImage(LiCanvas,params,callback)
}
