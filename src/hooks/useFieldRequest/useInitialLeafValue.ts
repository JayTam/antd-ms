import { getPathValueBySingleLeafValue } from '@jaytam/antd-ms/components/MsField/tools/valueInOptions';
import { useValueEnumCache } from '@jaytam/antd-ms/components/MsForm/contexts/enum';
import { useDeepCompareEffect } from 'ahooks';
import { MD5 } from 'crypto-js';
import { isArray, isNil } from 'lodash-es';
import { useRef } from 'react';

/**
 * 使用级联选择器的时候，正常来说是传 ["1", "1-1", "1-1-2"] ，我希望 ["1-1-2"] 或者 "1-1-2" 它能根据枚举自动查找到 ["1", "1-1", "1-1-2"]
 */
function useInitialLeafValue(props: any, options: any) {
  const { fieldProps = {} } = props;
  const { enableFullValueInitializer, multiple, id, value, defaultValue, onChange } = fieldProps;

  /**
   * 字段值，为了兼容 defaultValue 和 column.initialValue 两种设置初始值的方式
   * column.initialValue 本质上就是在初始化时给 value 设了值
   */
  const fieldValue = defaultValue ?? value;

  // 如果有叶子结点值，则缓存此 ID
  const cacheIdRef = useRef(
    enableFullValueInitializer ? `ilf${id}&${MD5(JSON.stringify(fieldValue))}` : undefined,
  );

  const { setValueEnum, getValueEnum } = useValueEnumCache(cacheIdRef.current ?? '');

  // 如果传入了叶子节点的值， 需要回显完整值
  useDeepCompareEffect(() => {
    // 无缓存id，代表未开启功能
    if (!cacheIdRef.current) return;
    // 已完成 fullValueInitializer 初始化
    if (getValueEnum()) return;
    if (isNil(fieldValue) || !options?.length) return;
    let res;
    if (multiple) {
      const valueList: string[] = Array.isArray(fieldValue) ? fieldValue : [fieldValue];
      // 二维数组代表是完整value，跳过
      if (isArray(valueList) && isArray(valueList[0])) return;
      res = valueList.map((item) => getPathValueBySingleLeafValue(item, options));
    } else {
      // 一维数组代表是完整value，跳过
      if (isArray(fieldValue)) return;
      res = getPathValueBySingleLeafValue(fieldValue, options);
    }
    setValueEnum?.({});
    setTimeout(() => onChange?.(res), 0);
  }, [options, fieldValue, multiple]);
}

export default useInitialLeafValue;
