/**
 * title: 切换时间刻度
 * description: 通过改变timescale属性来切换时间刻度；编辑模式下禁止任务条拖动、创建；禁止依赖线删除
 */
import { useRef, useState } from 'react';
import type { MsGanttRef } from '@jaytam/ms-gantt';
import { MsActions } from '@jaytam/antd-ms';
import { MsGanttTimescaleEnum, MSGanttDependencyTypeEnum } from '@jaytam/ms-gantt';
import MsGantt from '@jaytam/ms-gantt';
import dayjs from 'dayjs';

function App() {
  const ganttRef = useRef<MsGanttRef | null>(null);
  const [timescale, setTimeScale] = useState<MsGanttTimescaleEnum>(MsGanttTimescaleEnum.Week);

  const records = [
    {
      id: 1,
      title: '开发',
      startDate: dayjs().subtract(5, 'days').format('YYYY-MM-DD'),
      endDate: dayjs().subtract(3, 'days').format('YYYY-MM-DD'),
    },
    {
      id: 2,
      title: '联调',
      startDate: dayjs().subtract(2, 'days').format('YYYY-MM-DD'),
      endDate: dayjs().subtract(1, 'days').format('YYYY-MM-DD'),
    },
    {
      id: 3,
      title: '测试',
      startDate: dayjs().format('YYYY-MM-DD'),
      endDate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
    },
    {
      id: 4,
      title: '上线',
      startDate: dayjs().add(3, 'days').format('YYYY-MM-DD'),
      endDate: dayjs().add(3, 'days').format('YYYY-MM-DD'),
    },
  ];
  const dependencyLinks = [
    {
      type: MSGanttDependencyTypeEnum.FinishToStart,
      linkedFromTaskKey: 1,
      linkedToTaskKey: 2,
    },
    {
      type: MSGanttDependencyTypeEnum.FinishToStart,
      linkedFromTaskKey: 2,
      linkedToTaskKey: 3,
    },
    {
      type: MSGanttDependencyTypeEnum.FinishToStart,
      linkedFromTaskKey: 3,
      linkedToTaskKey: 4,
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 4 }}>
        <MsActions
          limit={4}
          actionsType="text"
          items={[
            {
              label: '周',
              onClick: () => {
                setTimeScale(MsGanttTimescaleEnum.Week);
                // 更新了时间刻度需要重新渲染gantt，需要等甘特图渲染完毕之后
                setTimeout(() => ganttRef.current?.scrollToDate(new Date()), 0);
              },
            },
            {
              label: '月',
              onClick: () => {
                setTimeScale(MsGanttTimescaleEnum.Month);
                setTimeout(() => ganttRef.current?.scrollToDate(new Date()), 0);
              },
            },
            {
              label: '季',
              onClick: () => {
                setTimeScale(MsGanttTimescaleEnum.Quarter);
                setTimeout(() => ganttRef.current?.scrollToDate(new Date()), 0);
              },
            },
            {
              label: '年',
              onClick: () => {
                setTimeScale(MsGanttTimescaleEnum.Year);
                setTimeout(() => ganttRef.current?.scrollToDate(new Date()), 0);
              },
            },
          ]}
        />
      </div>
      <div style={{ width: '100%', height: '220px' }}>
        <MsGantt
          mode="read"
          ref={ganttRef}
          records={records}
          timescale={timescale}
          taskBarBackgroundColor="#006EFF"
          dependencyLinks={dependencyLinks}
        />
      </div>
    </div>
  );
}

export default App;
