import { FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { createEvent } from '../api';
import { Icon } from '../../icon';
import { Loading } from '../../loading';
import * as parse from '$/parse';
import './styles.css';

type FormErrors = { nameRequired: boolean };

export const CreateEvent = () => {
  const nav = useNavigate();
  const [formErrors, setFormErrors] = useState<FormErrors | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const { value: name } = parse.string({ value: data.get('name') }).nonEmpty();

    if (!name) {
      setFormErrors({ nameRequired: !name });
      return;
    }

    const { value: date } = parse.string({ value: data.get('date') }).date();

    setFormErrors(null);
    setLoading(true);

    const create = await createEvent({ name, date });

    if (create.unauthorized) {
      alert('Session has expired, redirecting to login.');
      console.log('navigating to login');
      nav('/login');
      return;
    }

    if (create.error) {
      alert('Network request failed.');
      setLoading(false);
      return;
    }

    alert('Created.');
    nav('/events');
  };

  return (
    <div className='create-event'>
      <header>
        <div>
          <nav>
            <NavLink to='/home'>
              <Icon name='home' />
            </NavLink>
            <Icon name='right' />
            <NavLink to='/events'>
              <Icon name='events' />
            </NavLink>
            <Icon name='right' />
            <Icon name='create' />
          </nav>
          <h2>Create event</h2>
        </div>
      </header>
      {loading
        ? <Loading />
        : (
          <main>
            <form onSubmit={submit}>
              <label>
                Name
                <input type='text' name='name' />
                {formErrors?.nameRequired
                  ? <p className='error'>Name is required</p>
                  : <p>&nbsp;</p>}
              </label>
              <label>
                Date
                <input type='date' name='date' />
                <p>&nbsp;</p>
              </label>
              <button type='submit'>Create event</button>
            </form>
          </main>
        )}
    </div>
  );
};
