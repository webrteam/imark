const webpack = require('webpack');
const path = require('path');
module.exports = {
    entry: "./analyze.js",
    output: {
        path: path.join(__dirname, './dist'),
        filename: "analyze.js"
    },
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                loader: "babel-loader",
                query: {presets: ['es2015']}
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};