import type { Metadata } from 'next';
import './globals.css';
import HeaderLayout from '@/components/client/header/HeaderLayout';
import StoreProvider from '@/redux/StoreProvider';
import 'flatpickr/dist/flatpickr.min.css';
export const metadata: Metadata = {
  title: 'BNB',
  description: 'Michael Lennartz BNB APP',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <HeaderLayout />
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
