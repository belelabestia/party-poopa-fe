import * as err from 'modules/error';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { createAdmin } from 'api/admin';
import './styles.css';

export const CreateAdmin = () => {
  const nav = useNavigate();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
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

    const { error } = await createAdmin({ username, password });
    if (error) return;

    console.log('navigating to login');
    nav('/login');
  };

  return (
    <div className='create-admin'>
      <form onSubmit={submit}>
        <h2>Create admin</h2>
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
        <button type='submit'>Create admin</button>
      </form>
    </div>
  );
};
