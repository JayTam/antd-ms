/**
 * title: 卡片带标题 / item hoverable
 * description:
 */

import { MsStatistic } from '@jaytam/antd-ms';

export default function APP() {
  const hoverable = true;
  return (
    <MsStatistic
      column={6}
      title={'缺陷概览'}
      type={'card-gray'}
      items={[
        {
          key: 1,
          title: '缺陷总数',
          value: 78,
          style: { backgroundColor: '#EDF7FF' },
          hoverable,
        },
        {
          key: 2,
          title: '缺陷解决数',
          value: 38,
          style: { backgroundColor: '#FFF6F0' },
          hoverable,
        },
        {
          key: 3,
          title: '严重缺陷数',
          value: 8999,
          style: { backgroundColor: '#F4F2FF' },
          hoverable,
        },
        {
          key: 4,
          title: '缺陷激活率',
          value: 60.78,
          unit: '%',
          className: 'custom-style',
          hoverable,
        },
        {
          key: 5,
          title: '累计决绝时长',
          value: 69,
          style: { backgroundColor: '#EBFCFB' },
          hoverable,
        },
        {
          key: 6,
          title: '平均解决时长',
          value: 69,
          unit: '%',
          className: 'custom-style',
          hoverable,
        },
      ]}
    />
  );
}
