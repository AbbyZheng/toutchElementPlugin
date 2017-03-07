/**
 * Created by zhengfeiling on 17/3/1.
 */
var path = require('path')
var projectRoot = path.resolve(__dirname, '../')
var webpack = require('webpack')

module.exports = {
    entry: {
        pagination: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: 'toutchElement.min.js'
    },
    resolve: {
        extensions: ['', '.js'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'module': path.resolve(__dirname, '../src/module')
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: projectRoot,
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: projectRoot,
                exclude: /node_modules/
            }
        ]
    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: { except: ['$super', '$', 'exports', 'require'] }
        }),
        new webpack.ProvidePlugin({
            // eslint-disable-next-line import/no-unresolved
            Promise: 'exports?module.exports.default!babel-runtime/core-js/promise',
        })
    ]
}