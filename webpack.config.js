module.exports = {
  entry: {
      main : './src/index.js',
  },

  output: {
      path: __dirname + '/public',
      filename: 'index.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },
        {
            test: /\.css/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                }
            ]
        },
        {
            test: /\.(png|jpeg|jpg)$/,
            loader: 'file-loader'
        }
    ]
  }
};