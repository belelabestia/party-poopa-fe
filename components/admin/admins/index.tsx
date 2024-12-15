import { getAllAdmins } from 'api/admin';
import { Loading } from 'components/loading';
import { delay } from 'modules/time';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './styles.css';
import { AppContext } from 'components/app';

type Admin = { id: number; username: string; };
type State = { me: Admin, others: Admin[] };

export const Admins = () => {
  const nav = useNavigate();
  const app = useContext(AppContext);
  const [state, setState] = useState<State | null>(null);

  const init = async () => {
    const [{ error, unauthorized, admins }] = await Promise.all([getAllAdmins(), delay(1000)]);
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
    <div className="admins">
      {state
        ? (
          <>
            <div className="me">
              <DisplayAdmin {...state.me} key={state.me.id} />
            </div>
            <div className="admins">
              {state.others.map(a => <DisplayAdmin {...a} key={a.id} />)}
            </div>
            <button type='button' onClick={createAdmin}>Create admin</button>
          </>
        )
        : <Loading />}
    </div>
  );
};

const DisplayAdmin = (admin: Admin) => {
  const nav = useNavigate();

  const editAdmin = () => nav(`/admin/${admin.id}`, { state: admin });
  const deleteAdmin = () => { };

  return (
    <div className='display-admin'>
      <span className='username'>{admin.username}</span>
      <div className='actions'>
        <button type='button' onClick={editAdmin}>
          <span className="icon">✏️</span>
        </button>
        <button type='button' onClick={deleteAdmin}>
          <span className="icon">🗑️</span>
        </button>
      </div>
    </div>
  );
};
