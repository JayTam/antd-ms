import type { MsDescriptionsActionType } from '@jaytam/antd-ms';
import { MsDescriptions } from '@jaytam/antd-ms';
import { useRef } from 'react';

/**
 * title: 开发调试
 * debug: true
 * description:
 * background: "#f0f3f4"
 */
export default function Test() {
  const actionRef = useRef<MsDescriptionsActionType>(null);
  return (
    <MsDescriptions
      actionRef={actionRef}
      columns={[
        {
          title: '文本',
          dataIndex: 'text',
          editable: true,
        },
        {
          title: '选择器',
          dataIndex: 'select',
          editable: true,
        },
      ]}
      extra={{
        items: [
          {
            label: '打开所有editable',
            onClick: () =>
              actionRef.current?.openEditor({
                type: 'drawer',
                drawerProps: { title: '抽屉标题' },
              }),
          },
        ],
      }}
    />
  );
}
