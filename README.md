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