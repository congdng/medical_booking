const webpack = require('webpack'); 
module.exports = function override(config) { 
    const fallback = config.resolve.fallback || {}; 
    Object.assign(fallback, { 
      "crypto": require.resolve("crypto-browserify"), 
      "stream": require.resolve("stream-browserify"), 
      "assert": require.resolve("assert/"), 
      "http": require.resolve("stream-http"), 
       "buffer": require.resolve("buffer/"),
       "util": require.resolve("util/") ,
       "path": require.resolve("path-browserify") ,
    //   "https": require.resolve("https-browserify"), 
    //   "os": require.resolve("os-browserify"), 
      "url": require.resolve("url") ,
    "zlib": require.resolve("browserify-zlib"),
    "querystring": require.resolve("querystring-es3"),
    'process/browser': require.resolve('process/browser'),
    "fs": require.resolve("browserify-fs"),
    "net": require.resolve("net-browserify"),

      }) 
   config.resolve.fallback = fallback; 
   config.plugins = (config.plugins || []).concat([ 
     new webpack.ProvidePlugin({ 
      process: 'process/browser', 
      Buffer: ['buffer', 'Buffer'] 
    }) 
   ]) 
   return config; }