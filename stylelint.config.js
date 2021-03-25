module.exports = {
  extends: ['stylelint-config-standard'],

  plugins: ['stylelint-scss'],

  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'use'
        ]
      }
    ],
    'scss/at-rule-no-unknown': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null
  }
}
