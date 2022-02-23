module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    // FIXME: this rules cause issue with the tsconfig.json file location.
    // The @typescript/await-thenable requires the "parserOptions.project"
    // to be define, for some reason.
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-unused-vars': 'off',

    // React rules
    'react/function-component-definition': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',

    // Typescript rules
    '@typescript-eslint/consistent-type-imports': 'error',

    // Prettier compatibility rules
    // FIXME: Prettier is a fucking mess.
    'prettier/prettier': 'off',
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     endOfLine: 'lf',
    //     semi: false,
    //   },
    //   {
    //     usePrettierrc: true,
    //   },
    // ],
    // Messing with prettier:
    'no-confusing-arrow': 'off',
    indent: 'off',
    '@typescript-eslint/indent': 'off',
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'react/jsx-wrap-multilines': 'off',
    'object-curly-newline': 'off',

    // Other customizations
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
        maxEOF: 2,
      },
    ],
    quotes: 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    semi: ['error', 'never'],
    '@typescript-eslint/semi': ['error', 'never'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-undef': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        typedefs: false,
        enums: false,
        functions: false,
        ignoreTypeReferences: true,
      },
    ],
  },
}
