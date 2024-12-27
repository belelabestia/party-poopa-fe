import * as err from '$/error';
import * as parse from './parse';
import { fetch, unauthorized } from '$/http';
import { Date, GreaterThanZero, NonEmpty } from '$/parse';


const fail = err.makeFail('events api error');

export const getAllEvents = async () => {
  try {
    const response = await fetch('/be/events', 'GET');
    if (response.unauthorized) return { unauthorized };
    if (response.error) return { error: fail(response.error) };

    const parsed = await parse.getAllEventsResponse(response.result);
    if (parsed.error) return { error: fail(parsed.error) };

    return { events: parsed.events };
  }
  catch (error) {
    return { error: fail(error) };
  }
};

type CreateEventBody = { name: NonEmpty, date?: Date };

export const createEvent = async (body: CreateEventBody) => {
  try {
    const response = await fetch('/be/event', 'POST', body);
    if (response.unauthorized) return { unauthorized };
    if (response.error) return { error: fail(response.error) };

    const parsed = await parse.createEventResponse(response.result);
    if (parsed.error) return { error: fail(parsed.error) };

    return { id: parsed.id };
  }
  catch (error) {
    return { error: fail(error) };
  }
};

type UpdateEventBody = { id: GreaterThanZero, name: NonEmpty, date?: Date };

export const updateEvent = async (body: UpdateEventBody) => {
  try {
    const response = await fetch(`/be/event/${body.id}`, 'PUT', body);
    if (response.unauthorized) return { unauthorized };
    if (response.error) return { error: fail(response.error) };
  }
  catch (error) {
    return { error: fail(error) };
  }
};

export const deleteEvent = async (id: number) => {
  try {
    const { unauthorized, error } = await fetch(`/be/admin/${id}`, 'DELETE');
    if (unauthorized) return { unauthorized: true };
    if (error) return { error: fail(error) };
  }
  catch (error) {
    return { error: fail(error) };
  }
};
