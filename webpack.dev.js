const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

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
    devServer: {
        contentBase: path.join(__dirname, outputDirectory),
        port: 8888,
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
                test: /\.scss$/,
                use: [
                    {
                        loader: 'css-hot-loader'
                    },
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
            template: path.join(__dirname, '/client/public/index.html'),
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin(),
        new CopyWebpackPlugin([{
            from: './client/public/moex_logo.jpg'
        }])
    ]
};
