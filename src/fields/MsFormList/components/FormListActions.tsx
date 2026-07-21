import {
  CopyOutlined,
  DownCircleOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  UpCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Popconfirm,
  Row,
  Skeleton,
  type FormListFieldData,
  type FormListOperation,
} from 'antd';
import { isFunction, isNil } from 'lodash-es';
import type { FormTableProps } from '../../MsFormTable/types';
import type { FormListOperationAction, FormListProps } from '../types';
import { replaceMessage, useLocale } from '@jaytam/antd-ms/locale';

type FormListActionsProps = {
  index: number;
  fields: FormListFieldData[];
  operation: FormListOperation;
  listProps: FormListProps | FormTableProps;
  action: FormListOperationAction;
};

function FormListActions(props: FormListActionsProps) {
  const { fields, operation, listProps = {}, index, action } = props;
  const {
    max,
    min,
    actions = ['del'],
    actionsRender,
    delPopconfirmProps,
    _loading: loading = false,
  } = listProps;

  const { currentLocale, globalLocale } = useLocale('MsFormList');

  const current = index + 1;

  if (loading) {
    return actions.length > 0 ? <Skeleton.Input active /> : null;
  }

  if (actionsRender) {
    return (
      <Row align="top" wrap={false}>
        {actionsRender(index, fields, operation, action)}
      </Row>
    );
  }

  return (
    <Row align="top" wrap={false}>
      {actions.map((actionItem, actionIndex: number) => {
        if (actionItem === 'add') {
          // 普通元素
          if (!isNil(max) && fields.length >= max) {
            return null;
          }
          if (index === fields.length - 1) {
            // 最后一个元素

            return (
              <Button
                key="add"
                title={currentLocale.addOneRow}
                type="text"
                shape="circle"
                icon={<PlusCircleOutlined />}
                onClick={() => action.add()}
              />
            );
          } else {
            // 非最后一个元素
            return <Button key="add" type="text" shape="circle" />;
          }
        }

        if (actionItem === 'up') {
          return (
            <Button
              key="up"
              title={currentLocale.moveUpward}
              type="text"
              shape="circle"
              icon={<UpCircleOutlined />}
              onClick={() => action.move(index, 'up')}
              disabled={index === 0}
            />
          );
        }

        if (actionItem === 'down') {
          return (
            <Button
              key="down"
              title={currentLocale.moveDownward}
              type="text"
              shape="circle"
              icon={<DownCircleOutlined />}
              onClick={() => action.move(index, 'down')}
              disabled={index === fields.length - 1}
            />
          );
        }

        if (actionItem === 'del') {
          if (!isNil(min) && fields.length <= min) {
            return null;
          }

          const popconfirmProps = isFunction(delPopconfirmProps)
            ? delPopconfirmProps(fields, index)
            : delPopconfirmProps;

          return (
            <Popconfirm
              key="del"
              title={replaceMessage(currentLocale.deleteRowConfirm, { current })}
              placement="bottom"
              okText={globalLocale.ok}
              cancelText={globalLocale.cancel}
              onConfirm={() => action.remove(index)}
              {...popconfirmProps}
            >
              <Button
                title={currentLocale.deleteOneRow}
                type="text"
                shape="circle"
                icon={<MinusCircleOutlined />}
              />
            </Popconfirm>
          );
        }

        if (actionItem === 'copy') {
          return (
            <Button
              key="copy"
              title={currentLocale.copyOneRow}
              type="text"
              shape="circle"
              onClick={() => action.copy(index)}
              icon={<CopyOutlined />}
            />
          );
        }

        // 自定义操作按钮
        if (isFunction(actionItem)) {
          return (
            <Button
              key={actionIndex}
              type="text"
              shape="circle"
              {...actionItem(index, fields, operation, action)}
            />
          );
        }

        // 用于占位
        return null;
      })}
    </Row>
  );
}

export default FormListActions;
