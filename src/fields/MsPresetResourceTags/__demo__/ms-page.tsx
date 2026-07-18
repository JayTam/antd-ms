/**
 * title: MsPage
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
      valueType: 'presetResourceTags',
      // 资源标签 valueType=presetResourceTags 即可生效，dataIndex=xxx 不重要，随便设置一个即可
      // 如果后端返回 gri 键名是其他的，在 MsResourceTags.mergeResourceRequest 第二个参数修改
      dataIndex: 'gri',
      editable: true,
    },
    {
      title: '资源组',
      dataIndex: ['resource', 'resourceGroupModel', 'groupName'],
    },
  ];

  return (
    <MsPage title="MsPage请求" request={MsResourceTags.mergeResourceRequest(request)}>
      {(data) => <MsDescriptions initialValues={data} columns={columns} />}
    </MsPage>
  );
};
