import * as err from 'modules/error';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { createAdmin } from 'api/admin';
import './styles.css';

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
      <form onSubmit={submit}>
        <h2>Create admin</h2>
        <label>
          Username
          <input type='text' name='username' />
          <p className='error'>{formErrors?.usernameRequired ? 'Username is required' : <>&nbsp;</>}</p>
        </label>
        <label>
          Password
          <input type='password' name='password' />
          <p className='error'>{formErrors?.passwordRequired ? 'Password chech is required' : <>&nbsp;</>}</p>
        </label>
        <label>
          Verify password
          <input type='password' name='password-check' />
          <p className='error'>{formErrors?.passwordCheckRequired ? 'Password check is required' : <>&nbsp;</>}</p>
        </label>
        <button type='submit'>Create admin</button>
      </form>
    </div>
  );
};
