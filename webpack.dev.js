const webpack = require('webpack');

module.exports =  {
  /* ... */
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: __dirname + 'output_file',
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
};