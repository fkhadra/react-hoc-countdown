/* eslint-disable */
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dist/ReactCountdown.min.js',
    libraryTarget: 'umd',
    library: 'ReactCountdown'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
  // exclude later too lazy
  // externals: {
  //   react: {
  //     root: 'React',
  //     commonjs2: 'react',
  //     commonjs: 'react',
  //     amd: 'react'
  //   }
  // },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()

  ]
};