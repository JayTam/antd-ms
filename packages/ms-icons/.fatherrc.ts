import { defineConfig } from 'father';

export default defineConfig({
  esm: {
    output: 'lib/esm',
  },
  cjs: {
    output: 'lib/cjs',
  },
  extraBabelPlugins: [
    [
      'inline-react-svg',
      {
        svgo: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
            'removeDimensions',
            'convertStyleToAttrs',
          ],
        },
      },
    ],
  ],
});
