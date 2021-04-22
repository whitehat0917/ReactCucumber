const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const baseConfig = require('./base');

const publicPath = process.env.PUBLIC_PATH || '/';

process.env.BABEL_ENV = 'production';

module.exports = merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  output: {
    publicPath,
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.[name].[contenthash].js',
    chunkFilename: 'bundle.[name].[contenthash].js',
    pathinfo: false,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },

  /**
   * @see https://stackoverflow.com/a/49429500/561610
   */
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {},
  },

  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.TARGET_ENV': JSON.stringify(process.env.TARGET_ENV),
    //   'process.env.API_URL': JSON.stringify(process.env.API_URL) || 'https://app.marcelforart.com/api'
    // }),

    //new webpack.HashedModuleIdsPlugin(),
    new SentryWebpackPlugin({
      // sentry-cli configuration
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'marcel-for-art',
      project: 'web',
      deploy: { env: process.env.SENTRY_ENV },
      // webpack specific configuration
      include: '.',
      ignore: ['node_modules', 'webpack.config.js'],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle-analyzer.html',
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css',
    }),
  ],
});
