import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import ResourceTagsEditor from './components/ResourceTagsEditor';
import ResourceTagsReader from './components/ResourceTagsReader';

import type { MsPresetResourceTagsProps } from './types';

const MsPresetResourceTags = (props: MsPresetResourceTagsProps) => {
  const { fieldProps, editable } = props;

  const editDom = <ResourceTagsEditor {...fieldProps} />;
  const readDom = <ResourceTagsReader {...fieldProps} editable={editable} />;

  return useModeRender(props, editDom, readDom);
};

export default enhanceField(MsPresetResourceTags);
