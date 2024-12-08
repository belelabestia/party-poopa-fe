import * as err from 'modules/error';
import * as date from 'modules/date';

type CreateBody = { username: string, password: string };
export type AdminsResult = { id: number, username: string }[];

export const getAllAdmins = async () => {
  console.log('calling get all admins endpoint');

  try {
    const res = await fetch('be/admin', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.status === 401) {
      console.log('user unauthenticated');
      document.cookie = `token=; expires=${date.zero}; path=/`;
      return { unauthenticated: true };
    }

    if (!res.ok) {
      console.log('get all admins request failed');
      return { error: err.make('get all admins request failed') };
    }

    const admins = await res.json() as AdminsResult;
    console.log('get all admins request succeeded');
    return { admins };
  }
  catch (error) {
    console.error('get all admins request failed', error);
    return { error: err.coalesce(error) };
  }
};

export const createAdmin = async (data: CreateBody) => {
  console.log('calling create admin endpoint');

  try {
    const res = await fetch('be/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.status === 401) {
      console.log('user unauthenticated');
      document.cookie = '';
      return { unauthenticated: true };
    }

    if (!res.ok) {
      console.log('create admin request failed');
      return { error: err.make('create admin request failed') };
    }

    const admin = await res.json() as { id: number };
    console.log('create admin request succeeded');
    return { admin };
  }
  catch (error) {
    console.error('create admin request failed', error);
    return { error: err.coalesce(error) };
  }
};

export const updateAdmin = async () => {
  console.log('calling update admin endpoint');

  try {
    const res = await fetch('be/admin', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.status === 401) {
      console.log('user unauthenticated');
      document.cookie = '';
      return { unauthenticated: true };
    }

    if (!res.ok) {
      console.log('update admin request failed');
      return { error: err.make('update admin request failed') };
    }
  }
  catch (error) {
    console.error('update admin request failed', error);
    return { error: err.coalesce(error) };
  }
};

export const deleteAdmin = async () => {
  console.log('calling delete admin endpoint');

  try {
    const res = await fetch('be/admin', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.status === 401) {
      console.log('user unauthenticated');
      document.cookie = '';
      return { unauthenticated: true };
    }

    if (!res.ok) {
      console.log('delete admin request failed');
      return { error: err.make('delete admin request failed') };
    }
  }
  catch (error) {
    console.error('delete admin request failed', error);
    return { error: err.coalesce(error) };
  }
};
