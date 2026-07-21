import { Form } from 'antd';
import React from 'react';
import FormListWrapper from '../MsFormList/components/FormListWrapper';
import type { FormTabsProps } from './types';
import type { MsTabsProps } from '@jaytam/antd-ms';
import FormTabPage from './components/FormTabPage';
import TabsCompose from './components/TabsCompose';
import { useControllableValue } from 'ahooks';
import { isArray, isFunction, isNil } from 'lodash-es';
import { mergeNamePath } from '@jaytam/antd-ms/components/MsForm/utils/namePath';
import { useLocale } from '@jaytam/antd-ms/locale';

const FormTabs = React.forwardRef<HTMLDivElement, FormTabsProps>((props, ref) => {
  const { tabsProps, tabLabelRender, tabDescRender, type } = props;
  const form = Form.useFormInstance();
  const { globalLocale } = useLocale();

  const listBaseNamePath = props._formItemProps?.name;
  const tabsId = isArray(listBaseNamePath)
    ? listBaseNamePath.join('_')
    : listBaseNamePath?.toString?.();

  const [activeKey, setActiveKey] = useControllableValue<any>(tabsProps, {
    defaultValue: 0,
    defaultValuePropName: 'defaultActiveKey',
    valuePropName: 'activeKey',
    trigger: 'onChange',
  });

  return (
    <FormListWrapper {...props}>
      {(fields, _, { errors }, action) => {
        /**
         * 处理 tabs 新增和删除
         * @param tabKey
         * @param tabAction 新增或删除
         */
        const handleEdit: MsTabsProps['onEdit'] = (tabKey, tabAction) => {
          if (tabAction === 'add') {
            // 聚焦到新增的 tab
            action.add().then((isSuccess) => {
              if (isSuccess) setActiveKey(fields.length);
            });
          }
          if (tabAction === 'remove') {
            const tabIndex = tabKey as unknown as number;
            action.remove(tabIndex);
            const restIndex = tabIndex > 0 ? tabIndex - 1 : 0;
            setActiveKey(restIndex);
          }
        };

        function onChange(newActiveKey: string) {
          setActiveKey(newActiveKey);
          if (!isNil(activeKey)) {
            form.validateFields([mergeNamePath(listBaseNamePath, activeKey)], { recursive: true });
          }
        }

        return (
          <div ref={ref} className="ms-form-tabs" id={tabsId}>
            <TabsCompose
              {...tabsProps}
              editType={type}
              activeKey={activeKey}
              onChange={onChange}
              onEdit={handleEdit}
              fields={fields}
              listProps={props}
              items={fields?.map((fieldItem, index) => ({
                label: isFunction(tabLabelRender)
                  ? tabLabelRender?.(fieldItem, form)
                  : globalLocale.option + fieldItem.key,
                description: tabDescRender?.(fieldItem, form),
                key: index as unknown as string,
                children: (
                  <FormTabPage
                    key={fieldItem.key}
                    fieldItem={fieldItem}
                    index={index}
                    fields={fields}
                    listProps={props}
                  />
                ),
              }))}
            />

            <Form.ErrorList errors={errors} />
          </div>
        );
      }}
    </FormListWrapper>
  );
});

export default FormTabs;
