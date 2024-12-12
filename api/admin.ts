import * as err from 'modules/error';
import { fetch } from 'modules/http';

type CreateBody = { username: string, password: string };

export const getAllAdmins = async () => {
  console.log('calling get all admins endpoint');

  try {
    const { error, unauthorized, response } = await fetch('/be/admin', 'GET');

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
    const { error, unauthorized, response } = await fetch('/be/admin', 'POST', body);

    if (unauthorized) return { unauthorized: true };

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

export const updateAdminUsername = async (body: { id: number, username: string }) => {
  console.log('calling update admin username endpoint');

  try {
    const { unauthorized, error } = await fetch(`/be/admin/${body.id}/username`, 'PUT', body);

    if (unauthorized) return { unauthorized: true };

    if (error) {
      console.log('update admin username request failed');
      return { error: err.make('update admin username request failed') };
    }
  }
  catch (error) {
    console.error('update admin username request failed', error);
    return { error: err.coalesce(error) };
  }
};

export const updateAdminPassword = async (body: { id: number, password: string }) => {
  console.log('calling update admin password endpoint');

  try {
    const { unauthorized, error } = await fetch(`/be/admin/${body.id}/password`, 'PUT', body);

    if (unauthorized) return { unauthorized: true };

    if (error) {
      console.log('update admin password request failed');
      return { error: err.make('update admin password request failed') };
    }
  }
  catch (error) {
    console.error('update admin password request failed', error);
    return { error: err.coalesce(error) };
  }
};

export const deleteAdmin = async (id: number) => {
  console.log('calling delete admin endpoint');

  try {
    const { unauthorized, error } = await fetch(`/be/admin/${id}`, 'DELETE');

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
