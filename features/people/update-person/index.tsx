import { FormEvent, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { deletePerson, updatePerson } from '@/people/api';
import { Icon } from '../../icon';
import { Loading } from '../../loading';
import { delay } from '$/time';
import * as parse from '$/parse';
import './styles.css';

type Person = { id: parse.GreaterThanZero, name: parse.NonEmpty, date?: parse.Date };
type Loc = { state: Person };
type FormErrors = { nameRequired: boolean };

export const UpdatePerson = () => {
  const nav = useNavigate();
  const { state: person } = useLocation() as Loc;
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

    setFormErrors(null);
    setLoading(true);

    const { value: date } = parse.string({ value: data.get('date') }).date();

    const [{ error, unauthorized } = {}] = await Promise.all([updatePerson({ id: person.id, name, date }), delay(300)]);

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

    const [{ error, unauthorized } = {}] = await Promise.all([deletePerson(person.id), delay(300)]);

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
    nav('/people');
  };

  return (
    <div className='update-person'>
      <header>
        <div>
          <nav>
            <NavLink to='/home'>
              <Icon name='home' />
            </NavLink>
            <Icon name='right' />
            <NavLink to='/people'>
              <Icon name='people' />
            </NavLink>
            <Icon name='right' />
            <Icon name='update' />
          </nav>
          <h2>Update person</h2>
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
                <input type='text' name='name' defaultValue={person.name} />
                {formErrors?.nameRequired
                  ? <p className='error'>Name is required</p>
                  : <p>&nbsp;</p>}
              </label>
              <button type='submit'>Update person</button>
            </form>
          </main>
            <footer>
              <div>
                <button type='button' onClick={$delete}>Delete person</button>
              </div>
            </footer>
          </>
        )}
    </div>
  );
};
