import { FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { createAdmin } from '../api';
import './styles.css';
import { Icon } from '../../icon';
import { Loading } from '../../loading';

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
    const username = data.get('username');
    const password = data.get('password');
    const passwordCheck = data.get('password-check');

    if (!username || !password || !passwordCheck) {
      setFormErrors({ usernameRequired: !username, passwordRequired: !password, passwordCheckRequired: !passwordCheck });
      return;
    }

    setFormErrors(null);

    // todo parse username & password as strings

    if (password !== passwordCheck) {
      alert('Passwords don\'t match.');
      return;
    }

    setLoading(true);

    const { error, unauthorized, duplicateUsername } = await createAdmin({ username, password });

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
