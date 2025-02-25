// .prettierrc.cjs 文件
// @see https://prettier.io/docs/en/options
module.exports = {
  $schema: 'https://json.schemastore.org/prettierrc',
  printWidth: 200,
  tabWidth: 2, // 2个空格
  useTabs: false,
  semi: false, // 在语句末尾添加分号
  singleQuote: true, // 使用单引号而非双引号
  arrowParens: 'always', // 在单参数箭头函数参数周围加上括号
  quoteProps: 'preserve', // 保留对象属性的引号
  jsxSingleQuote: true, // JSX 引号
  trailingComma: 'none', // 尾随逗号
  bracketSpacing: true, // 支架间距
  bracketSameLine: false, // 标签括号闭合位置
  arrowParens: 'avoid', // 箭头函数括号 "avoid"- 尽可能省略括号
  vueIndentScriptAndStyle: false // Vue 文件脚本和样式标签缩进
}
