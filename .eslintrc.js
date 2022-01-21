module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    project: 'tsconfig.json',
    sourceType: 'module', // Allows for the use of imports
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 1,
    'no-console': 'error',
    '@typescript-eslint/adjacent-overload-signatures': [1], // 1=warn
    '@typescript-eslint/await-thenable': ['error'],
    '@typescript-eslint/ban-ts-comment': ['error'],
    '@typescript-eslint/ban-types': [
      1, // 1=warn
      {
        types: {
          '{}': {
            message: 'Use /src/utils/interfaces UnknownObject type',
          },
        },
      },
    ],
    '@typescript-eslint/no-empty-interface': ['warn'],
    '@typescript-eslint/no-explicit-any': ['error'],
    '@typescript-eslint/no-extra-non-null-assertion': ['error'],
    '@typescript-eslint/no-extraneous-class': [
      'warn',
      {
        allowConstructorOnly: true,
        allowStaticOnly: true,
        allowWithDecorator: true,
      },
    ],
    '@typescript-eslint/no-floating-promises': ['error'],
    '@typescript-eslint/no-for-in-array': ['error'],
    '@typescript-eslint/no-inferrable-types': ['warn'],
    '@typescript-eslint/no-misused-new': ['error'],
    '@typescript-eslint/no-namespace': ['error'],
    '@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],
    '@typescript-eslint/no-this-alias': ['warn'],
    '@typescript-eslint/no-unnecessary-type-assertion': ['error'],
    '@typescript-eslint/no-unnecessary-type-constraint': ['error'],
    '@typescript-eslint/no-unsafe-argument': ['error'],
    '@typescript-eslint/no-unsafe-assignment': ['error'],
    '@typescript-eslint/no-unsafe-call': ['error'],
    '@typescript-eslint/no-unsafe-member-access': ['error'],
    '@typescript-eslint/no-unsafe-return': ['error'],
    '@typescript-eslint/no-var-requires': ['warn'],
    '@typescript-eslint/prefer-as-const': ['error'],
    '@typescript-eslint/prefer-namespace-keyword': ['error'],
    '@typescript-eslint/restrict-plus-operands': ['warn'],
    '@typescript-eslint/restrict-template-expressions': ['warn'],
    '@typescript-eslint/triple-slash-reference': ['error'],
    '@typescript-eslint/unbound-method': ['error'],
    '@typescript-eslint/no-array-constructor': ['warn'],
    '@typescript-eslint/no-empty-function': ['warn'],
    '@typescript-eslint/no-extra-semi': ['warn'],
    '@typescript-eslint/no-implied-eval': ['error'],
    '@typescript-eslint/no-loss-of-precision': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/require-await': ['warn'],
  },
};
