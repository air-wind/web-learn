const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const { MyPlugin } = require("./custom-plugin.mjs");

module.exports = {
  cache: false,
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
    new MyPlugin({
      name: "my-plugin",
    }), // 自定义插件
  ],
  module: {
    rules: [
      {
        test: /\.ts$/, // 匹配 .ts 文件
        use: [
          {
            // babel-loader 是webpack 与 babel通信的桥梁，@babel/core 是将js转换为AST, @babel/preset-env 是将ES6+转换为ES5的预设规则库
            loader: "babel-loader", // 使用 babel-loader 处理
            options: {
              sourceType: "unambiguous", // 设置为 "unambiguous" 以支持 ES6 模块ss
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: "3",
                  },
                ],
                "@babel/preset-typescript",
              ], // 使用 @babel/preset-env 预设
            },
          },
          {
            loader: "my-loader", // 使用自定义 loader
            options: {
              name: "my-loader",
            },
          },
          "ts-loader",
        ], // 使用 ts-loader 处理
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
    ],
  },
  resolveLoader: {
    alias: {
      "my-loader": path.resolve(__dirname, "custom-loader.js"),
    },
  },
  mode: "production", // 打包模式
};
