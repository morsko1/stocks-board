const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const outputDirectory = 'client/build/';

module.exports = {
    entry: './client/src/index.js',
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './client/src/')
        }
    },
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, outputDirectory),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [path.resolve(process.cwd(), 'client/src/')]
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
           }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([outputDirectory]),
        new HtmlWebpackPlugin({
            title: 'stock-board',
            template: path.join(__dirname, '/client/public/index.html'),
            alwaysWriteToDisk: true
        }),
        new MinifyPlugin(),
        new CopyWebpackPlugin([{
            from: './client/public/moex_logo.jpg'
        }])
    ]
};
