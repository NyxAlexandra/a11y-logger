const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    foreground: "./src/foreground.ts",
    popup: "./src/popup.ts",
  },
  output: {
    filename: "[name].js",
    sourceMapFilename: "[name].js.map",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
    modules: ["./src", "./node_modules"],
  },
  devtool: false,
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./dist" }],
    }),
  ],
};
