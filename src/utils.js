export const isArray=function(obj) {
    let array=[]
    return Object.prototype.toString.call(obj)==Object.prototype.toString.call(array)
}

export const isObject=function(obj) {
    let object={}
    return Object.prototype.toString.call(obj)==Object.prototype.toString.call(object)
}

export const isString=function(str) {
    let string='a'
    return Object.prototype.toString.call(str)==Object.prototype.toString.call(string)
}

