import {runTask} from "./task";

export function saveMixin(LeeCanvas) {
    LeeCanvas.prototype.draw=function (callback) {
        runTask(this,callback)
    }

    LeeCanvas.prototype.getImageData=function () {
        return this.canvas.toDataURL('image/png')
    }

    LeeCanvas.prototype.saveToPng=function (fileName='lee-canvas') {
        this.saveFileName=fileName+'.png'
        saveToImage(this,'png')
    }

    LeeCanvas.prototype.saveToJpeg=function (fileName='lee-canvas') {
        this.saveFileName=fileName+'.jpeg'
        saveToImage(this,'jpeg')
    }

    LeeCanvas.prototype.saveToGif=function (fileName='lee-canvas') {
        this.saveFileName=fileName+'.gif'
        saveToImage(this,'gif')
    }

}

function saveToImage(LeeCanvas,type){
    type=fixType(type)
    let strData=getDataURL(LeeCanvas,type)
    saveFile(LeeCanvas,strData)
}

function fixType(type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    type = type.match(/png|jpeg|gif/)[0];
    return 'image/' + type;
}

function getDataURL(LeeCanvas,type){
    return LeeCanvas.canvas.toDataURL(type)
}

function saveFile(LeeCanvas,strData) {
    // document.location.href = strData;
    var a = document.createElement('a');
    a.href = strData;
    a.download = LeeCanvas.saveFileName
    a.click();
}