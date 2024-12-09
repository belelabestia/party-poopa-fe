import * as err from 'modules/error';
import { fetch } from 'modules/http';

type CreateBody = { username: string, password: string };
type UpdateBody = { id: number, username: string, password: string };

export const getAllAdmins = async () => {
  console.log('calling get all admins endpoint');

  try {
    const { error, unauthorized, response } = await fetch('be/admin', 'GET');

    if (unauthorized) return { unauthorized: true };

    if (error) {
      console.log('get all admins request failed');
      return { error: err.make('get all admins request failed') };
    }

    const admins = await response!.json() as { id: number, username: string }[];
    console.log('get all admins request succeeded');
    return { admins };
  }
  catch (error) {
    console.error('get all admins request failed', error);
    return { error: err.coalesce(error) };
  }
};

export const createAdmin = async (body: CreateBody) => {
  console.log('calling create admin endpoint');

  try {
    const { error, unauthorized, response } = await fetch('be/admin', 'POST', body);

    if (unauthorized) return { unauthenticated: true };

    if (error) {
      console.log('create admin request failed');
      return { error: err.make('create admin request failed') };
    }

    const admin = await response!.json() as { id: number };
    console.log('create admin request succeeded');
    return { admin };
  }
  catch (error) {
    console.error('create admin request failed', error);
    return { error: err.coalesce(error) };
  }
};

export const updateAdmin = async (body: UpdateBody) => {
  console.log('calling update admin endpoint');

  try {
    const { unauthorized, error } = await fetch(`be/admin/${body.id}`, 'PUT', body);

    if (unauthorized) return { unauthenticated: true };

    if (error) {
      console.log('update admin request failed');
      return { error: err.make('update admin request failed') };
    }
  }
  catch (error) {
    console.error('update admin request failed', error);
    return { error: err.coalesce(error) };
  }
};

export const deleteAdmin = async (id: number) => {
  console.log('calling delete admin endpoint');

  try {
    const { unauthorized, error } = await fetch(`be/admin/${id}`, 'DELETE');

    if (unauthorized) return { unauthenticated: true };

    if (error) {
      console.log('delete admin request failed');
      return { error: err.make('delete admin request failed') };
    }
  }
  catch (error) {
    console.error('delete admin request failed', error);
    return { error: err.coalesce(error) };
  }
};
