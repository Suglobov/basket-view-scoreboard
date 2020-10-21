const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    target: 'electron-renderer',
    devtool: 'source-map',
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.js',
        },
    },
    entry: {
        view: './src/view.js',
        settings: './src/settings.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './[name].js',
        chunkFilename: './[name].js',
        publicPath: '',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }),
        new HtmlWebpackPlugin({
            title: 'settings',
            filename: 'settings.html',
            template: 'src/settings.html',
            chunks: ['settings'],
            publicPath: '',
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
            template: 'src/index.html',
            chunks: ['view'],
            publicPath: '',
            meta: {
                'Content-Security-Policy': {
                    'http-equiv': 'Content-Security-Policy',
                    'content': 'script-src *',
                },
            },
        }),
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [{
            test: /\.css$/,
            oneOf: [{
                resourceQuery: /module/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: { modules: true, localIdentName: '[local]_[hash:base64:5]' },
                    },
                ],
            }, {
                use: [
                    'vue-style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            }],
        }, {
            test: /\.s[ac]ss$/i,
            oneOf: [{
                resourceQuery: /module/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: { modules: true, localIdentName: '[local]_[hash:base64:5]' },
                    },
                    'sass-loader',
                ],
            }, {
                use: [
                    'vue-style-loader',
                    MiniCssExtractPlugin.loader,
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
        }],
    },
};
