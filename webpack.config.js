const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        // entrypoint
        main: './index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // [name] is retrieved from entry: {main: './index.js'}, e.g. main.bundle.js
        filename: '[name].bundle.js'
    },
    resolve: {
        // no need to write file.js when importing, just file
        extensions: ['.js'],
        alias: {
            // when importing, src folder will just @
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'core'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                },
            ],
        })
    ]
}