import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { ToastProvider } from '@/shared/providers';
import './globals.scss';

export const metadata: Metadata = {
  title: 'JWT based authorization',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <SessionProvider>
          <ToastProvider>{children}</ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
