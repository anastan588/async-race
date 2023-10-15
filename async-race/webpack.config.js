const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const path = require('path');
const EslintPlugin = require('eslint-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/index'),
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.[contenthash].js',
        assetModuleFilename: path.join('assets', 'icons/[name][ext]'),
        assetModuleFilename: path.join('assets', 'pictures/[name][ext]'),
        assetModuleFilename: path.join('assets', 'fonts/[name][ext]'),
    },
    module: {
        rules: [
            // {
            //     test: /\.ts$/i,
            //     use: ['ts-loader'],
            // },
            {
                test: /\.ts$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            import: true,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: path.join('assets', 'icons/[name][ext]'),
                },
            },
            {
                test: /\.(jpg|jpeg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: path.join('assets', 'pictures/[name][ext]'),
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: path.join('assets', 'fonts/[name][ext]'),
                },
            },
            {
                test: /\.mp3$/i,
                type: 'asset/resource',
                generator: {
                    filename: path.join('assets', 'sounds/[name][ext]'),
                },
            },
        ],
    },
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html',
        }),
        new EslintPlugin({ extensions: 'ts' }),
        new MiniCssExtractPlugin({
            filename: 'styles.[contenthash:8].css',
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['dist'],
                },
            },
        }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
