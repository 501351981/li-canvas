import {runTask} from "./task";

export function saveMixin(LiCanvas) {
    LiCanvas.prototype.draw=function (callback='') {
        runTask(this,callback)
    }

    LiCanvas.prototype.getImageData=function () {
        return this.canvas.toDataURL('image/png')
    }

    LiCanvas.prototype.saveToPng=function (fileName='lee-canvas') {
        this.saveFileName=fileName+'.png'
        saveToImage(this,'png')
    }

    LiCanvas.prototype.saveToJpeg=function (fileName='lee-canvas') {
        this.saveFileName=fileName+'.jpeg'
        saveToImage(this,'jpeg')
    }

    LiCanvas.prototype.saveToGif=function (fileName='lee-canvas') {
        this.saveFileName=fileName+'.gif'
        saveToImage(this,'gif')
    }

}

function saveToImage(LiCanvas,type){
    type=fixType(type)
    let strData=getDataURL(LiCanvas,type)
    saveFile(LiCanvas,strData)
}

function fixType(type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    type = type.match(/png|jpeg|gif/)[0];
    return 'image/' + type;
}

function getDataURL(LiCanvas,type){
    return LiCanvas.canvas.toDataURL(type)
}

function saveFile(LiCanvas,strData) {
    // document.location.href = strData;
    var a = document.createElement('a');
    a.href = strData;
    a.download = LiCanvas.saveFileName
    a.click();
}