import { defineConfig } from 'father';
import path from 'path';

export default defineConfig({
  esm: {
    output: 'es',
    ignores: ['src/**/__demo__/**', 'src/__docs__/**'],
  },
  cjs: {
    output: 'lib',
    ignores: ['src/**/__demo__/**', 'src/__docs__/**'],
  },
  alias: {
    '@jaytam/antd-ms/hooks': path.join(__dirname, 'src/hooks'),
    '@jaytam/antd-ms/locale': path.join(__dirname, 'src/locale'),
    '@jaytam/antd-ms/utils': path.join(__dirname, 'src/utils'),
  },
  // more father 4 config: https://github.com/umijs/father-next/blob/master/docs/config.md
});
