module.exports = {
  // entry point needs to be entry.jsx
  entry: './client/entry.jsx',
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
        },
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
        include: /flexboxgrid/,
      },
    ],
  },
};
