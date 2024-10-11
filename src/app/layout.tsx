import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from '@/redux/StoreProvider';
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
        <body>{children}</body>
      </html>
    </StoreProvider>
  );
}
