import * as err from '$/error';

export type Admin = { username: string, password: string };

export const login = async (data: Admin) => {
  console.log('calling login endpoint');

  try {
    const res = await fetch('/be/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.status === 401) {
      console.log('wrong credentials');
      return { unauthorized: true };
    };

    if (!res.ok) {
      console.error('login request failed', res.statusText);
      return { error: err.make('login request failed') };
    }
  }
  catch (error) {
    console.error('login request failed', error);
    return { error: err.coalesce(error) };
  }
};

export const logout = async () => {
  console.log('calling logout endpoint');

  try {
    const res = await fetch('/be/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.status === 401) {
      console.log('user already unauthenticated');
      document.cookie = '';
      return;
    };

    if (!res.ok) {
      console.error('logout request failed', res.statusText);
      return err.make('logout request failed');
    }
  }
  catch (error) {
    console.error('logout request failed', error);
    return err.coalesce(error);
  }
};
