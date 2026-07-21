import { List, Popover } from 'antd';
import { isEmpty } from 'lodash-es';
import { useMemo } from 'react';
import { useUserPopover } from '../contexts/userPopover';
import type { UserPopoverProps } from '../types';
import SingleUser from './SingleUser';

type FoldListProps = UserPopoverProps & {
  children?: React.ReactNode;
  list?: Record<string, any>;
  readOnly?: boolean;
};

const FoldList = (props: FoldListProps) => {
  const {
    children,
    type,
    readOnly,
    placement = 'bottom',
    foldDetailPlacement = 'right',
    showInOneLine,
    foldHeight = 320,
  } = props;

  const { foldList } = useUserPopover();

  // 判断是否显示删除按钮
  const getShowDelete = () => {
    return readOnly || type === 'table' ? false : true;
  };

  const listRender = useMemo(
    () => (
      <List
        style={{ width: '166px', paddingTop: '4px' }}
        split={false}
        itemLayout="horizontal"
        dataSource={foldList}
        className="all-user-list"
        renderItem={(item) => (
          <div style={{ marginBottom: '12px' }}>
            <SingleUser
              {...props}
              userData={item}
              showDelete={getShowDelete()}
              detailPlacement={foldDetailPlacement}
            />
          </div>
        )}
      />
    ),
    [foldList],
  );

  if (!showInOneLine || !foldList || isEmpty(foldList)) return null;

  return (
    <Popover
      overlayClassName="user-detail-popover fold-list-popover"
      content={listRender}
      placement={placement}
      overlayInnerStyle={{
        maxHeight: foldHeight,
        overflowY: 'scroll',
      }}
    >
      {children}
    </Popover>
  );
};

export default FoldList;
