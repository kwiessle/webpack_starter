// ----------- [  VARIABLES ] --------------//


const path = require('path');
const dev = process.env.NODE_ENV === 'dev';


// ----------- [  PLUGINS  ] --------------//


const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


// ----------- [  FUNCTIONS  ] --------------//


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


// ----------- [  CONFIG  ] --------------//


let config = {
  entry: './src/client/app.js',
  watch: dev,
  devtool: dev ? 'cheap-module-eval-source-map' : 'source-map',
  output: {
    path: path.resolve('public'),
    filename:  dev ? 'js/bundle.js' : 'js/bundle.[chunkhash:4].js'
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
      filename: dev ? 'stylesheets/main.css' : 'stylesheets/main.[contenthash:4].css',
    }),
    new CleanWebpackPlugin(
      ['stylesheets', 'js'], {
          root: path.resolve('public'),
          verbose: true,
          dry: false,
          exclude: ['']
      }
    )
  ]
}


// ----------- [  NODE_ENV  ] --------------//


if (!dev) {
  config.plugins.push(new UglifyJSPlugin({sourceMap: true}));
  config.plugins.push(new ManifestPlugin());
}
module.exports = config;
