/* eslint-disable max-len */
/**
 * Build config for development process that uses Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');

const baseConfig = require('./base');

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',

  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: 'bundle.[name].js',
    chunkFilename: '[name].bundle.js',
    pathinfo: true,
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
      // {
      //   test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //     },
      //   ],
      // },
    ],
  },

  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     API_URL: JSON.stringify(process.env.API_URL)
    //   },
    // }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],

  devServer: {
    host: '0.0.0.0' || 'localhost',
    port: process.env.PORT || 8000,
    historyApiFallback: {
      disableDotRule: true,
    },
    contentBase: './',
  },
});
