const path = require('path');
const dev = process.env.NODE_ENV === 'dev'
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let cssLoaders = [{
    loader: 'css-loader',
    options: {
      importLoader: 1,
      minimize: !dev
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: (loader) => [
        require('autoprefixer')({
          browsers: ['last 2 versions', 'ie >= 7']
        })
      ]
    }
  }
];

let config = {
  entry: './src/client/app.js',
  watch: dev,
  output: {
    path: path.resolve('public') + '/assets',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: cssLoaders
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [...cssLoaders, 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'main.css',
      disable: dev
    })
  ]
}
if (!dev) {
  config.plugins.push(new UglifyJSPlugin());
}
module.exports = config;
