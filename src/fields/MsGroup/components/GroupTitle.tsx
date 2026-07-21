import { QuestionCircleOutlined } from '@ant-design/icons';
import { MsTitle } from '@jaytam/antd-ms';
import type { MsTitleProps } from '@jaytam/antd-ms/components/MsTitle/types';
import { Popover } from 'antd';
import { isNil } from 'lodash-es';
import type { ReactNode } from 'react';

type GroupTitleProps = MsTitleProps & {
  tooltip?: ReactNode;
};

function GroupTitle(props: GroupTitleProps) {
  const { title, tooltip, titleType = 'gradient', extra, ...restProps } = props;

  if (isNil(title)) return;

  return (
    <MsTitle
      {...restProps}
      title={title}
      titleType={titleType}
      titleSuffix={
        tooltip && (
          <Popover content={tooltip} placement="right">
            <QuestionCircleOutlined style={{ marginLeft: 8, cursor: 'pointer' }} />
          </Popover>
        )
      }
      extra={extra}
    />
  );
}

export default GroupTitle;
