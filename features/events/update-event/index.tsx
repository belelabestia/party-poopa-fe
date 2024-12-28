import { FormEvent, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { deleteEvent, updateEvent } from '@/events/api';
import { Icon } from '../../icon';
import { Loading } from '../../loading';
import { delay } from '$/time';
import * as parse from '$/parse';
import './styles.css';

type Event = { id: parse.GreaterThanZero, name: parse.NonEmpty, date?: parse.Date };
type Loc = { state: Event };
type FormErrors = { nameRequired: boolean };

export const UpdateEvent = () => {
  const nav = useNavigate();
  const { state: event } = useLocation() as Loc;
  const [formErrors, setFormErrors] = useState<FormErrors | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (_event: FormEvent<HTMLFormElement>) => {
    _event.preventDefault();

    const data = new FormData(_event.currentTarget);

    const { value: name } = parse.string({ value: data.get('name') }).nonEmpty();

    if (!name) {
      setFormErrors({ nameRequired: !name });
      return;
    }

    setFormErrors(null);
    setLoading(true);

    const { value: date } = parse.string({ value: data.get('date') }).date();

    const [{ error, unauthorized } = {}] = await Promise.all([updateEvent({ id: event.id, name, date }), delay(300)]);

    if (unauthorized) {
      alert('Session has expired, redirecting to login.');
      console.log('navigating to login');
      nav('/login');
      return;
    }

    if (error) {
      alert('Network request failed.');
      setLoading(false);
      return;
    }

    alert('Updated.');
    setLoading(false);
  };

  const $delete = async () => {
    setLoading(true);

    const [{ error, unauthorized } = {}] = await Promise.all([deleteEvent(event.id), delay(300)]);

    if (error) {
      alert('Network request failed.');
      setLoading(false);
      return;
    }

    if (unauthorized) {
      alert('Session has expired, redirecting to login.');
      console.log('navigating to login');
      nav('/login');
      return;
    }

    alert('Deleted.');
    nav('/events');
  };

  return (
    <div className='update-event'>
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
            <Icon name='update' />
          </nav>
          <h2>Update event</h2>
        </div>
      </header>
      {loading
        ? <Loading />
        : (
          <>
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
            <footer>
              <div>
                <button type='button' onClick={$delete}>Delete event</button>
              </div>
            </footer>
          </>
        )}
    </div>
  );
};
