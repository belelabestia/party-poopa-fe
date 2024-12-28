import * as err from '$/error';
import * as parse from './parse';
import { fetch, unauthorized } from '$/http';
import { Date, GreaterThanZero, NonEmpty } from '$/parse';

const fail = err.makeFail('people api error');

export const getAllPeople = async () => {
  try {
    const response = await fetch('/be/people', 'GET');
    if (response.unauthorized) return { unauthorized };
    if (response.error) return { error: fail(response.error) };

    const parsed = await parse.getAllPeopleResponse(response.result);
    if (parsed.error) return { error: fail(parsed.error) };

    return { people: parsed.people };
  }
  catch (error) {
    return { error: fail(error) };
  }
};

type CreatePersonBody = { name: NonEmpty, date?: Date };

export const createPerson = async (body: CreatePersonBody) => {
  try {
    const response = await fetch('/be/person', 'POST', body);
    if (response.unauthorized) return { unauthorized };
    if (response.error) return { error: fail(response.error) };

    const parsed = await parse.createPersonResponse(response.result);
    if (parsed.error) return { error: fail(parsed.error) };

    return { id: parsed.id };
  }
  catch (error) {
    return { error: fail(error) };
  }
};

type UpdatePersonBody = { id: GreaterThanZero, name: NonEmpty, date?: Date };

export const updatePerson = async (body: UpdatePersonBody) => {
  try {
    const { unauthorized, error } = await fetch(`/be/person/${body.id}`, 'PUT', body);
    if (unauthorized) return { unauthorized };
    if (error) return { error: fail(error) };
  }
  catch (error) {
    return { error: fail(error) };
  }
};

export const deletePerson = async (id: number) => {
  try {
    const { unauthorized, error } = await fetch(`/be/person/${id}`, 'DELETE');
    if (unauthorized) return { unauthorized };
    if (error) return { error: fail(error) };
  }
  catch (error) {
    return { error: fail(error) };
  }
};
