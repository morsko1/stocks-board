const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputDirectory = 'client/build';

module.exports = {
    entry: './client/src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, outputDirectory),
        publicPath: '/'
    },
    devServer: {
        contentBase: path.join(__dirname, outputDirectory),
        port: 3000,
        open: true,
        proxy: {
            '/api': 'http://localhost:8080'
        },
        historyApiFallback: true
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
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
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
            template: path.join(__dirname, '/client/public/index.html')
        }),
        new CopyWebpackPlugin([{
            from: './client/public/moex_logo.jpg'
        }])
    ]
};
