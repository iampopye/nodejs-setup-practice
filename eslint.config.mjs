import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

// ESLint 9 uses "flat config". `eslint-config-next` is still published in the
// older eslintrc format, so FlatCompat translates it — this is the same shim
// `create-next-app` generates.
const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'node_modules/**',
      // Build artefact produced by scripts/build-css.mjs
      'styles/generated/**',
    ],
  },
  ...compat.extends('next/core-web-vitals'),
];

export default eslintConfig;
