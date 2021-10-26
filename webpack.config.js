module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "main.js"
  },
  plugins: [htmlPlugin],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }

};