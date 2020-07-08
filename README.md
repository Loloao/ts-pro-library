- `.gitignore`[生成此文件](https://www.toptal.com/developers/gitignore)
- 如果想直接用 node 的 api 请`npm i @types/node`
- `jest`是 js 库，ts 需要`npm i jest ts-jest @types/jest`
- `husky`直接在`package.json`中设置`precommit`，比如`"precommit": "npm run test"`
- `lint-stage`将文件进行`prettier`的库，在`package.json`中配置

```typescript
"lint-staged": {
  "src/**/*.ts": [
    "prettier --write --no-semi --single-quote --trailing-comma es5", // --write 将会覆写 running 的文件
    "git add" // 只在 add 后的文件进行 prettier
  }
]

// 在 commit 前进行 prettier
"precommit": "npm run test && lint-staged"
```

- rollup 用于打包库，`npm i rollup rollup-plugin-sourcemaps`，在 package.json 中进行配置

```typescript
{
  "prebuild": "rm -rf dist && rm -rf build",
  "build": "tsc -p tsconfig.json && rollup -c rollup.config.js"
}
```

rollup 通过`rollup.config.js`进行配置

```javascript
const packageJSON = require('./package.json')
const sourceMaps = require('rollup-plugin-sourceMaps')

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
```

使用 rollup 时需要设置`ts.config.json`，使其输出 esModule，如果是其他 module 形式比如`commonjs`，则 rollup 依然会保留 ts 所做的兼容代码`"module": "es2015"`

- 如果想要 publish 库到 npm 需要在`package.json`中加上`"files": ["build"]`，但此时`build`文件夹中没有类型声明文件，所以可以在`package.json`中将类型声明文件在`build`命令执行完之后移动到`build`文件夹中`"postbuild": "cp dist/*.d.ts build/"`
- `package.json`中的命令加上`pre`前缀则会在对应命令之前执行一次，加上`post`则会在对应命令后执行一次
- 发布后的库需要配置类型声明文件，在`package.json`中配置`"types": "build/index.d.ts"`即打包后的类型声明文件路径
- 在`package.json`中配置`"collectCoverage": true`可以输出单元测试覆盖率
- 在`package.json`中配置`"collectCoverageFrom": ["src/**/*.ts"]`可以设置单元测试覆盖率的总文件
- 在`package.json`中配置`"coverageThreshold": { "global": { //各项配置 }}`可以设置覆盖率的门槛，如果没达到则会显示 error
