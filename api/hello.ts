import * as err from 'modules/error';
import { fetch } from 'modules/http';

export const hello = async () => {
  console.log('saying hello');

  try {
    const { error, response } = await fetch('/be/hello', 'GET');

    if (error) {
      console.log('saying hello failed');
      return { error: err.make('saying hello failed') };
    }

    const answer = await response!.json();
    console.log('saying hello succede');
    return { answer };
  }
  catch (error) {
    console.error('saying hello failed', error);
    return { error: err.coalesce(error) };
  }
};
