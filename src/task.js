import {DRAW_TEXT_TASK,DRAW_IMAGE_TASK} from "./constant";
import {drawImage} from "./drawImage";
import {drawTexts} from "./drawText";


export function addTask(LiCanvas,type,params) {
    LiCanvas.tasks.push({type,params})
}

export function runTask(LiCanvas,callback) {
    if(LiCanvas.tasks.length==0){
        typeof callback=='function'&&callback()
        return
    }
    let task=LiCanvas.tasks.shift()
    if(task){
        switch (task.type){
            case DRAW_IMAGE_TASK:
                drawImage(LiCanvas,task.params,()=>{runTask(LiCanvas,callback)})
                break
            case DRAW_TEXT_TASK:
                drawTexts(LiCanvas,task.params)
                runTask(LiCanvas,callback)
                break
            default:
                break
        }

    }
}