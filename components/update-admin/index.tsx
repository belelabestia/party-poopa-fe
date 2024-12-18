import * as err from 'modules/error';
import * as auth from 'api/auth';
import { FormEvent, useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { deleteAdmin, updateAdminPassword, updateAdminUsername } from 'api/admin';
import './styles.css';
import { AppContext } from 'components/app';
import { Icon } from 'components/icon';
import { Loading } from 'components/loading';
import { delay } from 'modules/time';

type Loc = { state: { id: number, username: string } };

type FormErrors = {
  usernameRequired?: boolean,
  passwordRequired?: boolean,
  passwordCheckRequired?: boolean
};

export const UpdateAdmin = () => {
  const nav = useNavigate();
  const app = useContext(AppContext);
  const { state: admin } = useLocation() as Loc;
  const [username, setUsername] = useState(admin.username);
  const [formErrors, setFormErrors] = useState<FormErrors | null>(null);
  const [loading, setLoading] = useState(false);

  const submitUsername = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const username = data.get('username');

    if (!username) {
      setFormErrors({ usernameRequired: true });
      return;
    }

    setFormErrors(null);

    if (typeof username !== 'string') throw err.make('invalid form data');

    const me = admin.username === app.username;

    const proceed = !me || confirm('you\'ll have to login with your new username');
    if (!proceed) return;

    setLoading(true);

    const [{ error, unauthorized, duplicateUsername } = {}] = await Promise.all([updateAdminUsername({ id: admin.id, username }), delay(300)]);

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

    if (duplicateUsername) {
      alert('Duplicate username, try a different one.');
      setLoading(false);
      return;
    }

    if (me) {
      alert('Username updated; logging out.');
      await auth.logout();
      nav('/login');
    }
    else {
      alert('Updated.');
      setUsername(username);
      setLoading(false);
    }
  };

  const submitPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const password = data.get('password');
    const passwordCheck = data.get('password-check');

    if (!password || !passwordCheck) {
      setFormErrors({ passwordRequired: !password, passwordCheckRequired: !passwordCheck });
      return;
    }

    if (
      typeof password !== 'string' ||
      typeof passwordCheck !== 'string'
    ) throw err.make('invalid form data');

    if (password !== passwordCheck) {
      alert('Passwords don\'t match.');
      return;
    }

    const me = admin.username === app.username;

    const proceed = !me || confirm('you\'ll have to login with your new password');
    if (!proceed) return;

    setLoading(true);

    const [{ error, unauthorized } = {}] = await Promise.all([updateAdminPassword({ id: admin.id, password }), delay(300)]);

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

    if (me) {
      alert('password updated; logging out');
      await auth.logout();
      nav('/login');
    }
    else {
      alert('Updated.');
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    await Promise.all([auth.logout(), delay(300)]);
    nav('/login');
  };

  const $delete = async () => {
    setLoading(true);

    const [{ error, unauthorized } = {}] = await Promise.all([deleteAdmin(admin.id), delay(300)]);

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
    nav('/admins');
  };

  return (
    <div className='update-admin'>
      <header>
        <div>
          <nav>
            <NavLink to='/home'>
              <Icon name='home' />
            </NavLink>
            <Icon name='right' />
            <NavLink to='/admins'>
              <Icon name='admins' />
            </NavLink>
            <Icon name='right' />
            <Icon name='update' />
          </nav>
          <h2>Update admin</h2>
        </div>
      </header>
      {loading
        ? <Loading />
        : (
          <>
            <main>
              <form onSubmit={submitUsername}>
                <label>
                  Username
                  <input type='text' name='username' defaultValue={username} />
                  <p className='error'>{formErrors?.usernameRequired ? 'Username is required' : <>&nbsp;</>}</p>
                </label>
                <button type='submit'>Update admin username</button>
              </form>
              <form onSubmit={submitPassword}>
                <label>
                  Password
                  <input type='password' name='password' autoComplete='new-password' />
                  <p className='error'>{formErrors?.passwordRequired ? 'Password check is required' : <>&nbsp;</>}</p>
                </label>
                <label>
                  Verify password
                  <input type='password' name='password-check' autoComplete='new-password' />
                  <p className='error'>{formErrors?.passwordCheckRequired ? 'Password check is required' : <>&nbsp;</>}</p>
                </label>
                <button type='submit'>Update admin password</button>
              </form>
            </main>
            <footer>
              <div>
                {admin.username === app.username && <button type='button' onClick={logout}>Logout</button>}
                <button type='button' onClick={$delete}>Delete</button>
              </div>
            </footer>
          </>
        )}
    </div>
  );
};
