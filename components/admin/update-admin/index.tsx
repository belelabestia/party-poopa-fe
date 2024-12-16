import * as err from 'modules/error';
import * as auth from 'api/auth';
import { FormEvent, useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { deleteAdmin, updateAdminPassword, updateAdminUsername } from 'api/admin';
import './styles.css';
import { AppContext } from 'components/app';
import { Icon } from 'components/icon';

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
  const [formErrors, setFormErrors] = useState<FormErrors | null>(null);

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

    const proceed = confirm('you\'ll have to login with your new username');
    if (!proceed) return;

    const { unauthorized, error } = await updateAdminUsername({ id: admin.id, username }) ?? {};
    if (error) return;

    if (unauthorized) {
      alert('Session has expired, redirecting to login.');
      console.log('navigating to login');
      nav('/login');
      return;
    }

    alert('username updated; logging out');
    await auth.logout();
    nav('/login');
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

    const { error, unauthorized } = await updateAdminPassword({ id: admin.id, password }) ?? {};
    if (error) return;

    if (unauthorized) {
      alert('Session has expired, redirecting to login.');
      console.log('navigating to login');
      nav('/login');
      return;
    }

    alert('password updated; logging out');
    await auth.logout();
    nav('/login');
  };

  const logout = async () => {
    await auth.logout();
    nav('/login');
  };

  const $delete = () => deleteAdmin(admin.id);

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
      <main>
        <form onSubmit={submitUsername}>
          <label>
            Username
            <input type='text' name='username' defaultValue={admin.username} />
            <p className='error'>{formErrors?.usernameRequired ? 'Username is required' : <>&nbsp;</>}</p>
          </label>
          <button type='submit'>Update admin username</button>
        </form>
        <form onSubmit={submitPassword}>
          <label>
            Password
            <input type='password' name='password' />
            <p className='error'>{formErrors?.passwordRequired ? 'Password check is required' : <>&nbsp;</>}</p>
          </label>
          <label>
            Verify password
            <input type='password' name='password-check' />
            <p className='error'>{formErrors?.passwordCheckRequired ? 'Password check is required' : <>&nbsp;</>}</p>
          </label>
          <button type='submit'>Update admin password</button>
        </form>
      </main>
      <footer>
        {admin.username === app.username && <button type='button' onClick={logout}>Logout</button>}
        <button type='button' onClick={$delete}>Delete</button>
      </footer>
    </div>
  );
};
