import * as parse from './parse';
import { fetch, unauthorized } from '$/http';

const duplicateUsername = Symbol();

export const getAllAdmins = async () => {
  try {
    const response = await fetch('/be/admins', 'GET');
    if (response.unauthorized) return { unauthorized };
    if (response.error) return { error: response.error };

    const parsed = await parse.getAllAdminsResponse(response.result);
    if (parsed.error) return { error: parsed.error };

    return { admins: parsed.admins };
  }
  catch (error) {
    console.error('get all admins request failed', error);
    return { error: String(error) };
  }
};

type CreateAdminBody = { username: string, password: string };

export const createAdmin = async (body: CreateAdminBody) => {
  console.log('calling create admin endpoint');

  try {
    const { error: fetchError, unauthorized, result: response } = await fetch('/be/admin', 'POST', body);

    if (unauthorized) return { unauthorized };
    if (fetchError === 'duplicate username') return { duplicateUsername };

    if (fetchError !== undefined) {
      console.error('create admin request failed', fetchError);
      return { error: 'create admin request failed' };
    }

    const { error: parseError, id } = await parse.createAdminResponse(response);
    
    if (parseError !== undefined) {
      console.error('create admin request failed', parseError);
      return { error: 'create admin request failed' };
    }

    console.log('create admin request succeeded');
    return { id };
  }
  catch (error) {
    console.error('create admin request failed', error);
    return { error: String(error) };
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
      return { error: 'update admin username request failed' };
    }
  }
  catch (error) {
    console.error('update admin username request failed', error);
    return { error: String(error) };
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
      return { error: 'update admin password request failed' };
    }
  }
  catch (error) {
    console.error('update admin password request failed', error);
    return { error: String(error) };
  }
};

export const deleteAdmin = async (id: number) => {
  console.log('calling delete admin endpoint');

  try {
    const { error, unauthorized } = await fetch(`/be/admin/${id}`, 'DELETE');
    if (unauthorized) return { unauthorized };

    if (error !== undefined) {
      console.log('delete admin request failed');
      return { error: 'delete admin request failed' };
    }
  }
  catch (error) {
    console.error('delete admin request failed', error);
    return { error: String(error) };
  }
};
