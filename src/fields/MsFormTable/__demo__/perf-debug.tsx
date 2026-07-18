/**
 * title: 性能检测
 * description: 需要设置 EditableCell 的memo配置，待确认风险
 */
import { MsForm } from '@jaytam/antd-ms';

const userListData = [
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
  {
    value: 'hao.li@msxf.com',
    email: 'hao.li@msxf.com',
    fullCode: '/D10541/D10185/D10017/D10842/D10025/D11083',
    fullName:
      '集团_马上消费金融股份有限公司-CTO直管部门-技术部-金融科技研发部-数据智能与风控研发部-质量保障团队',
    label: '李好',
  },
  {
    value: 'liyin.zhao@msxf.com',
    email: 'liyin.zhao@msxf.com',
    fullCode: '/D10541/D10185/D10017/D10842/D10025/D11083',
    fullName:
      '集团_马上消费金融股份有限公司-CTO直管部门-技术部-金融科技研发部-数据智能与风控研发部-质量保障团队',
    label: '赵丽颖',
  },

  {
    value: 'example1@msxf.com',
    email: 'example1@msxf.com',
    fullCode: '/D10542/D10186/D10018/D10843/D10026/D11084',
    fullName:
      '集团_马上消费金融股份有限公司-CTO直管部门-技术部-金融科技研发部-数据智能与风控研发部-开发一组',
    label: '张伟',
  },
  {
    value: 'example2@msxf.com',
    email: 'example2@msxf.com',
    fullCode: '/D10543/D10187/D10019/D10844/D10027/D11085',
    fullName:
      '集团_马上消费金融股份有限公司-CTO直管部门-技术部-金融科技研发部-数据智能与风控研发部-开发二组',
    label: '李娜',
  },
  {
    value: 'example3@msxf.com',
    email: 'example3@msxf.com',
    fullCode: '/D10544/D10188/D10020/D10845/D10028/D11086',
    fullName:
      '集团_马上消费金融股份有限公司-CTO直管部门-技术部-金融科技研发部-数据智能与风控研发部-算法团队',
    label: '王芳',
  },
  // ... 继续按照此模式添加更多项目
  {
    value: 'example10@msxf.com',
    email: 'example10@msxf.com',
    fullCode: '/D10550/D10194/D10026/D10851/D10034/D11092',
    fullName:
      '集团_马上消费金融股份有限公司-CTO直管部门-技术部-金融科技研发部-数据智能与风控研发部-产品设计组',
    label: '刘强',
  },
];

const userAutoComplete = (data: any) => {
  const params = { keyWord: data };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: userListData.filter((i) =>
          params.keyWord ? i.label.includes(params.keyWord) : true,
        ),
      });
    }, 500);
  });
};

const genItem = (index: number) => {
  return {
    text1: index + '测试',
    text2: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
    user: [
      {
        value: 'example10@msxf.com',
        email: 'example10@msxf.com',
        fullCode: '/D10550/D10194/D10026/D10851/D10034/D11092',
        fullName:
          '集团_马上消费金融股份有限公司-CTO直管部门-技术部-金融科技研发部-数据智能与风控研发部-产品设计组',
        label: '刘强',
      },
    ],
    userM: userListData,
  };
};

export default () => {
  return (
    <MsForm
      initialValues={{
        list: new Array(100).fill(0).map((_, index) => genItem(index)),
      }}
      columns={[
        {
          title: '表格',
          valueType: 'formTable',
          dataIndex: 'list',
          fieldProps: {
            indexRender: (index: number) => index + 1,
            actions: ['up', 'down'],
            tableProps: {
              scroll: { y: 500 },
            },
          },
          columns: [
            {
              title: '输入text',
              dataIndex: 'text1',
              width: 100,
            },
            {
              title: '输入textArea',
              valueType: 'textArea',
              dataIndex: 'text2',
            },
            {
              title: '输入1',
              valueType: 'select',
              dataIndex: 'text3',
              valueEnum: {
                a: '测试1',
                b: '测试2',
              },
            },
            {
              title: '单选用户',
              valueType: 'userPopover',
              dataIndex: 'user',
              fieldProps: {
                frequentContactsKey: 'userPopover',
                searchRequest: userAutoComplete,
                optionalLimit: 1,
              },
            },
            {
              title: '多选用户',
              valueType: 'userPopover',
              dataIndex: 'userM',
              fieldProps: {
                frequentContactsKey: 'userPopover',
                searchRequest: userAutoComplete,
              },
            },
          ],
        },
      ]}
    />
  );
};
