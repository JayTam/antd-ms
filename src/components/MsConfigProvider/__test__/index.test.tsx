import { MsConfigProvider } from '@jaytam/antd-ms';
import { asyncRenderPreset } from '@jaytam/antd-ms/tests/utils';
import { screen } from '@testing-library/react';
import { defaultContextValue } from '../provider';

function Child() {
  const { storeNameSpace, resourceApiVersion } = MsConfigProvider.useConfig();
  return (
    <>
      {storeNameSpace}
      {resourceApiVersion}
    </>
  );
}

describe('MsConfigProvider', () => {
  test('props 传参正常', async () => {
    await asyncRenderPreset(
      <MsConfigProvider storeNameSpace="testName">
        <Child />
      </MsConfigProvider>,
    );

    expect(screen.getByText('testName')).toBeInTheDocument();
  });

  test('setConfig 函数正常', async () => {
    MsConfigProvider.setConfig({ storeNameSpace: 'testName' });

    expect(defaultContextValue.storeNameSpace).toBe('testName');
  });

  test('props sentry', async () => {
    await asyncRenderPreset(
      <MsConfigProvider
        sentryInfo={{
          devEnable: true,
          dsn: 'https://cdb10d63cc8445d08cffea9c38e55ef2@sentry-relay.msxf.com/178',
        }}
      >
        <Child />
      </MsConfigProvider>,
    );

    expect(window).toHaveProperty('__SENTRY__');
  });
});
