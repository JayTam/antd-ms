import type { MsDescriptionsActionType } from '@jaytam/antd-ms';
import { MsDescriptions } from '@jaytam/antd-ms';
import { asyncRenderPreset, sleepTest } from '@jaytam/antd-ms/tests/utils';
import { act, fireEvent, getByText, queryByText, screen, waitFor } from '@testing-library/react';
import { useRef } from 'react';

describe('MsDescriptions', () => {
  test('request 远程请求初始值正常', async () => {
    const request = jest.fn().mockResolvedValue({
      data: {
        text: '输入框初始值',
        select: 'two',
      },
    });

    function Test() {
      const actionRef = useRef<MsDescriptionsActionType>(null);
      return (
        <MsDescriptions
          actionRef={actionRef}
          request={request}
          columns={[
            {
              title: '文本',
              dataIndex: 'text',
              editable: true,
            },
            {
              title: '选择器',
              dataIndex: 'select',
              valueType: 'select',
              valueEnum: {
                one: '选项一',
                two: '选项二',
              },
              editable: true,
            },
          ]}
        />
      );
    }
    await asyncRenderPreset(<Test />, { wrapperMsConfigProvider: true });

    expect(request).toHaveBeenCalledTimes(1);
    await sleepTest(100);
    expect(screen.getByText('输入框初始值')).toBeInTheDocument();
    expect(screen.getByText('选项二')).toBeInTheDocument();
  });

  test('刷新之后正常', async () => {
    let count = 0;
    const request = jest.fn().mockImplementation(async () => {
      count++;
      return {
        data: {
          text: '输入框初始值' + count,
          select: 'two',
        },
      };
    });

    function Test() {
      return (
        <MsDescriptions
          title="标题"
          request={request}
          columns={[
            {
              title: '文本',
              dataIndex: 'text',
              editable: true,
            },
            {
              title: '选择器',
              dataIndex: 'select',
              valueType: 'select',
              valueEnum: {
                one: '选项一',
                two: '选项二',
              },
              editable: true,
            },
          ]}
        />
      );
    }
    await asyncRenderPreset(<Test />, { wrapperMsConfigProvider: true });

    await waitFor(() => expect(request).toHaveBeenCalledTimes(1));
    await sleepTest(100);
    expect(screen.getByText('输入框初始值1')).toBeInTheDocument();
    expect(screen.getByText('选项二')).toBeInTheDocument();
    await act(async () => {
      const el = screen.getByRole('img', { name: 'sync' });
      fireEvent.click(el);
    });
    await waitFor(() => expect(request).toHaveBeenCalledTimes(2));
    await expect(screen.findByText('输入框初始值2')).resolves.toBeInTheDocument();
    expect(screen.getByText('选项二')).toBeInTheDocument();
  });

  test('openEditor 打开抽屉', async () => {
    const request = jest.fn().mockResolvedValue({
      data: {
        text: '输入框初始值',
        select: 'two',
      },
    });

    function Test() {
      const actionRef = useRef<MsDescriptionsActionType>(null);
      return (
        <MsDescriptions
          actionRef={actionRef}
          request={request}
          columns={[
            {
              title: '文本',
              dataIndex: 'text',
              editable: true,
            },
            {
              title: '选择器',
              dataIndex: 'select',
              valueType: 'select',
              valueEnum: {
                one: '选项一',
                two: '选项二',
              },
              editable: true,
            },
          ]}
          extra={{
            items: [
              {
                label: '打开抽屉',
                onClick: () =>
                  actionRef.current?.openEditor({
                    type: 'drawer',
                    drawerProps: { title: '抽屉标题' },
                  }),
              },
            ],
          }}
        />
      );
    }
    await asyncRenderPreset(<Test />, { wrapperMsConfigProvider: true });
    await act(async () => {
      const el = screen.getByText('打开抽屉');
      fireEvent.click(el);
    });
    // 弹窗是否打开
    expect(screen.getByText('抽屉标题')).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByText('确 定'));
    });
    expect(screen.queryByText('抽屉标题')).toBeNull();
    expect(request).toHaveBeenCalledTimes(2);
  });

  test('openEditor 打开弹窗', async () => {
    const request = jest.fn().mockResolvedValue({
      data: {
        text: '输入框初始值',
        select: 'two',
      },
    });

    function Test() {
      const actionRef = useRef<MsDescriptionsActionType>(null);
      return (
        <MsDescriptions
          actionRef={actionRef}
          request={request}
          columns={[
            {
              title: '文本',
              dataIndex: 'text',
              editable: true,
            },
            {
              title: '选择器',
              dataIndex: 'select',
              valueType: 'select',
              valueEnum: {
                one: '选项一',
                two: '选项二',
              },
              editable: true,
            },
          ]}
          extra={{
            items: [
              {
                label: '打开弹窗',
                onClick: () =>
                  actionRef.current?.openEditor({
                    type: 'modal',
                    modalProps: { title: '弹窗标题' },
                  }),
              },
            ],
          }}
        />
      );
    }
    await asyncRenderPreset(<Test />, { wrapperMsConfigProvider: true });
    expect(request).toHaveBeenCalledTimes(1);
    await act(async () => {
      const el = screen.getByText('打开弹窗');
      fireEvent.click(el);
    });
    // 弹窗是否打开
    expect(screen.getByText('弹窗标题')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText('确 定'));
    });
    expect(screen.queryByText('弹窗标题')).toBeNull();
    expect(request).toHaveBeenCalledTimes(2);
  });

  test('openEditor 打开指定字段', async () => {
    const request = jest.fn().mockResolvedValue({
      data: {
        text: '输入框初始值',
        select: 'two',
      },
    });

    function Test() {
      const actionRef = useRef<MsDescriptionsActionType>(null);
      return (
        <MsDescriptions
          title="详情"
          actionRef={actionRef}
          request={request}
          columns={[
            {
              title: '文本',
              dataIndex: 'text',
              editable: { type: 'none' },
            },
            {
              title: '选择器',
              dataIndex: 'select',
              valueType: 'select',
              valueEnum: {
                one: '选项一',
                two: '选项二',
              },
              editable: { type: 'none' },
            },
          ]}
          extra={{
            items: [
              {
                label: '打开弹窗',
                onClick: () => actionRef.current?.openEditor({ openFields: ['text'] }),
              },
            ],
          }}
        />
      );
    }
    await asyncRenderPreset(<Test />, { wrapperMsConfigProvider: true });
    await act(async () => {
      const el = screen.getByText('打开弹窗');
      fireEvent.click(el);
    });
    const content: any = document.querySelector('.ant-modal-content');
    expect(content).toBeInTheDocument();
    expect(getByText(content, '文本')).toBeInTheDocument();
    expect(queryByText(content, '选择器')).toBeNull();
  });

  test('titleColumn 配置标题', async () => {
    const request = jest.fn().mockResolvedValue({
      data: {
        title: 'requestTitle',
      },
    });

    function Test() {
      const actionRef = useRef<MsDescriptionsActionType>(null);
      return (
        <MsDescriptions
          actionRef={actionRef}
          request={request}
          titleColumn={{
            title: '标题',
            dataIndex: 'title',
            copyable: true,
            editable: true,
            actions: [
              { label: '按钮1', title: '按钮提示' },
              { label: '按钮2', title: '按钮提示' },
            ],
          }}
        />
      );
    }
    const { container } = await asyncRenderPreset(<Test />, { wrapperMsConfigProvider: true });

    screen.debug(container, 1000000000000);

    await expect(screen.findByText('requestTitle')).resolves.toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByRole('img', { name: 'copy' }));
      fireEvent.click(screen.getByRole('img', { name: 'edit' }));
    });

    expect(screen.getByText('编辑标题')).toBeInTheDocument();
  });
});
