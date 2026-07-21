import { getFirstOption, getFirstOptionLabel, getFirstOptionValue } from '../tools/optionValue';
import { deepFind, getLabelInOptions, valueInOptions } from '../tools/valueInOptions';

const options = [
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

describe('MsField Utils', () => {
  test('deepFind', () => {
    expect(
      deepFind(1, [
        {
          label: '1',
          value: 1,
          children: [{ label: '2', value: 2, children: [{ label: '3', value: 3 }] }],
        },
      ])?.label,
    ).toEqual('1');
    expect(
      deepFind(2, [
        {
          label: '1',
          value: 1,
          children: [{ label: '2', value: 2, children: [{ label: '3', value: 3 }] }],
        },
      ])?.label,
    ).toEqual('2');
    expect(
      deepFind(3, [
        {
          label: '1',
          value: 1,
          children: [{ label: '2', value: 2, children: [{ label: '3', value: 3 }] }],
        },
      ]),
    ).toEqual({ label: '3', value: 3 });
    expect(
      deepFind(4, [
        {
          label: '1',
          value: 1,
          children: [{ label: '2', value: 2, children: [{ label: '3', value: 3 }] }],
        },
      ]),
    ).toBeUndefined();
    expect(
      deepFind(3, [
        {
          label: '1',
          value: 1,
          children: [
            { label: '23', value: 3 },
            { label: '2', value: 2, children: [{ label: '3', value: 3 }] },
          ],
        },
      ]),
    ).toEqual({ label: '23', value: 3 });
    expect(
      deepFind(3, [
        {
          label: '1',
          value: 1,
          children: [
            { label: '2', value: 2, children: [{ label: '3', value: 3 }] },
            { label: '23', value: 3 },
          ],
        },
      ]),
    ).toEqual({ label: '3', value: 3 });
  });

  test('exitInOptions', () => {
    expect(valueInOptions(1, [{ label: '1', value: 1 }])).toBeTruthy();
    expect(valueInOptions(2, [{ label: '1', value: 1 }])).toBeFalsy();
    expect(valueInOptions({ label: 'xxx', value: 1 }, [{ label: '1', value: 1 }])).toBeTruthy();
    expect(valueInOptions([1, 2, 3], [{ label: '1', value: 1 }])).toBeFalsy();
    expect(
      valueInOptions(
        [1, 2, 3],
        [
          { label: '1', value: 1 },
          { label: '1', value: 2 },
          { label: '1', value: 3 },
        ],
      ),
    ).toBeTruthy();
    expect(valueInOptions([[1], [2], [3]], [{ label: '1', value: 1 }])).toBeFalsy();
    expect(
      valueInOptions(
        [[1], [2], [3]],
        [
          { label: '1', value: 1 },
          { label: '1', value: 2 },
          { label: '1', value: 3 },
        ],
      ),
    ).toBeTruthy();
    expect(
      valueInOptions(
        [[1, 2], [3]],
        [
          { label: '1', value: 1 },
          { label: '1', value: 2 },
          { label: '1', value: 3 },
        ],
      ),
    ).toBeTruthy();
    expect(
      valueInOptions(
        [[1, [2, [3, [4]]]]],
        [
          { label: '1', value: 1 },
          { label: '1', value: 2 },
          { label: '1', value: 3 },
        ],
      ),
    ).toBeFalsy();
  });

  test('getLabelInOptions', () => {
    expect(getLabelInOptions(1, options)).toBe('重庆市');
    expect(getLabelInOptions([1, 11], options)).toBe('重庆市，重庆市');
    expect(getLabelInOptions([1, 11, 111], options)).toBe('重庆市，重庆市，渝北区');
    expect(getLabelInOptions([1, 11, 112], options)).toBe('重庆市，重庆市，江北区');
    expect(getLabelInOptions(2, options)).toBe('广东省');
    expect(getLabelInOptions([2, 21], options)).toBe('广东省，广州市');
    expect(getLabelInOptions([2, 21, 211], options)).toBe('广东省，广州市，越秀区');
    expect(getLabelInOptions([2, 21, 212], options)).toBe('广东省，广州市，白云区');
    expect(getLabelInOptions([2, 22], options)).toBe('广东省，深圳市');
    expect(getLabelInOptions([2, 22, 221], options)).toBe('广东省，深圳市，南山区');
    expect(getLabelInOptions([2, 22, 222], options)).toBe('广东省，深圳市，福田区');
  });
});

describe('获取 options 的第一个可选项，可选项为空', () => {
  const SELECT_ENUM: any = [];

  test('select单选', () => {
    const firstOption = getFirstOption(SELECT_ENUM, { valueType: 'select' });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(firstOption).toEqual(undefined);
    expect(value).toEqual(undefined);
    expect(label).toEqual(undefined);
  });

  test('select多选', () => {
    const firstOption = getFirstOption(SELECT_ENUM, {
      valueType: 'select',
      fieldProps: { mode: 'multiple' },
    });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(firstOption).toEqual(undefined);
    expect(value).toEqual(undefined);
    expect(label).toEqual(undefined);
  });

  test('radio', () => {
    const firstOption = getFirstOption(SELECT_ENUM, { valueType: 'radio' });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(firstOption).toEqual(undefined);
    expect(value).toEqual(undefined);
    expect(label).toEqual(undefined);
  });

  test('checkbox', () => {
    const firstOption = getFirstOption(SELECT_ENUM, { valueType: 'checkbox' });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(firstOption).toEqual(undefined);
    expect(value).toEqual(undefined);
    expect(label).toEqual(undefined);
  });

  test('cascader单选', () => {
    const firstOption = getFirstOption(SELECT_ENUM, {
      valueType: 'cascader',
      fieldProps: { changeOnSelect: true },
    });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(firstOption).toEqual(undefined);
    expect(value).toEqual(undefined);
    expect(label).toEqual(undefined);
  });

  test('cascader多选', () => {
    const firstOption = getFirstOption(SELECT_ENUM, { valueType: 'cascader' });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(firstOption).toEqual(undefined);
    expect(value).toEqual(undefined);
    expect(label).toEqual(undefined);
  });

  test('treeSelect单选', () => {
    const firstOption = getFirstOption(SELECT_ENUM, { valueType: 'treeSelect' });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(firstOption).toEqual(undefined);
    expect(value).toEqual(undefined);
    expect(label).toEqual(undefined);
  });

  test('treeSelect多选', () => {
    const firstOption = getFirstOption(SELECT_ENUM, { valueType: 'treeSelect' });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(firstOption).toEqual(undefined);
    expect(value).toEqual(undefined);
    expect(label).toEqual(undefined);
  });
});

describe('获取 options 的第一个可选项，单层可选项', () => {
  const SELECT_ENUM = [
    {
      label: '重庆市',
      value: 1,
    },
    {
      label: '广东省',
      value: 2,
    },
  ];

  test('select单选', () => {
    const firstOption = getFirstOption(SELECT_ENUM, { valueType: 'select' });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(value).toEqual(1);
    expect(label).toEqual('重庆市');
  });

  test('select多选', () => {
    const firstOption = getFirstOption(SELECT_ENUM, {
      valueType: 'select',
      fieldProps: { mode: 'multiple' },
    });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(value).toEqual([1]);
    expect(label).toEqual(['重庆市']);
  });

  test('radio', () => {
    const firstOption = getFirstOption(SELECT_ENUM, { valueType: 'radio' });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(value).toEqual(1);
    expect(label).toEqual('重庆市');
  });

  test('checkbox', () => {
    const firstOption = getFirstOption(SELECT_ENUM, { valueType: 'checkbox' });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(value).toEqual([1]);
    expect(label).toEqual(['重庆市']);
  });

  test('cascader单选', () => {
    const firstOption = getFirstOption(SELECT_ENUM, {
      valueType: 'cascader',
      fieldProps: { changeOnSelect: true },
    });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(value).toEqual([1]);
    expect(label).toEqual(['重庆市']);
  });

  test('cascader多选', () => {
    const firstOption = getFirstOption(SELECT_ENUM, { valueType: 'cascader' });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(value).toEqual([1]);
    expect(label).toEqual(['重庆市']);
  });

  test('treeSelect单选', () => {
    const firstOption = getFirstOption(SELECT_ENUM, { valueType: 'treeSelect' });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(value).toEqual([1]);
    expect(label).toEqual(['重庆市']);
  });

  test('treeSelect多选', () => {
    const firstOption = getFirstOption(SELECT_ENUM, { valueType: 'treeSelect' });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(value).toEqual([1]);
    expect(label).toEqual(['重庆市']);
  });
});

describe('获取 options 的第一个可选项，多层可选项', () => {
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

  test('select单选', () => {
    const firstOption = getFirstOption(CASCADER_ENUM, { valueType: 'select' });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(value).toEqual(1);
    expect(label).toEqual('重庆市');
  });

  test('select多选', () => {
    const firstOption = getFirstOption(CASCADER_ENUM, {
      valueType: 'select',
      fieldProps: { mode: 'multiple' },
    });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(value).toEqual([1]);
    expect(label).toEqual(['重庆市']);
  });

  test('radio', () => {
    const firstOption = getFirstOption(CASCADER_ENUM, { valueType: 'radio' });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(value).toEqual(1);
    expect(label).toEqual('重庆市');
  });

  test('checkbox', () => {
    const firstOption = getFirstOption(CASCADER_ENUM, { valueType: 'checkbox' });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(value).toEqual([1]);
    expect(label).toEqual(['重庆市']);
  });

  test('cascader单选', () => {
    const firstOption = getFirstOption(CASCADER_ENUM, {
      valueType: 'cascader',
      fieldProps: { changeOnSelect: true },
    });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(value).toEqual([1]);
    expect(label).toEqual(['重庆市']);
  });

  test('cascader多选', () => {
    const firstOption = getFirstOption(CASCADER_ENUM, { valueType: 'cascader' });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(value).toEqual([1, 11, 111]);
    expect(label).toEqual(['重庆市', '重庆市', '渝北区']);
  });

  test('treeSelect单选', () => {
    const firstOption = getFirstOption(CASCADER_ENUM, { valueType: 'treeSelect' });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(value).toEqual([1]);
    expect(label).toEqual(['重庆市']);
  });

  test('treeSelect多选', () => {
    const firstOption = getFirstOption(CASCADER_ENUM, {
      valueType: 'treeSelect',
      fieldProps: { multiple: true },
    });
    const value = getFirstOptionValue(firstOption);
    const label = getFirstOptionLabel(firstOption);
    expect(value).toEqual([1, 11, 111]);
    expect(label).toEqual(['重庆市', '重庆市', '渝北区']);
  });
});
