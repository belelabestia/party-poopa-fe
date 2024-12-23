import * as err from '$/error';
import * as parse from './parse';
import { fetch } from '$/http';

const duplicateUsername = Symbol('duplicate username');

export const getAllAdmins = async () => {
  console.log('calling get all admins endpoint');

  try {
    const { error: fetchError, unauthorized, response } = await fetch('/be/admins', 'GET');
    if (unauthorized) return { unauthorized };

    if (fetchError !== undefined) {
      console.log('get all admins request failed');
      return { error: err.make('get all admins request failed') };
    }

    const { error: parseError, admins } = await parse.getAllAdminsResponse(response);

    if (parseError !== undefined) {
      console.error('get all admins request failed', parseError);
      return { error: err.make('get all admins request failed') };
    }

    console.log('get all admins request succeeded');
    return { admins };
  }
  catch (error) {
    console.error('get all admins request failed', error);
    return { error: err.coalesce(error) };
  }
};

type CreateAdminBody = { username: string, password: string };

export const createAdmin = async (body: CreateAdminBody) => {
  console.log('calling create admin endpoint');

  try {
    const { error: fetchError, unauthorized, response } = await fetch('/be/admin', 'POST', body);

    if (unauthorized) return { unauthorized };
    if (fetchError === 'duplicate username') return { duplicateUsername };

    if (fetchError !== undefined) {
      console.error('create admin request failed', fetchError);
      return { error: err.make('create admin request failed') };
    }

    const { error: parseError, id } = await parse.createAdminResponse(response);
    
    if (parseError !== undefined) {
      console.error('create admin request failed', parseError);
      return { error: err.make('create admin request failed') };
    }

    console.log('create admin request succeeded');
    return { id };
  }
  catch (error) {
    console.error('create admin request failed', error);
    return { error: err.coalesce(error) };
  }
};

type UpdateAdminUsernameBody = { id: number, username: string };

export const updateAdminUsername = async (body: UpdateAdminUsernameBody) => {
  console.log('calling update admin username endpoint');

  try {
    const { error, unauthorized } = await fetch(`/be/admin/${body.id}/username`, 'PUT', body);

    if (unauthorized) return { unauthorized };
    if (error === 'duplicate username') return { duplicateUsername };

    if (error !== undefined) {
      console.log('update admin username request failed');
      return { error: err.make('update admin username request failed') };
    }
  }
  catch (error) {
    console.error('update admin username request failed', error);
    return { error: err.coalesce(error) };
  }
};

type UpdateAdminPasswordBody = { id: number, password: string };

export const updateAdminPassword = async (body: UpdateAdminPasswordBody) => {
  console.log('calling update admin password endpoint');

  try {
    const { error, unauthorized } = await fetch(`/be/admin/${body.id}/password`, 'PUT', body);
    if (unauthorized) return { unauthorized };

    if (error !== undefined) {
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
    const { error, unauthorized } = await fetch(`/be/admin/${id}`, 'DELETE');
    if (unauthorized) return { unauthorized };

    if (error !== undefined) {
      console.log('delete admin request failed');
      return { error: err.make('delete admin request failed') };
    }
  }
  catch (error) {
    console.error('delete admin request failed', error);
    return { error: err.coalesce(error) };
  }
};
