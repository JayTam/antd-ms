import { useFieldModeContext } from '@jaytam/antd-ms/components/MsForm/contexts/mode';
import { useControllableValue } from 'ahooks';
import { Popover } from 'antd';
import { cloneDeep, isUndefined, remove, some, take } from 'lodash-es';
import { forwardRef, useMemo, useRef, useState } from 'react';

import useFieldRequest from '../../hooks/useFieldRequest';
import AddUser from './components/AddUser';
import ReadOnlyUser from './components/ReadOnlyUser';
import SearchPopover from './components/SearchPopover';
import TableUser from './components/TableUser';
import UserShow from './components/UserShow';
import { UserPopoverContext } from './contexts/userPopover';
import type { DataType, MsUserPopoverProps, MsUserPopoverRef } from './types';
import { formatValue } from './utils/valueToEnum';

import ClickEditWrap from '../components/ClickEditWrap';
import enhanceField from '../enhanceField';
import useExpireLocalStorageState from './hooks/useExpireLocalStorage';
import './index.less';
import { useFieldPopupContainer } from '@jaytam/antd-ms/hooks';

const MsUserPopover = forwardRef((props: MsUserPopoverProps, ref: MsUserPopoverRef) => {
  // 获取用户的options
  const { options: defaultOptions, fieldProps } = useFieldRequest({
    cacheRequest: false,
    omitOriginFieldNames: false,
    ...props,
    fieldProps: {
      autoSelect: false,
      ...(props?.fieldProps || {}),
    },
  });

  const { getPopupContainer } = useFieldPopupContainer();

  // 人员的渲染区域
  const userPopoverRef = useRef<HTMLDivElement>(null);

  const { type = 'form' } = fieldProps;

  const { mode } = useFieldModeContext(props);

  const {
    id,
    showInOneLine,
    frequentContactsKey,
    style,
    placement,
    fontSize,
    valueEnumFiledNames,
    maxFrequentContacts,
    frequentContactsExpired,
  } = fieldProps ?? {};

  // 控制popover的显隐
  const [open, setOpen] = useState(false);

  const controllableFieldProps = useMemo(() => {
    if (!isUndefined(fieldProps.value)) {
      return {
        ...fieldProps,
        // 根据valueEnumFiledNames给value做映射
        value: formatValue(fieldProps.value, valueEnumFiledNames),
      };
    }
    if (!isUndefined(fieldProps.defaultValue)) {
      return {
        ...fieldProps,
        // 根据valueEnumFiledNames给defaultValue做映射
        defaultValue: formatValue(fieldProps.defaultValue, valueEnumFiledNames),
      };
    }
    return fieldProps;
  }, [fieldProps, valueEnumFiledNames]);

  //已选择的数据
  const [selectedList, setSelectedList] = useControllableValue(controllableFieldProps);

  // 折叠列表的数据
  const [foldList, setFoldList] = useState<DataType[]>([]);

  //常用联系人的数据
  const { frequentContacts, setFrequentContacts, getContacts } = useExpireLocalStorageState(
    frequentContactsKey ?? id,
    {
      defaultValue: selectedList,
    },
    frequentContactsExpired,
  );

  // 改变悬浮框的显隐
  const changeOpen = () => {
    setOpen(!open);
  };

  const updateContacts = (item: DataType) => {
    const contacts = getContacts() || [];
    if (!some(contacts, ['value', item?.value])) {
      contacts?.unshift(item);
      // maxFrequentContacts存在时截取前面n条数据，否则不截取
      setFrequentContacts(maxFrequentContacts ? take(contacts, maxFrequentContacts) : contacts);
    }
  };

  // 选择人员
  const selectUser = (item: DataType) => {
    const list = cloneDeep(selectedList || []);
    list?.push(item);
    setSelectedList([...list]);
    updateContacts(item);
  };

  // 删除人员
  const deleteUser = (item?: DataType) => {
    remove(selectedList, (option: any) => option.value === item?.value);
    setSelectedList([...selectedList]);
  };

  const editDom = (
    <>
      <div
        className={`user-popover ${showInOneLine ? 'one-line' : ''}`}
        style={{ ...style, fontSize: fontSize }}
      >
        <UserShow {...fieldProps} deleteUser={deleteUser} />
        <Popover
          overlayClassName="user-popover-wrap"
          placement={placement}
          getPopupContainer={getPopupContainer}
          {...(fieldProps?.addPopoverProps ?? {})}
          content={
            open && (
              <SearchPopover
                {...fieldProps}
                defaultOptions={defaultOptions}
                selectItem={selectUser}
                selectedList={selectedList}
                frequentContacts={frequentContacts}
                clickOpen={(newOpen: boolean) => setOpen(newOpen)}
              />
            )
          }
          trigger="click"
          open={open}
          onOpenChange={changeOpen}
        >
          <AddUser {...fieldProps} changeOpen={changeOpen} />
        </Popover>
      </div>
    </>
  );

  const readDom = <ReadOnlyUser {...fieldProps} />;

  const render = () => {
    if (mode === 'clickEdit') {
      return (
        <ClickEditWrap
          readDom={<TableUser {...fieldProps} />}
          mode="select"
          className="user-popover-click-edit"
          toolTip={false}
          readOnly={fieldProps?.readOnly}
        >
          {editDom}
        </ClickEditWrap>
      );
    }
    if (type === 'table') {
      return <TableUser {...fieldProps} />;
    }
    if (mode === 'edit') {
      return editDom;
    }

    return readDom;
  };

  return (
    <UserPopoverContext.Provider
      value={{
        selectedList,
        setSelectedList,
        deleteUser,
        foldList,
        frequentContacts,
        setFoldList,
        defaultOptions,
        userPopoverRef,
      }}
    >
      <div ref={userPopoverRef} className="user-popover" style={{ fontSize: fontSize, ...style }}>
        <div ref={ref} style={{ width: '100%' }}>
          {render()}
        </div>
      </div>
    </UserPopoverContext.Provider>
  );
});

export default enhanceField(MsUserPopover);
