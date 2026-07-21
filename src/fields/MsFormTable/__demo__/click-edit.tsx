/**
 * title: 点击编辑
 * description: 鼠标点击时进入编辑态
 */
import { MsForm } from '@jaytam/antd-ms';

const userListData = [
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
  {
    value: 'hao.li@gmail.com',
    email: 'hao.li@gmail.com',
    fullCode: '/D10001/D10002/D10017/D10003/D10008/D10009',
    fullName: '公司-技术中心-研发部-前端组-平台化团队-业务团队',
    label: '李好',
  },
  {
    value: 'user16@example.com',
    email: 'user16@example.com',
    fullCode: '/D10001/D10002/D10017/D10003/D10008/D10009',
    fullName: '公司-技术中心-研发部-前端组-平台化团队-业务团队',
    label: '赵丽颖',
  },

  {
    value: 'example1@gmail.com',
    email: 'example1@gmail.com',
    fullCode: '/D10001/D10002/D10003/D10008/D10007/D10009',
    fullName: '公司-技术中心-研发部-前端组-平台化团队-业务团队',
    label: '张伟',
  },
  {
    value: 'example2@gmail.com',
    email: 'example2@gmail.com',
    fullCode: '/D10001/D10002/D10003/D10008/D10007/D10009',
    fullName: '公司-技术中心-研发部-前端组-平台化团队-业务团队',
    label: '李娜',
  },
  {
    value: 'example3@gmail.com',
    email: 'example3@gmail.com',
    fullCode: '/D10001/D10002/D10003/D10008/D10028/D10009',
    fullName: '公司-技术中心-研发部-前端组-平台化团队-业务团队',
    label: '王芳',
  },
  // ... 继续按照此模式添加更多项目
  {
    value: 'example10@gmail.com',
    email: 'example10@gmail.com',
    fullCode: '/D10001/D10002/D10007/D10008/D10007/D10009',
    fullName: '公司-技术中心-研发部-前端组-平台化团队-业务团队',
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

export default () => {
  return (
    <MsForm
      initialValues={{
        list: [
          {
            text1: '测试99999',
            text2: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
            user: [
              {
                value: 'example10@gmail.com',
                email: 'example10@gmail.com',
                fullCode: '/D10001/D10002/D10007/D10008/D10007/D10009',
                fullName: '公司-技术中心-研发部-前端组-平台化团队-业务团队',
                label: '刘强',
              },
            ],
            userM: userListData,
          },
          {
            text1: '测试99999',
            text2: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          },
        ],
      }}
      columns={[
        {
          // title: '表格',
          valueType: 'formTable',
          dataIndex: 'list',
          mode: 'clickEdit',
          fieldProps: {
            actions: ['up', 'down', 'del'],
            onMove: console.log,
          },
          columns: [
            {
              title: '输入text',
              dataIndex: 'text1',
              width: 100,
              fieldProps: {
                // readOnly: true,
              },
            },
            {
              title: '输入textArea',
              valueType: 'textArea',
              dataIndex: 'text2',
              fieldProps: {
                // readOnly: true,
              },
            },
            {
              title: '输入1',
              valueType: 'select',
              dataIndex: 'text3',
              valueEnum: {
                a: '测试1',
                b: '测试2',
              },
              fieldProps: {
                // readOnly: true,
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
                // readOnly: true,
              },
            },
            {
              title: '多选用户',
              valueType: 'userPopover',
              dataIndex: 'userM',
              fieldProps: {
                frequentContactsKey: 'userPopover',
                searchRequest: userAutoComplete,
                // readOnly: true,
              },
            },
          ],
        },
      ]}
    />
  );
};
