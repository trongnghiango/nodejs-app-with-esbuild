module.exports = {
  env: {
    commonjs: true,
    node: true,
    es6: true,
  },
  extends: [
    "airbnb-base",
    "prettier",
    "plugin:node/recommended",
    // "eslint:recommended,"
  ],
  // globals: {
  //   "Atomics": "readonly",
  //   "SharedArrayBuffer": "readonly"
  // },
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ["prettier"],
  rules: {
    // "no-implicit-globals": ["error", "always"],
    "prettier/prettier": "error",
    'import/no-unresolved': [2, { commonjs: true, amd: true }],
    "import/no-extraneous-dependencies": ["off", { "devDependencies": false, "optionalDependencies": false, "peerDependencies": false }],
    "prettier/prettier": "error",
    "no-unused-vars": "warn",
    "no-undef": "error",
    "no-console": "off",
    "func-names": "off",
    "no-plusplus": "off",
    "no-process-exit": "off",
    "class-methods-use-this": "off",
    "max-classes-per-file": "off",
    "prefer-regex-literals": "warn",
    camelcase: "off",
    "no-underscore-dangle": "off",
    "no-shadow": [
      "warn",
      {
        hoist: "all",
      },
    ],
    "node/no-unsupported-features/es-syntax": [
      "error",
      {
        version: ">=8.0.0",
        ignores: [],
      },
    ],
  },
};
