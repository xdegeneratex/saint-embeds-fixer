import vueTsEslintConfig from '@vue/eslint-config-typescript';
import eslintConfigPrettier from 'eslint-config-prettier';
import oxlint from 'eslint-plugin-oxlint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginVue from 'eslint-plugin-vue';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      "@typescript-eslint/ban-ts-comment": "off"
    },
  },
  eslintConfigPrettier,
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  oxlint.configs['flat/recommended'],
];
