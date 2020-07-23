module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'import',
  ],
  rules: {
    'react/state-in-constructor': [2, 'never'],
    'import/no-unresolved': 'off',
    'react/prefer-stateless-function': 'off',
    'import/prefer-default-export': 'off',
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    'import/extensions': [2, { extensions: ['.js', '.jsx'] }],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
  },
};
