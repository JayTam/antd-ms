import type { TYPES, Gantt } from '@visactor/vtable-gantt';

/** 甘特图事件类型别名 */
export type MsGanttEventMap = TYPES.TableEventHandlersEventArgumentMap;
/** 依赖项连接枚举别名 */
export enum MSGanttDependencyTypeEnum {
  FinishToStart = 'finish_to_start',
  StartToStart = 'start_to_start',
  FinishToFinish = 'finish_to_finish',
  StartToFinish = 'start_to_finish',
}

/** 甘特图记录 */
export interface MsGanttRecord {
  /** ID */
  id: string | number;
  /** 名称 */
  title: string;
  /** 开始时间 */
  startDate: string;
  /** 结束时间 */
  endDate: string;
  /** 其他任意字段 */
  [key: string]: any;
}

/** 甘特图依赖链接 */
export interface MsGanttDependencyLink {
  linkedToTaskKey: MsGanttRecord['id'];
  linkedFromTaskKey: MsGanttRecord['id'];
  type: 'finish_to_start' | 'start_to_start' | 'finish_to_finish' | 'start_to_finish';
}

/** 甘特图时间刻度枚举 */
export enum MsGanttTimescaleEnum {
  Week = 'week',
  Month = 'month',
  Quarter = 'quarter',
  Year = 'year',
}

/** 甘特图模式枚举 */
export enum MsGanttModeEnum {
  /** 编辑模式 */
  Edit = 'edit',
  /** 只读模式 */
  Read = 'read',
}

/** 甘特图右键菜单状态 */
export interface MsGanttContextMenuInfo {
  clientX: number;
  clientY: number;
  visible: boolean;
  /** 事件对象 */
  event: any;
}

export interface MsGanttRef {
  /** 甘特图实例 */
  ganttInstance: Gantt | null;
  /** 滚动到指定日期 */
  scrollToDate: (date: Date) => void;
}

export interface MsGanttProps {
  /** 甘特图模式 */
  mode?: 'edit' | 'read';
  /** 任务列表 */
  records: MsGanttRecord[];
  /** 最大日期，不传自动计算 */
  maxDate?: string;
  /** 最小日期，不传自动计算 */
  minDate?: string;
  /** 时间刻度 */
  timescale: 'week' | 'month' | 'quarter' | 'year';
  /** 依赖数组 */
  dependencyLinks?: MsGanttDependencyLink[];
  /** 任务条背景色 */
  taskBarBackgroundColor?: string;
  /** 文字溢出时是否展示poptip */
  showTextOverflowPoptip?: boolean;
  /** 任务条右键菜单项 */
  taskbarContextMenuItems?: {
    key: string;
    label: string;
    onClick: (event: MsGanttEventMap['contextmenu_task_bar']) => void;
  }[];
  /** 依赖线右键菜单项 */
  dependencyLinkContextMenuItems?: {
    key: string;
    label: string;
    onClick: (event: MsGanttEventMap['contextmenu_dependency_link']) => void;
  }[];
  /** 自定义任务条天数 */
  customTaskbarDays?: (record: MsGanttRecord) => string;
  /** 自定义任务条标题 */
  customTaskbarTitle?: (record: MsGanttRecord) => string;
  // 甘特图事原始件
  /** 甘特图滚动事件 */
  onScroll?: (event: MsGanttEventMap['scroll']) => void;
  /** 鼠标进入任务条事件 */
  onMouseEnterTaskBar?: (event: MsGanttEventMap['mouseenter_task_bar']) => void;
  /** 鼠标离开任务条事件 */
  onMouseLeaveTaskBar?: (event: MsGanttEventMap['mouseleave_task_bar']) => void;
  /** 点击任务条事件 */
  onClickTaskBar?: (event: MsGanttEventMap['click_task_bar']) => void;
  /** 任务条右键点击事件 */
  onContextMenuTaskBar?: (event: MsGanttEventMap['contextmenu_task_bar']) => void;
  /** 拖拽任务条事件 */
  onChangeDateRange?: (event: MsGanttEventMap['change_date_range']) => void;
  /** 任务条创建事件 */
  onCreateTaskSchedule?: (event: MsGanttEventMap['create_task_schedule']) => void;
  /** 依赖线创建事件 */
  onCreateDependencyLink?: (event: MsGanttEventMap['create_dependency_link']) => void;
  /** 依赖线删除事件 */
  onDeleteDependencyLink?: (event: MsGanttEventMap['delete_dependency_link']) => void;
  /** 依赖线连接点点击事件 */
  onClickDependencyLinkPoint?: (event: MsGanttEventMap['click_dependency_link_point']) => void;
  /** 依赖线右键点击事件 */
  onContextMenuDependencyLink?: (event: MsGanttEventMap['contextmenu_dependency_link']) => void;
}
