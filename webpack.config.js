'use strict'

const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

const input = path.resolve(__dirname, './src')
const output = path.resolve(__dirname, './web')

module.exports = {
  // NODE_ENV set by cross-env in npm scripts
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  target: ['web', 'es6'],

  context: __dirname,

  entry: {
    app: path.resolve(input, 'js/app.js'),
  },

  output: {
    path: output,
    publicPath: '/',
    filename: '[name].js'
  },

  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,

  module: {
    rules: [
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',
      },
    ],
  },

  plugins: [
    // Remove all previous build assets
    new CleanWebpackPlugin({}),
    // Copy our static HTML, image & meta assets to the public path.
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(input, `.htaccess.${process.env.NODE_ENV || 'development'}.public`),
          to: '.htaccess',
          toType: 'file',
        },
        path.resolve(input, 'robots.txt'),
        path.resolve(input, 'index.html'),
        {
          from: path.resolve(input, 'partials'),
          to: 'partials',
        },
        {
          from: path.resolve(input, 'images'),
          to: 'images',
        },
      ]
    }),
    new webpack.ProvidePlugin({
      L: 'leaflet',
      'window.L': 'leaflet',
    })
  ]
}
