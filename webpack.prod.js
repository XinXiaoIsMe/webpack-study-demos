const {
  resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成index.html文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取css到单独的文件夹
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin') // 每次打包时清空先前打包后的文件
const webpack = require('webpack')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin') // 打包时显示进度条

module.exports = {
  entry: './main.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
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
        test: /\.js/i,
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
          ]
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new ProgressBarWebpackPlugin({
      complete: '*',
      incomplete: '-'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devtool: 'source-map'
}