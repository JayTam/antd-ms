/**
 * title: 元信息
 * description:
 */

import { LeftOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { MsStatus, MsTitle } from '@jaytam/antd-ms';
import { Popover } from 'antd';

export default () => {
  return (
    <>
      <MsTitle
        title="标题"
        titlePrefix={<LeftOutlined />}
        titleSuffix={<div>一段简单的描述....</div>}
      />
      <MsTitle
        title="标题"
        titlePrefix={<LeftOutlined />}
        titleSuffix={
          <Popover content={'一段提示'} placement="right">
            <QuestionCircleOutlined />
          </Popover>
        }
      />
      <MsTitle
        title="标题"
        titlePrefix={<LeftOutlined />}
        titleSuffix={
          <MsStatus type="tag" color="success">
            运行中
          </MsStatus>
        }
      />
    </>
  );
};
