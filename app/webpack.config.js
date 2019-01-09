const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")

const Webpack = require('webpack');

const outputDirectory = 'dist';

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  plugins: [
    // new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),

    new ExtractCssChunks(
      {
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'css/styles.css',
        // chunkFilename: "[id].css",
        hot: true, // if you want HMR - we try to automatically inject hot reloading but if it's not working, add it to the config
        orderWarning: true, // Disable to remove warnings about conflicting order between imports
        reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
        cssModules: true // if you use cssModules, this can help.
      }
    ),
    // new ExtractTextPlugin({
    //   filename: 'css/styles.css',
    //   disable: true,
    //   allChunks: true
    // }),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NamedModulesPlugin(),
  ]
};
