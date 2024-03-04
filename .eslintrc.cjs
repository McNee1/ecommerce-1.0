module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',

    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'simple-import-sort', 'import', 'perfectionist'],
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          [
            '^react',
            '^@?\\w',
            '^(app|pages|widgets|features|entities|shared|main)(/.*|$)',
            '^\\u0000',
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
            '^.+\\.s?css$',
          ],
        ],
      },
    ],

    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'perfectionist/sort-interfaces': 'error',
    'perfectionist/sort-jsx-props': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
        groups: ['multiline', 'unknown', 'shorthand'],
      },
    ],

    // 'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
  },
};
