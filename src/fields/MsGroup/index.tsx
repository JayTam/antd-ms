import { ModeContext, useFieldModeContext } from '@jaytam/antd-ms/components/MsForm/contexts/mode';
import { Row } from 'antd';
import cls from 'classnames';
import { isNil } from 'lodash-es';
import type { Ref } from 'react';
import { forwardRef, useMemo } from 'react';
import enhanceField from '../enhanceField';
import GroupContainer from './components/GroupContainer';
import GroupTitle from './components/GroupTitle';
import './index.less';
import type { MsGroupProps } from './types';
import { useMsFormContext } from '@jaytam/antd-ms/components/MsForm/contexts/form';

const MsGroup = forwardRef((props: MsGroupProps, ref: Ref<HTMLDivElement>) => {
  const { title, tooltip, children, fieldProps = {} } = props;
  const { id, titleType, style, className, contentClassName, contentStyle, containerType, extra } =
    fieldProps;

  const formContext = useMsFormContext();
  const modeContext = useFieldModeContext(props);

  const containerClassName = useMemo(() => {
    if (isNil(containerType)) return;
    if (containerType === 'background') return 'ms-group-background';
    if (containerType === 'line') return 'ms-group-line';
  }, [containerType]);

  const titleNode = (
    <GroupTitle title={title} titleType={titleType} tooltip={tooltip} extra={extra} />
  );

  const contentNode = (
    <div className={cls('ms-group-content', contentClassName)} style={contentStyle}>
      <Row {...formContext.rowProps}>{children}</Row>
    </div>
  );

  /** 想要 column.mode 对下面所有字段生效，需在次再设置一层 ModeContext */
  return (
    <ModeContext.Provider value={modeContext}>
      <div
        id={id}
        className={cls('ms-group', containerClassName, className)}
        ref={ref}
        style={style}
      >
        <GroupContainer {...props} titleRender={titleNode} contentRender={contentNode} />
      </div>
    </ModeContext.Provider>
  );
});

export default enhanceField(MsGroup);
