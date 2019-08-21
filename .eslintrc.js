const paths = require('./config/paths')

module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  globals: {
    __BROWSER__: true,
    __SERVER__: true,
    Promise: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    mocha: true
  },
  settings: {
    'import/resolver': {
      node: {
        paths: paths.resolveModules,
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },
    react: {
      version: 'detect'
    }
  },
  rules: {
    'import/no-unassigned-import': 0,
    'import/no-named-as-default-member': 0
  },
  overrides: [{ files: ['*.tsx'], rules: { 'import/named': 0 } }]
}
