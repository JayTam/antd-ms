/**
 * title: 只读模式
 * description:
 */
import type { MsFormColumns } from '@jaytam/antd-ms';
import { MsForm } from '@jaytam/antd-ms';

export default () => {
  // 只读模式下默认：不可下载、不可删除、不可预览
  const onFinish = async (values: any) => {
    console.log('submit', values);
  };

  const columns: MsFormColumns = [
    {
      title: '用户上传',
      dataIndex: 'uploadRead',
      valueType: 'upload',
      initialValue: [
        {
          uid: '-1',
          name: '马上云.png',
          status: 'done',
          url: 'http://ui.msxf.msxfyun.test/svgs/logo.svg',
        },
        {
          uid: '-2',
          name: 'xlsx类型.xlsx',
          status: 'done',
        },
      ],
      fieldProps: {
        showUploadList: {
          showDownloadIcon: true,
        },
      },
    },
    {
      title: '头像上传',
      dataIndex: 'pictureUploadRead',
      valueType: 'upload',
      // 只读时默认会开启省略，会导致hover图片额外加了tooltip，暂时解决办法将省略关闭，待后续公共组件优化
      ellipsis: false,
      fieldProps: {
        name: '马上云',
        uploadType: 'profile',
        listType: 'picture-card',
      },
      initialValue: [
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'http://ui.msxf.msxfyun.test/svgs/logo.svg',
        },
      ],
    },
    {
      title: '拖拽粘贴上传',
      dataIndex: 'draggerUploadRead',
      valueType: 'upload',
      mode: 'read', // 表单没有只读时，可以单独设置该项为只读
      fieldProps: {
        uploadType: 'draggerPaste',
        showUploadList: {
          showPreviewIcon: true, // 编辑时不传默认为：true；是否可预览，只读时预览需要传入
          showDownloadIcon: true, // 编辑时不传默认为：true；是否可下载，只读时预览需要传入
        },
        multiple: true, // 多选文件
        maxCount: 5, // 最大上传文件数量
      },
      initialValue: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ],
    },
    {
      title: '拖拽上传',
      dataIndex: 'draggerUploadRead',
      valueType: 'upload',
      fieldProps: {
        uploadType: 'dragger',
        showUploadList: {
          showDownloadIcon: true,
        },
      },
      initialValue: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ],
    },
  ];

  return <MsForm onFinish={onFinish} mode="read" columns={columns} />;
};
