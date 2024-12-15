import { getAllAdmins } from 'api/admin';
import { Loading } from 'components/loading';
import { delay } from 'modules/time';
import { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import './styles.css';
import { AppContext } from 'components/app';

type Admin = { id: number; username: string; };
type State = { me: Admin, others: Admin[] };

export const Admins = () => {
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
        <h2>Admins</h2>
      </header>
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
            <button type='button' onClick={createAdmin}>Create admin</button>
          </nav>
        )
        : <Loading />}
      <footer>
        <NavLink to='/home'>Home</NavLink>
      </footer>
    </div>
  );
};
