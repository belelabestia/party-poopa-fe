import * as err from '$/error';
import { fetch } from '$/http';

type CreateBody = { name: string, date: string }; // todo

export const getAllEvents = async () => {
  console.log('calling get all events endpoint');

  try {
    const { error, unauthorized, response } = await fetch('/be/events', 'GET');

    if (unauthorized) return { unauthorized: true };

    if (error) {
      console.log('get all events request failed');
      return { error: err.make('get all events request failed') };
    }

    const events = await response!.json() as { id: number, username: string }[]; // todo
    console.log('get all events request succeeded');
    return { events };
  }
  catch (error) {
    console.error('get all events request failed', error);
    return { error: err.coalesce(error) };
  }
};

export const createEvent = async (body: CreateBody) => {
  console.log('calling create event endpoint');

  try {
    const { error, unauthorized, response } = await fetch('/be/event', 'POST', body);

    if (unauthorized) return { unauthorized: true };

    if (error) {
      console.log('create event request failed');
      return { error: err.make('create event request failed') };
    }

    const event = await response!.json() as { id: number };
    console.log('create event request succeeded');
    return { event };
  }
  catch (error) {
    console.error('create event request failed', error);
    return { error: err.coalesce(error) };
  }
};

export const updateAdminUsername = async (body: { id: number, username: string }) => {
  console.log('calling update admin username endpoint');

  try {
    const { unauthorized, error } = await fetch(`/be/admin/${body.id}/username`, 'PUT', body);

    if (unauthorized) return { unauthorized: true };
    if (error?.message === 'duplicate username') return { duplicateUsername: true };

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

    if (unauthorized) return { unauthorized: true };

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
