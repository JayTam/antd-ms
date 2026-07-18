/**
 * title: 基本使用
 * description:
 * background: "#f0f3f4"
 */
import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTableView } from '@jaytam/antd-ms';
import { message } from 'antd';
import type { Key } from 'react';
import { useRef, useState } from 'react';

import type { MsViewListRes, ParamType, ViewOperationType } from '../../MsViewList/types';
import type { MsTableViewActionType } from '../types';
import CustomInput from './customInput';
import TransferProps from './TransferProps';

const NETWORK_ENUM = {
  1: '专有网络',
  2: '私有网络',
};

const STATUS_ENUM = {
  running: {
    text: '运行中',
    status: 'success',
  },
  starting: {
    text: '启动中',
    status: 'processing',
  },
  fail: {
    text: '启动失败',
    status: 'error',
  },
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

const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};

function App() {
  const columns: MsTableColumns = [
    {
      title: '实例名称',
      dataIndex: 'name',
      search: true,
      showInQuery: true,
      columnSet: {
        groupName: '分组一',
        disabled: false,
      },
    },
    {
      title: '自定义表单',
      dataIndex: 'ipt',
      search: true,
      fieldRender: <TransferProps>{(p) => <CustomInput formProps={p} />}</TransferProps>,
      columnSet: {
        groupName: '分组一',
        disabled: false,
      },
    },
    {
      title: '描述',
      dataIndex: 'address',
      search: true,
      showInQuery: true,
      columnSet: {
        disabled: false,
        groupName: '分组二',
      },
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      search: true,
      showInQuery: true,
      columnSet: {
        // disabled: true,
        groupName: '分组二',
      },
    },
    {
      title: '网络类型（单选）',
      dataIndex: 'networkType',
      valueType: 'select',
      valueEnum: NETWORK_ENUM,
      valuePrimitiveType: 'number',
      search: true,
      showInQuery: true,
      // filters: true,
      formItemProps: { initialValue: 1 },
      columnSet: {
        groupName: '分组二',
      },
    },
    {
      title: '运行状态（多选）',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
      search: true,
      showInQuery: true,
      filterMultiple: true,
      // filters: true,
      fieldProps: {
        mode: 'multiple',
      },
      columnSet: {
        groupName: '分组二',
      },
    },
    {
      title: '地区',
      dataIndex: 'position',
      valueType: 'cascader',
      valueEnum: CASCADER_ENUM,
      search: true,
      showInQuery: true,
      columnSet: {
        groupName: '分组二',
      },
    },
    {
      title: '创建日期范围',
      dataIndex: 'createAt',
      valueType: 'dateRange',
      search: true,
      showInQuery: true,
      columnSet: {
        groupName: '分组二',
      },
    },
    {
      title: '名称1',
      dataIndex: 'name1',
      search: true,
      columnSet: {
        groupName: '分组八',
        disableHidden: true,
      },
    },
    {
      title: '名称2',
      dataIndex: 'name2',
      search: true,
      columnSet: {
        groupName: '分组九',
        disableHidden: true,
      },
    },
    {
      title: '名称3',
      dataIndex: 'name3',
      search: true,
      columnSet: {
        groupName: '分组十',
        disableHidden: true,
      },
    },
    {
      title: '状态1',
      dataIndex: 'status1',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
      search: true,
    },
    {
      title: '状态2',
      dataIndex: 'status2',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
      search: true,
    },
    {
      title: '状态3',
      dataIndex: 'status3',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
      search: true,
      // filters: true,
    },
    {
      title: '操作',
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];
  const names = ['张三', '李四', '王五', '赵六'];
  const status = ['running', 'starting', 'fail'];
  const address = ['重庆市渝北区', '重庆市江北区', '重庆市渝中区', '重庆市巴南区', '重庆市DDK'];

  const formRef = useRef<any>();

  const form = [
    { dataIndex: 'name', value: names[getRandomNumber(names.length - 1)] },
    { dataIndex: 'address', value: address[getRandomNumber(address.length - 1)] },
    { dataIndex: 'ip', value: '127.0.0.1' },
    { dataIndex: 'networkType', value: 1 },
    { dataIndex: 'status', value: ['running', 'starting'] },
    { dataIndex: 'position', value: [1, 11, 111] },
    { dataIndex: 'createAt', value: '' },
    { dataIndex: 'name1', value: names[getRandomNumber(names.length - 1)] },
    { dataIndex: 'name2', value: names[getRandomNumber(names.length - 1)] },
    { dataIndex: 'name3', value: names[getRandomNumber(names.length - 1)] },
    { dataIndex: 'status1', value: [status[getRandomNumber(status.length - 1)]] },
    { dataIndex: 'status2', value: [status[getRandomNumber(status.length - 1)]] },
    { dataIndex: 'status3', value: [status[getRandomNumber(status.length - 1)]] },
  ];
  const table = [
    {
      id: 'name',
      hidden: false,
      disabled: false,
    },
    {
      id: 'address',
      hidden: false,
      disabled: false,
    },
    {
      id: 'ip',
      hidden: false,
      disabled: true,
    },
    {
      id: 'networkType',
      hidden: false,
    },
    {
      id: 'status',
      hidden: false,
    },
    {
      id: 'position',
      hidden: false,
    },
    {
      id: 'createAt',
      hidden: false,
    },
    {
      id: 'name1',
      hidden: false,
    },
    {
      id: 'name2',
      hidden: false,
    },
    {
      id: 'name3',
      hidden: false,
    },
    {
      id: 'status1',
      hidden: false,
    },
    {
      id: 'status2',
      hidden: false,
    },
    {
      id: 'status3',
      hidden: false,
    },
    {
      id: '操作',
      hidden: false,
    },
  ];

  const getFields = (num: number) => {
    return {
      form: form.filter((item, index) => index % (num > 11 ? num - 11 : num) === 0),
      table: table.map((item, index) => {
        return {
          ...item,
          hidden: index % (num > 11 ? num - 11 : num) !== 0,
        };
      }),
    };
  };

  const viewData = [
    { key: 10, name: '全部需求', tags: '系统', counts: 1111, fields: getFields(10) },
    { key: 20, name: '进行中需求', tags: '系统', counts: 10, fields: getFields(20) },
    { key: 30, name: '已完成需求', tags: '系统', counts: 50, fields: getFields(30) },
    { key: 40, name: '已逾期需求', tags: '系统', counts: 1111, fields: getFields(40) },
    { key: 50, name: '已取消需求', tags: '系统', counts: 17, fields: getFields(50) },
    { key: 60, name: '已归档需求', tags: '系统', counts: 210, fields: getFields(60) },
    { key: 70, name: '我的待办', tags: '系统', counts: 0, fields: getFields(70) },
    { key: 80, name: '我提交的', tags: '系统', counts: 23, fields: getFields(80) },
    { key: 90, name: '待我受理', tags: '系统', counts: 0, fields: getFields(90) },
    { key: 100, name: '待我验收', tags: '系统', counts: 0, fields: getFields(100) },
    { key: 110, name: '待我发起验收', stag: '系统', counts: 0, fields: getFields(110) },
    { key: 120, name: '待我收益验证', stag: '系统', counts: 7, fields: getFields(120) },
    { key: 130, name: '我受理的', tags: '系统', counts: 5, fields: getFields(130) },
    { key: 140, name: '我转出的', tags: '系统', counts: 0, fields: getFields(140) },
    { key: 150, name: '我关注的', tags: '系统', counts: 16, fields: getFields(150) },
    { key: 160, name: '我的草稿', tags: '系统', counts: 0, fields: getFields(160) },
    { key: 170, name: '部门受理', tags: '系统', counts: 243, fields: getFields(170) },
    { key: 180, name: '部门提出', fields: getFields(180) },
  ];

  const tableRequest = (params: any) => {
    console.log('tableRequest', params);
    const { pageNo: current, pageSize } = params;
    const data = Array.from({ length: pageSize }, (item, index) => ({
      id: index,
      name: names[getRandomNumber(names.length - 1)],
      address: address[getRandomNumber(names.length - 1)],
      ip: '127.0.0.1',
      networkType: 1,
      status: ['running', 'starting'],
      position: [1, 11, 111],
      createAt: '',
      name1: names[getRandomNumber(names.length - 1)],
      name2: names[getRandomNumber(names.length - 1)],
      name3: names[getRandomNumber(names.length - 1)],
      status1: [status[getRandomNumber(names.length - 1)]],
      status2: [status[getRandomNumber(names.length - 1)]],
      status3: [status[getRandomNumber(names.length - 1)]],
    }));

    return new Promise((resolve) => {
      const res = { data, total: 100, current, pageSize };
      setTimeout(() => resolve(res), 1000);
    });
  };

  const viewRequest = (params: any): Promise<MsViewListRes> => {
    console.log('viewRequest', params);
    return new Promise((resolve) => {
      setTimeout(() => resolve(viewData), 1000);
    });
  };

  const tableViewRef = useRef<MsTableViewActionType>(null);
  // const [open, setOpen] = useLocalStorageState('open', { defaultValue: true });
  // const [width, setWidth] = useLocalStorageState('width', { defaultValue: 250 });
  // const [active, setActive] = useLocalStorageState<Key>('active');
  const [active, setActive] = useState<Key>('');
  // 保存
  const onSaveView = (params: ParamType, type: ViewOperationType) => {
    console.log(params, type);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const num = active as number;
        const param = form.length % num === 0;
        console.log(param);
        if (param) {
          message.success('保存成功');
          resolve('保存成功');
        } else {
          message.error('保存失败');
          reject('保存失败');
        }
      }, 1000);
    });
  };

  // 新增
  const onAddView = (params: ParamType, type: ViewOperationType) => {
    console.log(params, type);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const param = params.name === 'msxf';
        const msg = type === 'add' ? '新增' : '修改';
        if (param) {
          message.success(`${msg}成功`);
          resolve(`${msg}成功`);
        } else {
          message.error(`${msg}失败`);
          reject(`${msg}失败`);
        }
      }, 1000);
    });
  };

  const onDeleteView = (params: ParamType, type: ViewOperationType) => {
    console.log(params, type);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const param = params.name === 'msxf';
        if (param) {
          message.success(`删除成功`);
          resolve(`删除成功`);
        } else {
          message.error(`删除失败`);
          reject(`删除失败`);
        }
      }, 1000);
    });
  };

  return (
    <>
      <MsTableView
        resizableProps={{
          defaultOpenValue: true,
        }}
        hoverOpenView={true}
        formTopViewStyle={{ width: 300, height: 300 }}
        viewTitle="xx视图"
        viewActiveId={active}
        fieldNames={{ id: 'key', title: 'name', tag: 'tags', count: 'counts' }}
        viewRequest={viewRequest}
        viewPostRes={(res) => res}
        actionRef={tableViewRef}
        onClickViewRow={setActive}
        // 新增视图
        onAddView={onAddView}
        // 编辑视图
        onEditView={onAddView}
        // 删除视图
        onDeleteView={onDeleteView}
        // 保存视图
        onSaveView={onSaveView}
        // 另存为新视图
        onSaveAsNewView={onSaveView}
        // 保存按钮
        saveBtnDropdown={['save', 'saveAs']}
        columns={columns}
        onSortView={(list) => {
          console.log('排序啦', list);
        }}
        viewProps={{
          sortableProps: {
            disabledItem: (item) => item.tags === '系统',
          },
        }}
        viewItemDropDownMeun={['top']}
        tableRequest={tableRequest}
        tablePostRes={(res) => res}
        tableProps={{
          formRef,
          // 点击清空按钮时 此值为true是会保留默认值
          viewForm: { clearFieldsKeepDefaultVal: true },
          onClear: () => {
            // 设置其他值
            formRef.current?.setFieldsValue?.({ ip: '1111111111111111' });
          },
        }}
      />
    </>
  );
}

export default App;
