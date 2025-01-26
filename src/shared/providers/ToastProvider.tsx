'use client';

import { type FC, type ReactNode } from 'react';
import { Toast } from '../ui';

export const ToastProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <>
      {children}
      <Toast />
    </>
  );
};
