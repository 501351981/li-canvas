var LeeCanvas=function(){"use strict";var t=function(){function t(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,i,a){return i&&t(e.prototype,i),a&&t(e,a),e}}();var e=Symbol(),i=Symbol(),a=Symbol(),n=Symbol(),o=Symbol(),s=Symbol(),r=Symbol(),l=Symbol(),h=Symbol(),c=Symbol(),f=Symbol(),u={backgroundColor:"#ffffff",fontStyle:{x:0,y:0,fontSize:14,fontStyle:"normal",fontWeight:"normal",fontFamily:"PingFangSC-Regular,'Microsoft YaHei',SimSun,Arial,'Helvetica Neue',sans-serif",lineHeight:20,color:"black",marginBottom:10}};function v(t){return Object.prototype.toString.call(t)==Object.prototype.toString.call([])}function y(t){return Object.prototype.toString.call(t)==Object.prototype.toString.call({})}function g(t){return Object.prototype.toString.call(t)==Object.prototype.toString.call("a")}return function(){function S(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u,a=i.backgroundColor,n=i.fontStyle;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,S),this.canvas=document.getElementById(t),this.ctx=this.canvas.getContext("2d"),this.canvasWidth=this.canvas.width,this.canvasHeight=this.canvas.height,this.tasks=new Array,this.fontStyle=n,this.fontStartX=n.x,this.fontStartY=n.y,delete n.x,delete n.y,a&&this[e](a)}return t(S,[{key:e,value:function(t){this.ctx.fillStyle=t,this.ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight)}},{key:i,value:function(t){return this.canvas.toDataURL(t)}},{key:a,value:function(t){var e=document.createElement("a");e.href=t,e.download=this.saveFileName,e.click()}},{key:n,value:function(t){return"image/"+(t=(t=t.toLowerCase().replace(/jpg/i,"jpeg")).match(/png|jpeg|gif/)[0])}},{key:o,value:function(t){t=this[n](t);var e=this[i](t);this[a](e)}},{key:"saveToPng",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"lee-canvas";this.saveFileName=t+".png",this[o]("png")}},{key:"saveToJpeg",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"lee-canvas";this.saveFileName=t+".jpeg",this[o]("jpeg")}},{key:"saveToGif",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"lee-canvas";this.saveFileName=t+".gif",this[o]("gif")}},{key:"addDrawImageTask",value:function(t){var e=this;if(v(t))t.forEach(function(t){e[s]("DRAW_IMAGE_TASK",t)});else{if(!y(t))throw new Error("addDrawImageTask 参数只支持对象或数组");this[s]("DRAW_IMAGE_TASK",t)}}},{key:"addDrawTextTask",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this[s]("DRAW_TEXT_TASK",{text:t,style:e})}},{key:s,value:function(t,e){this.tasks.push({type:t,params:e})}},{key:"draw",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";this[r](t)}},{key:r,value:function(t){var e=this;if(0!=this.tasks.length){var i=this.tasks.shift();if(i)switch(i.type){case"DRAW_IMAGE_TASK":this[l](i.params,function(){e[r](t)});break;case"DRAW_TEXT_TASK":this[c](i.params),this[r](t)}}else"function"==typeof t&&t()}},{key:l,value:function(t,e){var i=this,a=new Image;a.setAttribute("crossOrigin","Anonymous"),a.src=t.src,a.onload=function(){t.hasOwnProperty("borderRadius")?i[h](a,t.x,t.y,t.width,t.height,t.borderRadius):i.ctx.drawImage(a,t.x,t.y,t.width,t.height),"function"==typeof e&&e.call(i)}}},{key:h,value:function(t,e,i,a,n,o){var s=Math.min(o,a/2,n/2);this.ctx.save(),this.ctx.beginPath(),this.ctx.moveTo(e,i+s),this.ctx.arcTo(e,i,e+s,i,s),this.ctx.lineTo(e+a-s,i),this.ctx.arcTo(e+a,i,e+a,i+s,s),this.ctx.lineTo(e+a,i+n-s),this.ctx.arcTo(e+a,i+n,e+a-s,i+n,s),this.ctx.lineTo(e+s,i+n),this.ctx.arcTo(e,i+n,e,i+n-s,s),this.ctx.lineTo(e,i+s),this.ctx.clip(),this.ctx.drawImage(t,e,i,a,n),this.ctx.restore()}},{key:c,value:function(t){var e=this,i=t.text,a=t.style;if(g(i)){var n=Object.assign({},this.fontStyle,a);this[f](i,n)}else if(v(i))i.forEach(function(t,i){if(g(t)){var n=Object.assign({},e.fontStyle,a);e[f](t,n),0==i&&(delete a.x,delete a.y)}else if(y(t)){var o=Object.assign({},e.fontStyle,a,t);e[f](t.text,o),0==i&&(delete a.x,delete a.y)}});else if(y(i)){var o=Object.assign({},this.fontStyle,a,i);this[f](i.text,o)}}},{key:f,value:function(t,e){e.hasOwnProperty("x")&&(this.fontStartX=e.x),e.hasOwnProperty("y")&&(this.fontStartY=e.y);var i=void 0;i=e.hasOwnProperty("width")?e.width:this.canvasWidth-this.fontStartX,this.ctx.font=[e.fontStyle,e.fontWeight,e.fontSize+"px",e.fontFamily].join(" "),this.ctx.fillStyle=e.color,this.ctx.textBaseline="top";for(var a="",n=[],o=0;o<t.length;o++)a+=t[o],(this.ctx.measureText(a).width>=i||o==t.length-1)&&(n.push(a),a="");for(var s=0;s<n.length;s++)this.ctx.fillText(n[s],Math.floor(this.fontStartX),Math.floor(this.fontStartY)),s<n.length-1?this.fontStartY+=e.lineHeight:this.fontStartY+=e.fontSize+e.marginBottom}},{key:"getImageData",value:function(){return this.canvas.toDataURL("image/png")}}]),S}()}();
