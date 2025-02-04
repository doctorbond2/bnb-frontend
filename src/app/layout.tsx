import type { Metadata } from 'next';
import './globals.css';
import HeaderLayout from '@/components/client/header/HeaderLayout';
import FooterLayout from '@/components/client/footer/FooterLayout';
import StoreProvider from '@/redux/StoreProvider';
import BookingFetcher from '@/components/client/update/AutoFetchBookings';
import 'flatpickr/dist/flatpickr.min.css';
import AdminChecker from '@/components/client/auth/AdminChecker';
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
          <AdminChecker />
          <TokenChecker />
          <HeaderLayout />
          <div className=" py-4 bg-slate-100 min-h-[100vh]">{children}</div>
          <FooterLayout />
        </body>
      </html>
    </StoreProvider>
  );
}
