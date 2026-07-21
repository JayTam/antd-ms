import type { MsFormProps } from '@jaytam/antd-ms';
import cs from 'classnames';
import { isNil, merge } from 'lodash-es';
import { useContext, useMemo } from 'react';
import { MsFlowContext } from '../../context';
import type { MsFlowConfigPanelProps } from '../../types';
import { findComponent, findFormColumns, findFormInitialValues } from '../../utils/component';
import { updateEdgeData, updateNodeData } from '../../utils/node';
import ConfigForm from './ConfigForm';

import './index.less';

function MsFlowConfigPanel(props: MsFlowConfigPanelProps) {
  const { edge, components = [], className, style } = props;
  const { currentCell, nodeFieldNames: contextNodeFieldNames } = useContext(MsFlowContext);

  // 映射
  const fieldNames = useMemo(() => {
    if (isNil(currentCell)) return contextNodeFieldNames;
    if (!currentCell.isNode()) return contextNodeFieldNames;
    const component = findComponent(currentCell, components);
    if (isNil(component)) {
      return contextNodeFieldNames;
    } else {
      return merge(contextNodeFieldNames, component.nodeComponent);
    }
  }, [contextNodeFieldNames, components, currentCell]);

  // 表单配置
  const columns = useMemo(() => {
    if (isNil(currentCell)) return [];

    if (currentCell.isEdge()) {
      return edge?.formColumns ?? [];
    }
    if (currentCell.isNode()) {
      return findFormColumns(currentCell, components);
    }
    return [];
  }, [currentCell, edge, components]);

  // 初始值
  const initialValues = useMemo(() => {
    if (isNil(currentCell)) return;

    if (currentCell.isEdge()) {
      return currentCell.getData() ?? edge?.formInitialValues;
    }
    if (currentCell.isNode()) {
      return currentCell.getData() ?? findFormInitialValues(currentCell, components, fieldNames);
    }
  }, [currentCell, edge, components, fieldNames]);

  /**
   * 当值变更时设置到节点的data中
   * @param _
   * @param values
   */
  const handleValuesChange: MsFormProps['onValuesChange'] = (_, values) => {
    console.log('handleValuesChange', values);
    if (isNil(currentCell)) return;
    if (currentCell.isNode()) {
      const component = findComponent(currentCell, components);
      if (component) {
        updateNodeData(currentCell, component, values, fieldNames);
      }
    }
    if (currentCell.isEdge()) {
      updateEdgeData(currentCell, values);
    }
  };

  return (
    <div className={cs('ms-flow-config-panel', className)} style={style}>
      <div className="title">配置区域</div>
      <div className="content">
        <ConfigForm
          key={currentCell?.id}
          initialValues={initialValues}
          columns={columns}
          onValuesChange={handleValuesChange}
        />
        {/* <ConfigForm
          initialValues={initialValues}
          columns={columns}
          onValuesChange={handleValuesChange}
        /> */}
      </div>
    </div>
  );
}

export default MsFlowConfigPanel;
