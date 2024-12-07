import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as auth from 'api/auth';
import './styles.css';

type Admin = { username: string };

export const App = () => {
  const nav = useNavigate();
  const [username, setUsername] = useState<string>();

  const onStartup = () => {
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

    setUsername(payload.username);
    console.log('user logged in', payload);
  }

  const logout = async () => {
    await auth.logout();
  };

  useEffect(onStartup, []);

  return (
    <div className="app">
      <div className="welcome">
        <h2>Welcome, {username}!</h2>
        <button type="button" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};
