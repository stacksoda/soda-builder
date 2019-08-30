# soda-builder
webpack builder
## 解析ES6
`npm i -D @babel/core babel-loader @babel/preset-env`
### .babelrc
``` json
{
    "presets": [
        "@babel/preset-env"
    ]
}
```
### webpack.config.js
``` javascript
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  mode: 'development'
};
```
## 解析JSX
`npm i -D @babel/preset-react`

### .babelrc
``` json
{
  "presets": [
    ...,
    "@babel/preset-react"
  ]
}
```
## 解析CSS
`npm i -D style-loader css-loader`

### webpack.config.js
``` javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
```
# 解析Less
``` bash
npm i -D less less-loader
```
``` javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    }
}
```

# 解析图片和字体
`npm i -D file-loader` 

### webpack.config.js

``` javascript
module.exports = {

    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eof|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }

}
```
# 小资源转base64
使用url-loader可以处理图片和字体，可以设置小资源自动转 base64

``` javascript
module.eports = {
    module: {
        rules: [{
            test: /\.(png|svg|jpg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10240
                }
            }
        }]
    }
}
```