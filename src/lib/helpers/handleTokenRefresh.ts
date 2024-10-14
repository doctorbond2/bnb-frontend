import { refreshToken } from '@/redux/thunks/user';
import { logout } from '@/redux/slices/userSlice';
import localStorageHandler from './localStorage';
import { LocalStorageKeys as key } from '@/models/enum/localstorage';
import { AppDispatch } from '@/redux/store';

export const handleTokenRefresh = async (
  dispatch: AppDispatch,
  options: RequestInit,
  URL: string,
  headers: Record<string, string>
) => {
  const refreshTokenValue = localStorageHandler.getfromStorage<string>(
    key.REFRESHTOKEN
  );

  if (refreshTokenValue) {
    try {
      const newToken = await dispatch(
        refreshToken({ refreshToken: refreshTokenValue })
      ).unwrap();

      headers['Authorization'] = `Bearer ${newToken}`;

      const response = await fetch(URL, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (refreshError: unknown) {
      console.error('Refresh token error:', refreshError);
      dispatch(logout());
      throw new Error('Session expired. Please log in again.');
    }
  } else {
    throw new Error('No refresh token available. Please log in again.');
  }
};
export default handleTokenRefresh;
