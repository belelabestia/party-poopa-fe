import * as err from '$/error';
import * as parse from '$/parse';
import { fetch } from '$/http';

export const hello = async () => {
  console.log('saying hello');

  try {
    const { error, unauthorized, response } = await fetch('/be/hello', 'GET');

    if (unauthorized) {
      console.log('saying hello failed, unauthorized');
      return { error: err.make('saying hello failed, unauthorized') };
    }

    if (error !== undefined) {
      console.log('saying hello failed');
      return { error: err.make('saying hello failed') };
    }

    const answer = parse.string({ value: await response.text() });
    if (answer.error !== undefined) return { error: err.make('saying hello failed') };

    console.log('saying hello succeded');
    return { answer: answer.value };
  }
  catch (error) {
    console.error('saying hello failed', error);
    return { error: err.coalesce(error) };
  }
};
