/* eslint-disable no-var */
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new HtmlWebpackPlugin({
      template: "src/blog/index.html",
      filename: "blog/index.html",
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/img/", to: "img/" },
        { from: "src/blog/img", to: "blog/img" },
        { from: "src/css/", to: "css/" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader?modules"],
      },
    ],
  },
};
