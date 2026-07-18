import type { MsDropDownProps } from '../../types';
import Trigger from '../Trigger';
import MsDropdownWrapper from '../Wrapper';

const MsDropdown: React.FC<MsDropDownProps> = (props) => {
  const {
    children,
    type,
    triggerArrow = true,
    triggerArrowStyle,
    triggerClassName,
    onTriggerClick,
    triggerStyle,
    buttonType,
    ...restProps
  } = props;

  const renderChildren = type
    ? ({ open: innerOpen }: { open: boolean }) => {
        return (
          <Trigger
            type={type}
            buttonType={buttonType}
            disabled={props.disabled}
            className={triggerClassName}
            arrowStyle={triggerArrowStyle}
            onClick={onTriggerClick}
            arrow={triggerArrow}
            style={triggerStyle}
            rotate={props.open ?? innerOpen}
          >
            {children}
          </Trigger>
        );
      }
    : () => children;

  return <MsDropdownWrapper {...restProps} renderChildren={renderChildren} />;
};

export default MsDropdown;
