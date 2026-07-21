import type { RowProps } from 'antd';
import { Col, Row } from 'antd';

import { TABLE_SPACE } from '../../constants';

import type { ReactNode } from 'react';
import { isUndefined } from 'lodash-es';

type QueryFilterLayoutProps = {
  barRender?: ReactNode;
  filterRender?: ReactNode;

  creatorRender?: ReactNode;
  menuRender?: ReactNode;
  menuPosition?: 'top' | 'filter';
  toolRender?: ReactNode;
  formRender?: ReactNode;
  tagsRender?: ReactNode;
  /** 整行方向反转 */
  rowReverse?: boolean;
};

/**
 * 表格筛选区域的布局
 */
function QueryFilterLayout(props: QueryFilterLayoutProps) {
  const {
    barRender,
    filterRender,
    menuRender,
    menuPosition = 'top',
    creatorRender,
    formRender,
    tagsRender,
    toolRender,
    rowReverse,
  } = props;

  const filterFormRender = isUndefined(filterRender) ? formRender : filterRender;

  const baseRowProps: RowProps = {
    align: 'top',
    wrap: false,
    gutter: [TABLE_SPACE / 2, TABLE_SPACE / 2],
  };

  // ================ 菜单在顶部 =======================
  if (menuPosition === 'top') {
    return (
      <>
        {menuPosition === 'top' && menuRender && (
          <div style={{ paddingBottom: TABLE_SPACE }}>{menuRender}</div>
        )}
        {isUndefined(barRender) ? (
          <div className="ms-table-filter">
            <Row
              {...baseRowProps}
              justify="space-between"
              style={{
                paddingBottom: TABLE_SPACE,
                flexDirection: rowReverse ? 'row-reverse' : undefined,
              }}
            >
              <Col>
                <Row {...baseRowProps}>
                  {/* 创建按钮 */}
                  {creatorRender && <Col>{creatorRender}</Col>}
                  {/* 筛选器 */}
                  {filterFormRender && <Col>{filterFormRender}</Col>}
                </Row>
              </Col>
              {/* 工具 */}
              {toolRender && <Col>{toolRender}</Col>}
            </Row>
            {tagsRender}
          </div>
        ) : (
          barRender
        )}
      </>
    );
  }

  // ================ 菜单在筛选器中 =======================
  return (
    <>
      {isUndefined(barRender) ? (
        <div className="ms-table-filter">
          <Row
            {...baseRowProps}
            justify="space-between"
            style={{
              paddingBottom: TABLE_SPACE,
              flexDirection: rowReverse ? 'row-reverse' : undefined,
            }}
          >
            {menuRender ? (
              <>
                <Col>
                  <Row {...baseRowProps}>
                    {/* 筛选器 */}
                    {filterFormRender && <Col>{filterFormRender}</Col>}
                    {/* 工具 */}
                    {toolRender && <Col>{toolRender}</Col>}
                    {/* 创建按钮 */}
                    {creatorRender && <Col>{creatorRender}</Col>}
                  </Row>
                </Col>
                {/* 菜单 */}
                {menuRender && <Col>{menuRender}</Col>}
              </>
            ) : (
              <>
                <Col>
                  <Row {...baseRowProps}>
                    {/* 工具 */}
                    {toolRender && <Col>{toolRender}</Col>}
                    {/* 创建按钮 */}
                    {creatorRender && <Col>{creatorRender}</Col>}
                  </Row>
                </Col>
                {/* 筛选器 */}
                {filterFormRender && <Col>{filterFormRender}</Col>}
              </>
            )}
          </Row>
          {/* 筛选标签 */}
          {tagsRender}
        </div>
      ) : (
        barRender
      )}
    </>
  );
}

export default QueryFilterLayout;
