import { getAllAdmins } from '@/admins/api';
import { Loading } from '../loading';
import { delay } from '$/time';
import { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import './styles.css';
import { AppContext } from '../app';
import { Icon } from '../icon';

type Admin = { id: number; username: string; };
type State = { me: Admin, others: Admin[] };

export const Events = () => {
  const nav = useNavigate();
  const app = useContext(AppContext);
  const [state, setState] = useState<State | null>(null);

  const init = async () => {
    const [{ error, unauthorized, admins }] = await Promise.all([getAllAdmins(), delay(300)]);
    if (error) return;

    if (unauthorized) {
      alert('Session has expired, redirecting to login.');
      console.log('navigating to login');
      nav('/login');
      return;
    }

    const [me, ...others] = admins!.sort(x => x.username === app.username ? -1 : 1);
    setState({ me, others });
  };

  const createAdmin = () => nav('/admin/create');

  useEffect(() => { init() }, []);

  return (
    <div className='admins'>
      <header>
        <div>
          <nav>
            <NavLink to='/home'>
              <Icon name='home' />
            </NavLink>
            <Icon name='right' />
            <Icon name='admins' />
          </nav>
          <h2>Admins</h2>
        </div>
      </header>
      <main>
        {state
          ? (
            <nav>
              <div className='me'>
                <h3>Me</h3>
                <NavLink to={`/admin/${state.me.id}`} state={state.me}>{state.me.username}</NavLink>
              </div>
              <div className='others'>
                <h3>Others</h3>
                {state.others.map(a => <NavLink to={`/admin/${a.id}`} key={a.id} state={a}>{a.username}</NavLink>)}
              </div>
            </nav>
          )
          : <Loading />}
      </main>
      <footer>
        <div>
          <button type='button' onClick={createAdmin}>Create admin</button>
        </div>
      </footer>
    </div>
  );
};
