import * as auth from 'api/auth';
import * as err from 'modules/error';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router';
import './styles.css';

export const Login = () => {
  const nav = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    if (!username || !password) {
      alert('Credentials are required.');
      return;
    }

    if (typeof username !== 'string' || typeof password !== 'string') throw err.make('invalid form data');

    const error = await auth.login({ username, password });

    if (error) {
      alert('Login failed; check your credentials.');
      return;
    }

    nav('/');
  };

  return (
    <div className='login'>
      <form onSubmit={onSubmit}>
        <h2>Login</h2>
        <label>
          Username
          <input type='text' id='username' name='username' />
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
