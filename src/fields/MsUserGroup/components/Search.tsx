import { SearchOutlined } from '@ant-design/icons';
import { useDebounceFn, useDeepCompareEffect } from 'ahooks';
import { Input, Select } from 'antd';
import { includes, omit } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import { getSearchEnum } from '../config';
import { useUserGroup } from '../contexts/userGroup';
import type { DataType, UserGroupProps, WikiGroupPropsType } from '../types';
import { MsField } from '@jaytam/antd-ms/components';
import { replaceMessage, useLocale } from '@jaytam/antd-ms/locale';

const Search: React.FC<UserGroupProps> = (props) => {
  const { debounceTime = 300, searchType = ['user'], searchChange, searchTypeEnum } = props;
  const { searchValues, setSearchValues } = useUserGroup();

  const [searchInput, setSearchInput] = useState();
  const [searchOptions, setSearchOptions] = useState<Record<string, any>[]>();
  const [selectedValue, setSelectedValue] = useState<string | string[]>();
  const [wikiSearchVal, setWikiSearchVal] = useState<string>();
  const { currentLocale } = useLocale('MsUserGroup');
  //更新type 和 value
  const updateSearch = (obj: Record<string, any>) => {
    setSearchValues?.({ ...searchValues, ...obj });
  };

  const selectProps = useMemo(() => {
    const wikiExist = searchTypeEnum?.find(
      (item) => item?.value === searchValues?.value && searchValues?.type === 'userInWikiGroup',
    );
    if (wikiExist) {
      return wikiExist?.props as WikiGroupPropsType;
    }
    return {} as WikiGroupPropsType;
  }, [searchTypeEnum, searchValues]);

  // 搜索节流
  const { run: searchRun } = useDebounceFn(
    () => {
      updateSearch?.({ searchValue: searchInput });
      searchChange?.({ ...omit(searchValues, 'props'), searchValue: searchInput });
    },
    { wait: props?.throttleTime || debounceTime },
  );

  // 根据配置的searchType，可单独选择用户，可单独选择团队，可用户和团队都选
  useDeepCompareEffect(() => {
    if (searchTypeEnum) {
      setSearchOptions(searchTypeEnum);
    } else {
      const SEARCH_ENUM = getSearchEnum(currentLocale);
      setSearchOptions(SEARCH_ENUM.filter((val) => includes(searchType, val?.value)));
    }
  }, [searchType]);

  // 搜索下拉选择的options改变时，默认选择第一项
  useDeepCompareEffect(() => {
    updateSearch({ ...searchOptions?.[0], searchValue: undefined });
  }, [searchOptions]);

  // 输入框改变
  const inputChange = (e: DataType) => {
    searchRun();
    setSearchInput(e.target.value);
  };

  // 下拉改变
  const selectChange = (e: any, option: DataType) => {
    updateSearch({ ...option, searchValue: undefined });
    setSearchInput(undefined);
    setSelectedValue(undefined);
  };

  const handleSelectChange = (val: string | string[]) => {
    updateSearch({ searchValue: val });
    searchChange?.({ ...omit(searchValues, 'props'), searchValue: val });
    setSelectedValue(val);
  };

  return (
    <Input.Group compact style={{ display: 'flex' }}>
      <Select
        value={searchValues?.value}
        style={{ width: 120 }}
        onChange={selectChange}
        options={searchOptions}
      />
      {searchValues?.type === 'userInWikiGroup' ? (
        <MsField
          {...(selectProps?.searchSelectProps ?? {})}
          valueType="select"
          params={{ searchVal: wikiSearchVal }}
          fieldProps={{
            style: { width: '100%' },
            filterOption: false,
            onSearch: setWikiSearchVal,
            ...(selectProps?.searchSelectProps?.fieldProps ?? {}),
            value: selectedValue,
            onChange: handleSelectChange,
            onClear() {
              if (selectProps?.searchSelectProps?.fieldProps?.onClear) {
                selectProps?.searchSelectProps?.fieldProps?.onClear();
              }
              setWikiSearchVal('');
            },
            placeholder:
              searchValues?.placeholder || `${currentLocale.select}${searchValues?.label}`,
          }}
        />
      ) : (
        <Input
          placeholder={
            searchValues?.placeholder ||
            replaceMessage(currentLocale.inputSearch, { name: searchValues?.label as string })
          }
          onChange={inputChange}
          value={searchInput}
          allowClear
          suffix={<SearchOutlined />}
        />
      )}
    </Input.Group>
  );
};

export default Search;
