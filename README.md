# lee-canvas.js

> 对Html5的canvas功能进行了封装，方便进行多图片绘制、圆角图片绘制、多行文字绘制、图片保存下载等功能.

# 主要功能

 - 图片绘制：单图/多图绘制、圆角图片绘制.
 - 文字绘制：多段文字绘制、自动换行.
 - 图片保存：获取图片数据、下载图片到本地，支持自定义下载图片名.


# npm安装
```sh
# npm 安装
npm install --save lee-canvas.js
```


# 直接引用

在html引入文件.

```html
<script src="dist/lee-canvas.js"></script>
```

# 如何使用

## 实例化
使用lee-canvas时需要先实例化对象，new LeeCanvas(canvas_id,options),传入canvas的id

```html
	...
<body>
<canvas id="test" width="1563" height="1180"></canvas>
<script>
    var canvas=new LeeCanvas('test')
</script>
</body>
	...
```

## 图片绘制

- 绘制单张图片

调用addDrawImageTask(image)，其中参数image是一个对象，包括

src：图片的url地址

x：图片在canvas画布上的左上角x坐标

y：图片在canvas画布上的左上角y坐标

width：图片绘制宽度

height：图片绘制高度

borderRadius：图片圆角半径

调用addDrawImageTask(image)时，并没有立即绘制图片，而是添加了一个绘图任务，只有调用draw(callback)时，才执行绘图任务，执行完成调用callback回调函数

为什么这么做呢？因为图片绘制的时候需要先下载图片，这是个异步操作，所以先添加到任务列表，调用draw()的时候再按照任务添加顺序依次执行

```html
	...
<body>
<canvas id="test" width="1563" height="1180" style="width: 782px;height: 590px;border: 1px solid red"></canvas>
<img src="./bg.jpg" id="img" width="0" height="0">
<script>
    var bg={
        src:document.getElementById('img').src,//或者图片的url地址
        x:0,//左上角的x坐标
        y:0,//左上角的y坐标
        width:1563,//图片绘制宽度
        height:1180,//图片绘制高度
        borderRadius:0 //图片圆角半径
    }

    var canvas=new LeeCanvas('test')

    canvas.addDrawImageTask(bg)  //添加绘图任务，并没有立即进行绘图

    canvas.draw(()=>{
       console.log("绘制完成")
    })
</script>
</body>
	...
```
- 绘制多图

可以连续多次调用addDrawImageTask(image)，也可以传图一个数组

```html
	...
<body>
<canvas id="test" width="1563" height="1180" style="width: 782px;height: 590px;border: 1px solid red"></canvas>

<script>
    var img1={
        src:"http://*****.com/***.png",
        x:0,
        y:0,
        width:1563,
        height:1180,
        borderRadius:0
    }

    var img2={
            src:"http://*****.com/***.png",
            x:0,
            y:0,
            width:1563,
            height:1180,
            borderRadius:0
     }

    var imgs=[
        {
             src:"http://*****.com/***.png",
             x:0,
             y:0,
             width:100,
             height:100,
             borderRadius:0
        },
        {
             src:"http://*****.com/***.png",
             x:0,
             y:0,
             width:100,
             height:100,
             borderRadius:0
        }
    ]

    var canvas=new LeeCanvas('test')

    canvas.addDrawImageTask(img1)
    canvas.addDrawImageTask(img2)

    canvas.addDrawImageTask(imgs)   //直接传图一个数组也可以实现多图绘制

    canvas.draw(()=>{
       console.log("绘制完成")
    })
</script>
</body>
	...
```
```html
	...
<body>
<canvas id="test" width="1563" height="1180" style="width: 782px;height: 590px;border: 1px solid red"></canvas>

<script>
    var img1={
        src:"http://*****.com/***.png",
        x:0,
        y:0,
        width:1563,
        height:1180,
        borderRadius:0
    }

    var img2={
            src:"http://*****.com/***.png",
            x:0,
            y:0,
            width:1563,
            height:1180,
            borderRadius:0
     }

    var imgs=[
        {
             src:"http://*****.com/***.png",
             x:0,
             y:0,
             width:100,
             height:100,
             borderRadius:0
        },
        {
             src:"http://*****.com/***.png",
             x:0,
             y:0,
             width:100,
             height:100,
             borderRadius:0
        }
    ]

    var canvas=new LeeCanvas('test')

    canvas.addDrawImageTask(img1)
    canvas.addDrawImageTask(img2)

    canvas.addDrawImageTask(imgs)   //直接传图一个数组也可以实现多图绘制

    canvas.draw(()=>{
       console.log("绘制完成")
    })
</script>
</body>
	...
```
- 绘制圆角或圆形图片

只需要设置borderRadius即可
```html
	...
<body>
<canvas id="test" width="1563" height="1180" style="width: 782px;height: 590px;border: 1px solid red"></canvas>

<script>
    var img1={
        src:"http://*****.com/***.png",
        x:0,
        y:0,
        width:100,
        height:100,
        borderRadius:50  //设置圆角半径，当圆角半径为正方形边长一半时，就是一个圆形了
    }

    var canvas=new LeeCanvas('test')
    canvas.addDrawImageTask(img1)
    canvas.draw(()=>{
       console.log("绘制完成")
    })
</script>
</body>
	...
```

## 绘制文字
- 绘制一段文字

调用addDrawTextTask(text,style)

text:要绘制的文字

style：文字样式，包括

       x：文字绘制起始位置左上角坐标x

       y：文字绘制其实位置左上角坐标y

       width：文字一行的宽度，超出会自动进行换行

       fontSize：文字大小，整数，单位为px

       fontWeight：文字粗细bold、bolder等或者400，500，600...同css的font-weight

       fontFamily：文字字体，同css

       lineHeight：行高，整数，单位px

       color：颜色

       marginBottom：如果有多段文字，还可以指定段落之间的距离

文字绘制，同样是异步的，知道调用draw(callback)才真正进行绘制

```html
	...
<body>
<canvas id="test" width="1563" height="1180" style="width: 782px;height: 590px;border: 1px solid red"></canvas>

<script>
   var canvas=new LeeCanvas('test')
   canvas.addDrawTextTask("要绘制的文字",{
           x:110,
           y:496,
           width:1340,
           fontSize:54,
           fontWeight:'bolder',
           fontFamily:"PingFangSC-Regular,'Microsoft YaHei',SimSun,Arial,'Helvetica Neue',sans-serif",
           lineHeight:70,
           color:'#1a1a1a',
           marginBottom:40
   })

    canvas.draw(()=>{
          console.log("绘制完成")
       })
</script>
</body>
	...
```

- 绘制多段文字

方法1：反复调用addDrawTextTask(text,style)，同上

方法2：text可以传入一个数组，可以共用style

```html
	...
<body>
<canvas id="test" width="1563" height="1180" style="width: 782px;height: 590px;border: 1px solid red"></canvas>

<script>
   var canvas=new LeeCanvas('test')
   canvas.addDrawTextTask(["要绘制的文字段落1","要绘制的文字段落2"],{
           x:110,
           y:496,
           width:1340,
           fontSize:54,
           fontWeight:'bolder',
           fontFamily:"PingFangSC-Regular,'Microsoft YaHei',SimSun,Arial,'Helvetica Neue',sans-serif",
           lineHeight:70,
           color:'#1a1a1a',
           marginBottom:40
   })

    canvas.draw(()=>{
          console.log("绘制完成")
       })
</script>
</body>
	...
```
其中style也可以在对象实例化的时候传入一个默认值，避免反复设置一些共用的style
```html
	...
<body>
<canvas id="test" width="1563" height="1180" style="width: 782px;height: 590px;border: 1px solid red"></canvas>

<script>
   var canvas=new LeeCanvas('test',{
       fontStyle:{
           fontSize:20,
           fontFamily:"PingFangSC-Regular,'Microsoft YaHei',SimSun,Arial,'Helvetica Neue',sans-serif",
           lineHeight:70,
           color:'#1a1a1a',
           marginBottom:40
       }
   })

   canvas.addDrawTextTask("要绘制的文字段落1",{
           x:110,
           y:496,
           width:1340,
   })

   canvas.addDrawTextTask("要绘制的文字段落2",{
              x:110,
              y:696,
              width:1340,
      })

    canvas.draw(()=>{
          console.log("绘制完成")
       })
</script>
</body>
	...
```

如果多段文字中，有一段的文字需要设置不同的样式，也可以单独指定样式，如下， 是不是很灵活~
```html
	...
<body>
<canvas id="test" width="1563" height="1180" style="width: 782px;height: 590px;border: 1px solid red"></canvas>

<script>
   var canvas=new LeeCanvas('test',{
       fontStyle:{
           fontSize:20,
           fontFamily:"PingFangSC-Regular,'Microsoft YaHei',SimSun,Arial,'Helvetica Neue',sans-serif",
           lineHeight:70,
           color:'#1a1a1a',
           marginBottom:40
       }
   })

   canvas.addDrawTextTask([{
       text:"要绘制的段落文字1",
       fontSize：60
   },"要绘制的文字段落2","要绘制的文字段落3"],{
           x:110,
           y:496,
           width:1340,
   })


   canvas.draw(()=>{
          console.log("绘制完成")
   })
</script>
</body>
	...
```

## 保存下载图片
- 下载图片

下载为png图片：saveToPng("文件名")

下载为jpeg图片：saveToJpeg("文件名")

下载为gif图片：saveToGif("文件名")

注意：下载图片必须在draw()的回调函数中调用才可以生效
```html
	...
<body>
<canvas id="test" width="1563" height="1180" style="width: 782px;height: 590px;border: 1px solid red"></canvas>

<script>
    var bg={
        src:"http://***.jpg",
        x:0,
        y:0,
        width:1563,
        height:1180,
        borderRadius:0
    }

    var canvas=new LeeCanvas('test')
    canvas.addDrawImageTask(bg)
    canvas.draw(()=>{
       canvas.saveToPng("lee-canvas")
    })
</script>
</body>
	...
```
- 获取图片数据

有时候，我们并不想下载图片，比如在微信浏览器中，我们其实是希望用户长按图片保存，此时，我们希望canvas合成的图片数据，插入到img的src中

调用：getImageData()可以获取合成的图片数据

```html
	...
<body>
<canvas id="test" width="1563" height="1180" style="width: 782px;height: 590px;border: 1px solid red"></canvas>
<img src="./bg.jpg" id="img" >
<script>
    var bg={
        src:"http://***.jpg",
        x:0,
        y:0,
        width:1563,
        height:1180,
        borderRadius:0
    }

    var canvas=new LeeCanvas('test')
    canvas.addDrawImageTask(bg)
    canvas.draw(()=>{
       var src=canvas.getImageData()
       document.getElementById('img').src=src
    })
</script>
</body>
	...
```