import * as err from '$/error';
import { Json } from '$/json';

type Person = {
  id: number,
  data: Json | null
};

export const getAllPeople = async () => {
  console.log('fetching all people');

  try {
    const res = await fetch('/be/people', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.status === 401) {
      console.log('user unauthenticated');
      document.cookie = '';
      return { unauthenticated: true };
    }

    if (!res.ok) {
      console.error('fetching all people failed', res.statusText);
      return { error: err.make('fetching all people failed') };
    }

    const people = await res.json() as Person[];
    console.log('all people fetched');
    return { people };
  }
  catch (error) {
    console.error('fetching all people failed', error);
    return { error: err.coalesce(error) };
  }
};

export const addPerson = async (data: Json | null) => {
  console.log('adding person');

  try {
    const res = await fetch('/people', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : undefined
    });

    if (res.status === 401) {
      console.log('user unauthenticated');
      document.cookie = '';
      return { unauthenticated: true };
    }

    if (!res.ok) {
      console.error('adding person failed', res.statusText);
      return { error: err.make('adding person failed') };
    }

    const { id } = await res.json() as { id: number };
    console.log('adding person succeeded');
    return { id };
  }
  catch (error) {
    console.error('adding person failed', error);
    return { error: err.coalesce(error) };
  }
};

export const updatePerson = async (id: number, data: Json | null) => {
  console.log('updating person');

  try {
    const res = await fetch(`api/people/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : undefined
    });

    if (res.status === 401) {
      console.log('user unauthenticated');
      document.cookie = '';
      return { unauthenticated: true };
    }

    if (!res.ok) {
      console.error('updaing person failed', res.statusText);
      return { error: err.make('updating person failed') };
    }

    console.log('updating person succeeded');
  }
  catch (error) {
    console.error('updating person failed', error);
    return { error: err.coalesce(error) };
  }
};

export const deletePerson = async (id: number) => {
  console.log('updating person');

  try {
    const res = await fetch(`api/people/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.status === 401) {
      console.log('user unauthenticated');
      document.cookie = '';
      return { unauthenticated: true };
    }

    if (!res.ok) {
      console.error('updating person failed', res.statusText);
      return { error: err.make('updating person failed') };
    }

    console.log('updating person succeeded');
  }
  catch (error) {
    console.error('updating person failed', error);
    return { error: err.coalesce(error) };
  }
};
