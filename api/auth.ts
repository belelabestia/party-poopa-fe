import * as err from 'modules/error';
import { headers } from './common';

export type Admin = { username: string, password: string };

export const register = async (data: Admin) => {
  console.log('calling register endpoint');

  try {
    const res = await fetch('be/auth/register', {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      console.log('register request failed');
      return { error: err.make('register request failed')};
    }

    const payload = await res.json();
    console.log('register request succeded');
    return { payload };
  }
  catch (error) {
    console.error('register request failed', error);
    return { error: err.coalesce(error) };
  }
};

export const login = async (data: Admin) => {
  console.log('calling login endpoint');

  try {
    const res = await fetch('be/auth/login', {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      console.log('login request failed');
      return err.make('login request failed');
    }
  }
  catch (error) {
    console.error('login request failed', error);
    return err.coalesce(error);
  }
};
