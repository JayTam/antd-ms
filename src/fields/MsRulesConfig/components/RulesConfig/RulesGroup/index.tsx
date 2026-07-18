import React, { useCallback, useState, useMemo, useEffect, memo } from 'react';
import classNames from 'classnames';
import { cloneDeep } from 'lodash-es';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Popconfirm, type MenuProps } from 'antd';
import { getRulesLength, getGroupLength } from '../../../utils';
import { INIT_PK } from '../constant';
import { type ThandleRules, useHandleRules } from '../../hooks/useHandleRules';

import type { RcBasicItem } from '..';

import './index.less';
import { useLocale } from '@jaytam/antd-ms/locale';

export type combinatorType = 'and' | 'or';

const RulesGroup: React.FC<
  {
    rule: RcBasicItem;
    children: React.ReactNode;
    multiple: boolean;
    hideActionsButton: boolean;
    conditionRender?: React.ReactNode;
    deleteRender?: React.ReactNode;
    combinatorDisabled?: boolean;
  } & Omit<ThandleRules, 'fatherPk'>
> = ({
  rule, // 嵌套内当前层数据
  update,
  initObj,
  defaultCombinator,
  multiple,
  layerNum,
  onChange,
  cancelRef,
  fileNames,
  combinatorValue,
  combinatorDisabled,
  hideActionsButton,
  conditionRender,
  deleteRender,
  children,
}) => {
  const [data] = update; //原始数据
  const [combinator, setCombinator] = useState<combinatorType>('and');
  const { currentLocale, globalLocale } = useLocale('MsRulesConfig');

  const { addCondition, setConditionGroup, updateState, items } = useHandleRules({
    initObj,
    defaultCombinator,
    fatherPk: rule?.pk ?? INIT_PK,
    update,
    layerNum,
    onChange,
    cancelRef,
    fileNames,
    combinatorValue,
  });

  const conditionChange = useCallback(
    (value: string) => {
      const handleRules = (arr: RcBasicItem[] | never[], pk: string, value: string) => {
        arr?.forEach((item) => {
          if (item.pk === pk) {
            Reflect.set(item, 'combinator', value);
          } else {
            handleRules(item.rules, rule.pk, value);
          }
        });
        return arr;
      };

      const newData = handleRules(cloneDeep(data.conditionList), rule?.pk, value);
      updateState(newData);
    },
    [data?.conditionList, rule?.pk, updateState],
  );

  useEffect(() => {
    if (!rule?.combinator) conditionChange('and');
    setCombinator((rule?.combinator ?? 'and') as combinatorType);
  }, [conditionChange, rule?.combinator]);

  const rulesLength = useMemo(() => getRulesLength(rule), [rule]);
  const groupLength = useMemo(() => getGroupLength(rule), [rule]);

  const boxClassName = useMemo(() => {
    if (hideActionsButton || combinatorDisabled) {
      return rule?.rules?.length === 1 || rule?.rules?.length === 0
        ? ''
        : 'ms-rules-config-selectd-disabled';
    }
    if (!hideActionsButton && combinator === 'and' && !combinatorDisabled) {
      return 'ms-rules-config-selectd-and';
    }
    if (!hideActionsButton && combinator === 'or' && !combinatorDisabled) {
      return 'ms-rules-config-selectd-or';
    }
    return '';
  }, [hideActionsButton, combinatorDisabled, combinator, rule?.rules?.length]);

  const lineBgClass = useMemo(() => {
    if (!hideActionsButton && rule?.rules?.length > 1 && !combinatorDisabled) {
      if (combinator === 'and') return 'ms-rules-config-lineBg-and';
      if (combinator === 'or') return 'ms-rules-config-lineBg-or';
    }
    if (!hideActionsButton && (rule?.rules?.length === 1 || rule?.rules?.length === 0)) {
      return 'ms-rules-config-lineBg-transparent';
    }
    if (combinatorDisabled && rule?.rules?.length !== 1) {
      return 'ms-rules-config-lineBg-disabled';
    }
    return rule?.rules?.length === 1 || rule?.rules?.length === 0
      ? 'ms-rules-config-lineBg-transparent'
      : 'ms-rules-config-lineBg-disabled';
  }, [combinator, combinatorDisabled, hideActionsButton, rule?.rules?.length]);

  const boxBorderClass = useMemo(() => {
    if (!hideActionsButton && rule?.rules?.length > 1 && !combinatorDisabled) {
      if (combinator === 'and') return 'ms-rules-config-selectd-border-and';
      if (combinator === 'or') return 'ms-rules-config-selectd-border-or';
    }
    if (!hideActionsButton && (rule?.rules?.length === 1 || rule?.rules?.length === 0)) {
      return 'ms-rules-config-selectd-border-transparent';
    }
    if (combinatorDisabled && rule?.rules?.length !== 1) {
      return 'ms-rules-config-selectd-border-disabled';
    }
    return rule?.rules?.length === 1 || rule?.rules?.length === 0
      ? 'ms-rules-config-selectd-border-transparent'
      : 'ms-rules-config-selectd-border-disabled';
  }, [combinator, combinatorDisabled, hideActionsButton, rule?.rules?.length]);

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') {
      addCondition();
    }
    if (key === '2') {
      setConditionGroup('add');
    }
  };

  return (
    <div className={classNames('ms-rules-config', boxBorderClass)}>
      <div className="ms-rules-config-group">
        {((multiple && rulesLength === 0 && groupLength > 0) ||
          (multiple && rulesLength === 0 && groupLength === 0)) &&
          !hideActionsButton && (
            <Space
              align="center"
              style={
                multiple && rulesLength === 0 && groupLength === 0
                  ? { marginBottom: 0 }
                  : { marginBottom: 16 }
              }
            >
              <Dropdown menu={{ items, onClick }}>
                {conditionRender ? (
                  <div className="ms-rules-config-custom-node">{conditionRender}</div>
                ) : (
                  <Button
                    type="text"
                    className="ms-rules-config-nr-btn"
                    icon={<PlusCircleOutlined />}
                  />
                )}
              </Dropdown>
              {rule?.pk && rule?.pk !== INIT_PK && (
                <Popconfirm
                  placement="bottomLeft"
                  title={currentLocale.conditionsDelete}
                  onConfirm={() => setConditionGroup('del')}
                  okText={globalLocale.ok}
                  cancelText={globalLocale.cancel}
                >
                  {deleteRender ? (
                    <>{deleteRender}</>
                  ) : (
                    <Button
                      type="text"
                      className="ms-rules-config-del-btn"
                      icon={<MinusCircleOutlined />}
                    />
                  )}
                </Popconfirm>
              )}
            </Space>
          )}
        {!multiple && rulesLength === 0 && !hideActionsButton && (
          <>
            {conditionRender ? (
              <div className="ms-rules-config-custom-node" onClick={addCondition}>
                {conditionRender}
              </div>
            ) : (
              <Button
                type="text"
                className="ms-rules-config-nr-btn"
                icon={<PlusCircleOutlined />}
                onClick={addCondition}
              />
            )}
          </>
        )}
        {children}
      </div>
      <div className={classNames('ms-rules-config-top-line', lineBgClass)} />
      {rule?.rules?.length > 1 && (
        <div
          className={classNames('ms-rules-config-selectd', boxClassName)}
          onClick={() => {
            const newCombinator = combinator === 'and' ? 'or' : 'and';
            if (!hideActionsButton && !combinatorDisabled) {
              setCombinator(newCombinator);
              conditionChange(newCombinator);
            }
          }}
        >
          {combinator === 'and' ? currentLocale.and : currentLocale.or}
        </div>
      )}
      <div className={classNames('ms-rules-config-bottom-line', lineBgClass)} />
    </div>
  );
};

export default memo(RulesGroup);
