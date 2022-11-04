const path = require('path');

const options = {
  css: {
    extract: { ignoreOrder: true },
    loaderOptions: {
      scss: {
        sassOptions: {
          outputStyle: 'compressed'
        }
      }
    }
  },
  configureWebpack: {
    output: {
      filename: "[name].[fullhash].js",
    },
    plugins: [
    ],
    optimization: {
      minimize: true
    }
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch');
  },
  publicPath: '/',
  outputDir: '../../../build/generated/vue/static',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname), './src/styles/global.scss']
    }
  },
  runtimeCompiler: true
};

if (process.env.VG_VUE_TRANSPILE === 'true') {
  console.log('⚙️ Transpiling Vue applikation ...');
  options.css.extract = false;

  options.configureWebpack.externals = {
    vue: 'Vue'
  }
}

module.exports = options;