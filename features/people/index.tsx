import { Loading } from '../loading';
import { delay } from '$/time';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import './styles.css';
import { Icon } from '../icon';
import { getAllPeople } from './api';
import { GreaterThanZero, NonEmpty } from '$/parse';

type Person = { id: GreaterThanZero, name: NonEmpty };
type State = { people: Person[] };

export const People = () => {
  const nav = useNavigate();
  const [state, setState] = useState<State | null>(null);

  const init = async () => {
    const [{ error, unauthorized, people }] = await Promise.all([getAllPeople(), delay(300)]);

    if (unauthorized) {
      alert('Session has expired, redirecting to login.');
      console.log('navigating to login');
      nav('/login');
      return;
    }

    if (error) {
      alert('Operation failed, please retry.');
      console.error('getting all people failed', error);
      return;
    };

    setState({ people });
  };

  const createPerson = () => nav('/person/create');

  useEffect(() => { init() }, []);

  return (
    <div className='people'>
      <header>
        <div>
          <nav>
            <NavLink to='/home'>
              <Icon name='home' />
            </NavLink>
            <Icon name='right' />
            <Icon name='people' />
          </nav>
          <h2>People</h2>
        </div>
      </header>
      <main>
        {state
          ? (
            <nav>
              {state.people.map(e => <NavLink to={`/person/${e.id}`} key={e.id} state={e}>{e.name}</NavLink>)}
            </nav>
          )
          : <Loading />}
      </main>
      <footer>
        <div>
          <button type='button' onClick={createPerson}>Create person</button>
        </div>
      </footer>
    </div>
  );
};
