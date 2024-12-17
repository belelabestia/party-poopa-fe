import * as err from 'modules/error';
import { FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { createAdmin } from 'api/admin';
import './styles.css';
import { Icon } from 'components/icon';

type FormErrors = {
  usernameRequired?: boolean,
  passwordRequired?: boolean,
  passwordCheckRequired?: boolean
};

export const CreateAdmin = () => {
  const nav = useNavigate();
  const [formErrors, setFormErrors] = useState<FormErrors | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    const passwordCheck = data.get('password-check');

    if (!username || !password || !passwordCheck) {
      setFormErrors({ usernameRequired: !username, passwordRequired: !password, passwordCheckRequired: !passwordCheck });
      return;
    }

    setFormErrors(null);

    if (
      typeof username !== 'string' ||
      typeof password !== 'string' ||
      typeof passwordCheck !== 'string'
    ) throw err.make('invalid form data');

    if (password !== passwordCheck) {
      alert('Passwords don\'t match.');
      return;
    }

    const { error, unauthorized } = await createAdmin({ username, password });
    if (error) return;

    if (unauthorized) {
      alert('Session has expired, redirecting to login.');
      console.log('navigating to login');
      nav('/login');
      return;
    }
  };

  return (
    <div className='create-admin'>
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
            <Icon name='create' />
          </nav>
          <h2>Create admin</h2>
        </div>
      </header>
      <main>
        <form onSubmit={submit}>
          <label>
            Username
            <input type='text' name='username' />
            <p className='error'>{formErrors?.usernameRequired ? 'Username is required' : <>&nbsp;</>}</p>
          </label>
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
          <button type='submit'>Create admin</button>
        </form>
      </main>
    </div>
  );
};
