/**
 * title: 嵌套使用
 * description: 只有在更多里面的按钮，才可以嵌套
 */

import { MsActions } from '@jaytam/antd-ms';

export default () => {
  return (
    <>
      <MsActions
        limit={2}
        items={[
          { label: '按钮1' },
          { label: '按钮2' },
          {
            label: '按钮3',
            items: [
              {
                key: '3-1',
                label: '按钮3-1',
                items: [
                  {
                    key: '3-1-1',
                    label: '按钮3-1-1',
                    disabled: true,
                    disabledTooltip: '禁用提示',
                  },
                  {
                    key: '3-1-2',
                    label: '按钮3-1-2',
                  },
                ],
              },
              { label: '按钮3-2' },
            ],
          },
          {
            label: '按钮4',
            items: [{ label: '按钮4-1' }, { label: '按钮4-2' }],
            disabled: true,
            disabledTooltip: '禁止时，不再展示子按钮',
          },
          {
            label: '按钮5',
            items: [
              { label: '按钮5-1', disabled: true, disabledTooltip: '禁用提示' },
              { label: '按钮5-2' },
            ],
          },
        ]}
      />
    </>
  );
};
