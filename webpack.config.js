const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || "development";
const devmode = mode === "development";
const target = devmode ? "web" : "browserslist";
const devtool = devmode ? "source-map" : undefined;

module.exports = {
  mode,
  target,
  devtool,
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          esModule: false,
          preprocessor: processHtmlLoader,
          sources: {
            list: [
              "...",
              {
                tag: "a",
                attribute: "href",
                type: "src",
              },
            ],
          },
        },
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devmode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp)$/i,
        include: [
          path.resolve(__dirname, 'src', 'img')
        ],
        type: "asset/resource",
        generator: {
          filename: "img/[contenthash][ext]",
        },
      },
      {
        test: /.*$/i,
        include: [
          path.resolve(__dirname, 'src', 'files')
        ],
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
};

// https://github.com/webpack-contrib/html-loader/issues/291#issuecomment-877797830
function processNestedHtml(content, loaderContext, resourcePath = "") {
  let fileDir =
    resourcePath === ""
      ? path.dirname(loaderContext.resourcePath)
      : path.dirname(resourcePath);
  const INCLUDE_PATTERN =
    /\<include src=\"(\.\/)?(.+)\"\s?\/?\>(?:\<\/include\>)?/gi;

  function replaceHtml(match, pathRule, src) {
    if (pathRule === "./") {
      fileDir = loaderContext.context;
    }
    const filePath = path.resolve(fileDir, src);
    loaderContext.dependency(filePath);
    const html = fs.readFileSync(filePath, "utf8");
    return processNestedHtml(html, loaderContext, filePath);
  }

  if (!INCLUDE_PATTERN.test(content)) {
    return content;
  } else {
    return content.replace(INCLUDE_PATTERN, replaceHtml);
  }
}

function processHtmlLoader(content, loaderContext) {
  let newContent = processNestedHtml(content, loaderContext);
  return newContent;
}
