module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(sass|css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     plugins: () => [
          //       require("autoprefixer")()
          //     ],
          //   },
          // },
          // 'sass-loader',
        ]
      }
    ]
  }
};