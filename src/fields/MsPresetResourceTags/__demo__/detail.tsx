/**
 * title: 详情页
 * description:
 * background: "#f0f3f4"
 */
import type { MsDescriptionsColumns } from '@jaytam/antd-ms';
import { MsDescriptions, MsPage, MsResourceTags } from '@jaytam/antd-ms';

const request = () => {
  return new Promise((resolve) => {
    const res = {
      data: { gri: 'msxf:EBA:16:167496225837449:volume/volume-zb82d8gipmom09r0ri' },
    };
    setTimeout(() => resolve(res), 2000);
  });
};

export default () => {
  const columns: MsDescriptionsColumns = [
    {
      title: '资源标签',
      // 声明预置标签组件
      valueType: 'presetResourceTags',
      // dataIndex 可随便设置，只要不设置成 resource
      dataIndex: 'tags',
      editable: true,
    },
    {
      title: '资源组',
      dataIndex: ['resource', 'resourceGroupModel', 'groupName'],
    },
  ];

  const requestWithResource = MsResourceTags.mergeResourceRequest(request);

  return (
    <>
      <MsDescriptions title="MsDescriptions请求" request={requestWithResource} columns={columns} />
      <MsPage title="MsPage请求" request={requestWithResource}>
        {(data) => <MsDescriptions dataSource={data} columns={columns} />}
      </MsPage>
      <MsPage title="MsPage">
        <MsPage.SubPage title="MsSubPage请求" request={requestWithResource}>
          {(data) => <MsDescriptions dataSource={data} columns={columns} />}
        </MsPage.SubPage>
      </MsPage>
    </>
  );
};
