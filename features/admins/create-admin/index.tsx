import { FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { createAdmin } from '../api';
import './styles.css';
import { Icon } from '../../icon';
import { Loading } from '../../loading';
import * as parse from '$/parse';

type FormErrors = {
  usernameRequired?: boolean,
  passwordRequired?: boolean,
  passwordCheckRequired?: boolean
};

export const CreateAdmin = () => {
  const nav = useNavigate();
  const [formErrors, setFormErrors] = useState<FormErrors | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const username = parse.string({ value: data.get('username') }).nonEmpty();
    const password = parse.string({ value: data.get('password') }).nonEmpty();
    const passwordCheck = parse.string({ value: data.get('password-check') }).nonEmpty();

    if (username.error || password.error || passwordCheck.error) {
      setFormErrors({ usernameRequired: Boolean(username.error), passwordRequired: Boolean(password.error), passwordCheckRequired: Boolean(passwordCheck.error) });
      return;
    }

    setFormErrors(null);

    if (password !== passwordCheck) {
      alert('Passwords don\'t match.');
      return;
    }

    setLoading(true);

    const create = await createAdmin({ username: username.value, password: password.value });

    if (create.unauthorized) {
      alert('Session has expired, redirecting to login.');
      console.log('navigating to login');
      nav('/login');
      return;
    }

    if (create.duplicateUsername) {
      alert('Duplicate username, try a different one.');
      setLoading(false);
      return;
    }

    if (create.error) {
      alert('Network request failed.');
      setLoading(false);
      return;
    }

    alert('Created.');
    nav('/admins');
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
      {loading
        ? <Loading />
        : (
          <main>
            <form onSubmit={submit}>
              <label>
                Username
                <input type='text' name='username' />
                {formErrors?.usernameRequired
                  ? <p className='error'>Username is required</p>
                  : <p>&nbsp;</p>}
              </label>
              <label>
                Password
                <input type='password' name='password' />
                {formErrors?.passwordRequired
                  ? <p className='error'>Password is required</p>
                  : <p>&nbsp;</p>}
              </label>
              <label>
                Verify password
                <input type='password' name='password-check' />
                {formErrors?.passwordCheckRequired
                  ? <p className='error'>Password check is required</p>
                  : <p>&nbsp;</p>}
              </label>
              <button type='submit'>Create admin</button>
            </form>
          </main>
        )}
    </div>
  );
};
