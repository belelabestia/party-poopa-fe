import { AdminsResult, getAllAdmins } from 'api/admin';
import { Loading } from 'components/loading';
import { delay } from 'modules/time';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export const AdminsIndex = () => {
  const nav = useNavigate();
  const [admins, setAdmins] = useState<AdminsResult>();

  const onStartup = async () => {
    const [{ error, unauthenticated, admins }] = await Promise.all([getAllAdmins(), delay(1000)]);

    if (error) return;

    if (unauthenticated) {
      alert('Session has expired, redirecting to login.')
      console.log('navigating to login');
      nav('/login');
    }

    setAdmins(admins);
  };

  useEffect(() => { onStartup() }, []);

  return admins
    ? admins.map(a => <pre key={a.id}>{JSON.stringify(a)}</pre>)
    : <Loading />;
};
