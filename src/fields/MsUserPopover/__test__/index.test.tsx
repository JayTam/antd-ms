import { MsField } from '@jaytam/antd-ms';
import { act, render, screen } from '@testing-library/react';

describe('MsUserPopover', () => {
  test('defaultValue 是否生效', async () => {
    await act(async () => {
      render(
        <MsField
          valueType="userPopover"
          fieldProps={{
            defaultValue: [
              {
                value: 'san.zhang@gmail.com',
                email: 'san.zhang@gmail.com',
                fullName: '公司-技术中心-研发部-前端组-平台化团队-业务团队',
                fullCode: '/D10001/D10002/D10017/D10004/D10005/D10006',
                label: '张三',
              },
              {
                value: 'si.li@gmail.com',
                email: 'si.li@gmail.com',
                fullCode: '/D10001/D10002/D10017/D10003/D10008/D10009',
                fullName: '公司-技术中心-研发部-前端组-平台化团队-业务团队',
                label: '李四',
              },
            ],
          }}
        />,
      );
    });

    expect(screen.getByText('张三')).toBeInTheDocument();
  });
});
