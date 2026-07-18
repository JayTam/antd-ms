/**
 * title: 基本使用
 * description:
 */

import { MsStatus } from '@jaytam/antd-ms';
import { Divider, Space } from 'antd';

export default () => {
  return (
    <>
      <div>
        <Space wrap>
          <MsStatus color="success">success</MsStatus>
          <MsStatus color="processing">processing</MsStatus>
          <MsStatus color="error">error</MsStatus>
          <MsStatus color="warning">warning</MsStatus>
          <MsStatus color="default">default</MsStatus>
        </Space>
      </div>
      <Divider />
      <div>
        <Space wrap>
          <MsStatus color="red">red</MsStatus>
          <MsStatus color="coral">coral</MsStatus>
          <MsStatus color="darkKhaki">darkKhaki</MsStatus>
          <MsStatus color="green">green</MsStatus>
          <MsStatus color="royalBlue">royalBlue</MsStatus>
          <MsStatus color="cadetBlue">cadetBlue</MsStatus>
          <MsStatus color="darkGrey">darkGrey</MsStatus>
          <MsStatus color="steelBlue">steelBlue</MsStatus>
          <MsStatus color="blueViolet">blueViolet</MsStatus>
          <MsStatus color="mediumVioletRed">mediumVioletRed</MsStatus>
          <MsStatus color="mediumVioletRed">mediumVioletRed</MsStatus>
          <MsStatus color="yellowGreen">yellowGreen</MsStatus>
          <MsStatus color="darkBlue">darkBlue</MsStatus>
        </Space>
      </div>
    </>
  );
};
