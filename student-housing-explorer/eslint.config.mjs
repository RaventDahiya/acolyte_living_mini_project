import expoConfig from 'eslint-config-expo/flat.js';

export default [
  ...expoConfig,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react-hooks/exhaustive-deps': 'warn',
    },
    ignores: ['node_modules/', 'dist/', 'build/', '.expo/', '*.config.js', '*.config.ts', '*.config.mjs'],
  },
];
