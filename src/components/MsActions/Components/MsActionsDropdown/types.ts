import type { ReactNode } from 'react';
import type { MsActionsProps, MsActionsRenderItems } from '../../types';

export type MsActionsDropdownProps = {
  items?: MsActionsRenderItems;
  ellipsisRender?: ReactNode;
} & Pick<
  MsActionsProps,
  'actionsType' | 'moreType' | 'size' | 'moreText' | 'moreRender' | 'moreDropDownProps'
>;
