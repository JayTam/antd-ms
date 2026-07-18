import type { MsTabsProps } from '@jaytam/antd-ms';
import { MsShutOutlined } from '@jaytam/icons';
import { Popconfirm, Typography } from 'antd';

import cls from 'classnames';
import type { ReactNode } from 'react';
import type { FormTabsProps } from '../../types';
import { useLocale } from '@jaytam/antd-ms/locale';

type ArrayElementType<ArrayType> = ArrayType extends (infer ElementType)[] ? ElementType : never;

type BoxTabProps = ArrayElementType<MsTabsProps['items']> & {
  onClick?: any;
  onClickDelete?: any;
  tabsId?: number;
  description?: ReactNode;
  fields?: any;
  listProps?: FormTabsProps;
};

function BoxTab(props: BoxTabProps) {
  const {
    label,
    description,
    tabKey,
    active,
    tabsId,
    onClick,
    onClickDelete,
    fields = [],
    listProps = {},
  } = props;

  const { currentLocale, globalLocale } = useLocale('MsFormTabs');

  const { min = 0 } = listProps;

  return (
    <div
      className={cls('box-tabs-tab', { 'box-tabs-tab-active': active })}
      onClick={onClick}
      role="tab"
      id={`box-tabs-${tabsId}-tab-${tabKey}`}
      aria-controls={`box-tabs-${tabsId}-tabpanel-${tabKey}`}
      tabIndex={0}
      aria-selected={active}
      onKeyUp={(event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
          // @ts-ignore
          document.activeElement?.click?.();
        }
      }}
    >
      <Typography.Text ellipsis className="box-tabs-tab-title">
        {label}
      </Typography.Text>
      {description && <div className="box-tabs-tab-description">{description}</div>}
      <Popconfirm
        title={currentLocale.delete}
        placement="bottom"
        okText={globalLocale.ok}
        cancelText={globalLocale.cancel}
        onConfirm={(event) => {
          event?.stopPropagation();
          onClickDelete?.();
        }}
      >
        {fields.length > min ? (
          <MsShutOutlined
            className="box-tabs-tab-del"
            onClick={(event) => {
              event?.stopPropagation();
            }}
          />
        ) : null}
      </Popconfirm>
    </div>
  );
}

export default BoxTab;
