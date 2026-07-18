/**
 * title: 远程数据
 * description:
 * background: "#f0f3f4"
 */
import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTableView } from '@jaytam/antd-ms';
import { useLocalStorageState } from 'ahooks';
import { Button, message } from 'antd';
import type { Key } from 'react';
import { useRef } from 'react';

import type {
  MsViewListItemType,
  MsViewListMenuItemType,
  MsViewListRes,
  ParamType,
  ViewOperationType,
} from '../../MsViewList/types';
import type { MsTableViewActionType } from '../types';

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
        groupName: '分组二',
      },
    },
    {
      title: '网络类型（单选）',
      dataIndex: 'networkType',
      valueType: 'select',
      valueEnum: NETWORK_ENUM,
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
    },
    {
      id: 'address',
      hidden: false,
    },
    {
      id: 'ip',
      hidden: false,
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
      hidden: true,
    },
    {
      id: 'name2',
      hidden: true,
    },
    {
      id: 'name3',
      hidden: true,
    },
    {
      id: 'status1',
      hidden: true,
    },
    {
      id: 'status2',
      hidden: true,
    },
    {
      id: 'status3',
      hidden: true,
    },
    {
      id: '操作',
      hidden: true,
    },
  ];

  const getFields = (num: number) => {
    return {
      table,
      form: form.filter((item, index) => index % (num > 11 ? num - 11 : num) === 0),
    };
  };

  const viewData = [
    { key: 1, name: '全部需求', tags: '系统', counts: 1111, fields: getFields(1) },
    { key: 2, name: '进行中需求', tags: '系统', counts: 10, fields: getFields(2) },
    { key: 3, name: '已完成需求', tags: '系统', counts: 50, fields: getFields(3) },
    { key: 4, name: '已逾期需求', tags: '系统', counts: 1111, fields: getFields(4) },
    { key: 5, name: '已取消需求', tags: '系统', counts: 17, fields: getFields(5) },
    { key: 6, name: '已归档需求', tags: '系统', counts: 210, fields: getFields(6) },
    { key: 7, name: '我的待办', tags: '个人', counts: 0, fields: getFields(7) },
    { key: 8, name: '我提交的', tags: '个人', counts: 23, fields: getFields(8) },
    { key: 9, name: '待我受理', tags: '个人', counts: 0, fields: getFields(9) },
    { key: 10, name: '待我验收', tags: '个人', counts: 0, fields: getFields(10) },
    { key: 11, name: '待我发起验收', stag: '个人', counts: 0, fields: getFields(11) },
    { key: 12, name: '待我收益验证', stag: '个人', counts: 7, fields: getFields(12) },
    { key: 13, name: '我受理的', tags: '个人', counts: 5, fields: getFields(13) },
    { key: 14, name: '我转出的', tags: '个人', counts: 0, fields: getFields(14) },
    { key: 15, name: '我关注的', tags: '个人', counts: 16, fields: getFields(15) },
    { key: 16, name: '我的草稿', tags: '个人', counts: 0, fields: getFields(16) },
    { key: 17, name: '部门受理', tags: '系统', counts: 243, fields: getFields(17) },
    { key: 18, name: '部门提出', fields: getFields(18) },
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
      setTimeout(() => resolve(res), 2000);
    });
  };

  const viewRequest = (params: any): Promise<MsViewListRes> => {
    console.log('viewRequest', params);
    return new Promise((resolve) => {
      setTimeout(() => resolve(viewData), 2000);
    });
  };

  const tableViewRef = useRef<MsTableViewActionType>(null);
  const [open, setOpen] = useLocalStorageState('open', { defaultValue: true });
  const [width, setWidth] = useLocalStorageState('width', { defaultValue: 250 });
  const [active, setActive] = useLocalStorageState<Key>('active');
  // const [active, setActive] = useState<Key>('');
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
      }, 2000);
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
      }, 2000);
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
      }, 2000);
    });
  };

  return (
    <>
      <MsTableView
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
        saveBtnDropdown={(data) => {
          return [
            'saveAs',
            {
              label: '保存视图',
              key: 'save',
              // disabled: data?.tags === '系统', // 禁用
              hidden: data?.tags !== '系统', // 掩藏   优先级高
            },
          ];
        }}
        // 配置左侧视图列表是否可拖动
        viewListSortable={false}
        viewItemDropDownMeun={(item: MsViewListItemType, index: number) => {
          const menu: MsViewListMenuItemType[] = [
            item.key === 1 && {
              label: '视图共享视图共享视图共享',
              key: 'other1',
              onClick: () => console.log('点击了共享'),
            },
            index !== 0 && 'top',
            'edit',
            'sort',
            'del',
            { label: '其他', key: 'other2', onClick: () => console.log('点击了其他') },
          ];
          return menu;
        }}
        viewProps={{
          iconTips: {
            tipsText: '查看帮助文档',
          },

          sortableProps: { isShowTopIcon: true },
          sortModalProps: {
            title: 'devops视图排序',
            bodyStyle: { maxHeight: 200, overflowY: 'auto' },
          },
        }}
        resizableProps={{
          showCollapsedToggle: false,
          defaultOpenValue: false,
        }}
        viewType="topTabs"
        maxLine={4}
        onSortView={(list) => {
          console.log('您操作了排序', list);
        }}
        msTableViewContentStyle={{ paddingLeft: 16 }}
        formTopViewStyle={{ height: 300 }}
        hoverOpenView={true}
        tableRequest={tableRequest}
        tablePostRes={(res) => {
          const total = res.total;
          tableViewRef.current?.onChangeViewCount?.(active!, total);
          return res;
        }}
        columns={columns}
        tableProps={{
          syncToUrl: false,
          viewForm: {
            saveBtnable: true,
            resetBtnable: true,
            drawerProps: {
              okText: '提交',
              cancelText: '关闭',
            },
          },
          search: {
            column: 3, // 设置筛选条件展示几列，不传默认显示两列
            labelWidth: '110px', // 设置label 显示宽度
          },
          creatorRender: <Button type="primary">创建</Button>,
        }}
      />
    </>
  );
}

export default App;
