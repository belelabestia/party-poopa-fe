import * as auth from 'api/auth';
import * as err from 'modules/error';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router';
import './styles.css';

export const Register = () => {
  const nav = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');
    const passwordCheck = data.get('password-check');

    if (!username || !password || !passwordCheck) {
      alert('Credentials are required.');
      return;
    }

    if (
      typeof username !== 'string' ||
      typeof password !== 'string' ||
      typeof passwordCheck !== 'string'
    ) throw err.make('invalid form data');

    if (password !== passwordCheck) {
      alert('Passwords don\'t match.');
      return;
    }

    const { error } = await auth.register({ username, password });
    if (error) return;

    console.log('navigating to login');
    nav('/login');
  };

  return (
    <div className='register'>
      <form onSubmit={onSubmit}>
        <h2>Register</h2>
        <label>
          Username
          <input type='text' name='username' />
        </label>
        <label>
          Password
          <input type='password' name='password' />
        </label>
        <label>
          Verify password
          <input type='password' name='password-check' />
        </label>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};
