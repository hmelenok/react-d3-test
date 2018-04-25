const webpack = require('webpack'),
  path = require('path');
const PrettierPlugin = require('prettier-webpack-plugin');

const webpackConfig = {
  mode: process.env.MODE || 'development',
  entry: {
    app: ['./static/js/index.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          failOnWarning: false,
          failOnError: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
      }
    ]
  },

  output: {
    path: path.join(__dirname, '/static/build/'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:9000/static/build/'
  },

  plugins: [
    new webpack.ProvidePlugin({
      THREE: 'three'
    }),
    new PrettierPlugin({
      printWidth: 100, // Specify the length of line that the printer will wrap on.
      tabWidth: 2, // Specify the number of spaces per indentation-level.
      useTabs: false, // Indent lines with tabs instead of spaces.
      semi: true, // Print semicolons at the ends of statements.
      encoding: 'utf-8', // Which encoding scheme to use on files
      extensions: ['.js', '.ts'], // Which file extensions to process,
      singleQuote: true
    })
  ],

  stats: true,

  devServer: {
    port: 9000,
    contentBase: 'static/'
  },

  resolve: {
    modules: [path.join(__dirname, 'static/javascript/'), path.join(__dirname, 'node_modules')],

    extensions: ['.js']
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'eval-cheap-module-source-map'
};

module.exports = webpackConfig;
