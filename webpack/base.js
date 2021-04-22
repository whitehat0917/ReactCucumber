/**
 * Base webpack config used across other specific configs
 */
const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const root = '..';
const envPath = path.resolve(__dirname, `${root}/.env.${process.env.TARGET_ENV}`);
require('dotenv').config({ path: envPath });

console.log(`Using env: ${envPath}`);
module.exports = {
  context: path.resolve(__dirname, `${root}/src`),

  entry: {
    app: 'index.tsx',
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?|\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.properties$/,
        loader: 'messageformat-properties-loader',
        options: {
          biDiSupport: false,
          defaultLocale: 'en',
          encoding: 'auto',
          keyPath: false,
          pathSep: '_',
        },
      },
      {
        test: /\.(jpg|png|gif|svg|woff|woff2|eot|ttf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          context: 'src',
          name() {
            if (process.env.NODE_ENV !== 'production') {
              return '[path][name].[ext]';
            }

            return '[contenthash].[ext]';
          },
          outputPath: 'assets',
        },
      },
    ],
  },

  resolve: {
    alias: {
      //react: 'preact/compat',
      //'react-dom': 'preact/compat',
    },
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
      stream: false,
      //stream: require.resolve('stream-browserify'),
      fs: require.resolve('browserify-fs'),
      //buffer: require('buffer'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss'],
    modules: [path.resolve(__dirname, `${root}/src`), path.resolve(__dirname, `${root}/node_modules`)],
  },
  plugins: [
    new webpack.DefinePlugin({
      Buffer: {},
      process: {
        env: {
          API_URL: JSON.stringify(process.env.API_URL),
          TARGET_ENV: JSON.stringify(process.env.TARGET_ENV),
        },
        browser: true,
      },
    }),
    //new webpack.ProvidePlugin({
    //  Buffer: ['buffer', 'Buffer'],
    //}),
    new Dotenv({
      path: envPath,
      systemvars: true,
      silent: false,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: '../public/index.html',
      production: process.env.NODE_ENV === 'production',
      development: !!process.env.STAGING || process.env.NODE_ENV === 'development',
      gaCode: process.env.GA_CODE,
      gtagCode: process.env.GTAG_CODE,
      faPixelCode: process.env.FACEBOOK_PIXEL_CODE,
      inject: 'body',
    }),
  ],
};
