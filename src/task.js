import {DRAW_TEXT_TASK,DRAW_IMAGE_TASK} from "./constant";
import {drawImage} from "./drawImage";
import {drawTexts} from "./drawText";


export function addTask(LeeCanvas,type,params) {
    LeeCanvas.tasks.push({type,params})
}

export function runTask(LeeCanvas,callback) {
    if(LeeCanvas.tasks.length==0){
        typeof callback=='function'&&callback()
        return
    }
    let task=LeeCanvas.tasks.shift()
    if(task){
        switch (task.type){
            case DRAW_IMAGE_TASK:
                drawImage(LeeCanvas,task.params,()=>{runTask(LeeCanvas,callback)})
                break
            case DRAW_TEXT_TASK:
                drawTexts(LeeCanvas,task.params)
                runTask(LeeCanvas,callback)
                break
            default:
                break
        }

    }
}