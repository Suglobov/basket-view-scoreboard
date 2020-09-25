const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        view: './src/view.js',
        settings: './src/settings.js',
        // uikit: './node_modules/uikit/src/scss/uikit.scss',
        // mainStyle: './src/style.scss',
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
        ],
    },
};
