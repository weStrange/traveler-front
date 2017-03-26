/* eslint-disable no-var */
var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var plugins = [
  new HtmlWebpackPlugin({
    title: 'Tree-shaking',
    template: 'src/index.html'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'SWTOOL_VERSION': JSON.stringify(process.env.SWTOOL_VERSION || 'DEV')
    }
  })
]

if ((process.env.NODE_ENV || 'development') === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      warnings: true
    },
    mangle: {
      expect: ['exports', 'require']
    }
  }))
}

module.exports = {
  node: { fs: 'empty' },
  entry: {
    main: ['babel-polyfill', './src/index']
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'js/bundle.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'react'],
            plugins: [
              'transform-flow-strip-types',
              'transform-class-properties',
              'transform-object-rest-spread'
            ]
          }
        },
        exclude: /node_modules/
      },
      { test: /\.json$/, use: { loader: 'json-loader' } },
      {
        test: /\.css$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'text/css',
            name: 'css/[name].[ext]'
          }
        }
      },
      {
        test: /\.woff$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
            name: 'fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.woff2$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff2',
            name: 'fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.(eot|ttf|svg|gif|png)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      }
    ]
  },

  plugins: plugins
}
