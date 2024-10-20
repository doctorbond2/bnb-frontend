import { AppDispatch } from '@/redux/store';
import RETRY_REFRESHTOKEN from './handleTokenRefresh';
import localStorageHandler from './localStorage';
import { LocalStorageKeys as key } from '@/models/enum/localstorage';
import { handleApiError as apiError } from './error';
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export interface SendRequestCredentials {
  url: string;
  method: RequestMethod;
  body?: Record<string, unknown>;
  token?: string;
  x_api_key?: string;
  protected?: boolean;
}
export const sendRequest = async <T>(
  credentials: SendRequestCredentials,
  dispatch?: AppDispatch
): Promise<T> => {
  const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const URL = `${BaseUrl}${credentials.url}`;
  const token =
    credentials.token || localStorageHandler.getfromStorage(key.TOKEN);
  const api_key = credentials.x_api_key || process.env.NEXT_PUBLIC_X_API_KEY;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (api_key) {
    headers['X-Api-Key'] = api_key;
    console.log('api key:', api_key);
  }

  const options: RequestInit = {
    method: credentials.method,
    headers,
    body: credentials.body ? JSON.stringify(credentials.body) : undefined,
  };
  try {
    const response = await fetch(URL, options);
    console.log('RESPONSE: ', response);

    if (response.status === 401 && credentials.protected && dispatch) {
      console.log('retrying');
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
