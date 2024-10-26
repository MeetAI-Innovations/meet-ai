'use client';

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}