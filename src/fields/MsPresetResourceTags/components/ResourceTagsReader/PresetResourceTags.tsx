import { isNil } from 'lodash-es';
import Tags from '../Tags';
import { useLocale } from '@jaytam/antd-ms/locale';

type PresetResourceTagsProps = {
  value?: { key: string; value: string }[];
};

function PresetResourceTags(props: PresetResourceTagsProps) {
  const { value } = props;
  const { currentLocale } = useLocale('MsPresetResourceTags');

  if (isNil(value) || value.length === 0) {
    return <>{currentLocale.noPresetTip}</>;
  }

  return (
    <>
      <Tags items={value} />
    </>
  );
}

export default PresetResourceTags;
