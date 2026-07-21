import MsModal from '@jaytam/antd-ms/components/MsModal';
import { MsShutOutlined } from '@jaytam/icons';
import { Button, Col, Popconfirm, Row, Space } from 'antd';
import { isNil } from 'lodash-es';
import { useMemo, useState } from 'react';
import type { ColumnStateListType, MsTableColumnsWithKey } from '../../types';
import { columnsToColumnState } from '../../utils/state';
import ColumnSelect from '../ColumnSelect';
import ColumnSort from '../ColumnSort';
import './index.less';
import { useLocale } from '@jaytam/antd-ms/locale';

type ColumnExportModalProps = {
  columns: MsTableColumnsWithKey;
  defaultState: ColumnStateListType;
  resetState: ColumnStateListType;
  showSaveBtn: boolean;
  onSave: (state: ColumnStateListType, isExport: boolean) => Promise<void>;
};

const ColumnExportModal = MsModal.create((props: ColumnExportModalProps) => {
  const { columns, defaultState, resetState, showSaveBtn, onSave } = props;

  const modal = MsModal.useModal();
  const { currentLocale, globalLocale } = useLocale('MsTable');

  const [columnState, setColumnState] = useState(defaultState);

  const [saveLoading, setSaveLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  const loading = useMemo(() => saveLoading || exportLoading, [exportLoading, saveLoading]);

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
        <div className="column-set-modal-title">{currentLocale.exportField}</div>
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
          title={currentLocale.resetToInitial}
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
          <Button disabled={loading} onClick={() => modal.close()}>
            {globalLocale.cancel}
          </Button>
          {showSaveBtn && (
            <Button
              disabled={exportLoading}
              loading={saveLoading}
              onClick={() => {
                setSaveLoading(true);
                onSave(columnState, false)
                  .then(() => {
                    modal.close();
                  })
                  .finally(() => {
                    setSaveLoading(false);
                  });
              }}
            >
              {globalLocale.save}
            </Button>
          )}
          <Button
            type="primary"
            loading={exportLoading}
            disabled={saveLoading}
            onClick={() => {
              setExportLoading(true);
              onSave(columnState, true)
                .then(() => {
                  modal.close();
                })
                .finally(() => {
                  setExportLoading(false);
                });
            }}
          >
            {globalLocale.export}
          </Button>
        </Space>
      </div>
    </MsModal>
  );
});

export default ColumnExportModal;
