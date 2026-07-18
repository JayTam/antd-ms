import { isArray, isNumber } from 'lodash-es';
import { Scrollbars } from 'react-custom-scrollbars';
import { getUuid } from '@jaytam/antd-ms/utils/base';
import React, { useMemo, useRef } from 'react';
import { generateRulesData, getRulesLength } from '../../utils';
import BasicItem from './BasicItem';
import { INIT_PK, AUTO_SCROLL_BAR } from './constant';
import produce from 'immer';
import RulesGroup from './RulesGroup';
import {
  useCreation,
  useDebounceFn,
  useDeepCompareEffect,
  useMemoizedFn,
  useSafeState,
} from 'ahooks';

import type { RcValueType } from '@jaytam/antd-ms/fields/MsRulesConfig/type';
import type { JSX } from 'react/jsx-runtime';

import type { MsFieldProps, MsFormColumnType } from '@jaytam/antd-ms';

import './index.less';

export type BaseRule = {
  enum?: any[];
  len?: number;
  max?: number;
  message?: string;
  min?: number;
  pattern?: RegExp;
  required?: boolean;
  validator?: (v: RcBasicItem) => Promise<['success' | 'error', string]>;
};

export type RcFieldItem<T = any> = MsFieldProps<any> &
  Omit<MsFormColumnType<T>, 'dependencies' | 'hideInForm' | 'fieldReadRender'> & {
    dataIndex: string;
    valueType?: RcValueType;
    selectdLabelName?: string;
    rules?: BaseRule[];
    dependencies?: string[];
    hideInForm?: boolean | ((values: Record<string, any>) => boolean);
    handleCurrentField?: (
      dep: string,
      depValue: Record<string, any>,
      setFieldValue: (currentValue: any) => void,
    ) => void;
    resetFieldProps?: (item: Partial<RcBasicItem>) => Record<string, any>;
    fieldReadRender?: (item: Partial<RcBasicItem>) => React.ReactNode;
  };

export type RcBasicItem = {
  pk: string;
  combinator: string;
  rules: RcBasicItem[] | never[];
  [k: string]: any;
};

export type RcRulesData = {
  conditionList: RcBasicItem[] | never[];
};

export type commonDataTypes = Omit<RcBasicItem, 'combinator' | 'rules' | 'pk'>;
type statusValue = string;
export type combinatorValueType = [statusValue, statusValue];
export type RcDataSourceType = commonDataTypes[] | never[];
export interface RcRulesConfig {
  initialColumnValue?: Record<string, any>;
  columns?: RcFieldItem[];
  defaultOneItem?: boolean;
  multiple?: boolean;
  fileNames?: {
    combinator: string;
    rules: string;
  };
  combinatorDisabled?: boolean;
  defaultCombinator?: 'and' | 'or';
  combinatorValue?: combinatorValueType;
  value?: Record<keyof commonDataTypes, any>;
  onChange?: (value: Record<keyof commonDataTypes, any> | undefined) => void;
  hideActionsButton?: boolean;
  layerNum?: number;
  ruleMaxNumber?: number;
  footer?: string | React.ReactNode;
  conditionRender?: React.ReactNode;
  deleteRender?: React.ReactNode;
  autoWidth?: number | 'auto' | '100%';
  autoHeight?: number | 'auto';
  zIndex?: number;
  wrap?: boolean;
}

const MsRulesConfig = React.forwardRef<HTMLDivElement, RcRulesConfig>(
  (
    {
      initialColumnValue,
      columns,
      defaultOneItem = true,
      multiple,
      //提交时此数据做参数变换
      fileNames = {
        combinator: 'combinator',
        rules: 'rules',
      },
      value = {},
      onChange,
      combinatorDisabled,
      defaultCombinator = 'and',
      combinatorValue,
      hideActionsButton,
      layerNum,
      ruleMaxNumber,
      autoWidth = 'auto',
      autoHeight = 'auto',
      zIndex,
      footer,
      conditionRender,
      deleteRender,
      wrap,
    },
    ref,
  ) => {
    const cancelRef = useRef<boolean>(false);

    const rulesColumnsObj = useMemo(() => {
      if (isArray(columns) && columns.length > 0) {
        const obj = {};
        columns.forEach((item) => {
          Reflect.set(obj, item.dataIndex, initialColumnValue?.[item.dataIndex] || void 0);
        });

        return obj;
      }

      return {};
    }, [columns, initialColumnValue]);

    const initConditionList = useCreation(() => {
      if (columns && columns.length > 0 && rulesColumnsObj) {
        const conditionList = [];

        const rulesInitData: RcBasicItem = {
          pk: getUuid(),
          combinator: '',
          rules: [],
          ...rulesColumnsObj,
        };

        conditionList.push({
          pk: INIT_PK,
          combinator: defaultCombinator,
          rules: defaultOneItem && rulesInitData ? [rulesInitData] : [],
        });
        return conditionList;
      }

      return [];
    }, [columns, rulesColumnsObj]);

    const realData = useCreation<RcRulesData>(() => {
      const { rules } = fileNames;
      if (
        Object.keys(value || {}).length > 0 &&
        isArray(value?.[rules]) &&
        value?.[rules].length > 0
      ) {
        const conditionList = [value];
        const data = generateRulesData({ conditionList, fileNames, combinatorValue });
        return { conditionList: data };
      }

      return { conditionList: initConditionList };
    }, [combinatorValue, fileNames, initConditionList, value]);

    const [rulesData, setRulesData] = useSafeState<RcRulesData>(realData);

    const { run, cancel } = useDebounceFn(
      () => {
        setRulesData(
          produce((draft: RcRulesData) => {
            draft.conditionList = realData.conditionList;
          }),
        );
      },
      { wait: 300 },
    );

    useDeepCompareEffect(() => {
      run();
      if (cancelRef.current && value.pk !== '1') {
        cancel();
      }
    }, [value]);

    const renderGroupList = (values: RcBasicItem) => {
      const { rules, pk } = values || {};
      const VNode: JSX.Element[] = [];

      if (rules && rules.length > 0) {
        // 统计条件总数
        const ruleNum = getRulesLength(values);
        rules.forEach((item, index) => {
          if (item.combinator === '') {
            VNode.push(
              <BasicItem
                oneItem={defaultOneItem}
                layerNum={layerNum}
                ruleMaxNumber={ruleMaxNumber}
                ruleNum={ruleNum}
                multiple={!!multiple}
                conditionRender={conditionRender}
                deleteRender={deleteRender}
                wrap={wrap}
                hideActionsButton={!!hideActionsButton}
                index={index}
                fatherPk={pk}
                key={item.pk}
                lineData={item}
                initObj={rulesColumnsObj}
                defaultCombinator={defaultCombinator}
                update={[rulesData, setRulesData]}
                onChange={onChange}
                cancelRef={cancelRef}
                fileNames={fileNames}
                combinatorValue={combinatorValue}
                columns={columns || []}
              />,
            );
          } else {
            VNode.push(
              <RulesGroup
                key={item.pk}
                multiple={!!multiple}
                conditionRender={conditionRender}
                deleteRender={deleteRender}
                layerNum={layerNum}
                hideActionsButton={!!hideActionsButton}
                rule={item}
                initObj={rulesColumnsObj}
                defaultCombinator={defaultCombinator}
                update={[rulesData, setRulesData]}
                onChange={onChange}
                cancelRef={cancelRef}
                fileNames={fileNames}
                combinatorValue={combinatorValue}
                combinatorDisabled={!!combinatorDisabled}
              >
                {renderGroupList(item)}
              </RulesGroup>,
            );
          }
        });
      }

      return VNode;
    };

    const rCContent = useMemoizedFn(() => {
      return (
        <div ref={ref} className="ms-rules-config-content">
          <RulesGroup
            key={INIT_PK}
            multiple={!!multiple}
            conditionRender={conditionRender}
            deleteRender={deleteRender}
            layerNum={layerNum}
            hideActionsButton={!!hideActionsButton}
            rule={rulesData?.conditionList[0]}
            initObj={rulesColumnsObj}
            defaultCombinator={defaultCombinator}
            update={[rulesData, setRulesData]}
            onChange={onChange}
            cancelRef={cancelRef}
            fileNames={fileNames}
            combinatorValue={combinatorValue}
            combinatorDisabled={!!combinatorDisabled}
          >
            {renderGroupList(rulesData?.conditionList[0])}
          </RulesGroup>
          {/* 添加总结 */}
          {footer && <div className="ms-rules-config-footer">{footer}</div>}
        </div>
      );
    });

    return (
      <>
        {autoHeight === 'auto' && autoWidth === 'auto' ? (
          rCContent()
        ) : (
          <Scrollbars
            autoHide
            autoHideTimeout={AUTO_SCROLL_BAR.autoHideTimeout}
            autoHideDuration={AUTO_SCROLL_BAR.autoHideDuration}
            autoHeight
            autoHeightMin={
              isNumber(autoHeight) && autoHeight > 0 ? autoHeight : AUTO_SCROLL_BAR.autoHeightMin
            }
            style={{
              width: isNumber(autoWidth) && autoWidth > 0 ? autoWidth : AUTO_SCROLL_BAR.autoWidth,
              zIndex: isNumber(zIndex) ? zIndex : AUTO_SCROLL_BAR.zIndex,
            }}
          >
            {rCContent()}
          </Scrollbars>
        )}
      </>
    );
  },
);

export default MsRulesConfig;
