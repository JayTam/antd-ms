import { useControllableValue } from 'ahooks';
import { ConfigProvider } from 'antd';
import cls from 'classnames';
import type { Ref } from 'react';
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import CidrSelect from './components/CidrSelect';
import IpCell from './components/IpCell';
import type { IpProps, MsIpRef } from './types';
import {
  cidrPrefixToBinary,
  generateIpCellRange,
  parseIpV4,
  stringifyIpV4,
  validIpForCidr,
} from './utils';

import './index.less';
import IpSelectCell from './components/IpSelectCell';

const ipV4Config = [{ dot: true }, { dot: true }, { dot: true }, { dot: false }];

const Ip = forwardRef((props: IpProps, ref: Ref<MsIpRef>) => {
  const {
    className,
    style,
    cidrType,
    cidrPrefixRange: cidrRange,
    ipInputs = [],
    ipSelects = [],
    cidrPrefixSelectProps,
  } = props;

  const context = useContext(ConfigProvider.ConfigContext);
  const prefixCls = context.getPrefixCls();

  const ipRefs = useRef<MsIpRef['ips']>([]);

  const [value, onChange] = useControllableValue<string>(props);

  const [ipList, cidrPrefix] = useMemo(() => parseIpV4(value), [value]);

  const [focused, setFocused] = useState(false);

  /** 由 cidr 前缀生成的二进制掩码 */
  const subnetMaskBinaryList = cidrPrefixToBinary(cidrPrefix);

  /**
   * 其中一个 IpCell 值变更引起整个 ip 组件值变更
   * @param changeValue
   * @param index
   */
  function handleIpCellChange(changeValue: string, index: number) {
    const [ipList, cidr] = parseIpV4(value);
    ipList[index] = changeValue;
    onChange?.(stringifyIpV4(ipList, cidr));
  }

  /**
   * ip 地址粘贴
   * @param event
   * @param index
   */
  function handleIpCellPaste(event: React.ClipboardEvent<HTMLInputElement>, index: number) {
    event.preventDefault();
    const pasteText = event.clipboardData.getData('text').replace(' ', '');
    let pasteIp;

    const [ip, cidr] = pasteText.split('/');

    pasteIp = ip
      .split('.')
      .slice(0, 4 - index)
      .join('.');

    if (cidrType === 'segment') {
      pasteIp = pasteIp + '/' + cidr;
    }

    const ipValue = '.'.repeat(index) + pasteIp;
    onChange?.(ipValue);
    ipRefs.current[index].focus();
  }

  /**
   * cidr 值变更引起整个 ip 组件值变更
   * @param cidrNumber
   */
  function handleCidrChange(cidrNumber: number) {
    const [ipList] = parseIpV4(value);
    onChange?.(stringifyIpV4(ipList, cidrNumber));
  }

  /**
   * 规范化 ip 值，不同 cidr 的合法范围不一样
   * 若不在合法范围则重新格式化并触发 onChange 修改
   */
  useEffect(() => {
    if (typeof cidrPrefix === 'undefined') return;
    if (cidrType !== 'segment') return;
    const formatValue = validIpForCidr(value, cidrPrefix);
    onChange?.(formatValue);
  }, [cidrPrefix, cidrType]);

  useImperativeHandle(ref, () => ({
    focus(options) {
      ipRefs.current[0].focus(options);
    },
    blur() {
      ipRefs.current.forEach((ipRef) => {
        ipRef.blur();
      });
    },
    ips: ipRefs.current.map((ipRef) => ipRef),
  }));

  return (
    <span
      className={cls(
        'ms-ip',
        prefixCls + '-input-affix-wrapper',
        focused ? prefixCls + '-input-affix-wrapper-focused' : undefined,
        className,
      )}
      style={style}
    >
      {ipV4Config.map((config, index) => {
        const ipCellValue = ipList?.[index];
        const ipCellValidValueRange =
          cidrType === 'segment' ? generateIpCellRange(subnetMaskBinaryList[index]) : undefined;

        if (ipSelects[index]) {
          return (
            <IpSelectCell
              {...ipSelects[index]}
              key={index}
              ref={(instance) => {
                if (instance && ipRefs.current) {
                  // @ts-ignore
                  ipRefs.current[index] = instance;
                }
              }}
              className={cidrType ? 'ip-cell-with-mask' : 'ip-cell'}
              dot={config.dot}
              validValueRange={ipCellValidValueRange}
              value={ipCellValue}
              onChange={(changeValue) => {
                handleIpCellChange(changeValue, index);
              }}
              onFocus={() => {
                setFocused(true);
              }}
              onBlur={() => {
                setFocused(false);
              }}
            />
          );
        }

        return (
          <IpCell
            {...ipInputs[index]}
            key={index}
            ref={(instance) => {
              if (instance && ipRefs.current) {
                ipRefs.current[index] = instance;
              }
            }}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
            className={cidrType ? 'ip-cell-with-mask' : 'ip-cell'}
            dot={config.dot}
            value={ipCellValue}
            onChange={(changeValue) => {
              handleIpCellChange(changeValue, index);
            }}
            validValueRange={ipCellValidValueRange ?? ipInputs[index]?.validValueRange}
            onPaste={(event) => {
              handleIpCellPaste(event, index);
            }}
            onPrev={() => {
              const prevIndex = index - 1;
              ipRefs.current[prevIndex]?.focus();
              ipRefs.current[prevIndex]?.setSelectionRange?.(0, 3);
            }}
            onNext={() => {
              const nextIndex = index + 1;
              ipRefs.current[nextIndex]?.focus();
              ipRefs.current[nextIndex]?.setSelectionRange(0, 3);
            }}
          />
        );
      })}

      <CidrSelect
        {...cidrPrefixSelectProps}
        value={cidrPrefix}
        onChange={handleCidrChange}
        cidrType={cidrType}
        cidrPrefixRange={cidrRange}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
      />
    </span>
  );
});

export default Ip;
