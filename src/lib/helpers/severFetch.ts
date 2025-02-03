import { cookies } from 'next/headers';
import { handleServerApiError as apiError } from './error';
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
interface SendRequestQuery {
  populateBookings?: boolean;
}
interface SendRequestConfig {
  url: string;
  method: RequestMethod;
  body?: Record<string, unknown>;
  protected?: boolean;
  id?: string;
  query?: SendRequestQuery;
  additionalHeaders?: Record<string, string>;
}

export const sendServerRequest = async <T>(
  config: SendRequestConfig
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
  const URL = `${BaseUrl}${config.url}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Cookie: cookies().toString(),
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
    if (response.status === 401 && config.protected) {
      console.log('Retrying...');
      return await handleTokenServerRefresh(options, URL, headers);
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
const handleTokenServerRefresh = async (
  options: RequestInit,
  URL: string,
  headers: Record<string, string>
) => {
  try {
    const refreshResponse = await sendServerRequest({
      url: '/api/auth/refreshToken',
      method: 'POST',
    });
    if (refreshResponse) {
      console.log('Refresh token success:', refreshResponse);
      console.log(options, URL, headers);
      const response = await fetch(URL, { ...options, headers });

      if (!response.ok) {
        await apiError(response);
        return;
      }
      return await response.json();
    } else {
      throw new Error('Session expired. Please log in again.');
    }
  } catch (refreshError: unknown) {
    console.error('Refresh token error:', refreshError);
    throw new Error('Session expired. Please log in again.');
  }
};
