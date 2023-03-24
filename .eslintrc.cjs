module.exports = {
  env: {
    commonjs: true,
    node: true,
    es6: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:node/recommended'],
  // globals: {
  //   "Atomics": "readonly",
  //   "SharedArrayBuffer": "readonly"
  // },
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ['prettier', 'transform-object-rest-spread'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    'no-undef': 'error',
    'no-console': 'off',
    'func-names': 'off',
    'no-plusplus': 'off',
    'no-process-exit': 'off',
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
    'prefer-regex-literals': 'warn',
    camelcase: 'off',
    'no-underscore-dangle': 'off',
    'no-shadow': [
      'warn',
      {
        hoist: 'all',
      },
    ],
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        version: '>=8.0.0',
        ignores: [],
      },
    ],
  },
};
