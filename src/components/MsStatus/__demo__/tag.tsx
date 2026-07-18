/**
 * title: 标签
 * description:
 */

import { MsStatus } from '@jaytam/antd-ms';
import { Divider, Space } from 'antd';

export default () => {
  return (
    <>
      <Space wrap>
        <MsStatus type="tag" color="success">
          success
        </MsStatus>
        <MsStatus type="tag" color="processing">
          processing
        </MsStatus>
        <MsStatus type="tag" color="error">
          error
        </MsStatus>
        <MsStatus type="tag" color="warning">
          warning
        </MsStatus>
        <MsStatus type="tag" color="default">
          default
        </MsStatus>
      </Space>
      <Divider />
      <Space wrap>
        <MsStatus type="tag" color="red">
          red
        </MsStatus>
        <MsStatus type="tag" color="coral">
          coral
        </MsStatus>
        <MsStatus type="tag" color="darkKhaki">
          darkKhaki
        </MsStatus>
        <MsStatus type="tag" color="green">
          green
        </MsStatus>
        <MsStatus type="tag" color="royalBlue">
          royalBlue
        </MsStatus>
        <MsStatus type="tag" color="cadetBlue">
          cadetBlue
        </MsStatus>
        <MsStatus type="tag" color="darkGrey">
          darkGrey
        </MsStatus>
        <MsStatus type="tag" color="steelBlue">
          steelBlue
        </MsStatus>
        <MsStatus type="tag" color="blueViolet">
          blueViolet
        </MsStatus>
        <MsStatus type="tag" color="mediumVioletRed">
          mediumVioletRed
        </MsStatus>
        <MsStatus type="tag" color="mediumVioletRed">
          mediumVioletRed
        </MsStatus>
        <MsStatus type="tag" color="yellowGreen">
          yellowGreen
        </MsStatus>
        <MsStatus type="tag" color="darkBlue">
          darkBlue
        </MsStatus>
      </Space>
    </>
  );
};
