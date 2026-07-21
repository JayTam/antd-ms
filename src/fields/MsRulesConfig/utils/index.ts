import { getUuid } from '@jaytam/antd-ms/utils/base';
import { INIT_PK } from '../components/RulesConfig/constant';

import type { RcBasicItem, RcRulesConfig, BaseRule } from '../components/RulesConfig';
import type { combinatorType } from '../components/RulesConfig/RulesGroup';
import { cloneDeep, isArray, isNumber, isString } from 'lodash-es';

type RulesConfigType = Required<RcRulesConfig>;
type returnArray = ['error' | 'success', string | undefined];

type filterDataType = {
  rules: RcBasicItem[];
  fileNames: RulesConfigType['fileNames'];
  combinatorValue?: RulesConfigType['combinatorValue'];
};

type generateRules = {
  fileNames: RulesConfigType['fileNames'];
  conditionList: RulesConfigType['value'][];
  combinatorValue?: RulesConfigType['combinatorValue'];
};

export const rulesDataFilter = (args: filterDataType) => {
  const { rules, fileNames, combinatorValue } = args;
  const { combinator, rules: ruleName } = fileNames;
  const handleCombinator = (value: combinatorType) => {
    if (combinatorValue && combinatorValue.length === 2) {
      const [f, s] = combinatorValue;
      return value === 'and' ? f : s;
    }
    return value;
  };
  if (rules?.length > 0) {
    rules.forEach((item) => {
      Reflect.deleteProperty(item, 'pk');
      if (!item.combinator) {
        Reflect.deleteProperty(item, 'combinator');
      } else {
        Reflect.set(
          item,
          combinator,
          // item.rules.length === 1 ? void 0 : handleCombinator(item.combinator as combinatorType),
          handleCombinator(item.combinator as combinatorType), //组件处理单条条件去除会有回显问题，这种场景不存在，
        );
        if (combinator !== 'combinator') Reflect.deleteProperty(item, 'combinator');
      }
      if (isArray(item.rules) && item.rules.length === 0) {
        Reflect.deleteProperty(item, 'rules');
      } else {
        Reflect.set(item, ruleName, item.rules);
      }
      if (isArray(item[ruleName]) && item[ruleName].length > 0) {
        const rulesArr = item[ruleName];
        if (ruleName !== 'rules') Reflect.deleteProperty(item, 'rules');
        rulesDataFilter({ rules: rulesArr, fileNames, combinatorValue });
      }
    });

    return rules[0] ?? null;
  }

  return null;
};

export const generateRulesData = (args: generateRules) => {
  const { conditionList, fileNames, combinatorValue } = args;
  const { combinator, rules: ruleName } = fileNames;

  const handleCombinator = (value: combinatorType) => {
    const index = combinatorValue?.findIndex((cItem: string) => cItem === value);
    if (index === 0) {
      return 'and';
    } else if (index === 1) {
      return 'or';
    } else {
      return value;
    }
  };

  const generateRule = (arr: any[]) => {
    if (arr && arr.length > 0) {
      arr.forEach((item: Record<string, any>) => {
        Reflect.set(item, 'pk', getUuid());
        // 处理条件转化
        if (combinatorValue && combinatorValue.length === 2) {
          Reflect.set(item, 'combinator', handleCombinator(item[combinator] || ''));
        } else {
          Reflect.set(item, 'combinator', item[combinator] || '');
        }
        Reflect.set(item, 'rules', item[ruleName] || []);
        if (combinator !== 'combinator') Reflect.deleteProperty(item, combinator);
        if (isArray(item?.rules) && item?.rules.length > 0) {
          if (ruleName !== 'rules') Reflect.deleteProperty(item, ruleName);
          generateRule(item.rules);
        }
      });
    }
  };

  const cloneConditionList = cloneDeep(conditionList);
  generateRule(cloneConditionList || []);

  const data = cloneConditionList;

  Reflect.set(data[0], 'pk', INIT_PK);
  return (data as RcBasicItem[] | never[]) || [];
};

/**
 * ### 😂阉割版antd的自定义规则校验
 * @param value unknown
 * @param rule 阉割版antd的BaseRule
 * @returns [string, string]
 */
export const handleVerifyField: (value: unknown, rule: BaseRule) => returnArray = (value, rule) => {
  if (value !== undefined && rule?.enum && rule.enum.length > 0 && !rule.enum.includes(value)) {
    return ['error', rule.message];
  }
  if ((isString(value) || isArray(value)) && rule?.len && rule?.len !== value.length) {
    return ['error', rule.message];
  }
  if ((isString(value) || isNumber(value)) && isNumber(rule.max) && +value > rule.max) {
    return ['error', rule.message];
  }
  if ((isString(value) || isNumber(value)) && isNumber(rule.min) && +value < rule.min) {
    return ['error', rule.message];
  }
  if (isString(value) && rule?.pattern && !rule?.pattern?.test(value)) {
    return ['error', rule.message];
  }

  return ['success', ''];
};

export function hashNamesFilter<T extends Record<string, any>>(
  values: Record<string, any>,
): T | undefined {
  const noHashArray = Object.entries(values ?? {})?.filter(([key]) => key.split('-').length !== 5);
  if (noHashArray?.length > 0) {
    return Object.fromEntries(noHashArray) as T;
  }
  return void 0;
}

export const getRulesLength = (values: RcBasicItem) => {
  const rules = values?.rules?.filter((item) => item.combinator === '' || !item.combinator) || [];
  return rules.length;
};
export const getGroupLength = (values: RcBasicItem) => {
  const rules = values?.rules?.filter((item) => ['and', 'or'].includes(item.combinator)) || [];
  return rules.length;
};
