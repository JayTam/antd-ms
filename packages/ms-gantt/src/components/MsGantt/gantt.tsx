import dayjs from 'dayjs';
import { isEmpty } from 'lodash-es';
import { useCallback, useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { useMemoizedFn, useMount, useUnmount } from 'ahooks';
import { VRender, TYPES as GANTT_TYPES, Gantt } from '@visactor/vtable-gantt';
import type { GanttConstructorOptions } from '@visactor/vtable-gantt';
import type { MsGanttContextMenuInfo, MsGanttRef } from './types';
import { MsGanttModeEnum, MsGanttTimescaleEnum, type MsGanttProps } from './types';
import { getGanttMaxDate, getGanttMinDate, getTimeScaleRangeText, getTimeScaleText } from './utils';
import ContextMenu from './components/ContextMenu';
import './index.less';
import {
  ADD_TASK_BAR_ICON,
  BLUE_COLOR,
  GRID_LINE_COLOR,
  TIME_LINT_HEADER_COL_WIDTH,
  TIME_LINT_HEADER_SCALES_RANGE_UNIT,
  TIME_LINT_HEADER_SCALES_UNIT,
} from './constant';

export const MsGantt = forwardRef<MsGanttRef, MsGanttProps>((props, ref) => {
  const {
    mode = MsGanttModeEnum.Read,
    records,
    maxDate,
    minDate,
    timescale = MsGanttTimescaleEnum.Week,
    dependencyLinks,
    taskBarBackgroundColor = BLUE_COLOR,
    showTextOverflowPoptip = true,
    taskbarContextMenuItems,
    dependencyLinkContextMenuItems,
    // 自定义取值函数
    customTaskbarDays,
    customTaskbarTitle,
    // 甘特图原始事件
    onScroll = () => {},
    onMouseEnterTaskBar = () => {},
    onMouseLeaveTaskBar = () => {},
    onClickTaskBar = () => {},
    onContextMenuTaskBar = () => {},
    onChangeDateRange = () => {},
    onCreateTaskSchedule = () => {},
    onCreateDependencyLink = () => {},
    onDeleteDependencyLink = () => {},
    onClickDependencyLinkPoint = () => {},
    onContextMenuDependencyLink = () => {},
  } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const ganttRef = useRef<Gantt | null>(null);
  const onScrollMemoFn = useMemoizedFn(onScroll);
  const onMouseEnterTaskBarMemoFn = useMemoizedFn(onMouseEnterTaskBar);
  const onMouseLeaveTaskBarMemoFn = useMemoizedFn(onMouseLeaveTaskBar);
  const onClickTaskBarMemoFn = useMemoizedFn(onClickTaskBar);
  const onContextMenuTaskBarMemoFn = useMemoizedFn(onContextMenuTaskBar);
  const onChangeDateRangeMemoFn = useMemoizedFn(onChangeDateRange);
  const onCreateTaskScheduleMemoFn = useMemoizedFn(onCreateTaskSchedule);
  const onCreateDependencyLinkMemoFn = useMemoizedFn(onCreateDependencyLink);
  const onDeleteDependencyLinkMemoFn = useMemoizedFn(onDeleteDependencyLink);
  const onClickDependencyLinkPointMemoFn = useMemoizedFn(onClickDependencyLinkPoint);
  const onContextMenuDependencyLinkMemoFn = useMemoizedFn(onContextMenuDependencyLink);

  // 任务条右键菜单状态
  const [taskbarContextMenuInfo, setTaskbarContextMenuInfo] = useState<MsGanttContextMenuInfo>({
    clientX: 0,
    clientY: 0,
    visible: false,
    event: null as any,
  });

  // 依赖线右键菜单状态
  const [dependencyLinkContextMenuInfo, setDependencyLinkContextMenuInfo] =
    useState<MsGanttContextMenuInfo>({
      clientX: 0,
      clientY: 0,
      visible: false,
      event: null as any,
    });

  // 展示任务条右键菜单
  const handleShowTaskbarContextMenu = useCallback((menuInfo: MsGanttContextMenuInfo) => {
    // 隐藏依赖线右键菜单
    setDependencyLinkContextMenuInfo((prev) => ({ ...prev, visible: false }));
    // 展示任务条右键菜单状态
    setTaskbarContextMenuInfo(menuInfo);

    // 添加点击空白处关闭任务条右键菜单的事件监听
    const handleDocumentClick = () => {
      setTaskbarContextMenuInfo((prev) => ({ ...prev, visible: false }));
      document.removeEventListener('click', handleDocumentClick);
    };

    document.addEventListener('click', handleDocumentClick);
  }, []);

  // 展示依赖线右键菜单
  const handleShowDependencyLinkContextMenu = useCallback((menuInfo: MsGanttContextMenuInfo) => {
    // 隐藏任务条右键菜单
    setTaskbarContextMenuInfo((prev) => ({ ...prev, visible: false }));
    // 展示依赖线右键菜单状态
    setDependencyLinkContextMenuInfo(menuInfo);

    // 添加点击空白处关闭依赖线右键菜单的事件监听
    const handleDocumentClick = () => {
      setDependencyLinkContextMenuInfo((prev) => ({ ...prev, visible: false }));
      document.addEventListener('click', handleDocumentClick);
    };

    document.addEventListener('click', handleDocumentClick);
  }, []);

  // 统一管理添加甘特图事件监听
  const addGanttEventListener = () => {
    if (!ganttRef.current) {
      return;
    }

    // 甘特图滚动事件
    ganttRef.current.on(GANTT_TYPES.GANTT_EVENT_TYPE.SCROLL, (event) => {
      onScrollMemoFn?.(event);
    });

    // 鼠标进入任务条事件
    ganttRef.current.on(GANTT_TYPES.GANTT_EVENT_TYPE.MOUSEENTER_TASK_BAR, (event) => {
      onMouseEnterTaskBarMemoFn?.(event);
    });

    // 鼠标离开任务条事件
    ganttRef.current.on(GANTT_TYPES.GANTT_EVENT_TYPE.MOUSELEAVE_TASK_BAR, (event) => {
      onMouseLeaveTaskBarMemoFn?.(event);
    });

    // 任务条点击事件
    ganttRef.current.on(GANTT_TYPES.GANTT_EVENT_TYPE.CLICK_TASK_BAR, (event) => {
      onClickTaskBarMemoFn?.(event);
    });

    // 任务条右键点击事件
    ganttRef.current.on(GANTT_TYPES.GANTT_EVENT_TYPE.CONTEXTMENU_TASK_BAR, (event) => {
      onContextMenuTaskBarMemoFn?.(event);
    });

    // 任务条拖拽事件
    ganttRef.current.on(GANTT_TYPES.GANTT_EVENT_TYPE.CHANGE_DATE_RANGE, (event) => {
      onChangeDateRangeMemoFn?.(event);
    });

    // 任务条创建事件
    ganttRef.current.on(GANTT_TYPES.GANTT_EVENT_TYPE.CREATE_TASK_SCHEDULE, (event) => {
      onCreateTaskScheduleMemoFn?.(event);
    });

    // 依赖线创建事件
    ganttRef.current.on(GANTT_TYPES.GANTT_EVENT_TYPE.CREATE_DEPENDENCY_LINK, (event) => {
      onCreateDependencyLinkMemoFn?.(event);
    });

    // 依赖线删除事件
    ganttRef.current.on(GANTT_TYPES.GANTT_EVENT_TYPE.DELETE_DEPENDENCY_LINK, (event) => {
      onDeleteDependencyLinkMemoFn?.(event);
    });

    // 依赖线连接点点击事件
    ganttRef.current.on(GANTT_TYPES.GANTT_EVENT_TYPE.CLICK_DEPENDENCY_LINK_POINT, (event) => {
      onClickDependencyLinkPointMemoFn?.(event);
    });

    // 依赖线右键点击事件
    ganttRef.current.on(GANTT_TYPES.GANTT_EVENT_TYPE.CONTEXTMENU_DEPENDENCY_LINK, (event) => {
      onContextMenuDependencyLinkMemoFn?.(event);
    });

    // 自定义右键菜单项点击事件 ==> 任务条右键菜单项点击事件
    ganttRef.current.on(GANTT_TYPES.GANTT_EVENT_TYPE.CONTEXTMENU_TASK_BAR, (event) => {
      event.event.preventDefault();
      const { clientX, clientY } = event.federatedEvent;

      // 展示任务条右键菜单
      handleShowTaskbarContextMenu({
        event: event,
        visible: true,
        clientX: clientX,
        clientY: clientY,
      });
    });

    // 自定义右键菜单项点击事件 ==> 依赖线右键菜单项点击事件
    ganttRef.current.on(GANTT_TYPES.GANTT_EVENT_TYPE.CONTEXTMENU_DEPENDENCY_LINK, (event) => {
      event.event.preventDefault();
      const { clientX, clientY } = event.federatedEvent;

      // 展示依赖线右键菜单
      handleShowDependencyLinkContextMenu({
        event: event,
        visible: true,
        clientX: clientX,
        clientY: clientY,
      });
    });
  };

  // 生成甘特图配置
  const generateOption = useCallback(
    (isAutoScrollToMarkLine: boolean = true) => {
      const option: GanttConstructorOptions = {
        records: mode === MsGanttModeEnum.Edit ? [...records, {}] : [...records],
        // 边框及分割线配置
        frame: {
          outerFrameStyle: {
            borderLineWidth: 1,
            borderColor: GRID_LINE_COLOR,
            cornerRadius: 0,
          },
          horizontalSplitLine: {
            lineColor: GRID_LINE_COLOR,
            lineWidth: 1,
          },
          verticalSplitLine: {
            lineColor: GRID_LINE_COLOR,
            lineWidth: 0,
          },
        },
        // 网格配置
        grid: {
          backgroundColor: '#FFF',
          weekendBackgroundColor: '#F7F8FA',
          verticalLine: {
            lineWidth: 1,
            lineColor: GRID_LINE_COLOR,
          },
          horizontalLine: {
            lineWidth: 1,
            lineColor: GRID_LINE_COLOR,
          },
        },
        // 标记线配置
        markLine: [
          {
            content: '',
            position: 'middle',
            scrollToMarkLine: isAutoScrollToMarkLine,
            date: dayjs().format('YYYY-MM-DD'),
            style: { lineWidth: 1, lineColor: BLUE_COLOR },
          },
        ],
        // 左侧任务列表表格配置：组件规范无左侧任务列表表格，所以隐藏
        taskListTable: {
          tableWidth: 'auto',
          columns: [
            {
              width: 0,
              field: 'title',
              title: 'title',
            },
          ],
        },
        // 任务条配置
        taskBar: {
          startDateField: 'startDate',
          endDateField: 'endDate',
          resizable: mode === MsGanttModeEnum.Edit,
          moveable: mode === MsGanttModeEnum.Edit,
          barStyle: {
            width: 24,
            cornerRadius: 4,
            barColor: taskBarBackgroundColor,
          },
          scheduleCreation: {
            customLayout: (args) => {
              const { width, height } = args;
              const { Group, Image } = VRender;

              const container = new Group({
                width,
                height,
                fill: '#E8F6FF',
                // 鼠标悬停展示手型
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              });

              const addIconImage = new Image({
                width: 16,
                height: 16,
                cursor: 'pointer',
                image: ADD_TASK_BAR_ICON,
              });
              container.add(addIconImage);

              return {
                rootContainer: container,
              };
            },
          },
          // 自定义任务条渲染
          customLayout: (args) => {
            const { width, height, taskDays, taskRecord } = args;
            const { Group, Text } = VRender;
            const dayTextWidth = 50;

            // 创建自定义渲染组
            const container = new Group({
              width,
              height,
              cursor: 'move',
              cornerRadius: 4,
              display: 'flex',
              flexWrap: 'nowrap',
              flexDirection: 'row',
              alignItems: 'center',
              fill: taskBarBackgroundColor,
              justifyContent: 'space-between',
            });

            // 创建左侧文本
            const title = customTaskbarTitle?.(taskRecord) || taskRecord.title || '';
            const titleElement = new Text({
              text: title,
              fontSize: 12,
              fill: 'white',
              boundsPadding: [8, 8, 8, 8],
              maxLineWidth: width - dayTextWidth,
              // @ts-ignore
              poptip: { visible: showTextOverflowPoptip },
            });

            // 创建右侧文本
            const days = customTaskbarDays?.(taskRecord) || `${taskDays}天`;
            const daysElement = new Text({
              text: days,
              fontSize: 12,
              fill: 'white',
              boundsPadding: [8, 8, 8, 8],
              maxLineWidth: dayTextWidth,
              // @ts-ignore
              poptip: { visible: showTextOverflowPoptip },
            });

            // 计算文本宽度, 若文本宽度不存在则使用文本长度 * 12
            // const titleWidth = titleElement.clipedWidth || title.length * 12;
            // const daysWidth = daysElement.clipedWidth || days.length * 12;

            container.add(titleElement);
            container.add(daysElement);
            return { rootContainer: container };
          },
        },
        // 时间轴头部配置
        timelineHeader: {
          colWidth: TIME_LINT_HEADER_COL_WIDTH[timescale],
          scales: [
            // 范围刻度
            {
              unit: TIME_LINT_HEADER_SCALES_RANGE_UNIT[timescale],
              step: 1,
              visible: true,
              rowHeight: 32,
              startOfWeek: 'monday',
              customLayout: (args) => {
                const { width, height, startDate } = args;
                const { Group, Text } = VRender;

                // 创建容器
                const container = new Group({
                  width,
                  height,
                  fill: '#FFFFFF',
                  display: 'flex',
                  flexWrap: 'nowrap',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                });

                // 创建时间刻度
                const timeScaleText = new Text({
                  fontSize: 12,
                  fill: '#464F5C',
                  textAlign: 'center',
                  maxLineWidth: width,
                  boundsPadding: [8, 0, 0, 0],
                  text: getTimeScaleRangeText(timescale, startDate),
                });
                container.add(timeScaleText);

                return { rootContainer: container };
              },
            },
            // 单元格刻度
            {
              unit: TIME_LINT_HEADER_SCALES_UNIT[timescale],
              step: 1,
              visible: true,
              rowHeight: 16,
              startOfWeek: 'monday',
              customLayout: (args) => {
                const { width, height, startDate, endDate } = args;

                const { Group, Text } = VRender;

                // 创建容器
                const container = new Group({
                  width,
                  height,
                  fill: '#FFFFFF',
                  display: 'flex',
                  flexWrap: 'nowrap',
                  flexDirection: 'row',
                  justifyContent: 'center',
                });

                // 创建时间刻度
                const timeScaleText = new Text({
                  fontSize: 12,
                  fill: '#464F5C',
                  textAlign: 'center',
                  maxLineWidth: width,
                  boundsPadding: [0, 0, 0, 0],
                  text: getTimeScaleText(timescale, startDate, endDate),
                });
                container.add(timeScaleText);

                return { rootContainer: container };
              },
            },
          ],
        },
        // 滚动条配置
        scrollStyle: {
          width: 4,
          visible: 'scrolling',
          scrollSliderCornerRadius: 4,
          scrollSliderColor: '#C2C8CC',
          scrollRailColor: 'RGBA(246,246,246,0.5)',
        },
        // 依赖配置
        dependency: {
          linkCreatable: mode === MsGanttModeEnum.Edit,
          linkDeletable: mode === MsGanttModeEnum.Edit,
          links: dependencyLinks as any,
          linkLineStyle: {
            lineWidth: 1,
            lineColor: '#78858F',
          },
          linkSelectedLineStyle: {
            lineWidth: 1,
            lineColor: BLUE_COLOR,
          },
        },
        // 事件配置
        eventOptions: {
          preventDefaultContextMenu: true,
        },
        // 头部时间刻度行高
        headerRowHeight: 48,
        // 任务条行高
        rowHeight: 40,
        // 最小日期
        minDate: minDate || getGanttMinDate(timescale, records),
        // 最大日期
        maxDate: maxDate || getGanttMaxDate(timescale, records),
        // 键盘选项, 按下退格键时删除依赖线
        keyboardOptions: {
          deleteLinkOnBack: mode === MsGanttModeEnum.Edit ? true : false,
        },
      };

      return option;
    },
    [
      mode,
      records,
      taskBarBackgroundColor,
      timescale,
      dependencyLinks,
      minDate,
      maxDate,
      customTaskbarTitle,
      showTextOverflowPoptip,
      customTaskbarDays,
    ],
  );

  useMount(() => {
    ganttRef.current = new Gantt(containerRef.current!, generateOption());
    addGanttEventListener();
  });

  useUnmount(() => {
    ganttRef.current?.release();
  });

  useEffect(() => {
    // 添加甘特图事件监听
    ganttRef.current?.updateOption(generateOption(false));
  }, [generateOption, records]);

  useImperativeHandle(
    ref,
    (): MsGanttRef => {
      return {
        ganttInstance: ganttRef.current,
        scrollToDate: (date: Date) => {
          ganttRef.current?.scrollToMarkLine(date);
        },
      };
    },

    [],
  );

  return (
    <>
      <div ref={containerRef} className="ms-gantt-container" />
      {/* 任务栏的右键菜单 */}
      {!isEmpty(taskbarContextMenuItems) ? (
        <ContextMenu
          event={taskbarContextMenuInfo.event}
          items={taskbarContextMenuItems || []}
          clientX={taskbarContextMenuInfo.clientX}
          clientY={taskbarContextMenuInfo.clientY}
          visible={taskbarContextMenuInfo.visible}
        />
      ) : null}

      {!isEmpty(dependencyLinkContextMenuItems) ? (
        <ContextMenu
          event={dependencyLinkContextMenuInfo.event}
          items={dependencyLinkContextMenuItems || []}
          clientX={dependencyLinkContextMenuInfo.clientX}
          clientY={dependencyLinkContextMenuInfo.clientY}
          visible={dependencyLinkContextMenuInfo.visible}
        />
      ) : null}
    </>
  );
});

export default MsGantt;
