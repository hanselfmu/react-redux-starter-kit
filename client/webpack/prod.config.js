/**
 * Created by chan on 11/16/16.
 *
 * Webpack config for production
 */
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ReplaceAssetsPlugin = require('./plugins/ReplaceAssetsPlugin');
var assetsPath = path.resolve(__dirname, '../build');

module.exports = {
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, '..'),
    entry: ['./js/app.js'],
    output: {
        path: assetsPath,
        publicPath: 'build/',
        filename: '[name]-[chunkhash:8].js'
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
                            sourceMap: false
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
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 1000      // anything less than 1KB will be combined;
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            },

            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: false,
            __DEVTOOLS__: false
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true,
                warnings: false
            },
            sourceMap: false,
            mangle: {
                except: ['$super', '$', 'exports', 'require']
            }
        }),
        new ReplaceAssetsPlugin({
            replace: 'false',
            entries: ['main'],
            input: './app.html',
            output: './build/app.html'
        })
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