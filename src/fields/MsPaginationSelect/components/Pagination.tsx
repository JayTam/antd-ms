import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { replaceMessage, useLocale } from '@jaytam/antd-ms/locale';
import { Button, Space } from 'antd';
import { max } from 'lodash-es';

type PaginationProps = {
  current?: number;
  pageSize?: number;
  total?: number;
  onChange?: (current: number, pageSize: number) => void;
};

function Pagination(props: PaginationProps) {
  const { current = 1, pageSize = 10, total = 0, onChange } = props;

  const { currentLocale } = useLocale('MsPaginationSelect');
  // 最小1页
  const totalPage = max([Math.ceil(total / pageSize), 1]) ?? 1;

  return (
    <Space size="small">
      <div>{replaceMessage(currentLocale.total, { total })}</div>
      <Button
        icon={<LeftOutlined />}
        title={currentLocale.prev}
        size="small"
        type="text"
        onClick={() => onChange?.(current - 1, pageSize)}
        disabled={current <= 1}
      />
      <div>
        {current} / {totalPage}
      </div>
      <Button
        icon={<RightOutlined />}
        title={currentLocale.next}
        size="small"
        type="text"
        onClick={() => onChange?.(current + 1, pageSize)}
        disabled={current >= totalPage}
      />
    </Space>
  );
}

export default Pagination;
