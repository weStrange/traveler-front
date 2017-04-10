'use strict'
var webpackConfig = require('./webpack.config.js')
// webpackConfig.entry = {}
webpackConfig.node = {
  fs: 'empty'
}
var PhantomJSScreenShot = {
  base: 'PhantomJS'
}

module.exports = function (karma) {
  karma.set({
    frameworks: [ 'jasmine' ],

    files: [
      'src/**/__tests__/**/*-test.js'
    ],

    reporters: [ 'spec' ],

    preprocessors: {
      'src/**/__tests__/**/*-test.js': ['webpack']
    },

    browsers: [
      'PhantomJS',
      'Chrome',
      'Firefox',
      'IE',
      'IE_noaddons'
    ],
    customLaunchers: {
      IE_noaddons: {
        base: 'IE',
        flags: ['-extoff']
      },
      PhantomJSScreenShot: PhantomJSScreenShot
    },

    plugins: [
      'karma-jasmine',
      'karma-spec-reporter',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-ie-launcher',
      'karma-webpack'
    ],

    concurrency: Infinity,

    browserNoActivityTimeout: 1000 * 60 * 7,
    browserDisconnectTimeout: 1000 * 60 * 7,
    browserDisconnectTolerance: 3,

    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  })
}
