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
# css资源提取为单文件
`npm i  mini-css-extract-plugin -D`

该plugin需要在plugins中配置，然后使用MiniCssExtractPlugin中的loader对css进行打包，该loader与style-loader所做的工作互斥，因此使用该loader替换style-loader的工作

``` javascript
// 声明 MiniCssExtractPlugin 变量
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 在plugins中配置plugin的参数，并使用其中的loader替换style-loader
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(
      {
        filename: '[name]_[contenthash:8].css'
      }
    )
  ]
}
```
# CSS3属性前缀
PostCSS插件 autoprefixer 自动补齐 CSS3 前缀 (根据can i use)
`npm i postcss-loader autoprefixer -D`

其中 autoprefixer 通过postcss-loader的配置引入
`postcss.config.js`
``` javascript
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
};
```
autoprefixer建议在package.json中配置参数
`package.json`
``` json
{
  // ...
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
```
``` javascript
module: {
  rules: [
    // ...
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
      ]
    }
  ]
}
```

# CSS px自动转rem
rem相对页面根元素的相对大小，因此将px转换为rem会有更好的页面兼容性

`npm i px2rem-loader -D`

``` javascript
module.exports = {

    module: {
        rules: [
            {
                test:/\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,// 与 style-loader互斥
                    {loader: 'css-loader', options: { importLoaders: 1 }},
                    'less-loader',
                    'postcss-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    }
                ]
            },
        ]
    }

}
```

# 使用 clean-webpack-plugin

默认会删除 output 制定的输出目录

`npm i clean-webpack-plugin -D` 
``` javascript 
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 

module.exports = {
    plugins: [
        new CleanWebpackPlugin()
    ]
}

``` 

# 多页面打包和html模板
## 安装glob
`npm i -D glob`

## 安装HTMLWebpackPlugin
`npm i -D html-webpack-plugin`
## 设置
``` javascript
const glob = require('glob');
const setSPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
  Object.keys(entryFiles)
    .map((index) => {
      // console.log('index', index)
      const entryFile = entryFiles[index];
      const match = entryFile.match(/src\/(.*)\/index\.js/);
      const pageName = match && match[1];

      entry[pageName] = entryFile;
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          template: path.join(__dirname, `src/${pageName}/index.html`),
          filename: `${pageName}.html`,
          // chunks: ['vendors', pageName],
          chunks: [pageName],
          inject: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false,
          },
        }),
      );
    })
  console.log('entryFiles', entryFiles)

  
  return {
    entry,
    htmlWebpackPlugins
  }
}
const {entry, htmlWebpackPlugins} = setSPA();

module.exports = {
    entry,
    plugins: [
        // ...
    ].concat(htmlWebpackPlugins)
}
```
# 命令行提示

使用 friendly-errors-webpack-plugin
`npm i -D friendly-errors-webpack-plugin` 

``` javascript
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
module.exports = {
    plugins: [
        ...,
        new FriendlyErrorsWebpackPlugin()
    ]
}
```

# 主动捕获并处理构建错误

compiler在每次构建结束后会触发done这个hook

process.exit主动处理构建报错

``` javascript
module.exports = {
    ...,
    plugins: [
        ...,
        function() {
            // webpack4之前 this.plugin()
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1) {
                    console.log('build error');
                    process.exit(1);
                }
            })
        }
    ]
}
```