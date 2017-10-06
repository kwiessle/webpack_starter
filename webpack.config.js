const dev = process.env.NODE_ENV === 'dev'; 
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


let cssLoaders = [
    {loader: 'css-loader', options: {importLoaders: 1, minimize: !dev}}
]

if (!dev) {
    cssLoaders.push({
        loader: 'postcss-loader',
        options: {
            plugins: (loader) => [
                require('autoprefixer')({
                    browsers: ['last 2 versions', 'ie >= 7']
                })
            ]
        }
    })
}

let config = {
    entry: {
        app: './src/client/app.js'
    },
    watch: dev,
    output: {
        path: __dirname + '/src/client/dist',
//        publicPath: __dirname + '/src/client/dist',
        filename: '[name].js'
    },
    devtool: dev ? "cheap-module-eval-source-map" : false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
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
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: dev
        })
    ]
}

if (!dev) {
    config.plugins.push(new UglifyJSPlugin({
        sourceMap: false
    }))
    config.plugins.push(new ManifestPlugin())
    config.plugins.push(new CleanWebpackPlugin(['dist'], {
        root: __dirname + '/src/client/',
        verbose: true,
        dry: false
    }))
}

module.exports = config;