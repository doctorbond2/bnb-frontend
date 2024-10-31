import { logout } from '@/redux/slices/userSlice';
import { handleApiError as apiError } from './error';
import { refreshTokenRequest } from './auth';
import { AppDispatch } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks';
export const RETRY_REFRESHTOKEN = async (
  dispatch: AppDispatch,
  options: RequestInit,
  URL: string,
  headers: Record<string, string>
) => {
  console.log('Retrying...');

  try {
    const refreshResponse = await refreshTokenRequest();
    if (refreshResponse) {
      console.log('Refresh token success CLIENT');
      const response = await fetch(URL, { ...options, headers });

      if (!response.ok) {
        await apiError(response);
        return;
      }
      return await response.json();
    } else {
      dispatch(logout());
      throw new Error('Session expired. Please log in again.');
    }
  } catch (refreshError: unknown) {
    console.error('Refresh token error:', refreshError);
    dispatch(logout());
    throw new Error('Session expired. Please log in again.');
  }
};
