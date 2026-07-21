const request = ({ pageNo, pageSize }: any) => {
  const data = Array.from(Array(pageSize * 2)).map((_, index) => ({
    id: index + pageNo * pageSize,
    name: 'DAM-autoname-166772295029-' + (index + pageNo * pageSize),
    ip: '192.186.1.1',
    networkType: 1,
    status: 'running',
  }));

  return new Promise((resolve) => {
    const res = {
      data: {
        list: data,
        pageSize: pageSize,
        total: 10000,
      },
    };
    setTimeout(() => resolve(res), 1000);
  });
};

export default request;
