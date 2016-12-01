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
        filename: '[name].js'  // in the form of "application-9328472034.js"
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"    // lol this is the trickiest thing I've seen in Webpack
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                //loaders: ['babel?' + JSON.stringify(babelLoaderQuery), 'eslint-loader']
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style", "css!sass?includePaths[]=" +
                    path.resolve(__dirname, "./css/pages/"))
            }
        ]
    },
    progress: true,
    resolve: {
        modulesDirectories: [
            'js/src',
            'node_modules'
        ],
        extensions: ['', '.json', '.js', '.jsx']
    },
    plugins: [
    ]
};