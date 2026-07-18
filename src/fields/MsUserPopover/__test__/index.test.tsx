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
                value: 'san.zhang@msxf.com',
                email: 'san.zhang@msxf.com',
                fullName:
                  '集团_马上消费金融股份有限公司-CTO直管部门-技术部-金融科技研发部-公共平台研发部-平台产品化团队',
                fullCode: '/D10541/D10185/D10017/D10558/D10463/D11195',
                label: '张三',
              },
              {
                value: 'si.li@msxf.com',
                email: 'si.li@msxf.com',
                fullCode: '/D10541/D10185/D10017/D10842/D10025/D11083',
                fullName:
                  '集团_马上消费金融股份有限公司-CTO直管部门-技术部-金融科技研发部-数据智能与风控研发部-质量保障团队',
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
