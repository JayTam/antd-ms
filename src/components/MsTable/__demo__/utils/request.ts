const sleep = (time = 500) => new Promise((resolve) => setTimeout(resolve, time));

const request = async (params: any) => {
  console.log('请求参数：', params);
  await sleep();
  const list = [
    {
      id: 1,
      name: 'DAM-autoname-1667722950291',
      ip: '192.186.1.1',
      networkType: 1,
      status: 'running',
    },
    {
      id: 2,
      name: 'DAM-autoname-1667722068292',
      ip: '192.186.1.2',
      networkType: 2,
      status: 'starting',
    },
    {
      id: 3,
      name: 'DAM-autoname-1667722068293',
      ip: '192.186.1.3',
      networkType: 1,
      status: 'fail',
    },
  ];

  return {
    data: {
      list: list,
      pageNo: 1,
      pageSize: 20,
      total: list.length,
    },
  };
};

export default request;
