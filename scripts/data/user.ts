export const emailToUser: { [key: string]: { userId: string; userName: string } } = {
  'xiaoli.liu01@example.com': {
    userId: 'ou_8227dc95507b621e10781260083c2fdd',
    userName: '刘小莉',
  },
  'chuanjiang.ran@example.com': {
    userId: 'ou_ba510145f503b86f317ce4c767ff72cb',
    userName: '冉川江',
  },
  'jie.tan@example.com': {
    userId: 'ou_6ebf00778701776d26438e36e21cabdd',
    userName: '谭杰',
  },
  'yuan.cheng01@example.com': {
    userId: 'ou_c869e44a65cc2e2f5aeb16d217478bc5',
    userName: '程远',
  },
  'ying.liang02@example.com': {
    userId: 'ou_1dbfa3665ff3b4453f04ab95d291e1ad',
    userName: '梁瑛',
  },
  'wanqin.ma@example.com': {
    userId: 'ou_370eff02eeb7357375c46cbcd1d80ee3',
    userName: '马万琴',
  },
  'yi.zheng05@example.com': {
    userId: 'ou_c1f63805ea9c139b769b53f37e0adc88',
    userName: '郑义',
  },
  'shenglan.zhou@example.com': {
    userId: 'ou_e7f2cea55937d5f0395d41293184a9a6',
    userName: '周胜兰',
  },
  'lu.huang@example.com': {
    userId: 'ou_0b82e3df58a8a43fea17c1d0f47720f6',
    userName: '黄露',
  },
  'kaijin.zhou@example.com': {
    userId: 'ou_102394a9c8f8f43334298fd3e009b98e',
    userName: '周开金',
  },
  'bihua.xiang-n@example.com': {
    userId: 'ou_1d0908a44c6179eaf66d7f3b6994a591',
    userName: '向必华',
  },
  'xun.gong-n@example.com': {
    userId: 'ou_129b5aba6e9228303d8af91e4bca1f01',
    userName: '龚勋',
  },
  'qinli.zhang-n@example.com': {
    userId: 'ou_04b684f08190b66d1d87d970f79b45e1',
    userName: '张覃李',
  },
  'shuyong.ran-n@example.com': {
    userId: 'ou_9547add93ce5af3691cf79961d05a565',
    userName: '冉术勇',
  },
  'bo.wei-n@example.com': {
    userId: 'ou_57b6cba7fcc962a7eb9a546adfd0f2d7',
    userName: '魏波',
  },
  'hang.yi-n@example.com': {
    userId: 'ou_345526af0aa379b939ed6364c221cb1f',
    userName: '易航',
  },
  'rui.deng-n@example.com': {
    userId: 'ou_0808f547cb4bc6081de9c461d5bd39ae',
    userName: '邓锐',
  },
};

export const userList: { email: string; userId: string; userName: string }[] = Object.entries(
  emailToUser,
).map(([email, user]) => ({ email, ...user }));
