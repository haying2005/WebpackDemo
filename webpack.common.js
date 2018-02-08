const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/index.js',
    vendor: ['lodash'], //第三方库打到单独的文件里
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js', //懒加载的模块会生成单独的chunk
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),

    new HtmlWebpackPlugin({ //自动生成html文件
      //template: __dirname + "/app/index.tmpl.html",
      title: 'webpack demo',
    }),

    //使用hash格式的模块id 避免因为模块id改变而产生chunkhash的改变，导致打包后的filename产生不必要的缓存失效
    new webpack.HashedModuleIdsPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['common', 'vendor'],  //注意顺序
      minChunks: 2,
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
  
  ],
};