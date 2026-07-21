import { Checkbox, Col, Row } from 'antd';
import type { MsTableColumnsWithKey } from '../../../types';
import './index.less';

type ColumnSelectCheckboxesProps = {
  columns?: MsTableColumnsWithKey;
};

function ColumnSelectCheckboxes(props: ColumnSelectCheckboxesProps) {
  const { columns } = props;

  return (
    <Row gutter={[16, 16]}>
      {columns?.map((column) => {
        // 操作列一般不设置dataIndex，使用 title 作为 key
        const key = column.dataIndex?.toString() ?? column.title;
        return (
          <Col key={key} span={8}>
            <Checkbox
              className="column-select-checkbox"
              value={key}
              disabled={column?.columnSet?.disabled}
            >
              {column.title}
            </Checkbox>
          </Col>
        );
      })}
    </Row>
  );
}

export default ColumnSelectCheckboxes;
