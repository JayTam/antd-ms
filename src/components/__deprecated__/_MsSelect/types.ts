export interface Dick {
  lable: string;
  value: string | number;
}
export interface MsSelectProps {
  /**
   * 可以是一个Promise,也可以是一个function函数,也可以是[{lable:'',value:''}]格式数组
   */
  url?: Promise<any> | Function | Dick[];
  /**
   * url的params传参 当url=Function 可用
   */
  params?: Object;
  /**
   * 获取到数据后钩子，可以进行过滤，重新处理数据 *需要返回新的数据回来 不返回新数据还是用之前的数据
   * @default function(e)
   */
  transform?: Function;
  /**
   * 有其他依赖时，依赖改变，是否清空当前值
   * @default false
   */
  clearValue?: boolean;
  /**
   * 下拉框类型 (注：单独使用MsSelect组件有效)
   * @default select
   */
  selectType?: 'select' | 'radio' | 'checkbox' | 'cascader';
  /**
   * 下拉框开右侧刷新按钮；(注：只对selectType=select有效)
   * @default false
   */
  isRefresh?: boolean;
  /**
   * 设置 Select 的模式为多选或标签
   */
  mode?: 'multiple' | 'tags';
  /**
   * ant Select其他属性
   */
  [name: string]: any;
}
