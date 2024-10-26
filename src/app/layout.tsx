import type { Metadata } from 'next';
import './globals.css';
import HeaderLayout from '@/components/client/header/HeaderLayout';
import StoreProvider from '@/redux/StoreProvider';
import 'flatpickr/dist/flatpickr.min.css';
import TokenChecker from '@/components/client/auth/TokenChecker';
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
          <TokenChecker />
          <HeaderLayout />
          <div className="md:px-3">{children}</div>
        </body>
      </html>
    </StoreProvider>
  );
}
