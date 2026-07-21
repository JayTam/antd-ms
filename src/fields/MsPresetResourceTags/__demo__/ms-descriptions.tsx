/**
 * title: MsDescriptions
 * description:
 * background: "#f0f3f4"
 */
import type { MsDescriptionsColumns } from '@jaytam/antd-ms';
import { MsDescriptions, MsResourceTags } from '@jaytam/antd-ms';

const request = () => {
  return new Promise((resolve) => {
    const res = {
      data: { gri: 'example:ECS:16:171576359951909:ecs/ecs-v059inqruutv56440s' },
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
    <MsDescriptions
      title="MsDescriptions请求"
      column={2}
      request={MsResourceTags.mergeResourceRequest(
        request,
        // 后端返回 gri 的键名
        'gri',
      )}
      columns={columns}
    />
  );
};
