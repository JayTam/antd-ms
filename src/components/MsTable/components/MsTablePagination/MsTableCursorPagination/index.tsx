import { HomeOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Select, Space } from 'antd';
import { get, isNil } from 'lodash-es';
import type { MsTableCursorPaginationProps } from './types';

import './index.less';
import { useLocale } from '@jaytam/antd-ms/locale';

function MsTableCursorPagination<D>(props: MsTableCursorPaginationProps<D>) {
  const {
    pageType,
    pageSize,
    pageSizeOptions = [10, 20, 50, 100],
    onChange,
    dataSource = [],
    pageStartKey = 'pageStart',
    hasNext,
    hasPrev,
  } = props;

  const { currentLocale } = useLocale('MsTable');

  const options = pageSizeOptions.map((item) => ({
    label: item + currentLocale.itemPage,
    value: item,
  }));

  /** 修改页码 */
  const handlePageSizeChange = (value: number) => {
    onChange?.(undefined, value, undefined, pageType);
  };

  const handlePrev = () => {
    const start = get(dataSource[0], pageStartKey)?.toString();
    if (isNil(pageSize)) return;
    if (isNil(start)) return;
    onChange?.(undefined, pageSize, start, 'prev');
  };

  const handleNext = () => {
    const start = get(dataSource[dataSource.length - 1], pageStartKey)?.toString();
    if (isNil(pageSize)) return;
    if (isNil(start)) return;
    onChange?.(undefined, pageSize, start, 'next');
  };

  const handleHome = () => {
    if (isNil(pageSize)) return;
    onChange?.(undefined, pageSize, undefined, 'next');
  };

  return (
    <Space>
      <Button
        className="ms-table-cursor-pagination-button"
        icon={<HomeOutlined />}
        size="small"
        type="text"
        onClick={() => handleHome()}
      >
        {currentLocale.backHome}
      </Button>

      <Button
        className="ms-table-cursor-pagination-button"
        style={{ marginLeft: 10 }}
        title={currentLocale.prevPage}
        size="small"
        type="text"
        icon={<LeftOutlined />}
        onClick={() => handlePrev()}
        disabled={!hasPrev}
      />

      <Button
        className="ms-table-cursor-pagination-button"
        style={{ marginRight: 10 }}
        title={currentLocale.nextPage}
        type="text"
        size="small"
        icon={<RightOutlined />}
        onClick={() => handleNext()}
        disabled={!hasNext}
      />

      <Select
        size="small"
        options={options}
        defaultValue={pageSizeOptions[0] as number}
        value={pageSize}
        onChange={handlePageSizeChange}
      />
    </Space>
  );
}

export default MsTableCursorPagination;
