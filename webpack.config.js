const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = [
  new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html",
    chunks: ['client']
  })
];

module.exports = {
  optimization: {
    // We no not want to minimize our code.
    //minimize: false
  },
  entry: {
    main: "./src/app.js",
    client: "./src/client.js"
  },
  output: { "filename": "[name].js" },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
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
  plugins: htmlPlugin
};