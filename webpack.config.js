const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    index: './src/index.js',
    vendor: ['lodash'],
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },

  devServer: {
    //contentBase: "./dist",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  },

  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),

    new HtmlWebpackPlugin({ //自动生成html文件
      //template: __dirname + "/app/index.tmpl.html"
    }),

    //new webpack.optimize.UglifyJsPlugin(),  //压缩js

    new CleanWebpackPlugin('dist/*.*', {  //build前先清空dist文件夹
      root: __dirname,
      verbose: true,
      dry: false
    }),

    new webpack.optimize.CommonsChunkPlugin({ //防止重复 把重复的模块提取出来
      names: ['common', 'vendor'],
      minChunks: 2,
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
  
  ],
};