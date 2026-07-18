/**
 * title: 基本使用
 * description: 编辑模式下MsGantt组件, 提供任务条的创建，拖动，编辑；通过taskbarContextMenuItems属性配置任务条的右键菜单项；通过dependencyLinkContextMenuItems属性配置依赖线右键菜单项；通过onCreateTaskSchedule、onCreateDependencyLink监听任务条，依赖线的创建事件。
 */

import { uniqueId } from 'lodash-es';
import { useRef, useState } from 'react';
import MsGantt from '@jaytam/ms-gantt';
import type { MsGanttDependencyLink, MsGanttRecord, MsGanttRef } from '@jaytam/ms-gantt';
import { MsGanttModeEnum, MsGanttTimescaleEnum, MSGanttDependencyTypeEnum } from '@jaytam/ms-gantt';
import dayjs from 'dayjs';

function App() {
  const [records, setRecords] = useState<MsGanttRecord[]>([
    {
      id: 1,
      title: '甘特图技术调研',
      startDate: dayjs().subtract(9, 'days').format('YYYY-MM-DD'),
      endDate: dayjs().subtract(6, 'days').format('YYYY-MM-DD'),
    },
    {
      id: 2,
      title: '时间刻度开发',
      startDate: dayjs().subtract(5, 'days').format('YYYY-MM-DD'),
      endDate: dayjs().subtract(3, 'days').format('YYYY-MM-DD'),
    },
    {
      id: 3,
      title: '月视图开发',
      startDate: dayjs().subtract(2, 'days').format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
    },
    {
      id: 4,
      title: '季视图开发',
      startDate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
      endDate: dayjs().add(3, 'days').format('YYYY-MM-DD'),
    },
    {
      id: 5,
      title: '年视图开发',
      startDate: dayjs().add(4, 'days').format('YYYY-MM-DD'),
      endDate: dayjs().add(6, 'days').format('YYYY-MM-DD'),
    },
    {
      id: 6,
      title: '编辑模式开发',
      startDate: dayjs().add(7, 'days').format('YYYY-MM-DD'),
      endDate: dayjs().add(10, 'days').format('YYYY-MM-DD'),
    },
  ]);
  const [dependencyLinks, setDependencyLinks] = useState<MsGanttDependencyLink[]>([
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
    {
      type: MSGanttDependencyTypeEnum.FinishToStart,
      linkedFromTaskKey: 4,
      linkedToTaskKey: 5,
    },
    {
      type: MSGanttDependencyTypeEnum.FinishToStart,
      linkedFromTaskKey: 5,
      linkedToTaskKey: 6,
    },
  ]);

  const ganttRef = useRef<MsGanttRef | null>(null);

  const taskbarContextMenuItems = [
    {
      key: 'edit',
      label: '编辑任务',
      onClick: (event: any) => {
        const { record } = event;
        const newRecords = records.map((item) => {
          if (item.id === record.id) {
            return {
              ...item,
              title: item.title + '-EDITED',
            };
          }
          return item;
        });
        setRecords(newRecords);
      },
    },
    {
      key: 'delete',
      label: '删除任务',
      onClick: (event: any) => {
        const newRecords = records.filter((item) => item.id !== event.record.id);
        setRecords(newRecords);
      },
    },
  ];

  const dependencyLinkContextMenuItems = [
    {
      key: 'deleteDependencyLink',
      label: '删除依赖线',
      onClick: (event: any) => {
        const { type, linkedFromTaskKey, linkedToTaskKey } = event.link;

        const newDependencyLinks = dependencyLinks.filter((item) => {
          if (
            item.type === type &&
            item.linkedToTaskKey === linkedToTaskKey &&
            item.linkedFromTaskKey === linkedFromTaskKey
          ) {
            return false;
          }

          return true;
        });
        setDependencyLinks(newDependencyLinks);
      },
    },
  ];

  const handleCreateDependencyLink = (event: any) => {
    const { linkedFromTaskKey, linkedToTaskKey, type } = event.link;

    if (!linkedFromTaskKey || !linkedToTaskKey || !type) {
      return;
    }

    setDependencyLinks((dependencyLinks) => {
      return [
        ...dependencyLinks,
        {
          type,
          linkedToTaskKey,
          linkedFromTaskKey,
        },
      ];
    });
  };

  const handleCreateTaskSchedule = (event: any) => {
    const { record } = event;

    setRecords((records) => {
      return [
        ...records,
        {
          id: uniqueId(),
          title: '新创建任务',
          endDate: record.endDate,
          startDate: record.startDate,
        },
      ];
    });
  };

  return (
    <div>
      <div style={{ width: '100%', height: '350px' }}>
        <MsGantt
          ref={ganttRef}
          records={records}
          maxDate="2025-07-31"
          minDate="2025-04-01"
          mode={MsGanttModeEnum.Edit}
          taskBarBackgroundColor="#006EFF"
          dependencyLinks={dependencyLinks}
          timescale={MsGanttTimescaleEnum.Month}
          taskbarContextMenuItems={taskbarContextMenuItems}
          dependencyLinkContextMenuItems={dependencyLinkContextMenuItems}
          onCreateTaskSchedule={handleCreateTaskSchedule}
          onCreateDependencyLink={handleCreateDependencyLink}
        />
      </div>
    </div>
  );
}

export default App;
