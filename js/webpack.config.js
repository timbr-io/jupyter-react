var version = require('./package.json').version;

var loaders = [
    { 
      test: /\.json$/, loader: 'json-loader' 
    }
];

const babelSettings = {
  plugins: [
    'transform-flow-strip-types',
    'add-module-exports',
    'transform-regenerator',
    'transform-decorators-legacy'
  ],
  presets: [ 'es2015', 'react', 'stage-1' ]
};


module.exports = [
    {
      entry: './src/index.js',
      output: {
          filename: 'index.js',
          path: '../jupyter_react/static',
          libraryTarget: 'amd'
      },
      module : {
        loaders : [
          {
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,
            loaders: [`babel?${JSON.stringify( babelSettings )}`]
          }
        ]
      }
    }
];
