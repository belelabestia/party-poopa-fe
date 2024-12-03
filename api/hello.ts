import * as err from 'modules/error';
import { headers } from './common';

export const hello = async () => {
  console.log('saying hello');

  try {
    const res = await fetch('be/hello', {
      method: 'GET',
      headers
    });

    if (!res.ok) {
      console.log('saying hello failed');
      return { error: err.make('saying hello failed') };
    }

    const answer = await res.json();
    console.log('saying hello succede');
    return { answer };
  }
  catch (error) {
    console.error('saying hello failed', error);
    return { error: err.coalesce(error) };
  }
};
