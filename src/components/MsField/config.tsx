/** antd 原生组件 */
import { Button, Col, Form, Row, Space } from 'antd';

/** 组件库项目内置组件 */

import {
  MsAutoComplete,
  MsAvatar,
  MsCascader,
  MsCheckbox,
  MsCollapse,
  MsDate,
  MsDateRange,
  MsDigit,
  MsEmptyField,
  MsFormList,
  MsFormTable,
  MsFormTabs,
  MsGroup,
  MsImage,
  MsInputNumber,
  MsInputSearch,
  MsIp,
  MsPaginationSelect,
  MsPassword,
  MsPresetResourceTags,
  MsProgress,
  MsRadio,
  MsRate,
  MsResourceGroup,
  MsResourceType,
  MsRulesConfig,
  MsSelect,
  MsSwitch,
  MsText,
  MsTextArea,
  MsTime,
  MsTimeRange,
  MsTreeSelect,
  MsUpload,
  MsUser,
  MsUserGroup,
  MsUserPopover,
} from '../../fields';
/**
 * MsResourceTags 同时导出组件和方法（如：mergeResourceRequest）会被摇树优化剔掉 config 中的 MsResourceTags 组件，所以这里只引入实际的组件
 * 具体原因不清楚，跟下面情况有关：
 * 1. MsResourceTags 依赖 MsForm
 * 2. 在项目中使用 MsResourceTags.mergeResourceRequest
 */
import MsResourceTags from '../../fields/MsResourceTags/ResourceTags';

/** 组件懒加载组件，由于组件体积过大 */
import type MsCodeEditorLazy from '../../fields/MsCodeEditor';
import type MsDiffEditorLazy from '../../fields/MsDiffEditor';
import type MsPartUploadLazy from '../../fields/MsPartUpload';
import type MsRichTextLazy from '../../fields/MsRichText';

/** 组件库内置类型，不要暴露给用户 */
export type InnerComponentMap = {
  space: typeof Space;
  col: typeof Col;
  row: typeof Row;
  button: typeof Button;
  formItem: typeof Form.Item;
  form: typeof Form;
};

/** 懒加载类型 */
export type LazyComponentMap = {
  codeEditor: typeof MsCodeEditorLazy;
  diffEditor: typeof MsDiffEditorLazy;
  partUpload: typeof MsPartUploadLazy;
  richText: typeof MsRichTextLazy;
};

/** 输入类型 */
type InputComponentMap = {
  password: typeof MsPassword;
  textArea: typeof MsTextArea;
  text: typeof MsText;
  digit: typeof MsDigit;
  number: typeof MsInputNumber;
  search: typeof MsInputSearch;
  ip: typeof MsIp;
};

/** 选择类型 */
export type SelectComponentMap = {
  select: typeof MsSelect;
  paginationSelect: typeof MsPaginationSelect;
  treeSelect: typeof MsTreeSelect;
  checkbox: typeof MsCheckbox;
  cascader: typeof MsCascader;
  switch: typeof MsSwitch;
  radio: typeof MsRadio;
  upload: typeof MsUpload;
  autoComplete: typeof MsAutoComplete;
};

/** 时间类型 */
type TimeComponentMap = {
  date: typeof MsDate;
  dateRange: typeof MsDateRange;
  time: typeof MsTime;
  // dateTime 兼容 time
  dateTime: typeof MsTime;
  timeRange: typeof MsTimeRange;
};

/** 列表类型 */
export type ListComponentMap = {
  formList: typeof MsFormList;
  formTable: typeof MsFormTable;
  formTabs: typeof MsFormTabs;
  rulesConfig: typeof MsRulesConfig;
};

/** 分组类型 */
type GroupComponentMap = {
  group: typeof MsGroup;
  collapse: typeof MsCollapse;
};

/** 展示类型 */
type ShowComponentMap = {
  empty: typeof MsEmptyField;
  rate: typeof MsRate;
  progress: typeof MsProgress;
  avatar: typeof MsAvatar;
  image: typeof MsImage;
};

/** 业务类型 */
export type BusinessComponentMap = {
  resourceTags: typeof MsResourceTags;
  presetResourceTags: typeof MsPresetResourceTags;
  user: typeof MsUser;
  userGroup: typeof MsUserGroup;
  userPopover: typeof MsUserPopover;
  resourceGroup: typeof MsResourceGroup;
  resourceType: typeof MsResourceType;
};

/** 所有字段组件的类型对象 */
export type ComponentsMap = InnerComponentMap &
  InputComponentMap &
  SelectComponentMap &
  TimeComponentMap &
  ListComponentMap &
  GroupComponentMap &
  ShowComponentMap &
  BusinessComponentMap;

const components: ComponentsMap = {
  empty: MsEmptyField,
  space: Space,
  col: Col,
  row: Row,
  button: Button,
  search: MsInputSearch,
  password: MsPassword,
  textArea: MsTextArea,
  text: MsText,
  digit: MsDigit,
  select: MsSelect,
  paginationSelect: MsPaginationSelect,
  treeSelect: MsTreeSelect,
  checkbox: MsCheckbox,
  rate: MsRate,
  radio: MsRadio,
  progress: MsProgress,
  avatar: MsAvatar,
  switch: MsSwitch,
  image: MsImage,
  cascader: MsCascader,
  formItem: Form.Item,
  form: Form,
  group: MsGroup,
  collapse: MsCollapse,
  formList: MsFormList,
  formTabs: MsFormTabs,
  formTable: MsFormTable,
  date: MsDate,
  dateTime: MsTime,
  dateRange: MsDateRange,
  time: MsTime,
  timeRange: MsTimeRange,
  resourceTags: MsResourceTags,
  presetResourceTags: MsPresetResourceTags,
  upload: MsUpload,
  user: MsUser,
  userGroup: MsUserGroup,
  userPopover: MsUserPopover,
  resourceGroup: MsResourceGroup,
  resourceType: MsResourceType,
  autoComplete: MsAutoComplete,
  number: MsInputNumber,
  ip: MsIp,
  rulesConfig: MsRulesConfig,
};

export default components;
