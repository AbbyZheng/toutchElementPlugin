module.exports = {
  root: true,
  parser: 'babel-eslint',
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  // required to lint *.vue files
  plugins: [
    'html', 'import'
  ],
  // add your custom rules here
  'rules': {
    'strict': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // detect import error
    'import/no-unresolved': [2, {commonjs: true}]
    // allow debugger during development
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  'settings': {
    'import/resolver': {
      webpack: { config: './webpack/webpack.base.conf.js' }
    }
  }
}
