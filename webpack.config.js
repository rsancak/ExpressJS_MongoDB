const path = require('path')
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: './public/js/bundle.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'public/js'),
    publicPath: '/public/'
  },
  devServer: {
    static: path.resolve(__dirname, './'),
    port: 8585,
    hot: true
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        format: {
          comments: false,
        },
      },
      extractComments: false,
    })],
  }
}