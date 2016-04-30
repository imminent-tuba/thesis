module.exports = {
  // entry point to app
  entry: './client/App.jsx',
  // webpack output to client/dist/bundle.js
  output: {
    path: './client/dist',
    publicPath: './client/dist',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        // regular expression for .jsx or .js
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        }
      },
    ]
  }
};
