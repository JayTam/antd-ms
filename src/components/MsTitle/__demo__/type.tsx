/**
 * title: 类型
 * description:
 */

import { MsTitle } from '@jaytam/antd-ms';

export default () => {
  return (
    <>
      <MsTitle title="普通 - common" titleType="common" />
      <MsTitle title="标志 - flag" titleType="flag" />
      <MsTitle title="渐变 - gradient（马上云专用类型）" titleType="gradient" />
      <MsTitle title="区块 - block（devops专用类型）" titleType="block" />
    </>
  );
};
