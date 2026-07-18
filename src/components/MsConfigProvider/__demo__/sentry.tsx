/**
 * title: sentry 接入
 * description:
 */
import { MsConfigProvider } from '@jaytam/antd-ms';

const App = () => {
  return (
    <MsConfigProvider
      sentryInfo={{
        dsns: {
          'online-sentry-dsn': '',
          'offline-sentry-dsn': '',
        },
        release: '1.0.1-beta.1',
      }}
    >
      <></>
    </MsConfigProvider>
  );
};

export default App;
