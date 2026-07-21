import { EllipsisOutlined } from '@ant-design/icons';
import type { MsDropDownButtonProps } from '../../types';
import MsDropdownWrapper from '../Wrapper';
import './index.less';

const MsDropdownButton: React.FC<MsDropDownButtonProps> = (props) => {
  const buttonsRender: MsDropDownButtonProps['buttonsRender'] = ([btn]) => {
    const newEllipsis = (
      <div className="ms-dropdown-ellipsis-btn">
        <EllipsisOutlined />
      </div>
    );
    return [btn, newEllipsis];
  };

  return <MsDropdownWrapper buttonsRender={buttonsRender} {...props} _isButton />;
};

export default MsDropdownButton;
