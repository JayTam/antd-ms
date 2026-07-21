import MsDrawer from '@jaytam/antd-ms/components/MsDrawer';
import MsEmpty from '@jaytam/antd-ms/components/MsEmpty';
import type { MsTableColumnsWithKey } from '@jaytam/antd-ms/components/MsTable/components/MsTableColumnContainer/types';
import { COLUMN_KEY } from '@jaytam/antd-ms/components/MsTable/components/MsTableColumnContainer/utils/column';
import { groupColumns } from '@jaytam/antd-ms/components/MsTable/components/MsTableColumnContainer/utils/group';
import { ReactComponent as msViewGroupItemActive } from '../../../../../../../../assets/icons/ms-view-group-item-active.svg';
import { MsArrowDownSmOutlined, MsArrowRightSmOutlined, MsSvg } from '@jaytam/icons';
import { Collapse, Input } from 'antd';
import cls from 'classnames';
import { isNil } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';
import type { FieldListType, FormColumnSetPorps } from '../../types';
import { useLocale } from '@jaytam/antd-ms/locale';
const { Panel } = Collapse;

export const MsFormColumnSetDrawer = MsDrawer.create((props: FormColumnSetPorps) => {
  const modal = MsDrawer.useDrawer();
  const { columns = [], drawerProps = {}, setFieldList, fieldList = [] } = props;
  const { currentLocale } = useLocale('MsTable');

  const { title = currentLocale.addFilterCondition, className, ...restProps } = drawerProps;
  const [keywords, setKeywords] = useState('');
  const [columnsKeys, setColumnsKeys] = useState<FieldListType>(fieldList);

  const handleOk = async () => {
    setFieldList(columnsKeys);
  };

  // 通过关键字过滤
  const columnsKeywordsList = useMemo(() => {
    if (!keywords) return columns;
    return columns.filter((item) =>
      item?.title?.toLocaleLowerCase().includes(keywords?.toLocaleLowerCase()),
    );
  }, [columns, keywords]);

  // 分组
  const columnsGroupList = useMemo(
    () => groupColumns(columnsKeywordsList, currentLocale.baseFields),
    [columnsKeywordsList, currentLocale.baseFields],
  );

  // 关键字高亮
  const textHighlight = (keyword: string = '', text: string = '') => {
    // 对搜索关键词进行转义
    if (!keyword) return text;
    const _keyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(_keyword, 'gi');
    const highlightedText = text.replace(regex, function (match) {
      return `<span style="color: #006eff">${match}</span>`;
    });
    return highlightedText;
  };

  /** Collapse 组件默认展开所有分组 */
  const defaultActiveKey = useMemo(
    () =>
      groupColumns((columns ?? []) as MsTableColumnsWithKey, currentLocale.baseFields).map(
        (group) => group.groupId,
      ),
    [columns, currentLocale.baseFields],
  );

  // 离开页面清空数据
  useEffect(() => {
    return () => {
      setColumnsKeys([]);
    };
  }, []);
  const drawerPorps = {
    title,
    ...modal.props,
    ...restProps,
  };
  return (
    <MsDrawer
      {...drawerPorps}
      contentWrapperStyle={{ width: '50%', minWidth: 480 }}
      className={['ms-view-column-drawer', className].join(' ')}
      onOk={handleOk}
    >
      <>
        <Input.Search
          allowClear
          className="ms-view-column-group-input"
          onChange={({ target }) => {
            const value = target?.value;
            // 优化用户体验，清空的时候触发搜索
            if (isNil(value) || value === '') setKeywords(value);
          }}
          onSearch={(val) => setKeywords(val.trim())}
          placeholder={currentLocale.pleaseNameSearch}
        />
        {columnsGroupList?.length ? (
          <Collapse
            destroyInactivePanel
            bordered={false}
            expandIconPosition="end"
            ghost
            className="ms-view-column-group-collapse"
            expandIcon={({ isActive }) => {
              return isActive ? <MsArrowDownSmOutlined /> : <MsArrowRightSmOutlined />;
            }}
            defaultActiveKey={defaultActiveKey}
          >
            {columnsGroupList.map((group) => (
              <Panel key={group.groupId} header={group.groupName}>
                <div className="ms-view-column-group-list">
                  {group.columns
                    .sort((x1, x2) => (x2.order ?? 0) - (x1.order ?? 0))
                    .map((item) => {
                      const diffKey = item[COLUMN_KEY];
                      const active = columnsKeys?.some(
                        ({ dataIndex }) => dataIndex === item[COLUMN_KEY],
                      );
                      const disabled = item.columnSet?.disabled || false;
                      return (
                        <div
                          onClick={() => {
                            if (disabled) return;
                            setColumnsKeys((p: FieldListType) =>
                              active
                                ? [...p.filter(({ dataIndex }) => dataIndex !== diffKey)]
                                : [...p, { dataIndex: diffKey, value: '' }],
                            );
                          }}
                          className={cls('ms-view-column-group-item', {
                            'ms-view-column-group-item-active': active,
                            'ms-view-column-group-item-disabled': disabled,
                          })}
                          key={diffKey}
                        >
                          <span
                            dangerouslySetInnerHTML={{
                              __html: textHighlight(keywords, item?.title),
                            }}
                          />
                          {active && (
                            <MsSvg
                              className="ms-view-column-group-item-active-icon"
                              component={msViewGroupItemActive}
                            />
                          )}
                        </div>
                      );
                    })}
                </div>
              </Panel>
            ))}
          </Collapse>
        ) : (
          <MsEmpty
            className="ms-view-column-group-empty"
            description={keywords.trim() ? currentLocale.noSearchResult : currentLocale.empty}
            image={keywords.trim() ? 'search' : 'empty'}
          />
        )}
      </>
    </MsDrawer>
  );
});
