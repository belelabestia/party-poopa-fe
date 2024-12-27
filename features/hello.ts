import * as parse from '$/parse';
import { fetch, unauthorized } from '$/http';
import { makeFail } from '$/error';

const fail = makeFail('admins api error');

export const hello = async () => {
  try {
    const response = await fetch('/be/hello', 'GET');
    if (response.unauthorized) return { unauthorized };
    if (response.error) return { error: fail(response.error) };

    const parsed = parse.string({ value: await response.result.text() });
    if (parsed.error) return { error: fail(parsed.error) };

    console.log('saying hello succeded');
    return { answer: parsed.value };
  }
  catch (error) {
    console.error('saying hello failed', error);
    return { error: fail(error) };
  }
};
