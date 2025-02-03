'use client';

import { useEffect } from 'react';
import useStoreData from '@/lib/hooks/useStoreData';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import localStorageHandler from '@/lib/helpers/localStorage';
import { LocalStorageKeys } from '@/models/enum/localstorage';

export default function AdminChecker() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, userLoading } = useStoreData();

  useEffect(() => {
    const isAdmin = localStorageHandler.getfromStorage<string>(
      LocalStorageKeys.ADMIN_ACCESS
    );
    if (!isAdmin && pathname.includes('/admin')) {
      router.push('/');
    }
  }, [user, router, pathname, userLoading]);

  return null;
}
