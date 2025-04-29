const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    popup: "./src/popup.ts",
    foreground: "./src/foreground.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
    assetModuleFilename: "assets/[name][ext]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        resourceQuery: /url/,
      },
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".css"],
    modules: ["./src", "./static", "./node_modules"],
  },
  devtool: false,
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./static/**/*", to: "[name][ext]" }],
    }),
  ],
};
