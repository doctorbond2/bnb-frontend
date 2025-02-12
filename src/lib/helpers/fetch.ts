import { AppDispatch } from '@/redux/store';
import { RETRY_REFRESHTOKEN } from './handleTokenRefresh';
import { handleApiError as apiError } from './error';
import localStorageHandler from './localStorage';
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export interface SendRequestConfig {
  url: string;
  method: RequestMethod;
  body?: Record<string, unknown>;
  protected?: boolean;
  id?: string;
  query?: SendRequestQuery;
  searchQuery?: string;
  additionalHeaders?: Record<string, string>;
}
export interface SendRequestQuery {
  populateBookings?: boolean;
  soft?: boolean;
  purge?: boolean;
  status?: string;
}
export const sendRequest = async <T>(
  config: SendRequestConfig,
  dispatch?: AppDispatch
): Promise<T> => {
  const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  if (config.id) {
    config.url = config.url.replace(':id', config.id);
  }
  if (config.query) {
    const params = new URLSearchParams();
    Object.entries(config.query).forEach(([key, value]) => {
      params.append(key, value);
    });
    config.url = `${config.url}?${params.toString()}`;
  }
  if (config.searchQuery) {
    config.url = `${config.url}?searchQuery=${config.searchQuery}`;
  }
  const URL = `${BaseUrl}${config.url}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorageHandler.getToken() || ''}`,
    'x-api-key': localStorageHandler.getApiKey() || '',
    ...config.additionalHeaders,
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
      console.log('401 error, retrying with refresh token');
      return await RETRY_REFRESHTOKEN(dispatch, options, URL, {
        ...headers,
        refreshToken: localStorageHandler.getRefreshToken() || '',
      });
    }

    if (!response.ok) {
      await apiError(response);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.error('Network or server error:', err);
    throw new Error('Network or server error');
  }
  throw new Error('Unexpected error');
};
