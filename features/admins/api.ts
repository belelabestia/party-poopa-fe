import { fetch, unauthorized } from '$/http';
import { makeFail } from '$/error';
import * as parse from './parse';

const fail = makeFail('admins api error');
const duplicateUsername = Symbol();

export const getAllAdmins = async () => {
  try {
    const response = await fetch('/be/admins', 'GET');
    if (response.unauthorized) return { unauthorized };
    if (response.error) return { error: fail(response.error) };

    const parsed = await parse.getAllAdminsResponse(response.result);
    if (parsed.error) return { error: fail(parsed.error) };

    return { admins: parsed.admins };
  }
  catch (error) {
    return { error: fail(error) };
  }
};

type CreateAdminBody = { username: string, password: string };

export const createAdmin = async (body: CreateAdminBody) => {
  try {
    const response = await fetch('/be/admin', 'POST', body);
    if (response.unauthorized) return { unauthorized };
    if (response.error?.cause === 'duplicate username') return { duplicateUsername };
    if (response.error) return { error: fail(response.error) };

    const parsed = await parse.createAdminResponse(response.result);
    if (parsed.error) return { error: fail(parsed.error) };

    return { id: parsed.id };
  }
  catch (error) {
    return { error: fail(error) };
  }
};

type UpdateAdminUsernameBody = { id: number, username: string };

export const updateAdminUsername = async (body: UpdateAdminUsernameBody) => {
  try {
    const { unauthorized, error } = await fetch(`/be/admin/${body.id}/username`, 'PUT', body);
    if (unauthorized) return { unauthorized };
    if (error?.cause === 'duplicate username') return { duplicateUsername };
    if (error) return { error: fail(error) };
  }
  catch (error) {
    return { error: fail(error) };
  }
};

type UpdateAdminPasswordBody = { id: number, password: string };

export const updateAdminPassword = async (body: UpdateAdminPasswordBody) => {
  try {
    const { error, unauthorized } = await fetch(`/be/admin/${body.id}/password`, 'PUT', body);
    if (unauthorized) return { unauthorized };
    if (error) return { error: fail(error) };
  }
  catch (error) {
    return { error: fail(error) };
  }
};

export const deleteAdmin = async (id: number) => {
  try {
    const { error, unauthorized } = await fetch(`/be/admin/${id}`, 'DELETE');
    if (unauthorized) return { unauthorized };
    if (error) return { error: fail(error) };
  }
  catch (error) {
    return { error: fail(error) };
  }
};
