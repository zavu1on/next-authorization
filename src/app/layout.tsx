import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { QueryProvider, ToastProvider } from '@/shared/providers';
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
          <QueryProvider>
            <ToastProvider>{children}</ToastProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
