const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const json5 = require('json5');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/output_file'
  },
  mode: 'development',  


  module: {
    rules:[
      {
          //I added |jsx
        test: /\.m?js|jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.json5$/i,
        loader: 'json5-loader',
        options: {
          esModule: false,
        },
        type: 'javascript/auto'
      },
      {
        test: /\.(scss|css)$/,
        use: [          
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Convert modern CSS into something most browsers can understand
          "postcss-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },

    ]
  },
  devServer: {
    contentBase: __dirname + 'output_file',
    compress: true,
    port: 9000
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template.html'
    })
  ]
};