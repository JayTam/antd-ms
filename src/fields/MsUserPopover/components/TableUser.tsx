import { useDeepCompareEffect, useSize } from 'ahooks';
import { Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { useUserPopover } from '../contexts/userPopover';
import type { UserPopoverProps } from '../types';
import FoldList from './FoldList';
import SingleUser from './SingleUser';

const TableUser = (props: UserPopoverProps) => {
  const { selectedList = [], setFoldList, userPopoverRef } = useUserPopover();

  // 折叠起来的数据条数
  const [extraCount, setExtraCount] = useState<number>();

  // 显示人员的条数
  const [showCount, setShowCount] = useState(0);

  const parentSize = useSize(userPopoverRef);

  useEffect(() => {
    if (parentSize?.width) {
      // 容器的宽度
      const rectWidth = parentSize?.width;
      const selectLen = selectedList?.length ?? 0;
      // 如果容器的宽度大于等于所有人员头像折叠的宽度，需展示的头像则为所有人员
      if (rectWidth >= selectLen * 24 - (selectLen - 1) * 4) {
        return setShowCount(selectLen);
      }

      // 如果容器的宽度不够展示所有头像，则查找出最大能展示的人员数
      for (let i = 0; i <= selectLen; i++) {
        if ((i + 2) * 24 - (i + 1) * 4 > rectWidth) {
          return setShowCount(i);
        }
      }
    }
  }, [parentSize?.width, selectedList]);

  useDeepCompareEffect(() => {
    setFoldList?.(selectedList.slice(showCount));
    setExtraCount(selectedList?.length - showCount);
  }, [showCount, selectedList]);

  // 如果只有一个人员，则需要展示头像和姓名
  if (selectedList?.length <= 1) {
    return <SingleUser {...props} userData={selectedList[0]} showDelete={false} />;
  }

  // 超过1个人员，不展示姓名，折叠头像展示，自适应宽度
  return (
    <>
      <Avatar.Group size="small" maxStyle={{ backgroundColor: '#ABB4C7' }}>
        {selectedList.slice(0, showCount)?.map((item) => (
          <SingleUser
            key={item?.value}
            {...props}
            userData={item}
            showDelete={false}
            name={false}
          />
        ))}
        <FoldList showInOneLine={true} {...props}>
          <span className="user-avatar">
            <Avatar size="small" style={{ background: '#ABB4C7' }}>
              +{extraCount}
            </Avatar>
          </span>
        </FoldList>
      </Avatar.Group>
    </>
  );
};
export default TableUser;
