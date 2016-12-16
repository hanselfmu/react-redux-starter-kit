/**
 * Created by chan on 11/16/16.
 */
/**
 * Created by chan on 11/16/16.
 *
 * Webpack config for development
 */
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var assetsPath = path.resolve(__dirname, '../client/build');

module.exports = {
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, '..'),
    entry: ['./client/js/app.js'],
    output: {
        path: assetsPath,
        publicPath: 'build/',
        filename: '[name].js'
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loaders: [
                    {
                        loader: 'style-loader',
                        query: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            importLoaders: 1,
                            camelCase: true,
                            localIdentName: 'c__[name]__[local]___[hash:base64:5]'  // 'c' prefix means component
                        }
                    },
                    {
                        loader: 'sass-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]

            }
        ]
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx']
    },
    plugins: [
    ],
    target: "web",
    stats: {
        assets: true,
        chunks: true,
        errors: true,
        errorDetails: true,
        hash: true,
        modules: true,
        timings: true,
        version: true,
        warnings: true
    }
};