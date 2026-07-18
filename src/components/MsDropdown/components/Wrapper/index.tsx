import { InfoCircleOutlined } from '@ant-design/icons';
import type { PopconfirmProps } from 'antd';
import { Dropdown, Popconfirm } from 'antd';
import type { MenuItemType } from 'antd/es/menu/hooks/useItems';
import cls from 'classnames';
import type { MenuClickEventHandler } from 'rc-menu/lib/interface';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import type { MsDropDownButtonProps, MsDropDownCommonProps } from '../../types';
import './index.less';
import { replaceMessage, useLocale } from '@jaytam/antd-ms/locale';

const MsDropdownWrapper: React.FC<
  (MsDropDownCommonProps | MsDropDownButtonProps) & {
    _isButton?: boolean;
    renderChildren?: (v: { open: boolean }) => React.ReactNode;
  }
> = ({
  _isButton = false,
  children,
  className,
  menu,
  disabled,
  overlayClassName,
  renderChildren,
  popconfirm,
  open,
  onOpenChange,
  ...props
}) => {
  const [innerOpen, setInnerOpen] = useState(open);
  const [popConfirmOpen, setPopConfirmOpen] = useState(false);
  const [menuClickInfo, setMenuClickInfo] = useState<
    Parameters<MenuClickEventHandler>[0] | undefined
  >();

  const { currentLocale, globalLocale } = useLocale('MsDropdown');

  const selectInfo = useMemo(() => {
    if (menuClickInfo?.key) {
      return menu?.items?.find((i) => i?.key === menuClickInfo?.key);
    }
  }, [menu?.items, menuClickInfo?.key]);

  const innerPopConfirmProps: PopconfirmProps = useMemo(() => {
    if (!popconfirm) {
      return { title: '' };
    }

    let title: ReactNode = selectInfo
      ? replaceMessage(currentLocale.confirmItem, {
          label: (selectInfo as MenuItemType)?.label as string,
        })
      : currentLocale.confirmThis;
    const defaultProps = {
      title,
      icon: <InfoCircleOutlined />,
      okText: globalLocale.ok,
      placement: 'bottom' as const,
      cancelText: globalLocale.cancel,
    };
    if (popconfirm === true) {
      return defaultProps;
    }
    if (typeof popconfirm?.title === 'function' && selectInfo) {
      title = popconfirm?.title(selectInfo as MenuItemType);
    }
    if (typeof popconfirm?.title === 'string') {
      title = popconfirm?.title;
    }
    return {
      ...defaultProps,
      ...popconfirm,
      title,
    };
  }, [popconfirm, selectInfo, currentLocale, globalLocale]);

  const renderDom = renderChildren
    ? renderChildren?.({ open: innerOpen || popConfirmOpen })
    : children;

  const handleOpenChange = (v: boolean) => {
    if (popConfirmOpen) {
      return;
    }
    setInnerOpen(v);
    onOpenChange?.(v);
  };

  const handlePopConfirm = () => {
    setPopConfirmOpen(false);
    if (menuClickInfo) {
      menu?.onClick?.(menuClickInfo);
    }
  };

  const handlePopCancel = () => {
    setPopConfirmOpen(false);
  };

  const handleMenuClick: MenuClickEventHandler = (info) => {
    setInnerOpen(false);
    if (popconfirm) {
      setMenuClickInfo(info);
      setPopConfirmOpen(true);
    } else {
      menu?.onClick?.(info);
    }
  };

  const Wrapper = _isButton ? Dropdown.Button : Dropdown;

  return (
    <Wrapper
      className={cls(className, 'ms-dropdown')}
      open={open ?? innerOpen}
      disabled={disabled}
      menu={{ ...menu, onClick: handleMenuClick }}
      onOpenChange={handleOpenChange}
      overlayClassName={cls(overlayClassName, 'ms-dropdown-overlay')}
      {...props}
    >
      {popconfirm ? (
        <Popconfirm
          onConfirm={handlePopConfirm}
          onCancel={handlePopCancel}
          open={popConfirmOpen}
          {...innerPopConfirmProps}
          overlayClassName={cls('ms-dropdown-popconfirm', innerPopConfirmProps.className)}
        >
          {renderDom}
        </Popconfirm>
      ) : (
        renderDom
      )}
    </Wrapper>
  );
};

export default MsDropdownWrapper;
