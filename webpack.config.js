/* eslint-disable max-len */
/* eslint-disable no-var */
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const path = require("path");

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
        { from: "src/blog/style.css", to: "blog/style.css" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader?modules"],
      },
      {
        test: /\.js$/,
        use: ["awesome-typescript-loader"],
        include: [path.resolve(__dirname, "src/common"), path.resolve(__dirname, "src/about"), path.resolve(__dirname, "src/blog"), path.resolve(__dirname, "src/github")],
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
