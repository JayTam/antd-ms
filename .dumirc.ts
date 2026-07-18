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
    footer: 'Copyright © 2025 | 智能云基础设施部-前端研发团队',
    socialLinks: { gitlab: 'http://codelab.msxf.com/gc-common/gc-ui-fe/-/tree/dev-master' },
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
      {
        title: 'Ms-Configs',
        link: 'http://gc-configs-fe.msxf.msxfyun.test/',
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
    memo.plugin('monaco-editor-webpack-plugin').use(new MonacoWebpackPlugin());
    return memo;
  },
  proxy: {
    '/portal': {
      target: 'http://mscloud-dev7.msxf.msxfyun.test/',
      changeOrigin: true,
    },
    '/noauth/': {
      target: 'http://mscloud-dev7.msxf.msxfyun.test/',
      changeOrigin: true,
    },
    '/admin/': {
      target: 'http://mscloud-admin.msxfcloud.test',
      changeOrigin: true,
    },
    '/msxfjacp/': {
      target: 'http://devops.msxf.local',
      changeOrigin: true,
    },
    '/nitsm/': {
      target: 'http://nitsm.msxf.local',
      changeOrigin: true,
      pathRewrite: {
        //替换规则
        '^/nitsm': '/',
      },
    },
    '/api/doc': {
      headers: {
        token: 'C7UEZP2K6TNMD5AWPV658N3GP83AERTH',
        sysName: 'gc-resource-plt',
      },
      target: 'http://doc-server-dev.msxf.msxfyun.test',
      changeOrigin: true,
    },
  },
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
