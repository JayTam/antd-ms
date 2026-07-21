import { find, isNil } from 'lodash-es';
import { useEffect, useState } from 'react';
import { BUTTON_WIDTH } from '../config';
import { useUserPopover } from '../contexts/userPopover';
import type { DataType, UserPopoverProps } from '../types';
import SingleUser from './SingleUser';

type UserShowType = UserPopoverProps & {
  deleteUser?: (item: DataType) => void;
  readonly?: boolean;
};

// 已选人员的渲染
const UserShow = (props: UserShowType) => {
  const {
    showInOneLine,
    readonly = false,
    fontSize = 12,
    showDelete = true,
    showEdit = false,
  } = props ?? {};

  const { setFoldList, selectedList, userPopoverRef } = useUserPopover();

  //显示到一行时，已选列表的宽度
  const [showSelectedWidth, setShowSelectedWidth] = useState<number>();

  useEffect(() => {
    const allSelected = userPopoverRef?.current?.querySelectorAll('.user-avatar');

    const allSelectedList = Array.from(allSelected!);
    // 从BUTTON_WIDTH找出当前字体大小对应的添加按钮和全部按钮的width
    const buttonWidth = find(BUTTON_WIDTH, ['fontSize', fontSize]);
    // 计算人员展示的最大宽度是多少,如果是只读，则不需要减掉添加按钮的宽度
    const addButtonWidth = readonly ? 0 : buttonWidth?.addButtonWidth ?? 0;
    // 全部按钮的宽度
    const allButtonWidth = buttonWidth?.allButtonWidth ?? 0;
    // 最大限制的宽度，不能超过这个宽度

    const limitWidth = userPopoverRef?.current
      ? userPopoverRef.current?.getBoundingClientRect()?.width - addButtonWidth
      : 0;

    // 展示在一行的人员的宽度
    let defaultWidth = 0;
    // i是放在全部列表里面的开始下标位置， 计算超过限制宽度的下标位置
    const i = allSelectedList?.findIndex((val, index) => {
      // 如果下标超过已选列表的下标，就直接跳过
      if (index > (selectedList?.length ?? 0 - 1)) {
        return;
      }
      // 计算单个人员的宽度
      const singleWidth = (val as HTMLElement)?.offsetWidth + 16;
      // 上一个人员的宽度
      let preSingleWidth = 0;
      if (index - 1 >= 0) {
        preSingleWidth = (allSelectedList[index - 1] as HTMLElement)?.offsetWidth + 16;
      }

      // 如果当前人员和之前所有人员的宽度和大于限制的宽度
      if (defaultWidth + singleWidth > limitWidth) {
        // 之前所有人员宽度和加上全部按钮的宽度大于限制宽度，则减掉上一个人员的宽度
        setShowSelectedWidth(
          defaultWidth + allButtonWidth > limitWidth ? defaultWidth - preSingleWidth : defaultWidth,
        );
        return true;
      } else {
        setShowSelectedWidth(undefined);
      }
      defaultWidth = defaultWidth + singleWidth;
    });

    if (i >= 0 && i < (selectedList?.length ?? 0)) {
      if (defaultWidth + allButtonWidth > limitWidth) {
        return setFoldList?.(selectedList?.slice(i - 1));
      }

      setFoldList?.(selectedList?.slice(i));
    } else {
      setFoldList?.(undefined);
    }
  }, [selectedList, fontSize, userPopoverRef, readonly, setFoldList]);

  // 已选人员渲染，hover是否显示详细信息
  const selectedUserRender = selectedList?.map((item: DataType, index: number) => {
    let innerShowDelete = showDelete;
    if (typeof showDelete === 'function') {
      innerShowDelete = showDelete(item, index, selectedList);
    }
    let innerShowEdit = showEdit;
    if (typeof showEdit === 'function') {
      innerShowEdit = showEdit(item, index, selectedList);
    }

    return (
      <div style={{ marginRight: '16px' }} key={item?.value || index}>
        <SingleUser
          key={item?.value || index}
          {...props}
          userData={item}
          showDelete={!readonly && innerShowDelete}
          showEdit={!readonly && innerShowEdit}
        />
      </div>
    );
  });

  if (showInOneLine) {
    return (
      <div
        className="selected-one-line"
        style={{
          width: isNil(showSelectedWidth) ? 'auto' : showSelectedWidth + 'px',
          lineHeight: '30px',
        }}
      >
        {selectedUserRender}
      </div>
    );
  }

  return <>{selectedUserRender}</>;
};
export default UserShow;
