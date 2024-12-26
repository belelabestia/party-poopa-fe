import * as parse from '$/parse';

export const getAllAdminsResponse = async (res: Response) => {
  const json = parse.array({ value: await res.json() });
  if (json.error) return { error: json.error };

  const admins = [];

  for (let i = 0; i < json.value.length; i++) {
    const row = json.at(i).object();

    const id = row.property('id').number().greaterThanZero();
    if (id.error) return { error: id.error };

    const username = row.property('username').string().nonEmpty();
    if (username.error) return { error: username.error };

    admins.push({ id: id.value, username: username.value });
  }

  return { admins };
};

export const createAdminResponse = async (res: Response) => {
  const id = parse.object(await res.json()).property('id').number().greaterThanZero();
  if (id.error) return { error: id.error };

  return { id: id.value };
};
