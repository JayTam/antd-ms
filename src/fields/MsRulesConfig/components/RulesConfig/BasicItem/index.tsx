import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { Button, Dropdown, type MenuProps, Popconfirm, Space } from 'antd';
import { cloneDeep, isArray, isBoolean, isNumber } from 'lodash-es';
import React, { memo, useMemo } from 'react';
import TooltipVerifyField from '../../TooltipVerifyField';
import { INIT_PK } from '../constant';
import { type ThandleRules, useHandleRules } from '../../hooks/useHandleRules';

import type { RcValueType } from '@jaytam/antd-ms/fields/MsRulesConfig/type';
import type { RcBasicItem, RcFieldItem } from '..';
import { useMemoizedFn } from 'ahooks';

import './index.less';
import { useLocale } from '@jaytam/antd-ms/locale';

type selectLabelValue = {
  label?: string;
  value?: string;
  [k: string]: any;
};

const BasicItem: React.FC<
  {
    key: string;
    multiple: boolean;
    index: number;
    columns: RcFieldItem[];
    lineData: RcBasicItem;
    hideActionsButton: boolean;
    conditionRender?: React.ReactNode;
    deleteRender?: React.ReactNode;
    wrap?: boolean;
    ruleMaxNumber?: number;
    ruleNum: number;
    oneItem: boolean;
  } & ThandleRules
> = ({
  columns,
  multiple,
  layerNum,
  ruleMaxNumber,
  ruleNum,
  oneItem,
  hideActionsButton,
  conditionRender,
  deleteRender,
  wrap,
  index,
  fatherPk,
  update,
  onChange,
  cancelRef,
  fileNames,
  combinatorValue,
  initObj,
  defaultCombinator,
  lineData,
}) => {
  const [data] = update;

  const { addCondition, setConditionGroup, updateState, items } = useHandleRules({
    initObj,
    defaultCombinator,
    fatherPk,
    update,
    layerNum,
    onChange,
    cancelRef,
    fileNames,
    combinatorValue,
  });

  const { currentLocale, globalLocale } = useLocale('MsRulesConfig');

  const newItems = useMemo(() => {
    if (isNumber(ruleMaxNumber)) {
      const [ruleItem, ruleItemGroup] = (items as MenuProps['items']) || [];
      if (ruleItem && ruleItemGroup) {
        return [{ ...ruleItem, disabled: ruleNum < ruleMaxNumber ? false : true }, ruleItemGroup];
      }

      return items;
    }

    return items;
  }, [items, ruleMaxNumber, ruleNum]);

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') {
      addCondition();
    }
    if (key === '2') {
      setConditionGroup('add');
    }
  };
  const handleRulesValues = useMemoizedFn(
    (
      arr: RcBasicItem[] | never[],
      pk: string,
      valObj: Record<string, any>[] | null,
      handleType: 'del' | 'edit',
    ) => {
      if (arr && arr.length === 0) return [];

      const newRules: RcBasicItem[] = [];
      arr?.forEach((item, index: number) => {
        // 处理只有初始条件组下一条条件数据删除
        if (
          item.pk === INIT_PK &&
          item.rules.length === 1 &&
          item.rules[0].combinator === '' &&
          handleType === 'del'
        ) {
          Reflect.set(item, 'rules', []);
        }
        if (item.pk === pk) {
          if (handleType === 'del') {
            arr.splice(index, 1);
          }
          if (handleType === 'edit') {
            valObj?.forEach((fieldItem) => {
              Reflect.set(item, fieldItem.key, fieldItem.value);
            });
          }
        } else {
          // 递归查找pk
          if (
            isArray(item.rules) &&
            item.rules.length === 1 &&
            item.rules[0]?.pk === pk &&
            handleType === 'del'
          ) {
            // 执行删除组
            arr.splice(index, 1);
          } else {
            handleRulesValues(item.rules, pk, valObj, handleType);
          }
        }
        newRules.push({ ...item });
      });

      return newRules;
    },
  );

  const delCurrent = () => {
    const newData = handleRulesValues(cloneDeep(data.conditionList), lineData.pk, null, 'del');
    updateState(newData);
  };

  const fieldChange = useMemoizedFn(
    (
      valueObj: unknown,
      field: string,
      valueType: string = 'text',
      selectdLabelName: string = '',
    ) => {
      // 判断valueObj是对象数组还是基本类型
      let valArr: any[] | null = null;
      if (typeof valueObj === 'string' || typeof valueObj === 'number' || Array.isArray(valueObj)) {
        valArr = [{ key: field, value: valueObj }];
      }
      if (valueType === 'select') {
        if (typeof valueObj === 'object' && !Array.isArray(valueObj)) {
          const selectValueObj: selectLabelValue | null = valueObj;
          if (!selectValueObj) {
            valArr = [
              { key: selectdLabelName ? selectdLabelName : `${field}Name`, value: void 0 },
              { key: field, value: void 0 },
            ];
          } else {
            valArr = Object.entries(selectValueObj || {})
              ?.map(([key, value]) => {
                if (key === 'label' && selectdLabelName) {
                  return {
                    key: selectdLabelName,
                    value: selectValueObj?.value ? value : void 0,
                  };
                }
                if (key === 'value') {
                  return {
                    key: field,
                    value: value,
                  };
                }
                return false;
              })
              ?.filter((item) => !!item);
          }
        }
        if (valueObj === undefined) {
          const setLabel = selectdLabelName ? { key: selectdLabelName, value: void 0 } : null;
          if (setLabel !== null) {
            valArr = [setLabel, { key: field, value: void 0 }];
          } else {
            valArr = [{ key: field, value: void 0 }];
          }
        }
      }
      if (isBoolean(valueObj) || valueObj === 'false' || valueObj === 'true') {
        valArr = [{ key: field, value: Boolean(valueObj) }];
      }
      if (valueObj !== 0 && valueObj !== false && valueType !== 'select' && !valueObj) {
        valArr = [{ key: field, value: void 0 }];
      }

      // 处理依赖项为当前修改值，清空依赖的值
      const depCols = columns.filter((depColumns) => depColumns?.dependencies?.includes(field));
      if (depCols.length > 0) {
        depCols.forEach((depItem) => {
          if (depItem.selectdLabelName) {
            valArr?.push({ key: depItem.selectdLabelName, value: void 0 });
            valArr?.push({ key: depItem.dataIndex, value: void 0 });
          } else {
            valArr?.push({ key: depItem.dataIndex, value: void 0 });
          }
        });
      }
      const newData = handleRulesValues(cloneDeep(data.conditionList), lineData.pk, valArr, 'edit');
      updateState(newData);
    },
  );

  return (
    <Space className="ms-rules-config-space" size={10} align="center" wrap={!!wrap}>
      {/* 转化为schema配置MsField */}
      {columns &&
        columns.length > 0 &&
        columns?.map((item) => (
          <TooltipVerifyField
            key={`${item.dataIndex}_${item.valueType as RcValueType}_${lineData.pk}`}
            pk={lineData.pk}
            lineData={lineData}
            verifyFieldProps={item}
            onFieldChange={fieldChange}
          />
        ))}
      <Space size={10} align="center">
        {index === 0 && !hideActionsButton && (
          <>
            {multiple ? (
              <Dropdown menu={{ items: newItems, onClick }}>
                {conditionRender ? (
                  <div className="ms-rules-config-custom-node">{conditionRender}</div>
                ) : (
                  <Button
                    type="text"
                    className="ms-rules-config-hr-btn"
                    icon={<PlusCircleOutlined />}
                  />
                )}
              </Dropdown>
            ) : (isNumber(ruleMaxNumber) && ruleNum < ruleMaxNumber) || !ruleMaxNumber ? (
              <>
                {conditionRender ? (
                  <div className="ms-rules-config-custom-node" onClick={addCondition}>
                    {conditionRender}
                  </div>
                ) : (
                  <Button
                    type="text"
                    className="ms-rules-config-hr-btn"
                    icon={<PlusCircleOutlined />}
                    onClick={addCondition}
                  />
                )}
              </>
            ) : null}
          </>
        )}
        {!hideActionsButton && (
          <>
            {((!multiple && oneItem && ruleNum > 1) || !oneItem || multiple) && (
              <Popconfirm
                placement="bottomLeft"
                title={currentLocale.conditionDelete}
                onConfirm={delCurrent}
                okText={globalLocale.ok}
                cancelText={globalLocale.cancel}
              >
                {deleteRender ? (
                  <div className="ms-rules-config-del-customize">{deleteRender}</div>
                ) : (
                  <Button
                    type="text"
                    className="ms-rules-config-del-btn"
                    icon={<MinusCircleOutlined />}
                  />
                )}
              </Popconfirm>
            )}
          </>
        )}
      </Space>
    </Space>
  );
};

export default memo(BasicItem);
