import devServer from 'webpack-dev-server';
import webpack from 'webpack';
import config from './webpack.config.babel.js';

const server = new devServer(
  webpack(config),
  config.devServer
);

server.listen(8081);
