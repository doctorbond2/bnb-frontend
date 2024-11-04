import type { Metadata } from 'next';
import './globals.css';
import HeaderLayout from '@/components/client/header/HeaderLayout';
import StoreProvider from '@/redux/StoreProvider';
import BookingFetcher from '@/components/client/update/AutoFetchBookings';
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
          <BookingFetcher />
          <TokenChecker />
          <HeaderLayout />
          <div className=" py-4 bg-slate-100 min-h-[100vh]">{children}</div>
        </body>
      </html>
    </StoreProvider>
  );
}
