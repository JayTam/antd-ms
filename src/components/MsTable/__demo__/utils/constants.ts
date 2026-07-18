export const NETWORK_ENUM = [
  { label: '公有网络', value: 0 },
  { label: '专有网络', value: 1 },
  { label: '私有网络', value: 2 },
];

export const STATUS_ENUM = {
  running: {
    text: '运行中',
    status: 'success',
  },
  starting: {
    text: '启动中',
    status: 'processing',
  },
  fail: {
    text: '启动失败',
    status: 'error',
  },
};
