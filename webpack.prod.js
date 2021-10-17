const {
  resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 用于生成index.html文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 用于提取css到单独的文件夹
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin') // 用于每次打包时清空先前打包后的文件
const webpack = require('webpack')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin') // 用于打包时显示进度条
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css

module.exports = {
  entry: './main.js', // 这里注意不能写 main.js ，需要写路径
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js'
  },
  module: {
    rules: [{
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: 3
              }
            ]
          ],
          cacheDirectory: true // 配置babel缓存，使得下次打包速度加快
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public/index.html'),
      favicon: resolve(__dirname, 'public/favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "style/[name].[contenthash:8].css"
    }),
    new OptimizeCssAssetsWebpackPlugin(), // 压缩css
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"' // 配置环境变量，注意这里需要加上引号，因为打包的时候会直接将process.env.NODE_ENV字符串替换为"production"，是字符串替换而不是在全局创建了变量。也可以使用JSON.stringify('production')
    }),
    new webpack.ProvidePlugin({ // 给jquery创建了全局变量，使得使用的时候可以直接使用$或者jQuery而不需import jquery
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new ProgressBarWebpackPlugin({ // 显示打包进度，用 * 和 - 分别表示已打包的和未打包的
      complete: '*',
      incomplete: '-'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all' // 配置代码分割，将node_modules里面的使用到的代码单独打包成一个js文件
    }
  },
  devtool: 'source-map'
}