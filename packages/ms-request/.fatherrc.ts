import { defineConfig } from 'father';

export default defineConfig({
  esm: {
    output: 'lib/esm',
  },
  cjs: {
    output: 'lib/cjs',
  },
});
