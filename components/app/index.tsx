import { Register } from "components/register";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import './styles.css';

export const App = () => {
  const nav = useNavigate();

  const onStartup = () => {
    console.log('application startup');
  
    if (!document.cookie) {
      console.log('no cookies found; navigating to login');
      nav('/login');
      return;
    }

    console.log('user logged in');
  }

  useEffect(onStartup, []);

  return (
    <div className="app">
      <div className="bar">Lala</div>
      <Register />
    </div>
  );
};
