import { refreshToken } from '@/redux/thunks/user';
import { logout } from '@/redux/slices/userSlice';
import localStorageHandler from './localStorage';
import { handleApiError as apiError } from './error';
import { LocalStorageKeys as key } from '@/models/enum/localstorage';
import { AppDispatch } from '@/redux/store';

export const handleTokenRefresh = async (
  dispatch: AppDispatch,
  options: RequestInit,
  URL: string,
  headers: Record<string, string>
) => {
  console.log('Retrying...');
  const refreshTokenValue = localStorageHandler.getfromStorage<string>(
    key.REFRESHTOKEN
  );

  if (refreshTokenValue) {
    try {
      const newToken = await dispatch(
        refreshToken({ refreshToken: refreshTokenValue })
      ).unwrap();
      console.log('NEW TOKEN: ', newToken);
      headers['Authorization'] = `Bearer ${newToken}`;
      headers['X-Api-Key'] = 'API_KEY';

      const response = await fetch(URL, { ...options, headers });

      if (!response.ok) {
        await apiError(response);
        return;
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
