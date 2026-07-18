/**
 * title: 加载状态
 * description:
 */

import { MsTitle } from '@jaytam/antd-ms';

export default () => {
  return (
    <>
      <MsTitle loading title="标题" />
      <MsTitle loading title="标题" extra={<div />} />
    </>
  );
};
