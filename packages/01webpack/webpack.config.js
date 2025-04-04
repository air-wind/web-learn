const path = require("path");
const { loadEnvFile } = require("process");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  devtool: "source-map", // 生成 source map
  entry: "./src/index.ts", // 入口文件
  output: {
    filename: "bundle.js", // 输出文件名
    path: path.resolve(__dirname, "dist"), // 输出目录
  },
  resolve: {
    extensions: [".ts", ".js"], // 支持的文件扩展名
  },
  devServer: {
    static: path.resolve(__dirname, "dist"), // 静态文件目录
    compress: true, // 启用 gzip 压缩
    port: 9000, // 端口号
    hot: true, // 热更新
    open: false, // 自动打开浏览器
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "My Custom Title", // 传递变量到模板
    }),
    new CleanWebpackPlugin.CleanWebpackPlugin(), // 清理输出目录
    new webpack.HotModuleReplacementPlugin(), // 热更新插件, webpack 5.x 版本中配置了hot:true, 会隐式启用
  ],
  module: {
    rules: [
      {
        test: /\.ts$/, // 匹配 .ts 文件
        use: "ts-loader", // 使用 ts-loader 处理
        exclude: /node_modules/,
      },
      // {
      //   test: /\.png$/, // 匹配 .ts 文件
      //   use: {
      //     loader: "file-loader", // 使用 ts-loader 处理
      //     options: {
      //       name: "[name].[hash].[ext]", // 输出文件名
      //       outputPath: "images/", // 输出目录
      //     },
      //   }
      // },
      {
        test: /\.png$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash].[ext]", // 输出文件名
            outputPath: "images/", // 输出目录
            limit: 8192, // 小于8k的图片会被转成base64
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", // 将 CSS 插入到 DOM 中
          {
            loader: "css-loader", // 处理 CSS 文件
            options: {
              importLoaders: 1, // 确保 @import 文件也经过 postcss-loader
            },
          },
          "postcss-loader", // 处理 CSS 前缀
        ],
      },
      // babel-loader 是webpack 与 babel通信的桥梁，@babel/core 是将js转换为AST, @babel/preset-env 是将ES6+转换为ES5的预设规则库
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // 使用 babel-loader 处理
          options: {
            presets: [
              "@babel/preset-env",
              {
                useBuiltIns: "usage", // 按需加载 polyfill
              },
            ], // 使用 @babel/preset-env 预设
          },
        },
      },
    ],
  },
  mode: "production", // 打包模式
};
