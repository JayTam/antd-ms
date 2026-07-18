import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import cs from 'classnames';
import { useMemo, useState } from 'react';
import './index.less';
import type { AggrSelectProps } from './types';

function AggrSelect(props: AggrSelectProps) {
  const { value, onChange, options = [] } = props;
  const [open, setOpen] = useState(false);

  const currentLabel = useMemo(() => {
    const item = options.find((item) => item.key === value);
    return item ? item.label : undefined;
  }, [options, value]);

  const handleMenuClick: MenuProps['onClick'] = (event) => {
    onChange?.(event.key);
    setOpen(false);
  };

  return (
    <div className="aggr-select">
      <Dropdown
        overlayClassName="aggr-select-popover"
        open={open}
        onOpenChange={setOpen}
        menu={{ items: options, onClick: handleMenuClick }}
        getPopupContainer={(triggerNode) => triggerNode?.parentElement ?? document.body}
      >
        <div className="aggr-select-selector" data-testid={'ms-aggr-select-selector'}>
          <span className="aggr-select-value">{currentLabel}</span>
          <DownOutlined
            className={cs(
              'aggr-select-icon',
              open ? 'aggr-select-icon-up' : 'aggr-select-icon-down',
            )}
          />
        </div>
      </Dropdown>
    </div>
  );
}

export default AggrSelect;
