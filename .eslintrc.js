module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:promise/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 7,
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'unused-imports',
    'prettier',
    'promise',
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 0,
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 2,
    'unused-imports/no-unused-vars': 1,
    'arrow-parens': [
      'error',
      'as-needed',
      {
        requireForBlockBody: false,
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {},
    },
  },
};
