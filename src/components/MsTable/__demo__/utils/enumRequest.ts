export const networkRequest = () => {
  const data = [
    { label: '专有网络', value: 1 },
    { label: '私有网络', value: 2 },
    { label: '自定义网络', value: 3 },
  ];
  return new Promise((resolve) => {
    const res = {
      data: data,
    };
    setTimeout(() => resolve(res), 2000);
  });
};

export const statusRequest = () => {
  const data = {
    running: '运行中',
    starting: '启动中',
    fail: '启动失败',
  };
  return new Promise((resolve) => {
    const res = {
      data: data,
    };
    setTimeout(() => resolve(res), 2000);
  });
};
