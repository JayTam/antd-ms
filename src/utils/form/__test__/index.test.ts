import type { MsFormColumns } from '@jaytam/antd-ms';
import { leafValueNotNil } from '@jaytam/antd-ms';
import dayjs from 'dayjs';
import moment from 'moment';
import {
  deepMerge,
  flatColumnsDeep,
  isNamePathEqual,
  omitEmptyDeep,
  omitPrivateDeep,
  transformToStringDeep,
} from '..';
import { omitNilDeep, trimValuesDeep } from '../index';

describe('trimValuesDeep 递归去空格', () => {
  test('对象', () => {
    expect(trimValuesDeep({})).toStrictEqual({});
    expect(trimValuesDeep({ a: 'a' })).toStrictEqual({ a: 'a' });
    expect(trimValuesDeep({ a: ' a' })).toStrictEqual({ a: 'a' });
    expect(trimValuesDeep({ a: 'a ' })).toStrictEqual({ a: 'a' });
    expect(trimValuesDeep({ a: ' a ' })).toStrictEqual({ a: 'a' });
  });

  test('时间类型', () => {
    const date = new Date();
    const momentInstance = moment();
    const dayjsInstance = dayjs();
    expect(trimValuesDeep({ date, moment: momentInstance, dayjs: dayjsInstance })).toStrictEqual({
      date,
      moment: momentInstance,
      dayjs: dayjsInstance,
    });
  });

  test('文件类型', () => {
    const file = new File([], 'filename.txt');
    expect(trimValuesDeep({ file })).toStrictEqual({ file });
  });

  test('基础类型', () => {
    expect(trimValuesDeep(undefined as any)).toStrictEqual(undefined);
    expect(trimValuesDeep(null as any)).toStrictEqual(null);
    expect(trimValuesDeep(22 as any)).toStrictEqual(22);
  });

  test('数组', () => {
    expect(trimValuesDeep([])).toStrictEqual([]);
    expect(trimValuesDeep(['a'])).toStrictEqual(['a']);
    expect(trimValuesDeep([' a'])).toStrictEqual(['a']);
    expect(trimValuesDeep(['a '])).toStrictEqual(['a']);
    expect(trimValuesDeep([' a '])).toStrictEqual(['a']);
  });

  test('空格', () => {
    expect(
      trimValuesDeep({
        a: 'a',
        b: {
          ba: 'ba',
          bb: 'bb',
        },
      }),
    ).toStrictEqual({
      a: 'a',
      b: {
        ba: 'ba',
        bb: 'bb',
      },
    });
    expect(
      trimValuesDeep({
        a: ' a',
        b: {
          ba: ' ba',
          bb: ' bb',
        },
      }),
    ).toStrictEqual({
      a: 'a',
      b: {
        ba: 'ba',
        bb: 'bb',
      },
    });
    expect(
      trimValuesDeep({
        a: 'a',
        b: {
          ba: 'ba   ',
          bb: 'bb   ',
        },
      }),
    ).toStrictEqual({
      a: 'a',
      b: {
        ba: 'ba',
        bb: 'bb',
      },
    });
  });

  test('{}套[]', () => {
    expect(
      trimValuesDeep({
        a: ' a ',
        b: [' a ', ' b ', ' c '],
      }),
    ).toStrictEqual({
      a: 'a',
      b: ['a', 'b', 'c'],
    });
  });

  test('{}套{}套{}', () => {
    expect(
      trimValuesDeep({
        a: ' a ',
        b: { ba: ' ba ', bb: { bba: ' bba ' } },
      }),
    ).toStrictEqual({
      a: 'a',
      b: { ba: 'ba', bb: { bba: 'bba' } },
    });
  });

  test('{}套[]套[]', () => {
    expect(
      trimValuesDeep({
        a: ' a ',
        b: [[' a ', ' b', 'c'], ' b ', ' c '],
      }),
    ).toStrictEqual({
      a: 'a',
      b: [['a', 'b', 'c'], 'b', 'c'],
    });
  });

  test('{}套[]套[]套{}', () => {
    expect(trimValuesDeep({ a: [{ b: [{ c: ' ccc ' }] }] })).toStrictEqual({
      a: [{ b: [{ c: 'ccc' }] }],
    });
  });

  test('不能修改原引用', () => {
    const data = { a: [{ b: [{ c: 'ccc' }] }] };
    expect(trimValuesDeep(data)).not.toBe(data);
    const obj = {};
    expect(omitNilDeep(obj)).not.toBe(obj);
    const array: any = [];
    expect(omitNilDeep(array)).not.toBe(array);
  });
});

describe('omitNilDeep 递归剔除 null 和 undefined', () => {
  test('时间类型', () => {
    const date = new Date();
    const momentInstance = moment();
    const dayjsInstance = dayjs();
    expect(omitNilDeep({ date, moment: momentInstance, dayjs: dayjsInstance })).toStrictEqual({
      date,
      moment: momentInstance,
      dayjs: dayjsInstance,
    });
  });

  test('文件类型', () => {
    const file = new File([], 'filename.txt');
    expect(omitNilDeep({ file })).toStrictEqual({ file });
  });
  test('对象', () => {
    expect(omitNilDeep({})).toStrictEqual({});
    expect(
      omitNilDeep({
        null: null,
        undefined: undefined,
        str: '',
        0: 0,
        1: 1,
        true: true,
        false: false,
        obj: {},
        array: [],
      }),
    ).toStrictEqual({
      str: '',
      0: 0,
      1: 1,
      true: true,
      false: false,
      obj: {},
      array: [],
    });
  });

  test('数组', () => {
    expect(omitNilDeep([])).toStrictEqual([]);
    expect(omitNilDeep([, null, undefined, 0, 1, true, false, {}, []])).toStrictEqual([
      ,
      null,
      undefined,
      0,
      1,
      true,
      false,
      {},
      [],
    ]);
  });

  test('undefined', () => {
    expect(omitNilDeep({ a: undefined, b: [], c: {} })).toStrictEqual({ b: [], c: {} });
  });

  test('null', () => {
    expect(omitNilDeep({ a: null, b: [], c: {} })).toStrictEqual({ b: [], c: {} });
  });

  test('nil', () => {
    expect(omitNilDeep({ a: null, b: undefined, c: [], d: {} })).toStrictEqual({
      c: [],
      d: {},
    });
  });

  test('deep []套[] nil', () => {
    expect(
      omitNilDeep([['a', true, false, 0, 1, null, undefined, '', [], {}], ['b']]),
    ).toStrictEqual([['a', true, false, 0, 1, null, undefined, '', [], {}], ['b']]);
  });

  test('deep []套{} nil', () => {
    expect(
      omitNilDeep([
        {
          null: null,
          undefined: undefined,
          str: '',
          0: 0,
          1: 1,
          true: true,
          false: false,
          obj: {},
          array: [],
        },
        {},
        { c: 'c' },
      ]),
    ).toStrictEqual([
      {
        str: '',
        0: 0,
        1: 1,
        true: true,
        false: false,
        obj: {},
        array: [],
      },
      {},
      { c: 'c' },
    ]);
  });

  test('deep {}套[] nil', () => {
    expect(
      omitNilDeep({
        a: { aa: undefined, ab: 'ab', ac: null },
        b: [, null, undefined, 0, 1, true, false, {}, []],
        c: {},
      }),
    ).toStrictEqual({
      a: { ab: 'ab' },
      b: [, null, undefined, 0, 1, true, false, {}, []],
      c: {},
    });
  });

  test('deep {}套{}套{} nil', () => {
    expect(
      omitNilDeep({
        a: {
          b: {
            c: {
              d: {
                null: null,
                undefined: undefined,
                str: '',
                0: 0,
                1: 1,
                true: true,
                false: false,
                obj: {},
                array: [],
              },
              dd: 'dd',
            },
            cc: false,
          },
          bb: 'bb',
        },
      }),
    ).toStrictEqual({
      a: {
        b: {
          c: {
            d: {
              str: '',
              0: 0,
              1: 1,
              true: true,
              false: false,
              obj: {},
              array: [],
            },
            dd: 'dd',
          },
          cc: false,
        },
        bb: 'bb',
      },
    });
  });

  test('不能修改原引用', () => {
    const data = { a: [{ b: [{ c: 'ccc' }] }] };
    expect(omitNilDeep(data)).not.toBe(data);
    const obj = {};
    expect(omitNilDeep(obj)).not.toBe(obj);
    const array: any = [];
    expect(omitNilDeep(array)).not.toBe(array);
  });
});

describe('omitEmptyDeep 递归剔除空元素', () => {
  test('{}', () => {
    expect(omitEmptyDeep({})).toStrictEqual({});
    expect(
      omitEmptyDeep({
        null: null,
        undefined: undefined,
        str: '',
        0: 0,
        1: 1,
        true: true,
        false: false,
        obj: {},
        array: [],
        a: 'a',
      }),
    ).toStrictEqual({
      0: 0,
      1: 1,
      true: true,
      false: false,
      a: 'a',
    });
  });

  test('时间类型', () => {
    const date = new Date();
    const momentInstance = moment();
    const dayjsInstance = dayjs();
    expect(omitEmptyDeep({ date, moment: momentInstance, dayjs: dayjsInstance })).toStrictEqual({
      date,
      moment: momentInstance,
      dayjs: dayjsInstance,
    });
  });

  test('文件类型', () => {
    const file = new File([], 'filename.txt');
    expect(omitEmptyDeep({ file })).toStrictEqual({ file });
  });

  test('[]', () => {
    expect(omitEmptyDeep([])).toStrictEqual([]);
    expect(omitEmptyDeep([, null, undefined, 0, 1, true, false, {}, []])).toStrictEqual([
      ,
      null,
      undefined,
      0,
      1,
      true,
      false,
      {},
      [],
    ]);
  });

  test('undefined', () => {
    expect(omitEmptyDeep({ a: undefined, b: [], c: {} })).toStrictEqual({});
  });

  test('null', () => {
    expect(omitEmptyDeep({ a: null, b: [], c: {} })).toStrictEqual({});
  });

  test('nil', () => {
    expect(omitEmptyDeep({ a: null, b: undefined, c: [], d: {} })).toStrictEqual({});
  });

  test('deep []套[] nil', () => {
    expect(
      omitEmptyDeep([['a', true, false, 0, 1, null, undefined, '', [], {}], ['b']]),
    ).toStrictEqual([['a', true, false, 0, 1, null, undefined, '', [], {}], ['b']]);
  });

  test('deep []套{} nil', () => {
    expect(
      omitEmptyDeep([
        {
          null: null,
          undefined: undefined,
          str: '',
          0: 0,
          1: 1,
          true: true,
          false: false,
          obj: {},
          array: [],
        },
        {},
        { c: 'c' },
      ]),
    ).toStrictEqual([
      {
        0: 0,
        1: 1,
        true: true,
        false: false,
      },
      {},
      { c: 'c' },
    ]);
  });

  test('deep {}套[] nil', () => {
    expect(
      omitEmptyDeep({
        a: { aa: undefined, ab: 'ab', ac: null },
        b: [, null, undefined, 0, 1, true, false, {}, []],
        c: {},
      }),
    ).toStrictEqual({
      a: { ab: 'ab' },
      b: [, null, undefined, 0, 1, true, false, {}, []],
    });
  });

  test('deep {}套{}套{} nil', () => {
    expect(
      omitEmptyDeep({
        a: {
          b: {
            c: {
              d: {
                null: null,
                undefined: undefined,
                str: '',
                0: 0,
                1: 1,
                true: true,
                false: false,
                obj: {},
                array: [],
              },
              dd: 'dd',
            },
            cc: false,
          },
          bb: 'bb',
        },
      }),
    ).toStrictEqual({
      a: {
        b: {
          c: {
            d: {
              0: 0,
              1: 1,
              true: true,
              false: false,
            },
            dd: 'dd',
          },
          cc: false,
        },
        bb: 'bb',
      },
    });
  });

  test('不能修改原引用', () => {
    const data = { a: [{ b: [{ c: 'ccc' }] }] };
    expect(omitEmptyDeep(data)).not.toBe(data);
    const obj = {};
    expect(omitEmptyDeep(obj)).not.toBe(obj);
    const array: any = [];
    expect(omitEmptyDeep(array)).not.toBe(array);
  });
});

describe('omitPrivateDeep 递归剔除私有属性', () => {
  test('空对象，数组', () => {
    expect(omitPrivateDeep({})).toStrictEqual({});
    expect(omitPrivateDeep([])).toStrictEqual([]);
  });

  test('时间类型', () => {
    const date = new Date();
    const momentInstance = moment();
    const dayjsInstance = dayjs();
    expect(omitPrivateDeep({ date, moment: momentInstance, dayjs: dayjsInstance })).toStrictEqual({
      date,
      moment: momentInstance,
      dayjs: dayjsInstance,
    });
  });

  test('文件类型', () => {
    const file = new File([], 'filename.txt');
    expect(omitPrivateDeep({ file })).toStrictEqual({ file });
  });

  test('{} 第1层私有属性', () => {
    const data = { _a: 'a' };
    expect(omitPrivateDeep(data)).toStrictEqual({});
  });

  test('{} 第2层私有属性', () => {
    const data = { a: { _b: { c: {} } } };
    expect(omitPrivateDeep(data)).toStrictEqual({ a: {} });
  });

  test('{} 第3层私有属性', () => {
    const data = { a: { b: { _c: {} } } };
    expect(omitPrivateDeep(data)).toStrictEqual({ a: { b: {} } });
  });

  test('[] 中 {} 有私有属性', () => {
    const data = [{ a: { _b: { c: {} } } }];
    expect(omitPrivateDeep(data)).toStrictEqual([{ a: {} }]);
  });

  test('不能修改原引用', () => {
    const data = { a: [{ b: [{ c: 'ccc' }] }] };
    expect(omitPrivateDeep(data)).not.toBe(data);
    const obj = {};
    expect(omitPrivateDeep(obj)).not.toBe(obj);
    const array: any = [];
    expect(omitPrivateDeep(array)).not.toBe(array);
  });
});

describe('transformToStringDeep 深度转换成字符串类型', () => {
  const m = moment();
  const d = dayjs();
  const date = new Date();
  const originObj = {
    str: 'xxx',
    boolean: true,
    num: 123,
    undefined: undefined,
    null: null,
    date: m,
    date1: d,
    date2: date,
    date3: 1691152641991,
    date4: '1691152641991',
  };

  const targetObj = {
    str: 'xxx',
    boolean: 'true',
    null: null,
    num: '123',
    date: m,
    date1: d,
    date2: date,
    date3: '1691152641991',
    date4: '1691152641991',
    undefined: undefined,
  };

  const originArray = [
    'xxx',
    true,
    123,
    undefined,
    null,
    m,
    d,
    date,
    '1691152641991',
    '1691152641991',
  ];

  const targetArray = [
    'xxx',
    'true',
    '123',
    undefined,
    null,
    m,
    d,
    date,
    '1691152641991',
    '1691152641991',
  ];

  test('空对象，空数组', () => {
    expect(transformToStringDeep({})).toStrictEqual({});
    expect(transformToStringDeep([])).toStrictEqual([]);
  });

  test('对象嵌套', () => {
    expect(transformToStringDeep(originObj)).toStrictEqual(targetObj);
    expect(transformToStringDeep({ a: originObj })).toStrictEqual({ a: targetObj });
    expect(transformToStringDeep({ a: { b: originObj } })).toStrictEqual({ a: { b: targetObj } });
    expect(transformToStringDeep({ a: { b: { c: originObj } } })).toStrictEqual({
      a: { b: { c: targetObj } },
    });
  });

  test('数组嵌套', () => {
    expect(transformToStringDeep(originArray)).toStrictEqual(targetArray);
    expect(transformToStringDeep([originArray])).toStrictEqual([targetArray]);
    expect(transformToStringDeep([[originArray]])).toStrictEqual([[targetArray]]);
    expect(transformToStringDeep([[[originArray]]])).toStrictEqual([[[targetArray]]]);
  });

  test('对象和数组嵌套', () => {
    expect(transformToStringDeep({ array: originArray })).toStrictEqual({ array: targetArray });
    expect(transformToStringDeep({ array: originArray, obj: originObj })).toStrictEqual({
      array: targetArray,
      obj: targetObj,
    });
    expect(transformToStringDeep([originObj])).toStrictEqual([targetObj]);
    expect(transformToStringDeep([originObj, originArray])).toStrictEqual([targetObj, targetArray]);
  });

  test('不能修改原引用', () => {
    const data = { a: [{ b: [{ c: 'ccc' }] }] };
    expect(transformToStringDeep(data)).not.toBe(data);
    const obj = {};
    expect(omitPrivateDeep(obj)).not.toBe(obj);
    const array: any = [];
    expect(omitPrivateDeep(array)).not.toBe(array);
  });
});

describe('flatColumns拍平columns', () => {
  const SELECT_ENUM = {
    1: '选项一',
    2: '选项二',
    3: '选项三',
  };

  const CASCADER_ENUM = [
    {
      label: '重庆市',
      value: 1,
      children: [
        {
          label: '重庆市',
          value: 11,
          children: [
            { label: '渝北区', value: 111 },
            { label: '江北区', value: 112 },
          ],
        },
      ],
    },
    {
      label: '广东省',
      value: 2,
      children: [
        {
          label: '广州市',
          value: 21,
          children: [
            { label: '越秀区', value: 211 },
            { label: '白云区', value: 212 },
          ],
        },
        {
          label: '深圳市',
          value: 22,
          children: [
            { label: '南山区', value: 221 },
            { label: '福田区', value: 222 },
          ],
        },
      ],
    },
  ];

  const columns: MsFormColumns = [
    {
      title: '输入类组件',
      valueType: 'group',
      columns: [
        {
          title: '输入框',
          dataIndex: 'text',
          valueType: 'text',
        },
        {
          title: '文本框',
          dataIndex: 'textArea',
          valueType: 'textArea',
        },
        {
          title: '数字',
          dataIndex: 'digit',
          valueType: 'digit',
        },
        {
          title: '密码',
          dataIndex: 'password',
          valueType: 'password',
        },
      ],
    },
    {
      title: '选择类组件',
      valueType: 'group',
      columns: [
        {
          title: '选择器',
          dataIndex: 'select',
          valueType: 'select',
          valueEnum: SELECT_ENUM,
          fieldProps: {
            labelInValue: true,
            defaultSelectFirst: true,
          },
        },
        {
          title: '级联选择',
          dataIndex: 'cascader',
          valueType: 'cascader',
          valueEnum: CASCADER_ENUM,
          fieldProps: {
            defaultSelectFirst: true,
          },
        },
        {
          title: '树选择器',
          dataIndex: 'treeSelect',
          valueType: 'treeSelect',
          valueEnum: CASCADER_ENUM,
        },
        {
          title: '单选',
          dataIndex: 'radio',
          valueType: 'radio',
          valueEnum: SELECT_ENUM,
        },
        {
          title: '单选按钮',
          dataIndex: 'radioButton',
          valueType: 'radio',
          valueEnum: SELECT_ENUM,
          fieldProps: {
            optionType: 'button',
          },
        },
        {
          title: '多选',
          dataIndex: 'checkbox',
          valueType: 'checkbox',
          valueEnum: SELECT_ENUM,
        },
        {
          title: '开关',
          dataIndex: 'switch',
          valueType: 'switch',
        },
        {
          title: '上传',
          dataIndex: 'upload',
          valueType: 'upload',
          fieldProps: {
            name: '业务系统',
            fileList: [
              {
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              },
            ],
            uploadType: 'profile',
            listType: 'picture-card',
          },
        },
      ],
    },
    {
      title: '时间类组件',
      valueType: 'group',
      columns: [
        {
          title: '时间',
          dataIndex: 'dateTime',
          valueType: 'dateTime',
        },
        {
          title: '时间范围',
          dataIndex: 'timeRange',
          valueType: 'timeRange',
        },
        {
          title: '日期',
          dataIndex: 'date',
          valueType: 'date',
        },
        {
          title: '日期范围',
          dataIndex: 'dateRange',
          valueType: 'dateRange',
        },
      ],
    },
    {
      title: '展示类组件',
      valueType: 'group',
      columns: [
        {
          title: '评分',
          dataIndex: 'rate',
          valueType: 'rate',
        },
        {
          title: '进度条',
          dataIndex: 'progress',
          valueType: 'progress',
        },
        {
          title: '头像',
          dataIndex: 'avatar',
          valueType: 'avatar',
          fieldProps: {
            src: 'https://example.com/static/logo.svg',
          },
        },
        {
          title: '图片',
          dataIndex: 'image',
          valueType: 'image',
          fieldProps: {
            src: 'https://example.com/static/logo.svg',
          },
        },
      ],
    },
  ];

  test('空数组', () => {
    expect(flatColumnsDeep([])).toStrictEqual([]);
  });

  test('多级表头', () => {
    expect(
      flatColumnsDeep([
        {
          title: '分组',
          children: [
            { title: '输入框', dataIndex: 'text', valueType: 'text' },
            { title: '文本框', dataIndex: 'textArea', valueType: 'textArea' },
            {
              title: '分组嵌套',
              children: [{ title: '数字', dataIndex: 'digit', valueType: 'digit' }],
            },
          ],
        },
      ]),
    ).toStrictEqual([
      { title: '输入框', dataIndex: 'text', valueType: 'text' },
      { title: '文本框', dataIndex: 'textArea', valueType: 'textArea' },
      { title: '数字', dataIndex: 'digit', valueType: 'digit' },
      { title: '分组嵌套' },
      { title: '分组' },
    ]);
  });

  test('表单数组', () => {
    expect(flatColumnsDeep(columns)).toStrictEqual([
      { title: '输入框', dataIndex: 'text', valueType: 'text' },
      { title: '文本框', dataIndex: 'textArea', valueType: 'textArea' },
      { title: '数字', dataIndex: 'digit', valueType: 'digit' },
      { title: '密码', dataIndex: 'password', valueType: 'password' },
      { title: '输入类组件', valueType: 'group' },
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        valueEnum: SELECT_ENUM,
        fieldProps: { labelInValue: true, defaultSelectFirst: true },
      },
      {
        title: '级联选择',
        dataIndex: 'cascader',
        valueType: 'cascader',
        valueEnum: CASCADER_ENUM,
        fieldProps: { defaultSelectFirst: true },
      },
      {
        title: '树选择器',
        dataIndex: 'treeSelect',
        valueType: 'treeSelect',
        valueEnum: CASCADER_ENUM,
      },
      {
        title: '单选',
        dataIndex: 'radio',
        valueType: 'radio',
        valueEnum: SELECT_ENUM,
      },
      {
        title: '单选按钮',
        dataIndex: 'radioButton',
        valueType: 'radio',
        valueEnum: SELECT_ENUM,
        fieldProps: { optionType: 'button' },
      },
      {
        title: '多选',
        dataIndex: 'checkbox',
        valueType: 'checkbox',
        valueEnum: SELECT_ENUM,
      },
      { title: '开关', dataIndex: 'switch', valueType: 'switch' },
      {
        title: '上传',
        dataIndex: 'upload',
        valueType: 'upload',
        fieldProps: {
          name: '业务系统',
          fileList: [
            {
              uid: '-1',
              name: 'xxx.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
          ],
          uploadType: 'profile',
          listType: 'picture-card',
        },
      },
      { title: '选择类组件', valueType: 'group' },
      { title: '时间', dataIndex: 'dateTime', valueType: 'dateTime' },
      { title: '时间范围', dataIndex: 'timeRange', valueType: 'timeRange' },
      { title: '日期', dataIndex: 'date', valueType: 'date' },
      { title: '日期范围', dataIndex: 'dateRange', valueType: 'dateRange' },
      { title: '时间类组件', valueType: 'group' },
      { title: '评分', dataIndex: 'rate', valueType: 'rate' },
      { title: '进度条', dataIndex: 'progress', valueType: 'progress' },
      {
        title: '头像',
        dataIndex: 'avatar',
        valueType: 'avatar',
        fieldProps: { src: 'https://example.com/static/logo.svg' },
      },
      {
        title: '图片',
        dataIndex: 'image',
        valueType: 'image',
        fieldProps: { src: 'https://example.com/static/logo.svg' },
      },
      { title: '展示类组件', valueType: 'group' },
    ]);
  });

  test('嵌套', () => {
    expect(
      flatColumnsDeep([
        {
          title: '输入类组件',
          valueType: 'group',
          columns: [
            {
              title: '选择类组件',
              valueType: 'group',
              columns: [
                {
                  title: '选择器',
                  dataIndex: 'select',
                  valueType: 'select',
                  valueEnum: SELECT_ENUM,
                  fieldProps: {
                    labelInValue: true,
                    defaultSelectFirst: true,
                  },
                },
              ],
            },
          ],
        },
      ]),
    ).toStrictEqual([
      {
        title: '选择器',
        dataIndex: 'select',
        valueType: 'select',
        valueEnum: SELECT_ENUM,
        fieldProps: {
          labelInValue: true,
          defaultSelectFirst: true,
        },
      },
      {
        title: '选择类组件',
        valueType: 'group',
      },
      {
        title: '输入类组件',
        valueType: 'group',
      },
    ]);
  });
});

describe('leafValueNotNil 叶子节点所有值都不为Nil', () => {
  test('基础类型', () => {
    expect(leafValueNotNil(undefined)).toBeFalsy();
    expect(
      leafValueNotNil({
        a: '',
        b: 1,
        e: 0,
        c: true,
        d: false,
        f: Symbol(),
      }),
    ).toBeTruthy();
    expect(
      leafValueNotNil({
        a: '',
        b: 1,
        e: 0,
        c: true,
        d: false,
        f: Symbol(),
        g: undefined,
      }),
    ).toBeFalsy();
    expect(
      leafValueNotNil({
        a: '',
        b: 1,
        e: 0,
        c: true,
        d: false,
        f: Symbol(),
        g: null,
      }),
    ).toBeFalsy();
    expect(leafValueNotNil([0, 1, '', 'a', true, false, Symbol()])).toBeTruthy();
    expect(leafValueNotNil([0, 1, '', 'a', undefined, true, false, Symbol()])).toBeFalsy();
    expect(leafValueNotNil([0, 1, '', 'a', null, true, false, Symbol()])).toBeFalsy();
  });

  test('空引用类型', () => {
    expect(leafValueNotNil({})).toBeTruthy();
    expect(leafValueNotNil([])).toBeTruthy();
  });

  test('表单第二个元素', () => {
    const data: any = {
      policyRelationData: [
        {
          relationTypeDetails: [],
        },
      ],
    };
    data.policyRelationData[0].relationTypeDetails[2] = {
      type: '0',
    };
    const actualValue = leafValueNotNil(data);
    expect(actualValue).toEqual(true);
  });

  test('嵌套', () => {
    expect(
      leafValueNotNil({
        a: '',
        b: 1,
        e: 0,
        c: true,
        d: false,
        f: Symbol(),
        g: [0, 1, '', 'a', true, false, Symbol()],
      }),
    ).toBeTruthy();
    expect(
      leafValueNotNil({
        a: '',
        b: 1,
        e: 0,
        c: true,
        d: false,
        f: Symbol(),
        g: [0, 1, '', 'a', true, false, Symbol(), undefined],
      }),
    ).toBeFalsy();

    expect(
      leafValueNotNil([
        0,
        1,
        '',
        'a',
        true,
        false,
        Symbol(),
        {
          a: '',
          b: 1,
          e: 0,
          c: true,
          d: false,
          f: Symbol(),
        },
      ]),
    ).toBeTruthy();

    expect(
      leafValueNotNil([
        0,
        1,
        '',
        'a',
        true,
        false,
        Symbol(),
        {
          a: '',
          b: 1,
          e: 0,
          c: true,
          d: false,
          f: Symbol(),
          g: undefined,
        },
      ]),
    ).toBeFalsy();
  });

  test('多层嵌套', () => {
    expect(
      leafValueNotNil([
        0,
        1,
        '',
        'a',
        true,
        false,
        Symbol(),
        {
          a: '',
          b: 1,
          e: 0,
          c: true,
          d: false,
          f: Symbol(),
          g: [
            0,
            1,
            '',
            'a',
            true,
            false,
            Symbol(),
            {
              a: '',
              b: 1,
              e: 0,
              c: true,
              d: false,
              f: Symbol(),
            },
          ],
        },
      ]),
    ).toBeTruthy();

    expect(
      leafValueNotNil([
        0,
        1,
        '',
        'a',
        true,
        false,
        Symbol(),
        {
          a: '',
          b: 1,
          e: 0,
          c: true,
          d: false,
          f: Symbol(),
          g: [
            0,
            1,
            '',
            'a',
            true,
            false,
            Symbol(),
            {
              a: '',
              b: 1,
              e: 0,
              c: true,
              d: false,
              f: Symbol(),
              g: [
                0,
                1,
                '',
                'a',
                true,
                false,
                Symbol(),
                {
                  a: '',
                  b: 1,
                  e: 0,
                  c: true,
                  d: false,
                  f: Symbol(),
                  g: undefined,
                },
              ],
            },
          ],
        },
      ]),
    ).toBeFalsy();
  });

  test('使用过程补充用例', () => {
    expect(
      leafValueNotNil({
        list: [
          {
            text: undefined,
          },
        ],
      }),
    ).toBeFalsy();
  });
  test('使用过程补充用例', () => {
    expect(
      leafValueNotNil({
        _flavor: {
          id: 1284,
          product: 'Kafka',
          region: 1,
          availabilityZone: 10102657,
          availabilityZoneCode: '西永机房（北碚）',
          sourceCode: 'productLaunch-i79jhagxk8akzwq3s3',
          sourceName: 'kafka-2c4g',
          launchSource: 'specification',
          resourceTypeCode: 'cluster',
          remark: '配额（topic:100,partition:300,group:150）',
          strategys: [
            {
              id: 2220,
              name: '包年包月',
              costName: 'instanceCost',
              costNameStr: '实例费用',
              payMode: 'fixed',
              payModeName: '包年包月',
              period: '',
              periodName: '预付费',
              regularPricings: [
                {
                  id: 4066,
                  feeId: 84,
                  feeNum: 1,
                  feeName: 'kafka-CPU',
                  feeUnit: 'CPU',
                  feeUnitName: 'CPU',
                  billingDimension: 'number',
                  billingDimensionName: '数量',
                  abilityType: 'system',
                  abilityCode: 'CPU',
                  minCapacity: 2,
                  maxCapacity: 2,
                  price: '20',
                  regularPricingUnit: '元/月',
                },
                {
                  id: 4067,
                  feeId: 83,
                  feeNum: 1,
                  feeName: 'kafka-MEMORY',
                  feeUnit: 'GB',
                  feeUnitName: 'GB',
                  billingDimension: 'number',
                  billingDimensionName: '数量',
                  abilityType: 'system',
                  abilityCode: 'RAM',
                  minCapacity: 4,
                  maxCapacity: 4,
                  price: '40',
                  regularPricingUnit: '元/月',
                },
              ],
            },
          ],
          metas: {
            partitionLimit: '300',
            maxDiskSpec: '9999',
            maxInstanceCount: '10',
            minDiskSpec: '50',
            flavorId: '5dbe6e09-0823-4099-b4b9-702a6c7ccece',
            topicLimit: '100',
            minInstanceCount: '3',
            groupLimit: '150',
          },
          specificationType: {
            specificationId: 115,
            id: 523,
            code: 'specificationType-johkihr8hqpgzm2cvy',
            name: '普通型',
            product: 'Kafka',
            resourceTypeCode: 'cluster',
            remark: '普通型规格（不含本地盘）',
            parentId: 0,
            types: 'type',
            enables: 1,
          },
          resourceCluster: '10102657-P001',
          resourcePool: '10102657-P001-pool002',
          name: 'kafka-2c4g',
          ram: '4GB',
          originRam: '4',
          originCpu: 2,
          vcpus: '2CPU',
          ssd: '',
        },
      }),
    ).toBeTruthy();
  });
});

describe('isNamePathEqual 判断两个 namePath 是否相等', () => {
  test('空访问路径', () => {
    expect(isNamePathEqual()).toBeFalsy();
    expect(isNamePathEqual('a')).toBeFalsy();
    expect(isNamePathEqual(undefined, 'a')).toBeFalsy();
  });

  test('对象访问路径', () => {
    expect(isNamePathEqual('a', 'b')).toBeFalsy();
    expect(isNamePathEqual(['a'], ['b'])).toBeFalsy();
    expect(isNamePathEqual(['a', 'b'], ['a', 'b'])).toBeTruthy();
    expect(isNamePathEqual(['a', 'b'], 'a.b')).toBeTruthy();
    expect(isNamePathEqual('a.b', ['a', 'b'])).toBeTruthy();
    expect(isNamePathEqual('a.b', 'a.b')).toBeTruthy();
  });

  test('数组访问路径', () => {
    expect(isNamePathEqual(['a', 1], 'a[1]')).toBeTruthy();
    expect(isNamePathEqual(['a', '1'], 'a[1]')).toBeTruthy();
    expect(isNamePathEqual('a[1]', ['a', 1])).toBeTruthy();
    expect(isNamePathEqual('a[1].b', ['a', 1, 'b'])).toBeTruthy();
    expect(isNamePathEqual('a[1].c', ['a', 1, 'b'])).toBeFalsy();
    expect(isNamePathEqual('a[1].c', ['a', 1, 'b'])).toBeFalsy();
    expect(isNamePathEqual('a[1].c[2]', ['a', 1, 'c', 2])).toBeTruthy();
    expect(isNamePathEqual('a[1][1][1]', ['a', 1, 1, 1])).toBeTruthy();
    expect(isNamePathEqual('[1][1][1]', [1, 1, 1])).toBeTruthy();
  });
});

describe('deepMerge', () => {
  test('应将两个没有数组的对象进行合并', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    const result = deepMerge(obj1, obj2);
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  test('应将第一个对象中的数组替换为第二个对象中的数组', () => {
    const obj1 = { a: [1, 2], b: 2 };
    const obj2 = { a: [3, 4], b: 3 };
    const result = deepMerge(obj1, obj2);
    expect(result).toEqual({ a: [3, 4], b: 3 });
  });

  test('应处理嵌套对象', () => {
    const obj1 = { a: { b: 1 }, c: 2 };
    const obj2 = { a: { b: 3 }, d: 4 };
    const result = deepMerge(obj1, obj2);
    expect(result).toEqual({ a: { b: 3 }, c: 2, d: 4 });
  });

  test('应处理嵌套数组', () => {
    const obj1 = { a: { b: [1, 2] }, c: 2 };
    const obj2 = { a: { b: [3, 4] }, c: 3 };
    const result = deepMerge(obj1, obj2);
    expect(result).toEqual({ a: { b: [3, 4] }, c: 3 });
  });

  test('应处理空对象', () => {
    const obj1 = {};
    const obj2 = { a: 1, b: 2 };
    const result = deepMerge(obj1, obj2);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  test('应处理包含 undefined 值的对象', () => {
    const obj1 = { a: undefined, b: 2 };
    const obj2 = { a: 1, b: undefined };
    const result = deepMerge(obj1, obj2);
    expect(result).toEqual({ a: 1, b: undefined });
  });

  test('应处理包含 null 值的对象', () => {
    const obj1 = { a: null, b: 2 };
    const obj2 = { a: 1, b: null };
    const result = deepMerge(obj1, obj2);
    expect(result).toEqual({ a: 1, b: null });
  });
});
