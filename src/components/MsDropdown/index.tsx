import { attachPropertiesToComponent } from '../MsDevopsLayout/utils';
import MsDropdownButton from './components/Button';
import MsDropdownBase from './components/Dropdown';

const MsDropdown = attachPropertiesToComponent(MsDropdownBase, {
  Button: MsDropdownButton,
});
export default MsDropdown;

export type { MsDropDownProps } from './types';
