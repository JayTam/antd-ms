import { useDeepCompareEffect } from 'ahooks';
import { Input } from 'antd';
import { cloneDeep, take } from 'lodash-es';
import { useMemo, useState } from 'react';
import type { baseTabModuleProps, dataType } from '../../types';
import { filterBySearchCode } from '../../utils/searchUser';
import ModalPersonTable from '../ModalPersonTable';
import { useLocale } from '@jaytam/antd-ms/locale';

const UserListTab = (props: baseTabModuleProps) => {
  const { list, tabsId, selectRows = [], changeSelectRows, rowKey, mode, userSearchCode } = props;
  const [searchValue, setSearchValue] = useState('');
  const [selectedRowsList, setSelectedRowsList] = useState<dataType[]>(cloneDeep(selectRows));
  //判断是否在中文输入中，如果在输入中false，结束true
  const [isComposition, setIsComposition] = useState(false);
  const { currentLocale } = useLocale('MsUser');

  useDeepCompareEffect(() => {
    setSelectedRowsList(selectRows);
  }, [selectRows]);

  const searchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e?.target?.value ?? '';
    setSearchValue(val);
  };

  const handleComposition = (e: any) => {
    setIsComposition(e.type === 'compositionend' ? false : true);
  };

  const dataSource = useMemo(() => {
    if (isComposition) {
      return;
    }
    if (searchValue) {
      const _opts = filterBySearchCode(list, searchValue, userSearchCode) ?? [];
      // 超过100条，取前100条
      return take(_opts, 100);
    }
    return [];
  }, [searchValue, isComposition, list, userSearchCode]);

  return (
    <>
      <Input
        style={{ marginBottom: '12px' }}
        onChange={searchChange}
        onCompositionStart={handleComposition}
        onCompositionEnd={handleComposition}
        placeholder={currentLocale.searchPlaceholder}
      />
      <ModalPersonTable
        personList={dataSource}
        tabsId={tabsId}
        rowKey={rowKey}
        mode={mode}
        selectRows={selectedRowsList}
        changeSelectRows={changeSelectRows}
      />
    </>
  );
};

export default UserListTab;
