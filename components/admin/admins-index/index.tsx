import { getAllAdmins } from 'api/admin';
import { Loading } from 'components/loading';
import { delay } from 'modules/time';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './styles.css';

type Admin = {
  id: number;
  username: string;
};

export const AdminsIndex = () => {
  const nav = useNavigate();
  const [admins, setAdmins] = useState<Admin[]>();

  const onStartup = async () => {
    const [{ error, unauthorized, admins }] = await Promise.all([getAllAdmins(), delay(1000)]);

    if (error) return;

    if (unauthorized) {
      alert('Session has expired, redirecting to login.');
      console.log('navigating to login');
      nav('/login');
    }

    setAdmins(admins);
  };

  useEffect(() => { onStartup() }, []);

  return admins
    ? admins.map(a => <DisplayAdmin {...a} key={a.id}></DisplayAdmin>)
    : <Loading />;
};

const DisplayAdmin = (admin: Admin) => {
  const editAdmin = () => {};
  const deleteAdmin = () => {};

  return (
    <div className='display-admin'>
      <span className='username'>{admin.username}</span>
      <div className='actions'>
        <button type='button' onClick={editAdmin}>✏️</button>
        <button type='button' onClick={deleteAdmin}>🗑️</button>
      </div>
    </div>
  );
};
