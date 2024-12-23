import * as date from '$/date';
import { Json } from './json';

type HttpMethod =
| 'GET'
| 'POST'
| 'PUT'
| 'DELETE';


export const fetch = async (url: string, method: HttpMethod, body?: Json) => {
  const response = await window.fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });

  if (response.status === 401) {
    console.log('unauthorized; resetting cookies');
    document.cookie = `token=; expires=${date.zero}; path=/`;
    return { unauthorized: Symbol('unauthorized') };
  }

  if (!response.ok) {
    console.log('request failed', response.statusText);
    const error = await response.json() as { message: string };
    return { error: error.message };
  }

  return { response };
};
