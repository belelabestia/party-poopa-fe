import * as auth from 'api/auth';
import { createContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import './styles.css';

type Admin = { username: string };

type AppState = {
  username?: string,
  admins?: Admin[]
};

const AppContext = createContext<AppState>({});

export const App = () => {
  const nav = useNavigate();
  const [state, setState] = useState<AppState>({});

  const init = () => {
    console.log('application startup');

    if (!document.cookie) {
      console.log('no cookies found; navigating to login');
      nav('/login');
      return;
    }

    const token = document.cookie.replace('token=', '');
    const [, base64Payload] = token.split('.');
    const jsonPayload = atob(base64Payload);
    const payload = JSON.parse(jsonPayload) as Admin;

    setState({ username: payload.username });
    console.log('user logged in', payload);
  };

  const navBack = async () => nav(-1)
  const navToHome = async () => nav('/admin');

  const logout = async () => {
    await auth.logout();
    nav('/login');
  };

  useEffect(init, []);

  return (
    <div className='app'>
      <div className='bar'>
        <nav>
          <button type='button' className='icon' onClick={navBack}>⬅️</button>
          <button type='button' className='icon' onClick={navToHome}>🏠</button>
        </nav>
        <button type='button' onClick={logout}>Logout</button>
        <h2>
          <span>🧑‍💻</span>
          {state?.username}
        </h2>
      </div>
      <main>
        <AppContext.Provider value={state}>
          <Outlet />
        </AppContext.Provider>
      </main>
    </div>
  );
};
