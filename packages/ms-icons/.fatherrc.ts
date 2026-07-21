import { defineConfig } from 'father';

export default defineConfig({
  esm: {
    output: 'es',
  },
  cjs: {
    output: 'lib',
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
