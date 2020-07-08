const packageJSON = require('./package.json')

export default {
  // 像 webpack 一样，它有一个入口文件
  input: 'dist/index.js',
  output: {
    file: packageJSON.main,
    format: 'umd',
    name: 'typescriptProLibraryProject',
    sourcemap: true,
  },
}
