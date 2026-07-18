import { Button, Tooltip } from 'antd';
import type { MsInstanceColumnType } from '../../types';

type ActionsTitleProps = { column?: MsInstanceColumnType };

/**
 * 自定义操作按钮组件
 * @returns
 */
function ActionsTitle(props: ActionsTitleProps) {
  const { column } = props;

  if (!column?.actions) return null;

  return (
    <>
      {column.actions.map((action, index) => {
        const { label, title, ...btnProps } = action;
        return (
          <span className="ms-instance-action ms-instance-custom" key={index}>
            <Tooltip title={title} key={index}>
              <Button size="small" type="text" {...btnProps} style={{ width: 'initial' }}>
                {label}
              </Button>
            </Tooltip>
          </span>
        );
      })}
    </>
  );
}

export default ActionsTitle;
