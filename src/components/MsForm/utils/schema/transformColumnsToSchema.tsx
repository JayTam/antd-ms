import type { MsFormColumns, MsFormColumnType } from '@jaytam/antd-ms';
import { cloneDeepWithReactNode, leafValueNotNil } from '@jaytam/antd-ms/utils';
import { SchemaRender } from '@jaytam/schema-render';
import type { FormInstance, FormListFieldData } from 'antd';
import type { NamePath } from 'antd/es/form/interface';
import { isArray, isFunction, isNil, pick } from 'lodash-es';
import { LIST_VALUE_TYPES, OBJECT_VALUE_TYPES } from '../../constants';
import { mergeNamePath } from '../namePath';
import {
  composeColumnSchema,
  generateLoadingColumnSchema,
  getListFormItemSchema,
  getPropertyMaybeFunction,
} from './columnSchemaUtil';
import { getDefaultColumnProps } from './defaultPropsUtil';
import type { LocaleType } from '@jaytam/antd-ms/locale';

export type TransformColumnsToSchemaProps<D> = {
  columns: MsFormColumns<D>;
  columnNumber: number;
  loading: boolean;
  form: FormInstance;
  basePathName?: NamePath;
  list?: ListConfig;
  valuesNormal?: boolean;
};

export type ListConfig = {
  key: number;
  index: NamePath;
  fields: FormListFieldData[];
};

/**
 * columns 转换成 schema 配置
 * 1. 如果是 object 类组件，将 dataIndex 递归拼接起来，利用 children 递归转换 schema
 * 2. 如果是 list 类组件，在list组件中提供列表中每一行的columns，根据 value(Array) 动态转换成 schema，同样dataIndex也需要
 * @param props
 * @returns
 */
const transformColumnsToSchema = <D,>(
  props: TransformColumnsToSchemaProps<D>,
  locale: LocaleType,
): any => {
  const { columns, columnNumber, basePathName, list, form, loading, valuesNormal } = props;

  /**
   * 根据不同的 component 生成不同的 columnSchema
   * 列表：formList, formTable
   * 分组：group, collapsed
   * 普通组件等
   */
  function generateColumnSchema(component: string, column: MsFormColumnType, schemaObject: any) {
    const { col: ColSchema, formItem: FormItemSchema, field: FieldSchema } = schemaObject;

    // Object组件
    if (OBJECT_VALUE_TYPES.includes(component)) {
      return composeColumnSchema(column, {
        col: ColSchema,
        field: {
          ...FieldSchema,
          title: (column.formItemProps as any)?.label,
          // 递归转换 column.columns
          children: isArray(column.columns)
            ? transformColumnsToSchema(
                {
                  ...props,
                  columns: column.columns,
                  basePathName: mergeNamePath(basePathName, column.dataIndex),
                },
                locale,
              )
            : undefined,
        },
      });
    }

    // List组件
    if (LIST_VALUE_TYPES.includes(component)) {
      return composeColumnSchema(column, {
        col: ColSchema,
        // 校验规则需要设置到 Form.FormList 组件上，不然无法动态消除
        formItem: getListFormItemSchema(FormItemSchema),
        field: {
          ...FieldSchema,
          fieldProps: {
            ...FieldSchema.fieldProps,
            _loading: loading,
            _columns: column.columns,
            _formItemProps: pick(FormItemSchema, 'name', 'rules', 'initialValue'),
            _valuesNormal: valuesNormal,
          },
        },
      });
    }

    // 普通组件
    const columnSchema = composeColumnSchema(column, {
      col: ColSchema,
      formItem: FormItemSchema,
      field: FieldSchema,
    });

    // 普通组件添加 loading 效果
    return generateLoadingColumnSchema(columnSchema, component, loading);
  }

  return (
    columns
      // 不渲染隐藏
      .filter((column) => (isFunction(column.hideInForm) ? true : !column.hideInForm))
      // 组合 col, formItem, field 组件
      .map((originColumn, index) => {
        const column = getDefaultColumnProps(
          originColumn,
          columnNumber,
          locale,
          basePathName,
          list,
          valuesNormal,
        );
        const colKey = column.key ?? column.formItemProps?.name ?? index.toString();
        const formItemDependencies = (column.formItemProps as any)?.dependencies;
        const formItemShouldUpdate = (column.formItemProps as any)?.shouldUpdate;
        const component = column.valueType as string;

        const ColSchema: any = { component: 'col', key: colKey, ...column.colProps };

        let FormItemSchema: any = { component: 'formItem', ...column.formItemProps };

        const FieldSchema: any = { ...column, component, _column: originColumn };

        // 依赖组件
        if (isArray(formItemDependencies) || !isNil(formItemShouldUpdate)) {
          return {
            key: column.dataIndex + '-dep',
            component: 'formItem',
            noStyle: true,
            dependencies: formItemDependencies,
            shouldUpdate: formItemShouldUpdate,
            children: () => {
              // 联动隐藏
              const hideInForm = isFunction(column.hideInForm)
                ? column.hideInForm(form)
                : column.hideInForm;
              if (hideInForm) return;

              const NewFiledSchema = cloneDeepWithReactNode(FieldSchema);
              // 存在依赖时，initialRequest 默认为 false
              NewFiledSchema.initialRequest = NewFiledSchema.initialRequest ?? false;

              // 联动请求参数动态化
              NewFiledSchema.params = getPropertyMaybeFunction(
                'params',
                column,
                originColumn,
                form,
              );

              // filedProps
              NewFiledSchema.fieldProps = getPropertyMaybeFunction(
                'fieldProps',
                column,
                originColumn,
                form,
              );

              // formItemProps
              const NewFormItemSchema = {
                ...FormItemSchema,
                ...getPropertyMaybeFunction(
                  'formItemProps',
                  column,
                  originColumn,
                  form,
                  valuesNormal,
                ),
              };

              // dependencies 依赖项值为空，则默认开启 disabled
              if (isArray(formItemDependencies)) {
                const defaultDependenciesDisabled = column.dependenciesListSelf
                  ? false
                  : !leafValueNotNil(form.getFieldsValue(formItemDependencies));
                // TODO，当 form.getFieldsValue([list,1,value]) 第二个元素时，第一个元素得到的是 undefined，导致 leafValueNotNil 判断错误
                NewFiledSchema.fieldProps.disabled =
                  NewFiledSchema.fieldProps.disabled ?? defaultDependenciesDisabled;
              }

              const columnSchema = generateColumnSchema(component, column, {
                col: ColSchema,
                formItem: NewFormItemSchema,
                field: NewFiledSchema,
              });

              return <SchemaRender schema={[columnSchema]} />;
            },
          };
        }

        // params
        FieldSchema.params = getPropertyMaybeFunction('params', column, originColumn, form);

        // filedProps
        FieldSchema.fieldProps = getPropertyMaybeFunction('fieldProps', column, originColumn, form);

        // formItemProps
        FormItemSchema = {
          ...FormItemSchema,
          ...getPropertyMaybeFunction('formItemProps', column, originColumn, form, valuesNormal),
        };

        return generateColumnSchema(component, column, {
          col: ColSchema,
          formItem: FormItemSchema,
          field: FieldSchema,
        });
      })
  );
};

export default transformColumnsToSchema;
