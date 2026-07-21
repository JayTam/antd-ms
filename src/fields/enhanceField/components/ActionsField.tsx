import type { MsDescriptionsColumnType } from '@jaytam/antd-ms/components';
import { Button, Tooltip } from 'antd';

type ActionsFieldProps<D> = { column: MsDescriptionsColumnType<D> };

/**
 * 自定义操作按钮组件
 * @returns
 */
function ActionsField<D>(props: ActionsFieldProps<D>) {
  const { column } = props;

  if (!column?.actions) return null;

  return (
    <>
      {column.actions.map((action, index) => {
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

export default ActionsField;
