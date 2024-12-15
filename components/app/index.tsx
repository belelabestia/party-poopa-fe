import { createContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import './styles.css';

type Admin = { username: string };
type AppState = { username: string | null };

export const AppContext = createContext<AppState>(undefined!);

export const App = () => {
  const nav = useNavigate();
  const [state, setState] = useState<AppState>();

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

    console.log('user logged in; navigating to home', payload);
    nav('/home');
  };

  useEffect(init, []);

  if (!state) return null;

  return (
    <div className='app'>
      <AppContext.Provider value={state}>
        <Outlet />
      </AppContext.Provider>
    </div>
  );
};
