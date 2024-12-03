import { Register } from "components/register";
import { useEffect } from "react";
import { useNavigate } from "react-router";

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

  return <Register />;
};
