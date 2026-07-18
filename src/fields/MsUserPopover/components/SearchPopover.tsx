import { SearchOutlined } from '@ant-design/icons';
import { useDebounceFn, useMount } from 'ahooks';
import type { InputRef } from 'antd';
import { Input, List, Row, Spin } from 'antd';
import { differenceBy, isFunction } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import '../index.less';
import type { DataType, UserPopoverProps } from '../types';
import { formatValue } from '../utils/valueToEnum';
import UserItem from './UserItem';
import { useLocale } from '@jaytam/antd-ms/locale';

type SearchPopoverType = UserPopoverProps & {
  defaultOptions?: DataType[];
  selectItem?: (item: DataType) => void;
  clickOpen?: (open: boolean) => void;
  selectedList?: DataType[];
  frequentContacts?: DataType[];
};

const SearchPopover = (props: SearchPopoverType) => {
  const {
    defaultOptions,
    searchRequest,
    searchPostRes = (res: any) => res.data,
    searchDebounceTime = 300,
    searchEnum,
    searchEnumFiledNames,
    selectItem,
    clickOpen,
    selectedList,
    frequentContacts,
    showFrequentContacts = true,
    searchCode = ['label'],
  } = props ?? {};

  const [options, setOptions] = useState<DataType[]>();

  const [searchValue, setSearchValue] = useState<string>();
  const { currentLocale } = useLocale('MsUserPopover');
  const [loading, setLoading] = useState(false);

  const myInput = useRef<InputRef>(null);

  // 过滤掉已经选择的数据
  const filterSelectedList = (list: DataType[]) => {
    return differenceBy(list, selectedList ?? [], 'value');
  };

  /**
   * 通过输入的值和可搜索字段去过滤
   * @param options 需要被过滤的数据源
   * @returns
   */
  const filterBySearchCode = (options?: DataType[]) => {
    if (!searchValue) {
      return options;
    }
    return options?.filter((option) =>
      searchCode.some((c: string) =>
        option?.[c]?.toLowerCase()?.includes(searchValue?.toLowerCase()),
      ),
    );
  };

  // 获取搜索结果
  const { run } = useDebounceFn(
    async () => {
      let options: DataType[] = [];
      if (searchEnum) {
        const _options = formatValue(searchEnum, searchEnumFiledNames);
        options = filterBySearchCode(_options) ?? [];
      } else if (isFunction(searchRequest)) {
        setLoading(true);
        const originRes = await searchRequest(searchValue);
        const valueEnum = isFunction(searchPostRes) ? searchPostRes(originRes) : originRes;
        setLoading(false);
        options = formatValue(valueEnum, searchEnumFiledNames);
      } else if (defaultOptions) {
        options = filterBySearchCode(defaultOptions) ?? [];
      }
      setOptions(filterSelectedList(options));
    },
    { wait: searchDebounceTime },
  );

  useEffect(() => {
    if (!searchValue) {
      return setOptions([]);
    }
    run();
  }, [searchValue]);

  useMount(() => {
    // 初始化时搜索输入框自动获取焦点
    myInput.current?.focus();
  });

  const handleCompositionStart = (e: any) => {
    e.target.composing = true;
  };

  const handleCompositionEnd = (e: any) => {
    if (!e.target.composing) {
      return;
    }
    e.target.composing = false;
    setSearchValue(e.target.value);
  };

  // 搜索值改变时
  const onSearchChange = (e: any) => {
    if (e.target.composing) return;
    const val = e?.target?.value ?? '';
    setSearchValue(val);
  };

  // 选择某一条人员时
  const selectClick = (item: DataType) => {
    clickOpen?.(false);
    selectItem?.(item);
  };

  const listRender = () => {
    // 如果没有搜索值，或者搜素过程未完成则返回空
    if (!searchValue) {
      return null;
    }
    if (loading) {
      return (
        <Row justify="center" style={{ padding: 30 }}>
          <Spin />
        </Row>
      );
    }
    return (
      <List
        style={{ width: '260px' }}
        split={false}
        loading={loading}
        itemLayout="horizontal"
        dataSource={options ?? []}
        renderItem={(item) => (
          <UserItem itemData={item} onSelectClick={() => selectClick(item)} {...props} />
        )}
      />
    );
  };

  const contactsRender = () => {
    const contactsList = filterSelectedList(frequentContacts ?? []);
    if (!showFrequentContacts) return null;
    if (searchValue || contactsList.length <= 0) {
      return null;
    }
    return (
      <>
        <h3 style={{ fontWeight: 600 }}>{currentLocale.frequentContact}</h3>
        <List
          style={{ width: '260px' }}
          split={false}
          itemLayout="horizontal"
          dataSource={contactsList}
          renderItem={(item) => (
            <UserItem itemData={item} onSelectClick={() => selectClick(item)} {...props} />
          )}
        />
      </>
    );
  };

  return (
    <div className="popover-wrapper">
      <div className="search-wrap">
        <Input
          placeholder={currentLocale.inputUserName}
          allowClear
          prefix={<SearchOutlined />}
          onChange={onSearchChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          ref={myInput}
        />
      </div>
      {contactsRender()}
      {listRender()}
    </div>
  );
};

export default SearchPopover;
