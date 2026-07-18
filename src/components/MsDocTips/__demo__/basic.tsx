/**
 * title: 基本使用
 * description:
 */

import { QuestionCircleOutlined } from '@ant-design/icons';
import type { MsDocTipsProps } from '@jaytam/antd-ms';
import { MsDocTips } from '@jaytam/antd-ms';
import { Divider } from 'antd';

export default () => {
  const onCustomClick: MsDocTipsProps['onCustomClick'] = (data) => {
    alert(`此按钮上绑定了业务属性${JSON.stringify(data)}`);
  };

  return (
    <div>
      <div>
        <h2>埋点位置在页面左侧</h2>
        <span>popover模式 </span>
        <MsDocTips
          trackingKey="马上云_EIP_rkp2QFiS"
          placement="right"
          onCustomClick={onCustomClick}
        >
          <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
        </MsDocTips>
      </div>
      <Divider />
      <div style={{ textAlign: 'right' }}>
        <h2>埋点位置在页面右侧</h2>
        <span>tooltip模式 </span>
        <MsDocTips
          trackingKey="Devops_drill-system_7lOvnyL7"
          placement="left"
          type="tooltip"
          onCustomClick={onCustomClick}
        >
          <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
        </MsDocTips>
      </div>
      <Divider />
      <div>
        <h2>埋点位置在页面中</h2>
        <span>text模式 </span>
        <MsDocTips
          trackingKey="MSCLOUD-DOC_RAM_AUTHERRO_NOAUTH"
          type="text"
          onCustomClick={onCustomClick}
        />
      </div>
    </div>
  );
};
