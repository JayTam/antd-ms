import type { ReactNode } from 'react';

export type AggrSelectProps = {
  value?: string;
  onChange?: (value: string) => void;
} & { options?: { key: string; label?: ReactNode }[] };
