import { Row, Tag, Typography } from 'antd';
import type { ReactNode } from 'react';

type TagsProps = {
  items?: { key: string; value: string }[];
  emptyText?: ReactNode;
};

const { Text } = Typography;

function Tags(props: TagsProps) {
  const { items = [], emptyText } = props;

  if (items.length === 0) {
    return <>{emptyText}</>;
  }

  return (
    <Row gutter={[0, 6]}>
      {items?.map((tag) => {
        const tagStr = `${tag.key} : ${tag.value}`;

        return (
          <Tag key={tag.key}>
            <Text style={{ maxWidth: '120px' }} ellipsis={{ tooltip: tagStr }}>
              {tagStr}
            </Text>
          </Tag>
        );
      })}
    </Row>
  );
}

export default Tags;
