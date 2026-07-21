/**
 * title: 重要状态
 * description:
 */

import { MsStatus } from '@jaytam/antd-ms';
import { Divider, Space } from 'antd';

export default () => {
  return (
    <>
      <Space wrap>
        <MsStatus type="lightTag" color="success">
          success
        </MsStatus>
        <MsStatus type="lightTag" color="processing">
          processing
        </MsStatus>
        <MsStatus type="lightTag" color="error">
          error
        </MsStatus>
        <MsStatus type="lightTag" color="warning">
          warning
        </MsStatus>
        <MsStatus type="lightTag" color="default">
          default
        </MsStatus>
      </Space>
      <Divider />
      <Space wrap>
        <MsStatus type="lightTag" color="red">
          red
        </MsStatus>
        <MsStatus type="lightTag" color="coral">
          coral
        </MsStatus>
        <MsStatus type="lightTag" color="darkKhaki">
          darkKhaki
        </MsStatus>
        <MsStatus type="lightTag" color="green">
          green
        </MsStatus>
        <MsStatus type="lightTag" color="royalBlue">
          royalBlue
        </MsStatus>
        <MsStatus type="lightTag" color="cadetBlue">
          cadetBlue
        </MsStatus>
        <MsStatus type="lightTag" color="darkGrey">
          darkGrey
        </MsStatus>
        <MsStatus type="lightTag" color="steelBlue">
          steelBlue
        </MsStatus>
        <MsStatus type="lightTag" color="blueViolet">
          blueViolet
        </MsStatus>
        <MsStatus type="lightTag" color="mediumVioletRed">
          mediumVioletRed
        </MsStatus>
        <MsStatus type="lightTag" color="yellowGreen">
          yellowGreen
        </MsStatus>
        <MsStatus type="lightTag" color="darkBlue">
          darkBlue
        </MsStatus>
      </Space>
    </>
  );
};
