import { useAppDispatch } from '@/redux/hooks';
import { logout, checkUserLocalStorage } from '@/redux/slices/userSlice';

import { refreshToken } from '@/redux/thunks/user';
import { checkBookingLocalStorage } from '@/redux/slices/bookingSlice';
import { checkPropertyLocalStorage } from '@/redux/slices/propertySlice';

function useStore() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const handleRefreshToken = () => {
    return dispatch(refreshToken()).unwrap();
  };

  const checkUserState = () => {
    dispatch(checkUserLocalStorage());
  };

  const checkPropertyState = () => {
    dispatch(checkPropertyLocalStorage());
  };

  const checkBookingState = () => {
    dispatch(checkBookingLocalStorage());
  };

  return {
    handleLogout,
    handleRefreshToken,
    checkUserState,
    checkPropertyState,
    checkBookingState,
    dispatch,
  };
}

export default useStore;
