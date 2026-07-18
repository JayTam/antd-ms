import type { MsFormColumnType } from '@jaytam/antd-ms';
import { MsForm, type MsFormProps } from '@jaytam/antd-ms';
import { asyncRenderPreset } from '@jaytam/antd-ms/tests/utils';
import { fireEvent, renderHook } from '@testing-library/react';
import dayjs from 'dayjs';
import useFormRequest from '../hooks/useFormRequest';
import { act, createRef, useImperativeHandle, useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import { Form } from 'antd';

/**
 * 生成 column 配置
 * @param valueType 字段类型
 * @returns
 */
function genColumn(valueType: MsFormColumnType['valueType']): MsFormColumnType {
  return {
    title: valueType,
    dataIndex: valueType,
    valueType: valueType,
  };
}

/** 基础类型的 columns 配置，便于后面嵌套  */
const baseColumns: MsFormProps['columns'] = [
  // 字符串
  genColumn('text'),
  // 数字
  genColumn('digit'),
  // 字符串和数字混合
  {
    title: 'select',
    valueType: 'select',
    dataIndex: 'select',
    fieldProps: {
      autoSelect: false,
    },
  },
  // 布尔
  genColumn('switch'),
  // 日期
  genColumn('date'),
  // 日期数组
  genColumn('dateRange'),
  // 文件（初始化没有直接一个文件的场景）
  genColumn('upload'),
];

/** 预设 columns */
const columns: MsFormProps['columns'] = [
  ...baseColumns,
  {
    title: 'formList',
    valueType: 'formList',
    dataIndex: 'formList',
    columns: baseColumns,
  },
  {
    title: 'formTable',
    valueType: 'formTable',
    dataIndex: 'formTable',
    columns: baseColumns,
  },
  {
    title: 'group',
    valueType: 'group',
    dataIndex: 'group',
    columns: baseColumns,
  },
  {
    title: 'collapse',
    valueType: 'collapse',
    dataIndex: 'collapse',
    columns: baseColumns,
  },
];

/**
 * 生成测试数据
 * @param valuesNormal 正常值模式（不自动转换字符串）
 * @returns
 */
function genTestData(valuesNormal = false) {
  const dateRange = [dayjs(), dayjs()];
  const date = dayjs();

  const testValues = {
    text: 'text',
    digit: 100,
    select: 100,
    switch: false,
    date: date,
    dateRange: dateRange,
    formList: [
      {
        text: 'text',
        digit: 100,
        select: 100,
        switch: false,
        date: date,
        dateRange: dateRange,
      },
    ],
    formTable: [
      {
        text: 'text',
        digit: 100,
        select: 100,
        switch: false,
        date: date,
        dateRange: dateRange,
      },
    ],
    group: {
      text: 'text',
      digit: 100,
      select: 100,
      switch: false,
      date: date,
      dateRange: dateRange,
    },
    collapse: {
      text: 'text',
      digit: 100,
      select: 100,
      switch: false,
      date: date,
      dateRange: dateRange,
    },
  };

  const changeValues = valuesNormal
    ? { digit: 100, select: 100, switch: false }
    : { digit: '100', select: '100', switch: 'false' };

  const expectValues = {
    text: 'text',
    ...changeValues,
    date: date,
    dateRange: dateRange,
    formList: [
      {
        text: 'text',
        ...changeValues,
        date: date,
        dateRange: dateRange,
      },
    ],
    formTable: [
      {
        text: 'text',
        ...changeValues,
        date: date,
        dateRange: dateRange,
      },
    ],
    group: {
      text: 'text',
      ...changeValues,
      date: date,
      dateRange: dateRange,
    },
    collapse: {
      text: 'text',
      ...changeValues,
      date: date,
      dateRange: dateRange,
    },
  };

  return { testValues, expectValues };
}

type TestActionType = { getFormInstance: () => FormInstance; getFinishValues: () => any };

type TestProps = MsFormProps & { testRef?: React.Ref<TestActionType> };

function Test(props: TestProps) {
  const { testRef, ...restProps } = props;
  const [form] = Form.useForm(props.form);
  const submitFinishValuesRef = useRef<any>();

  useImperativeHandle(testRef, () => ({
    getFormInstance: () => form,
    getFinishValues: () => submitFinishValuesRef.current,
  }));

  return (
    <MsForm
      {...restProps}
      form={form}
      onFinish={async (values) => {
        submitFinishValuesRef.current = values;
      }}
    />
  );
}

async function setup(props?: MsFormProps) {
  const ref = createRef<TestActionType>();

  const result = await asyncRenderPreset(<Test columns={columns} testRef={ref} {...props} />);

  return { result, ref };
}

describe('未配置 valuesNormal，默认情况下 initialValues 和 onFinish 的 values 都会转换成字符串', () => {
  test('验证 useFormRequest hooks 初始值都自动转换成字符串', async () => {
    const { testValues, expectValues } = genTestData();

    const { result } = renderHook(() => {
      const [loading, setLoading] = useState(false);
      return useFormRequest({
        columns,
        initialValues: testValues,
        loading,
        setLoading,
      });
    });

    expect(result.current.initialValues).toMatchObject(expectValues);
  });

  test('验证 form 中的值都自动转换成字符串', async () => {
    const { testValues, expectValues } = genTestData();
    const { ref } = await setup({ initialValues: testValues });

    expect(ref.current?.getFormInstance()?.getFieldsValue()).toMatchObject(expectValues);
  });

  test('验证 onFinish(values) 都自动转换成字符串', async () => {
    const { testValues, expectValues } = genTestData();
    const { ref, result } = await setup({ initialValues: testValues });

    await act(async () => {
      fireEvent.click(result.getByText('提 交'));
    });

    expect(ref.current?.getFinishValues()).toMatchObject(expectValues);
  });

  test('验证 column.initialValue 都自动转换成字符串', async () => {
    const dateRange = [dayjs(), dayjs()];
    const date = dayjs();
    const baseColumns: any = [
      {
        title: 'digit',
        dataIndex: 'digit',
        valueType: 'digit',
        initialValue: 100,
      },
      {
        title: 'switch',
        dataIndex: 'switch',
        valueType: 'switch',
        initialValue: false,
      },
      {
        title: 'date',
        dataIndex: 'date',
        valueType: 'date',
        initialValue: date,
      },
      {
        title: 'dateRange',
        dataIndex: 'dateRange',
        valueType: 'dateRange',
        initialValue: dateRange,
      },
    ];

    const { ref } = await setup({
      columns: [
        ...baseColumns,
        {
          title: 'formList',
          dataIndex: 'formList',
          valueType: 'formList',
          columns: baseColumns,
          initialValue: [
            {
              digit: 100,
              switch: false,
              date: date,
              dateRange: dateRange,
            },
          ],
        },
        {
          title: 'formTable',
          dataIndex: 'formTable',
          valueType: 'formTable',
          columns: baseColumns,
          initialValue: [
            {
              digit: 100,
              switch: false,
              date: date,
              dateRange: dateRange,
            },
          ],
        },
      ],
    });

    const expectValues = {
      digit: '100',
      switch: 'false',
      date: date,
      dateRange: dateRange,
      formList: [{ digit: '100', switch: 'false', date: date, dateRange: dateRange }],
      formTable: [{ digit: '100', switch: 'false', date: date, dateRange: dateRange }],
    };

    expect(ref.current?.getFormInstance()?.getFieldsValue()).toMatchObject(expectValues);
  });

  test('验证 column.formProps.initialValues 都自动转换成字符串', async () => {
    const dateRange = [dayjs(), dayjs()];
    const date = dayjs();
    const baseColumns: any = [
      {
        title: 'digit',
        dataIndex: 'digit',
        valueType: 'digit',
        formItemProps: { initialValue: 100 },
      },
      {
        title: 'switch',
        dataIndex: 'switch',
        valueType: 'switch',
        formItemProps: () => ({ initialValue: false }),
      },
      {
        title: 'date',
        dataIndex: 'date',
        valueType: 'date',
        formItemProps: { initialValue: date },
      },
      {
        title: 'dateRange',
        dataIndex: 'dateRange',
        valueType: 'dateRange',
        formItemProps: () => ({ initialValue: dateRange }),
      },
    ];

    const { ref } = await setup({
      columns: [
        ...baseColumns,
        {
          title: 'formList',
          dataIndex: 'formList',
          valueType: 'formList',
          columns: baseColumns,
          initialValue: [
            {
              digit: 100,
              switch: false,
              date: date,
              dateRange: dateRange,
            },
          ],
        },
        {
          title: 'formTable',
          dataIndex: 'formTable',
          valueType: 'formTable',
          columns: baseColumns,
          initialValue: [
            {
              digit: 100,
              switch: false,
              date: date,
              dateRange: dateRange,
            },
          ],
        },
      ],
    });

    const expectValues = {
      digit: '100',
      switch: 'false',
      date: date,
      dateRange: dateRange,
      formList: [{ digit: '100', switch: 'false', date: date, dateRange: dateRange }],
      formTable: [{ digit: '100', switch: 'false', date: date, dateRange: dateRange }],
    };

    expect(ref.current?.getFormInstance()?.getFieldsValue()).toMatchObject(expectValues);
  });
});

describe('配置 valuesNormal 之后， initialValues 和 onFinish 的 values 不再进行任何转换', () => {
  test('验证 useFormRequest hooks 初始值不会自动转换字符串', async () => {
    const { testValues, expectValues } = genTestData(true);

    const { result } = renderHook(() => {
      const [loading, setLoading] = useState(false);
      return useFormRequest({
        columns,
        initialValues: testValues,
        valuesNormal: true,
        loading,
        setLoading,
      });
    });

    expect(result.current.initialValues).toMatchObject(expectValues);
  });

  test('验证 form 中的值都不会自动转换成字符串', async () => {
    const { testValues, expectValues } = genTestData(true);

    const { ref } = await setup({ initialValues: testValues, valuesNormal: true });

    expect(ref.current?.getFormInstance()?.getFieldsValue()).toMatchObject(expectValues);
  });

  test('验证 onFinish(values) 都不会自动转换成字符串', async () => {
    const { testValues, expectValues } = genTestData(true);
    const { ref, result } = await setup({ initialValues: testValues, valuesNormal: true });

    await act(async () => {
      fireEvent.click(result.getByText('提 交'));
    });

    expect(ref.current?.getFinishValues()).toMatchObject(expectValues);
  });

  test('验证 column.initialValue 都自动转换成字符串', async () => {
    const dateRange = [dayjs(), dayjs()];
    const date = dayjs();
    const baseColumns: any = [
      {
        title: 'digit',
        dataIndex: 'digit',
        valueType: 'digit',
        initialValue: 100,
      },
      {
        title: 'switch',
        dataIndex: 'switch',
        valueType: 'switch',
        initialValue: false,
      },
      {
        title: 'date',
        dataIndex: 'date',
        valueType: 'date',
        initialValue: date,
      },
      {
        title: 'dateRange',
        dataIndex: 'dateRange',
        valueType: 'dateRange',
        initialValue: dateRange,
      },
    ];

    const { ref } = await setup({
      valuesNormal: true,
      columns: [
        ...baseColumns,
        {
          title: 'formList',
          dataIndex: 'formList',
          valueType: 'formList',
          columns: baseColumns,
          initialValue: [
            {
              digit: 100,
              switch: false,
              date: date,
              dateRange: dateRange,
            },
          ],
        },
        {
          title: 'formTable',
          dataIndex: 'formTable',
          valueType: 'formTable',
          columns: baseColumns,
          initialValue: [
            {
              digit: 100,
              switch: false,
              date: date,
              dateRange: dateRange,
            },
          ],
        },
      ],
    });

    const expectValues = {
      digit: 100,
      switch: false,
      date: date,
      dateRange: dateRange,
      formList: [{ digit: 100, switch: false, date: date, dateRange: dateRange }],
      formTable: [{ digit: 100, switch: false, date: date, dateRange: dateRange }],
    };

    expect(ref.current?.getFormInstance()?.getFieldsValue()).toMatchObject(expectValues);
  });

  test.todo('验证通过交互修改值，form 中的值不会转换，onFinish(values) 也不会转换');
});
