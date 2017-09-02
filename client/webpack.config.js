const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.less$/,
        loader: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff&name=./[hash].[ext]"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  },
  resolve: {
    // add following extension when module can not be found
    extensions: [".js", ".jsx"],
    modules: ["client", "node_modules"]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: "./public",
    port: 3010,
    proxy: {
      "/api/*": {
        target: "http://localhost:8010"
      }
    }
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "./index.html" },
      { from: "./style", to: "style" } // Copy directory contents to {output}/dir/
    ])
  ]
};
