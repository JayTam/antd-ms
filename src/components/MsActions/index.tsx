import type { ComponentType } from 'react';
import MsActionButton from './Components/MsActionButton';
import Component from './actions';
import type { MsActionsProps } from './types';

type CompoundedComponent = ComponentType<MsActionsProps> & { Button: typeof MsActionButton };

const MsActions = Component as CompoundedComponent;

MsActions.Button = MsActionButton;

export default MsActions;

export type { MsActionsProps, MsActionsItemType, MsActionsItems } from './types';
