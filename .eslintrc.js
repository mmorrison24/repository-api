module.exports = {
  extends: ["plugin:jest/recommended", "eslint:recommended", "plugin:import/recommended", "prettier", "plugin:prettier/recommended"],
  plugins: ["import", "prettier"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    node: true,
    commonjs: true,
    es6: true,
    mocha: true,
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    //? plugin :>> eslint-config-prettier

    //? plugin :>>  eslint-plugin-import
    "import/no-unresolved": [2, { commonjs: true, amd: true }],
    "import/named": 2,
    "import/namespace": 2,
    "import/default": 2,
    "import/export": 2,

    //? plugin :>>  eslint-plugin-jest
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",

    // indent: ["warn", 2, { SwitchCase: 1, ignoredNodes: ["ConditionalExpression"] }],
    quotes: ["warn", "double"],
    "no-console": "warn",
    semi: ["error", "always"],
    "comma-spacing": ["warn", { before: false, after: true }],
    "semi-spacing": ["error", { before: false, after: true }],
    "key-spacing": ["error", { beforeColon: false, afterColon: true }],
    // "linebreak-style": ["error", "unix"],
    "switch-colon-spacing": ["error", { after: true, before: false }],
    "object-curly-spacing": ["error", "always", { objectsInObjects: true }],
    "multiline-ternary": ["error", "always-multiline"],
    "arrow-body-style": ["error", "as-needed"],
    "no-empty": "error",
    "no-unused-vars": "error",
    "no-undef": "error",
    curly: ["error", "multi-or-nest", "consistent"],
  },
  //! module alias
  // settings: {
  //   "import/resolver": {
  //     alias: {
  //       extensions: [".js"],
  //       map: [["@", "."]],
  //     },
  //   },
  // },
};
