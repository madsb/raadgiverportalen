module.exports = {
  env: {
    browser: true,
    es6: true
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx']
      },
      typescript: {
        alwaysTryTypes: true // always try to resolve types under `<roo/>@types` directory even it doesn't contain any source code, like `@types/unist`
      }
    },
    'import/core-modules': ['dkfds'],
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:vue/recommended',
    'prettier/@typescript-eslint',
    'prettier/vue'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.json'],
    sourceType: 'module',
    extraFileExtensions: ['.vue']
  },
  plugins: ['vue', '@typescript-eslint/eslint-plugin', '@typescript-eslint/tslint'],
  ignorePatterns: ["build/**"],
  rules: {
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    'vue/custom-event-name-casing': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    'vue/one-component-per-file': 'off',
    'vue/no-v-html': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/adjacent-overload-signatures': 'warn',
    '@typescript-eslint/array-type': 'warn',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/consistent-type-assertions': 'warn',
    '@typescript-eslint/consistent-type-definitions': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'off',
      {
        accessibility: 'explicit'
      }
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'warn',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        }
      }
    ],
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-misused-new': 'warn',
    '@typescript-eslint/no-namespace': 'warn',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/prefer-for-of': 'warn',
    '@typescript-eslint/prefer-function-type': 'warn',
    '@typescript-eslint/prefer-namespace-keyword': 'warn',
    '@typescript-eslint/quotes': ['warn', 'single'],
    '@typescript-eslint/semi': ['warn', 'always'],
    '@typescript-eslint/triple-slash-reference': 'warn',
    '@typescript-eslint/type-annotation-spacing': 'warn',
    '@typescript-eslint/unified-signatures': 'warn',
    'arrow-body-style': 'warn',
    'arrow-parens': ['off', 'as-needed'],
    camelcase: 'warn',
    'comma-dangle': 'off',
    complexity: 'off',
    'constructor-super': 'warn',
    curly: 'warn',
    'dot-notation': 'warn',
    'eol-last': 'warn',
    eqeqeq: ['warn', 'smart'],
    'guard-for-in': 'off',
    'id-blacklist': ['warn', 'any', 'Number', 'number', 'String', 'string', 'Boolean', 'boolean'],
    'id-match': 'warn',
    'import/order': 'off',
    'max-classes-per-file': ['warn', 1],
    'max-len': 'off',
    'new-parens': 'warn',
    'no-bitwise': 'warn',
    'no-caller': 'warn',
    'no-cond-assign': 'warn',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-empty': 'warn',
    'no-eval': 'warn',
    'no-fallthrough': 'off',
    'no-invalid-this': 'off',
    'no-multiple-empty-lines': 'off',
    'no-new-wrappers': 'warn',
    'no-shadow': [
      'warn',
      {
        hoist: 'all'
      }
    ],
    'no-throw-literal': 'warn',
    'no-trailing-spaces': 'warn',
    'no-undef-init': 'warn',
    'no-underscore-dangle': 'warn',
    'no-unsafe-finally': 'warn',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'warn',
    'no-unused-labels': 'warn',
    'no-var': 'warn',
    'object-shorthand': 'off',
    'one-var': ['warn', 'never'],
    'prefer-arrow/prefer-arrow-functions': 'off',
    'prefer-const': 'warn',
    'quote-props': ['warn', 'as-needed'],
    radix: 'warn',
    'space-before-function-paren': [
      'warn',
      {
        anonymous: 'never',
        asyncArrow: 'always',
        named: 'never'
      }
    ],
    'spaced-comment': 'warn',
    'use-isnan': 'warn',
    'valid-typeof': 'off',
    '@typescript-eslint/tslint/config': [
      'error',
      {
        rules: {
          'no-non-null-assertion': false,
          'import-spacing': true,
          'jsdoc-format': false,
          'no-reference-import': false,
          'one-line': [true, 'check-catch', 'check-else', 'check-finally', 'check-open-brace', 'check-whitespace'],
          whitespace: [true, 'check-branch', 'check-decl', 'check-operator', 'check-separator', 'check-type', 'check-typecast']
        }
      }
    ]
  }
};
