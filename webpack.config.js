module.exports = {
  entry: {
    main: "./src/test1.js"
  },
  output: { "filename": "[name].js" },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
};