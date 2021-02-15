const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.js|\.wasm$/,
        exclude: [path.resolve("static/wasm/")],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html", title: "hello-wasm" }),
    new WasmPackPlugin({ crateDirectory: path.resolve(__dirname, "."), outDir: "static/wasm" }),
    // needed for MS Edge support
    new webpack.ProvidePlugin({
      TextDecoder: ["text-encoding", "TextDecoder"],
      TextEncoder: ["text-encoding", "TextEncoder"],
    }),
  ],
};
