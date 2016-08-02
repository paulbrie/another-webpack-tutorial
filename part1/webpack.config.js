// webpack.config.js
module.exports = {
  entry: './src/app.js',
  output: {
    path: './bin',
    publicPath: '/assets/',
    filename: 'app.bundle.js',
    contentBase: './public'
  }
};