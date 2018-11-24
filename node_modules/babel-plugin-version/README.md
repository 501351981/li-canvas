# babel-plugin-version

A babel plugin replace define Identifier to pkg.version!

[![npm](https://img.shields.io/npm/v/babel-plugin-version.svg)](https://www.npmjs.com/package/babel-plugin-version)


## Install


> npm i --save-dev babel-plugin-version



## Usage


Add it into `.babelrc`.

```json
{
  "plugins": [
    "version"
  ]
}
```



## Result


 - In

```js
const a = { a: __VERSION__ };

const b = a === __VERSION__;

const c = [__VERSION__];

const d =__VERSION__ = 1;

```

 - Output

```js
const a = { a: "0.1.0" };

const b = a === "0.1.0";

const c = ["0.1.0"];

const d = __VERSION__ = 1;
```



## Configure


You can customize the default `__VERSION__` define.

```json
{
  "plugins": [
    ["version", { "define": "__PKG_VERSION__" }]
  ]
}
```



## Test


```
npm i

npm t
```

Then see the files in `lib` dir.



## License

MIT
