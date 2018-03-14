const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/index.js',
    index1: './src/index1.js',
    vendor: ['lodash'], //第三方库打到单独的文件里
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js', //懒加载的模块会生成单独的chunk
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),

    new HtmlWebpackPlugin({ //自动生成html文件
      template: __dirname + "/src/index.html",
      //title: 'webpack demo',
    }),

    //使用hash格式的模块id 避免因为模块id改变而产生chunkhash的改变，导致打包后的filename产生不必要的缓存失效
    //注意：把manifest抽出来之后就不需要这个了
    //new webpack.HashedModuleIdsPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['common', 'vendor', 'manifest'],  //注意顺序
      minChunks: 2,
    }),

  ],
};