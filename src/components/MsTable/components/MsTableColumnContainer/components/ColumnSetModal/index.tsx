import MsModal from '@jaytam/antd-ms/components/MsModal';
import { MsShutOutlined } from '@jaytam/icons';
import { Button, Col, Popconfirm, Row, Space } from 'antd';
import { isNil } from 'lodash-es';
import { useState } from 'react';
import type { ColumnStateListType, MsTableColumnsWithKey } from '../../types';
import { columnsToColumnState } from '../../utils/state';
import ColumnSelect from '../ColumnSelect';
import ColumnSort from '../ColumnSort';
import './index.less';
import { useLocale } from '@jaytam/antd-ms/locale';

type ColumnSetModalProps = {
  columns: MsTableColumnsWithKey;
  defaultState: ColumnStateListType;
  resetState: ColumnStateListType;
  onFinish: (state: ColumnStateListType) => Promise<void>;
};

const ColumnSetModal = MsModal.create((props: ColumnSetModalProps) => {
  const { columns, defaultState, resetState, onFinish } = props;

  const modal = MsModal.useModal();
  const { currentLocale, globalLocale } = useLocale('MsForm');

  const [columnState, setColumnState] = useState(defaultState);
  const [loading, setLoading] = useState(false);

  return (
    <MsModal
      {...modal.props}
      width="800px"
      footer={null}
      closable={false}
      centered
      keyboard={!loading}
    >
      {/* header */}
      <div className="column-set-modal-header">
        <div className="column-set-modal-title">{currentLocale.setShow}</div>
        {!loading && (
          <MsShutOutlined className="column-set-modal-close-icon" onClick={() => modal.close()} />
        )}
      </div>
      {/* content */}
      <Row gutter={16} className="column-set-container">
        <Col span={16}>
          <ColumnSelect
            columns={columns}
            columnState={columnState}
            setColumnState={setColumnState}
          />
        </Col>
        <Col span={8}>
          <ColumnSort columns={columns} columnState={columnState} setColumnState={setColumnState} />
        </Col>
      </Row>
      {/* footer */}
      <div className="column-set-model-footer">
        <Popconfirm
          title={currentLocale.resetInitial}
          okText={globalLocale.ok}
          cancelText={globalLocale.cancel}
          onConfirm={() => {
            if (isNil(resetState)) {
              setColumnState(columnsToColumnState(columns));
            } else {
              setColumnState(resetState);
            }
          }}
        >
          <Button>{globalLocale.reset}</Button>
        </Popconfirm>

        <Space>
          <Button onClick={() => modal.close()}>{globalLocale.cancel}</Button>
          <Button
            type="primary"
            onClick={() => {
              setLoading(true);
              onFinish(columnState)
                .then(() => {
                  modal.close();
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          >
            {globalLocale.ok}
          </Button>
        </Space>
      </div>
    </MsModal>
  );
});

export default ColumnSetModal;
