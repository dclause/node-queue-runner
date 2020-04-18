module.exports = {
  root: true,
  env: {
    mocha: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
  plugins: ['prettier'],
  extends: ['prettier', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
  },
};
