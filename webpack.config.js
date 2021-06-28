const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production'
  const isDev = !isProd

  console.log('isProd', isProd)
  console.log('isDev', isDev)

  const filename = (ext) =>
    isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`

  const plugins = () => {
    const base = [
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
      }),
      new MiniCssExtractPlugin({
        filename: filename('css')
      })
    ]
    if (isDev) {
      base.push(new ESLintPlugin())
    }
    return base
  }

  return {
    target: 'web', // browser page is auto updated without server restart
    context: path.resolve(__dirname, 'src'),
    entry: {
      // entry point
      main: './index.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      // [name] is retrieved from entry: {main: './index.js'},
      // e.g. main.bundle.js
      filename: filename('js'),
      clean: true
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
    devServer: {
      port: '3000',
      open: true,
      // hot: true
      watchContentBase: true
    },
    // see in which file changes were made
    devtool: isDev ? 'source-map' : false,
    plugins: plugins(),
    module: {
      // loaders
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader', // Translates CSS into CommonJS
            'sass-loader', // Compiles Sass to CSS
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    }
  }
}
