import * as parse from '$/parse';

export const getAllEventsResponse = async (res: Response) => {
  const json = parse.array({ value: await res.json() });
  if (json.error !== undefined) return { error: json.error };

  const events = [];

  for (let i = 0; i < json.value.length; i++) {
    const row = json.at(i).object();

    const id = row.property('id').number().greaterThanZero();
    if (id.error !== undefined) return { error: id.error };

    const name = row.property('name').string().nonEmpty();
    if (name.error !== undefined) return { error: name.error };

    const dateProp = row.property('date');

    if (dateProp.error !== undefined) {
      events.push({ id: id.value, name: name.value });
      continue;
    }

    const date = dateProp.string().date();
    if (date.error !== undefined) return { error: date.error };

    events.push({ id: id.value, name: name.value, date: date.value });
  }

  return { events };
};

export const createAdminResponse = async (res: Response) => {
  const id = parse.object(await res.json()).property('id').number().greaterThanZero();
  if (id.error !== undefined) return { error: id.error };

  return id.value;
};
