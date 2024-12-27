import * as date from './date';
import * as parse from './parse';
import { Json } from './json';
import { makeFail } from './error';

type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE';

const fail = makeFail('http error');
export const unauthorized = Symbol();

export const fetch = async (url: string, method: HttpMethod, body?: Json) => {
  const result = await window.fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });

  if (result.status === 401) {
    console.log('unauthorized; resetting cookies');
    document.cookie = `token=; expires=${date.zero}; path=/`;
    return { unauthorized };
  }

  if (!result.ok) {
    console.log('request failed', result.statusText);
    const error = await result.json();

    const message = parse.object({ value: error }).property('message').string().nonEmpty();
    if (message.value !== undefined) return { error: fail({ status: result.statusText, message: message.value }) };

    return { error: fail(result.statusText) };
  }

  return { result };
};
