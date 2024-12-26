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
      return { error: 'login request failed' };
    }
  }
  catch (error) {
    console.error('login request failed', error);
    return { error };
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
      return 'logout request failed';
    }
  }
  catch (error) {
    console.error('logout request failed', error);
    return error;
  }
};
