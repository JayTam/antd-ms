import { useCallback, useMemo, useState } from 'react';
import { getUuid } from '@jaytam/antd-ms/utils/base';
import { cloneDeep } from 'lodash-es';
import type {
  combinatorValueType,
  commonDataTypes,
  RcBasicItem,
  RcRulesData,
} from '../RulesConfig';
import produce from 'immer';
import type { MsJson } from '../../type';
import { getItem, INIT_PK } from '../RulesConfig/constant';
import { useDeepCompareEffect, useMemoizedFn, useUpdateEffect } from 'ahooks';
import { type MenuProps, message } from 'antd';
import { rulesDataFilter } from '../../utils';
import { replaceMessage, useLocale } from '@jaytam/antd-ms/locale';

export type ThandleRules = {
  fatherPk: string;
  initObj: Record<string, MsJson>;
  update: [RcRulesData, (v: any) => void];
  onChange?: (value: Record<keyof commonDataTypes, any> | undefined) => void;
  cancelRef: React.MutableRefObject<boolean>;
  fileNames: {
    combinator: string;
    rules: string;
  };
  defaultCombinator: 'and' | 'or';
  combinatorValue?: combinatorValueType;
  layerNum?: number;
};

export const useHandleRules = ({
  initObj,
  defaultCombinator,
  fatherPk,
  update,
  layerNum,
  onChange,
  cancelRef,
  fileNames,
  combinatorValue,
}: ThandleRules) => {
  const [data, setData] = update;
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const { currentLocale, fullLocale } = useLocale('MsRulesConfig');

  useUpdateEffect(() => {
    if (btnDisabled) {
      message.error(replaceMessage(currentLocale.maxLayer, { layerNum: layerNum as number }));
    }
  }, [btnDisabled]);

  useDeepCompareEffect(() => {
    const cloneData = cloneDeep(data.conditionList[0]);
    if (cloneData.rules.length > 0) {
      const newFilterRules = rulesDataFilter({
        rules: [cloneData],
        fileNames,
        combinatorValue,
      });
      onChange?.(newFilterRules ?? void 0);
      cancelRef.current = true;
    }
  }, [combinatorValue, data, fileNames]);

  const newItems: MenuProps['items'] = useMemo(() => {
    const items = getItem(fullLocale);
    const [ruleItem, ruleItemGroup] = items || [];
    if (ruleItem && ruleItemGroup) {
      return [ruleItem, { ...ruleItemGroup, disabled: btnDisabled }];
    }

    return items;
  }, [btnDisabled, fullLocale]);

  const initRule = useCallback(
    (type: 'group' | 'item') => {
      if (type === 'item') {
        return {
          pk: getUuid(),
          combinator: '',
          rules: [],
          ...initObj,
        };
      }

      return {
        pk: getUuid(),
        combinator: defaultCombinator,
        rules: [
          {
            pk: getUuid(),
            combinator: '',
            rules: [],
            ...initObj,
          },
        ],
      };
    },
    [defaultCombinator, initObj],
  );

  const handleRules = useCallback(
    (arr: RcBasicItem[] | never[], pk: string, addType: string, currentDepth = 0) => {
      const newRules: RcBasicItem[] = [];
      if (arr.length === 0 && addType === 'addRule') {
        return [
          {
            pk: INIT_PK,
            combinator: defaultCombinator,
            rules: [
              {
                pk: getUuid(),
                combinator: '',
                rules: [],
                ...initObj,
              },
            ],
          },
        ];
      }
      if (arr.length === 0 && addType === 'addGroup') {
        return [
          {
            pk: INIT_PK,
            combinator: defaultCombinator,
            rules: [
              {
                pk: getUuid(),
                combinator: defaultCombinator,
                rules: [
                  {
                    pk: getUuid(),
                    combinator: '',
                    rules: [],
                    ...initObj,
                  },
                ],
              },
            ],
          },
        ];
      }
      arr?.forEach((item: RcBasicItem, index) => {
        if (item.pk === pk) {
          switch (addType) {
            case 'addRule':
              // 添加成功条件排在条件组前面
              const rulesAndConfigArr = [...(item?.rules || []), initRule('item')]?.sort((l, r) => {
                const p = l.combinator === '' ? 1 : -1;
                const n = r.combinator === '' ? 1 : -1;
                return n - p;
              });
              Reflect.set(item, 'rules', rulesAndConfigArr);
              break;
            case 'addGroup':
              // 判断递归下钻层数
              if (layerNum && layerNum > 0 && currentDepth >= layerNum - 1) {
                setBtnDisabled(true);
              } else {
                setBtnDisabled(false);
                Reflect.set(item, 'rules', [...(item?.rules || []), initRule('group')]);
              }
              break;
            case 'delGroup':
              arr.splice(index, 1);
              break;
          }
        } else {
          // 递归查找pk
          handleRules(item.rules, fatherPk, addType, currentDepth + 1);
        }

        newRules.push({ ...item });
      });

      return newRules;
    },
    [defaultCombinator, fatherPk, initObj, initRule, layerNum],
  );

  const updateState = useMemoizedFn((newData: RcBasicItem[] | never[]) => {
    setData(
      produce((draft: RcRulesData) => {
        draft.conditionList = newData ?? [];
      }),
    );
    if (newData?.length > 0 && newData[0].rules.length > 0) {
      const cloneData = cloneDeep(newData);
      const newFilterRules = rulesDataFilter({
        rules: cloneData,
        fileNames,
        combinatorValue,
      });
      onChange?.(newFilterRules ?? void 0);
      cancelRef.current = true;
    } else {
      onChange?.(void 0);
    }
  });

  const addCondition = () => {
    const conditionList = cloneDeep(data.conditionList);
    const newData: RcBasicItem[] | never[] = handleRules(conditionList, fatherPk, 'addRule');
    updateState(newData);
  };
  const setConditionGroup = (v: 'add' | 'del') => {
    const conditionList = cloneDeep(data.conditionList);
    const newData = handleRules(conditionList, fatherPk, v === 'add' ? 'addGroup' : 'delGroup');
    updateState(newData);
  };

  return {
    addCondition,
    setConditionGroup,
    updateState,
    btnDisabled,
    items: newItems,
  };
};
