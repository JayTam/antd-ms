import { Config, configUmiAlias, createConfig } from 'umi/test';

export default async () => {
  try {
    const config = await configUmiAlias({
      ...createConfig({
        target: 'browser',
        jsTransformer: 'esbuild',
        // config opts for esbuild , it will pass to esbuild directly
        jsTransformerOpts: { jsx: 'automatic' },
      }),
      testEnvironment: 'jsdom',
      // https://jestjs.io/zh-Hans/docs/next/configuration/#testenvironmentoptions-object
      testEnvironmentOptions: {
        html: '<html><body></body><script></script></html>',
      },
      setupFilesAfterEnv: ['<rootDir>/src/tests/jest-setup.ts'],
      collectCoverageFrom: [
        'src/components/**/*.{ts,js,tsx,jsx}',
        'src/hooks/**/*.{ts,js,tsx,jsx}',
        'src/utils/**/*.{ts,js,tsx,jsx}',
        '!src/components/__deprecated__/**',
        '!src/components/MsField/components/PartUpload/**',
        '!src/components/MsField/components/DiffEditor/**',
        '!src/components/MsField/components/CodeEditor/**',
        '!src/components/MsField/components/RichText/**',
        '!src/components/NiceModal/**',
        '!src/components/MsDocTips/**',
        '!src/utils/flavor/**',
        '!src/utils/request/**',
        '!src/**/type.{ts,tsx}',
        '!src/**/types.{ts,tsx}',
        '!src/**/service/**',
        '!src/**/services/**',
        '!src/**/__demo__/**',
        '!src/.umi/**',
        '!src/.umi-test/**',
        '!src/.umi-production/**',
      ],
      moduleNameMapper: {
        '^.+\\.(css|less|sass|scss|stylus)$': require.resolve('identity-obj-proxy'),
        '\\.(png|jpg|jpeg|gif)$': 'jest-transform-stub',
        '^@jaytam/antd-ms$': '<rootDir>/src/index.ts',
        '^@jaytam/antd-ms/(.*)$': '<rootDir>/src/$1',
      },
      testPathIgnorePatterns: [
        '/node_modules/',
        '<rootDir>/config/',
        '<rootDir>/mock/',
        '<rootDir>/src/assets/',
        '<rootDir>/.umirc.test.ts',
      ],
      // if you require some es-module npm package, please uncomment below line and insert your package name
      // transformIgnorePatterns: ['node_modules/(?!.*(lodash-es|your-es-pkg-name)/)']
      testTimeout: 1000 * 60 * 5,
      // devops 平台限制，只能调低进程数
      maxWorkers: 2,
    });

    const finalConfig = {
      ...config,
      transform: {
        ...(config as Config.InitialOptions).transform,
        '^.+\\.svg$': '<rootDir>/src/tests/transformers/svg.ts',
      },
    };

    return finalConfig as Config.InitialOptions;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
