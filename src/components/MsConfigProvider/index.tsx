import type { ComponentType } from 'react';
import InternalMsModal, { setConfig, useConfig } from './provider';
import type { MsConfigProviderProps } from './types';

type MsConfigProviderComponent = ComponentType<MsConfigProviderProps> & {
  useConfig: typeof useConfig;
  setConfig: typeof setConfig;
};

const MsConfigProvider = InternalMsModal as unknown as MsConfigProviderComponent;

MsConfigProvider.useConfig = useConfig;
MsConfigProvider.setConfig = setConfig;

export { useConfig };

export default MsConfigProvider;
