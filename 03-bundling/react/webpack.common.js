import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default {
  context: path.resolve(__dirname, "./src"),
  entry: {
    app: "./index.tsx",
  },
  resolve: {
    extensions: [".tsx", ".jsx", ".js", ".ts"],
  },
  output: {
    filename: "[name].[chunkhash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(tsx|jsx|js)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(png)$/i,
        type: "asset/resource",
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      scriptLoading: "blocking",
    }),
  ],
};
