import { Loading } from '../loading';
import { delay } from '$/time';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import './styles.css';
import { Icon } from '../icon';
import { getAllEvents } from './api';
import { Date, GreaterThanZero, NonEmpty } from '$/parse';

type Event = { id: GreaterThanZero, name: NonEmpty, date?: Date };
type State = { events: Event[] };

export const Events = () => {
  const nav = useNavigate();
  const [state, setState] = useState<State | null>(null);

  const init = async () => {
    const [{ error, unauthorized, events }] = await Promise.all([getAllEvents(), delay(300)]);
    if (error !== undefined) return;

    if (unauthorized) {
      alert('Session has expired, redirecting to login.');
      console.log('navigating to login');
      nav('/login');
      return;
    }

    setState({ events });
  };

  const createEvet = () => nav('/event/create');

  useEffect(() => { init() }, []);

  return (
    <div className='events'>
      <header>
        <div>
          <nav>
            <NavLink to='/home'>
              <Icon name='home' />
            </NavLink>
            <Icon name='right' />
            <Icon name='events' />
          </nav>
          <h2>Events</h2>
        </div>
      </header>
      <main>
        {state
          ? (
            <nav>
              {state.events.map(e => <NavLink to={`/event/${e.id}`} key={e.id} state={e}>{e.name}</NavLink>)}
            </nav>
          )
          : <Loading />}
      </main>
      <footer>
        <div>
          <button type='button' onClick={createEvet}>Create event</button>
        </div>
      </footer>
    </div>
  );
};
