import { defineConfig } from 'dumi';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

import remarkMeta from './.dumi/remarkMeta';

export default defineConfig({
  favicons: ['/favicon.ico'],
  outputPath: 'dist',
  hash: true,
  title: 'Antd-MS 让中台开发更简单的组件库',
  themeConfig: {
    logo: '/svgs/logo.svg',
    footer: 'Copyright © 2025 JayTam',
    socialLinks: { github: 'https://github.com/JayTam/antd-ms' },
    nav: [
      {
        title: '设计',
        link: '/spec/intro',
      },
      {
        title: '开发',
        link: '/guide/introduce',
      },
      {
        title: 'Components',
        link: '/components',
      },
      {
        title: 'Fields',
        link: '/fields',
      },
    ],
    showLineNum: true,
    prefersColor: {
      switch: false,
    },
  },
  routes: [
    {
      path: '/guide/changelog',
      component: '../../CHANGELOG.md',
    },
  ],
  resolve: {
    codeBlockMode: 'passive',
    docDirs: ['src/docs', './CHANGELOG.md'],
    atomDirs: [
      { type: 'component', dir: 'src/components' },
      { type: 'component', dir: 'src/utils' },
      { type: 'component', dir: 'src/icons' },
      { type: 'component', dir: 'src/hooks' },
      { type: 'field', dir: 'src/fields' },
    ],
  },
  define: {
    'process.env.MSCLOUD_ENV_FE': 'sit',
  },
  chainWebpack: (memo: any) => {
    // dumi 编译期把子包名直接解析到各自源码 src/，不依赖子包 lib/ 构建产物。
    // 这样 Vercel 干净环境无需先 pnpm -r build 子包即可 build:docs。
    // 仅对 dumi 生效，father build 走自己的解析、不受影响。
    const path = require('path');
    memo.resolve.alias
      .set('@jaytam/icons', path.resolve(__dirname, 'packages/ms-icons/src'))
      .set('@jaytam/request-ms', path.resolve(__dirname, 'packages/ms-request/src'))
      .set('@jaytam/schema-render', path.resolve(__dirname, 'packages/schema-render/src'))
      .set('@jaytam/ms-flow', path.resolve(__dirname, 'packages/ms-flow/src'))
      .set('@jaytam/ms-gantt', path.resolve(__dirname, 'packages/ms-gantt/src'));
    memo.plugin('monaco-editor-webpack-plugin').use(new MonacoWebpackPlugin());
    return memo;
  },
  // @visactor/vdataset（ms-gantt 的 vtable 传递依赖）产物含 BigInt 字面量。
  // umi 默认 Terser target 含 es2015，esbuild 在压缩阶段拒转 BigInt 字面量。
  // 改用 swc 压缩器绕开 Terser 的 target 兼容性检查。
  jsMinifier: 'swc',
  // 浏览器 target 提到 chrome87（BigInt 起支持）。
  targets: { chrome: 87 },
  theme: {
    // dumi 主题
    '@s-content-width': 'calc(100% - 10px)',
    '@s-sidebar-width': '240px',
    // antd 主题配置项，不影响组件样式
    '@primary-color': '#106FFB',
    '@font-size-base': '12px',
  },
  extraRemarkPlugins: [remarkMeta],
  analytics: {
    baidu: 'c142383941f0739d8e20e13e26b03bb2',
  },
  // more config: https://d.umijs.org/config
});
