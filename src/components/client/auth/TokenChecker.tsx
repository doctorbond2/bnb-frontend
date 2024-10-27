'use client';
import { useEffect } from 'react';
import useStore from '@/lib/hooks/useStore';
import useStoreData from '@/lib/hooks/useStoreData';
import { authenicateUserTokensExpiry } from '@/lib/helpers/auth';
import { useRouter } from 'next/navigation';
export default function TokenChecker() {
  const router = useRouter();
  const { user } = useStoreData();
  const { dispatch, handleLogout } = useStore();

  useEffect(() => {
    const checkTokenExpiry = async () => {
      if (user.id) {
        const isValid = await authenicateUserTokensExpiry(dispatch);
        if (!isValid) {
          console.warn('Session expired, logging out...');
          handleLogout();
          router.push('/login');
        }
      }
    };
    checkTokenExpiry();
  }, [user, dispatch, handleLogout, router]);

  return null;
}
