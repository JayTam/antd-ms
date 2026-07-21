import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import ResourceTagsEditor from './components/ResourceTagsEditor';
import ResourceTagsReader from './components/ResourceTagsReader';

import type { MsResourceTagsProps } from './types';

const MsResourceTags = (props: MsResourceTagsProps) => {
  const { fieldProps, editable } = props;

  const editDom = <ResourceTagsEditor {...fieldProps} />;
  const readDom = <ResourceTagsReader {...fieldProps} editable={editable} />;

  return useModeRender(props, editDom, readDom);
};

export default enhanceField(MsResourceTags);
