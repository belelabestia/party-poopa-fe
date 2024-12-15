import * as auth from 'api/auth';
import * as err from 'modules/error';
import { FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './styles.css';

export const Login = () => {
  const nav = useNavigate();

  const init = () => {
    if (document.cookie) {
      console.log('user alreagy logged in; navigating to app');
      nav('/admin');
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    if (!username || !password) {
      alert('Credentials are required.');
      return;
    }

    if (typeof username !== 'string' || typeof password !== 'string') throw err.make('invalid form data');

    const { error, unauthorized } = await auth.login({ username, password }) ?? {};
    if (error) return;

    if (unauthorized) {
      alert('Login failed; check your credentials.');
      return;
    }

    nav('/home');
  };

  useEffect(init, []);

  return (
    <div className='login'>
      <header>
        <div className="logo">🎉🚫💩</div>
        <h1>Party Poopa</h1>
      </header>
      <form onSubmit={submit}>
        <h2>Login</h2>
        <label>
          Username
          <input type='text' id='username' name='username' autoFocus />
        </label>
        <label>
          Password
          <input type='password' id='password' name='password' />
        </label>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
};
