import { useMsFormContext } from '@jaytam/antd-ms/components/MsForm/contexts/form';
import { ModeContext, useFieldModeContext } from '@jaytam/antd-ms/components/MsForm/contexts/mode';
import { useMount } from 'ahooks';
import { Collapse as AntCollapse, Row } from 'antd';
import cls from 'classnames';
import { isNil, uniqueId } from 'lodash-es';

import type { ReactNode } from 'react';
import { forwardRef, useMemo, useRef, useState } from 'react';
import enhanceField from '../enhanceField';
import GroupTitle from '../MsGroup/components/GroupTitle';
import IndentContainer from './components/IndentContainer';
import './index.less';
import type { MsCollapseProps, MsCollapseRef } from './types';

const MsCollapse = forwardRef((props: MsCollapseProps, ref: MsCollapseRef) => {
  const { dataIndex, title, tooltip, children, fieldProps, formItemProps } = props;
  const {
    titleType = 'gradient',
    defaultCollapsed = false,
    indent = false,
    indentAll = false,
    forceRender = true,
    containerType,
    extra,
    className,
    style,
    contentClassName,
    contentStyle,
  } = fieldProps ?? {};

  const formContext = useMsFormContext();
  const modeContext = useFieldModeContext(props);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const containerClassName = useMemo(() => {
    if (isNil(containerType)) return;
    if (containerType === 'background') return 'ms-collapse-background';
    if (containerType === 'line') return 'ms-collapse-line';
  }, [containerType]);

  const idRef = useRef(dataIndex?.toString() ?? fieldProps?.id ?? uniqueId());
  const panelKey = idRef.current;
  const activeKey = useMemo(() => (collapsed ? undefined : idRef.current), [collapsed]);

  useMount(() => {
    formContext.registCollapse(panelKey, collapsed, setCollapsed);
  });

  /**
   *
   * @param panelChildren
   * @returns
   */
  function renderCollapse(panelChildren?: ReactNode) {
    return (
      <Row
        className={cls('ms-collapse', containerClassName, className)}
        style={style}
        ref={ref}
        id={idRef.current}
      >
        <AntCollapse
          style={{ width: '100%' }}
          ghost
          activeKey={activeKey}
          destroyInactivePanel
          onChange={(keys) => {
            setCollapsed(keys[0] !== panelKey);
          }}
        >
          <AntCollapse.Panel
            key={panelKey}
            className={titleType === 'block' ? 'block-panel' : undefined}
            header={
              <GroupTitle
                className="ms-collapse-title"
                title={title}
                titleType={titleType}
                tooltip={tooltip}
                extra={extra}
              />
            }
            forceRender={forceRender}
          >
            <div className={cls('ms-collapse-content', contentClassName)} style={contentStyle}>
              <Row {...formContext.rowProps}>{panelChildren}</Row>
            </div>
          </AntCollapse.Panel>
        </AntCollapse>
      </Row>
    );
  }

  if (indentAll) {
    return (
      /** 想要 column.mode 对下面所有字段生效，需在次再设置一层 ModeContext */
      <ModeContext.Provider value={modeContext}>
        <IndentContainer formItemProps={formItemProps}>{renderCollapse(children)}</IndentContainer>
      </ModeContext.Provider>
    );
  }

  return (
    /** 想要 column.mode 对下面所有字段生效，需在次再设置一层 ModeContext */
    <ModeContext.Provider value={modeContext}>
      {renderCollapse(
        indent ? (
          <IndentContainer formItemProps={formItemProps}>{children}</IndentContainer>
        ) : (
          children
        ),
      )}
    </ModeContext.Provider>
  );
});

export default enhanceField(MsCollapse);
