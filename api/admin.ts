import * as err from 'modules/error';

type CreateBody = { username: string, password: string };
export type AdminsResult = { id: number, username: string }[];

export const getAllAdmins = async () => {
  console.log('calling get all admins endpoint');

  try {
    const res = await fetch('be/admin', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      console.log('get all admins request failed');
      return { error: err.make('get all admins request failed') };
    }

    const payload = await res.json() as AdminsResult;
    console.log('get all admins request succeeded');
    return { payload };
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

    if (!res.ok) {
      console.log('create admin request failed');
      return { error: err.make('create admin request failed') };
    }

    const payload = await res.json();
    console.log('create admin request succeeded');
    return { payload };
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

    if (!res.ok) {
      console.log('update admin request failed');
      return err.make('update admin request failed');
    }
  }
  catch (error) {
    console.error('update admin request failed', error);
    return err.coalesce(error);
  }
};

export const deleteAdmin = async () => {
  console.log('calling delete admin endpoint');

  try {
    const res = await fetch('be/admin', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      console.log('delete admin request failed');
      return err.make('delete admin request failed');
    }
  }
  catch (error) {
    console.error('delete admin request failed', error);
    return err.coalesce(error);
  }
};
