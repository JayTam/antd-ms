/**
 * title: 基本使用
 * description:
 */
import type { MsFormColumns } from '@jaytam/antd-ms';
import { MsForm } from '@jaytam/antd-ms';
import { MsDeleteOutlined } from '@jaytam/icons';

export default () => {
  const onFinish = async (values: any) => {
    console.log('submit', values);
  };

  const columns: MsFormColumns = [
    {
      title: '用户上传',
      dataIndex: 'upload',
      valueType: 'upload',
      initialValue: [
        {
          uid: '-1',
          name: '马上云.png',
          status: 'done',
          url: 'http://ui.msxf.msxfyun.test/svgs/logo.svg',
        },
      ],
    },

    {
      title: '按钮之后渲染节点',
      dataIndex: 'uploadAfter',
      valueType: 'upload',
      initialValue: [
        {
          uid: '-1',
          name: '马上云.png',
          status: 'done',
          url: 'http://ui.msxf.msxfyun.test/svgs/logo.svg',
        },
      ],
      fieldProps: {
        uploadSuffixRender: <div>按钮之后渲染节点, 默认上传时生效</div>,
        showUploadList: {
          showPreviewIcon: true, // 不传默认为：true；是否可预览
          showDownloadIcon: true, // 不传默认为：true；是否可下载
          showRemoveIcon: true, // 不传默认为：true；是否可移除
          removeIcon: <MsDeleteOutlined style={{ color: 'red' }} />, //不传默认为：规范文档中的X
        },
      },
    },
    {
      title: '头像上传',
      dataIndex: 'pictureUpload',
      valueType: 'upload',
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
      title: '拖拽上传',
      dataIndex: 'draggerUpload',
      valueType: 'upload',
      fieldProps: {
        uploadType: 'dragger',
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
      title: '拖拽粘贴上传',
      dataIndex: 'draggerUploadPaste',
      valueType: 'upload',
      fieldProps: {
        uploadType: 'draggerPaste',
        multiple: true, // 多选文件
        maxCount: 5, // 最大上传文件数量
        accept: '.mp4',
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
      title: '拖拽上传禁用',
      dataIndex: 'draggerUploadDisabled',
      valueType: 'upload',
      fieldProps: {
        uploadType: 'dragger',
        disabled: true,
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

  return <MsForm onFinish={onFinish} columns={columns} labelCol={{ flex: '140px' }} />;
};
