import { AppDispatch } from '@/redux/store';
import RETRY_REFRESHTOKEN from './handleTokenRefresh';
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

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (credentials.token) {
    headers['Authorization'] = `Bearer ${credentials.token}`;
  }
  if (credentials.x_api_key) {
    headers['X-Api-Key'] = credentials.x_api_key;
  }

  const options: RequestInit = {
    method: credentials.method,
    headers,
    body: credentials.body ? JSON.stringify(credentials.body) : undefined,
  };

  const response = await fetch(URL, options);

  if (response.status === 401 && credentials.protected && dispatch) {
    return await RETRY_REFRESHTOKEN(dispatch, options, URL, headers);
  }

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
