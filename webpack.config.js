const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        view: './src/view.js',
        settings: './src/settings.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './[name].js',
        chunkFilename: './[name].js',
        publicPath: '/',
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
            template: './src/settings.html',
            chunks: ['settings'],
        }),
        new HtmlWebpackPlugin({
            title: 'view',
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['view'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /.*/i,
                include: [
                    path.resolve(__dirname, 'src/fonts'),
                ],
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: './fonts/'
                },
            },
        ],
    },
};
