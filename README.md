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