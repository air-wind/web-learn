module.exports = {
  postcssOptions: {
    plugins: [
      require("autoprefixer"),
      require("postcss-preset-env")({
        // 使用未来 CSS 特性
        stage: 3,
        features: { "nesting-rules": true },
      }),
    ],
  },
};
