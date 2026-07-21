/**
 * title: 禁用提示
 * desc:
 */

import { MsActions } from '@jaytam/antd-ms';

export default () => {
  return (
    <>
      <MsActions
        limit={4}
        items={[
          { label: '正常按钮' },
          { label: '单条件禁用', disabled: true, disabledTooltip: '禁用提示' },
          {
            label: '多条件禁用 - 单禁用',
            disabled: [
              { disabled: false, disabledTooltip: '禁用条件一提示' },
              { disabled: true, disabledTooltip: '禁用条件二提示' },
            ],
          },
          {
            label: '多条件禁用 - 多禁用',
            disabled: [
              { disabled: true, disabledTooltip: '条件1和条件2都禁用，提示条件1提示' },
              { disabled: true, disabledTooltip: '禁用条件二提示' },
            ],
          },
          {
            label: (
              <a target={'_blank'} href="//www.baidu.com/" rel="noreferrer">
                禁用链接
              </a>
            ),
            disabled: [{ disabled: true, disabledTooltip: '禁用提示' }],
          },
        ]}
      />
    </>
  );
};
