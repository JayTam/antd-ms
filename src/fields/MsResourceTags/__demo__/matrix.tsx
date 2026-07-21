/**
 * title: 详情页-二维数组
 * description: 当后端返回的是二维数组结构，可以采用 MsResourceTags.mergeResourceRequestMatrix 合并请求。注意二维数组的场景是不支持资源标签功能（valueType=resourceTag）。
 * background: "#f0f3f4"
 */
import { MsPage, MsResourceTags } from '@jaytam/antd-ms';
import { Table } from 'antd';

const request = () => {
  const data = {
    mainOrderId: 7184691200121,
    orderStatus: 'paid',
    type: 'expansion',
    payType: 'fixed',
    paidAt: '2024-11-01 16:17:21',
    paidBy: '168446337681199',
    createdAt: 1730448261,
    createdBy: '168446337681199',
    orderAmount: 3,
    payAmount: 0.3,
    configChange: [
      {
        beforeConfig: {
          feeName: '云盘使用时长',
          feeCode: 'fee-ursb9cb6pm9id3a78q',
          capacity: 30,
          feeUnit: 'GB',
        },
        nowConfig: {
          feeName: '云盘使用时长',
          feeCode: 'fee-ursb9cb6pm9id3a78q',
          capacity: 60,
          feeUnit: 'GB',
        },
      },
    ],
    subOrderInfoList: [
      {
        subOrderId: 718469130256,
        source: 'EBA',
        product: 'EBA',
        displayTemplate: [
          {
            label: '云盘使用时长',
            value: '60GB *1',
          },
          {
            label: '可用区',
            value: '巴南机房（巴南资源池-001）',
          },
        ],
        payType: 'fixed',
        startTime: 1730448262,
        expireTime: 1732982400,
        performanceState: 'performed',
        performanceAt: '2024-11-01 16:18:18',
        num: 1,
        payAmount: 0.3,
        orderAmount: 3,
        subOrderPrice: 6,
        instanceIds: ['volume-qry8ezeombsr9eumok'],
        periodCount: '1',
        createdAt: 1730448262,
        orderInstanceInfos: [
          {
            resourceContext: 'example:ECS:16:167496225837449:ecs/ecs-mgp49633grucwkn69r',
            instanceId: 'volume-qry8ezeombsr9eumok',
            instanceStatus: 1,
            performanceState: 'performed',
          },
          {
            resourceContext: 'example:ECS:16:167496225837449:ecs/ecs-qgrh86u80dqz6wjxc7',
            instanceId: 'ecs-qgrh86u80dqz6wjxc7',
            instanceStatus: 1,
            performanceState: 'performed',
          },
        ],
        resourceContexts: [
          'example:ECS:16:167496225837449:ecs/ecs-mgp49633grucwkn69r',
          'example:ECS:16:167496225837449:ecs/ecs-qgrh86u80dqz6wjxc7',
        ],
      },
    ],
    timeOut: '2024-11-08T16:04:21.000+08:00',
    whetherResourceApprove: 0,
    payChannel: 'balance',
    createdName: '15696867390',
    paidName: '15696867390',
  };
  return new Promise((resolve) => {
    const res = { data };
    setTimeout(() => resolve(res), 2000);
  });
};

function App() {
  // 二维数组场景，组件内置不支持资源标签功能，但是资源组，解析资源链接可通过以下合并请求的方式实现
  const requestWithResource = MsResourceTags.mergeResourceRequestMatrix(request, {
    listNamePath: ['data', 'subOrderInfoList'],
    listItemNamePath: 'orderInstanceInfos',
    griKey: 'resourceContext',
  });

  return (
    <MsPage title="MsResourceTags.mergeResourceRequestMatrix" request={requestWithResource}>
      {(data) => {
        const dataSource = data?.subOrderInfoList ?? [];

        return (
          <Table
            dataSource={dataSource}
            pagination={false}
            columns={[
              {
                title: '资源组',
                dataIndex: 'resourceGroup',
                render: (_, record) => {
                  return record.orderInstanceInfos
                    .map(
                      (orderInstanceInfo: any) =>
                        orderInstanceInfo?.resource?.resourceGroupModel?.groupName,
                    )
                    .join(', ');
                },
              },
              {
                title: '跳转链接',
                dataIndex: 'link',
                render: (_, record) => {
                  return record.orderInstanceInfos
                    .map((orderInstanceInfo: any) => orderInstanceInfo?.resource?.resourceUrl)
                    .join(', ');
                },
              },
            ]}
          />
        );
      }}
    </MsPage>
  );
}

export default App;
