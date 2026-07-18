import type { MsDescriptionsColumnType } from '@jaytam/antd-ms/components';
import { Button, Tooltip } from 'antd';

type ActionsTitleProps<D> = { titleColumn?: MsDescriptionsColumnType<D> };

/**
 * 自定义操作按钮组件
 * @returns
 */
function ActionsTitle<D>(props: ActionsTitleProps<D>) {
  const { titleColumn } = props;

  if (!titleColumn?.actions) return null;

  return (
    <>
      {titleColumn.actions.map((action, index) => {
        const { label, title, ...btnProps } = action;
        return (
          <Tooltip title={title} key={index}>
            <Button size="small" type="link" {...btnProps}>
              {label}
            </Button>
          </Tooltip>
        );
      })}
    </>
  );
}

export default ActionsTitle;
