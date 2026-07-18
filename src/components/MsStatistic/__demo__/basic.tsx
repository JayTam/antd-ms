/**
 * title: 水平对齐 / item预设样式 / 同行排布 / hoverable
 * description:
 */

import { MsStatistic } from '@jaytam/antd-ms';
import { Radio } from 'antd';
import { useState } from 'react';

export default function APP() {
  const [align, setAlign] = useState<'left' | 'center' | 'right' | undefined>('left');
  const [type, setType] = useState<'normal' | 'card-normal' | 'card-gray' | undefined>('normal');
  const [inline, setInline] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [hoverable, setHoverable] = useState<boolean>(false);
  return (
    <>
      <div style={{ marginBottom: 15 }}>
        水平对齐：
        <Radio.Group
          value={align}
          onChange={(e) => {
            setAlign(e.target.value);
          }}
        >
          <Radio.Button value="left">left</Radio.Button>
          <Radio.Button value="center">center</Radio.Button>
          <Radio.Button value="right">right</Radio.Button>
        </Radio.Group>
        &nbsp;&nbsp;item预设样式：
        <Radio.Group
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <Radio.Button value="normal">normal</Radio.Button>
          <Radio.Button value="card-normal">card-normal</Radio.Button>
          <Radio.Button value="card-gray">card-gray</Radio.Button>
        </Radio.Group>
        &nbsp;&nbsp;同行排布：
        <Radio.Group
          value={inline}
          onChange={(e) => {
            setInline(e.target.value);
          }}
        >
          <Radio.Button value={true}>true</Radio.Button>
          <Radio.Button value={false}>false</Radio.Button>
        </Radio.Group>
      </div>
      <div style={{ marginBottom: 30 }}>
        hoverable：
        <Radio.Group
          value={hoverable}
          onChange={(e) => {
            setHoverable(e.target.value);
          }}
        >
          <Radio.Button value={true}>true</Radio.Button>
          <Radio.Button value={false}>false</Radio.Button>
        </Radio.Group>
        &nbsp;&nbsp;加载中：
        <Radio.Group
          value={loading}
          onChange={(e) => {
            setLoading(e.target.value);
          }}
        >
          <Radio.Button value={true}>true</Radio.Button>
          <Radio.Button value={false}>false</Radio.Button>
        </Radio.Group>
      </div>
      <MsStatistic
        noCard
        type={type}
        column={2}
        items={[
          {
            key: 1,
            title: '待处理事项',
            align,
            value: 16,
            inline,
            loading,
            hoverable,
          },
          {
            key: 2,
            title: '截止倒计时',
            mode: 'countdown',
            align,
            inline,
            loading,
            format: 'D 天 H 小时 m 分 s 秒',
            value: new Date().getTime() + (26 * 60 + 5) * 60 * 1000,
            hoverable,
          },
        ]}
      />
    </>
  );
}
