module.exports = {
  entry: {
    main: "./src/app.js"
  },
  output: { "filename": "[name].js" },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
};