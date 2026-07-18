/**
 * title: 表格布局
 * description:
 * background: "#f0f3f4"
 */
import type { MsTableColumns } from '@jaytam/antd-ms';
import { MsActions, MsTable } from '@jaytam/antd-ms';
import { Button, Card, Form, Radio, Switch } from 'antd';
import { useState } from 'react';
import { NETWORK_ENUM, STATUS_ENUM } from './utils/constants';
import request from './utils/request';

function App() {
  const [card, setCard] = useState(true);
  const [title, setTitle] = useState(true);
  const [menu, setMenu] = useState(true);
  const [creator, setCreator] = useState(true);
  const [bar, setBar] = useState(true);
  const [filterbar, setFilterbar] = useState(true);
  const [toolbar, setToolbar] = useState(true);
  const [pagination, setPagination] = useState(true);
  const [selectionButtons, setSelectionButtons] = useState(true);
  const [filteredView, setFilteredView] = useState(true);

  const columns: MsTableColumns = [
    {
      title: '实例名称',
      dataIndex: 'name',
      width: 'auto',
      search: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      search: true,
      width: 150,
    },
    {
      title: '网络类型',
      dataIndex: 'networkType',
      valueType: 'select',
      valueEnum: NETWORK_ENUM,
      search: true,
    },
    {
      title: '运行状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: STATUS_ENUM,
    },
    {
      title: '操作',
      width: 120,
      render: () => <MsActions items={[{ label: '编辑' }, { label: '删除' }]} />,
    },
  ];

  return (
    <>
      <Card style={{ marginBottom: 20 }} bordered={false}>
        <Form layout="inline">
          <Form.Item label="卡片包裹">
            <Switch checked={card} onChange={setCard} />
          </Form.Item>
          <Form.Item label="标题">
            <Switch checked={title} onChange={setTitle} />
          </Form.Item>
          <Form.Item label="菜单">
            <Switch checked={menu} onChange={setMenu} />
          </Form.Item>
          <Form.Item label="创建按钮">
            <Switch checked={creator} onChange={setCreator} />
          </Form.Item>
          <Form.Item label="筛选栏">
            <Switch checked={filterbar} onChange={setFilterbar} />
          </Form.Item>
          <Form.Item label="工具栏（额外）">
            <Switch checked={toolbar} onChange={setToolbar} />
          </Form.Item>
          <Form.Item label="创建按钮 + 筛选栏 + 工具栏">
            <Switch checked={bar} onChange={setBar} />
          </Form.Item>
          <Form.Item label="筛选表单和表格之间">
            <Switch checked={filteredView} onChange={setFilteredView} />
          </Form.Item>
          <Form.Item label="批量操作">
            <Switch checked={selectionButtons} onChange={setSelectionButtons} />
          </Form.Item>
          <Form.Item label="分页器">
            <Switch checked={pagination} onChange={setPagination} />
          </Form.Item>
        </Form>
      </Card>

      <MsTable
        noCard={card ? undefined : true}
        title={title ? '表格布局' : undefined}
        menuRender={
          menu ? (
            <Radio.Group
              options={[
                { label: '菜单一', value: '1' },
                { label: '菜单二', value: '2' },
                { label: '菜单三', value: '3' },
              ]}
              optionType="button"
            />
          ) : undefined
        }
        creatorRender={creator ? <Button type="primary">创建实例</Button> : undefined}
        filterbarRender={filterbar ? undefined : null}
        toolbar={{ fullScreen: true }}
        barRender={bar ? undefined : null}
        filteredViewRender={
          filteredView ? (
            <div style={{ background: '#106FFB', padding: '8px', color: '#fff', borderRadius: 2 }}>
              筛选表单和表格之间区域
            </div>
          ) : null
        }
        rowSelection={{
          selectionButtonsRender: selectionButtons
            ? () => (
                <>
                  <Button>启动</Button>
                  <Button>关闭</Button>
                </>
              )
            : undefined,
        }}
        pagination={pagination ? undefined : false}
        toolbarRender={
          toolbar ? (
            <>
              <Button>导入</Button>
              <Button>导出</Button>
            </>
          ) : undefined
        }
        request={request}
        columns={columns}
      />
    </>
  );
}

export default App;
