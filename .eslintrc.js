module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}',
        '**/*.ts',
        '**/*.tsx'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    '@typescript-eslint/restrict-plus-operands': 'error',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-indent': [2, 4],
    'react/jsx-indent-props': [2, 4],
    quotes: ['error', 'single'],
    'react/jsx-uses-react': 'error',
    'eol-last': ['error', 'never'],
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'no-return-await': 'off',
    'no-unused-vars': 'off',
    'no-trailing-spaces': 'off',
    'multiline-ternary': ['error', 'always-multiline'],
    '@typescript-eslint/strict-boolean-expressions': 'off' // правило предупреждает, использование выражения, которое может быть неявно преобразовано в логическое значение. Например, выражение if (someVariable) будет приведено к true, если someVariable не равно false, undefined, null, 0, NaN, или ''.

  }
}