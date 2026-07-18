import {
  ColumnHeightOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  SettingOutlined,
  CloudDownloadOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Space, Tooltip } from 'antd';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { useMsTableToolsContext } from '../../../contexts/tools';
import type { MsTableProps } from '../../../types';
import { isNil, isObject } from 'lodash-es';
import { useMsTableToolsExtraContext } from '../../../contexts/toolsExtra';
import { useLocale } from '@jaytam/antd-ms/locale';

function MsTableTools<P, R, D>(
  props: Omit<MsTableProps<P, R, D>, 'toolbarRender'> & { toolbarRender?: ReactNode },
) {
  const { request, toolbarRender, toolbar = {} } = props;
  const {
    reload = true,
    size = true,
    setting = true,
    fullScreen = false,
    exporting = false,
  } = toolbar;

  const toolsContext = useMsTableToolsContext();
  const toolsExtraContexnt = useMsTableToolsExtraContext();
  const [hoverFullScreen, setHoverFullScreen] = useState(false);
  const { currentLocale, globalLocale } = useLocale('MsTable');

  if (!reload && !size && !setting && !fullScreen && isNil(toolbarRender)) {
    return null;
  }

  return (
    <Space align="center">
      {toolbarRender}
      {reload && request && (
        <Tooltip placement="top" title={globalLocale.flush}>
          <Button
            loading={toolsContext.reload.loading}
            onClick={() => toolsContext.reload.onReload()}
            icon={<ReloadOutlined />}
            {...(isObject(reload) ? reload.btnProps : undefined)}
          />
        </Tooltip>
      )}
      {size && (
        <Tooltip placement="top" title={currentLocale.lineHeight}>
          <Dropdown
            trigger={['click']}
            placement="bottom"
            menu={{
              defaultSelectedKeys: [toolsContext.size.size],
              onSelect: ({ key }) => toolsContext.size.setSize(key as any),
              selectable: true,
              items: [
                { key: 'small', label: currentLocale.compact },
                { key: 'middle', label: currentLocale.medium },
                { key: 'large', label: currentLocale.loose },
              ],
            }}
            overlayStyle={{ width: 100 }}
          >
            <Button
              icon={<ColumnHeightOutlined />}
              {...(isObject(size) ? size.btnProps : undefined)}
            />
          </Dropdown>
        </Tooltip>
      )}
      {setting && (
        <Tooltip placement="top" title={currentLocale.columnSetting}>
          <Button
            icon={<SettingOutlined />}
            onClick={() => toolsExtraContexnt.setting.open()}
            {...(isObject(setting) ? setting.btnProps : undefined)}
          />
        </Tooltip>
      )}

      {exporting && (
        <Tooltip placement="top" title={currentLocale.dataExport}>
          <Button
            icon={<CloudDownloadOutlined />}
            loading={toolsExtraContexnt.exporting.initialLoading}
            onClick={() => toolsExtraContexnt.exporting.open()}
            {...(isObject(exporting) ? exporting.btnProps : undefined)}
          />
        </Tooltip>
      )}

      {fullScreen && (
        <Tooltip
          open={hoverFullScreen}
          trigger={['hover']}
          onOpenChange={setHoverFullScreen}
          placement="top"
          title={
            toolsContext.fullScreen.isFullscreen
              ? globalLocale.exitFullscreen
              : globalLocale.fullscreen
          }
        >
          <Button
            icon={
              toolsContext.fullScreen.isFullscreen ? (
                <FullscreenExitOutlined />
              ) : (
                <FullscreenOutlined />
              )
            }
            onClick={() => {
              setHoverFullScreen(false);
              setTimeout(() => {
                toolsContext.fullScreen.onToggleFullscreen();
              }, 300);
            }}
            {...(isObject(fullScreen) ? fullScreen.btnProps : undefined)}
          />
        </Tooltip>
      )}
    </Space>
  );
}

export default MsTableTools;
