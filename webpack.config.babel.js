import path from 'path';
import {externals} from 'whs/tools/externals';
import {argv} from 'yargs';
import express from 'express';
import webpack from 'webpack';

const config = {
  entry: `./${argv.daily || 1}/src/main.js`,

  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, `./${argv.daily || 1}/build`)
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      { test: /\.(glsl|frag|vert)$/, loader: 'raw-loader' },
      { test: /\.(glsl|frag|vert)$/, loader: 'glslify-loader' },
      {
        test: /\.js$/,
        loader: 'string-replace-loader',
        query: {
          multiple: [
            {search: 'glslify(__dirname + \'', replace: 'require(\'.'},
            {search: 'glslify(__dirname + \'', replace: 'require(\'.'}
          ]
        }
      }
    ]
  },

  externals,

  plugins: [
    new webpack.DefinePlugin({
      'PRODUCTION': JSON.stringify(process.env.NODE_ENV === 'production')
    })
  ],

  devServer: {
    publicPath: '/build/',
    contentBase: `./${argv.daily || 1}/`,

    setup(app) {
      app.use('/styles', express.static('styles'));
      app.use('/lib', express.static('lib'));
    }
  }
};

export {
  config as default
};
