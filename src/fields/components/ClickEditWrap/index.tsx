import { CaretDownOutlined } from '@ant-design/icons';
import type { TooltipProps } from 'antd';
import cls from 'classnames';
import React, { cloneElement, isValidElement, useState } from 'react';
import TooltipWrap from '../TooltipWrap';
import './index.less';

type ClickEditWrapProps = {
  /** text: 文本模式， select选择模式，选择模式和文本模式交互有所不同 */
  mode?: 'text' | 'select';
  /** 是否超长省略 */
  ellipsis?: boolean;
  readOnly?: boolean;
  toolTip?: TooltipProps | boolean;
  readDom?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

const ClickEditWrap = ({
  readDom,
  children,
  mode,
  className,
  readOnly,
  toolTip = true,
  ellipsis = true,
}: ClickEditWrapProps) => {
  const isSelect = mode === 'select';
  const [inEdit, setInEdit] = useState(false);

  const newChildren = isValidElement(children)
    ? cloneElement(children as any, {
        disable: inEdit,
        onBlur: (...args) => {
          children.props?.onBlur?.(...args);
          setInEdit(false);
        },
      })
    : children;

  const handleClick = () => {
    if (readOnly) {
      return;
    }
    setInEdit(true);
  };

  const showTooltip = !!toolTip;

  if (isSelect) {
    return inEdit ? (
      <div className={cls('ms-click-edit-select-wrap', className)}>{newChildren}</div>
    ) : (
      <TooltipWrap showTooltip={showTooltip} title={readDom}>
        <div onClick={handleClick} className={cls('ms-click-edit-wrap', className)}>
          <div className={'ms-click-edit-select'}>
            <span className={cls({ 'ms-select-text-ellipsis': ellipsis })}>{readDom || '--'}</span>
            {!readOnly && (
              <span className="select-icon">
                <CaretDownOutlined />
              </span>
            )}
          </div>
        </div>
      </TooltipWrap>
    );
  }

  return (
    <div
      onClick={handleClick}
      className={cls('ms-click-edit-wrap', className, {
        ['ms-click-in-edit-wrap']: inEdit,
      })}
    >
      {inEdit ? (
        newChildren
      ) : (
        <TooltipWrap showTooltip={showTooltip} title={readDom}>
          <div className={'ms-click-edit-text'}>{readDom || '--'}</div>
        </TooltipWrap>
      )}
    </div>
  );
};

export default ClickEditWrap;
