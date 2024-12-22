// src/components/ClientProvider.tsx
"use client";

import { Provider } from 'react-redux';
import { store } from '@/features/redux/store';

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}