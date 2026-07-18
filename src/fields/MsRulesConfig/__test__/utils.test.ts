import type {
  BaseRule,
  RcBasicItem,
  RcDataSourceType,
  RcRulesConfig,
} from '../components/RulesConfig';
import {
  hashNamesFilter,
  rulesDataFilter,
  generateRulesData,
  handleVerifyField,
  getRulesLength,
  getGroupLength,
} from '../utils';

type RulesConfigType = Required<RcRulesConfig>;
type filterDataType = {
  rules: RcBasicItem[];
  fileNames: RulesConfigType['fileNames'];
  combinatorValue?: RulesConfigType['combinatorValue'];
};
type generateRules = {
  fileNames: RulesConfigType['fileNames'];
  conditionList: RcDataSourceType;
  combinatorValue?: RulesConfigType['combinatorValue'];
};

describe('utils tests', () => {
  test('测试rulesDataFilter下rules数组长度为1', () => {
    const filterData: filterDataType = {
      rules: [
        {
          pk: '2',
          combinator: 'and',
          rules: [
            {
              a: 1,
              aName: '测试a',
              combinator: '',
              pk: '3',
              rules: [],
            },
          ],
        },
      ],
      fileNames: {
        combinator: 'bb',
        rules: 'cc',
      },
    };

    const res = rulesDataFilter(filterData);
    expect(res?.cc).toHaveLength(1);
    const [f] = res?.cc || [];
    expect(f?.pk).toBeUndefined();
    expect(f?.combinator).toBeUndefined();
    expect(f?.a).toEqual(1);
    expect(f?.aName).toEqual('测试a');
  });
  test('rulesDataFilter下rules数组长度为多个', () => {
    const filterData: filterDataType = {
      rules: [
        {
          pk: '2',
          combinator: 'or',
          rules: [
            {
              a: 1,
              aName: '测试b',
              b: 2,
              combinator: '',
              pk: '3',
              rules: [],
            },
            {
              a: 3,
              b: 4,
              combinator: '',
              pk: '3',
              rules: [],
            },
          ],
        },
      ],
      fileNames: {
        combinator: 'bb',
        rules: 'cc',
      },
      combinatorValue: ['1', '0'],
    };

    const res = rulesDataFilter(filterData);
    expect(res?.cc).toHaveLength(2);
    const [f, s] = res?.cc || [];
    expect(f.pk).toBeUndefined();
    expect(f.combinator).toBeUndefined();
    expect(f.a).toEqual(1);
    expect(f.aName).toEqual('测试b');
    expect(s.bb).toBeUndefined();
    expect(s.a).toEqual(3);
    expect(s.b).toEqual(4);
    expect(s.pk).toBeUndefined();
  });
  test('测试generateRulesData方法', () => {
    const data: generateRules = {
      conditionList: [
        {
          bb: 'or',
          cc: [
            {
              modelCode: '0',
              modelName: '选项0',
              name: '1',
            },
          ],
        },
      ],
      fileNames: {
        combinator: 'bb',
        rules: 'cc',
      },
    };

    const res = generateRulesData(data);
    expect(res).toHaveLength(1);
    expect(res[0].pk).toEqual('0');
    expect(res[0].combinator).toEqual('or');
    expect(res[0].rules).toHaveLength(1);
    expect(res[0].rules[0].combinator).toEqual('');
    expect(typeof res[0].rules[0].pk).toBe('string');
    expect(res[0].rules[0].pk).not.toBe('');
    expect(res[0].rules[0].name).toEqual('1');
    expect(res[0].rules[0].modelName).toEqual('选项0');
  });
  test('测试generateRulesData方法的条件替换', () => {
    const data: generateRules = {
      conditionList: [
        {
          bb: '0',
          cc: [
            {
              modelCode: '0',
              modelName: '选项0',
              name: '1',
            },
            {
              modelCode: '1',
              modelName: '选项1',
              name: '3',
            },
          ],
        },
      ],
      fileNames: {
        combinator: 'bb',
        rules: 'cc',
      },
      combinatorValue: ['1', '0'],
    };

    const res = generateRulesData(data);
    expect(res).toHaveLength(1);
    expect(res[0].pk).toEqual('0');
    expect(res[0].combinator).toEqual('or');
    expect(res[0].rules).toHaveLength(2);
    expect(res[0].rules[0].combinator).toEqual('');
    expect(typeof res[0].rules[0].pk).toBe('string');
    expect(res[0].rules[0].pk).not.toBe('');
    expect(res[0].rules[0].name).toEqual('1');
    expect(res[0].rules[0].modelName).toEqual('选项0');

    expect(res[0].rules[1].combinator).toEqual('');
    expect(typeof res[0].rules[1].pk).toBe('string');
    expect(res[0].rules[1].pk).not.toBe('');
    expect(res[0].rules[1].name).toEqual('3');
    expect(res[0].rules[1].modelName).toEqual('选项1');
  });
  test('测试handleVerifyField验证enum方法', () => {
    const filledRules: BaseRule = {
      enum: [1, 2, 3],
      message: '请匹配包含的类型',
    };
    const [successVerifyResult, smsg] = handleVerifyField(2, filledRules);
    const [errorVerifyResult, msg] = handleVerifyField(5, filledRules);

    expect(successVerifyResult).toEqual('success');
    expect(smsg).toEqual('');
    expect(errorVerifyResult).toEqual('error');
    expect(msg).toEqual('请匹配包含的类型');
  });
  test('测试handleVerifyField验证字符串len方法', () => {
    const filledRules: BaseRule = {
      len: 11,
      message: '字符长度必须为11位',
    };
    const [errorVerifyResult, msg] = handleVerifyField('aaa', filledRules);
    const [successVerifyResult, smsg] = handleVerifyField('18888888888', filledRules);

    expect(successVerifyResult).toEqual('success');
    expect(smsg).toEqual('');
    expect(errorVerifyResult).toEqual('error');
    expect(msg).toEqual('字符长度必须为11位');
  });
  test('测试handleVerifyField验证数组len方法', () => {
    const filledRules: BaseRule = {
      len: 1,
      message: '数组只能选中一项',
    };
    const [errorVerifyResult, msg] = handleVerifyField([1, 2], filledRules);
    const [successVerifyResult, smsg] = handleVerifyField([1], filledRules);

    expect(successVerifyResult).toEqual('success');
    expect(smsg).toEqual('');
    expect(errorVerifyResult).toEqual('error');
    expect(msg).toEqual('数组只能选中一项');
  });
  test('测试handleVerifyField方法的最大、最小值验证', () => {
    const filledRules: BaseRule[] = [
      {
        max: 11,
        message: '购物车添加最大数量为11',
      },
      {
        min: 6,
        message: '购物车最少添加数量为6',
      },
    ];
    const [aSuccessVerifyResult, amsg] = handleVerifyField(7, filledRules[0]);
    const [bSuccessVerifyResult, bmsg] = handleVerifyField(7, filledRules[1]);
    const [cSuccessVerifyResult, cmsg] = handleVerifyField(2, filledRules[0]);
    const [dErrorVerifyResult, dsmsg] = handleVerifyField(2, filledRules[1]);
    const [eErrorVerifyResult, emsg] = handleVerifyField(20, filledRules[0]);
    const [fErrorVerifyResult, fsmsg] = handleVerifyField(20, filledRules[1]);

    expect(aSuccessVerifyResult).toEqual('success');
    expect(amsg).toEqual('');
    expect(bSuccessVerifyResult).toEqual('success');
    expect(bmsg).toEqual('');
    expect(cSuccessVerifyResult).toEqual('success');
    expect(cmsg).toEqual('');
    expect(dErrorVerifyResult).toEqual('error');
    expect(dsmsg).toEqual('购物车最少添加数量为6');
    expect(eErrorVerifyResult).toEqual('error');
    expect(emsg).toEqual('购物车添加最大数量为11');
    expect(fErrorVerifyResult).toEqual('success');
    expect(fsmsg).toEqual('');
  });
  test('测试handleVerifyField方法的正则表达式验证', () => {
    const filledRules: BaseRule = {
      pattern: /\w[-.\w]*\@[-a-z0-9]+(\.[-a-z0-9]+)*\.(com|cn|edu|uk)/gi,
      message: '邮箱格式错误',
    };
    const [errorVerifyResult, msg] = handleVerifyField('xxx#msxf.com', filledRules);
    const [successVerifyResult, smsg] = handleVerifyField('xxx@msxf.com', filledRules);

    expect(successVerifyResult).toEqual('success');
    expect(smsg).toEqual('');
    expect(errorVerifyResult).toEqual('error');
    expect(msg).toEqual('邮箱格式错误');
  });
  test('数组中规则条件和组的数量', () => {
    const rulesArr: RcBasicItem = {
      pk: '0',
      combinator: 'or',
      rules: [
        {
          pk: '1',
          combinator: '',
          name: 1,
          rules: [],
        },
        {
          pk: '2',
          combinator: '',
          name: 2,
          rules: [],
        },
        {
          pk: '3',
          combinator: 'and',
          rules: [
            {
              pk: '4',
              combinator: '',
              name: 3,
              rules: [],
            },
          ],
        },
      ],
    };
    const ruleNum = getRulesLength(rulesArr);
    const groupNum = getGroupLength(rulesArr);

    expect(ruleNum).toEqual(2);
    expect(groupNum).toEqual(1);
  });
  test('测试hashNamesFilter方法返回值正确验证', () => {
    const hashObj: Record<string, string> = {
      'cd215681-bf24-450e-bb7b-678d4f7d4ae6_name': 'ok',
      a: 'success',
    };
    const values = hashNamesFilter(hashObj);
    const length = Object.keys(values ?? {}).length;
    expect(values?.a).toEqual('success');
    expect(length).toEqual(1);
  });
});
