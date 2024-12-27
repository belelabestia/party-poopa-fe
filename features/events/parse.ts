import { makeFail } from '$/error';
import * as parse from '$/parse';

const fail = makeFail('events parse error');

export const getAllEventsResponse = async (res: Response) => {
  const json = parse.array({ value: await res.json() });
  if (json.error) return { error: fail(json.error) };

  const events = [];

  for (let i = 0; i < json.value.length; i++) {
    const row = json.at(i).object();

    const id = row.property('id').number().greaterThanZero();
    if (id.error) return { error: fail(id.error) };

    const name = row.property('name').string().nonEmpty();
    if (name.error) return { error: fail(name.error) };

    const dateProp = row.property('date');

    if (dateProp.error) {
      events.push({ id: id.value, name: name.value });
      continue;
    }

    const date = dateProp.string().date();
    if (date.error) return { error: fail(date.error) };

    events.push({ id: id.value, name: name.value, date: date.value });
  }

  return { events };
};

export const createEventResponse = async (res: Response) => {
  const id = parse.object({ value: await res.json() }).property('id').number().greaterThanZero();
  if (id.error) return { error: fail(id.error) };

  return { id: id.value };
};
