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
