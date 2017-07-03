import path from 'path';
import externals from 'whs/tools/externals';

const config = {
  entry: './src/main.js',

  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build')
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
      { test: /\.(glsl|frag|vert)$/, loader: 'raw-loader', exclude: /node_modules/ },
      { test: /\.(glsl|frag|vert)$/, loader: 'glslify-loader', exclude: /node_modules/ }
    ]
  },

  externals,

  devServer: {
    publicPath: '/build/'
  }
};

export {
  config as default
};
