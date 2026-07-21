import { useDeepCompareEffect } from 'ahooks';
import { Col, Input, Row, Tree } from 'antd';
import { cloneDeep, includes, remove } from 'lodash-es';
import { useMemo, useState } from 'react';
import type { baseTabModuleProps, dataType } from '../../types';
import { inOptionBySearchCode } from '../../utils/searchUser';
import ModalPersonTable from '../ModalPersonTable';
import { useLocale } from '@jaytam/antd-ms/locale';

const OaEmailTab = (props: baseTabModuleProps) => {
  const {
    list: emailList = [],
    selectRows = [],
    changeSelectRows,
    rowKey = 'id',
    tabsId = '1',
    mode,
    emailSearchCode = ['title', 'value'],
  } = props;
  const [searchValue, setSearchValue] = useState('');
  const [personList, setPersonList] = useState<dataType[]>([]);

  const [selectedRowsList, setSelectedRowsList] = useState<dataType[]>(cloneDeep(selectRows));
  const { currentLocale } = useLocale('MsUser');

  useDeepCompareEffect(() => {
    setSelectedRowsList(selectRows);
  }, [selectRows]);

  //判断是否在中文输入中，如果在输入中true，结束true
  const [isComposition, setIsComposition] = useState(false);

  const handleComposition = (e: dataType) => {
    setIsComposition(e?.type === 'compositionend' ? false : true);
  };

  const searchChange = (e: dataType) => {
    const val = e?.target?.value;
    setSearchValue(val);
  };

  const updateValue = (list: dataType[]) => {
    changeSelectRows?.([...list]);
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
        if (inOptionBySearchCode(item, searchValue, emailSearchCode)) {
          newChildren.push(item);
          item.children = loop(item.children);
        } else {
          const subs = loop(item.children);
          if ((subs && subs.length) || inOptionBySearchCode(item, searchValue, emailSearchCode)) {
            item.children = subs;
            newChildren.push(item);
          }
        }
      });
      return newChildren;
    };

    if (!searchValue) {
      return emailList;
    }
    return loop(cloneDeep(emailList));
  }, [searchValue, isComposition, emailList]);

  // 点击树节点
  const handleSelect = (selectedKeys: React.Key[], e: dataType) => {
    setPersonList(e.node?.userList ?? []);
  };

  // 点击树复选框
  const handleCheck = (checkedKeys: any, e: dataType) => {
    const { checked, node } = e;
    if (checked) {
      updateValue(
        mode
          ? [...selectedRowsList, { ...node, tabsId, isGroup: true }]
          : [{ ...node, tabsId, isGroup: true }],
      );
    } else {
      remove(
        selectedRowsList,
        (item: dataType) => item.tabsId === tabsId && item?.value === node?.value,
      );
      updateValue([...selectedRowsList]);
    }
  };

  return (
    <>
      <Input.Search
        style={{ marginBottom: '12px' }}
        onCompositionStart={handleComposition}
        onCompositionEnd={handleComposition}
        enterButton={false}
        placeholder={currentLocale.departmentSearch}
        onChange={searchChange}
      />
      <Row gutter={16}>
        <Col span={7}>
          <Tree
            style={{ height: '268px', overflowY: 'scroll' }}
            checkable
            checkStrictly={true}
            defaultExpandAll={true}
            treeData={treeData}
            onSelect={handleSelect}
            onCheck={handleCheck}
            checkedKeys={selectedRowsList.map((item) => item.key)}
          />
        </Col>
        <Col span={17}>
          <ModalPersonTable
            personList={personList}
            rowKey={rowKey}
            isGroup={true}
            tabsId="2"
            mode={mode}
            selectRows={selectRows}
            changeSelectRows={changeSelectRows}
          />
        </Col>
      </Row>
    </>
  );
};

export default OaEmailTab;
