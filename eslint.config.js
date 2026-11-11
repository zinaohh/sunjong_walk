import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
  },
  // 레이어 규칙: domain은 data·presentation·React를 모르고, data는 presentation을 모른다.
  // 화면(Screen)·공통 컴포넌트는 저장소(data)를 직접 부르지 않는다. 뷰모델에서만 부른다.
  // 정규식은 '@/data', '@/data/...', '../data/...' 처럼 별칭·상대경로를 모두 잡는다.
  {
    files: ['src/domain/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { regex: '(^@/|\\.\\./)(data|presentation)(/|$)' },
            { group: ['react', 'react-*'] },
          ],
        },
      ],
    },
  },
  {
    files: ['src/data/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [{ regex: '(^@/|\\.\\./)presentation(/|$)' }, { group: ['react', 'react-*'] }],
        },
      ],
    },
  },
  {
    files: ['src/presentation/**/*Screen.tsx', 'src/presentation/components/**'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [{ regex: '(^@/|\\.\\./)data(/|$)' }] }],
    },
  },
]);
