import { AppDispatch } from '@/redux/store';
import RETRY_REFRESHTOKEN from './handleTokenRefresh';
import { handleApiError as apiError } from './error';
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export interface SendRequestConfig {
  url: string;
  method: RequestMethod;
  body?: Record<string, unknown>;
  token?: string;
  x_api_key?: string;
  protected?: boolean;
}
export const sendRequest = async <T>(
  config: SendRequestConfig,
  dispatch?: AppDispatch
): Promise<T> => {
  const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const URL = `${BaseUrl}${config.url}`;
  // const token = config.token || localStorageHandler.getfromStorage(key.TOKEN);
  // const api_key = config.x_api_key || process.env.NEXT_PUBLIC_X_API_KEY;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const options: RequestInit = {
    method: config.method,
    headers,
    body: config.body ? JSON.stringify(config.body) : undefined,
    credentials: 'include',
  };

  try {
    const response = await fetch(URL, options);

    if (response.status === 401 && config.protected && dispatch) {
      return await RETRY_REFRESHTOKEN(dispatch, options, URL, headers);
    }

    if (!response.ok) {
      await apiError(response);
    } else {
      const data = await response.json();
      console.log('Success:', data);
      return data;
    }
  } catch (err) {
    console.error('Network or server error:', err);
    throw new Error('Network or server error');
  }
  throw new Error('Unexpected error');
};
