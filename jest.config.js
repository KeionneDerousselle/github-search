module.exports = {
  testMatch: ['<rootDir>/**/*.spec.js'],

  globals: {
    'vue-jest': {
      babelConfig: true
    }
  },

  moduleNameMapper: {
    '\\.(css|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest.fileMock.js',
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },

  moduleFileExtensions: [
    'js',
    'vue',
    'json'
  ],

  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    'vee-validate/dist/rules': '<rootDir>/node_modules/babel-jest'
  },

  transformIgnorePatterns: [ '<rootDir>/node_modules/(?!vee-validate/dist/rules)', '/node_modules/(?!vee-validate/dist/rules)' ],

  collectCoverage: true,

  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },

  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/layouts/**/*.vue',
    '<rootDir>/middleware/**/*.vue',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/plugins/**/*.js',
    '<rootDir>/store/**/*.js',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],

  setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.afterEnv.js'],

  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue']
}
