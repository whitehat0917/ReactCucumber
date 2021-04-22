const path = require('path');
const baseConfig = require('../webpack/base');

module.exports = {
  resolve: {
    modules: baseConfig.resolve.modules,
  },
  module: {
    rules: [
      ...baseConfig.module.rules.slice(1),
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, '../'),
      },
    ],
  },
  node: {
    fs: 'empty',
  },
};
