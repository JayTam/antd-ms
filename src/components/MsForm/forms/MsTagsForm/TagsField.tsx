import { CloseOutlined } from '@ant-design/icons';

import type { MsFormColumns, MsFormColumnType, MsTableColumnType } from '@jaytam/antd-ms';
import type { FormInstance } from 'antd';
import { Col, Row, Tooltip, Typography } from 'antd';
import { get, isFunction, isNil, isUndefined, omit } from 'lodash-es';
import { useMemo } from 'react';

import { TABLE_SPACE } from '@jaytam/antd-ms/components/MsTable/constants';
import MsField from '../../../MsField';
import { RESOURCE_TAGS_VALUE_TYPES } from '../../constants';
import { clearValues } from './utils';
import { useLocale } from '@jaytam/antd-ms/locale';

type TagsFieldProps = Omit<MsFormColumnType, 'columns' | 'valueType'> &
  Pick<MsTableColumnType, 'splitFilterTags'> & {
    valueType?: any;
    value?: any;
    onChange?: any;
    query?: Record<string, any>;
    form: FormInstance;
    columns: MsFormColumns;
    hideCloseIcon?: boolean;
    // 视图组件需要,勿删
    onDelete?: () => void;
  };

const OMIT_KEYS = [
  '_colProps',
  '_formItemProps',
  '_fieldProps',
  'query',
  'columns',
  'form',
  'ellipsis',
  'editable',
  'copyable',
  'actions',
];

/**
 * 筛选项在筛选标签中的展示效果
 * @param props
 * @returns
 */
function TagsField(props: TagsFieldProps) {
  const { query, dataIndex, valueType = 'text' } = props;

  const value = get(query, dataIndex ?? []);

  if (isNil(value)) return null;

  if (RESOURCE_TAGS_VALUE_TYPES.includes(valueType)) {
    return <ResourceTagsTagsFiled {...props} />;
  } else {
    return <CommonTagsField {...props} />;
  }
}

/**
 * 普通筛选项在筛选标签中的展示效果
 * @param props
 * @returns
 */
function CommonTagsField(props: TagsFieldProps) {
  const {
    title,
    query,
    dataIndex,
    form,
    params,
    fieldProps,
    columns,
    hideCloseIcon,
    splitFilterTags,
    onDelete,
  } = props;

  const msFieldProps = isFunction(fieldProps) ? fieldProps(form) : fieldProps;

  const { currentLocale } = useLocale('MsForm');

  /** 当前字段值 */
  const value = get(query, dataIndex ?? []);

  // 分割标签
  if (splitFilterTags) {
    const list = value?.split(/[,，]/).filter((item: string) => !isNil(item) && item !== '');

    const handleClearItem = (index: number) => {
      list.splice(index, 1);
      const listValue = list.join(',');
      form.setFieldValue(dataIndex, listValue);
      form.submit();
    };

    return list?.map((item: any, index: number) => (
      <Col key={index}>
        <div className="ms-tags-form-item">
          <span className="ms-tags-form-item-label">{title}</span>
          <div className="ms-tags-form-item-value">
            <MsField
              {...omit(props, OMIT_KEYS)}
              value={item}
              // @ts-ignore
              params={isFunction(params) ? params(form) : params}
              fieldProps={msFieldProps}
              _disableStatus={true}
            />
          </div>
          {hideCloseIcon ? (
            <Tooltip title={currentLocale.requireNoDel}>
              <CloseOutlined disabled className="ms-tags-form-item-icon disabled" />
            </Tooltip>
          ) : (
            <CloseOutlined
              onClick={() => {
                handleClearItem(index);
                onDelete?.();
              }}
              className="ms-tags-form-item-icon"
            />
          )}
        </div>
      </Col>
    ));
  }

  return (
    <div className="ms-tags-form-item">
      <span className="ms-tags-form-item-label">{title}</span>
      <div className="ms-tags-form-item-value">
        <MsField
          {...omit(props, OMIT_KEYS)}
          value={value}
          // @ts-ignore
          params={isFunction(params) ? params(form) : params}
          fieldProps={msFieldProps}
          _disableStatus={true}
        />
      </div>
      {hideCloseIcon ? null : (
        <CloseOutlined
          onClick={() => {
            clearValues(dataIndex, columns, form);
            onDelete?.();
          }}
          className="ms-tags-form-item-icon"
        />
      )}
    </div>
  );
}

/**
 * 资源标签在筛选标签的展示效果
 * @param props
 * @returns
 */
function ResourceTagsTagsFiled(props: any) {
  const { dataIndex, title, query, form, valueType, onDelete } = props;

  const value = get(query, dataIndex ?? []);

  const tags = useMemo<any[]>(() => {
    if (value.length === 0) {
      return [{}];
    }
    // 标签组件
    if (valueType === 'resourceTags') {
      return value.split(',').map((item: any) => {
        const token = item.split(':');
        return { key: token[0], value: token[1] };
      });
    }

    // 预置标签组件
    if (valueType === 'presetResourceTags') {
      return value.split(',').map((item: any) => {
        const token = item.split(':');
        return { type: token[0], key: token[1], value: token[2] };
      });
    }

    return [];
  }, [value, valueType]);

  const handleClose = (tag: any) => {
    // 剔除指定key，并序列化
    const tagsString = tags
      .filter((item) => {
        if (isUndefined(item.key)) return false;
        if (item.key === tag.key && item.type === tag.type) {
          return false;
        }
        return true;
      })
      .map((item) => {
        if (valueType === 'resourceTags') {
          return `${item.key}:${item.value ?? ''}`;
        }
        if (valueType === 'presetResourceTags') {
          return `${item.type}:${item.key}:${item.value ?? ''}`;
        }
        return '';
      })
      .join(',');
    // 不能用  onChange 的方式修改，需要用 form.setFieldValue 的方式修改
    form.setFieldValue(dataIndex, tagsString);
    form.submit();
    onDelete?.();
  };

  const TagNodes = tags.map((tag) => (
    <Col key={tag.key}>
      <div className="ms-tags-form-item">
        <span className="ms-tags-form-item-label">{title}</span>
        <div className="ms-tags-form-item-value">
          <Typography.Text ellipsis={{ tooltip: `${tag.key} : ${tag.value}` }}>
            {tag.key} : {tag.value}
          </Typography.Text>
        </div>
        <CloseOutlined onClick={() => handleClose(tag)} className="ms-tags-form-item-icon" />
      </div>
    </Col>
  ));

  return <Row gutter={[TABLE_SPACE / 4, TABLE_SPACE / 4]}>{TagNodes}</Row>;
}

export default TagsField;
