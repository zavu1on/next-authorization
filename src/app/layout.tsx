import type { Metadata } from 'next';
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
        <QueryProvider>
          <ToastProvider>{children}</ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
