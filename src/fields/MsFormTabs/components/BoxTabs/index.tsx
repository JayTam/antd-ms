import type { MsTabsProps } from '@jaytam/antd-ms';
import { useControllableValue, useMount } from 'ahooks';
import BoxTab from './BoxTab';
import { useRef } from 'react';
import type { TabsProps } from 'antd';
import { Col, Row } from 'antd';
import BoxTabpanel from './BoxTabpanel';
import './index.less';
import FormTabsAddButton from '../FormTabsAddButton/index';
import type { FormTabsProps } from '../../types';

export type BoxTabsProps = Omit<MsTabsProps, 'type'> & {
  type?: TabsProps['type'] | 'editable-box';
  editType?: 'box' | 'card';
  fields?: any;
  listProps?: FormTabsProps;
};

/** Tabs 全局ID，用于生成唯一的 tab 和 tabpanel 的 id */
let boxTabsGlobalId = 0;

function BoxTabs(props: BoxTabsProps) {
  const { items, onEdit, fields, listProps } = props;

  const tabsIdRef = useRef(boxTabsGlobalId);

  useMount(() => {
    boxTabsGlobalId = boxTabsGlobalId + 1;
  });

  const [activeKey, setActiveKey] = useControllableValue<string>(props, {
    defaultValuePropName: 'defaultActiveKey',
    valuePropName: 'activeKey',
    trigger: 'onChange',
  });

  return (
    <>
      {/* Tab */}
      <Row className="box-tabs-nav-list" gutter={[8, 8]}>
        {items?.map((item, index) => {
          const key = item.key ?? item.tabKey;

          return (
            <Col key={key}>
              <BoxTab
                {...item}
                key={key}
                tabKey={key}
                active={key === activeKey}
                onClick={() => setActiveKey(key)}
                onClickDelete={() => onEdit?.(index as unknown as string, 'remove')}
                tabsId={tabsIdRef.current}
                fields={fields}
                listProps={listProps}
              />
            </Col>
          );
        })}
        <Col>
          <FormTabsAddButton
            fields={fields}
            listProps={listProps}
            onAdd={(event) => onEdit?.(event, 'add')}
          />
        </Col>
      </Row>

      {/* Tab Panel */}
      <div className="box-tabs-content">
        {items?.map((item) => {
          const key = item.key ?? item.tabKey;

          return (
            <BoxTabpanel
              {...item}
              tabKey={key}
              key={key}
              active={key === activeKey}
              tabsId={tabsIdRef.current}
            />
          );
        })}
      </div>
    </>
  );
}

export default BoxTabs;
