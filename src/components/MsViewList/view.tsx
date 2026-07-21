import { EllipsisOutlined } from '@ant-design/icons/lib/icons';
import { ReactComponent as msViewAdd } from '../../assets/icons/ms-view-add.svg';
import { ReactComponent as msViewSort } from '../../assets/icons/ms-view-sort.svg';
import { MsAskQuestionOutlined, MsSvg } from '@jaytam/icons';
import { useControllableValue, useUpdateEffect } from 'ahooks';
import { Button, Dropdown, Spin, Tooltip } from 'antd';
import cls from 'classnames';
import { isFunction } from 'lodash-es';
import type { Key } from 'react';
import { useCallback, useImperativeHandle, useRef } from 'react';
import MsConfirm from '../MsConfirm';
import MsEmpty from '../MsEmpty/empty';
import MsModal from '../MsModal';
import MsSortable from '../MsSortable';
import MsStatus from '../MsStatus/status';
import { MsConfirmModal } from '../MsTable/components/MsTableFilter/forms/MsTableViewForm/components/MsConfirmModal';
import useViewRequest from '../MsTableView/hooks/useViewRequest';
import { MyModal } from './components/SortModal';
import { ViewModal } from './components/ViewModal';
import { FIELD_NAMES, getViewDefaultMenu } from './constants';
import './index.less';
import type { MsViewListItemType, MsViewListProps, ViewOperationType } from './types';
import { mergeMenu } from './utils';
import { useLocale } from '@jaytam/antd-ms/locale';

const MsViewList = (props: MsViewListProps) => {
  const { currentLocale, globalLocale } = useLocale('MsViewList');
  const {
    items: dataSource,
    title = currentLocale.view,
    style = {},
    className,
    actionRef,
    loading: viewLoading,
    tipsable = true,
    addable = true,
    sortable = true,
    showHead = true,
    actionBtnPosition = true,
    renderHead,
    onTips,
    iconTips = {},
    fieldNames: _fieldNames = {},
    sortableProps = {},
    sortModalProps = {},
    onAddView,
    onEditView,
    onDeleteView,
    renderItem,
    request,
    viewListSortable = false,
    viewItemDropDownMeun = [],
    onRefresh,
    onSortView,
  } = props;
  const fieldNames = { ...FIELD_NAMES, ..._fieldNames };
  const tipsText = {
    tipsText: currentLocale.tipsText,
    addText: currentLocale.addText,
    sortText: currentLocale.sortText,
    emptyText: currentLocale.emptyText,
    ...iconTips,
  };

  const msviewRef = useRef<HTMLDivElement>(null);
  const [items, onChangeSort] = useControllableValue<MsViewListItemType[]>(props, {
    defaultValue: [],
    valuePropName: 'items',
    trigger: 'onChangeSort',
  });

  const [loading, setLoading] = useControllableValue<boolean>(props, {
    defaultValue: isFunction(request),
    valuePropName: 'loading',
    trigger: 'setLoading',
  });

  const [active, setActive] = useControllableValue<Key>(props, {
    defaultValue: items.length ? items[0][fieldNames.id!] : undefined,
    valuePropName: 'activeId',
    trigger: 'onClickViewRow',
  });

  // 请求数据
  const { data, refreshAsync } = useViewRequest({
    ...props,
    dataSource,
    setLoading: setLoading,
  });
  // 刷新数据
  const handleRefresh = () => {
    if (isFunction(request)) {
      refreshAsync();
    } else {
      onRefresh?.();
    }
  };

  // 打开弹窗
  const handleOpenSortModal = () => {
    MsModal.open(MyModal, {
      title: tipsText?.sortText,
      emptyText: tipsText?.emptyText,
      items,
      fieldNames,
      onSortView,
      onChangeSort,
      sortableProps,
      sortModalProps,
      handleRefresh,
    });
  };

  // 置顶
  const handleItemTop = (record: MsViewListItemType) => {
    const list = [...items];
    const id = record[fieldNames.id!];
    const index = list.findIndex((item) => item[fieldNames.id] === id);
    if (index > -1) {
      const item = list.splice(index, 1)[0];
      list.unshift(item);
      onSortView?.(list);
      onChangeSort(list);
    }
  };

  // 新建弹窗
  const openModal = (type: ViewOperationType = 'add', data = {}) => {
    MsModal.open(ViewModal, {
      data,
      type,
      fieldNames,
      handleRefresh,
      onViewAction: type === 'add' ? onAddView : onEditView,
    });
  };

  // 点击菜单
  const handleMenu = ({ key, domEvent }: any, record: MsViewListItemType) => {
    switch (key) {
      case 'top':
        handleItemTop(record);
        break;
      case 'del':
        MsConfirm.open(MsConfirmModal, {
          data: record,
          type: key,
          onFinish: onDeleteView,
          onRefresh: handleRefresh,
          title: globalLocale.tip,
          content: currentLocale.deleteConfirm,
        });
        break;
      case 'edit':
        openModal('edit', record);
        break;
      case 'sort':
        handleOpenSortModal();
        break;
      default:
        break;
    }
    domEvent?.stopPropagation();
  };

  const renderMenu = useCallback(
    (item: MsViewListItemType, index: number) => {
      const VIEW_DEFAULT_MENU = getViewDefaultMenu(globalLocale);
      const res =
        typeof viewItemDropDownMeun === 'function'
          ? mergeMenu(viewItemDropDownMeun(item, index), VIEW_DEFAULT_MENU)
          : mergeMenu(viewItemDropDownMeun, VIEW_DEFAULT_MENU);
      return res.filter((item) => !Boolean(item?.hidden));
    },
    [viewItemDropDownMeun, globalLocale],
  );
  // 修改视图某个item的数量
  const onChangeViewCount = (viewId?: Key, newCount?: Key) => {
    const arr = items.map((item) => {
      const obj = { ...item };
      if (viewId === item[fieldNames.id!]) {
        obj[fieldNames.count] = newCount;
      }
      return obj;
    });
    onChangeSort(arr);
  };

  // 渲染item
  const renderViewItem = (item: MsViewListItemType, idx: number) => {
    const id = item[fieldNames.id!];
    const title = item[fieldNames.title!];
    const tag = item[fieldNames.tag!];
    const count = item[fieldNames.count!];
    const isActive = id === active;
    const items = renderMenu(item, idx) || [];
    const showDropDown = items?.length > 0;
    return (
      <div
        key={id}
        id={`ms-view-list-item${id}`}
        className={cls('ms-view-list-item', {
          'ms-view-list-item-active': isActive,
          'ms-view-list-item-show-dropdown': showDropDown,
        })}
        onClick={() => setActive(id, item, idx)}
      >
        <div className="ms-view-list-item-title-wrapper">
          <div className="ms-view-list-item-title">{title}</div>
          {tag ? <MsStatus type="tag">{tag}</MsStatus> : null}
        </div>
        <div className="ms-view-list-item-tool">
          {![undefined, null].includes(count) && (
            <div className="ms-view-list-item-count">{count}</div>
          )}
          {showDropDown && (
            <div className="ms-view-list-item-more">
              <Dropdown
                overlayClassName="ms-view-list-dropdown"
                placement="bottomLeft"
                overlayStyle={{ zIndex: 1 }}
                getPopupContainer={() => msviewRef?.current as HTMLDivElement}
                trigger={['hover']}
                menu={{
                  items,
                  onClick: (info) => handleMenu(info, item),
                }}
              >
                <EllipsisOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              </Dropdown>
            </div>
          )}
        </div>
      </div>
    );
  };

  // 将刷新操作抛出去方便外部调用
  useImperativeHandle(actionRef, () => ({
    handleRefresh,
    onChangeViewCount,
  }));

  // 保存请求后的数据
  useUpdateEffect(() => {
    onChangeSort(data || []);
  }, [data]);

  // 请求数据后设置active
  useUpdateEffect(() => {
    if (items?.length) {
      if (active) {
        const index = items.findIndex((item) => item[fieldNames.id] === active);
        if (index === -1) setActive(items[0][fieldNames.id!]);
      } else {
        setActive(items[0][fieldNames.id!]);
      }
    } else {
      setActive('');
    }
  }, [items, active]);
  return (
    <Spin spinning={viewLoading ?? loading} wrapperClassName="ms-view-list-loading">
      <div ref={msviewRef} className={['ms-view-list', className].join(' ')} style={{ ...style }}>
        {showHead && actionBtnPosition && (
          <>
            {renderHead ?? (
              <div className="ms-view-list-header">
                <div className="ms-view-list-title">
                  <div className="ms-view-list-title-text">{title}</div>
                  {tipsable && (
                    <Tooltip title={tipsText.tipsText}>
                      <div onClick={onTips} className="ms-view-list-tips-icon">
                        <MsAskQuestionOutlined />
                      </div>
                    </Tooltip>
                  )}
                </div>
                {(addable || sortable) && (
                  <div className="ms-view-list-icon">
                    {addable ? (
                      <Tooltip title={tipsText.sortText}>
                        <div onClick={handleOpenSortModal}>
                          <MsSvg className="ms-view-list-sort" component={msViewSort} />
                        </div>
                      </Tooltip>
                    ) : null}
                    {sortable ? (
                      <Tooltip title={tipsText.addText}>
                        <MsSvg
                          onClick={() => openModal()}
                          className="ms-view-list-add"
                          component={msViewAdd}
                        />
                      </Tooltip>
                    ) : null}
                  </div>
                )}
              </div>
            )}
          </>
        )}
        <div className="ms-view-list-list">
          {items?.length ? (
            <MsSortable
              items={items}
              isShowTopIcon={false}
              fieldNames={fieldNames}
              disabledItemStyle={{ cursor: 'unset' }}
              disabledItem={() => !viewListSortable}
              className={'ms-view-list-sortable-container'}
              onChange={(item) => {
                onChangeSort(item);
                onSortView?.(item);
              }}
              renderItem={renderItem ?? renderViewItem}
            />
          ) : (
            <div className="ms-view-list-empty">
              <MsEmpty
                onLink={() => openModal()}
                linkText={currentLocale.toAdd}
                description={tipsText.emptyText}
              />
            </div>
          )}
        </div>
        {showHead && !actionBtnPosition && (
          <div className="ms-view-list-other-tool">
            {(addable || sortable) && (
              <>
                {addable && (
                  <Button
                    type="text"
                    className="ms-view-list-other-btn"
                    onClick={() => openModal()}
                    icon={<MsSvg className="ms-view-list-icon" component={msViewAdd} />}
                  >
                    {tipsText.addText}
                  </Button>
                )}
                {sortable && (
                  <Button
                    type="text"
                    className="ms-view-list-other-btn"
                    onClick={handleOpenSortModal}
                    icon={<MsSvg className="ms-view-list-icon" component={msViewSort} />}
                  >
                    {tipsText.sortText}
                  </Button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </Spin>
  );
};

export default MsViewList;
