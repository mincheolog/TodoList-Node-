module.exports = {
  entry: './src/index.js',

  output: {
      path: __dirname + '/public',
      filename: 'bundle.js'
  },

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
        }
    ]
  }
};