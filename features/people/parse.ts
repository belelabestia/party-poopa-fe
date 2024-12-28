import { makeFail } from '$/error';
import * as parse from '$/parse';

const fail = makeFail('people parse error');

export const getAllPeopleResponse = async (res: Response) => {
  const json = parse.array({ value: await res.json() });
  if (json.error) return { error: fail(json.error) };

  const people = [];

  for (let i = 0; i < json.value.length; i++) {
    const row = json.at(i).object();

    const id = row.property('id').number().greaterThanZero();
    if (id.error) return { error: fail(id.error) };

    const name = row.property('name').string().nonEmpty();
    if (name.error) return { error: fail(name.error) };

    people.push({ id: id.value, name: name.value });
  }

  return { people };
};

export const createPersonResponse = async (res: Response) => {
  const id = parse.object({ value: await res.json() }).property('id').number().greaterThanZero();
  if (id.error) return { error: fail(id.error) };

  return { id: id.value };
};
