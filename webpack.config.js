const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function() {
  var mode = 'production'/*production*//*development*/;

  var entry = {
    app: './src/index.js',
  };

  var output = {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }

  var plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunksSortMode: 'none',
      filename: 'index.html',
      template: './templateHTML.html',
      meta: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      favicon: './public/favicon.ico'
    }),
  ]

  return {
    mode: mode,
    entry: entry,
    output: output,
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      watchContentBase: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env','@babel/preset-react'],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-transform-runtime',
                [require('babel-plugin-transform-imports'), {
                  '@material-ui/core': {
                    transform: function(importName, matches) {
                      return '@material-ui/core/esm/' + importName
                    },
                    preventFullImport: true
                  },
                  '@material-ui/icons': {
                    transform: function(importName, matches) {
                      return '@material-ui/icons/esm/' + importName
                    },
                    preventFullImport: true
                  }
                }]
              ]
            }
          }
        },
        {
          test: /plugin\.css$/,
          loaders: [
            'style-loader', 'css',
          ],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
          use: [ 'raw-loader' ]
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        },
        {
          test: /\.(png|svg|jpe?g|gif|pdf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
          exclude: [
            /\.(js|jsx|mjs)$/,
            /\.html$/,
            /\.json$/,
            /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
            /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/
          ],
        },

      ],
    },
    plugins: plugins,

  }
}
