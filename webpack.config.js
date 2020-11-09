const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
// const StylelintPlugin = require('stylelint-webpack-plugin');

const serverConfig = {
    target: 'electron-main',
    entry: {
        'electron/main': './src/electron/main.js',
        'electron/preloadView': './src/electron/preloadView.js',
        'electron/preloadSettings': './src/electron/preloadSettings.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './[name].js',
        chunkFilename: './[name].js',
    },
    plugins: [
        new CleanWebpackPlugin({
            dry: false,
            cleanOnceBeforeBuildPatterns: ['**/*'],
            cleanAfterEveryBuildPatterns: [],
        }),
    ],
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
        }],
    },
};

const clientConfig = {
    target: 'web',
    devtool: 'source-map',
    entry: {
        view: './src/js/view.js',
        settings: './src/js/settings.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
        }),
        new HtmlWebpackPlugin({
            title: 'settings',
            filename: 'settings.html',
            template: 'src/html/settings.html',
            chunks: ['settings'],
            meta: {
                'Content-Security-Policy': {
                    'http-equiv': 'Content-Security-Policy',
                    'content': 'script-src *',
                },
            },
        }),
        new HtmlWebpackPlugin({
            title: 'view',
            filename: 'index.html',
            template: 'src/html/index.html',
            chunks: ['view'],
            meta: {
                'Content-Security-Policy': {
                    'http-equiv': 'Content-Security-Policy',
                    'content': 'script-src *',
                },
            },
        }),
        new VueLoaderPlugin(),
        // new StylelintPlugin(),
    ],
    module: {
        rules: [{
            test: /\.css$/,
            oneOf: [{
                resourceQuery: /module/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]_[hash:base64:5]',
                            },
                        },
                    },
                ],
            }, {
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    'css-loader',
                ],
            }],
        }, {
            test: /\.s[ac]ss$/i,
            oneOf: [{
                resourceQuery: /module/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]_[hash:base64:5]',
                            },
                        },
                    },
                    'sass-loader',
                ],
            }, {
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            }],
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
        }, {
            test: /.*/i,
            include: [
                path.resolve(__dirname, 'src/fonts'),
            ],
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: './fonts/',
            },
        }, {
            test: /.*/i,
            include: [
                path.resolve(__dirname, 'src/sounds'),
            ],
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: './sounds/',
            },
        }],
    },
};

module.exports = [serverConfig, clientConfig];
