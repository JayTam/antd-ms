import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useUpdateEffect } from 'ahooks';
import { Radio } from 'antd';
import cls from 'classnames';
import type { Tab } from 'rc-tabs/lib/interface';
import { isValidElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { MsTabsProps } from '../../types';
import './index.less';

const CustomizeTabs = ({
  items,
  max,
  className,
  style,
  destroyInactiveTabPane,
  tabBarExtraContent,
  tabBarStyle,
  activeKey,
  defaultActiveKey,
  onChange,
  radioStep = 1,
  type,
}: MsTabsProps) => {
  const [val, setVal] = useState<string | undefined>(activeKey || defaultActiveKey);
  const options = useMemo(() => items?.map((i) => ({ ...i, value: i.key })), [items]);
  const [startIndex, setStartIndex] = useState(0);
  const radioRef = useRef<HTMLDivElement | null>(null);
  const [childrenList, setChildrenList] = useState<Tab[]>([]);
  const [totalWidth, setTotalWidth] = useState<number>(1000);
  const [selectedItem, setSelectedItem] = useState<Tab | undefined>();
  const [widthInfo, setWidthInfo] = useState<{ left: number; width: number } | undefined>();
  const indexMap = useRef<Record<string, { left: number; width: number }>>({});
  const canPrev = startIndex > 0;

  //实现类似antd的效果默认选中第一个
  const innerVal = val === undefined ? items?.[0]?.key : val;

  const formattedTabBarExtraContent = useMemo(() => {
    if (!tabBarExtraContent) {
      return undefined;
    }
    if (isValidElement(tabBarExtraContent)) {
      return {
        right: tabBarExtraContent,
      };
    }
    return tabBarExtraContent as { left?: React.ReactNode; right?: React.ReactNode };
  }, [tabBarExtraContent]);

  /** 当前是否显示左滑右滑 */
  const isMaxMode = !!max && !!options?.length && options.length > max;

  const canNext = useMemo(() => {
    if (!options?.length || !max) {
      return false;
    }
    return startIndex < options.length - max;
  }, [options, max, startIndex]);

  const getWidthInfo = useCallback(() => {
    if (max && options && isMaxMode) {
      const lastIndex = Math.min(startIndex + max - 1, options.length - 1);
      const startInfo = indexMap.current[startIndex];
      const lastInfo = indexMap.current[lastIndex];
      if (startInfo && lastInfo) {
        return setWidthInfo({
          left: startInfo.left,
          width: lastInfo.left - startInfo.left + lastInfo.width,
        });
      }
    }
  }, [max, options, startIndex, isMaxMode]);

  const handleChange = (v: string) => {
    setVal(v);
    onChange?.(v);
  };

  const handleNext = () => {
    if (!canNext) {
      return;
    }
    const nextStartIndex = startIndex + radioStep;
    setStartIndex(Math.min(nextStartIndex, options!.length - max!));
  };

  const handlePrev = () => {
    if (!canPrev) {
      return;
    }
    const nextStartIndex = startIndex - radioStep;
    setStartIndex(Math.max(nextStartIndex, 0));
  };

  useUpdateEffect(() => {
    setVal(activeKey);
  }, [activeKey]);

  useEffect(() => {
    if (radioRef.current && isMaxMode) {
      setTotalWidth(radioRef.current.offsetWidth);
      const labels = radioRef.current.children;
      let left = 0;
      for (let i = 0; i < labels.length; i++) {
        const label = labels.item(i) as HTMLLabelElement;
        if (label) {
          const width = label.offsetWidth;
          indexMap.current[String(i)] = {
            left,
            width,
          };
          left += width;
        }
      }
      getWidthInfo();
    }
  }, [isMaxMode, getWidthInfo]);

  useEffect(() => {
    if (items?.length && innerVal) {
      const item = items.find((i) => i.key === innerVal);
      setSelectedItem(item);
      if (item && !destroyInactiveTabPane) {
        setChildrenList((prev) => {
          const cachedIndex = prev.findIndex((i) => i.key === item.key);
          //修改
          if (cachedIndex !== -1) {
            const clonedPrev = [...prev];
            clonedPrev[cachedIndex] = item;
            return clonedPrev;
            //新增
          } else {
            return [...prev, item];
          }
        });
      }
    }
  }, [innerVal, destroyInactiveTabPane, selectedItem, items]);

  const getTabDom = () => {
    const commonCls = 'ms-customize-tabs-content';

    const commonProps = formattedTabBarExtraContent ? {} : { style: tabBarStyle };

    if (type === 'radio' && isMaxMode) {
      return (
        <div {...commonProps} className={cls('ms-tabs-radio-wrap', 'ms-tabs-radio-max', commonCls)}>
          <div
            className={cls('radio-arrow', 'radio-left', {
              ['radio-disable']: !canPrev,
            })}
            onClick={handlePrev}
          >
            <LeftOutlined />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <div
              style={{
                width: widthInfo?.width ? widthInfo?.width + 1 : undefined,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: totalWidth,
                  transition: 'all 0.2s',
                  transform: widthInfo?.left ? `translateX(${-widthInfo?.left + 1}px)` : undefined,
                }}
              >
                <Radio.Group
                  ref={radioRef}
                  className="ms-tabs-radio"
                  value={innerVal}
                  defaultValue={defaultActiveKey}
                  options={options}
                  optionType="button"
                  onChange={(e) => handleChange(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div
            className={cls('radio-arrow', 'radio-right', {
              ['radio-disable']: !canNext,
            })}
            onClick={handleNext}
          >
            <RightOutlined />
          </div>
        </div>
      );
    }
    if (type === 'radio' && !isMaxMode) {
      return (
        <div {...commonProps} className={cls('ms-tabs-radio-wrap', commonCls)}>
          <Radio.Group
            ref={radioRef}
            className="ms-tabs-radio"
            value={innerVal}
            defaultValue={defaultActiveKey}
            options={options}
            optionType="button"
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      );
    }
    if (type === 'text') {
      return (
        <div {...commonProps} className={cls('ms-text-tabs', commonCls)}>
          {items?.map((i) => (
            <div
              className={cls('ms-text-tabs-item', {
                ['ms-tabs-selected']: i.key === innerVal,
              })}
              key={i.key}
              onClick={() => handleChange(i.key)}
            >
              {i.label}
            </div>
          ))}
        </div>
      );
    }
    if (type === 'text-block') {
      return (
        <div {...commonProps} className={cls(commonCls)}>
          <div className="ms-text-block-tabs">
            {items?.map((i) => (
              <div
                className={cls('ms-text-block-tabs-item', {
                  ['ms-tabs-selected']: i.key === innerVal,
                })}
                key={i.key}
                onClick={() => handleChange(i.key)}
              >
                {i.label}
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className={cls('ms-customize-tabs', className)} style={style}>
      {formattedTabBarExtraContent ? (
        <div className="ms-customize-tabs-extra-wrap" style={tabBarStyle}>
          <div className="ms-customize-tabs-extra-left">{formattedTabBarExtraContent.left}</div>
          {getTabDom()}
          <div className="ms-customize-tabs-extra-right">{formattedTabBarExtraContent.right}</div>
        </div>
      ) : (
        getTabDom()
      )}

      {!destroyInactiveTabPane &&
        childrenList.map((i) =>
          i.children ? (
            <div key={i.key} style={{ display: i.key === selectedItem?.key ? undefined : 'none' }}>
              {i.children}
            </div>
          ) : null,
        )}

      {destroyInactiveTabPane && selectedItem?.children && <div>{selectedItem?.children}</div>}
    </div>
  );
};

export default CustomizeTabs;
