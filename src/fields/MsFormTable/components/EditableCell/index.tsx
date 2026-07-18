import { useFieldModeContext } from '@jaytam/antd-ms/components/MsForm/contexts/mode';
import { transformColumnsToSchema } from '@jaytam/antd-ms/components/MsForm/utils/schema';
import { cloneDeepWithReactNode } from '@jaytam/antd-ms/utils';
import { SchemaRender } from '@jaytam/schema-render';
import { Form } from 'antd';
import cls from 'classnames';
import { merge } from 'lodash-es';

import './index.less';
import { useMsFormListContext } from '@jaytam/antd-ms/fields/MsFormList/context';
import { useLocale } from '@jaytam/antd-ms/locale';

type EditableCellProps = Record<string, any> & {
  index: number;
};

/**
 * 重写编辑表格的渲染
 * @param props
 * @returns
 */
function EditableCell(props: EditableCellProps) {
  const { index, column, list, className, ...restProps } = props;

  const { formItemProps, valuesNormal, loading } = useMsFormListContext();
  const { fullLocale } = useLocale();

  const form = Form.useFormInstance();

  const { mode } = useFieldModeContext(props);

  const isClickEditMode = mode === 'clickEdit';

  if (column) {
    const schema = transformColumnsToSchema(
      {
        columns: [
          merge(cloneDeepWithReactNode(column), {
            colProps: { span: 24 },
            _listNamePath: formItemProps.name,
          }),
        ],
        columnNumber: 1,
        form,
        list: list,
        loading,
        basePathName: formItemProps.name,
        valuesNormal: valuesNormal,
      },
      fullLocale,
    );

    return (
      <td
        {...restProps}
        className={cls(className, 'ms-form-table-cell', {
          ['ms-form-table-click-edit-cell']: isClickEditMode,
        })}
      >
        <SchemaRender schema={schema} />
      </td>
    );
  }

  return (
    <td
      {...restProps}
      className={cls(className, {
        ['ms-form-table-click-edit-cell']: isClickEditMode,
      })}
    >
      {props.children}
    </td>
  );
}

/**
 * 性能优化：当移动时，避免整个 list 重新渲染，只渲染变化的 cell
 * Table 无法通过重写 Row 来实现，每次 dataSource 变更都会引起所有 cell 重新渲染
 * 该优化方案存在问题，暂时弃用，待后续解决，formList 和 formTable 都存在该问题。
 * 当存在依赖时，column.params为函数，要访问异步数据，因为 fieldItem.name 未变化，导致组件无法更新
 * https://ant.design/components/table-cn#%E4%B8%BA%E4%BB%80%E4%B9%88-%E6%9B%B4%E6%96%B0-state-%E4%BC%9A%E5%AF%BC%E8%87%B4%E5%85%A8%E8%A1%A8%E6%B8%B2%E6%9F%93
 */
// export default memo(EditableCell, (prevProps, nextProps) => {
//   // 非表单cell，不缓存
//   if (isNil(prevProps.column) || isNil(nextProps.column)) {
//     return false;
//   }
//   if (prevProps.index == nextProps.index) {
//     return false;
//   }
//   return false;
// });

export default EditableCell;
