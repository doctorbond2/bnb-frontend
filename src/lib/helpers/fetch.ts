const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export const sendRequest = async <T>(
  url: string,
  method: RequestMethod,
  body?: T,
  token?: string
) => {
  const URL = `${BaseUrl}${url}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const options: RequestInit = {
    method: method,
    headers,
  };
  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }
  const response = await fetch(URL, options);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};
