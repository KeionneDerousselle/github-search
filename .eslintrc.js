module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [ '@nuxtjs', 'plugin:nuxt/recommended', 'plugin:vue/strongly-recommended' ],
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'array-bracket-newline': [
      'error',
      {
        multiline: true,
        minItems: 4
      }
    ],
    'array-bracket-spacing': [
      'error',
      'always',
      {
        singleValue: false
      }
    ],
    'array-element-newline': [ 'error', 'consistent' ],
    'arrow-body-style': [ 'error', 'as-needed' ],
    'arrow-parens': [ 'error', 'as-needed' ],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'block-spacing': [ 'error', 'always' ],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    curly: [ 'error', 'multi-line' ],
    'default-case': 'error',
    'eol-last': [ 'error', 'always' ],
    eqeqeq: [ 'error', 'always' ],
    'keyword-spacing': 'error',
    'lines-between-class-members': [ 'error', 'always' ],
    'multiline-ternary': [ 'error', 'always-multiline' ],
    'no-alert': 'warn',
    'no-console': 'warn',
    'no-duplicate-imports': 'error',
    'no-lone-blocks': 'error',
    'no-lonely-if': 'error',
    'no-multi-spaces': [
      'error',
      {
        exceptions: {
          BinaryExpression: true,
          VariableDeclarator: true,
          ImportDeclaration: true
        }
      }
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1
      }
    ],
    'no-nested-ternary': 'error',
    'no-trailing-spaces': 'error',
    'no-unneeded-ternary': 'error',
    'no-unused-vars': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-whitespace-before-property': 'error',
    'object-curly-spacing': [ 'error', 'always' ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'multiline-block-like' },
      { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
      { blankLine: 'always', prev: [ 'const', 'let', 'var' ], next: '*' },
      { blankLine: 'any', prev: [ 'const', 'let', 'var' ], next: [ 'const', 'let', 'var' ] }
    ],
    'prefer-const': 'error',
    'prefer-object-spread': 'error',
    quotes: [ 'error', 'single', { avoidEscape: true } ],
    'require-await': 'error',
    semi: [ 'error', 'never' ],
    'space-before-blocks': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'vars-on-top': 'error',
    'vue/attributes-order': 'error',
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never'
      }
    ],
    'vue/html-closing-bracket-spacing': [
      'error',
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'always'
      }
    ],
    'vue/html-quotes': [ 'warn', 'double' ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'vue/no-parsing-error': [
      'error',
      {
        'x-invalid-end-tag': false
      }
    ],
    'vue/prop-name-casing': [ 'error', 'camelCase' ],
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 0,
        switchCase: 0,
        ignores: []
      }
    ],
    yoda: 'error'
  }
}
