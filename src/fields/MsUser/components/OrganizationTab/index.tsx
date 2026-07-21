import { Col, Input, Row, Tree } from 'antd';
import { cloneDeep, includes, isArray } from 'lodash-es';
import { useMemo, useState } from 'react';
import type { baseTabModuleProps, dataType } from '../../types';
import { inOptionBySearchCode } from '../../utils/searchUser';
import ModalPersonTable from '../ModalPersonTable';
import { useLocale } from '@jaytam/antd-ms/locale';

const OrganizationTab = (props: baseTabModuleProps) => {
  const {
    list: groupList = [],
    selectRows = [],
    changeSelectRows,
    mode,
    groupSearchCode = ['title', 'value'],
  } = props;
  const [searchValue, setSearchValue] = useState('');
  const [personList, setPersonList] = useState<dataType[]>([]);
  //判断是否在中文输入中，如果在输入中true，结束true
  const [isComposition, setIsComposition] = useState(false);

  const { currentLocale } = useLocale('MsUser');
  const handleComposition = (e: any) => {
    setIsComposition(e.type === 'compositionend' ? false : true);
  };

  const SearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e?.target?.value;
    setSearchValue(val);
  };

  const treeData = useMemo(() => {
    if (isComposition) {
      return;
    }
    const loop = (data: dataType[]) => {
      if (!(data && data.length)) {
        return;
      }
      const newChildren: dataType[] = [];
      data.forEach((item) => {
        if (inOptionBySearchCode(item, searchValue, groupSearchCode)) {
          newChildren.push(item);
          item.children = loop(item.children);
        } else {
          const subs = loop(item.children);
          if ((subs && subs.length) || inOptionBySearchCode(item, searchValue, groupSearchCode)) {
            item.children = subs;
            newChildren.push(item);
          }
        }
      });
      return newChildren;
    };

    if (!searchValue) {
      return groupList;
    }
    return loop(cloneDeep(groupList));
  }, [searchValue, isComposition, groupList]);

  // 点击树节点
  const handleSelect = (selectedKeys: React.Key[], e: dataType) => {
    setPersonList(e.node?.userList ?? []);
  };

  return (
    <>
      <Input.Search
        style={{ marginBottom: '12px' }}
        onCompositionStart={handleComposition}
        onCompositionEnd={handleComposition}
        enterButton={false}
        placeholder={currentLocale.departmentSearch}
        onChange={SearchChange}
      />
      <Row gutter={16}>
        <Col span={7}>
          <Tree
            style={{ height: '268px', overflowY: 'scroll' }}
            checkStrictly={true}
            defaultExpandAll={true}
            treeData={treeData}
            onSelect={handleSelect}
          />
        </Col>
        <Col span={17}>
          <ModalPersonTable
            personList={personList}
            tabsId="3"
            mode={mode}
            selectRows={selectRows}
            changeSelectRows={changeSelectRows}
          />
        </Col>
      </Row>
    </>
  );
};

export default OrganizationTab;
