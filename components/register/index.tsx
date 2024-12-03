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
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div className='field'>
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' />
        </div>
        <div className='field'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' />
        </div>
        <div className='field'>
          <label htmlFor='password-check'>Verify password</label>
          <input type='password' name='password-check' />
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};
